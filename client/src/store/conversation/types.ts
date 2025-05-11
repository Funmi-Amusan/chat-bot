export type InitialState = {
    loading: boolean;
    messages: Message[] | [];
    conversations: Conversation[] | []
    error: boolean;
    message: string | null;
    isAITyping: boolean;
    user: string | null;
};

export type Conversation = {
    id: string;
    title: string;
    messages: Message[] | [];
    userId: string;
    createdAt: string;
    updatedAt: string;
    messageCount?: number;
}

export type Message = {
    id: string;
    content: string;
    isFromAI: boolean;
    conversationId: string;
    createdAt: string;
}

export type sendMessagePayload = {
    content: string;
    conversationId: string;
}

export type createConversationPayload = {
    userId: string;
}