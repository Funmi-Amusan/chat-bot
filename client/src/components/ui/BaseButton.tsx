/* eslint-disable @next/next/no-img-element */
import React from 'react';

type BaseButtonProps = {
  text: string;
  imgSrc?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "dark" | "primary";
  type?: "button" | "submit";
};

const BaseButton = ({ text, onClick, imgSrc, icon, className, variant = "default", type = 'button' }: BaseButtonProps) => {
  
  const buttonStyles = {
    default: "dark:bg-neutral-900 bg-black text-gray-800 dark:text-neutral-200 dark:text-gray-700 hover:border dark:hover:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800",
    dark: "bg-neutral-900 text-white border-gray-800 hover:bg-neutral-700 dark:hover:bg-neutral-800 dark:hover:border dark:hover:border-neutral-600",
    primary: "bg-blue-500 text-white border-blue-600 hover:bg-blue-600",
  };

  return (
    <button 
    type={type}
      onClick={onClick} 
      className={`inline-flex flex-wrap whitespace-nowrap tracking-normal text-base justify-center items-center gap-3 px-6 py-3 w-full text-center font-bold rounded-lg transition-transform duration-300 hover:scale-105 ${buttonStyles[variant]} ${className}`}
    >
      {imgSrc && <img src={imgSrc} alt="button icon" className="h-4" />}
      {icon}
      {text}
    </button>
  );
}

export default BaseButton;
