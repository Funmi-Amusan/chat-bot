'use client'

import { useScroll, useTransform, motion, MotionValue } from 'motion/react'
import React, { useRef } from 'react'

const ScrollReveal = ({value}: {value: string}) => {
    const element = useRef(null)
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start 0.9", "start 0.5"]
    })
const words = value.split(' ')
    return (
        <p
            ref={element}
            className=" flex flex-wrap justify-center text-body-lg font-inter max-w-[540px]"
        >
            {words.map((word, index) => {
            const start = index / words.length
            const end = (index + 1) / words.length
            return <Word key={index} range={[start, end]} word={word} progress={scrollYProgress} />
            }
            )}
        </p>
    )
}

export default ScrollReveal

const Word = ({ word, progress, range }: { word: string; range: number[]; progress: MotionValue<number> }) => {
    const opacity = useTransform(progress, range, [0, 1])
    return (
          <span className="mr-1 mt-1 relative inline-block ">
      <span className="absolute text-black dark:text-white opacity-10 text-center">{word}</span>
      <motion.span style={{ opacity }} className="text-black dark:text-white text-center">
        {word}
      </motion.span>
    </span>
    )
}