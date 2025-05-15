'use client';

import React from 'react';
import { CiGlobe } from "react-icons/ci";
import { IoArrowForwardSharp, IoMenu } from "react-icons/io5";

const EmptyChat = () => {

  return (
    <div className="h-full flex justify-center items-center text-center w-full md:p-2 flex-col gap-6">
                      <h3 className='text-2xl text-black/50 font-semibold'>Welcome to Chat Bot</h3>
                      <h3 className='text-3xl font-semibold'>Good day! How may I assist you today?</h3>
                      <div className='flex items-center gap-6'>
<div className='bg-black rounded-2xl flex-col items-start gap-6 p-2 max-w-[180px]'>
<CiGlobe color='white' size={24}/>
<h4 className='text-white text-start text-base font-semibold'>24 hours </h4>
<p className='text-white/50 text-start text-sm'>Find out what has happened in the last 24 hours</p>
</div>
<IoMenu size={36} color='gray' className=' rotate-90 ' />
<div className='shadow-sm rounded-3xl flex-col items-start gap-6 p-2 max-w-[480px]'>
<CiGlobe color='pink' size={24}/>
<h4 className='text-black text-start text-base font-semibold'>Learn</h4>
<div className='flex items-center gap-2'>
  <p className='text-black/50 text-xs text-start'>Quantum computing in simple terms</p>
  <IoArrowForwardSharp />
</div>
</div>
<div className='shadow-sm rounded-3xl flex-col items-start gap-6 p-2 max-w-[360px]'>
<CiGlobe color='pink' size={24}/>
<h4 className='text-black text-start text-base font-semibold'>Random</h4>
<div className='flex items-center gap-2'>
  <p className='text-black/50 text-xs text-start'>Tell me an interesting random fact</p>
  <IoArrowForwardSharp />
</div>
</div>
                      </div>
                      
    </div>
  );
};

export default EmptyChat;
