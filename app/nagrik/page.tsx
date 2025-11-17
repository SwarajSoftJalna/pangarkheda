import { Suspense } from 'react';
import { NagrikData, ContentData } from '@/lib/storage';
import PreHeader from '@/components/PreHeader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NagrikAccordion from '@/components/NagrikAccordion';
import GovtLogos from '@/components/GovtLogos';

async function getNagrikData(): Promise<NagrikData> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'https://grampanchayatmanepuri.in'
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/nagrik`, {
      cache: 'no-store', // Always fetch fresh content
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch nagrik data');
    }
    
    const data = await response.json();
    return data.nagrik;
  } catch (error) {
    console.error('Error fetching nagrik data:', error);
    // Return default empty data if fetch fails
    return {
      accordions: []
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
        { id: '2', title: 'नागरिकांसाठी', url: '/nagrik' }
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
      <div className="max-w-5xl mx-auto px-4">
        {/* Loading Heading */}
        <div className="mb-12 text-center">
          <div className="h-8 bg-gray-200 rounded-lg w-48 mx-auto mb-2 animate-pulse"></div>
          <div className="h-1 w-16 bg-gray-200 mx-auto animate-pulse"></div>
        </div>

        {/* Loading Accordions */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg">
              <div className="h-12 bg-gray-100 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function NagrikPage() {
  const [nagrikData, contentData] = await Promise.all([
    getNagrikData(),
    getContentData()
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<LoadingSkeleton />}>
        {/* Header - Same as Homepage */}
        <PreHeader content={contentData.preheader} />
        <Header 
          menuItems={contentData.header} 
          headerTitle={contentData.headerTitle}
          headerSubtitle={contentData.headerSubtitle}
        />

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            
            {/* Page Heading */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                नागरिक सेवा
              </h1>
              <div className="w-16 h-1 bg-green-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                ग्रामपंचायत मानेपुरी येथील नागरिकांसाठी आवश्यक फॉर्म आणि सेवा
              </p>
            </div>

            {/* Accordions */}
            {nagrikData.accordions.length > 0 ? (
              <div className="space-y-4">
                {nagrikData.accordions.map((accordion) => (
                  <NagrikAccordion key={accordion.id} accordion={accordion} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 text-8xl mb-6">📋</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  कोणत्याही सेवा उपलब्ध नाहीत
                </h3>
                <p className="text-gray-600">
                  नागरिक सेवा फॉर्म आणि लिंक जोडले जाण्याची प्रतीक्षा आहे.
                </p>
              </div>
            )}

          </div>
        </section>
      </Suspense>
      <GovtLogos />

      {/* Footer */}
      <Footer />
    </div>
  );
}
