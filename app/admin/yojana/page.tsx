'use client';

import { useState, useEffect } from 'react';
import { YojanaData } from '@/lib/storage';
import PDFUpload from '@/components/PDFUpload';
import EditorClient from '@/components/EditorClient';

export default function YojanaPage() {
  const [yojanaData, setYojanaData] = useState<YojanaData>({
    pradhanMantriAawas: {
      id: '1',
      heading: 'प्रधानमंत्री आवास योजना',
      pdfUrl: '',
      content: '<p>प्रधानमंत्री आवास योजना ही भारत सरकारची एक महत्त्वाची योजना आहे. या योजनेअंतर्गत गरीब कुटुंबांना स्वस्त दरात घरे बांधण्यासाठी मदत मिळते.</p>'
    },
    financeCommission: {
      id: '2',
      heading: '१५ वित्त आयोग',
      pdfUrl: '',
      content: '<p>१५ वित्त आयोगाच्या शिफारशीनुसार ग्रामपंचायतींना मिळणारे अनुदान आणि वित्तीय साहाय्याबद्दल माहिती.</p>'
    },
    mgnrega: {
      id: '3',
      heading: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना',
      pdfUrl: '',
      content: '<p>महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजनेबद्दल माहिती.</p>'
    },
    scheduledCastesNeoBuddhist: {
      id: '4',
      heading: 'अनुसूचीत जाती व नवबौध्द विकास',
      pdfUrl: '',
      content: '<p>अनुसूचीत जाती व नवबौध्द विकास योजनेबद्दल माहिती.</p>'
    },
    ramaiAwas: {
      id: '5',
      heading: 'รमाई आवास योजना',
      pdfUrl: '',
      content: '<p>रमाई आवास योजनेबद्दल माहिती.</p>'
    },
    shabariAdivasiGharkul: {
      id: '6',
      heading: 'शबरी आदिवासी घरकुल योजना',
      pdfUrl: '',
      content: '<p>शबरी आदिवासी घरकुल योजनेबद्दल माहिती.</p>'
    },
    modiAwas: {
      id: '7',
      heading: 'मोदी आवास योजना',
      pdfUrl: '',
      content: '<p>मोदी आवास योजनेबद्दल माहिती.</p>'
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchYojanaData();
  }, []);

  const fetchYojanaData = async () => {
    try {
      const response = await fetch('/api/yojana');
      if (!response.ok) {
        throw new Error('Failed to fetch yojana data');
      }
      const data = await response.json();
      setYojanaData(data.yojana);
    } catch (error) {
      console.error('Error fetching yojana data:', error);
      showMessage('योजना डेटा मिळवण्यात त्रुटी', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveYojanaData = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/yojana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ yojana: yojanaData }),
      });

      if (!response.ok) {
        throw new Error('Failed to save yojana data');
      }

      showMessage('योजना डेटा यशस्वीरित्या जतन केला!', 'success');
    } catch (error) {
      console.error('Error saving yojana data:', error);
      showMessage('योजना डेटा जतन करण्यात त्रुटी', 'error');
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleHeadingChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      pradhanMantriAawas: {
        ...prev.pradhanMantriAawas,
        heading: value
      }
    }));
  };

  const handlePdfUrlChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      pradhanMantriAawas: {
        ...prev.pradhanMantriAawas,
        pdfUrl: value
      }
    }));
  };

  const handleContentChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      pradhanMantriAawas: {
        ...prev.pradhanMantriAawas,
        content: value
      }
    }));
  };

  const handleFinanceHeadingChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      financeCommission: {
        ...prev.financeCommission,
        heading: value
      }
    }));
  };

  const handleFinanceContentChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      financeCommission: {
        ...prev.financeCommission,
        content: value
      }
    }));
  };

  const handleMgnregaHeadingChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      mgnrega: {
        ...prev.mgnrega,
        heading: value
      }
    }));
  };

  const handleMgnregaContentChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      mgnrega: {
        ...prev.mgnrega,
        content: value
      }
    }));
  };

  const handleSCNBHeadingChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      scheduledCastesNeoBuddhist: {
        ...prev.scheduledCastesNeoBuddhist,
        heading: value
      }
    }));
  };

  const handleSCNBContentChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      scheduledCastesNeoBuddhist: {
        ...prev.scheduledCastesNeoBuddhist,
        content: value
      }
    }));
  };

  const handleRamaiHeadingChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      ramaiAwas: {
        ...prev.ramaiAwas,
        heading: value
      }
    }));
  };

  const handleRamaiContentChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      ramaiAwas: {
        ...prev.ramaiAwas,
        content: value
      }
    }));
  };

  const handleShabariHeadingChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      shabariAdivasiGharkul: {
        ...prev.shabariAdivasiGharkul,
        heading: value
      }
    }));
  };

  const handleShabariContentChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      shabariAdivasiGharkul: {
        ...prev.shabariAdivasiGharkul,
        content: value
      }
    }));
  };

  const handleModiHeadingChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      modiAwas: {
        ...prev.modiAwas,
        heading: value
      }
    }));
  };

  const handleModiContentChange = (value: string) => {
    setYojanaData(prev => ({
      ...prev,
      modiAwas: {
        ...prev.modiAwas,
        content: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">लोड होत आहे...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">योजना व्यवस्थापन</h1>

          {/* Action Buttons (moved to top) */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-600">
                <strong>टीप:</strong> प्रधानमंत्री आवास योजना बद्दलची संपूर्ण माहिती येथे व्यवस्थापित करा.
              </p>
            </div>
            <div className="space-x-4">
              <button
                onClick={fetchYojanaData}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                रीसेट करा
              </button>
              <button
                onClick={saveYojanaData}
                disabled={saving}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'जतन होत आहे...' : 'जतन करा'}
              </button>
            </div>
          </div>

          {/* Pradhan Mantri Aawas Yojana Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-600">
              प्रधानमंत्री आवास योजना
            </h2>

            <div className="space-y-6">
              {/* Heading Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  शीर्षक
                </label>
                <input
                  type="text"
                  value={yojanaData.pradhanMantriAawas.heading}
                  onChange={(e) => handleHeadingChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="योजनेचे शीर्षक प्रविष्ट करा"
                />
              </div>

              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF फाइल
                </label>
                <PDFUpload
                  currentPDF={yojanaData.pradhanMantriAawas.pdfUrl}
                  onPDFChange={handlePdfUrlChange}
                  label="PDF फाइल अपलोड करा किंवा URL लिहा"
                  description="प्रधानमंत्री आवास योजनेबद्दलची PDF फाइल अपलोड करा"
                />
              </div>

              {/* Rich Text Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मजकूर
                </label>
                <EditorClient
                  value={yojanaData.pradhanMantriAawas.content}
                  onEditorChange={handleContentChange}
                  placeholder="योजनेबद्दलची माहिती येथे लिहा"
                  height={300}
                />
                
              </div>
            </div>
          </div>

          
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              message.includes('यशस्वी') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* 15 वित्त आयोग */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-600">
            १५ वित्त आयोग
          </h2>
          
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शीर्षक
              </label>
              <input
                type="text"
                value={yojanaData.financeCommission.heading}
                onChange={(e) => handleFinanceHeadingChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="१५ वित्त आयोगाचा शीर्षक प्रविष्ट करा"
              />
            </div>

            {/* Rich Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मजकूर
              </label>
              <EditorClient
                value={yojanaData.financeCommission.content}
                onEditorChange={handleFinanceContentChange}
                placeholder="१५ वित्त आयोगाबद्दल माहिती येथे लिहा"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 मदत आणि मार्गदर्शन</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• <strong>शीर्षक:</strong> प्रधानमंत्री आवास योजनेचे औपचारिक शीर्षक प्रविष्ट करा.</p>
            <p>• <strong>PDF फाइल:</strong> योजनेबद्दलची अधिकृत PDF फाइल अपलोड करा किंवा URL लिहा.</p>
            <p>• <strong>मजकूर:</strong> योजनेबद्दलची संपूर्ण माहिती, फायदे, पात्रता इत्यादी येथे लिहा.</p>
            <p>• <strong>जतन करा:</strong> बदल केल्यावर 'जतन करा' बटणावर क्लिक करून डेटा सेव्ह करा.</p>
          </div>
        </div>

        {/* महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-600">
            महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना
          </h2>

          <div className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शीर्षक
              </label>
              <input
                type="text"
                value={yojanaData.mgnrega?.heading}
                onChange={(e) => handleMgnregaHeadingChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजनेचा शीर्षक प्रविष्ट करा"
              />
            </div>

            {/* Rich Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मजकूर
              </label>
              <EditorClient
                value={yojanaData.mgnrega?.content}
                onEditorChange={handleMgnregaContentChange}
                placeholder="महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजनेबद्दल माहिती येथे लिहा"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* अनुसूचीत जाती व नवबौध्द विकास */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-600">
            अनुसूचीत जाती व नवबौध्द विकास
          </h2>

          <div className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शीर्षक
              </label>
              <input
                type="text"
                value={yojanaData.scheduledCastesNeoBuddhist?.heading}
                onChange={(e) => handleSCNBHeadingChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="अनुसूचीत जाती व नवबौध्द विकासाचा शीर्षक प्रविष्ट करा"
              />
            </div>

            {/* Rich Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मजकूर
              </label>
              <EditorClient
                value={yojanaData.scheduledCastesNeoBuddhist?.content}
                onEditorChange={handleSCNBContentChange}
                placeholder="अनुसूचीत जाती व नवबौध्द विकासाबद्दल माहिती येथे लिहा"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* रमाई आवास योजना */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-600">
            रमाई आवास योजना
          </h2>

          <div className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शीर्षक
              </label>
              <input
                type="text"
                value={yojanaData.ramaiAwas?.heading}
                onChange={(e) => handleRamaiHeadingChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="रमाई आवास योजनेचा शीर्षक प्रविष्ट करा"
              />
            </div>

            {/* Rich Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मजकूर
              </label>
              <EditorClient
                value={yojanaData.ramaiAwas?.content}
                onEditorChange={handleRamaiContentChange}
                placeholder="रमाई आवास योजनेबद्दल माहिती येथे लिहा"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* शबरी आदिवासी घरकुल योजना */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-600">
            शबरी आदिवासी घरकुल योजना
          </h2>

          <div className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शीर्षक
              </label>
              <input
                type="text"
                value={yojanaData.shabariAdivasiGharkul?.heading}
                onChange={(e) => handleShabariHeadingChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="शबरी आदिवासी घरकुल योजनेचा शीर्षक प्रविष्ट करा"
              />
            </div>

            {/* Rich Text Content */}
            <div>
              <label className="block text.sm font-medium text-gray-700 mb-2">
                मजकूर
              </label>
              <EditorClient
                value={yojanaData.shabariAdivasiGharkul?.content}
                onEditorChange={handleShabariContentChange}
                placeholder="शबरी आदिवासी घरकुल योजनेबद्दल माहिती येथे लिहा"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* मोदी आवास योजना */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-600">
            मोदी आवास योजना
          </h2>

          <div className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शीर्षक
              </label>
              <input
                type="text"
                value={yojanaData.modiAwas?.heading}
                onChange={(e) => handleModiHeadingChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="मोदी आवास योजनेचा शीर्षक प्रविष्ट करा"
              />
            </div>

            {/* Rich Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मजकूर
              </label>
              <EditorClient
                value={yojanaData.modiAwas?.content}
                onEditorChange={handleModiContentChange}
                placeholder="मोदी आवास योजनेबद्दल माहिती येथे लिहा"
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
