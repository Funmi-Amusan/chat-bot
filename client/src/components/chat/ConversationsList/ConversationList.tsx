'use client'

import { useState } from 'react';
import ConversationItem from '@/components/chat/ConversationsList/ConversationItem';
import { Conversation } from '@/store/conversation/types';
import SidebarButton from '@/components/ui/SidebarButton';
import { PiChatsCircleLight, PiPlusBold } from "react-icons/pi";
import { User } from 'next-auth';
import SignOut from '@/components/auth/sign-out';
import NameIcon from '@/components/ui/NameIcon';
import { useRouter } from 'next/navigation';
import ThemeSwitch from '@/components/ui/ThemeSwitchSmall';

interface ConversationListProps {
  conversations: Conversation[];
  user: User | undefined;
}

const ConversationList = ({ conversations, user }: ConversationListProps) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const  addNewChat = () => {
  router.push('/chat/new');
  };

  return (
    <aside 
      className={`flex-col flex p-4 justify-between h-screen transition-all duration-300 ease-in-out border-[0.5px] border-r border-r-neutral-300/40 ${
        isSidebarOpen ? 'w-64' : 'w-14'
      }`}
    >
      <div>
      <div className='flex gap-1 items-center pb-6'>
       <SidebarButton onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        {isSidebarOpen && <h3 className='text-2xl font-semibold inline-flex whitespace-nowrap dark:text-white'>Chat Bot</h3>}
      </div>

      <button onClick={() => addNewChat()} className='flex gap-2 items-center hover:bg-violet-800/30'>
    
        <div className='p-1.5 bg-[#5d0ec0] rounded-full' >

<PiPlusBold color='white' size={14} />
  </div>
        
        {isSidebarOpen && <p className='text-sm font-medium inline-flex whitespace-nowrap dark:text-violet-800  '>New Chat</p>}
      </button>

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
  <ThemeSwitch className={`${isSidebarOpen ? '' : 'scale-50'}`} />
      <div className='inline-flex whitespace-nowrap items-center gap-1 '>
      <NameIcon />
    {isSidebarOpen && (
      <p className='text-sm font-medium inline-flex whitespace-nowrap'>{user?.name}</p>
    )}
      </div>

  <SignOut isSidebarOpen={isSidebarOpen} />

</div>
 

    </aside>
  );
};

export default ConversationList;