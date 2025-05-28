'use client'

import { Navbar } from "../layout/Navbar";
import { ImageAssets } from "@/assets/images";
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from "next/image";
import { motion } from "framer-motion";
import ShinyText from "../ui/BaseShinyText";
import { useTheme } from "@/providers/ThemeProvider";
import Link from "next/link";

export const Hero = () => {
  const {theme} = useTheme();

  const heroBackground = theme === "light"
  ? "/landingBgHeroLight.png"
  : "/landingBgHero.png";

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={` bg-cover bg-center `}
      style={{ backgroundImage: `url(${heroBackground})` }}
      data-testid="hero-section"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <Navbar data-testid="navbar" />
      </motion.div>
      
      <div className="pb-25 flex-col-center flex-col justify-center text-center" data-testid="hero-content">
        <motion.a 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          href="" 
          className="tag" 
          data-testid="version-tag"
        >
          <ShinyText text=" Version 2.0 is here" />
         
          <span className="text-black dark:text-white inline-flex pl-2 gap-2 flex-center">Read more
            <IoIosArrowRoundForward className="text-black dark:text-white" />
          </span>
        </motion.a> 
        
        <div className="relative w-fit mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: 'easeOut' }}
            className=" my-8 md:leading-30"
            data-testid="hero-heading"
          >
            One Chat <br /> at a Time
          </motion.h1>
          
          <div className=" flex justify-center">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              className="text-body-lg font-inter max-w-[450px] " 
              data-testid="hero-description"
            >
             Say hello to effortless communication. Whether you&apos;re looking for answers, brainstorming ideas, or just having a casual chat, our AI-powered assistant adapts to your needs—fast, intuitive, and always ready to help.
            </motion.p>

           <motion.div
  initial={{ opacity: 0, x: 200, y: 100 }} 
  animate={{ opacity: 1, x: 0, y: 0 }} 
  transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
  className="absolute hidden md:flex top-[10vh] md:left-[40rem] w-40"
  drag 
  dragSnapToOrigin 
  data-testid="message-container"
>
  <Image 
    src={ImageAssets.message.src} 
    alt="message image" 
    aria-hidden 
    className="w-full h-auto" 
    draggable={false} 
    width={150} height={150}
    data-testid="message-image"
  />
</motion.div>

           <motion.div
  initial={{ opacity: 0, x: -200, y: -100 }} 
  animate={{ opacity: 1, x: 0, y: 0 }} 
  transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
  className="absolute top-[25vh] hidden md:flex md:right-[40rem] w-40"
  drag 
  dragSnapToOrigin 
  data-testid="cursor-container"
>
  <Image 
    src={ImageAssets.cursor.src} 
    alt="cursor image" 
    aria-hidden 
    width={150} height={150}
    className="w-full h-auto" 
    draggable={false} 
    data-testid="cursor-image"
  />
</motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30}} 
            animate={{ opacity: 1, y: 0}} 
            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
            className=" mt-8 "
          >
            <Link href={'/signup'} className="btn" data-testid="get-started-btn">
              Get Started 
            </Link> 
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};