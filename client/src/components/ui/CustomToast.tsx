'use client'

import { useTheme } from '@/providers/ThemeProvider';
import React from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToastContainer = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDarkMode ? 'dark' : 'light'}
      transition={Slide}
      toastClassName={() => 
        `relative flex p-4 mb-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer 
        ${isDarkMode 
          ? 'bg-neutral-800 text-white' 
          : 'bg-white text-neutral-900'} 
        shadow-sm border ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`
      }
    />
  );
};


export default CustomToastContainer;