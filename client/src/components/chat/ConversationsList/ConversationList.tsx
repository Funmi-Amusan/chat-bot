import { auth } from '@/lib/auth'; 
import { conversationService } from '@/store/conversation/service';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import ConversationDisplay from './ConversationDisplay';

const UserIdSchema = z.string().uuid("Invalid user ID format");

const ConversationSchema = z.object({
  id: z.string().uuid("Invalid conversation ID"),
  title: z.string().optional().nullable(), 
});

const ConversationsSchema = z.array(ConversationSchema);

type ValidConversation = z.infer<typeof ConversationSchema>;

const ConversationList = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect('/login');
  }

  let validUserId: z.infer<typeof UserIdSchema>;
  try {
    validUserId = UserIdSchema.parse(userId);
  } catch (error) {
    console.error("Server: Invalid user ID format after authentication:", error);
    return (
      <div className='h-full w-full flex flex-col gap-5 text-[#1D1B20] pb-6 '>
        <p className="text-center text-red-500 mt-4">Authentication error: Invalid user ID format.</p>
      </div>
    );
  }

  let conversations: ValidConversation[] = [];
  let fetchError: string | null = null;

  try {
    const response = await conversationService.getConversation(validUserId); 

    if (response && response.conversations) {
        conversations = ConversationsSchema.parse(response.conversations);
    } else {
        console.warn("Server: conversationService.getConversation returned no conversations or unexpected structure", response);
        conversations = []; 
    }


  } catch (error) {
    console.error("Server: Error fetching or validating conversations:", error);
    if (error instanceof z.ZodError) {
        fetchError = "Invalid conversation data format from server.";
    } else if (error instanceof Error) {
         fetchError = `Failed to fetch conversations: ${error.message}`;
    } else {
         fetchError = "An unknown error occurred while fetching conversations.";
    }
    conversations = [];
  }

  return (
    <ConversationDisplay initialConversations={conversations} fetchError={fetchError} />
  );
};

export default ConversationList;
