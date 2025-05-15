
import React from 'react';
import { motion } from 'framer-motion';

type RevealTextType = {
  text: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
};

const RevealText = ({ text, delay = 0.05, duration = 0.5, staggerChildren = 0.03 }: RevealTextType) => {

  const characters = Array.from(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  // Character variants
  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.2, 0.65, 0.3, 0.9], // Custom easing
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default RevealText;  