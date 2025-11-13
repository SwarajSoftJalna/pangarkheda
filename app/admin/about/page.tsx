'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import of EditorClient with no SSR
const EditorClient = dynamic(() => import('@/components/EditorClient'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading editor...</div>
    </div>
  ),
});

export default function AboutAdmin() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
      setContent(data.about || '');
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage({ type: 'error', text: 'Failed to load content' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: 'about',
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      setMessage({ type: 'success', text: 'About section saved successfully!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage({ type: 'error', text: 'Failed to save content' });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Section Management</h1>
          <p className="text-gray-600 mt-1">
            Manage the about section content that appears on your homepage
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePreview}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            👁️ Preview Site
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? '💾 Saving...' : '💾 Save Changes'}
          </button>
        </div>
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

      {/* Editor */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">About Section Content Editor</h2>
          <p className="text-gray-600 text-sm">
            Create and edit the about section content. This section appears between the banner and main content on your homepage.
            You can include information about officials, village details, statistics, and other important information.
          </p>
        </div>
        
        <EditorClient
          value={content}
          onEditorChange={(newContent) => setContent(newContent || '')}
          placeholder="Enter about section content here..."
          height={500}
        />
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">💡 About Section Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Include information about village officials and their roles</li>
            <li>• Add village statistics like population, demographics, etc.</li>
            <li>• Mention key facilities and services available</li>
            <li>• Use headings to organize different sections of information</li>
            <li>• Keep the content informative and easy to read</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
