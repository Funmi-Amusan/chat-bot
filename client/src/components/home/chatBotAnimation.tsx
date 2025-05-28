import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { PiPlusBold } from "react-icons/pi";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { LuSend } from 'react-icons/lu';
import { TbFidgetSpinner } from 'react-icons/tb';
import ShinyText from '../ui/BaseShinyText'; 

type AnimatedMessage = {
  type: 'user' | 'bot';
  text: string;
  delay: number;
  id: number; 
};

const AnimatedChatUI = () => {
  const [messages, setMessages] = useState<AnimatedMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const chatRef = useRef(null);
  const isInView = useInView(chatRef, { 
    amount: 0.3,
    once: false,
  });

  const chatSequence = [
    { type: 'user', text: 'Who won the last Women\'s Champions League Cup?', delay: 1000 },
    { type: 'bot', text: 'The last UEFA Women\`s Champions League winner was Arsenal\'s, who defeated Barcelona 1-0 in the 2025 final. Stina Blackstenius scored the winning goal in the 75th minute.', delay: 2000 },
    { type: 'user', text: 'How are Scented Candles made?', delay: 2500 },
    { type: 'bot', text: 'Scented candles are made through a simple but precise process that involves melting wax, adding fragrance, and setting the candle in a container.\nMaking your own scented candles allows you to customize the fragrance and create a cozy atmosphere at home. Would you like recommendations for unique scent combinations? 😊', delay: 3000 },
    { type: 'user', text: 'Tell me an interesting fact', delay: 2000 },
    { type: 'bot', text: 'Okay, here\'s one: \nA strawberry isn\'t technically a berry, but a banana is\! \nBotanically speaking, a berry is a fleshy fruit produced from a single flower with one ovary. True berries include grapes, blueberries, cranberries, and, surprisingly, bananas, tomatoes, and avocados. Strawberries, on the other hand, are "aggregate accessory fruits" because their flesh comes from the receptacle that holds the ovaries, not the ovaries themselves. The "seeds" on the outside of a strawberry are actually the true fruits, each containing a seed.', delay: 3000 },
  ];

  const isSequenceRunning = useRef(false);

  const runSequence = async (startIndex = 0) => {
    if (isSequenceRunning.current) return; 
    isSequenceRunning.current = true;

    for (let i = startIndex; i < chatSequence.length; i++) {
      const messageToAdd = { ...chatSequence[i], id: Date.now() + i }; 
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, messageToAdd.delay));
      setIsLoading(false);
      if (messageToAdd.type === 'bot') {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        setIsTyping(false);
    }
      setMessages((prev: AnimatedMessage[]) => {
        if (prev.some(msg => msg.id === messageToAdd.id)) {
          return prev;
        }
        return [...prev, messageToAdd as AnimatedMessage];
      });      setCurrentStep(i + 1);
    }
    isSequenceRunning.current = false; 

  };
 useEffect(() => {
    if (isInView ) {
          if (currentStep === chatSequence.length) {
            setMessages([])
        }
      runSequence();
    }
  }, [isInView, hasAnimated]);


  return (
    <div ref={chatRef} className="w-[80vw] h-[80vh] mx-16 max-w-5xl bg-neutral-800 rounded-lg text-white flex">
      <div className=" hidden md:w-[20vw] border-r border-neutral-700 md:flex flex-col">
        <div className="p-4 ">
          <div className="flex items-center gap-3 mb-4">
            <BsLayoutTextSidebarReverse className="w-4 h-4 text-neutral-500" />
            <h1 className="text-xl font-semibold">Chat Bot</h1>
          </div>
          <button 
            className='flex gap-4 items-center rounded-lg hover:bg-violet-100 dark:hover:bg-violet-800/30 w-full transition-colors duration-200'
          >
            <div className='p-1 bg-violet-600 dark:bg-violet-800 rounded-full' >
              <PiPlusBold color='white' size={14} />
            </div>
              <p className='text-xs font-medium text-violet-800 dark:text-violet-500 inline-flex whitespace-nowrap'>New Chat</p>
          </button>
        </div>
        
        <div className="flex-1 p-4">
          <h2 className="text-xs font-medium text-neutral-400 mb-3">Recent Chats</h2>
          <div className="space-y-2">
            <div className="text-xs  mb-2">24h Recap</div>
            <div className="bg-neutral-900 px-2 py-2 rounded-lg text-xs">Cool Random Fact?</div>
            <div className="text-xs  py-1">Cool Random Facts</div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center font-bold justify-center text-neutral-300 text-sm">
              H
            </div>
            <span>Harry Potter</span>
          </div>
        </div>
      </div>

     <div className="flex flex-col w-full md:w-[60vw] max-w-[900px] flex-grow-0">

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-2">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id} 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut",
                    delay: 0.1 
                  }}
                  className={`flex ${message.type === 'user' ? 'justify-end gap-2 items-end' : 'justify-start font-medium font-serif text-lg tracking-widest'}`}
                >
                  <div className={` px-3 py-1 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-neutral-600 text-white' 
                      : ' text-neutral-100 md:mr-12'
                  }`}>
                    <div className="whitespace-pre-line text-sm text-neutral-200 leading-relaxed">
                      {message.text}
                    </div>
                  </div>
                   {
                        message.type === 'user' && (
                          <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center font-bold justify-center text-neutral-300 text-sm">
              H
            </div>
                        )
                    }
                </motion.div>
              ))}
            </AnimatePresence>
            
            <AnimatePresence>
              {isTyping && (
             <ShinyText text='ChatBot is thinking...' />
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className=" p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Imagine Something..."
                className="w-full bg-neutral-800 border border-neutral-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-neutral-400 focus:outline-none focus:border-violet-500 transition-colors"
                disabled
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
                disabled
              >
                {isLoading ? (
                  <div className="animate-spin">
                    <TbFidgetSpinner className="w-4 h-4" />
                  </div>
                ) : (
                    <LuSend className="w-4 h-4" />
                )
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnimatedChatUI;