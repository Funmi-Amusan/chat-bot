'use client'

import React, { useState } from 'react'
import { LuArrowLeftToLine } from 'react-icons/lu'
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

const SidebarButton = ({ onClick, isSidebarOpen }: { onClick?: () => void; isSidebarOpen: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-2 rounded-md transition-all duration-200 hover:bg-neutral-200 dark:hover:bg-black"
      aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isHovered ? (
        <LuArrowLeftToLine color='gray' size={18} />
      ) : (
        <BsLayoutTextSidebarReverse color='gray' size={18} />
      )}
    </button>
  )
}

export default SidebarButton