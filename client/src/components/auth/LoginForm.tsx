'use client'


import React from 'react'
import BaseButton from '@/components/ui/BaseButton'
import BaseInput from '@/components/ui/BaseInput'
import { signIn } from '@/lib/auth'
import { executeAction } from '@/lib/executeAction'
import { toast } from 'react-toastify'

// Client component for handling form submission and toast
export function LoginForm() {
  
  async function handleSubmit(formData: FormData) {
    try {
      const result = await executeAction({
        actionFn: async () => {
            console.log('first')
          return await signIn("credentials", formData);
        }
      });
      
      console.log('result--------', result)

      if (result?.error) {
        toast.error(result.error);
      }
    } catch (error) {
        console.error('Error during form submission:', error);
      toast.error('An error occurred. Please try again.');
    }
  }
  
  return (
    <form action={handleSubmit} className='w-full'>
        <button onClick={()=> toast.success('eeeee')}>dddd</button>
      <BaseInput placeholder='Email' name='email' id='email' className='mb-2 w-full'/>
      <BaseInput placeholder='Password' name='password' id='password' security='true' className='mb-2' />
      <BaseButton text='Continue with email' variant='dark' type='submit' />
    </form>
  );
}