export type InitialState = {
    loading: boolean;
    conversationData: Conversation | null;
    conversations: Conversation[] | []
    error: boolean;
    message: string | null;
    isAITyping: boolean;
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