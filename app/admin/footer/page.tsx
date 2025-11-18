'use client';

import { useState, useEffect } from 'react';
import { FooterData, FooterLink } from '@/lib/storage';

export default function FooterAdmin() {
  const [footerData, setFooterData] = useState<FooterData>({
    column1: [],
    column2: [],
    social: {
      instagram: '',
      twitter: '',
      facebook: '',
      youtube: ''
    },
    address: {
      lines: '',
      phone: '',
      mapLink: '',
      code: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch('/api/footer');
      if (!response.ok) {
        throw new Error('Failed to fetch footer data');
      }
      const data = await response.json();
      setFooterData(data.footer);
    } catch (error) {
      console.error('Error fetching footer data:', error);
      setMessage({ type: 'error', text: 'Failed to load footer data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/footer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          footer: footerData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save footer data');
      }

      setMessage({ type: 'success', text: 'Footer data saved successfully!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving footer data:', error);
      setMessage({ type: 'error', text: 'Failed to save footer data' });
    } finally {
      setSaving(false);
    }
  };

  // Column 1 management functions
  const addColumn1Link = () => {
    setFooterData(prev => ({
      ...prev,
      column1: [...prev.column1, { label: '', url: '' }]
    }));
  };

  const removeColumn1Link = (index: number) => {
    setFooterData(prev => ({
      ...prev,
      column1: prev.column1.filter((_, i) => i !== index)
    }));
  };

  const updateColumn1Link = (index: number, field: keyof FooterLink, value: string) => {
    setFooterData(prev => ({
      ...prev,
      column1: prev.column1.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  // Column 2 management functions
  const addColumn2Link = () => {
    setFooterData(prev => ({
      ...prev,
      column2: [...prev.column2, { label: '', url: '' }]
    }));
  };

  const removeColumn2Link = (index: number) => {
    setFooterData(prev => ({
      ...prev,
      column2: prev.column2.filter((_, i) => i !== index)
    }));
  };

  const updateColumn2Link = (index: number, field: keyof FooterLink, value: string) => {
    setFooterData(prev => ({
      ...prev,
      column2: prev.column2.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  // Social media management
  const updateSocial = (platform: keyof typeof footerData.social, url: string) => {
    setFooterData(prev => ({
      ...prev,
      social: { ...prev.social, [platform]: url }
    }));
  };

  // Address management
  const updateAddress = (field: keyof typeof footerData.address, value: string) => {
    setFooterData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading footer editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Footer Management</h1>
        <p className="text-gray-600">
          Manage footer content including important links, social media, and contact information.
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
              💾 Save Footer Data
            </>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Column 1 - Important Links (Left) */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">महत्त्वाच्या लिंक (Left Column)</h2>
            <p className="text-gray-600 text-sm">
              Add important links for the left column of the footer.
            </p>
          </div>
          
          <div className="space-y-4">
            {footerData.column1.map((link, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-800">Link {index + 1}</h4>
                  <button
                    onClick={() => removeColumn1Link(index)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    🗑️ Remove
                  </button>
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link Label (Marathi)
                    </label>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => updateColumn1Link(index, 'label', e.target.value)}
                      placeholder="शासन निर्णय"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL
                    </label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateColumn1Link(index, 'url', e.target.value)}
                      placeholder="/decision or https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={addColumn1Link}
              className="w-full py-3 px-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors duration-200 font-medium"
            >
              ➕ Add Link
            </button>
          </div>
        </div>

        {/* Column 2 - Important Links (Right) */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">महत्त्वाच्या लिंक (Right Column)</h2>
            <p className="text-gray-600 text-sm">
              Add important links for the right column of the footer.
            </p>
          </div>
          
          <div className="space-y-4">
            {footerData.column2.map((link, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-800">Link {index + 1}</h4>
                  <button
                    onClick={() => removeColumn2Link(index)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    🗑️ Remove
                  </button>
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link Label (Marathi)
                    </label>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => updateColumn2Link(index, 'label', e.target.value)}
                      placeholder="मतदार यादीत नाव शोधण्यासाठी"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL
                    </label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateColumn2Link(index, 'url', e.target.value)}
                      placeholder="https://votersearch.in"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={addColumn2Link}
              className="w-full py-3 px-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors duration-200 font-medium"
            >
              ➕ Add Link
            </button>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">सोशल मीडिया (Social Media)</h2>
            <p className="text-gray-600 text-sm">
              Add social media profile links. Leave empty to hide icons.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📷 Instagram URL
              </label>
              <input
                type="url"
                value={footerData.social.instagram}
                onChange={(e) => updateSocial('instagram', e.target.value)}
                placeholder="https://instagram.com/your_profile"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🐦 Twitter/X URL
              </label>
              <input
                type="url"
                value={footerData.social.twitter}
                onChange={(e) => updateSocial('twitter', e.target.value)}
                placeholder="https://twitter.com/your_profile"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📘 Facebook URL
              </label>
              <input
                type="url"
                value={footerData.social.facebook}
                onChange={(e) => updateSocial('facebook', e.target.value)}
                placeholder="https://facebook.com/your_page"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📺 YouTube URL
              </label>
              <input
                type="url"
                value={footerData.social.youtube}
                onChange={(e) => updateSocial('youtube', e.target.value)}
                placeholder="https://youtube.com/your_channel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">पत्ता (Address)</h2>
            <p className="text-gray-600 text-sm">
              Add contact information and address details.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Lines (Marathi)
              </label>
              <textarea
                value={footerData.address.lines}
                onChange={(e) => updateAddress('lines', e.target.value)}
                placeholder="यू. पो. पांगरखेडा, ता: जालना, जि: जालना, पिन: 423401"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={footerData.address.phone}
                onChange={(e) => updateAddress('phone', e.target.value)}
                placeholder="+91-9730746355"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps Link
              </label>
              <input
                type="url"
                value={footerData.address.mapLink}
                onChange={(e) => updateAddress('mapLink', e.target.value)}
                placeholder="https://maps.google.com/?q=Savargaon+Hadap"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panchayat Code
              </label>
              <input
                type="text"
                value={footerData.address.code}
                onChange={(e) => updateAddress('code', e.target.value)}
                placeholder="037784"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Footer Management Tips:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use internal links (starting with /) for pages within your site</li>
          <li>• Use full URLs (https://...) for external websites</li>
          <li>• Social media icons will only show if URLs are provided</li>
          <li>• Address information supports multi-line text</li>
          <li>• All changes are saved immediately when you click Save</li>
        </ul>
      </div>
    </div>
  );
}
