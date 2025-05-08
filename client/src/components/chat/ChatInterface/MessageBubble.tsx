const MessageBubble = ({ content, isFromAI }: { content: string; isFromAI?: boolean }) => {
    return (
      <div className={`max-w-3/4 min-w-32 w-fit text-sm md:text-base ${!isFromAI ? 'ml-auto bg-[#625B71] text-white' : 'mr-auto bg-[#ECE6F0] text-gray-800'} rounded-2xl px-4 py-2 my-1 shadow-sm ${!isFromAI ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
        <p className="break-words whitespace-pre-wrap">{content}</p>
      </div>
    );
  };
  
  export default MessageBubble;