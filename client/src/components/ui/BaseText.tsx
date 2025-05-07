/* eslint-disable @next/next/no-img-element */
import React from 'react';

type BaseTextProps = {
  imgSrc?: string;
  text: string;
  className?: string;
};

const  BaseText = ({ text, className, imgSrc }: BaseTextProps) => {
  return (
    <div className={`${className} inset-shadow-2xs shadow w-fit flex items-start max-w-[400px] px-3 py-2 gap-2 rounded-xl  `}>
         {imgSrc && <img src={imgSrc} alt="mock user image" className="h-6 border border-white rounded-full" />}
      <p 
        className={` text-base font-normal leading-tight text-start `}
      >{text}</p>
    </div>
  );
}

export default BaseText;
