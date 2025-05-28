"use client";
import Image from "next/image";
import { ImageAssets } from "@/assets/images";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "../ui/ScrollReveal";
import ChatAnimation from "./chatBotAnimation";

export const ProductShowcase = () => {
  const appImage = useRef<HTMLImageElement>(null)
  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: ["start end", "start end"]
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  
  return (
    <section className="bg-gradient bg-gradient-to-b px-4 py-18 gap-6 flex-center-col">
      <h2>Intuitive Interface</h2>
 <ScrollReveal 
  value="Effortless communication, enhanced by intelligence. Whether you're asking questions, brainstorming ideas, or continuing past conversations, our AI-powered assistant remembers, adapts, and responds—fast, intuitive, and always ready to help." 
/>
  <motion.div
style={{
  opacity: opacity,
  rotateX: rotateX,
  transformPerspective: '400px',
}}
    >
 <ChatAnimation />
     </motion.div>
    </section>
  );
};
