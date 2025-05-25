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
            const streamingIndex = state.messages.findIndex(msg => 
                (msg.id === message.id) || 
                (msg.isFromAI && (msg as StreamingAIMessage).isStreaming)
            );

            if (streamingIndex !== -1) {
                state.messages[streamingIndex] = { ...message };
            } else {
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
        clearStreamingState: (state) => {
            state.isAITyping = null;
            state.allowTypwriterAnimation = null;
            state.messages = state.messages.filter(msg => 
                !msg.isFromAI || !(msg as StreamingAIMessage).isStreaming
            );
        },
        updateConversationTitle: (state, action: PayloadAction<{ conversationId: string, newTitle: string }>) => {
            const { conversationId, newTitle } = action.payload;
            const conversationIndex = state.conversations.findIndex(conversation => conversation.id === conversationId);
            if (conversationIndex !== -1) {
                state.conversations[conversationIndex].title = newTitle;
                console.log("Updated conversation title:", state.conversations[conversationIndex].title);
            }
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
    clearStreamingState, 
    updateConversationTitle
} = conversationSlice.actions;