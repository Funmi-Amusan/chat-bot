import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAConversationAction, fetchAllConversationsAction } from "./action";
import { Conversation, InitialState, Message } from "./types";

const initialState: InitialState = {
    loading: false,
    error: false,
    message: null,
    conversationData: null,
    conversations: [],
    isAITyping: false,
    user: null,
}

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        addMessageToConversationAction: (state, action: PayloadAction<Message>) => {
            if (state.conversationData &&
                state.conversationData.id === action.payload.conversationId) {
                state.conversationData.messages = [
                    ...(state.conversationData.messages || []),
                    action.payload
                ];
            }
        },
        setAITyping: (state, action) => {
            state.isAITyping = action.payload;
        },
        setLoggedInUserAction: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {

        //Fetch all conversations
        builder.addCase(fetchAllConversationsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchAllConversationsAction.fulfilled,
            (state, action: PayloadAction<{ success: boolean; payload: Conversation[]; }>) => {
                state.loading = false;
                state.conversations = action.payload.payload;
                state.error = false;
            }
        );
        builder.addCase(
            fetchAllConversationsAction.rejected,
            (state) => {
                state.loading = false;
                state.conversations = [];
                state.error = true;
            });

        //Fetch one conversation
        builder.addCase(fetchAConversationAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchAConversationAction.fulfilled,
            (state, action: PayloadAction<{ success: boolean; payload: Conversation; }>) => {
                state.loading = false;
                state.conversationData = action.payload.payload;
                state.error = false;
            }
        );
        builder.addCase(
            fetchAConversationAction.rejected,
            (state) => {
                state.loading = false;
                state.conversationData = null;
                state.error = true;
            });

    }
});
export default conversationSlice.reducer;

export const {
    addMessageToConversationAction,
    setAITyping,
    setLoggedInUserAction,
} = conversationSlice.actions;
