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
import { LuCamera, LuSend, LuCircleX, LuPaperclip } from "react-icons/lu";
import { MdOutlineKeyboardVoice, MdClose } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import Tooltip from '@/components/ui/Tooltip';
import { toast } from 'react-toastify';
import { TextPart, InlineDataPart, FileUploadData } from '@/store/conversation/types';
import { MAX_FILE_SIZE, MAX_FILES, SUPPORTED_DOC_TYPES, SUPPORTED_IMAGE_TYPES } from '@/lib/constants';

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

type ClientPart = TextPart | InlineDataPart; 

const TextInput = ({ conversationId }: { conversationId: string }) => {
    const router = useRouter();
    const { loading, isAITyping, user } = useAppSelector((state) => state.conversationReducer);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<FileUploadData[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isFocused, setIsFocused] = useState(false); 
    const [socket, setSocket] = useState<Socket | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, 120); 
        textarea.style.height = `${newHeight}px`;
      }
    }, [message]);

    const getFileType = (file: File): 'image' | 'document' | 'other' => {
      if (SUPPORTED_IMAGE_TYPES.includes(file.type)) return 'image';
      if (SUPPORTED_DOC_TYPES.includes(file.type)) return 'document';
      return 'other';
    };

    const validateFile = (file: File): { valid: boolean; error?: string } => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        return { valid: false, error: `${file.name} is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.` };
      }

      // Check file type
      const fileType = getFileType(file);
      if (fileType === 'other') {
        return { valid: false, error: `${file.name} has an unsupported file type.` };
      }

      return { valid: true };
    };

    const createFilePreview = (file: File): Promise<string | undefined> => {
      return new Promise((resolve) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => resolve(undefined);
          reader.readAsDataURL(file);
        } else {
          resolve(undefined);
        }
      });
    };

    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          } else {
            reject(new Error('Failed to convert file to base64'));
          }
        };
        reader.onerror = (error) => reject(error);
      });
    };

    const processFiles = async (files: File[]): Promise<FileUploadData[]> => {
      const processedFiles: FileUploadData[] = [];

      for (const file of files) {
        try {
          const validation = validateFile(file);
          if (!validation.valid) {
            toast.error(validation.error);
            continue;
          }

          const preview = await createFilePreview(file);
          const base64 = await fileToBase64(file);
          
          processedFiles.push({
            file,
            preview,
            type: getFileType(file),
            base64
          });
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          toast.error(`Failed to process ${file.name}`);
        }
      }

      return processedFiles;
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>, fileType?: 'image' | 'document') => {
      if (!event.target.files) return;
      
      const filesArray = Array.from(event.target.files);
      
      if (uploadedFiles.length + filesArray.length > MAX_FILES) {
        toast.error(`You can upload a maximum of ${MAX_FILES} files.`);
        event.target.value = '';
        return;
      }

      let filteredFiles = filesArray;
      if (fileType === 'image') {
        filteredFiles = filesArray.filter(file => file.type.startsWith('image/'));
        if (filteredFiles.length !== filesArray.length) {
          toast.error("Only image files are supported for this input.");
        }
      }

      if (filteredFiles.length === 0) {
        event.target.value = '';
        return;
      }

      setIsUploading(true);
      
      try {
        const processedFiles = await processFiles(filteredFiles);
        
        if (processedFiles.length > 0) {
          setUploadedFiles(prev => [...prev, ...processedFiles]);
          toast.success(`Successfully uploaded ${processedFiles.length} file(s)`);
        }
        
      } catch (error) {
        console.error('Error handling files:', error);
        toast.error('Failed to upload files');
      } finally {
        setIsUploading(false);
        event.target.value = '';
      }
    };

    const removeFile = (index: number) => {
      setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const sendMessage = async() => {
      setIsSending(true);

      const hasText = message.trim().length > 0;
      const hasFiles = uploadedFiles.length > 0;

      if (!hasText && !hasFiles) {
        toast.error("Message cannot be empty");
        setIsSending(false);
        return;
      }

      if (!conversationId) {
        toast.error("Invalid conversation ID");
        setIsSending(false);
        return;
      }

      try {
        let currentConversationId = conversationId;
        
        if (conversationId === 'new') {
          if (!user?.id) {
            toast.error('User not found. Please log in.');
            redirect('/login');
          }
          const {data} = await createNewConversation(user.id);
          currentConversationId = data?.id;
        }

        const messageParts: ClientPart[] = [];

        // Add text part if present
        if (hasText) {
          messageParts.push({ text: message.trim() });
        }

        // Add file parts
        for (const fileData of uploadedFiles) {
          if (fileData.base64) {
            messageParts.push({
              inlineData: {
                mimeType: fileData.file.type,
                data: fileData.base64
              }
            });
          }
        }

        const data: MessageData = {
          parts: messageParts, 
          conversationId: currentConversationId
        };

        const validatedData: MessageData = MessageSchema.parse(data);
        
        // Clear inputs
        setMessage("");
        setUploadedFiles([]);
        
        await sendMessageAction(JSON.stringify(validatedData.parts), validatedData.conversationId);
        
        if (conversationId === 'new') {
          router.push(`/chat/${currentConversationId}`);
        }
        
      } catch (error) {
        if (error instanceof z.ZodError) {
          const firstError = error.errors[0];
          toast.error(firstError.message);
        } else {
          console.error('Send message error:', error);
          toast.error("Failed to send message");
        }
      } finally {
        setIsSending(false);
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

    const triggerImageInput = () => {
      imageInputRef.current?.click();
    };

    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };

    const getFileIcon = (fileType: string) => {
      if (fileType.includes('pdf')) return '📄';
      if (fileType.includes('doc')) return '📝';
      if (fileType.includes('excel') || fileType.includes('csv')) return '📊';
      if (fileType.includes('text')) return '📋';
      return '📎';
    };

    return (
      <>
        <SocketManager
          conversationId={conversationId}
          setSocket={setSocket}
          socket={socket}
        />
        <div className="flex flex-col w-full px-4 max-w-3xl mx-auto pb-6">
          <div className="relative rounded-2xl ">
            <div className={`flex flex-col w-full rounded-2xl border py-3 border-neutral-500/50 bg-white dark:bg-neutral-800 ${isFocused ? 'border-neutral-600' : ''}`}>
              
              <div className="relative flex w-full">
                <textarea
                  ref={textareaRef}
                  name="chat-input"
                  id="chat-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Imagine Something...✦˚"
                  className="w-full h-16 bg-transparent rounded-2xl dark:text-white text-base px-3 resize-none outline-none dark:placeholder-white/90 focus:placeholder-neutral-700"
                  rows={1}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={loading || isSending || isUploading}
                />
              </div>

              <div className="flex justify-between items-end px-2.5 pb-2.5">
                <div className="flex gap-4">
                  {/* Hidden file inputs */}
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={(e) => handleFileChange(e, 'image')}
                    multiple 
                    accept="image/*" 
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e)}
                    multiple 
                    accept=".pdf,.doc,.docx,.txt,.csv,.xlsx" 
                    className="hidden"
                  />

                  <Tooltip tooltip="Add images">
                    <button
                      onClick={triggerImageInput} 
                      disabled={isUploading || uploadedFiles.length >= MAX_FILES}
                      className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LuCamera size={20} />
                    </button>
                  </Tooltip>

                  <Tooltip tooltip="Add document">
                    <button 
                      onClick={triggerFileInput}
                      disabled={isUploading || uploadedFiles.length >= MAX_FILES}
                      className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LuPaperclip size={20} />
                    </button>
                  </Tooltip>

                  <Tooltip tooltip="Record audio">
                    <button 
                      onClick={handleNotYetActive}
                      className="text-black/30 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-200 transition-all hover:-translate-y-1"
                    >
                      <MdOutlineKeyboardVoice size={20} />
                    </button>
                  </Tooltip>
                </div>

                <button
                  onClick={sendMessage}
                  disabled={isAITyping !== null || isSending || isUploading || (!message.trim() && uploadedFiles.length === 0)}
                  className="flex items-center justify-center bg-violet-800 p-2 rounded-lg transition-all hover:scale-105 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAITyping || isSending || isUploading ? (
                    <div className="animate-pulse text-white">
                      <TbFidgetSpinner className="animate-spin" size={20} />
                    </div>
                  ) : (
                    <LuSend
                      size={18}
                      className="text-white transition-all hover:-rotate-45 hover:text-white hover:filter hover:drop-shadow-md focus:text-white"
                    />
                  )}
                </button>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="border-t border-neutral-500/50 flex flex-wrap gap-2 p-2">
                  {uploadedFiles.map((fileData, index) => (
                    <div key={index} className="relative group">
                      {fileData.preview ? (
                        // Image preview
                        <img
                          src={fileData.preview}
                          alt={`Preview ${index}`}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ) : (
                        // Document preview
                        <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-700 rounded-md flex flex-col items-center justify-center text-xs">
                          <span className="text-2xl">{getFileIcon(fileData.file.type)}</span>
                          <span className="text-center px-1 truncate w-full">
                            {fileData.file.name.split('.').pop()?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-neutral-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove file"
                      >
                        <MdClose size={16} />
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