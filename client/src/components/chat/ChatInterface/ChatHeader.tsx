
import Image from 'next/image'
import MobileMenu from '@/components/layout/MobileMenu'
import { ImageAssets } from '@/assets/images'

const ChatHeader = () => {

  return (
    <div>
        <div className=' lg:hidden px-4 py-2 border-y border-[#CAC4D0] mt-8 flex items-center justify-between'>
            <div className=' flex gap-4 items-center'>
            <Image src={ImageAssets.ChatBotAvatar} alt={'Chat Bot Avatar'} width={48} height={48} />
            <h3 className='font-medium text-black '>Chatbot</h3>
            </div>
            <MobileMenu  />
        </div>
    </div>
  )
}

export default ChatHeader