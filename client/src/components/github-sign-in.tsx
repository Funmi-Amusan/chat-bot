
import { signIn } from "@/lib/auth";
import BaseButton from "./ui/BaseButton";
import GoogleLogo from '@/assets/Google.png'

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";

        await signIn("github");
      }}
    >
     <BaseButton text='Login to Github' type="submit" imgSrc={GoogleLogo.src} className='w-full bg-white border-gray-300' />
    </form>
  );
};

export { GithubSignIn };
