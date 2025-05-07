import React from 'react';

type BaseInputProps = {
  placeholder: string;
  type: string;
  id: string;
  className?: string;
};

const BaseInput = ({ placeholder, type, id, className }: BaseInputProps) => {
  return (
    <div className="w-full max-w-[400px]  ">
      <input 
        className={`${className} text-sm bg-white w-full max-w-[400px] px-4 py-2  border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-gray-400 hover:shadow-lg hover:border-gray-300 `}
        placeholder={placeholder} 
        type={type} 
        id={id}
      />
    </div>
  );
}

export default BaseInput;
