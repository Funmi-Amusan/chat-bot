'use client';

import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { ImageAssets } from '@/assets/images';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { motion } from 'framer-motion';
import { Message } from '@/store/conversation/types';
import { setAITyping, setMessagesData, clearStreamingState } from '@/store/conversation';
import EmptyChat from './EmptyChat';
import ShinyText from '@/components/ui/BaseShinyText';
import NameIcon from '@/components/ui/NameIcon';

const ChatWindow = ({messages: messagesProp}: {messages: Message[]}) => {

  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isAITyping,
    messages,
    user
  } = useAppSelector((state) => state.conversationReducer);

  useEffect(() => {
    dispatch(clearStreamingState());
    dispatch(setMessagesData(messagesProp));
  }, [dispatch, messagesProp]); 

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAITyping]); 

  useEffect(() => {
    return () => {
      dispatch(clearStreamingState());
    };
  }, [dispatch]);

  return (
    <div className="h-full overflow-y-auto w-full md:p-4 scrollbar-hide flex-col">
      {messages?.length > 0 ? (
        messages.map((message) => {
          return (
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
                <MessageBubble 
                  isFromAI={message?.isFromAI} 
                  parts={message?.parts} 
                  id={message?.id} 
                />
              </div>
            </div>
          </div>
          );
        })
      ) : (
        <EmptyChat user={user} />
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
        className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none bg-linear-to-t from-white/60 to-transparent dark:from-neutral-800/60 z-10 " 
      />
    </div>
  );
};

export default ChatWindow;