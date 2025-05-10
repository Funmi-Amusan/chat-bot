import AddConversation from '@/components/chat/ConversationsList/AddConversation';
import ConversationDisplay from '@/components/chat/ConversationsList/ConversationDisplay';
import { getAllConverstaions } from '@/lib/actions/ConversationActions';
import { auth } from '@/lib/auth'; 
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
    <AddConversation />
    <ConversationDisplay initialConversations={conversations.data}  />
    </>
  );
};

export default ConversationList;
