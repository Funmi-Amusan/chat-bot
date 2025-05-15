'use client'

import Typewriter from "@/components/ui/TypewriterText";
import { useAppSelector } from "@/utils/hooks";

const MessageBubble = ({ content, isFromAI, id }: { content: string; isFromAI?: boolean; id: string }) => {


  const {
    allowTypwriterAnimation
  } = useAppSelector((state) => state.conversationReducer);

  console.log('allowTypwriterAnimation.newMessageId === id', allowTypwriterAnimation === id)

  console.log('------', allowTypwriterAnimation)
  console.log('!!!!!!!', id)

    return (
      <div className={`max-w-3/4 min-w-32 w-fit text-sm md:text-base ${!isFromAI ? 'ml-auto rounded-2xl px-4 py-2 my-1 shadow-sm bg-neutral-200 ' : 'mr-auto text-gray-800'}  ${!isFromAI ? 'rounded-br-sm' : ''}`}>
       { allowTypwriterAnimation === id ? (
         <Typewriter text={content} />
        ): (
          <p className="break-words whitespace-pre-wrap">{content}</p>
       )
       }
      </div>
    );
  };
  
  export default MessageBubble;