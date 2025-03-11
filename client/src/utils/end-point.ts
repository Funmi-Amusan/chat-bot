const baseURL = process.env.NEXT_PUBLIC_API_URL;

//Authentication



// Conversation
export const createConversationURL = baseURL + "/api/v1/conversation/create";
export const findConversationsByUserIdURL = (userId: string) => baseURL + `/api/v1/conversation/all/${userId}`;
export const findConversationByIdURL = (id: string) => baseURL + `/api/v1/conversation/${id}`;
export const deleteConversationByIdURL = (id: string) => baseURL + `/api/v1/conversation/${id}`;
export const sendMessageURL = baseURL + `/api/v1/conversation/send`;

