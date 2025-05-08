import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/Logo.png'
import BaseButton from '@/components/ui/BaseButton'
import BaseInput from '@/components/ui/BaseInput'
import { GithubSignIn } from '@/components/github-sign-in'
import { GoogleSignIn } from '@/components/google-sign-in'
import { auth, signIn } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { executeAction } from '@/lib/executeAction'


const SignUpForm = async () => {

    const session = await auth();
    if (session) {
      redirect("/chat");
    }
  
  return (
        <section className=' w-full flex flex-col items-center p-8 h-screen'>
            <div className='flex items-center justify-center mb-10 gap-2'>
        <Image src={Logo} alt="Logo" className='w-8 h-8 object-cover' width={50} height={50}/>
        <h1 className='text-3xl font-semibold'>Chat Bot</h1>
            </div>
            <div className='flex flex-col items-center gap-4 w-4/6'>
            <h2 className='text-5xl font-extralight font-bricolage text-center'>Your Ideas, <br /> <span>Elevated</span> </h2>
            <p>Privacy-first AI that helps you create in confidence.</p>
            <div className=' flex flex-col justify-center items-center border border-zinc-200 gap-2 shadow-2xl mt-6 p-8 rounded-4xl '>
               <GithubSignIn />
               <GoogleSignIn />
                <p className='text-md'>OR</p>
                {

                }
                <form action={async (formData: FormData) => {
                    "use server"
                    await executeAction({
                        actionFn: async () => {
                          await signIn("credentials", formData);
                        }
                      })
                }}>
                <BaseInput placeholder='Email' name='email' id='email' className='mb-2'/>
                <BaseInput placeholder='Password' name='password' id='password' security='true' className='mb-2' />
                <BaseButton text='Continue With Email' variant='dark' type='submit' />
                </form>
                <p className='text-center text-sm'>Don&apos;t have an account?  <a href="/signup">Sign Up</a>.</p>
                <p className='text-center text-sm'>By continuing, you agree to Anthropic’s <a href="">Consumer Terms </a>and <a href=""> Usage Policy</a>, and acknowledge our <a href="">Privacy Policy</a>.</p>
            </div>

            </div>
        </section>
 
  )
}

export default SignUpForm;