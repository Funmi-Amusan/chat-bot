'use client'

import { createNewConversation } from '@/lib/actions/ConversationActions';
import { SendMessageAction } from '@/store/conversation/action';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import SocketManager from '@/utils/SocketManager';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { redirect } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
    const [validationError, setValidationError] = useState<string | null>(null);
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
      setValidationError(null);
      
      if (message.trim() === "") return;
      if (!conversationId) return;
      
      try {
        if (conversationId === 'new') {
          if (!user) {
            alert('No user when trying to create new conversation before sending message')
            redirect('/login')
          }
          const {data} = await createNewConversation(user)
          conversationId = data.conversation.id;
        }
        const data = {
          content: message,
          conversationId
        };
        toast('Here is your toast')
        const validatedData: MessageData = MessageSchema.parse(data);
        console.log('=====')
        setMessage("");
        await dispatch(SendMessageAction(validatedData));
        router.push(`/chat/${conversationId}`)
      } catch (error) {
        if (error instanceof z.ZodError) {
          const firstError = error.errors[0];
          setValidationError(firstError.message);
          console.error("Validation error:", error.errors);
        } else {
          console.error("Error sending message:", error);
          setValidationError("Failed to send message");
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
        <div className="flex flex-col p-4 bg-amber-300 w-full">
          <div className={`flex items-center justify-between bg-[#ECE6F0] w-full md:p-1 rounded-4xl max-h-[150px] ${ isFocused ? 'border' : 'border-none'} ${ isAITyping ? 'opacity-40 ' : 'opacity-100'} `}>
            <textarea 
              ref={textareaRef}
              name="chat-input" 
              id="chat-input" 
              value={message}
              onChange={(e) => setMessage(e.target.value)} 
              onKeyDown={handleKeyDown}
              placeholder='Reply to chatbot' 
              className='text-[#625B71] placeholder:text-[#625B71] w-full outline-none bg-transparent resize-none min-h-[36px] max-h-[120px] overflow-y-auto py-2 px-3 disabled:cursor-not-allowed '
              rows={1}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)} 
              disabled={loading }
            />
           <div 
    onClick={() =>  message.trim() !== "" && sendMessage()} 
    className={`px-4 flex-shrink-0 ${
      message.trim() === "" ? "text-gray-400 cursor-not-allowed" : "text-[#625B71] cursor-pointer"
    }`}
  >
    <SendOutlinedIcon style={{ color: isAITyping ? "#A0A0A0" : "#625B71" }} />
  </div>
          </div>
        </div>
      </>
    );
};

export default TextInput;