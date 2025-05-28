"use client";

import { comapnyLogos } from "@/utils/data";
import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <section className="dark:bg-black bg-white py-8 text-center flex flex-col items-center gap-9">
      <p className="text-black/50 dark:text-white/50 text-body-gray px-12 font-inter leading-5">
        Trusted by the world&apos;s most innovative teams
      </p>
      
      <div className="w-full relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <motion.div 
          className="flex gap-8 w-max"
          animate={{ 
            x: [0, -2000] // Large fixed value to ensure smooth continuous scroll
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear"
          }}
        >
          {/* Render multiple copies to ensure seamless loop */}
          {Array.from({ length: 6 }).map((_, setIndex) => (
            comapnyLogos.map((image, index) => (
              <img 
                key={`${setIndex}-${index}`}
                src={image.src} 
                alt={image.alt} 
                className="flex-none h-8 w-auto opacity-50 hover:opacity-100 transition-opacity" 
              />
            ))
          )).flat()}
        </motion.div>
      </div>
    </section>
  );
};