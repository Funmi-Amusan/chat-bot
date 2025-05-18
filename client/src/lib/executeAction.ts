import { isRedirectError } from "next/dist/client/components/redirect-error";

interface ActionResponse {
  success: boolean;
  message?: string; // User-friendly message (success or error)
  errors?: Record<string, string>; // Optional: field-specific errors
}

async function executeAction({ actionFn }: { actionFn: () => Promise<void> }): Promise<ActionResponse> {
  try {
    await actionFn();
    console.log("Action executed successfully");
    return { success: true, message: 'Sign in successful' }; 
  } catch (error) {
    console.error("Action execution failed:", error); 

    let message = 'An unexpected error occurred.';
    if (error instanceof Error) {
        message = error.message;
    }
console.log('first error', message)
    return { success: false, message };
  }
}

export { executeAction };
