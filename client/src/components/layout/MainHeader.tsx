
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import UserInitializer from '../auth/UserInitializer';

const MainHeader  = async () => {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const user = session?.user || null;

  return (

    <header className=' p-2 justify-between hidden md:flex bg-transparent fixed w-full items-center'>
      <UserInitializer user={user} />
  {/* <SignOut /> */}
    </header>
  )
}

export default MainHeader