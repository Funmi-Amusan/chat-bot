
import Image from 'next/image'
import ChatBotAvatar from '@/assets/ChatBotAvatar.png'
import MobileMenu from '../layout/MobileMenu'

const ChatHeader = () => {

  return (
    <div>
        <div className=' lg:hidden px-4 py-2 border-y border-[#CAC4D0] mt-8 flex items-center justify-between'>
            <div className=' flex gap-4 items-center'>
            <Image src={ChatBotAvatar} alt={'Chat Bot Avatar'} width={48} height={48} />
            <h3 className='font-medium text-black '>Chatbot</h3>
            </div>
            <MobileMenu  />
        </div>
    </div>
  )
}

export default ChatHeader