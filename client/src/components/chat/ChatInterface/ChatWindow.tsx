'use client';

import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { ImageAssets } from '@/assets/images';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { motion } from 'framer-motion';
import { Message } from '@/store/conversation/types';
import { setMessagesData } from '@/store/conversation';
import EmptyChat from './EmptyChat';
import ShinyText from '@/components/ui/BaseShinyText';
import NameIcon from '@/components/ui/NameIcon';

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
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [messages, isAITyping]); 


  return (
    <div className="h-full overflow-y-auto w-full md:p-4 scrollbar-hide flex-col">
    {messages?.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div
              className={`flex gap-2 items-end ${
                message?.isFromAI ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
             <div className="flex-shrink-0 w-8 h-8 rounded-full">
  {!message?.isFromAI && (
  <NameIcon />
  )}
</div>
              <div className="flex-grow">
                <MessageBubble isFromAI={message?.isFromAI} content={message?.content} id={message?.id} />
              </div>
            </div>
          </div>
        ))
      ): (
        <EmptyChat />
      )}

{isAITyping && (
        <div className="flex gap-2 items-end mb-4"> 
           <div className="flex-shrink-0 w-8 h-8 rounded-full">
            <motion.img
            initial={{ opacity: 0.7, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.9, 
              repeat: Infinity, 
              repeatType: "loop"
            }}

              src={ImageAssets.Logo.src}
              alt="bot avatar"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>
         <ShinyText text='ChatBot is thinking...' />
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
