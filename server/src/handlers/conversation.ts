import { Request, Response } from "express-serve-static-core";
import prisma from "../db/prisma";
import { io, model } from "..";
import { ChatSession, Part } from "@google/generative-ai";
import { Prisma } from "@prisma/client";


interface TextPart {
    text: string;
  }
  
  interface InlineDataPart {
    inlineData: {
      mimeType: string;
      data: string;
    };
  }
  
  interface FileDataPart {
      fileData: {
          mimeType: string;
          uri: string;
      };
  }
  
  type ServerPart = TextPart | InlineDataPart | FileDataPart;

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
        
        const conversation = await prisma.conversation.create({
            data: {
                title: 'Untitled Chat',
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
console.log("sending message");
    let parts: ServerPart[]; 
    let conversationId: string;

    try {
        if (typeof req.body.parts === 'string') {
            try {
                parts = JSON.parse(req.body.parts);
            } catch (parseError: any) {
                console.error("Error parsing req.body.parts string:", parseError);
                return res.status(400).json({ error: "Invalid JSON format for 'parts' array.", details: parseError.message });
            }
        } else {
            parts = req.body.parts;
        }

        conversationId = req.body.conversationId;
        if (!parts || !Array.isArray(parts) || parts.length === 0 || !conversationId) {
            console.error("Validation failed: Missing parts array, empty parts array, or missing conversationId.");
            return res.status(400).json({ error: "Parts array and conversation ID are required." });
        }

        const conversationExists = await prisma.conversation.findUnique({ where: { id: conversationId } });
        if (!conversationExists) {
            console.error(`Conversation with ID ${conversationId} not found.`);
            return res.status(404).json({ error: "Conversation not found." });
        }
        const validatedParts: ServerPart[] = parts.map((part: any, index: number) => {
            if (part.text !== undefined) {
                if (typeof part.text === 'string') {
                    return { text: part.text };
                } else {
                    console.error(`Part ${index} has 'text' but it's not a string. Type: ${typeof part.text}`);
                }
            }

            if (part.inlineData !== undefined) {
                if (typeof part.inlineData === 'object' && part.inlineData !== null &&
                    typeof part.inlineData.mimeType === 'string' && typeof part.inlineData.data === 'string') {
                    return { inlineData: part.inlineData };
                } else {
                    console.error(`Part ${index} has 'inlineData' but it's malformed. Structure:`, part.inlineData);
                }
            }

            if (part.fileData !== undefined) {
                if (typeof part.fileData === 'object' && part.fileData !== null &&
                    typeof part.fileData.mimeType === 'string' && typeof part.fileData.uri === 'string') {
                    return { fileData: part.fileData };
                } else {
                    console.error(`Part ${index} has 'fileData' but it's malformed. Structure:`, part.fileData);
                }
            }
            const errorMessage = `Invalid part structure found at index ${index}: ${JSON.stringify(part)}. Expected 'text', 'inlineData', or 'fileData' with correct types.`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        });

        const message = await prisma.message.create({
            data: {
                parts: validatedParts as unknown as Prisma.JsonArray,
                conversationId,
                isFromAI: false,
            }
        });

            io.to(conversationId).emit('new_message', message);
            io.emit(`user_${conversationExists.userId}_conversation_updated`, {
                conversationId,
                lastMessage: message
            });
console.log("Message sent successfully:", message);
        res.status(201).json({
            message,
            status: 201,
        });
            io.to(conversationId).emit('ai_typing_start', { conversationId });

        sendAIMessage(conversationId);

    } catch (error: any) {
        console.error("Error sending message:", error);
        if (error.message.includes("Invalid part structure") || error.message.includes("Invalid JSON format for 'parts' array")) {
            res.status(400).json({ message: "Invalid message format: " + error.message, status: 400 });
        } else {
            res.status(500).json({ message: "Internal server error.", error: error.message, status: 500 });
        }
    }
};

const generateConversationTitle = async (conversationId: string): Promise<string> => {
    try {
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    },
                    take: 2 
                }
            }
        });

        if (!conversation || conversation.messages.length < 2) {
            return "New Chat";
        }
        const firstUserMessage = conversation.messages.find(msg => !msg.isFromAI);
        if (!firstUserMessage || !firstUserMessage.parts) {
            return "New Chat";
        }

        const parts = firstUserMessage.parts as any[];
        const textPart = parts.find(part => part.text);
        
        if (!textPart || !textPart.text) {
            return "New Chat";
        }

        const userText = textPart.text as string;
        
        const titlePrompt = `Generate a very short title (maximum 18 characters) for a conversation that starts with: "${userText.substring(0, 100)}". The title should capture the main topic or question. Return only the title, nothing else.`;
        
        const titleChat = model.startChat({
            history: []
        });
        
        const result = await titleChat.sendMessage(titlePrompt);
        let generatedTitle = result.response.text().trim();
    
        generatedTitle = generatedTitle.replace(/['"]/g, ''); 
        generatedTitle = generatedTitle.substring(0, 18);
        if (!generatedTitle || generatedTitle.toLowerCase().includes('conversation') || generatedTitle.toLowerCase().includes('chat')) {
            const words = userText.split(' ').filter(word => word.length > 3);
            if (words.length > 0) {
                generatedTitle = words.slice(0, 3).join(' ').substring(0, 18);
            } else {
                generatedTitle = "New Chat";
            }
        }
        
        return generatedTitle || "New Chat";
        
    } catch (error) {
        console.error("Error generating conversation title:", error);
        return "New Chat";
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
            throw new Error("Conversation not found");
        }

        const formattedHistory: { role: string; parts: Part[] }[] = conversation.messages.map((msg) => {
            const messageParts: Part[] = (msg.parts as Part[] | null) || [];
            return {
                role: msg.isFromAI ? 'model' : 'user',
                parts: messageParts,
            };
        });
        const latestUserMessageEntry = formattedHistory[formattedHistory.length - 1];
        if (!latestUserMessageEntry || latestUserMessageEntry.role !== 'user' || latestUserMessageEntry.parts.length === 0) {
            console.warn("sendAIMessage called for conversation", conversationId, "but no valid user message (with parts) found as the latest message.");
            return;
        }
        const latestUserMessageParts: Part[] = latestUserMessageEntry.parts;
        const historyForChat: { role: string; parts: Part[] }[] = formattedHistory.slice(0, -1);
        const chat: ChatSession = model.startChat({
            history: historyForChat,
        });

        let fullAiResponseContent = "";
        let aiResponseError = false;

        try {
            const result = await chat.sendMessageStream(latestUserMessageParts);
            for await (const chunk of result.stream) {
                const chunkText = chunk.text(); 
                if (chunkText) {
                    fullAiResponseContent += chunkText;
                    io.to(conversationId).emit('new_message_chunk', {
                        conversationId,
                        content: chunkText,
                        isFromAI: true,
                    });
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
                parts: [{ text: fullAiResponseContent }],
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

        const messageCount = await prisma.message.count({
            where: { conversationId }
        });
        if (messageCount === 2 && conversation.title && conversation.title.startsWith('Untitled Chat')) {
            try {
                const newTitle = await generateConversationTitle(conversationId);
                
                 await prisma.conversation.update({
                    where: { id: conversationId },
                    data: { title: newTitle }
                });

                io.to(conversationId).emit('conversation_title_updated', {
                    conversationId,
                    newTitle
                });
                io.emit(`user_${conversation.userId}_conversation_title_updated`, {
                    conversationId,
                    newTitle
                });

                console.log(`Updated conversation title to: "${newTitle}"`);
            } catch (titleError) {
                console.error("Error updating conversation title:", titleError);
            }
        }

    } catch (error) {
        console.error("Error in sendAIMessage function:", error);
        io.to(conversationId).emit('server_error', {
            conversationId,
            message: "Failed to process AI response due to a server error."
        });
    }
};

