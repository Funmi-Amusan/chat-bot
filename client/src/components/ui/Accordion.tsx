
import { IconAssets } from '@/assets/icons'
import React from 'react'

type AccordionProps = {
  question: string,
  answer: string,
}

const Accordion = ({question, answer}: AccordionProps) => {
  return (
    <div className='flex-center-col max-w-2xl mx-auto gap-2 w-full rounded-lg py-8 px-4'>
        <div className='flex justify-between py-4 w-full mb-2 border-b border-white/30 text-start'>
        <h5>{question}</h5>
<img src={IconAssets.plusWhite.src} alt="plus icon" className='h-5 w-auto'/>
        </div>
        <p className='text-md font-inter text-center hidden !text-white'>{answer}</p>
    </div>
  )
}

export default Accordion