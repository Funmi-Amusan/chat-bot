'use client'

import { createNewConversation } from '@/lib/actions/ConversationActions';
import { sendMessageAction } from '@/lib/actions/ConversationActions';
import { useAppSelector } from '@/utils/hooks';
import SocketManager from '@/utils/SocketManager';
import { redirect } from 'next/navigation';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Socket } from 'socket.io-client';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { LuGlobe, LuPaperclip, LuSend, LuPlus, LuCircleX } from "react-icons/lu";
import { TbFidgetSpinner } from "react-icons/tb";
import Tooltip from '@/components/ui/Tooltip';
import { toast } from 'react-toastify';

const MessageSchema = z.object({
  parts: z.array(z.object({
    text: z.string().optional(),
    inlineData: z.object({
      mimeType: z.string(),
      data: z.string()
    }).optional()
  })).min(1, "Message cannot be empty"), 
  conversationId: z.union([
    z.string().uuid("Invalid conversation ID"),
    z.literal('new')
  ])
});

type MessageData = z.infer<typeof MessageSchema>;

interface TextPart {
  text: string;
}

interface InlineDataPart {
  inlineData: {
    mimeType: string;
    data: string; 
  };
}

type ClientPart = TextPart | InlineDataPart; 


const TextInput = ({ conversationId }: { conversationId: string }) => {
    const router = useRouter();
    const { loading, isAITyping, user } = useAppSelector((state) => state.conversationReducer);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); 
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false); 
    const [socket, setSocket] = useState<Socket | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, 120); 
        textarea.style.height = `${newHeight}px`;
      }
    }, [message]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
          const filesArray = Array.from(event.target.files);
          const imageFiles = filesArray.filter(file => file.type.startsWith('image/'));

          if (imageFiles.length === 0 && filesArray.length > 0) {
              toast.error("Only image files are supported for now.");
              return;
          }
          if (selectedFiles.length + imageFiles.length > 2) { 
              toast.error("You can upload a maximum of 2 files.");
              return;
          }

          setSelectedFiles(prevFiles => [...prevFiles, ...imageFiles]);

          imageFiles.forEach(file => {
              const reader = new FileReader();
              reader.onloadend = () => {
                  setPreviewImages(prevPreviews => [...prevPreviews, reader.result as string]);
              };
              reader.readAsDataURL(file);
          });
          event.target.value = '';
      }
  };

  const removeFile = (indexToRemove: number) => {
      setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
      setPreviewImages(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
  };

    const sendMessage = async() => {
      setIsSending(true);

      const hasText = message.trim().length > 0;
      const hasFiles = selectedFiles.length > 0;

      if (!hasText && !hasFiles) {
        toast.error("Message cannot be empty ");
        setIsSending(false);
        return;
      }
      if (!conversationId) {
        toast.error("Invalid conversation ID");
        setIsSending(false);
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

        const messageParts: ClientPart[] = [];

        if (hasText) {
          messageParts.push({ text: message.trim() });
        }

        for (const file of selectedFiles) {
          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file); 
          });
          const [mimeTypePart, dataPart] = base64Data.split(';base64,');
          const mimeType = mimeTypePart.replace('data:', '');

          messageParts.push({
            inlineData: {
              mimeType: mimeType,
              data: dataPart
            }
          });
        }
        const data: MessageData = {
          parts: messageParts, 
          conversationId: conversationId
        };
        const validatedData: MessageData = MessageSchema.parse(data);
        setMessage("");
        setSelectedFiles([]);
        setPreviewImages([]);
        
        await sendMessageAction(JSON.stringify(validatedData.parts), validatedData.conversationId);
        setIsSending(false);
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

    const handleNotYetActive = () => {
      toast.info("This feature is not yet active");
    };

    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };

    return (
      <>
      <SocketManager
        conversationId={conversationId}
        setSocket={setSocket}
        socket={socket}
      />
    <div className="flex flex-col w-full px-4 max-w-3xl mx-auto pb-6">

      <div className="relative rounded-2xl p-0.5 ">

        <div className={`flex flex-col w-full rounded-2xl border py-3  border-neutral-500/50 bg-white dark:bg-neutral-800 ${isFocused ? 'border-neutral-600' : ''}`}>

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
              disabled={loading || isSending }
            />
    </div>
          <div className="flex justify-between items-end px-2.5 pb-2.5">
          <div className="flex gap-4">
      <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple 
          accept="image/*" 
          className="hidden"
      />
      <Tooltip
        tooltip="Attach files"
        className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1"
      >
       <button
          onClick={triggerFileInput} 
          className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1"
       >
                <LuPaperclip size={20} />
              </button>
      </Tooltip>

      <Tooltip
        tooltip="Add item"
        className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1"
      >
          <button onClick={()=> handleNotYetActive()} className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1">
                <LuPlus size={20} />
              </button>
      </Tooltip>

      <Tooltip
        tooltip="Browse web"
        className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1"
      >
        <button onClick={()=> handleNotYetActive()} className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1">
                <LuGlobe size={20} />
              </button>
      </Tooltip>
    </div>

            <button
            onClick={() => sendMessage()}
              className="flex items-center justify-center bg-violet-800 p-2 rounded-lg transition-all hover:scale-105 active:scale-90"
            >
              {isAITyping || isSending ? (
                <div className="animate-pulse text-white">
                  <TbFidgetSpinner className="animate-spin" size={20} />
                </div>
              ) :
              (<LuSend
                size={18}
                className="text-white transition-all hover:-rotate-45 hover:text-white hover:filter hover:drop-shadow-md focus:text-white"
              />)

              }
            </button>
        </div>
        {previewImages.length > 0 && (
          <div className=" border-t border-neutral-500/50 flex flex-wrap gap-2 p-2 ">
              {previewImages.map((src, index) => (
                  <div key={index} className="relative group">
                      <img
                          src={src}
                          alt={`Preview ${index}`}
                          className="w-20 h-20 object-cover rounded-md"
                      />
                      <button
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-neutral-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove file"
                      >
                          <LuCircleX size={16} />
                      </button>
                  </div>
              ))}
          </div>
      )}
      </div>
    </div>
    </div>
    </>
    );
};

export default TextInput;