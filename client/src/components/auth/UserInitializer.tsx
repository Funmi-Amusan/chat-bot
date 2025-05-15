"use client"; 

import { useEffect } from 'react';
import { useAppDispatch } from '@/utils/hooks'; 
import { setLoggedInUserAction } from '@/store/conversation'; 
import { User } from 'next-auth';

type UserInitializerProps = {
  user: User | null;
}

const UserInitializer = ({ user }: UserInitializerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setLoggedInUserAction(user));
    }
  }, [user, dispatch]); 

  return null;
}

export default UserInitializer;
