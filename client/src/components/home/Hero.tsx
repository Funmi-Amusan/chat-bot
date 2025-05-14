"use client";

import { IconAssets } from "@/assets/icons";
import { Navbar } from "./Navbar";
import { ImageAssets } from "@/assets/images";
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from "next/image";
import {motion} from "framer-motion";

export const Hero = () => {
  return (
    <section className={` overflow-clip bg-cover bg-center bg-[url(@/assets/images/landingBgHeroLight.png)] dark:bg-[url(@/assets/images/landingBgHero.png)] `}
    >
      <Navbar />
      <div className=" container pt-12 pb-20 flex-col-center flex-col justify-center text-center">
        <a href="" className="tag inline-flex ">
        Version 2.0 is here 
        <span className="text-black dark:text-white inline-flex pl-2 gap-2 flex-center">Read more 
        <IoIosArrowRoundForward className="text-black dark:text-white" />
        </span> 
           </a>
           <div className="relative">

     <h1 className=" my-8 ">One Task <br /> at a Time</h1>
     <div className=" flex justify-center">
     <p className="text-body-lg max-w-[450px] font-inter text-center  ">Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes.</p>
     <motion.div 
     className="absolute top-20 -right-15 lg:right-36 hidden md:block"
     drag
     dragSnapToOrigin
     >
     <Image src={ImageAssets.message.src} alt="message image" aria-hidden className=""  width={150} height={150} draggable={false} />
     </motion.div>
     <motion.div className="absolute top-10 -left-12 lg:left-40 lg:top-30 hidden md:block" drag
     dragSnapToOrigin>

<Image src={ImageAssets.cursor.src} alt="cursor image" aria-hidden className=""  width={150} height={150} draggable={false} />
</motion.div>
     </div>
    <button className="btn mt-8">Get Free</button>
           </div>
      </div>
    </section>
  );
};
