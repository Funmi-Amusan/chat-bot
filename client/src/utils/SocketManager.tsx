'use client'

import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { addMessageToConversationAction, setAITyping } from '@/store/conversation';
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

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      transports: ['websocket', 'polling']
    });
    
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket && conversationId) {
      socket.emit('join_conversation', conversationId);
      console.log('from socket', conversationId);
      socket.on('ai_typing_start', (data: Message) => {
        console.log('ai_typing_start')
        if (data.conversationId === conversationId) {
          dispatch(setAITyping(true));
        }
      });
      
      socket.on('ai_typing_stop', (data: Message) => {
        console.log('ai_typing_stop')
        if (data.conversationId === conversationId) {
          dispatch(setAITyping(false));
        }
      });
      
      socket.on('new_message', (newMessage: Message) => {
        console.log('-------')
        if (newMessage.isFromAI && newMessage.conversationId === conversationId) {
          dispatch(setAITyping(false));
        }
        dispatch(addMessageToConversationAction({newMessage, conversationId}));
      });
      
      socket.on('conversation_deleted', ({ id }: { id: string }) => {
        if (id === conversationId) {
          alert('This conversation has been deleted');
        }
      });
      
      return () => {
        socket.emit('leave_conversation', conversationId);
        socket.off('new_message');
        socket.off('conversation_deleted');
        socket.off('ai_typing_start');
        socket.off('ai_typing_stop');
      };
    }
  }, [socket, conversationId, dispatch]);

  return null; 
};

export default SocketManager;