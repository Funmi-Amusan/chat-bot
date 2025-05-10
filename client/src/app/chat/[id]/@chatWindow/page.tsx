import ChatInterfaceHeader from "@/components/chat/ChatInterface/ChatInterfaceHeader"
import ChatWindow from "@/components/chat/ChatInterface/ChatWindow"
import TextInput from "@/components/chat/ChatInterface/TextInput"


const ChatInterface = () => {
  return (
    <div className='w-full h-full lg:bg-white rounded-2xl relative'>
      <div className='flex flex-col h-full '>
        <ChatInterfaceHeader />
        <div className='flex-1 h-full  overflow-hidden lg:mx-4 relative'>
          <div className='h-full pb-16 overflow-y-auto '>
            <ChatWindow />
          </div>
          <div className='absolute bottom-0 left-0 right-0 mb-4'>
            <TextInput />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ChatInterface