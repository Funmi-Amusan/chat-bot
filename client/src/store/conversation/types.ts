import { User } from "next-auth";

export type InitialState = {
    loading: boolean;
    messages: Message[];
    conversations: Conversation[] | []
    error: boolean;
    message: string | null;
    isAITyping: string | null;
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

export type FileUploadData = {
    file: File;
    preview?: string;
    type: 'image' | 'document' | 'other';
    base64?: string;
  }
  
export type TextPart = {
    text: string;
  }
  
export type InlineDataPart = {
    inlineData: {
      mimeType: string;
      data: string; 
    };
  }

  export type ClientPart = TextPart | InlineDataPart; 