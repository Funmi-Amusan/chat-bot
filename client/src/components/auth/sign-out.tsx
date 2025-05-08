"use client";

import { signOut } from "next-auth/react";
import BaseButton from "../ui/BaseButton";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut()
  };
  return (
  
     <BaseButton text='Sign Out' onClick={handleSignOut} className='!w-fit' variant="dark" />
   
  );
};

export { SignOut };
