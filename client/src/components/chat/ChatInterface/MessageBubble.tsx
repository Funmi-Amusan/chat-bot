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

  const images = parts.filter(part => 
    (part.inlineData && part.inlineData.mimeType.startsWith('image/')) ||
    (part.fileData && part.fileData.mimeType.startsWith('image/'))
  );
  
  const textAndOtherContent = parts.filter(part => 
    !((part.inlineData && part.inlineData.mimeType.startsWith('image/')) ||
      (part.fileData && part.fileData.mimeType.startsWith('image/')))
  );

  return (
    <div className={`w-fit  items-end flex flex-col ${!isFromAI ? 'ml-auto  ' : ''}`}>
      {images.map((part, index) => (
        <React.Fragment key={`image-${index}`}>
          {part.inlineData && part.inlineData.mimeType.startsWith('image/') && (
            <img 
              src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`} 
              alt="Uploaded image" 
              className="w-30 h-30 rounded-lg mt-2 object-cover" 
            />
          )}
          {part.fileData && part.fileData.mimeType.startsWith('image/') && (
            <img 
              src={part.fileData.uri} 
              alt="Uploaded image" 
              className="w-30 h-30 rounded-lg mt-2 object-cover" 
            />
          )}
        </React.Fragment>
      ))}
      
      {textAndOtherContent.map((part, index) => (
        <React.Fragment key={`content-${index}`}>
          {part.fileData && !part.fileData.mimeType.startsWith('image/') && (
            <a href={part.fileData.uri} download className="text-blue-500 hover:underline mt-2 block">
              Download File: {part.fileData.mimeType}
            </a>
          )}
          {part.text && (
            <div className={`font-inter w-fit text-sm md:text-base ${!isFromAI ? 'ml-auto rounded-lg py-1 my-1' : 'mr-auto text-neutral-800 dark:text-neutral-200 font-medium font-serif text-base'}`}> 
              {(isFromAI && allowTypwriterAnimation === id) ? (
                <SplitText text={marked.parse(part.text || '', { async: false })} />
              ) : (
                <div className={`markdown-rendered ${!isFromAI ? 'py-1 px-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200' : ''} `} dangerouslySetInnerHTML={{ __html: marked.parse(part.text || '', { async: false }) }} />
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessageBubble;