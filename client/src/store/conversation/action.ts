import { createAsyncThunk } from "@reduxjs/toolkit";
import { conversationService } from "./service";
import { createConversationPayload, sendMessagePayload } from "./types";
import { conversationCache } from "@/utils/cache";


export const fetchAllConversationsAction = createAsyncThunk(
    "/fetchAllConversations",
    async (payload: { userId: string, forceRefresh?: boolean }, { rejectWithValue }) => {
        try {
            const { userId, forceRefresh } = payload
            const cacheKey = `allConversations_${userId}`;

            const cachedData = forceRefresh ? null : conversationCache.get(cacheKey);
            if (cachedData) {
                return { success: true, payload: cachedData };
            }

            const response = await conversationService.getConversation(userId);

            if (response) {
                conversationCache.set(cacheKey, response.conversations);
                return { success: true, payload: response.conversations };
            }
            return { success: false, payload: response };
        } catch (err: unknown) {
            if (err instanceof Error && !('response' in err)) {
                throw err;
            }
            return rejectWithValue((err as { response: { data: unknown } }).response.data);
        }
    }
);

export const createConversationAction = createAsyncThunk(
    "/createConversation",
    async (body: createConversationPayload, { rejectWithValue }) => {
        try {
            const response = await conversationService.createConversation(body);
            if (response) {
                const cacheKey = `allConversations_${body.userId}`;
                conversationCache.clear(cacheKey);
                return response;
            }
            return response;
        } catch (err: unknown) {
            if (err instanceof Error && !('response' in err)) {
                throw err;
            }
            return rejectWithValue((err as { response: { data: unknown } }).response.data);
        }
    }
);

export const fetchAConversationAction = createAsyncThunk(
    "/fetchAConversation",
    async (id: string, { rejectWithValue }) => {
        try {
            const cacheKey = `conversation_${id}`;
            const cachedData = conversationCache.get(cacheKey);

            if (cachedData) {
                console.log(`[CACHE] Using cached data for conversation ${id}`);
                return { success: true, payload: cachedData };
            }
            const response = await conversationService.getAConversation(id);

            if (response) {
                conversationCache.set(cacheKey, response.conversation);
                console.log("cache response", response)
                return { success: true, payload: response.conversation };
            }
            console.log("normal response", response)

            return { success: false, payload: response };
        } catch (err: unknown) {
            if (err instanceof Error && !('response' in err)) {
                throw err;
            }
            return rejectWithValue((err as { response: { data: unknown } }).response.data);
        }
    }
);

export const DeleteAConversationAction = createAsyncThunk(
    "/deleteAConversation",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await conversationService.deleteAConversation(id);
            if (response) {
                conversationCache.clear(`conversation_${id}`);
                invalidateAllConversationsCaches();

                return { success: true, payload: response?.payload };
            }
            return { success: false, payload: response };
        } catch (err: unknown) {
            if (err instanceof Error && !('response' in err)) {
                throw err;
            }
            return rejectWithValue((err as { response: { data: unknown } }).response.data);
        }
    }
);

export const SendMessageAction = createAsyncThunk(
    "/conversation/sendMessage",
    async (body: sendMessagePayload, { rejectWithValue }) => {
        try {
            const response = await conversationService.sendMessage(body);
            if (response) {
                if (body.conversationId) {
                    conversationCache.clear(`conversation_${body.conversationId}`);
                }
                return { success: true, payload: response?.payload };
            }
            return { success: false, payload: response };
        } catch (err: unknown) {
            if (err instanceof Error && !('response' in err)) {
                throw err;
            }
            return rejectWithValue((err as { response: { data: unknown } }).response.data);
        }
    });

function invalidateAllConversationsCaches() {
    if (typeof conversationCache.clearByPrefix === 'function') {
        conversationCache.clearByPrefix('allConversations_');
    } else {
        console.log('[CACHE] Consider implementing a clearByPrefix method for more efficient cache invalidation');
    }
}