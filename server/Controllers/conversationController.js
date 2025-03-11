import prisma from "../db/prisma.js"
import { io } from '../server.js';

export const createConversation = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const userExists = await prisma.user.findUnique({ where: { id: userId }});
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }
        const conversationCount = await prisma.conversation.count({
            where: { userId },
        });

        const conversation = await prisma.conversation.create({
            data: {
                title: `Conversation ${conversationCount + 1}`,
                userId: userId,
            }
        });

        io.emit(`user_${userId}_new_conversation`, conversation);

        const message = await prisma.message.create({
            data: {
                content:  "How can I help you?",
                conversationId: conversation.id,
                isFromAI: true,
            }
        });

        io.to(conversation.id).emit('new_message', message);
        io.emit(`user_${conversation.userId}_conversation_updated`, {
            conversationId: conversation.id,
            lastMessage: message
        });

        res.status(201).json({
            conversation, 
            initialMessage: message
          });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("error creating conversation:", error.message);
    }
};

export const findConversationsByUserId = async (req, res) => {
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

        setTimeout(() => {
            sendAIMessage(conversationId);
        }, 2000);
    } catch (error) {
        res.status(500).json(error);
        console.log("error sending message", error);
    }
};

export const sendAIMessage = async (conversationId) => {
    try {
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: { user: true }
        });

        if (!conversation) {
            console.log("Conversation not found for AI response");
            return;
        }

        const message = await prisma.message.create({
            data: {
                content: "This is an AI generated response",
                conversationId,
                isFromAI: true,
            }
        });

        io.to(conversationId).emit('ai_typing_stop', { conversationId });

        io.to(conversationId).emit('new_message', message);

        io.emit(`user_${conversation.userId}_conversation_updated`, {
            conversationId,
            lastMessage: message
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
