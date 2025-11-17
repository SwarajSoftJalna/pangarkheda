import { Suspense } from 'react';
import { YojanaData, ContentData } from '@/lib/storage';
import PreHeader from '@/components/PreHeader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

async function getYojanaData(): Promise<YojanaData> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'https://grampanchayatmanepuri.in'
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/yojana`, {
      cache: 'no-store', // Always fetch fresh content
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch yojana data');
    }
    
    const data = await response.json();
    return data.yojana;
  } catch (error) {
    console.error('Error fetching yojana data:', error);
    // Return default empty data if fetch fails
    return {
      pradhanMantriAawas: {
        id: '1',
        heading: 'प्रधानमंत्री आवास योजना',
        pdfUrl: '',
        content: '<p>सद्या उपलब्ध नाही.</p>'
      },
      financeCommission: {
        id: '2',
        heading: '१५ वित्त आयोग',
        pdfUrl: '',
        content: '<p>सद्या उपलब्ध नाही.</p>'
      },
      mgnrega: {
        id: '3',
        heading: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना',
        pdfUrl: '',
        content: '<p>सद्या उपलब्ध नाही.</p>'
      },
      scheduledCastesNeoBuddhist: {
        id: '4',
        heading: 'अनुसूचीत जाती व नवबौध्द विकास',
        pdfUrl: '',
        content: '<p>सद्या उपलब्ध नाही.</p>'
      },
      ramaiAwas: {
        id: '5',
        heading: 'रमाई आवास योजना',
        pdfUrl: '',
        content: '<p>सद्या उपलब्ध नाही.</p>'
      },
      shabariAdivasiGharkul: {
        id: '6',
        heading: 'शबरी आदिवासी घरकुल योजना',
        pdfUrl: '',
        content: '<p>सद्या उपलब्ध नाही.</p>'
      },
      modiAwas: {
        id: '7',
        heading: 'मोदी आवास योजना',
        pdfUrl: '',
        content: '<p>सद्या उपलब्ध नाही.</p>'
      }
    };
  }
}

async function getContentData(): Promise<ContentData> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'https://grampanchayatmanepuri.in'
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/content`, {
      cache: 'no-store', // Always fetch fresh content
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch content data');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching content data:', error);
    // Return fallback content if fetch fails
    return {
      preheader: '<p>ग्रामपंचायत मानेपुरी, जालना</p>',
      header: [
        { id: '1', title: 'होम', url: '/' },
        { id: '2', title: 'प्रधानमंत्री आवास योजना', url: '/pradhanmantri-aawas-yojana' }
      ],
      headerTitle: 'ग्रामपंचायत मानेपुरी',
      headerSubtitle: 'जालना, महाराष्ट्र',
      bannerImage: '',
      about: '',
      yashodatha: '',
      homepage: '',
      administrativeStructureHeading: '',
      administrativeStructureImage: '',
      administrativeStructureMembers: [],
      officeBearers: [],
      ctaSection: {
        heading: '',
        subheading: '',
        phone: '',
        images: []
      },
      populationStats: {
        mainHeading: '',
        items: []
      },
      govtLogos: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <div className="h-8 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse"></div>
          <div className="h-1 w-14 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="h-8 bg-gray-200 rounded-lg w-96 mb-6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-full mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-5/6 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-4/6 mb-6 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

function YojanaSection({ yojanaData }: { yojanaData: YojanaData }) {
  const { pradhanMantriAawas } = yojanaData;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {pradhanMantriAawas.heading}
          </h1>
          <div className="h-1 w-16 bg-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ग्रामपंचायत मानेपुरी, जालना - सरकारी योजना माहिती
          </p>
        </div>

        {/* Yojana Content Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            {/* PDF Download Section */}
            {pradhanMantriAawas.pdfUrl && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      📄 अधिकृत PDF डाउनलोड करा
                    </h3>
                    <p className="text-sm text-green-700">
                      प्रधानमंत्री आवास योजनेबद्दलची अधिकृत माहिती आणि अर्ज
                    </p>
                  </div>
                  <a
                    href={pradhanMantriAawas.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    PDF डाउनलोड करा
                  </a>
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: pradhanMantriAawas.content }}
              />
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    ℹ️ महत्त्वाची माहिती
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• ही योजना ग्रामीण भागातील गरीब कुटुंबांसाठी आहे</li>
                    <li>• योजनेअंतर्गत आर्थिक मदत मिळते</li>
                    <li>• पात्रतेसाठी आवश्यक कागदपत्रे लागतात</li>
                    <li>• अर्ज ग्रामपंचायत कार्यालयात सादर करावा</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                    📞 संपर्क माहिती
                  </h3>
                  <div className="space-y-2 text-sm text-yellow-800">
                    <p><strong>ग्रामपंचायत कार्यालय:</strong> मानेपुरी</p>
                    <p><strong>जिल्हा:</strong> जालना, महाराष्ट्र</p>
                    <p><strong>फोन:</strong> ग्रामपंचायत कार्यालयाशी संपर्क साधा</p>
                    <p><strong>कार्यालय वेळ:</strong> सकाळी १०:०० ते सायंकाळी ६:००</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            अधिक माहितीसाठी
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">अर्ज प्रक्रिया</h3>
              <p className="text-sm text-gray-600">
                योजनेसाठी अर्ज कसा करावा आणि कोणती कागदपत्रे लागतील
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">आर्थिक मदत</h3>
              <p className="text-sm text-gray-600">
                योजनेअंतर्गत मिळणारी आर्थिक मदत आणि त्याचे वितरण
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">पात्रता</h3>
              <p className="text-sm text-gray-600">
                योजनेसाठी पात्र असण्याच्या अटी आणि निकष
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function PradhanMantriAawasYojanaPage() {
  const yojanaData = await getYojanaData();
  const contentData = await getContentData();

  return (
    <>
      <PreHeader content={contentData.preheader} />
      <Header 
        menuItems={contentData.header} 
        headerTitle={contentData.headerTitle}
        headerSubtitle={contentData.headerSubtitle}
      />
      <Suspense fallback={<LoadingSkeleton />}>
        <YojanaSection yojanaData={yojanaData} />
      </Suspense>
      <Footer />
    </>
  );
}
