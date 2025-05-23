import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"; 
import { InitialState, Message } from "./types";

interface StreamingAIMessage extends Omit<Message, 'content'> {
    content: string; 
    isStreaming: boolean; 
}

const initialState: InitialState = {
    loading: false,
    error: false,
    message: null,
    messages: [],
    conversations: [],
    isAITyping: false,
    allowTypwriterAnimation: null,
    user: null,
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        addMessageToConversationAction: (state, action: PayloadAction<{ conversationId: string, newMessage: Message }>) => {
            const { newMessage } = action.payload;
            state.messages = [...state.messages, newMessage];
        },
        appendChunkToAIMessage: (state, action: PayloadAction<{ conversationId: string, chunk: string }>) => {
            const { chunk } = action.payload;

            const lastAIMessage = state.messages.findLast(msg => msg.isFromAI && (msg as StreamingAIMessage).isStreaming);

            if (!lastAIMessage) {
                const tempId = nanoid();
                const newStreamingMessage: StreamingAIMessage = {
                    id: tempId,
                    conversationId: action.payload.conversationId,
                    content: chunk,
                    isFromAI: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isStreaming: true, 
                };
                state.messages.push(newStreamingMessage as Message); 
                state.allowTypwriterAnimation = tempId; 
                state.isAITyping = true;
            } else {
                lastAIMessage.content += chunk;
                state.allowTypwriterAnimation = lastAIMessage.id;
                state.isAITyping = true; 
            }
        },
        updateAIMessage: (state, action: PayloadAction<{ conversationId: string, message: Message }>) => {
            const { message } = action.payload;
            const existingIndex = state.messages.findIndex(msg => msg.id === message.id);

            if (existingIndex !== -1) {
                state.messages[existingIndex] = { ...message, isStreaming: false } as Message; 
            } else {
                state.messages.push({ ...message, isStreaming: false } as Message);
            }
            state.allowTypwriterAnimation = null; 
            state.isAITyping = false; 
        },
        setAITyping: (state, action: PayloadAction<boolean>) => {
            state.isAITyping = action.payload;
        },
        setLoggedInUserAction: (state, action) => {
            state.user = action.payload;
        },
        setMessagesData: (state, action) => {
            state.messages = action.payload;
        },
        setAllowTypwriterAnimation: (state, action: PayloadAction<string | null>) => {
            state.allowTypwriterAnimation = action.payload;
        }
    }
});
export default conversationSlice.reducer;

export const {
    addMessageToConversationAction,
    appendChunkToAIMessage, 
    updateAIMessage,   
    setAITyping,
    setLoggedInUserAction,
    setMessagesData,
    setAllowTypwriterAnimation
} = conversationSlice.actions;