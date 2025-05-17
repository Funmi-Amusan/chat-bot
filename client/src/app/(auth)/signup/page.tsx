import React from 'react'
import Image from 'next/image'
import BaseButton from '@/components/ui/BaseButton'
import BaseInput from '@/components/ui/BaseInput'
import { redirect } from 'next/navigation'
import { registerUserURL } from '@/utils/end-point'
import { ImageAssets } from '@/assets/images'


const SignUpForm = () => {
   
    const handleRegistration = async (formData: FormData) => {
        "use server";
        const response = await fetch(registerUserURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        });
        
        const data = await response.json();
        console.log('data', data)
        
        if (response.ok) {
          redirect('/login?registered=true');
        } else {
        // add error toast
        }
      }
  
  return (
    <section className=' w-full flex flex-col items-center justify-center p-4 lg:p-8 h-screen my-auto'>
            <div className='flex items-center justify-center gap-2'>
        <Image src={ImageAssets.Logo.src} alt="Logo" className='w-8 h-8 object-cover' width={50} height={50}/>
        <h1 className='text-2xl lg:text-3xl font-semibold '>Chat Bot</h1>
            </div>
            <div className='flex flex-col items-center gap-4'>
            <h2 className=' text-2xl md:text-5xl font-extralight font-bricolage text-center !py-4 lg:!py-6 '>Your Ideas, <br /> <span>Elevated</span> </h2>
            <p className='dark:text-neutral-200 text-center'>Privacy-first AI that helps you create in confidence.</p>
            <div className=' flex flex-col justify-center items-center border border-neutral-200 dark:border-neutral-700 gap-2 shadow-2xl p-4 lg:p-8 w-full lg:w-4/6 max-w-xl rounded-4xl '>
                <form action={async (formData: FormData) => {
                    "use server"
                    await handleRegistration(formData);
                }}
                className='w-full'
                >
                    <BaseInput placeholder='Name' name='name' id='name' className='mb-2'/>
                    <BaseInput placeholder='Email' name='email'  id='email' className='mb-2'/>
                    <BaseInput placeholder='Password' name='password' id='password' className='mb-2' />
                    <BaseButton text='Continue With Email' variant='dark' type='submit' />
                    </form>
                    <p className='text-center text-sm'>  Already have an account?{' '} <a href="/login" className='!underline'>Sign In</a>.</p>
                <p className='text-center text-sm'>By continuing, you agree to Funmilayo&apos;s <a href="" className='!underline'>Consumer Terms </a>and <a href="" className='!underline'> Usage Policy</a>, and acknowledge our <a href="" className='!underline'>Privacy Policy</a>.</p>
            </div>

            </div>
        </section>
 
  )
}

export default SignUpForm;