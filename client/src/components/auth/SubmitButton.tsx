'use client'


import React from 'react'
import BaseButton from '@/components/ui/BaseButton'
import BaseInput from '@/components/ui/BaseInput'
import { signIn } from '@/lib/auth'
import { executeAction } from '@/lib/executeAction'
import { toast } from 'react-toastify'
import { useFormStatus } from 'react-dom'

// Client component for handling form submission and toast
export function SubmitButton({text}:{text:string}) { 

  const {pending} = useFormStatus()
  
  return (
  <>
  { pending ? (
       <BaseButton testId="submit-button" text='Processing' disabled variant='dark' type='submit' />
  ) : (
    <BaseButton testId="submit-button" text={text} variant='dark' type='submit' />
  )}
  </>
  )
}