"use client";

import { comapnyLogos } from "@/utils/data";
import { motion } from "framer-motion"


export const LogoTicker = () => {
  const allImages = [...comapnyLogos, ...comapnyLogos];
  
  return (
    <section className="bg-black py-12 text-center flex flex-col items-center gap-9">
      <p className="text-white/50 text-body-gray px-12 font-inter leading-5">
        Trusted by the world&apos;s most innovative teams
      </p>
      
      <div className="w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-black from-20% via-transparent via-30% to-transparent to-100%  z-10"></div>
        
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
        <div className="absolute top-0 right-0 w-1/5 h-full bg-gradient-to-l from-black from-20% via-transparent via-30% to-transparent to-100% z-10"></div>
      </div>
    </section>
  );
};
