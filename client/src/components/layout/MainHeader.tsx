import Image from 'next/image'
import Logo from '@/assets/Logo.png'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SignOut } from '../sign-out';

const MainHeader  = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (

    <header className=' p-2.5 shadow-md justify-between flex bg-white items-center'>
      <Image src={Logo} alt={'Logo'} width={50} height={48} />
  <SignOut />
    </header>
  )
}

export default MainHeader