'use client'

import { createConversationAction, fetchAConversationAction, fetchAllConversationsAction } from '@/store/conversation/action';
import { Conversation } from '@/store/conversation/types';
import { useAppDispatch } from '@/utils/hooks';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { z } from 'zod'; 


const CreateConversationSchema = z.object({
  userId: z.string().uuid(),
});

const AddConversation = () => {
   const dispatch = useAppDispatch();
   const userId = "6d25380c-3ae8-4023-af50-2dfce1fb8fa4"

      const createAConversation = async () => {
        try {
          const response = await dispatch(fetchAllConversationsAction({ userId, forceRefresh: true }));
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedConversations  = (response as any)?.payload?.payload;

    const existingConversation = updatedConversations?.find(
      (updatedConversation: Conversation) => updatedConversation.messageCount === 1
    );
          if (existingConversation) {
            await dispatch(fetchAConversationAction(existingConversation.id));
            return;
          }
          const body = CreateConversationSchema.parse({ userId });
          const res = await dispatch(createConversationAction(body));
          if (res) {
            await dispatch(fetchAllConversationsAction({ userId, forceRefresh: true }));
            await dispatch(fetchAConversationAction(res?.payload?.conversation?.id));
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error("Validation error:", error.errors);
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      };   
  return (
    <div onClick={() => createAConversation()} className=' p-4 w-full rounded-2xl h-14 flex gap-3 items-center justify-center bg-[#EADDFF] shadow-lg text-[#21005D]'>
       <AddCircleOutlineOutlinedIcon />
        <p className='font-semibold'> Conversations </p>
    </div>
  )
}

export default AddConversation