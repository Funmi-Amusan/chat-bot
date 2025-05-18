'use client'

import React, { useActionState, useEffect } from 'react'
import Image from 'next/image'
import BaseInput from '@/components/ui/BaseInput'
import { ImageAssets } from '@/assets/images'
import { toast } from 'react-toastify'
import { handleRegistration } from '@/lib/actions/UserActions'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/auth/SubmitButton'

interface FormState {
  success: boolean;
  error: {
    message?: string;
    fieldErrors?: Record<string, string>;
  } | { fieldErrors: Record<string, string> } | null;
  data?: unknown;
}

const SignUpForm = () => {
  
 const [state, formAction] = useActionState<FormState, FormData>(
    async (prevState, formData) => {
      const result = await handleRegistration(prevState, formData);
      return {
        success: result?.success,
        error: result?.error || null
      } as FormState;
    },
    { success: false, error: null }
  );
   const getFieldError = (fieldName: string): string | undefined => {
      return state.error?.fieldErrors?.[fieldName];
    };
  
    useEffect(() => {
      if (state.error) {
        toast.error(state.error as string || 'An error occurred');
      } else if (state.success) {
        toast.success('Registration successful. Pls login to continue.');
        redirect('/login');
      }
    }, [state]);
   
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
                <form action={formAction}
                className='w-full'
                >
                 <BaseInput placeholder='Name' name='name' id='name' className='mb-2'   hasError={!!getFieldError('name')} 
                            error={getFieldError('name')} />
                    <BaseInput placeholder='Email' name='email' id='email' className='mb-2'   hasError={!!getFieldError('email')} 
                            error={getFieldError('email')} />
                    <BaseInput placeholder='Password' name='password' id='password' className='mb-2'   hasError={!!getFieldError('password')} 
                            error={getFieldError('password')}  />
                   <SubmitButton text='Sign Up' />
                    </form>
                    <p className='text-center text-sm'>  Already have an account?{' '} <a href="/login" className='!underline'>Sign In</a>.</p>
                <p className='text-center text-sm'>By continuing, you agree to Funmilayo&apos;s <a href="" className='!underline'>Consumer Terms </a>and <a href="" className='!underline'> Usage Policy</a>, and acknowledge our <a href="" className='!underline'>Privacy Policy</a>.</p>
            </div>

            </div>
        </section>
 
  )
}
export default SignUpForm;