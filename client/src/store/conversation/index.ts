import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"; 
import { InitialState, Message } from "./types";

interface StreamingAIMessage extends Omit<Message, 'isStreaming'> {
    isStreaming: boolean; 
}

const initialState: InitialState = {
    loading: false,
    error: false,
    message: null,
    messages: [],
    conversations: [],
    isAITyping: null,
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

            const lastAIMessage = state.messages.findLast((msg): msg is StreamingAIMessage => 
                msg.isFromAI && (msg as StreamingAIMessage).isStreaming
            );
            if (!lastAIMessage) {
                const tempId = nanoid();
                const newStreamingMessage: StreamingAIMessage = {
                    id: tempId,
                    conversationId: action.payload.conversationId,
                    parts: [{ text: chunk }], 
                    isFromAI: true,
                    isStreaming: true, 
                    createdAt: new Date().toISOString(),
                };
                state.messages.push(newStreamingMessage); 
                state.allowTypwriterAnimation = tempId; 
                state.isAITyping = action.payload.conversationId;
            } else {
                if (lastAIMessage.parts.length > 0 && lastAIMessage.parts[0].text !== undefined) {
                    lastAIMessage.parts[0].text += chunk;
                } else {
                    lastAIMessage.parts.push({ text: chunk });
                }
                state.allowTypwriterAnimation = lastAIMessage.id;
                state.isAITyping = action.payload.conversationId;
            }
        },
        updateAIMessage: (state, action: PayloadAction<{ conversationId: string, message: Message }>) => {
            const { message } = action.payload;
            
            // Find and remove any streaming message with the same ID or temp streaming message
            const streamingIndex = state.messages.findIndex(msg => 
                (msg.id === message.id) || 
                (msg.isFromAI && (msg as StreamingAIMessage).isStreaming)
            );

            if (streamingIndex !== -1) {
                // Replace the streaming message with the final message
                state.messages[streamingIndex] = { ...message };
            } else {
                // Fallback: add the message if no streaming message found
                state.messages.push({ ...message });
            }
            
            state.allowTypwriterAnimation = null; 
            state.isAITyping = null; 
        },
        setAITyping: (state, action: PayloadAction<string | null>) => {
            state.isAITyping = action.payload;
        },
        setLoggedInUserAction: (state, action) => {
            state.user = action.payload;
        },
        setMessagesData: (state, action: PayloadAction<Message[]>) => {
            // Only set messages if there are no streaming messages in progress
            const hasStreamingMessage = state.messages.some(msg => 
                msg.isFromAI && (msg as StreamingAIMessage).isStreaming
            );
            
            if (!hasStreamingMessage) {
                state.messages = action.payload;
            }
        },
        setAllowTypwriterAnimation: (state, action: PayloadAction<string | null>) => {
            state.allowTypwriterAnimation = action.payload;
        },
        // Add this new action to clear streaming state when needed
        clearStreamingState: (state) => {
            state.isAITyping = null;
            state.allowTypwriterAnimation = null;
            // Remove any streaming messages that might be stuck
            state.messages = state.messages.filter(msg => 
                !msg.isFromAI || !(msg as StreamingAIMessage).isStreaming
            );
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
    setAllowTypwriterAnimation,
    clearStreamingState
} = conversationSlice.actions;