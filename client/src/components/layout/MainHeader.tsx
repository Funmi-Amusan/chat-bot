import Image from 'next/image'
import Logo from '@/assets/Logo.png'

const MainHeader = () => {
  return (
    <header className=' p-2.5 shadow-md flex bg-white items-center'>
      <Image src={Logo} alt={'Logo'} width={50} height={48} />
    </header>
  )
}

export default MainHeader