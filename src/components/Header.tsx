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
  const [isTakrarOpen, setIsTakrarOpen] = useState(false);

  // Complaint form state
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');

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

  const openTakrar = () => {
    setIsTakrarOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeTakrar = () => {
    setIsTakrarOpen(false);
  };

  const submitTakrar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile, type, details }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      alert('तक्रार/सूचना नोंद झाली. धन्यवाद!');
      setName('');
      setMobile('');
      setType('');
      setDetails('');
      setIsTakrarOpen(false);
    } catch (err) {
      console.error(err);
      alert('सबमिट करण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा.');
    }
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
                                subItem.isExternal ? (
                                  <a
                                    key={subItem.id}
                                    href={subItem.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeDropdown}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200"
                                  >
                                    {subItem.title}
                                    <span className="ml-1 text-xs">🔗</span>
                                  </a>
                                ) : (
                                  <Link
                                    key={subItem.id}
                                    href={subItem.url || '#'}
                                    onClick={closeDropdown}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200"
                                  >
                                    {subItem.title}
                                  </Link>
                                )
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (item.action === 'takrarModal' || (item.title === 'तक्रार' && !item.subItems && !item.isExternal && (!item.url || item.url === '#'))) ? (
                      <button
                        onClick={openTakrar}
                        className="block px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                      >
                        {item.title}
                      </button>
                    ) : (
                      item.isExternal ? (
                        <a
                          href={item.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                        >
                          {item.title}
                          <span className="ml-1 text-xs">🔗</span>
                        </a>
                      ) : (
                        <Link
                          href={item.url || '#'}
                          className="block px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                        >
                          {item.title}
                        </Link>
                      )
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
                            subItem.isExternal ? (
                              <a
                                key={subItem.id}
                                href={subItem.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                  closeDropdown();
                                  setIsMobileMenuOpen(false);
                                }}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
                              >
                                {subItem.title}
                                <span className="ml-1 text-xs">🔗</span>
                              </a>
                            ) : (
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
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (item.action === 'takrarModal' || (item.title === 'तक्रार' && !item.subItems && !item.isExternal && (!item.url || item.url === '#'))) ? (
                    <button
                      onClick={openTakrar}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                    >
                      {item.title}
                    </button>
                  ) : (
                    item.isExternal ? (
                      <a
                        href={item.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                        <span className="ml-1 text-xs">🔗</span>
                      </a>
                    ) : (
                      <Link
                        href={item.url || '#'}
                        className="block px-4 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      {/* Complaint Modal */}
      {isTakrarOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden">
            <form onSubmit={submitTakrar}>
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-extrabold text-green-700 mb-2">तक्रार/सूचना</h2>
                <p className="text-gray-600 mb-6">आपण हा फॉर्म भरून आपली तक्रार किंवा सूचना आपल्या ग्रामपंचायत ला कळवू शकता</p>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="नाव टाका"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="मोबाईल नंबर टाका"
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
                    required
                  >
                    <option value="">तक्रार / सूचना निवडा</option>
                    <option value="पाणी प्रश्न">पाणी प्रश्न</option>
                    <option value="स्वच्छता">स्वच्छता</option>
                    <option value="गटर चेंबर">गटर चेंबर</option>
                    <option value="रस्ते वाहतूक">रस्ते वाहतूक</option>
                    <option value="पथ दिवे">पथ दिवे</option>
                    <option value="घंटा गाडी">घंटा गाडी</option>
                    <option value="इतर">इतर</option>
                  </select>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="संदर्भ माहिती लिहा"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>

              <div className="px-6 sm:px-8 py-4 bg-gray-50 flex items-center gap-3">
                <button type="submit" className="inline-flex items-center px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700">Send</button>
                <button type="button" onClick={closeTakrar} className="inline-flex items-center px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
