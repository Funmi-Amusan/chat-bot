'use client';

import React from 'react';
import MessageBubble from './MessageBubble';
import Image from 'next/image';
import { ImageAssets } from '@/assets/images';
import { Message } from '@/store/conversation/types';
import { useAppSelector } from '@/utils/hooks';
import ActiveTypingBubble from './ActiveTypingBubble';

const ChatWindow = ({messages}: {messages: Message[]}) => {

  const {
    isAITyping,
    conversationData,
    loading,
  } = useAppSelector((state) => state.conversationReducer);
  console.log('isAITyping', isAITyping);
 
  return (
    <div className="h-full overflow-y-auto w-full md:p-4 scrollbar-hide">
    {messages?.length > 0 && (
        messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div
              className={`flex gap-4 items-end ${
                message?.isFromAI ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="flex-shrink-0 h-12 w-12">
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

      {/* {isAITyping && (
        <div className="flex items-start">
          <div className="mr-2">
            <Image
              src={ImageAssets.ChatBotAvatar}
              alt="bot avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <ActiveTypingBubble />
        </div>
      )} */}

      {/* <div ref={messagesEndRef} /> */}
    </div>
  );
};

export default ChatWindow;
