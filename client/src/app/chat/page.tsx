
import ChatHeader from "@/components/chat/ChatInterface/ChatHeader";
import ChatInterface from "@/components/chat/ChatInterface/ChatInterface";
import ConversationList from "@/components/chat/ConversationsList/ConversationList";

export default function Home() {
  return (
    <div className="flex flex-col h-[calc(100vh-var(--main-header-height))]">
  <ChatHeader />
  <div className=" px-4 md:p-8 lg:grid lg:grid-cols-4 gap-4 w-full h-full overflow-clip ">
    <div className="hidden lg:col-span-1 lg:flex overflow-scroll">
      <ConversationList />
    </div>
    <div className="lg:col-span-3 w-full h-full overflow-scroll ">
      <ChatInterface />
    </div>
  </div>
</div>
  );
}
