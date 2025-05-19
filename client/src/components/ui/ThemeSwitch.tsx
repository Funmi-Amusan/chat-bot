import { useTheme } from '@/providers/ThemeProvider';
import React from 'react';

interface ThemeSwitchProps {
  defaultChecked?: boolean;
  className?: string;
  width?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
 
  className = '',
  width = 'w-14',
}) => {
 
    const { theme, toggleTheme } = useTheme();
    const isChecked = theme === 'light';

  const handleChange = () => {
    toggleTheme();
  };

  return (
    <div className={`  ${className}`}>
      <label htmlFor="theme-switch" className={`relative inline-block h-8 cursor-pointer ${width}`}>
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
        <span 
          className={`absolute transition-all duration-500 ${
            isChecked 
              ? 'w-2.5 h-2.5 bg-[#f9e7ff] transform -translate-x-5 shadow-[0_0_0_#f9e7ff,_-12px_0_0_#f9e7ff,_-6px_0_0_1.6px_#f9e7ff,_5px_15px_0_1px_#f9e7ff,_1px_17px_0_#f9e7ff,_10px_17px_0_#f9e7ff]'
              : 'h-0.5 w-0.5 rounded-full right-[20%] top-[15%] bg-yellow-400 shadow-[-7px_10px_0_#e5f041e6,_8px_15px_0_#e5f041e6,_-17px_1px_0_#e5f041e6,_-20px_10px_0_#e5f041e6,_-7px_23px_0_#e5f041e6,_-15px_25px_0_#e5f041e6]'
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ThemeSwitch;