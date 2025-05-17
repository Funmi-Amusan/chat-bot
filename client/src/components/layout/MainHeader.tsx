import Image from 'next/image'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ImageAssets } from '@/assets/images';
import UserInitializer from '../auth/UserInitializer';
import SignOut from '../auth/sign-out';

const MainHeader  = async () => {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const user = session?.user || null;
console.log('user', user)

  return (

    <header className=' p-2 justify-between hidden flex bg-tranparent items-center'>
      <Image src={ImageAssets.Logo} alt={'Logo'} width={20} height={20} />
      <UserInitializer user={user} />
  <SignOut />
    </header>
  )
}

export default MainHeader