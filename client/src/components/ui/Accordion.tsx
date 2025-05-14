"use client";
import { FaPlus, FaMinus } from "react-icons/fa6"; 
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

type AccordionProps = {
  question: string;
  answer: string;
  id: number;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

const Accordion = ({ question, answer, id, isOpen, onToggle }: AccordionProps) => {

  return (
    <div onClick={() => onToggle(id)} className={`flex-center-col max-w-2xl mx-auto gap-2 w-full rounded-lg py-4 px-4 cursor-pointer border-b border-black/30 dark:border-white/30 `}>
        <div className='flex justify-between items-center py-2 w-full text-start'> 
            <h5>{question}</h5>
            {isOpen ? <FaMinus className="text-black dark:text-white" size={20} /> : <FaPlus className="text-black dark:text-white" size={20} />}
        </div>

        <AnimatePresence> 
            {isOpen && (
                <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className='text-md font-inter text-black dark:text-white text-left w-full overflow-hidden' 
                >
                    {answer}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
  );
}

export default Accordion;