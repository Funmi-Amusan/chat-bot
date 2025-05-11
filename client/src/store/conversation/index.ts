import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, Message } from "./types";
const initialState: InitialState = {
    loading: false,
    error: false,
    message: null,
    messages: [],
    conversations: [],
    isAITyping: false,
    user: null,
}

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        addMessageToConversationAction: (state, action: PayloadAction<{ conversationId: string, newMessage: Message }>) => {
            const { conversationId, newMessage } = action.payload;
            console.log('first', conversationId, newMessage);
            state.messages = [...state.messages, newMessage]
        },        
        setAITyping: (state, action) => {
            state.isAITyping = action.payload;
        },
        setLoggedInUserAction: (state, action) => {
            state.user = action.payload;
        },
        setMessagesData: (state, action) => {
            state.messages = action.payload;
        }
    }
});
export default conversationSlice.reducer;

export const {
    addMessageToConversationAction,
    setAITyping,
    setLoggedInUserAction,
    setMessagesData
} = conversationSlice.actions;
