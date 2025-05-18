'use client';

import { User } from 'next-auth';
import React from 'react';


const EmptyChat = ({user}: {user: User|null}) => {
//  const dispatch = useAppDispatch();
//  const router = useRouter()
  //  const emptyChatPrompts = [
  //   {
  //     icon: <CiGlobe color='purple' size={24} />,
  //     title: 'Last 24 hours',
  //     content: 'Tell me what has happened ver the last 24 hours',
  //   },
  //   {
  //     icon: <CiBeaker1 color='purple' size={24} />,
  //     title: 'Learn',
  //     content: 'Explain Quantum computing in simple terms',
  //   },
  //   {
  //     icon: <CiStar color='purple' size={24} />,
  //     title: 'Random',
  //     content: 'Tell me an interesting random fact',
  //   },

  // ]

  // const sendPromptMessage = async (content: string) => {
  //   if(!user) {
  //       redirect( '/login')
  //   }
  //   const userId = user as string
  //   try {
  //     const {data: conversationData} = await createNewConversation(userId)
  //     const conversationId = conversationData.conversation.id;
      
  //     const data = {
  //       content,
  //       conversationId
  //     };
  //     await dispatch(SendMessageAction(data));
  //     router.push(`/chat/${conversationId}`)
  //   } catch (error) {
  //       toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
     
  //   }
  // }
  

  return (
    <div className="h-full flex justify-center items-center text-center w-full  px-12 md:px-4 flex-col gap-6">
                      <h3 className='text-2xl text-black/50 dark:text-white/70 font-semibold'>Hi, {user?.name}</h3>
                      <h3 className='text-3xl dark:text-white font-semibold'> How may I assist you today?</h3>
                      {/* <div className='flex items-center gap-6'>
               {emptyChatPrompts.map((chatPrompt) => (
                <PromptCard key={chatPrompt.title} icon={chatPrompt.icon} title={chatPrompt.title} content={chatPrompt.content} onClick={(e)=>sendPromptMessage(e)} />
               ))}
                      </div> */}
                      
    </div>
  );
};

export default EmptyChat;
