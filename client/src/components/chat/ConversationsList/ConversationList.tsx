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
import ThemeSwitch from '@/components/ui/ThemeSwitch';

interface ConversationListProps {
  conversations: Conversation[];
  user: User | undefined;
}

const ConversationList = ({ conversations, user }: ConversationListProps) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const addNewChat = () => {
    router.push('/chat/new');
  };

  return (
    <>
      {/* Mobile toggle button - always visible on mobile regardless of sidebar state */}
      <div className="fixed w-full bg-amber-700 top-4 left-4 z-50 block lg:hidden">
        {!isMobileSidebarOpen && (
          <SidebarButton 
            onClick={toggleMobileSidebar} 
            isSidebarOpen={false} 
          />
        )}
      </div>
      
      {/* Overlay for mobile - darkens the background when sidebar is open */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Main sidebar */}
      <aside 
        className={`fixed lg:static flex-col p-4 justify-between h-screen transition-all duration-300 ease-in-out border-r border-r-neutral-300/40 bg-white dark:bg-neutral-800 z-40
          ${isSidebarOpen ? 'lg:w-64' : 'lg:w-16'} 
          ${isMobileSidebarOpen ? 'flex w-64 left-0' : 'hidden lg:flex w-16 -left-full'}
        `}
      >
        <div>
          <div className='flex gap-1 items-center pb-10'>
            <div className='hidden lg:block'>
              <SidebarButton onClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            </div>
            
            <div className='block lg:hidden'>
              <SidebarButton onClick={toggleMobileSidebar} isSidebarOpen={true} />
            </div>
            
            {(isSidebarOpen || isMobileSidebarOpen) && 
              <h3 className='text-xl font-semibold dark:text-white inline-flex whitespace-nowrap'>Chat Bot</h3>
            }
          </div>

          <button 
            onClick={addNewChat} 
            className='flex gap-4 items-center rounded-lg hover:bg-violet-100 dark:hover:bg-violet-800/30 w-full transition-colors duration-200'
          >
            <div className='p-1 bg-violet-600 dark:bg-violet-800 rounded-full' >
              <PiPlusBold color='white' size={14} />
            </div>
            
            {(isSidebarOpen || isMobileSidebarOpen) && 
              <p className='text-sm font-medium text-violet-800 dark:text-violet-500 inline-flex whitespace-nowrap'>New Chat</p>
            }
          </button>

          <div className='flex gap-2 mt-3 items-center'>
            <div className='p-1'>
              <PiChatsCircleLight className='dark:text-neutral-300 text-neutral-600' size={22} />
            </div>
            
            {(isSidebarOpen || isMobileSidebarOpen) && 
              <p className='text-sm font-medium text-neutral-600 dark:text-neutral-300 inline-flex whitespace-nowrap'>Recent Chats</p>
            }
          </div>
          
          <div className='h-full w-full flex flex-col gap-2 pb-6 mt-2'>
            <div className='overflow-y-auto max-h-64 flex-1 flex flex-col gap-1.5'>
              {conversations.map((conversation: Conversation) => (
                <div key={conversation.id} className={!isSidebarOpen && !isMobileSidebarOpen ? 'hidden' : ''}>
                  <ConversationItem
                    key={conversation.id}
                    title={conversation?.title || "Untitled Conversation"}
                    id={conversation?.id}
                  />
                </div>
              ))}
              
              {!isSidebarOpen && !isMobileSidebarOpen && conversations.length > 0 && (
                <div className="flex justify-center py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-start gap-4'>
          <ThemeSwitch width={`${isSidebarOpen || isMobileSidebarOpen ? 'w-14' : 'w-10'}`} />
          
          <div className='inline-flex items-center gap-2'>
            <NameIcon />
            {(isSidebarOpen || isMobileSidebarOpen) && (
              <p className='text-sm font-medium truncate'>{user?.name}</p>
            )}
          </div>

          <SignOut isSidebarOpen={isSidebarOpen || isMobileSidebarOpen} />
        </div>
      </aside>
    </>
  );
};

export default ConversationList;