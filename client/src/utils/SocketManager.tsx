'use client'

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { addMessageToConversationAction, appendChunkToAIMessage, setAITyping, setAllowTypwriterAnimation, updateAIMessage } from '@/store/conversation';
import { Message } from '@/store/conversation/types';
import { useAppDispatch } from '@/utils/hooks';

interface SocketManagerProps {
  conversationId?: string;
  setSocket: (socket: Socket) => void;
  socket: Socket | null;
}

const ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

const SocketManager = ({ conversationId, setSocket, socket }: SocketManagerProps) => {
  const dispatch = useAppDispatch();
  const currentConversationId = useRef<string | undefined>(conversationId);

  // Initialize socket connection once
  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      transports: ['websocket', 'polling']
    });
    
    setSocket(newSocket);

    newSocket.on('new_message_chunk', (chunkData: { conversationId: string, content: string, isFromAI: boolean, messageId?: string }) => {
      console.log('Received chunk data:', chunkData);
      if (chunkData.isFromAI && chunkData.conversationId === currentConversationId.current) {
        dispatch(appendChunkToAIMessage({
          conversationId: chunkData.conversationId,
          chunk: chunkData.content,
        }));
        if (chunkData.messageId) { 
          dispatch(setAllowTypwriterAnimation(chunkData.messageId));
        }
      }
    });
    
    newSocket.on('new_message', (fullMessage: Message) => {
      if (fullMessage.conversationId === currentConversationId.current) {
        if (fullMessage.isFromAI) {
          dispatch(updateAIMessage({
            conversationId: fullMessage.conversationId,
            message: fullMessage 
          }));
          dispatch(setAllowTypwriterAnimation(null)); 
          dispatch(setAITyping(null));
        } else {
          dispatch(addMessageToConversationAction({ newMessage: fullMessage, conversationId: currentConversationId.current! }));
        }
      }
    });

    newSocket.on('ai_typing_start', (data: Message) => {
      if (data.conversationId === currentConversationId.current) {
        dispatch(setAITyping(currentConversationId.current));
      }
    });
    
    newSocket.on('ai_typing_stop', (data: { conversationId: string }) => {
      if (data.conversationId === currentConversationId.current) {
        dispatch(setAITyping(null));
        dispatch(setAllowTypwriterAnimation(null));
      }
    });
    
    newSocket.on('conversation_deleted', ({ id }: { id: string }) => {
      if (id === currentConversationId.current) {
        alert('This conversation has been deleted');
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [setSocket, dispatch]);

  useEffect(() => {
    currentConversationId.current = conversationId;

    if (socket && conversationId) {
      socket.emit('join_conversation', conversationId);
      
      return () => {
        socket.emit('leave_conversation', conversationId);
      };
    }
  }, [socket, conversationId]);

  return null; 
};

export default SocketManager;