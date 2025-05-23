import React from 'react'
import Image from 'next/image'
import BaseInput from '@/components/ui/BaseInput'
import { GithubSignIn } from '@/components/auth/github-sign-in'
import { GoogleSignIn } from '@/components/auth/google-sign-in'
import { ImageAssets } from '@/assets/images'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { loginAction } from '@/lib/actions/UserActions'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
const SignUpForm = async (props: {
  params: Params
  searchParams: SearchParams
}) => {

  const session = await auth();
  if (session?.user?.id) {
    redirect('/chat/new');
  }
  const searchParams = await props.searchParams

  const error = typeof searchParams?.error === 'string' ? searchParams.error : undefined;

  async function login(formData: FormData) {
    'use server'
 
    const res = await loginAction(formData)
    if (res?.success) {
      redirect('/chat/new');
    } else {
      const errorMessage = encodeURIComponent(res?.error?.message || 'Login failed');
      redirect(`/login?error=${errorMessage}`);
    }
  }
  
  return (
    <section 
      className='w-full flex flex-col items-center justify-center p-4 lg:p-8 h-screen my-auto'
      data-testid="signup-form-section"
    >
      <div className='flex items-center justify-center gap-2' data-testid="logo-container">
        <Image 
          src={ImageAssets.Logo} 
          alt="Logo" 
          className='w-8 h-8 object-cover' 
          width={50} 
          height={50}
          data-testid="logo-image"
        />
        <h1 className='text-2xl lg:text-3xl font-semibold' data-testid="brand-name">
          Chat Bot
        </h1>
      </div>
      
      <div className='flex flex-col items-center gap-4'>
        <h2 
          className='text-2xl lg:text-5xl font-extralight font-bricolage text-center !py-4 lg:!py-6'
          data-testid="main-heading"
        >
          Your Ideas, <br /> <span>Elevated</span> 
        </h2>
        
        <p 
          className='dark:text-neutral-200 text-center'
          data-testid="subtitle"
        >
          Privacy-first AI that helps you create in confidence.
        </p>
        
        {error && (
          <div 
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 w-fit"
            data-testid="error-message"
          >
            {decodeURIComponent(error)}
          </div>
        )}
        
        <div 
          className='flex flex-col justify-center items-center border border-neutral-200 dark:border-neutral-700 gap-2 shadow-2xl p-4 lg:p-8 w-full lg:w-4/6 max-w-xl rounded-4xl'
          data-testid="form-container"
        >
          <GithubSignIn />
          <GoogleSignIn />
          
          <p className='text-sm'>OR</p>
          
          <form action={login} className='w-full' data-testid="email-form">
            <BaseInput
              placeholder='Email'
              name='email'
              id='email'
              className='mb-2 w-full'
              hasError={false}
              error={undefined}
              testId="email-input"
            />
            <BaseInput
              placeholder='Password'
              name='password'
              type='password'
              id='password'
              security='true' 
              className='mb-2'
              hasError={false} 
              error={undefined}
              testId="password-input"
            />
            <SubmitButton text='Continue with Email' />
          </form>
          
          <p className='text-center text-sm'>
            Don&apos;t have an account?{' '}
            <a href="/signup" className='!underline' data-testid="signup-link">
              Sign Up
            </a>.
          </p>
          
          <p className='text-center text-sm'>
            By continuing, you agree to Funmilayo&apos;s{' '}
            <a href="" className='!underline' data-testid="terms-link">
              Consumer Terms
            </a>{' '}
            and{' '}
            <a href="" className='!underline' data-testid="usage-policy-link">
              Usage Policy
            </a>, and acknowledge our{' '}
            <a href="" className='!underline' data-testid="privacy-policy-link">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUpForm;