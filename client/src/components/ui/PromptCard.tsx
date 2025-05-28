'use client'

import React, { ReactNode } from 'react'
import { IoArrowForwardSharp } from 'react-icons/io5'

type PromptCardProps = {
  icon: ReactNode,
  title: string,
  content: string,
  onClick: (content: string) => void
}

const PromptCard = ({title, content, icon, onClick}: PromptCardProps) => {

  
  return (
    <div 
      onClick={()=>onClick(content)}
      className='shadow-sm rounded-full md:rounded-xl relative flex flex-col items-start gap-4 p-4 
        border border-gray-200 dark:border-neutral-700  transition-all duration-300 
        hover:border-violet-200 dark:hover:border-neutral-500 hover:shadow-lg cursor-pointer group'
    >
      {icon}
      <h4 className='hidden md:text-black dark:text-white text-start text-sm md:text-base font-semibold'>{title}</h4>
      <div className='flex items-center justify-between w-full'>
        <p className='text-black/50 dark:text-white/50 text-xs md:text-sm text-start flex-1 transition-all group-hover:text-black/70 dark:group-hover:text-white/70'>{content}</p>
        <div className='hidden md:block transform translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
          <IoArrowForwardSharp size={18} className="text-violet-500" />
        </div>
      </div>
         <p className='text-black/50 absolute -bottom-10  -translate-y-4 hidden group-hover:translate-0 group-hover:block  dark:text-white/50 text-sm text-start flex-1 transition-all duration-200 ease-in-out group-hover:text-black/70 dark:group-hover:text-white/70'>Click to ask Chat bot</p>
    </div>
  )
}

export default PromptCard