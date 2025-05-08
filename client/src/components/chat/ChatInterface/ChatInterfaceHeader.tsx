import { ImageAssets } from '@/assets/images'
import Image from 'next/image'

const ChatInterfaceHeader = () => {
  return (
    <div>
        <div className=' hidden border-b border-[#CAC4D0] gap-6 px-5 py-2 w-full lg:flex items-center'>
            <Image src={ImageAssets.ChatBotAvatar} alt={'Chat Bot Avatar'} width={48} height={48} />
            <h3 className='font-medium text-black '>Chatbot</h3>
        </div>
    </div>
  )
}

export default ChatInterfaceHeader