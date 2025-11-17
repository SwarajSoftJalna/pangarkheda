'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ContentData } from '@/lib/storage';

export default function AdminDashboard() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMenuItems: 0,
    lastUpdated: '',
    preheaderLength: 0,
    homepageLength: 0
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/content');
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      const data = await response.json();
      setContent(data);
      
      // Calculate stats
      setStats({
        totalMenuItems: data.header?.length || 0,
        lastUpdated: data.lastUpdated,
        preheaderLength: data.preheader?.length || 0,
        homepageLength: data.homepage?.length || 0
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the ग्रामपंचायत मानेपुरी CMS</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <span className="text-2xl">🧭</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Menu Items</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalMenuItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <span className="text-2xl">📄</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Homepage</h3>
              <p className="text-sm text-gray-600">{stats.homepageLength} characters</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <span className="text-2xl">📢</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">PreHeader</h3>
              <p className="text-sm text-gray-600">{stats.preheaderLength} characters</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <span className="text-2xl">🕒</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Last Updated</h3>
              <p className="text-sm text-gray-600">
                {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          href="/admin/homepage"
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 group"
        >
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-4">📄</span>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600">Edit Homepage</h3>
          </div>
          <p className="text-gray-600">Manage the main content of your website homepage</p>
        </Link>

        <Link
          href="/admin/header"
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 group"
        >
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-4">🧭</span>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600">Edit Header</h3>
          </div>
          <p className="text-gray-600">Manage navigation menus and header structure</p>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 group"
        >
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-4">⚙️</span>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600">Settings</h3>
          </div>
          <p className="text-gray-600">Configure preheader and admin profile settings</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Website Preview</h3>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">View your website as visitors see it</p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
          >
            <span className="mr-2">🌐</span>
            View Website
          </a>
        </div>
      </div>
    </div>
  );
}
