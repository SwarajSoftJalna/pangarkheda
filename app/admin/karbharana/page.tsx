'use client';

import { useState, useEffect } from 'react';
import { KarbharanaData, TaxReport, PaymentAccordion } from '@/lib/storage';
import ImageUpload from '@/components/ImageUpload';

export default function KarbharanaAdmin() {
  const [karbharanaData, setKarbharanaData] = useState<KarbharanaData>({
    taxReports: [],
    accordions: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchKarbharanaData();
  }, []);

  const fetchKarbharanaData = async () => {
    try {
      const response = await fetch('/api/karbharana');
      if (!response.ok) {
        throw new Error('Failed to fetch karbharana data');
      }
      const data = await response.json();
      setKarbharanaData(data.karbharana);
    } catch (error) {
      console.error('Error fetching karbharana data:', error);
      setMessage({ type: 'error', text: 'Failed to load karbharana data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/karbharana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          karbharana: karbharanaData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save karbharana data');
      }

      setMessage({ type: 'success', text: 'करभारणा डेटा यशस्वीरित्या सेव्ह झाला!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving karbharana data:', error);
      setMessage({ type: 'error', text: 'Failed to save karbharana data' });
    } finally {
      setSaving(false);
    }
  };

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Tax Reports Management
  const addTaxReport = () => {
    const newReport: TaxReport = {
      id: generateId(),
      year: '',
      title: 'कर वसूली अहवाल',
      table: {
        columns: ['मागील वर्ष येणे बाकी', 'मागणी', 'वसूली'],
        subColumns: [
          ['घरपट्टी', 'पाणीपट्टी'],
          ['घरपट्टी', 'पाणीपट्टी'],
          ['घरपट्टी', 'पाणीपट्टी']
        ],
        rows: [
          {
            'घरपट्टी_बाकी': 0,
            'पाणीपट्टी_बाकी': 0,
            'घरपट्टी_मागणी': 0,
            'पाणीपट्टी_मागणी': 0,
            'घरपट्टी_वसूली': 0,
            'पाणीपट्टी_वसूली': 0
          }
        ]
      },
      updatedAt: new Date().toLocaleString('mr-IN', { 
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
    };

    setKarbharanaData(prev => ({
      ...prev,
      taxReports: [...prev.taxReports, newReport]
    }));
  };

  const removeTaxReport = (reportId: string) => {
    setKarbharanaData(prev => ({
      ...prev,
      taxReports: prev.taxReports.filter(report => report.id !== reportId)
    }));
  };

  const updateTaxReport = (reportId: string, field: keyof TaxReport, value: any) => {
    setKarbharanaData(prev => ({
      ...prev,
      taxReports: prev.taxReports.map(report => 
        report.id === reportId ? { ...report, [field]: value } : report
      )
    }));
  };

  const updateTableValue = (reportId: string, rowIndex: number, field: string, value: number) => {
    setKarbharanaData(prev => ({
      ...prev,
      taxReports: prev.taxReports.map(report => 
        report.id === reportId ? {
          ...report,
          table: {
            ...report.table,
            rows: report.table.rows.map((row, index) => 
              index === rowIndex ? { ...row, [field]: value } : row
            )
          }
        } : report
      )
    }));
  };

  // Accordion Management
  const updateAccordion = (accordionId: string, field: keyof PaymentAccordion, value: string) => {
    setKarbharanaData(prev => ({
      ...prev,
      accordions: prev.accordions.map(accordion => 
        accordion.id === accordionId ? { ...accordion, [field]: value } : accordion
      )
    }));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading karbharana editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">करभारणा अहवाल व्यवस्थापन</h1>
        <p className="text-gray-600">
          Manage tax collection reports and payment accordions for the karbharana page.
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

      {/* Tax Reports Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">कर वसूली अहवाल (Tax Reports)</h2>
          <p className="text-gray-600 text-sm">
            Manage year-wise tax collection reports with tabular data.
          </p>
        </div>

        <div className="space-y-6">
          {karbharanaData.taxReports.map((report, index) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-800">
                  Tax Report {index + 1}
                </h4>
                <button
                  onClick={() => removeTaxReport(report.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  🗑️ Remove
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year (e.g., 2023-24)
                    </label>
                    <input
                      type="text"
                      value={report.year}
                      onChange={(e) => updateTaxReport(report.id, 'year', e.target.value)}
                      placeholder="2023-24"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Title
                    </label>
                    <input
                      type="text"
                      value={report.title}
                      onChange={(e) => updateTaxReport(report.id, 'title', e.target.value)}
                      placeholder="कर वसूली अहवाल"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Right Column - Table Data */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Collection Data
                  </label>
                  <div className="bg-white border border-gray-200 rounded-md p-4">
                    <div className="grid grid-cols-6 gap-2 text-xs">
                      <div className="font-medium text-center">घरपट्टी बाकी</div>
                      <div className="font-medium text-center">पाणीपट्टी बाकी</div>
                      <div className="font-medium text-center">घरपट्टी मागणी</div>
                      <div className="font-medium text-center">पाणीपट्टी मागणी</div>
                      <div className="font-medium text-center">घरपट्टी वसूली</div>
                      <div className="font-medium text-center">पाणीपट्टी वसूली</div>
                      
                      {report.table.rows.map((row, rowIndex) => (
                        <>
                          <input
                            key={`${report.id}-${rowIndex}-gharpatty_baki`}
                            type="number"
                            value={row['घरपट्टी_बाकी'] || 0}
                            onChange={(e) => updateTableValue(report.id, rowIndex, 'घरपट्टी_बाकी', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded text-center"
                          />
                          <input
                            key={`${report.id}-${rowIndex}-panipatty_baki`}
                            type="number"
                            value={row['पाणीपट्टी_बाकी'] || 0}
                            onChange={(e) => updateTableValue(report.id, rowIndex, 'पाणीपट्टी_बाकी', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded text-center"
                          />
                          <input
                            key={`${report.id}-${rowIndex}-gharpatty_magni`}
                            type="number"
                            value={row['घरपट्टी_मागणी'] || 0}
                            onChange={(e) => updateTableValue(report.id, rowIndex, 'घरपट्टी_मागणी', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded text-center"
                          />
                          <input
                            key={`${report.id}-${rowIndex}-panipatty_magni`}
                            type="number"
                            value={row['पाणीपट्टी_मागणी'] || 0}
                            onChange={(e) => updateTableValue(report.id, rowIndex, 'पाणीपट्टी_मागणी', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded text-center"
                          />
                          <input
                            key={`${report.id}-${rowIndex}-gharpatty_vasuli`}
                            type="number"
                            value={row['घरपट्टी_वसूली'] || 0}
                            onChange={(e) => updateTableValue(report.id, rowIndex, 'घरपट्टी_वसूली', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded text-center"
                          />
                          <input
                            key={`${report.id}-${rowIndex}-panipatty_vasuli`}
                            type="number"
                            value={row['पाणीपट्टी_वसूली'] || 0}
                            onChange={(e) => updateTableValue(report.id, rowIndex, 'पाणीपट्टी_वसूली', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded text-center"
                          />
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Tax Report Button */}
          <button
            onClick={addTaxReport}
            className="w-full py-4 px-6 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors duration-200 font-medium"
          >
            ➕ Add New Tax Report
          </button>
        </div>
      </div>

      {/* Payment Accordions Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Accordions</h2>
          <p className="text-gray-600 text-sm">
            Manage images for घरपट्टी and पाणीपट्टी payment accordions.
          </p>
        </div>

        <div className="space-y-6">
          {karbharanaData.accordions.map((accordion, index) => (
            <div key={accordion.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-800">
                  {accordion.title}
                </h4>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accordion Title
                  </label>
                  <input
                    type="text"
                    value={accordion.title}
                    onChange={(e) => updateAccordion(accordion.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Right Column - Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Image/QR Code
                  </label>
                  <ImageUpload
                    currentImage={accordion.image}
                    onImageChange={(url: string) => updateAccordion(accordion.id, 'image', url)}
                    label="Upload payment image"
                    description="Upload QR code or payment instructions"
                  />
                  
                  {accordion.image && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={accordion.image}
                        alt={accordion.title}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Karbharana Management Tips:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Tax Reports:</strong> Add separate reports for each financial year</li>
          <li>• <strong>Table Data:</strong> Enter amounts in rupees for each category</li>
          <li>• <strong>Payment Images:</strong> Upload QR codes or payment instruction images</li>
          <li>• <strong>Timestamps:</strong> Updated dates are automatically set when saving</li>
          <li>• <strong>Accordions:</strong> Users can click to expand and view payment images</li>
        </ul>
      </div>
    </div>
  );
}
