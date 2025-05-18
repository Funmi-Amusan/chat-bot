'use client'

import React, { useActionState, useEffect } from 'react'
import Image from 'next/image'
import BaseInput from '@/components/ui/BaseInput'
import { GithubSignIn } from '@/components/auth/github-sign-in'
import { GoogleSignIn } from '@/components/auth/google-sign-in'
import { ImageAssets } from '@/assets/images'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { loginAction } from '@/lib/actions/UserActions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface FormState {
  success: boolean;
  error: {
    message?: string; 
    fieldErrors?: Record<string, string>; 
  } | null;
  data?: unknown;
}

const SignUpForm = () => {
  const router = useRouter()
  const [state, formAction] = useActionState<FormState, FormData>(
    async (prevState, formData) => {
      const result = await loginAction(prevState, formData);
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
    if (state.error?.message) {
      toast.error(state.error.message);
    } else if (state.success) {
      toast.success('Login successful!');
router.push('/chat/new')
    }
  }, [state]);
  
  return (
        <section className=' w-full flex flex-col items-center justify-center p-4 lg:p-8 h-screen my-auto'>
            <div className='flex items-center justify-center gap-2'>
        <Image src={ImageAssets.Logo} alt="Logo" className='w-8 h-8 object-cover' width={50} height={50}/>
        <h1 className='text-2xl lg:text-3xl font-semibold '>Chat Bot</h1>
            </div>
            <div className='flex flex-col items-center gap-4 '>
            <h2 className=' text-2xl lg:text-5xl font-extralight font-bricolage text-center !py-4 lg:!py-6 '>Your Ideas, <br /> <span>Elevated</span> </h2>
            <p className='dark:text-neutral-200 text-center'>Privacy-first AI that helps you create in confidence.</p>
            <div className=' flex flex-col justify-center items-center border border-neutral-200 dark:border-neutral-700 gap-2 shadow-2xl p-4 lg:p-8 w-full lg:w-4/6 max-w-xl rounded-4xl '>
               <GithubSignIn />
               <GoogleSignIn />
                <p className='text-sm'>OR</p>
                <form action={formAction}
                className='w-full'
                >
                 <BaseInput
                            placeholder='Email'
                            name='email'
                            id='email'
                            className='mb-2 w-full'
                            hasError={!!getFieldError('email')}
                            error={getFieldError('email')}
                        />
                        <BaseInput
                            placeholder='Password'
                            name='password'
                            id='password'
                            security='true' 
                            className='mb-2'
                             hasError={!!getFieldError('password')} 
                            error={getFieldError('password')} 
                        />
                         <SubmitButton text='Continue with Email' />
                </form>
                <p className='text-center text-sm'>Don&apos;t have an account?  <a href="/signup" className='!underline' >Sign Up</a>.</p>
                <p className='text-center text-sm'>By continuing, you agree to Funmilayo&apos;s <a href="" className='!underline' >Consumer Terms </a>and <a href="" className='!underline' > Usage Policy</a>, and acknowledge our <a href="" className='!underline' >Privacy Policy</a>.</p>
            </div>

            </div>
        </section>
  )
}
export default SignUpForm;