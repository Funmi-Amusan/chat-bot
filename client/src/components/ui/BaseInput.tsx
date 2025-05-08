import React from 'react';

type BaseInputProps = {
  placeholder: string;
  id: string;
  name: string;
  className?: string;
  security?: string;
};

const BaseInput = ({ placeholder, id, name, className, security='false' }: BaseInputProps) => {
  return (
    <div className="w-full max-w-[400px]  ">
      <input 
        className={`${className} text-sm bg-white w-full max-w-[400px] px-4 py-2  border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-gray-400 hover:shadow-lg hover:border-gray-300 `}
        placeholder={placeholder} 
        type='text' 
        id={id}
        security={security}
        name={name}
      />
    </div>
  );
}

export default BaseInput;
