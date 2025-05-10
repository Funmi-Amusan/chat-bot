'use client';

import { createNewConversation } from '@/lib/actions/ConversationActions';
import { useRouter } from 'next/navigation';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useAppSelector } from '@/utils/hooks';

const AddConversation = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.conversationReducer);

  async function handleCreateConversation() {
    if (!user) {
      return
    }
      const response = await createNewConversation(user);
      if (response.success) {
        router.push(`/chat/${response.data.conversation.id}`);
         console.log('response', response)
      }
    
  }

  return (
    <button
      onClick={handleCreateConversation}
      className='my-2 p-2 w-full rounded-2xl h-14 flex gap-3 items-center justify-center bg-[#EADDFF] shadow-lg text-[#21005D] hover:bg-[#D0BCFF] transition-colors'
      type="button"
    >
      <AddCircleOutlineOutlinedIcon />
      New Conversation
    </button>
  );
};

export default AddConversation;