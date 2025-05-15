'use client'

import Typewriter from "@/components/ui/TypewriterText";
import { useAppSelector } from "@/utils/hooks";

const MessageBubble = ({ content, isFromAI, id }: { content: string; isFromAI?: boolean; id: string }) => {


  const {
    allowTypwriterAnimation
  } = useAppSelector((state) => state.conversationReducer);


    return (
      <div className={` w-fit text-sm md:text-base ${!isFromAI ? 'ml-auto rounded-lg px-4 py-1 my-1 shadow-sm bg-neutral-200 ' : 'mr-auto text-gray-800'} `}>
       { allowTypwriterAnimation === id ? (
         <Typewriter text={content} />
        ): (
          <p className=" ">{content}</p>
       )
       }
      </div>
    );
  };
  
  export default MessageBubble;