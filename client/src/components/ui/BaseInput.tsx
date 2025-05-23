import React from 'react';

type BaseInputProps = {
  placeholder: string;
  id: string;
  name: string;
  className?: string;
  security?: string;
  required?: boolean;
  hasError?: boolean;
  error: string | undefined;
  testId?: string;
  type?: string;
};

const BaseInput = ({ placeholder, id, name, className, hasError, error="", type="text", security='false', required=true, testId }: BaseInputProps) => {
  return (
    <div className="w-full ">
      <input 
        className={` text-sm dark:text-white bg-white dark:bg-neutral-700 w-full px-4 py-2  border border-neutral-300 dark:border-neutral-600 rounded-lg transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-neutral-400 dark:focus:outline-neutral-600 hover:shadow-lg hover:border-neutral-300 ${className}`}
        placeholder={placeholder} 
        type={type} 
        id={id}
        security={security}
        name={name}
        required={required}
        data-testid={testId}
      />
      {hasError && (
        <p className="text-red-500/60 text-sm mb-1">{error}</p>
      )}

      
    </div>
  );
}

export default BaseInput;
