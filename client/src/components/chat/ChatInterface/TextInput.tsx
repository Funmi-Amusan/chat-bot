'use client'

import { createNewConversation } from '@/lib/actions/ConversationActions';
import { SendMessageAction } from '@/store/conversation/action';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import SocketManager from '@/utils/SocketManager';
import { redirect } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LuGlobe, LuPaperclip, LuSend, LuPlus } from "react-icons/lu";

const MessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(5000, "Message is too long"),
  conversationId: z.union([
    z.string().uuid("Invalid conversation ID"),
    z.literal('new')
  ])
});

type MessageData = z.infer<typeof MessageSchema>;

const TextInput = ({ conversationId }: { conversationId: string }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, isAITyping, user } = useAppSelector((state) => state.conversationReducer);
    const [message, setMessage] = useState("");
    const [isFocused, setIsFocused] = useState(false); 
    const [socket, setSocket] = useState<Socket | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, 120); 
        textarea.style.height = `${newHeight}px`;
      }
    }, [message]);

    const sendMessage = async() => {
      if (message.trim() === "") {
        toast.error("Message cannot be empty"); 
        return;
    }
    if (!conversationId) {
        toast.error("Invalid conversation ID");
        return;
    }
      
      try {
        if (conversationId === 'new') {
          if (!user?.id) {
            toast.error('User not found. Please log in.');
            redirect('/login');
          }
          const {data} = await createNewConversation(user.id)
          conversationId = data?.id
        }
        const data = {
          content: message,
          conversationId
        };
        const validatedData: MessageData = MessageSchema.parse(data);
        setMessage("");
        await dispatch(SendMessageAction(validatedData));
        router.push(`/chat/${conversationId}`)
      } catch (error) {
        if (error instanceof z.ZodError) {
          const firstError = error.errors[0];
          toast.error(firstError.message);
        } else {
          toast.error("Failed to send message");
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          return;
        } else {
          e.preventDefault();
          sendMessage();
        }
      }
    };

    return (
      <>
        <SocketManager 
          conversationId={conversationId} 
          setSocket={setSocket} 
          socket={socket}
        />
      <div className="flex flex-col w-full px-4 max-w-3xl mx-auto pb-6">
      <div className="relative rounded-2xl p-0.5  overflow-hidden">
     
        <div className="flex flex-col w-full rounded-2xl border py-3 border-neutral-500/50 bg-white dark:bg-neutral-800 overflow-hidden">
 
          <div className="relative flex w-full">
              <textarea 
              ref={textareaRef}
              name="chat-input" 
              id="chat-input" 
              value={message}
              onChange={(e) => setMessage(e.target.value)} 
              onKeyDown={handleKeyDown}
               placeholder="Imagine Something...✦˚"
              className="w-full h-16 bg-transparent rounded-2xl dark:text-white text-base px-3  resize-none outline-none dark:placeholder-white/90 focus:placeholder-neutral-700"
              rows={1}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)} 
              disabled={loading }
            />
    </div>
          <div className="flex justify-between items-end px-2.5 pb-2.5">
            <div className="flex gap-4">
              <button className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1">
                <LuPaperclip size={20} />
              </button>
              <button className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1">
                <LuPlus size={20} />
              </button>
              <button className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1">
                <LuGlobe size={20} />
              </button>
            </div>
            
            <button 
            onClick={() =>  message.trim() !== "" && sendMessage()} 
              className="flex items-center justify-center bg-violet-800 p-2 rounded-lg transition-all hover:scale-105 active:scale-90"
            >
                <LuSend 
                  size={18} 
                  className="text-white transition-all hover:-rotate-45 hover:text-white hover:filter hover:drop-shadow-md focus:text-white" 
                />
            </button>
        </div>
      </div>
    </div>
    </div>
      </>
    );
};

export default TextInput;