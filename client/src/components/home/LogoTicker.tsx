"use client";

import { comapnyLogos } from "@/utils/data";
import { motion } from "framer-motion"


export const LogoTicker = () => {
  const allImages = [...comapnyLogos, ...comapnyLogos];
  
  return (
    <section className="dark:bg-black bg-white py-12 text-center flex flex-col items-center gap-9">
      <p className="text-black/50 dark:text-white/50 text-body-gray px-12 font-inter leading-5">
        Trusted by the world&apos;s most innovative teams
      </p>
      
      <div className="w-full relative overflow-hidden">
        <div className="mask-gradient left-0  bg-gradient-to-r"></div>
        
        <motion.div className="flex gap-8 animate-scroll"
        animate={{ translateX: "-50%"}}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop"
        }}
        >
          {allImages.map((image, index) => (
            <img 
              key={index} 
              src={image.src} 
              alt={image.alt} 
              className="flex-none h-8 w-auto opacity-50 hover:opacity-100 transition-opacity" 
            />
          ))}
        </motion.div>
        <div className="mask-gradient right-0 bg-gradient-to-l"></div>
      </div>
    </section>
  );
};
