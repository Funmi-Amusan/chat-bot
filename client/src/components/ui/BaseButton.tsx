/* eslint-disable @next/next/no-img-element */
import React from 'react';

type BaseButtonProps = {
  text: string;
  imgSrc?: string;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "dark" | "primary";
  type?: "button" | "submit";
};

const BaseButton = ({ text, onClick, imgSrc, className, variant = "default", type = 'button' }: BaseButtonProps) => {
  
  const buttonStyles = {
    default: "bg-white text-gray-700 hover:border hover:bg-gray-100",
    dark: "bg-gray-900 text-white border-gray-800 hover:bg-gray-700",
    primary: "bg-blue-500 text-white border-blue-600 hover:bg-blue-600",
  };

  return (
    <button 
    type={type}
      onClick={onClick} 
      className={`inline-flex flex-wrap whitespace-nowrap justify-center items-center gap-3 px-6 py-2 w-full text-center font-bold text-sm uppercase rounded-lg transition-transform duration-300 hover:scale-105 ${buttonStyles[variant]} ${className}`}
    >
      {imgSrc && <img src={imgSrc} alt="button icon" className="h-4" />}
      {text}
    </button>
  );
}

export default BaseButton;
