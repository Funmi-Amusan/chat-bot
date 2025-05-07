'use client'
import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/Logo.png'
import BaseButton from '@/components/ui/BaseButton'
import BaseInput from '@/components/ui/BaseInput'
import GoogleLogo from '@/assets/Google.png'

export default function Page() {
  return (
    <div className='grid grid-cols-2 w-screen h-screen'>
        <section className=' w-full flex flex-col items-center p-8 h-screen'>
            <div className='flex items-center justify-center mb-12'>
        <Image src={Logo} alt="Logo" className='w-8 h-8 object-cover' width={50} height={50}/>
        <h1 className='text-3xl font-semibold'>Chat Bot</h1>
            </div>
            <div className='flex flex-col items-center gap-4 w-4/6'>
            <h2 className='text-5xl font-extralight font-bricolage text-center'>Your Ideas, <br /> <span>Elevated</span> </h2>
            <p>Privacy-first AI that helps you create in confidence.</p>
            <div className=' flex flex-col justify-center items-center border border-zinc-200 gap-2 shadow-2xl p-8 rounded-4xl '>
               <BaseButton text='Login to Google' imgSrc={GoogleLogo.src} className='w-full bg-white border-gray-300' onClick={() => {console.log('first')}}/>
                <p className='text-md'>OR</p>
                <BaseInput placeholder='Email' type='text' id='email' className='mb-2'/>
                <BaseInput placeholder='Password' type='password' id='password' className='mb-2' />
                <BaseButton text='Continue With Email' variant='dark'  onClick={() => {console.log('first')}}/>
                <p className='text-center text-sm'>By continuing, you agree to Anthropic’s <a href="">Consumer Terms </a>and <a href=""> Usage Policy</a>, and acknowledge our <a href="">Privacy Policy</a>.</p>
            </div>

            </div>
        </section>
        <section className='  p-4  '>
            <div className='bg-zinc-200 rounded-3xl w-full h-full'>

            </div>

        </section>
    </div>
  )
}

