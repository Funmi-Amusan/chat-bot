
import React from 'react'

type CardProps = {
    image: string,
    title: string,
    content: string
}

const Card = ({title, content, image}: CardProps) => {
  return (
    <div className='flex-center-col border-[0.5px] max-w-88 gap-2 border-white/30 w-fit rounded-lg py-8 px-4'>
        <div className=' p-4 mb-2 rounded-lg bg-white'>
        <img src={image} alt=""  className='h-5 w-auto'/>

        </div>
        <h5>{title}</h5>
        <p className='text-md font-inter text-center !text-white'>{content}</p>
    </div>
  )
}

export default Card