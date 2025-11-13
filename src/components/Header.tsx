'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MenuItem } from '@/lib/storage';

interface HeaderProps {
  menuItems: MenuItem[];
  headerTitle: string;
  headerSubtitle: string;
}

export default function Header({ menuItems, headerTitle, headerSubtitle }: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (menuId: string) => {
    setOpenDropdown(openDropdown === menuId ? null : menuId);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">ग्र</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-green-800">
                {headerTitle}
              </h1>
              <p className="text-sm text-gray-600">{headerSubtitle}</p>
            </div>
          </div>

          {/* Right side - Navigation Menu */}
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:block" ref={dropdownRef}>
              <ul className="flex space-x-1">
                {menuItems.map((item) => (
                  <li key={item.id} className="relative">
                    {item.subItems && item.subItems.length > 0 ? (
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(item.id)}
                          className="flex items-center px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
                        >
                          <span className="font-medium">{item.title}</span>
                          <svg
                            className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                              openDropdown === item.id ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openDropdown === item.id && (
                          <div className="absolute right-0 mt-1 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                            <div className="py-2">
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.id}
                                  href={subItem.url || '#'}
                                  onClick={closeDropdown}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.url || '#'}
                        className="block px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 ml-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-100" ref={dropdownRef}>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id} className="relative">
                  {item.subItems && item.subItems.length > 0 ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
                      >
                        <span className="font-medium">{item.title}</span>
                        <svg
                          className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                            openDropdown === item.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Mobile Dropdown Menu */}
                      {openDropdown === item.id && (
                        <div className="mt-1 ml-4 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.url || '#'}
                              onClick={() => {
                                closeDropdown();
                                setIsMobileMenuOpen(false);
                              }}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.url || '#'}
                      className="block px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
