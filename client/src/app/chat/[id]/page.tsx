import ChatWindow from "@/components/chat/ChatInterface/ChatWindow";
import TextInput from "@/components/chat/ChatInterface/TextInput";
import MainHeader from "@/components/layout/MainHeader";
import { getAConverstaionById } from "@/lib/actions/ConversationActions";
import { Message } from "@/store/conversation/types";

interface ConversationData {
  messages: Message[];
}

interface Conversation {
  data: ConversationData;
  success: boolean;
  error?: string;
}

const ChatInterface = async ({ params }: { params: { id: string } }) => {
  const id = await params.id; 
  let conversation: Conversation | null = null;
  let messages: Message[] = [];

  if (id === 'new') {
    messages = []; 
  } else {
    try {
      conversation = await getAConverstaionById(id) as Conversation;
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
      <div className='flex flex-col h-full p-4 '>
          <div className='h-full w-full md:max-w-3xl mx-auto overflow-y-auto relative '>
            <ChatWindow messages={messages} />
          </div>
            <TextInput conversationId={id} /> 
      </div>
    </div>
  );
};
export default ChatInterface;