'use client';

import PromptCard from '@/components/ui/PromptCard';
import { createNewConversation } from '@/lib/actions/ConversationActions';
import { SendMessageAction } from '@/store/conversation/action';
import { useAppDispatch } from '@/utils/hooks';
import { User } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { CiBeaker1, CiGlobe, CiStar } from "react-icons/ci";

const EmptyChat = ({user}: {user: User|null}) => {
 const dispatch = useAppDispatch();
 const router = useRouter()
   const emptyChatPrompts = [
    {
      icon: <CiGlobe color='purple' size={24} />,
      title: 'Last 24 hours',
      content: 'Tell me what has happened ver the last 24 hours',
    },
    {
      icon: <CiBeaker1 color='purple' size={24} />,
      title: 'Learn',
      content: 'Explain Quantum computing in simple terms',
    },
    {
      icon: <CiStar color='purple' size={24} />,
      title: 'Random',
      content: 'Tell me an interesting random fact',
    },

  ]
console.log('77777',user)

  const sendPromptMessage = async (content: string) => {
    if(!user) {
        redirect( '/login')
    }
    console.log('-----', user)
    const userId = user as string
    try {
      const {data: conversationData} = await createNewConversation(userId)
      console.log('dataaaa', conversationData)
      const conversationId = conversationData.conversation.id;
      
      const data = {
        content,
        conversationId
      };
    console.log('-----------', conversationId)
      await dispatch(SendMessageAction(data));
      router.push(`/chat/${conversationId}`)
    } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
     
    }
  }
  

  return (
    <div className="h-full flex justify-center items-center text-center w-full md:p-2 flex-col gap-6">
                      <h3 className='text-2xl text-black/50 dark:text-white/70 font-semibold'>Welcome to Chat Bot</h3>
                      <h3 className='text-3xl dark:text-white font-semibold'>Good day! How may I assist you today?</h3>
                      <div className='flex items-center gap-6'>
               {emptyChatPrompts.map((chatPrompt) => (
                <PromptCard key={chatPrompt.title} icon={chatPrompt.icon} title={chatPrompt.title} content={chatPrompt.content} onClick={(e)=>sendPromptMessage(e)} />
               ))}
                      </div>
                      
    </div>
  );
};

export default EmptyChat;
