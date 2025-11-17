'use client';

import { useEffect, useState } from 'react';
import PreHeader from '@/components/PreHeader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ContentData } from '@/lib/storage';
import GovtLogos from '@/components/GovtLogos';

interface YojanaSection {
  id: string;
  heading: string;
  pdfUrl: string;
  content: string;
}

export default function RamaiAwasYojanaPage() {
  const [section, setSection] = useState<YojanaSection | null>(null);
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yojanaRes = await fetch('/api/yojana');
        if (!yojanaRes.ok) throw new Error('Failed to fetch yojana data');
        const yojanaJson = await yojanaRes.json();
        setSection(yojanaJson.yojana.ramaiAwas);

        const contentRes = await fetch('/api/content');
        if (!contentRes.ok) throw new Error('Failed to fetch content data');
        const contentJson: ContentData = await contentRes.json();
        setContentData(contentJson);
      } catch (e) {
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PreHeader content={contentData?.preheader || ''} />
        <Header 
          menuItems={contentData?.header || []}
          headerTitle={contentData?.headerTitle || ''}
          headerSubtitle={contentData?.headerSubtitle || ''}
        />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">लोड होत आहे...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PreHeader content={contentData?.preheader || ''} />
        <Header 
          menuItems={contentData?.header || []}
          headerTitle={contentData?.headerTitle || ''}
          headerSubtitle={contentData?.headerSubtitle || ''}
        />
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">डेटा उपलब्ध नाही</h1>
            <p className="text-gray-600">रमाई आवास योजनेची माहिती उपलब्ध नाही.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PreHeader content={contentData?.preheader || ''} />
      <Header 
        menuItems={contentData?.header || []}
        headerTitle={contentData?.headerTitle || ''}
        headerSubtitle={contentData?.headerSubtitle || ''}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {section.heading}
            </h1>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div 
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />

            {section.pdfUrl && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-4">
                  📄 अधिकृत दस्तऐवज
                </h3>
                <a
                  href={section.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF डाउनलोड करा
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
      <GovtLogos />
      <Footer />
    </div>
  );
}
