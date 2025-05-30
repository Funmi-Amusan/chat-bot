"use client";

import { setLoggedInUserAction } from "@/store/conversation";
import { useAppDispatch } from "@/utils/hooks";
import { signOut } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";

const SignOut = ({isSidebarOpen}: {isSidebarOpen?: boolean}) => {
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    await signOut()
    dispatch(setLoggedInUserAction(null));
  };
  return (
  
    <button onClick={handleSignOut} className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-300 dark:hover:text-neutral-700 inline-flex gap-2 whitespace-nowrap items-center">
      <LuLogOut size={18} />
      {isSidebarOpen && 'Sign Out'}
    </button>
   
   
  );
};

export default SignOut;
