"use client"; 

import { useEffect } from 'react';
import { useAppDispatch } from '@/utils/hooks'; 
import { setLoggedInUserAction } from '@/store/conversation'; 

type UserInitializerProps = {
  userId: string | null;
}

const UserInitializer = ({ userId }: UserInitializerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(setLoggedInUserAction(userId));
    }
  }, [userId, dispatch]); 

  return null;
}

export default UserInitializer;
