
import ConversationItem from './ConversationItem'; 
type Conversation = {
    id: string;
    title?: string | null;
};

type ConversationDisplayProps = {
    initialConversations: Conversation[];
};

const ConversationDisplay = ({ initialConversations }: ConversationDisplayProps) => {

    return (
        <div className='h-full w-full flex flex-col gap-5 text-[#1D1B20] pb-6 '>
            <div className=' overflow-y-auto scrollbar-hide flex-1 flex flex-col gap-2'>
               
                  {initialConversations.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            title={conversation?.title || "Untitled Conversation"}
                            id={conversation?.id}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ConversationDisplay;
