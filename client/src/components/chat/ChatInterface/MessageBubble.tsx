'use client'

import SplitText from "@/components/ui/SplitText";
import { useAppSelector } from "@/utils/hooks";
import { marked } from 'marked';
import { useMemo } from "react"; 

const MessageBubble = ({ content, isFromAI, id }: { content: string; isFromAI?: boolean; id: string }) => {

  const {
    allowTypwriterAnimation
  } = useAppSelector((state) => state.conversationReducer);

  const htmlContent = useMemo(() => {
    return marked.parse(content, { async: false });
  }, [content]); 

    return (
      <div className={` font-inter w-fit text-sm md:text-base ${!isFromAI ? 'ml-auto rounded-lg px-4 py-1 my-1 shadow-sm bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 ' : 'mr-auto text-neutral-800 dark:text-neutral-200 font-medium font-serif text-base'} `}>
       {
        allowTypwriterAnimation === id ? (
         <SplitText text={htmlContent} /> 
        ) : (
          <div className="markdown-rendered" dangerouslySetInnerHTML={{ __html: htmlContent }} />
       )
       }
      </div>
    );
  };

  export default MessageBubble;