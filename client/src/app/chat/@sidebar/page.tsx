import ConversationItem from '@/components/chat/ConversationsList/ConversationItem';
import { getAllConverstaions } from '@/lib/actions/ConversationActions';
import { auth } from '@/lib/auth'; 
import { Conversation } from '@/store/conversation/types';
import { redirect } from 'next/navigation';

const ConversationList = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect('/login');
  }


 const conversations = await getAllConverstaions(userId);

  return (
    <>
    <h3>Chat Bot</h3>
    <div className='h-full w-full flex flex-col gap-5 text-[#1D1B20] pb-6 '>
            <div className=' overflow-y-auto scrollbar-hide flex-1 flex flex-col gap-2'>
               
                  {conversations.data.map((conversation: Conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            title={conversation?.title || "Untitled Conversation"}
                            id={conversation?.id}
                        
                        />
                    ))}
            </div>
        </div>
    </>
  );
};

export default ConversationList;
