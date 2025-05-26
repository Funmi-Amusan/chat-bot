import ChatWindow from "@/components/chat/ChatInterface/ChatWindow";
import TextInput from "@/components/chat/ChatInterface/TextInput";
import MainHeader from "@/components/chat/MainHeader";
import { getAConverstaionById } from "@/lib/actions/ConversationActions";
import { Message } from "@/store/conversation/types";
import { Suspense } from "react";

interface ConversationData {
  messages: Message[];
}

interface Conversation {
  data: ConversationData;
  success: boolean;
  error?: string;
}

export type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChatInterface = async ({ params }: any) => {
  const id = params.id; 
  let messages: Message[] = [];

  if (id === 'new') {
    messages = []; 
  } else {
    try {
      const conversation = await getAConverstaionById(id) as Conversation;
      if (conversation?.data?.messages) {
        messages = conversation.data.messages;
      } else {
        console.error("Conversation or messages not found for ID:", id);
        messages = []; 
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      messages = []; 
    }
  }

  return (
    <div className='w-full h-screen bg-white dark:bg-neutral-800 relative'>
      <MainHeader />
      <div className='flex flex-col h-full p-4 pl-12 md-pl-0'>
        <div className='h-full w-full md:max-w-3xl mx-auto overflow-y-auto relative'>
          <Suspense fallback={<div>Loading...</div>}>
          <ChatWindow messages={messages} />
          </Suspense>
        </div>
        <TextInput conversationId={id} /> 
      </div>
    </div>
  );
};

export default ChatInterface;