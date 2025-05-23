import * as fs from "fs";
import { Request, Response } from "express-serve-static-core";
import prisma from "../db/prisma";
import { io, model } from "..";
import { ChatSession } from "@google/generative-ai";

export const createConversation = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const lastConversation = await prisma.conversation.findFirst({
            where: { userId },
            orderBy: { title: "desc" },
        });

        let nextTitleNumber = 1;
        if (lastConversation?.title && lastConversation.title.startsWith("Conversation")) {
            const lastTitleNumber = parseInt(lastConversation.title.split(" ")[1], 10);
            if (!isNaN(lastTitleNumber)) {
                nextTitleNumber = lastTitleNumber + 1;
            }
        }
        const conversation = await prisma.conversation.create({
            data: {
                title: `Conversation ${nextTitleNumber}`,
                userId: userId,
            },
        });
        io.emit(`user_${userId}_new_conversation`, conversation);
        return res.status(201).json(conversation);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        console.log("Error creating conversation:", error.message);
    }
};

export const findConversationsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const userExists = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        const conversations = await prisma.conversation.findMany({
            where: {
                userId,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            include: {
                _count: {
                    select: {
                        messages: true,
                    },
                },
            },
        });

        const formattedConversations = conversations.map((conversation: { id: any; title: any; _count: { messages: any; }; }) => ({
            id: conversation.id,
            title: conversation.title,
            messageCount: conversation._count.messages, 
        }));

        res.status(200).json({
            conversations: formattedConversations,
            status: 200,
            message: "Conversations fetched successfully",
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        console.log("Error finding user conversations:", error.message);
    }
};

export const findConversationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Conversation ID is required" });
        }

        const conversation = await prisma.conversation.findUnique({
            where: { id }, include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
            }
        });
        if (!conversation) {
            return res.status(404).json({
                error: "Conversation not found",
                status: 404
            });
        }
        res.status(200).json({
            conversation,
            status: 200,
            message: "Conversation fetched Successfully"
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        console.log("error finding a chat", error.message);
    }
};

export const deleteConversationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Conversation ID is required" });
        }
        const conversationExists = await prisma.conversation.findUnique({ where: { id } });
        if (!conversationExists) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        const userId = conversationExists.userId;

        const deletedConversation = await prisma.conversation.delete({ where: { id } });

        io.to(id).emit('conversation_deleted', { id });
        io.emit(`user_${userId}_conversation_deleted`, { id });

        res.status(200).json({
            deletedConversation,
            status: 200,
            message: "Conversation deleted successfully"
        });
    } catch (error) {
        res.status(500).json(error);
        console.log("error deleting conversation", error);
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { content, conversationId } = req.body;
        if (!content || !conversationId) {
            return res.status(400).json({ error: "Content and conversation ID are required" });
        }

        const conversationExists = await prisma.conversation.findUnique({ where: { id: conversationId } });
        if (!conversationExists) {
            return res.status(404).json({ error: "Conversation not found" });
        }
// console.log('conversationExists', conversationExists)
//          if (conversationExists.userId !== userId) {
//             return res.status(403).json({ error: "User not authorized to send messages in this conversation" });
//         }

        const message = await prisma.message.create({
            data: {
                content,
                conversationId,
                isFromAI: false,
            }
        });

        io.to(conversationId).emit('new_message', message);

        io.emit(`user_${conversationExists.userId}_conversation_updated`, {
            conversationId,
            lastMessage: message
        });

        res.status(201).json({
            message,
            status: 201,
        });

        io.to(conversationId).emit('ai_typing_start', { conversationId });
            sendAIMessage(conversationId);
    } catch (error) {
        res.status(500).json(error);
        console.log("error sending message", error);
    }
};

 const sendAIMessage = async (conversationId: string) => {
    try {
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: {
                user: true,
                messages: {
                    orderBy: {
                        createdAt: 'asc' 
                    },
                }
            }
        });

        if (!conversation) {
            console.log("Conversation not found for AI response:", conversationId);
            return;
        }
        const formattedHistory = conversation.messages.map((msg) => ({
            role: msg.isFromAI ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));
        const latestUserMessage = formattedHistory[formattedHistory.length - 1];

        if (!latestUserMessage || latestUserMessage.role !== 'user') {
            console.warn("sendAIMessage called for conversation", conversationId, "but no user message found as the latest message.");
            return; 
        }
        const historyForChat = formattedHistory.slice(0, -1);

        const chat: ChatSession = model.startChat({
            history: historyForChat,
        });

        let fullAiResponseContent = "";
        let aiResponseError = false;

        try {
            const result = await chat.sendMessageStream(latestUserMessage.parts[0].text);
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                if (chunkText) {
                    fullAiResponseContent += chunkText;
                    io.to(conversationId).emit('new_message_chunk', {
                        conversationId,
                        content: chunkText,
                        isFromAI: true,
                    });
                    console.log("Sending chunk:", chunkText);
                }
            }

            if (!fullAiResponseContent) {
                console.warn("AI generated an empty streamed response for conversation", conversationId);
                fullAiResponseContent = "The AI generated an empty response.";
                aiResponseError = true;
            }

        } catch (aiError: any) {
            console.error('Error generating content from Gemini API:', aiError);
            fullAiResponseContent = "Error generating response from AI.";
            aiResponseError = true;
        }
        const aiMessage = await prisma.message.create({
            data: {
                content: fullAiResponseContent,
                conversationId,
                isFromAI: true,
                // error: aiResponseError,
            }
        });
        io.to(conversationId).emit('ai_typing_stop', { conversationId });

        io.to(conversationId).emit('new_message', aiMessage);

        io.emit(`user_${conversation.userId}_conversation_updated`, {
            conversationId,
            lastMessage: aiMessage
        });

    } catch (error) {
        console.error("Error in sendAIMessage function:", error);
        io.to(conversationId).emit('server_error', {
            conversationId,
            message: "Failed to process AI response due to a server error."
        });
    }
};

export const textAIGeneration = async () => {

    const fileToGeneratePart = (path: string, mimeType: string) => {
        return {
            inlineData: {
                data: Buffer.from(fs.readFileSync(path)).toString('base64'),
                mimeType: mimeType,
            }
        }
    }
    const imagePart = [fileToGeneratePart('quantum.png', 'image/png')]; // Corrected to 'imagePart'


    const prompt = "Generate content with Stranger things innuendos.";
    // Assuming 'model' is defined and initialized elsewhere in your code
    const response = await model.generateContent([
        prompt, ...imagePart
    ]);
    const result = await response.response.text();
    console.log(result);
}

