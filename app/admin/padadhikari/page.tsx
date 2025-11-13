'use client';

import { useState, useEffect } from 'react';
import { PadadhikariData, PadadhikariMember } from '@/lib/storage';
import ImageUpload from '@/components/ImageUpload';

export default function PadadhikariAdmin() {
  const [padadhikariData, setPadadhikariData] = useState<PadadhikariData>({
    tab1: [],
    tab2: [],
    tab3: []
  });
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'tab3'>('tab1');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const tabLabels = {
    tab1: 'ग्रा. पं. कार्यकर्तीणी',
    tab2: 'ग्रा. पं. कर्मचारी',
    tab3: 'सर्व सदस्य'
  };

  useEffect(() => {
    fetchPadadhikariData();
  }, []);

  const fetchPadadhikariData = async () => {
    try {
      const response = await fetch('/api/padadhikari');
      if (!response.ok) {
        throw new Error('Failed to fetch padadhikari data');
      }
      const data = await response.json();
      setPadadhikariData(data.padadhikari);
    } catch (error) {
      console.error('Error fetching padadhikari data:', error);
      setMessage({ type: 'error', text: 'Failed to load padadhikari data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/padadhikari', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          padadhikari: padadhikariData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save padadhikari data');
      }

      setMessage({ type: 'success', text: 'पदाधिकारी डेटा यशस्वीरित्या सेव्ह झाला!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving padadhikari data:', error);
      setMessage({ type: 'error', text: 'Failed to save padadhikari data' });
    } finally {
      setSaving(false);
    }
  };

  // Generate unique ID for new members
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Add member to current tab
  const addMember = () => {
    const newMember: PadadhikariMember = {
      id: generateId(),
      image: '',
      name: '',
      role: '',
      active: true
    };

    setPadadhikariData(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newMember]
    }));
  };

  // Remove member from current tab
  const removeMember = (memberId: string) => {
    setPadadhikariData(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(member => member.id !== memberId)
    }));
  };

  // Update member in current tab
  const updateMember = (memberId: string, field: keyof PadadhikariMember, value: string | boolean) => {
    setPadadhikariData(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(member => 
        member.id === memberId ? { ...member, [field]: value } : member
      )
    }));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading padadhikari editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">पदाधिकारी व्यवस्थापन</h1>
        <p className="text-gray-600">
          Manage office bearers across different categories with images, names, and designations.
        </p>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Save Button */}
      <div className="mb-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              💾 Save All Changes
            </>
          )}
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {Object.entries(tabLabels).map(([tabKey, tabLabel]) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey as 'tab1' | 'tab2' | 'tab3')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === tabKey
                  ? 'bg-white text-green-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tabLabel}
              <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {padadhikariData[tabKey as keyof PadadhikariData].length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Tab Content */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {tabLabels[activeTab]} Management
          </h2>
          <p className="text-gray-600 text-sm">
            Add and manage members for the {tabLabels[activeTab]} category.
          </p>
        </div>

        {/* Members List */}
        <div className="space-y-6">
          {padadhikariData[activeTab].map((member, index) => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-800">
                  Member {index + 1}
                  {!member.active && (
                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      Inactive
                    </span>
                  )}
                </h4>
                <button
                  onClick={() => removeMember(member.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  🗑️ Remove
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Photo
                  </label>
                  <ImageUpload
                    currentImage={member.image}
                    onImageChange={(url: string) => updateMember(member.id, 'image', url)}
                    label="Upload member photo"
                    description="Choose a photo file or enter a URL"
                  />
                  
                  {member.image && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={member.image}
                        alt={member.name || 'Member'}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                {/* Right Column - Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name (Marathi)
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                      placeholder="श्रीमती इंदुबाई राऊत"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation/Role (Marathi)
                    </label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => updateMember(member.id, 'role', e.target.value)}
                      placeholder="सरपंच"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={member.active}
                        onChange={(e) => updateMember(member.id, 'active', e.target.checked)}
                        className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active Member</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Inactive members won't be displayed on the frontend
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Member Button */}
          <button
            onClick={addMember}
            className="w-full py-4 px-6 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors duration-200 font-medium"
          >
            ➕ Add New Member to {tabLabels[activeTab]}
          </button>
        </div>

        {/* Empty State */}
        {padadhikariData[activeTab].length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members yet</h3>
            <p className="text-gray-600 mb-4">
              Add your first member to the {tabLabels[activeTab]} category.
            </p>
            <button
              onClick={addMember}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Add First Member
            </button>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Padadhikari Management Tips:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Tab 1 (ग्रा. पं. कार्यकर्तीणी):</strong> Main panchayat officials like Sarpanch, Secretary</li>
          <li>• <strong>Tab 2 (ग्रा. पं. कर्मचारी):</strong> Staff members like Clerk, Accountant</li>
          <li>• <strong>Tab 3 (सर्व सदस्य):</strong> All other members and representatives</li>
          <li>• Use high-quality square or portrait images for best results</li>
          <li>• Inactive members won't appear on the public website</li>
          <li>• Names and roles should be in Marathi for consistency</li>
        </ul>
      </div>
    </div>
  );
}
