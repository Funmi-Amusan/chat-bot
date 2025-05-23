'use client'

import { Navbar } from "./Navbar";
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
    <section 
      className={` bg-cover bg-center `}
      style={{ backgroundImage: `url(${heroBackground})` }}
      data-testid="hero-section"
    >
      <Navbar data-testid="navbar" />
      <div className="pb-25 flex-col-center flex-col justify-center text-center" data-testid="hero-content">
        <a href="" className="tag" data-testid="version-tag">
          <ShinyText text=" Version 2.0 is here" />
         
          <span className="text-black dark:text-white inline-flex pl-2 gap-2 flex-center">Read more
            <IoIosArrowRoundForward className="text-black dark:text-white" />
          </span>
        </a> 
        <div className="relative">
        <h1
            className=" my-8 md:leading-30"
            data-testid="hero-heading"
          >
            One Task <br /> at a Time
          </h1>
          <div className=" flex justify-center">
            
            <p className="text-body-lg font-inter max-w-[450px] " data-testid="hero-description">Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes.</p>

            <motion.div
              initial={{ opacity: 0, x: 200, y: 100 }} 
              animate={{ opacity: 1, x: 0, y: 0 }} 
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-20 -right-15 lg:right-70 hidden md:block"
              drag 
              dragSnapToOrigin 
              data-testid="message-container"
            >
              <Image 
                src={ImageAssets.message.src} 
                alt="message image" 
                aria-hidden 
                className="" 
                width={150} 
                height={150} 
                draggable={false} 
                data-testid="message-image"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200, y:-100 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-52 -left-12 lg:left-70 lg:top-30 hidden md:block"
              drag 
              dragSnapToOrigin
              data-testid="cursor-container"
            >
              <Image 
                src={ImageAssets.cursor.src} 
                alt="cursor image" 
                aria-hidden 
                className="" 
                width={150} 
                height={150} 
                draggable={false} 
                data-testid="cursor-image"
              />
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0}} 
            animate={{ opacity: 1}} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="btn mt-8 hover:scale-105"
          >
            <Link href={'/signup'} className="btn" data-testid="get-started-btn">
              Get Started 
            </Link> 
          </motion.div>
        </div>
      </div>
    </section>
  );
};