'use client';

import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '@/utils/hooks';
import MessageBubble from './MessageBubble';
import ChatBotAvatar from '@/assets/ChatBotAvatar.png';
import UserAvatar from '@/assets/UserAvatar.png';
import Image from 'next/image';
import ActiveTypingBubble from './ActiveTypingBubble';
import Spinner from '../ui/Spinner';

const ChatWindow = () => {
  const { conversationData, isAITyping, loading } = useAppSelector((state) => state.conversationReducer);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationData?.messages, isAITyping]);

  return (
    <div className="h-full overflow-y-auto w-full md:p-4 scrollbar-hide">
      {loading && <Spinner />}
      {!loading && conversationData?.messages && conversationData?.messages?.length > 0 && (
          <p className="text-[#1D192B] text-center mb-4">
            {new Date(conversationData?.messages[0]?.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </p>
        )}
      {!loading && conversationData?.messages && conversationData?.messages?.length > 0 ? (
        conversationData.messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div
              className={`flex gap-4 items-end ${
                message?.isFromAI ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="flex-shrink-0 h-12 w-12">
                <Image
                  src={message?.isFromAI ? ChatBotAvatar : UserAvatar}
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
      ) : (
        <div className="flex items-center justify-center h-full">
          <h2>How can I help you today?</h2>
        </div>
      )}

      {isAITyping && (
        <div className="flex items-start">
          <div className="mr-2">
            <Image
              src={ChatBotAvatar}
              alt="bot avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <ActiveTypingBubble />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
