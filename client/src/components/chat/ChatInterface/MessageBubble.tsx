'use client'

import SplitText from "@/components/ui/SplitText";
import { MessagePart } from "@/store/conversation/types";
import { useAppSelector } from "@/utils/hooks";
import { marked } from 'marked';
import React from "react";


const MessageBubble = ({ parts, isFromAI, id }: { parts: MessagePart[]; isFromAI?: boolean; id: string }) => {
  const {
    allowTypwriterAnimation
  } = useAppSelector((state) => state.conversationReducer);

  return (
    <div className={` font-inter w-fit text-sm md:text-base ${!isFromAI ? 'ml-auto rounded-lg px-4 py-1 my-1 shadow-sm bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 ' : 'mr-auto text-neutral-800 dark:text-neutral-200 font-medium font-serif text-base'} `}>
       {parts.map((part, index) => (
         <React.Fragment key={index}>
           {part.text && (
             <div className="mb-1"> 
               {(isFromAI && allowTypwriterAnimation === id) ? (
                 <SplitText text={marked.parse(part.text || '', { async: false })} />
               ) : (
                 <div className="markdown-rendered" dangerouslySetInnerHTML={{ __html: marked.parse(part.text || '', { async: false }) }} />
               )}
             </div>
           )}
           {part.inlineData && part.inlineData.mimeType.startsWith('image/') && (
             <img 
               src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`} 
               alt="Uploaded image" 
               className="max-w-xs md:max-w-sm lg:max-w-md rounded-lg mt-2 object-contain" 
             />
           )}
           {part.fileData && part.fileData.mimeType.startsWith('image/') && (
             <img 
               src={part.fileData.uri} 
               alt="Uploaded image" 
               className="max-w-xs md:max-w-sm lg:max-w-md rounded-lg mt-2 object-contain" 
             />
           )}
           {part.fileData && !part.fileData.mimeType.startsWith('image/') && (
             <a href={part.fileData.uri} download className="text-blue-500 hover:underline mt-2 block">
               Download File: {part.fileData.mimeType}
             </a>
           )}
         </React.Fragment>
       ))}
    </div>
  );
};

export default MessageBubble;