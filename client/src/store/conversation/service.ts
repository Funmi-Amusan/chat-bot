import { createConversationURL, deleteConversationByIdURL, findConversationByIdURL, findConversationsByUserIdURL, sendMessageURL } from '@/utils/end-point';
import http from '../../utils/https';
import { createConversationPayload, sendMessagePayload } from './types';

class ConversationService {
    async getConversation(userId: string) {
        try {
            const response = await http.get({ url: findConversationsByUserIdURL(userId) });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createConversation(body: createConversationPayload) {
        try {
            const response = await http.post({ url: createConversationURL, body });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAConversation(id: string) {
        try {
            const response = await http.get({ url: findConversationByIdURL(id) });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteAConversation(id: string) {
        try {
            const response = await http.delete({ url: deleteConversationByIdURL(id) });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async sendMessage(body: sendMessagePayload) {
        try {
            const response = await http.post({
                url: sendMessageURL, body,

            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const conversationService = new ConversationService();
