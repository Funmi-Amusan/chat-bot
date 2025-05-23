'use client'

import { useEffect } from 'react';
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
      socket.on('ai_typing_start', (data: Message) => {
        if (data.conversationId === conversationId) {
          dispatch(setAITyping(true));
        }
      });
      
      socket.on('ai_typing_stop', (data: Message) => {
        if (data.conversationId === conversationId) {
          dispatch(setAITyping(false));
        }
      });
      
      // socket.on('new_message', (newMessage: Message) => {
      //   if (newMessage.isFromAI && newMessage.conversationId === conversationId) {
      //     dispatch(setAITyping(false));
      //   }
      //   dispatch(addMessageToConversationAction({newMessage, conversationId}));
      //   dispatch(setAllowTypwriterAnimation(newMessage.id));
      // });

      socket.on('new_message_chunk', (chunkData: { conversationId: string, content: string, isFromAI: boolean, messageId?: string }) => {
        if (chunkData.isFromAI && chunkData.conversationId === conversationId) {
            dispatch(appendChunkToAIMessage({
                conversationId: chunkData.conversationId,
                chunk: chunkData.content,
            }));
            if (chunkData.messageId) { 
                 dispatch(setAllowTypwriterAnimation(chunkData.messageId));
            }
        }
    });
    
    socket.on('new_message', (fullMessage: Message) => {
        if (fullMessage.isFromAI && fullMessage.conversationId === conversationId) {
            dispatch(updateAIMessage({
                conversationId: fullMessage.conversationId,
                message: fullMessage 
            }));
            dispatch(setAllowTypwriterAnimation(null)); 
            dispatch(setAITyping(false));
        } else {
            dispatch(addMessageToConversationAction({ newMessage: fullMessage, conversationId }));
        }
    });
    
    socket.on('ai_typing_stop', ({ conversationId: stoppedConversationId }: { conversationId: string }) => {
        if (stoppedConversationId === conversationId) {
            dispatch(setAITyping(false));
            dispatch(setAllowTypwriterAnimation(null)); 
        }
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