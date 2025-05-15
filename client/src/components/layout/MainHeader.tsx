import Image from 'next/image'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ImageAssets } from '@/assets/images';
import UserInitializer from '../auth/UserInitializer';
import SignOut from '../auth/sign-out';

const MainHeader  = async () => {
  const session = await auth();
  const userId = session?.user?.id || null;
  

  if (!session) {
    redirect('/login');
  }

  return (

    <header className=' p-2.5 shadow-md justify-between flex bg-white items-center'>
      <Image src={ImageAssets.Logo} alt={'Logo'} width={40} height={40} />
      <UserInitializer userId={userId} />
  <SignOut />
    </header>
  )
}

export default MainHeader