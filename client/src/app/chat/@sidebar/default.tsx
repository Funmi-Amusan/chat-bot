import ConversationDisplay from '@/components/chat/ConversationsList/ConversationDisplay';
import { getAllConverstaions } from '@/lib/actions/ConversationActions';
import { auth } from '@/lib/auth'; 
import { redirect } from 'next/navigation';

const ConversationList = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect('/login');
  }

  const id = await params.id

 const conversations = await getAllConverstaions(userId);

  return (
    <>
    <h3>Chat Bot</h3>
    <ConversationDisplay initialConversations={conversations.data} currentId={id} />
    </>
  );
};

export default ConversationList;
