'use client';

import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import Image from 'next/image';
import { ImageAssets } from '@/assets/images';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import ActiveTypingBubble from './ActiveTypingBubble';
import { Message } from '@/store/conversation/types';
import { setMessagesData } from '@/store/conversation';

const ChatWindow = ({messages: messagesProp}: {messages: Message[]}) => {

 const dispatch = useAppDispatch();
 const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  dispatch(setMessagesData(messagesProp));
}, []);

const {
  isAITyping,
  messages,
} = useAppSelector((state) => state.conversationReducer);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAITyping]); 


  return (
    <div className="h-full overflow-y-auto w-full md:p-4 scrollbar-hide flex-col">
    {messages?.length > 0 && (
        messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div
              className={`flex gap-2 items-end ${
                message?.isFromAI ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full">
                <Image
                  src={message?.isFromAI ? ImageAssets.ChatBotAvatar : ImageAssets.userAvatar}
                  alt={message?.isFromAI ? 'Chat Bot Avatar' : 'User Avatar'}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <MessageBubble isFromAI={message?.isFromAI} content={message?.content} />
              </div>
            </div>
          </div>
        ))
      )}

{isAITyping && (
        <div className="flex gap-2 items-end mb-4"> 
           <div className="flex-shrink-0 w-8 h-8 rounded-full">
            <Image
              src={ImageAssets.ChatBotAvatar}
              alt="bot avatar"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-grow">
             <ActiveTypingBubble />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
      <div
            className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none" 
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0))',
              zIndex: 1,
            }}
          />
          
    </div>
  );
};

export default ChatWindow;
