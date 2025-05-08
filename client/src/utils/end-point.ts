const baseURL = process.env.NEXT_PUBLIC_API_URL;

//Authentication
export const registerUserURL = baseURL + "/api/v1/create-user";
export const loginURL =  baseURL + "/api/v1/login";
export const forgotPasswordURL = baseURL + "/api/v1/forgot-password";
export const resetPasswordURL = baseURL + "/api/v1/reset-password";


// Conversation
export const createConversationURL = baseURL + "/api/v1/conversation/create";
export const findConversationsByUserIdURL = (userId: string) => baseURL + `/api/v1/conversation/all/${userId}`;
export const findConversationByIdURL = (id: string) => baseURL + `/api/v1/conversation/${id}`;
export const deleteConversationByIdURL = (id: string) => baseURL + `/api/v1/conversation/${id}`;
export const sendMessageURL = baseURL + `/api/v1/conversation/send`;

