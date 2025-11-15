'use client';

import { useState, useEffect } from 'react';
import { NagrikData, NagrikAccordion, NagrikItem } from '@/lib/storage';
import ImageUpload from '@/components/ImageUpload';
import PDFUpload from '@/components/PDFUpload';

export default function NagrikAdmin() {
  const [nagrikData, setNagrikData] = useState<NagrikData>({
    accordions: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchNagrikData();
  }, []);

  const fetchNagrikData = async () => {
    try {
      const response = await fetch('/api/nagrik');
      if (!response.ok) {
        throw new Error('Failed to fetch nagrik data');
      }
      const data = await response.json();
      setNagrikData(data.nagrik);
    } catch (error) {
      console.error('Error fetching nagrik data:', error);
      setMessage({ type: 'error', text: 'Failed to load nagrik data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/nagrik', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nagrik: nagrikData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save nagrik data');
      }

      setMessage({ type: 'success', text: 'नागरिक सेवा डेटा यशस्वीरित्या सेव्ह झाला!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving nagrik data:', error);
      setMessage({ type: 'error', text: 'Failed to save nagrik data' });
    } finally {
      setSaving(false);
    }
  };

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Accordion Management
  const updateAccordionTitle = (accordionId: string, title: string) => {
    setNagrikData(prev => ({
      ...prev,
      accordions: prev.accordions.map(accordion => 
        accordion.id === accordionId ? { ...accordion, title } : accordion
      )
    }));
  };

  // Item Management
  const addItem = (accordionId: string) => {
    const newItem: NagrikItem = {
      id: generateId(),
      label: '',
      type: 'pdf',
      url: ''
    };

    setNagrikData(prev => ({
      ...prev,
      accordions: prev.accordions.map(accordion => 
        accordion.id === accordionId 
          ? { ...accordion, items: [...accordion.items, newItem] }
          : accordion
      )
    }));
  };

  const removeItem = (accordionId: string, itemId: string) => {
    setNagrikData(prev => ({
      ...prev,
      accordions: prev.accordions.map(accordion => 
        accordion.id === accordionId 
          ? { ...accordion, items: accordion.items.filter(item => item.id !== itemId) }
          : accordion
      )
    }));
  };

  const updateItem = (accordionId: string, itemId: string, field: keyof NagrikItem, value: string) => {
    setNagrikData(prev => ({
      ...prev,
      accordions: prev.accordions.map(accordion => 
        accordion.id === accordionId 
          ? {
              ...accordion,
              items: accordion.items.map(item => 
                item.id === itemId ? { ...item, [field]: value } : item
              )
            }
          : accordion
      )
    }));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading nagrik editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">नागरिक सेवा व्यवस्थापन</h1>
        <p className="text-gray-600">
          Manage citizen service forms and links across four accordion sections.
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

      {/* Accordions Management */}
      <div className="space-y-8">
        {nagrikData.accordions.map((accordion, accordionIndex) => (
          <div key={accordion.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Accordion {accordionIndex + 1}: {accordion.title}
              </h2>
              
              {/* Accordion Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accordion Title
                </label>
                <input
                  type="text"
                  value={accordion.title}
                  onChange={(e) => updateAccordionTitle(accordion.id, e.target.value)}
                  placeholder="Enter accordion title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Items Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">
                  Items ({accordion.items.length})
                </h3>
                <button
                  onClick={() => addItem(accordion.id)}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  ➕ Add Item
                </button>
              </div>

              {accordion.items.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-gray-400 text-4xl mb-2">📄</div>
                  <p className="text-gray-600">No items added yet. Click "Add Item" to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {accordion.items.map((item, itemIndex) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-md font-medium text-gray-800">
                          Item {itemIndex + 1}
                        </h4>
                        <button
                          onClick={() => removeItem(accordion.id, item.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          🗑️ Remove
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Left Column - Basic Info */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Item Label
                            </label>
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => updateItem(accordion.id, item.id, 'label', e.target.value)}
                              placeholder="Enter item label"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Type
                            </label>
                            <select
                              value={item.type}
                              onChange={(e) => updateItem(accordion.id, item.id, 'type', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                              <option value="pdf">PDF File</option>
                              <option value="link">External Link</option>
                            </select>
                          </div>
                        </div>

                        {/* Right Column - URL/File */}
                        <div>
                          {item.type === 'pdf' ? (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                PDF File Upload
                              </label>
                              <PDFUpload
                                currentPDF={item.url}
                                onPDFChange={(url: string) => updateItem(accordion.id, item.id, 'url', url)}
                                label="Upload PDF file"
                                description="Upload PDF document for download"
                              />
                              
                              {item.url && (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-600 mb-1">Current file:</p>
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-800 underline text-sm"
                                  >
                                    View PDF
                                  </a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                External Link URL
                              </label>
                              <input
                                type="url"
                                value={item.url}
                                onChange={(e) => updateItem(accordion.id, item.id, 'url', e.target.value)}
                                placeholder="https://example.gov.in/portal"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                              
                              {item.url && (
                                <div className="mt-2">
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-800 underline text-sm"
                                  >
                                    Test Link →
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Nagrik Management Tips:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>PDF Files:</strong> Upload forms and documents that citizens can download</li>
          <li>• <strong>External Links:</strong> Link to government portals and online services</li>
          <li>• <strong>Item Labels:</strong> Use clear, descriptive Marathi text for better understanding</li>
          <li>• <strong>Organization:</strong> Group related items under appropriate accordion sections</li>
          <li>• <strong>Testing:</strong> Use "Test Link" and "View PDF" to verify your uploads work correctly</li>
        </ul>
      </div>
    </div>
  );
}
