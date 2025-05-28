'use server';

import { signIn } from '@/lib/auth';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { executeAction } from '../executeAction';
import { registerUserURL } from '@/utils/end-point';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
});

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
});

export async function loginAction(
  formData: FormData
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    loginSchema.parse({ email, password });
  } catch (zodError) {
    if (zodError instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      zodError.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      return { success: false, error: { fieldErrors } };
    }
  }
  try { 
    const result =await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (result) {
      return { success: true, data: result };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.message); 
        let message = "Authentication failed. Please try again."; 
        if (error.type === "CallbackRouteError") {
          if (error.cause?.err instanceof Error && error.cause.err.message) {
            message = error.cause.err.message; 
        } else {
            message = "Could not authenticate due to a callback processing error.";
          }
          return {
            success: false,
            error: { message: message }
          };
      }
    }
    console.error(error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unexpected error occurred";
    return { 
      success: false, 
      error: { message: errorMessage } 
    };
  }
}


export async function handleRegistration (prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  try {
    loginSchema.parse({ email, password, name });
  } catch (zodError) {
    if (zodError instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      zodError.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      return { success: false, error: { fieldErrors } };
    }
  }
    const response = await fetch(registerUserURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      name, email, password })
    });
const data = await response.json();
if (!response.ok) {
  const error = data.error || 'An error occurred while registering the user.';
  return { success: false, error };
}
    return { success: true, data };
  
  }