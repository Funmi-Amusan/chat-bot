'use client'

import { motion, AnimatePresence } from 'motion/react'
import React, { useState, useEffect } from 'react'

const SlideReveal = ({values}: {values: string[]}) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % values.length)
        }, 5000) 

        return () => clearInterval(interval)
    }, [values.length])

    return (
        <div className='relative flex overflow-y-hidden whitespace-nowrap text-3xl uppercase h-16 items-center'>
            <AnimatePresence mode="wait">
                <motion.h1
                    key={currentIndex}
                    initial={{opacity:0.2, y: "100%" }}
                    animate={{opacity:1, y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ 
                        duration: 0.5, 
                        ease: "easeInOut" 
                    }}
                    className="absolute leading-none inset-0 flex text-white justify-center items-center"
                >
                    {values[currentIndex]}
                </motion.h1>
            </AnimatePresence>
        </div>
    )
}

export default SlideReveal