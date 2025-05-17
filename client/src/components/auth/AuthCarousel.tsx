'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInGroup from '@/components/ui/BaseFadeInGroup';
import BaseText from '@/components/ui/BaseText';
import BaseCodeEditor from '@/components/ui/BaseCodeEditor';
import { ImageAssets } from '@/assets/images';

const content = [
  { text: 'Identify code optimizations and refactor', editor: true },
  { text: 'Generate reports efficiently', imgSrc: ImageAssets.doc.src },
  { text: 'Stay on top of your schedule', imgSrc: ImageAssets.calendar.src },
  { text: 'Visualize data insights', imgSrc: ImageAssets.graph.src },
];

export default function AuthCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="p-4 h-screen">
      
      <div className="bg-neutral-200/60 dark:bg-neutral-900 rounded-3xl h-full py-16 pt-40 flex flex-col items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeIn' }}
          >
            <FadeInGroup stagger={1.5} duration={0.8}>
              <BaseText
                text={content[index].text}
                imgSrc={ImageAssets.ChatBotAvatar.src}
                className="font-bricolage bg-neutral-200"
              />
              <div className="relative">
                {content[index].editor ? (
                  <BaseCodeEditor className="mx-6 scale-80" />
                ) : (
                  <img src={content[index].imgSrc} alt="Feature image" className="mx-6 w-md h-md" />
                )}
                <BaseText text={content[index].text} className="font-bricolage bg-white !rounded-lg absolute top-0 " />
              </div>
            </FadeInGroup>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-6">
          {content.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${index === i ? 'bg-gray-400' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
