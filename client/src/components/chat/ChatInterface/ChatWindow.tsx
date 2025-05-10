'use client';

import React, { use, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/utils/hooks';
import MessageBubble from './MessageBubble';
import Image from 'next/image';
import ActiveTypingBubble from './ActiveTypingBubble';
import Spinner from '@/components/ui/Spinner';
import { ImageAssets } from '@/assets/images';
import { redirect, useParams } from 'next/navigation';
import { getAConverstaionById } from '@/lib/actions/ConversationActions';

const ChatWindow = () => {
  const {id} = useParams()
  const conversationId = id;
  if (!conversationId) {
    redirect('/login');
  }

  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    const fetchConversation = async () => {
      if (conversationId) {
        const conversation = await getAConverstaionById(conversationId as string);
        setMessages(conversation.data.messages);
      }
    }
    fetchConversation();
  }, [conversationId]);

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
      )}

      <div ref={messagesEndRef} /> */}
    </div>
  );
};

export default ChatWindow;
