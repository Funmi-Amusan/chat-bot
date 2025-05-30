'use client';

import PromptCard from '@/components/ui/PromptCard';
import { createNewConversation } from '@/lib/actions/ConversationActions';
import { useAppDispatch } from '@/utils/hooks';
import { User } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { sendMessageAction } from '@/lib/actions/ConversationActions';
import { ClientPart } from '@/store/conversation/types';
import { setAITyping } from '@/store/conversation';
import { emptyChatPrompts } from '@/utils/data-react';


const EmptyChat = ({user}: {user: User|null}) => {
 const dispatch = useAppDispatch();
 const router = useRouter()
 

  const sendPromptMessage = async (content: string) => {
    if(!user) {
        redirect( '/login')
    }
    const userId = user.id as string
    try {
        dispatch(setAITyping('new'));
      const {data} = await createNewConversation(userId)
      const conversationId = data.id;
    
          const messageParts: ClientPart[] = [];
      
                messageParts.push({ text: content.trim() });
              
              await sendMessageAction(JSON.stringify(messageParts), conversationId);
      router.push(`/chat/${conversationId}`)
    } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
     
    }
  }

  return (
    <div className="h-full flex justify-center items-center text-center w-full  md:px-12  flex-col gap-6">
                      <h3 className='text-2xl text-black/50 dark:text-white/70 font-semibold'>Hi, {user?.name}</h3>
                      <h3 className='text-3xl dark:text-white font-semibold'> How may I assist you today?</h3>
                      <div className='flex flex-col md:flex-row items-center md:gap-6 gap-2'>
               {emptyChatPrompts.map((chatPrompt) => (
                <PromptCard onClick={()=> {
                  sendPromptMessage(chatPrompt.content)
                }} key={chatPrompt.title} icon={chatPrompt.icon} title={chatPrompt.title}
                 content={chatPrompt.content}  />
               ))}
                      </div>
                      
    </div>
  );
};

export default EmptyChat;


