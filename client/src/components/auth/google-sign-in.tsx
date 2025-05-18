
import { signIn } from "@/lib/auth";
import BaseButton from "../ui/BaseButton";
import { FcGoogle } from "react-icons/fc";


const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        await signIn("google");
      }}
      className="w-full"
    >
     <BaseButton text='Login with Google' type="submit" icon={<FcGoogle size={18} />} className='w-full bg-white border-gray-300' />
    </form>
  );
};

export { GoogleSignIn };
