import { User } from "next-auth";

export type InitialState = {
    loading: boolean;
    messages: Message[] | [];
    conversations: Conversation[] | []
    error: boolean;
    message: string | null;
    isAITyping: boolean;
    user: User | null;
    allowTypwriterAnimation: string | null;
};

export type Conversation = {
    id: string;
    title: string;
    messages: Message[];
    userId: string;
    createdAt: string;
    updatedAt: string;
    messageCount?: number;
}

export type Message = {
    id: string;
    isFromAI: boolean;
    conversationId: string;
    createdAt: string;
    parts: MessagePart[];
}

export type MessagePart = {
    text?: string;
    inlineData?: {
        mimeType: string;
        data: string;
    };
    fileData?: {
        mimeType: string;
        uri: string;
    };
}

export type sendMessagePayload = {
    content: string;
    conversationId: string;
}

export type createConversationPayload = {
    userId: string;
}