"use client";
import Image from "next/image";
import { ImageAssets } from "@/assets/images";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "../ui/ScrollReveal";

export const ProductShowcase = () => {
  const appImage = useRef<HTMLImageElement>(null)
  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: ["start end", "end end"]
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  return (
    <section className="bg-gradient bg-gradient-to-b px-4 py-18 gap-6 flex-center-col">
      <h2>Intuitive Interface</h2>
           <ScrollReveal value="Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes, one task at a time." />
   <motion.div
style={{
  opacity: opacity,
  rotateX: rotateX,
  transformPerspective: '800px'
}}
    >
      <Image src={ImageAssets.appScreen} alt="Logo" className=' w-[80vw] max-w-4xl object-cover' ref={appImage}/>
    </motion.div>
    </section>
  );
};
