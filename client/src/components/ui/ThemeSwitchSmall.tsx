import { useTheme } from '@/providers/ThemeProvider';
import React from 'react';

interface ThemeSwitchProps {
  defaultChecked?: boolean;
  className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
 
  className = '',
}) => {
 
    const { theme, toggleTheme } = useTheme();
    const isChecked = theme === 'light';

  const handleChange = () => {
    toggleTheme();
  };

  return (
    <div className={` ${className}`}>
      <label htmlFor="theme-switch" className="relative inline-block w-14 h-8 cursor-pointer ">
        <input
          id="theme-switch"
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={isChecked}
          onChange={handleChange}
        />
        <span 
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isChecked ? 'bg-purple-200' : 'bg-violet-950'
          }`}
        ></span>
        <span 
          className={`absolute h-6 w-6 rounded-full left-[10%] bottom-[15%] transition-all duration-500 ${
            isChecked 
              ? 'transform translate-x-full shadow-[inset_15px_-4px_0px_15px_#2f0d68]' 
              : 'shadow-[inset_8px_-4px_0px_0px_#ececd9,_-4px_1px_4px_0px_#dadada] bg-violet-950'
          }`}
        ></span>
     
      </label>
    </div>
  );
};

export default ThemeSwitch;