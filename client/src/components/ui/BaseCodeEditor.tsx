import React from "react";

const BaseCodeEditor = ({className}: {className?: string}) => { 
  return (
    <div className={`${className} max-w-lg bg-gray-900 shadow-lg rounded-lg px-12 py-4`} >
      <div className="flex items-center justify-between m-2">
        <span className="font-bold text-base tracking-wide text-gray-300">CSS</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-5 transition-all duration-200 rounded-full cursor-pointer hover:bg-gray-500"
        >
          <path strokeLinecap="round" strokeWidth={2} stroke="#4C4F5A" d="M6 6L18 18" />
          <path strokeLinecap="round" strokeWidth={2} stroke="#4C4F5A" d="M18 6L6 18" />
        </svg>
      </div>
      <div className="mx-4 mb-2 text-white text-lg font-mono">
        <code>
          <p>
            <span className="text-blue-500">.code-editor</span> <span>{'{'}</span>
          </p>
          <p className="ml-6">
            <span className="text-cyan-400">max-width</span>: <span className="text-green-300">300px</span>;
          </p>
          <p className="ml-6 flex items-center">
            <span className="text-cyan-400">background-color</span>: <span className="h-2 w-2 border border-white inline-block bg-gray-900 mr-2" />
            <span>#1d1e22</span>;
          </p>
          <p className="ml-6 flex items-center">
            <span className="text-cyan-400">background-color</span>: <span className="h-2 w-2 border border-white inline-block bg-gray-900 mr-2" />
            <span>#1d1e22</span>;
          </p>
          <p className="ml-6 flex items-center">
            <span className="text-cyan-400">background-color</span>: <span className="h-2 w-2 border border-white inline-block bg-gray-900 mr-2" />
            <span>#1d1e22</span>;
          </p>
          <p className="ml-6 flex items-center">
            <span className="text-cyan-400">background-color</span>: <span className="h-2 w-2 border border-white inline-block bg-gray-900 mr-2" />
            <span>#1d1e22</span>;
          </p>
          <p className="ml-6 flex items-center">
            <span className="text-cyan-400">background-color</span>: <span className="h-2 w-2 border border-white inline-block bg-gray-900 mr-2" />
            <span>#1d1e22</span>;
          </p>
          <p className="ml-6">
            <span className="text-cyan-400">border-radius</span>: <span className="text-green-300">8px</span>;
          </p>
          <span>{'}'}</span>
        </code>
      </div>
    </div>
  );
};

export default BaseCodeEditor;
