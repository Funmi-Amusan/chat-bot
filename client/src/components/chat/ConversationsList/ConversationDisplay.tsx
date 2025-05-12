
import Link from 'next/link';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ConversationItem from './ConversationItem'; 
type Conversation = {
    id: string;
    title?: string | null;
};

type ConversationDisplayProps = {
    initialConversations: Conversation[];
    currentId: string;
};

const ConversationDisplay = ({ initialConversations, currentId }: ConversationDisplayProps) => {
    return (
        <div className='h-full w-full flex flex-col gap-5 text-[#1D1B20] pb-6 '>

<Link href={'/chat/new'}
      className='my-2 p-2 w-full rounded-2xl h-14 flex gap-3 items-center justify-center bg-[#EADDFF] shadow-lg text-[#21005D] hover:bg-[#D0BCFF] transition-colors'
      
    >
      <AddCircleOutlineOutlinedIcon />
      New Conversation
    </Link>
            <div className=' overflow-y-auto scrollbar-hide flex-1 flex flex-col gap-2'>
               
                  {initialConversations.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            title={conversation?.title || "Untitled Conversation"}
                            id={conversation?.id}
                            isActive={conversation.id === currentId}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ConversationDisplay;
