'use client'

const ActiveTypingBubble = () => {

 return (
    <div className="flex items-start my-2 ml-4">
      <div className="bg-[#F4EFF4] min-w-32 rounded-2xl px-4 my-1 shadow-sm rounded-bl-sm max-w-[80%] text-[#1C1B1F]">
        <div className="flex space-x-2 py-4">
          <div className="w-1.5 h-1.5 aspect-square rounded-full bg-[#625B71] animate-bounce" 
          style={{ 
            animationDuration: '0.5s', 
            animationDelay: '0ms',
            transformOrigin: 'top bottom'
          }}></div>
          <div className="w-1.5 h-1.5 aspect-square rounded-full bg-[#625B71] animate-bounce" 
          style={{ 
            animationDuration: '0.5s', 
            animationDelay: '150ms',
            transformOrigin: 'top bottom'
          }}></div>
          <div className="w-1.5 h-1.5 aspect-square rounded-full bg-[#625B71] animate-bounce" style={{ 
    animationDuration: '0.5s', 
    animationDelay: '300ms',
    transformOrigin: 'top bottom'
  }}></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveTypingBubble;