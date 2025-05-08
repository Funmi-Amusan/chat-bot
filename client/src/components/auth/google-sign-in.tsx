
import { signIn } from "@/lib/auth";
import BaseButton from "./ui/BaseButton";
import GoogleLogo from '@/assets/Google.png'

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";

        await signIn("google");
      }}
    >
     <BaseButton text='Login to Google' type="submit" imgSrc={GoogleLogo.src} className='w-full bg-white border-gray-300' />
    </form>
  );
};

export { GoogleSignIn };
