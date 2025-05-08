"use client";

import BaseButton from "./ui/BaseButton";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut()
  };
  return (
  
     <BaseButton text='Sign Out' onClick={handleSignOut} className='!w-fit' variant="dark" />
   
  );
};

export { SignOut };
