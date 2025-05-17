"use server"; 

import { auth } from '@/lib/auth'; 
import { revalidatePath } from 'next/cache'; 
import http from '../../utils/https';
import { createConversationURL, deleteConversationByIdURL, findConversationByIdURL, findConversationsByUserIdURL, sendMessageURL } from '@/utils/end-point';

export async function createNewConversation(userId: string) {
    const session = await auth();
    if (!session || session.user?.id !== userId) {
        console.warn("Server Action: Unauthorized attempt to create conversation for different user.");
        return { success: false, error: "Unauthorized." };
    }
    try {
        const body  = {
            userId: userId,
        };
        const newConversation = await http.post({ url: createConversationURL, body });
        if (newConversation) {
            revalidatePath('/chat'); 
            return { success: true, data: newConversation }; 
        } else {
             console.error("Server Action: Failed to create conversation:", newConversation);
             return { success: false, error: "Failed to create conversation." };
        }

    } catch (error) {
        console.error("Error creating conversation:", error);
        return { success: false, error: "An error occurred while creating the conversation." };
    }
}

export async function getAllConverstaions(userId: string) {
    
    const session = await auth();
    if (!session || session.user?.id !== userId) {
        console.warn("Server Action: Unauthorized attempt to fetch conversations for different user.");
        return { success: false, error: "Unauthorized." };
    }
    try {
        
        const allConversations = await http.get({ url: findConversationsByUserIdURL(userId) });
        if (allConversations) {
            // revalidatePath('/chat'); 
            return { success: true, data: allConversations.conversations }; 
        } else {
             console.error("Server Action: Failed to fetch all conversations:", allConversations);
             return { success: false, error: "Failed to fetch conversations." };
        }

    } catch (error) {
        console.error("Error fetching conversations:", error);
        return { success: false, error:  "An error occurred while fetching conversations." };
    }
}

export async function getAConverstaionById(conversationId: string) {
    
    try {
        const conversation = await http.get({ url: findConversationByIdURL(conversationId) });
        if (conversation) {
            // revalidatePath('/chat'); 
            return { success: true, data: conversation.conversation }; 
        } else {
             console.error("Server Action: Failed to fetch conversation:", conversation);
             return { success: false, error: "Failed to fetch conversation." };
        }
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return { success: false, error:  "An error occurred while fetching conversation." };
    }
}

export async function sendMessageAction(content: string, conversationId: string) {
    
    // const session = await auth();
    // if (!session || session.user?.id !== userId) {
    //     console.warn("Server Action: Unauthorized attempt to create conversation for different user.");
    //     return { success: false, error: "Unauthorized." };
    // }
    try {
        const body  = {
            content,
            conversationId
        };
        const newMessage = await http.post({ url: sendMessageURL, body });
        if (newMessage) {
            // revalidatePath('/chat'); 
            return { success: true, data: newMessage }; 
        } else {
             console.error("Server Action: Failed to send message:", newMessage);
             return { success: false, error: "Failed to send message." };
        }

    } catch (error) {
        console.error("Error sending message:", error);
        return { success: false, error: "An error occurred while sending the message." };
    }
}

export async function deleteConversation( conversationId: string) {
    
    try {
        const deleteConversation = await http.delete({ url: deleteConversationByIdURL(conversationId) });
        if (deleteConversation) {
            revalidatePath('/chat'); 
            return { success: true, data: deleteConversation }; 
        } else {
             console.error("Server Action: Failed to delete conversation:", deleteConversation);
             return { success: false, error: "Failed to delete conversation." };
        }

    } catch (error) {
        console.error("Error deleting conversation:", error);
        return { success: false, error: "An error occurred while deleting the conversatione." };
    }
}
