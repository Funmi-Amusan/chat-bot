'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInGroup from '@/components/ui/BaseFadeInGroup';
import BaseText from '@/components/ui/BaseText';
import BaseCodeEditor from '@/components/ui/BaseCodeEditor';
import Avatar from '@/assets/UserAvatar.png';
import Report from '@/assets/doc.svg';
import Calendar from '@/assets/calendar.svg';
import Graph from '@/assets/graph.svg';

const content = [
  { text: 'Identify code optimizations and refactor', editor: true },
  { text: 'Generate reports efficiently', imgSrc: Report.src },
  { text: 'Stay on top of your schedule', imgSrc: Calendar.src },
  { text: 'Visualize data insights', imgSrc: Graph.src },
];

export default function Page() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="p-4">
      <div className="bg-zinc-200/60 rounded-3xl h-full flex flex-col gap-12 items-center justify-center">
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
                imgSrc={Avatar.src}
                className="font-bricolage bg-zinc-200"
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
