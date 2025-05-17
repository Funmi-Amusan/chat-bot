import prisma from "../db/prisma.js"
import { io, model } from '../server.js';

export const createConversation = async (req, res) => {
    try {
        console.log('userId', req.body.userId)
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
        if (lastConversation && lastConversation.title.startsWith("Conversation")) {
            const lastTitleNumber = parseInt(lastConversation.title.split(" ")[1], 10);
            if (!isNaN(lastTitleNumber)) {
                nextTitleNumber = lastTitleNumber + 1;
            }
        }
console.log('firstConversation', lastConversation)
        const conversation = await prisma.conversation.create({
            data: {
                title: `Conversation ${nextTitleNumber}`,
                userId: userId,
            },
        });
console.log('firstConversation', conversation)
        io.emit(`user_${userId}_new_conversation`, conversation);

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error creating conversation:", error.message);
    }
};

export const findConversationsByUserId = async (req, res) => {
    console.log("----Finding conversations by user ID----");
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

        const formattedConversations = conversations.map((conversation) => ({
            id: conversation.id,
            title: conversation.title,
            messageCount: conversation._count.messages, 
        }));

        res.status(200).json({
            conversations: formattedConversations,
            status: 200,
            message: "Conversations fetched successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error finding user conversations:", error.message);
    }
};


export const findConversationById = async (req, res) => {
    console.log("----Finding conversation by ID----");
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
    } catch (error) {
        res.status(500).json(error);
        console.log("error finding a chat", error.message);
    }
};

export const sendMessage = async (req, res) => {
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
            message: "Message sent successfully"
        });

        io.to(conversationId).emit('ai_typing_start', { conversationId });
            sendAIMessage(conversationId);
    } catch (error) {
        res.status(500).json(error);
        console.log("error sending message", error);
    }
};

export const sendAIMessage = async (conversationId) => {
    try {
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: { user: true,
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1,
                }
             }
        });

        if (!conversation) {
            console.log("Conversation not found for AI response");
            return;
        }

        const formattedHistory = conversation.messages.map(msg => ({
            role: msg.isFromAI ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        const latestUserMessage = formattedHistory.findLast(msg => msg.role === 'user');

        let aiResponseContent = "Sorry, I couldn't generate a response."; 

        if (latestUserMessage) {
            const historyForChat = formattedHistory.slice(0, formattedHistory.lastIndexOf(latestUserMessage));
            const chat = model.startChat({
                history: historyForChat,
            });

           try {
                const result = await chat.sendMessage(latestUserMessage.parts[0].text);
                const response = await result.response;
                aiResponseContent = response.text(); 

                if (!aiResponseContent) {
                    aiResponseContent = "The AI generated an empty response.";
                    console.warn("AI generated empty response for conversation", conversationId);
                }

            } catch (aiError) {
                console.error('Error generating content from Gemini API:', aiError);
                aiResponseContent = "Error generating response from AI."; 
            }

       } else {
            console.warn("sendAIMessage called for conversation", conversationId, "but no user message found in history.");
       }

       const aiMessage = await prisma.message.create({
           data: {
               content: aiResponseContent, 
               conversationId,
               isFromAI: true,
           }
       });

        io.to(conversationId).emit('ai_typing_stop', { conversationId });

        io.to(conversationId).emit('new_message', aiMessage);

        io.emit(`user_${conversation.userId}_conversation_updated`, {
            conversationId,
            lastMessage: aiMessage
        });
    } catch (error) {
        console.log("error sending AI message", error);
    }
};

export const deleteConversationById = async (req, res) => {
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
