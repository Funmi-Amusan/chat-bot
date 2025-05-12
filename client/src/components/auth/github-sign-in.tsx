
import { signIn } from "@/lib/auth";
import BaseButton from "../ui/BaseButton";
import { ImageAssets } from "@/assets/images";

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
     <BaseButton text='Login to Github' type="submit" imgSrc={ImageAssets.googleLogo.src} className='w-full bg-white border-gray-300' />
    </form>
  );
};

export { GithubSignIn };
