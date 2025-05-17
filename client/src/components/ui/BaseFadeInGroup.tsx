'use client'

import { motion } from "framer-motion";
import React from "react";

type FadeInGroupProps = {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
};

const FadeInGroup = ({ children, stagger = 0.5, duration = 0.6 }: FadeInGroupProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration } },
  };

  return (
    <motion.div 
      className="space-y-8 "
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      {React.Children.map(children, child => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

export default FadeInGroup;
