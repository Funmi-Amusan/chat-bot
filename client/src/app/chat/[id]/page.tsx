import ChatInterfaceHeader from "@/components/chat/ChatInterface/ChatInterfaceHeader";
import ChatWindow from "@/components/chat/ChatInterface/ChatWindow";
import TextInput from "@/components/chat/ChatInterface/TextInput";
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
  const id = params.id; 
  let conversation: Conversation | null = null;
  let messages: Message[] = [];

  if (id === 'new') {
    messages = []; 
  } else {
    try {
      conversation = await getAConverstaionById(id);
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
    <div className='w-full h-full lg:bg-white rounded-2xl relative'>
      <div className='flex flex-col h-full '>
        <ChatInterfaceHeader />
        <div className='flex-grow overflow-hidden lg:mx-4 relative'>
          <div className='h-full pb-16 overflow-y-auto '>
            <ChatWindow messages={messages} />
          </div>
          <div className='absolute bottom-0 left-0 right-0 mb-4'>
            <TextInput conversationId={id} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;