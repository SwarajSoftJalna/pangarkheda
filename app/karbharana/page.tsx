import { Suspense } from 'react';
import { KarbharanaData, ContentData } from '@/lib/storage';
import PreHeader from '@/components/PreHeader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TaxReportSection from '@/components/TaxReportSection';
import PaymentAccordion from '@/components/PaymentAccordion';

async function getKarbharanaData(): Promise<KarbharanaData> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'https://grampanchayatmanepuri.in'
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/karbharana`, {
      cache: 'no-store', // Always fetch fresh content
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch karbharana data');
    }
    
    const data = await response.json();
    return data.karbharana;
  } catch (error) {
    console.error('Error fetching karbharana data:', error);
    // Return default empty data if fetch fails
    return {
      taxReports: [],
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
        { id: '2', title: 'करभारणा', url: '/karbharana' }
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
        {/* Loading Heading */}
        <div className="mb-12">
          <div className="h-8 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse"></div>
          <div className="h-1 w-14 bg-gray-200 animate-pulse"></div>
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

export default async function KarbharanaPage() {
  const [karbharanaData, contentData] = await Promise.all([
    getKarbharanaData(),
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
          <div className="max-w-6xl mx-auto px-4">
            
            {/* Page Heading */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                कर वसूली अहवाल
              </h1>
              <div className="h-1 w-16 bg-green-600 mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl">
                ग्रामपंचायत मानेपुरी येथील वार्षिक कर वसूली अहवाल आणि पेमेंट माहिती
              </p>
            </div>

            {/* Tax Reports Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                वार्षिक कर वसूली अहवाल
              </h2>
              <TaxReportSection reports={karbharanaData.taxReports} />
            </div>

            {/* Payment Accordions Section */}
            {karbharanaData.accordions.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  ऑनलाइन पेमेंट
                </h2>
                <PaymentAccordion accordions={karbharanaData.accordions} />
              </div>
            )}

          </div>
        </section>
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}
