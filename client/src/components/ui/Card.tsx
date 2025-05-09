'use client'
import React, { useEffect, useRef } from 'react'
import {motion, useMotionTemplate, useMotionValue } from 'framer-motion'

type CardProps = {
    image: string,
    title: string,
    content: string
}

const Card = ({title, content, image}: CardProps) => {
  const borderRef = useRef<HTMLDivElement>(null)
const offsetX = useMotionValue(-100)
const offsetY = useMotionValue(-100)
const maskTemplate = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)`
  useEffect (() => {
    const updateMousePosition = (event: MouseEvent) => {
      if (!borderRef.current) return
      const borderRect = borderRef.current?.getBoundingClientRect()
      offsetX.set(event.x - borderRect.left)
      offsetY.set(event.y - borderRect.top)
    }
window.addEventListener('mousemove', updateMousePosition)
return () => {
  window.removeEventListener('mousemove', updateMousePosition)
}
  }, [])
  return (
    <div className='flex-center-col border-[0.5px] max-w-88 gap-2 border-white/30 w-fit rounded-xl py-8 px-4 relative'>
      <motion.div ref={borderRef} className='absolute inset-0 border border-purple-400 rounded-xl' 
 style={{
  WebkitMaskImage: maskTemplate,
  maskImage: maskTemplate
}}
        ></motion.div>
        <div className=' p-4 mb-2 rounded-lg bg-white'>
        <img src={image} alt=""  className='h-5 w-auto'/>
        </div>
        <h5>{title}</h5>
        <p className='text-md font-inter text-center !text-white'>{content}</p>
    </div>
  )
}

export default Card