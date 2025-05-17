import { getAllConverstaions } from '@/lib/actions/ConversationActions';
import { auth } from '@/lib/auth'; 
import { redirect } from 'next/navigation';
import ConversationList from '@/components/chat/ConversationsList/ConversationList';

const ConversationsPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect('/login');
  }

  const conversations = await getAllConverstaions(userId);

  return (
  <div className='h-full  '>
    <ConversationList conversations={conversations.data} user={session?.user} />

  </div>
  )
};

export default ConversationsPage;