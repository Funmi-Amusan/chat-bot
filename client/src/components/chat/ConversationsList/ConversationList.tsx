'use client'

import { useState } from 'react';
import ConversationItem from '@/components/chat/ConversationsList/ConversationItem';
import { Conversation } from '@/store/conversation/types';
import SidebarButton from '@/components/ui/SidebarButton';
import { PiChatsCircleLight, PiPlusCircleFill } from "react-icons/pi";
import { User } from 'next-auth';
import SignOut from '@/components/auth/sign-out';

interface ConversationListProps {
  conversations: Conversation[];
  user: User;
}

const ConversationList = ({ conversations, user }: ConversationListProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside 
      className={`flex-col flex p-4 justify-between h-full transition-all duration-1000 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-14'
      }`}
    >
      <div>
      <div className='flex gap-1 items-center pb-6'>
       <SidebarButton onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        {isSidebarOpen && <h3 className='text-2xl font-semibold inline-flex whitespace-nowrap'>Chat Bot</h3>}
      </div>

      <div className='flex gap-2 items-center'>
        <div className='p-1' >

      <PiPlusCircleFill color='#5d0ec0' size={28} />
        </div>
        
        {isSidebarOpen && <p className='text-sm font-medium inline-flex whitespace-nowrap'>New Chat</p>}
      </div>

      <div className='flex gap-2 items-center'>
        <div className='p-1'>
      <PiChatsCircleLight color='gray' size={24}  />
        </div>
        
        {isSidebarOpen && <p className='text-sm font-medium inline-flex whitespace-nowrap'>Recent Chats</p>}
      </div>
      
      {isSidebarOpen && (
        <div className='h-full w-full flex flex-col gap-5 text-[#1D1B20] pb-6 mt-4'>
            <div className='overflow-y-auto scrollbar-hide flex-1 flex flex-col gap-2'>
                {conversations.map((conversation: Conversation) => (
                    <ConversationItem
                        key={conversation.id}
                        title={conversation?.title || "Untitled Conversation"}
                        id={conversation?.id}
                    />
                ))}
            </div>
        </div>
      )}

      </div>

<div className='flex flex-col gap-4'>
      <div className='inline-flex whitespace-nowrap items-center gap-1 '>
    <p className=' bg-violet-200 text-violet-800 font-bold text-base h-6 w-6 items-center justify-center text-center rounded-full inline-flex whitespace-nowrap '>F</p>
    {isSidebarOpen && (
      <p className='text-sm font-medium inline-flex whitespace-nowrap'>{user?.email}</p>
    )}
      </div>

  <SignOut isSidebarOpen={isSidebarOpen} />

</div>
 

    </aside>
  );
};

export default ConversationList;