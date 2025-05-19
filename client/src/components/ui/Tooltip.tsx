'use client'

import React from 'react';

interface TooltipButtonProps {
  children: React.ReactNode;
  tooltip: string;
  className?: string;
}

const Tooltip = ({ children, tooltip, className = '' }: TooltipButtonProps) => {
  return (
    <div className="group relative inline-flex">
       {children}
      <div className="pointer-events-none absolute -top-10 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex flex-col items-center">
          <div className="rounded-md bg-black py-1 px-2 text-xs text-white">
            <p className="whitespace-nowrap">{tooltip}</p>
          </div>
          <div className="h-0 w-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
        </div>
      </div>
    </div>
  );
};

export default Tooltip;