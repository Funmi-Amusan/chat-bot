
import { signIn } from "@/lib/auth";
import BaseButton from "../ui/BaseButton";
import { FaGithub } from "react-icons/fa";

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn("github");
      }}
      className="w-full"
    >
     <BaseButton testId="github-signin" text='Login with Github' type="submit" icon={<FaGithub size={18} />} className='w-full bg-white border-gray-300' />
    </form>
  );
};

export { GithubSignIn };
