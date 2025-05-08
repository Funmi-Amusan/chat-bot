import Image from 'next/image'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SignOut } from '../auth/sign-out';
import { ImageAssets } from '@/assets/images';


const MainHeader  = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (

    <header className=' p-2.5 shadow-md justify-between flex bg-white items-center'>
      <Image src={ImageAssets.Logo} alt={'Logo'} width={50} height={48} />
  <SignOut />
    </header>
  )
}

export default MainHeader