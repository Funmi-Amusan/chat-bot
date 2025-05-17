'use client'

import { Navbar } from "./Navbar";
import { ImageAssets } from "@/assets/images";
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from "next/image";
import { motion } from "framer-motion";
import ShinyText from "../ui/BaseShinyText";
import { useRouter } from "next/navigation";


export const Hero = () => {

  const router = useRouter();

  return (
    <section className={` overflow-clip bg-cover bg-center bg-[url(@/assets/images/landingBgHeroLight.png)] dark:bg-[url(@/assets/images/landingBgHero.png)] `}
    >
      <Navbar />
      <div className="pb-25 flex-col-center flex-col justify-center text-center">
        <a href="" className="tag">
          <ShinyText text=" Version 2.0 is here" />
         
          <span className="text-black dark:text-white inline-flex pl-2 gap-2 flex-center">Read more
            <IoIosArrowRoundForward className="text-black dark:text-white" />
          </span>
        </a> 
        <div className="relative">
        <h1
            className=" my-8 md:leading-30"
          >
            One Task <br /> at a Time
          </h1>
          {/* <RevealText text={"One Task"} />
          <RevealText text={"at a Time"} /> */}
          <div className=" flex justify-center">
            
            <p className="text-body-lg font-inter max-w-[450px] ">Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes.</p>

            <motion.div
              initial={{ opacity: 0, x: 200, y: 100 }} 
              animate={{ opacity: 1, x: 0, y: 0 }} 
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-20 -right-15 lg:right-70 hidden md:block"
              drag 
              dragSnapToOrigin 
            >
              <Image src={ImageAssets.message.src} alt="message image" aria-hidden className="" width={150} height={150} draggable={false} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -200, y:-100 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-52 -left-12 lg:left-70 lg:top-30 hidden md:block"
              drag 
              dragSnapToOrigin
            >
              <Image src={ImageAssets.cursor.src} alt="cursor image" aria-hidden className="" width={150} height={150} draggable={false} />
            </motion.div>
          </div>
          <motion.button onClick={()=> router.push('/login')} initial={{ opacity: 0}} 
             animate={{ opacity: 1}} 
             transition={{ duration: 0.8, ease: 'easeOut' }}
              className="btn mt-8 hover:scale-105">Get Started</motion.button>
        </div>
      </div>
    </section>
  );
};
