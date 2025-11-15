'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '🏠',
      href: '/admin'
    },
    {
      id: 'homepage',
      title: 'Homepage',
      icon: '📄',
      href: '/admin/homepage'
    },
    {
      id: 'header',
      title: 'Header',
      icon: '🧭',
      href: '/admin/header'
    },
    {
      id: 'padadhikari',
      title: 'पदाधिकारी',
      icon: '👥',
      href: '/admin/padadhikari'
    },
    {
      id: 'karbharana',
      title: 'करभारणा',
      icon: '💰',
      href: '/admin/karbharana'
    },
    {
      id: 'nagrik',
      title: 'नागरिक सेवा',
      icon: '📋',
      href: '/admin/nagrik'
    },
    {
      id: 'yojana',
      title: 'योजना',
      icon: '🏛️',
      href: '/admin/yojana'
    },
    {
      id: 'photo',
      title: 'फोटो गॅलरी',
      icon: '📸',
      href: '/admin/photo'
    },
    {
      id: 'footer',
      title: 'Footer',
      icon: '🦶',
      href: '/admin/footer'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      href: '/admin/settings'
    }
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 h-screen overflow-hidden ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ग्र</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
                <p className="text-xs text-gray-500">Content Management</p>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-green-100 text-green-900 border-r-2 border-green-500'
                      : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.title : undefined}
                >
                  <span className={isCollapsed ? '' : 'mr-3'}>{item.icon}</span>
                  {!isCollapsed && item.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <span className="text-lg">🚪</span>
            {!isCollapsed && (
              <span className="font-medium">Logout</span>
            )}
          </button>
          
          {!isCollapsed && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/"
                target="_blank"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
              >
                <span className="text-lg">🌐</span>
                <span className="text-sm">View Website</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
