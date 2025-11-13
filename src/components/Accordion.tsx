'use client';

import { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'payment';
}

export default function Accordion({ title, children, defaultOpen = false, variant = 'default' }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const titleClass = variant === 'payment' ? 'text-green-700 hover:text-green-800' : 'text-gray-800';

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-gray-50 border-l-4 border-green-600 px-4 py-3 font-medium cursor-pointer hover:bg-gray-100 transition-colors duration-200"
      >
        <span className={`text-left ${titleClass}`}>{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white p-4 border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}
