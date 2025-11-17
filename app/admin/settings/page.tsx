'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AdminProfile } from '@/lib/storage';

// Dynamic import of EditorClient with no SSR
const EditorClient = dynamic(() => import('@/components/EditorClient'), {
  ssr: false,
  loading: () => (
    <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading editor...</div>
    </div>
  ),
});

export default function SettingsAdmin() {
  const [preheaderContent, setPreheaderContent] = useState('');
  const [headerTitle, setHeaderTitle] = useState('');
  const [headerSubtitle, setHeaderSubtitle] = useState('');
  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    displayName: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch content
      const contentResponse = await fetch('/api/content');
      if (contentResponse.ok) {
        const contentData = await contentResponse.json();
        setPreheaderContent(contentData.preheader || '');
        setHeaderTitle(contentData.headerTitle || '');
        setHeaderSubtitle(contentData.headerSubtitle || '');
      }

      // Fetch admin profile
      const profileResponse = await fetch('/api/content?type=profile');
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setAdminProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreheader = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: 'preheader',
          content: preheaderContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preheader');
      }

      setMessage({ type: 'success', text: 'Preheader saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving preheader:', error);
      setMessage({ type: 'error', text: 'Failed to save preheader' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHeaderInfo = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          headerTitle,
          headerSubtitle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save header info');
      }

      setMessage({ type: 'success', text: 'Header information saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving header info:', error);
      setMessage({ type: 'error', text: 'Failed to save header info' });
    } finally {
      setSaving(false);
    }
  };


  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'profile',
          displayName: adminProfile.displayName,
          email: adminProfile.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      setMessage({ type: 'success', text: 'Profile saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: 'Failed to save profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure preheader content and admin profile</p>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {/* Header Information Settings */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Header Information</h2>
              <p className="text-gray-600 text-sm">
                Configure the main title and subtitle that appear in the header
              </p>
            </div>
            <button
              onClick={handleSaveHeaderInfo}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Header Info'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Header Title
              </label>
              <input
                type="text"
                value={headerTitle}
                onChange={(e) => setHeaderTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter header title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Header Subtitle
              </label>
              <input
                type="text"
                value={headerSubtitle}
                onChange={(e) => setHeaderSubtitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter header subtitle"
              />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Header Tips:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Title appears as the main heading in the header</li>
              <li>• Subtitle appears below the title in smaller text</li>
              <li>• Keep titles concise for better mobile display</li>
              <li>• Example: "ग्रामपंचायत मानेपुरी" / "जालना, महाराष्ट्र"</li>
            </ul>
          </div>
        </div>

        {/* Preheader Settings */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Preheader Content</h2>
              <p className="text-gray-600 text-sm">
                This content appears at the very top of your website in a colored banner
              </p>
            </div>
            <button
              onClick={handleSavePreheader}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Preheader'}
            </button>
          </div>
          
          <EditorClient
            value={preheaderContent}
            onEditorChange={setPreheaderContent}
            placeholder="Enter preheader content (announcements, contact info, etc.)..."
            height={200}
          />
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h3 className="font-semibold text-yellow-800 mb-2">💡 Preheader Tips:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Keep it concise - this appears as a scrolling banner on mobile</li>
              <li>• Include important contact information or announcements</li>
              <li>• Use | (pipe) symbols to separate different pieces of information</li>
              <li>• Example: "ग्रामपंचायत मानेपुरी | gp.jalna@gmail.com | +91-9730746355"</li>
            </ul>
          </div>
        </div>

        {/* Admin Profile Settings */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Profile</h2>
              <p className="text-gray-600 text-sm">
                Update your display information (this doesn't change login credentials)
              </p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={adminProfile.displayName}
                onChange={(e) => setAdminProfile({ ...adminProfile, displayName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your display name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Email
              </label>
              <input
                type="email"
                value={adminProfile.email}
                onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter display email"
              />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-semibold text-blue-800 mb-2">ℹ️ Profile Information:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• This information is for display purposes only</li>
              <li>• Login credentials are managed separately in environment variables</li>
              <li>• Display name appears in the admin panel sidebar</li>
              <li>• Display email can be shown on contact pages if needed</li>
            </ul>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">CMS Version</h3>
                <p className="text-gray-600">Next.js 15 + TinyMCE CMS v1.0</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Framework</h3>
                <p className="text-gray-600">Next.js 15 with App Router</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Styling</h3>
                <p className="text-gray-600">Tailwind CSS</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Editor</h3>
                <p className="text-gray-600">TinyMCE Rich Text Editor</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Storage</h3>
                <p className="text-gray-600">In-Memory (Development)</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Authentication</h3>
                <p className="text-gray-600">Session-based</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
