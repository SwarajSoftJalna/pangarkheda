import { Suspense } from 'react';
import { PadadhikariData, ContentData } from '@/lib/storage';
import PreHeader from '@/components/PreHeader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import PadadhikariTabs from '@/components/PadadhikariTabs';

async function getPadadhikariData(): Promise<PadadhikariData> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'https://grampanchayatmanepuri.in'
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/padadhikari`, {
      cache: 'no-store', // Always fetch fresh content
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch padadhikari data');
    }
    
    const data = await response.json();
    return data.padadhikari;
  } catch (error) {
    console.error('Error fetching padadhikari data:', error);
    // Return default empty data if fetch fails
    return {
      tab1: [],
      tab2: [],
      tab3: []
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
        { id: '2', title: 'पदाधिकारी', url: '/padadhikari' }
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
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Loading Heading */}
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-1 w-16 bg-gray-200 mx-auto mb-4 animate-pulse"></div>
          </div>

          {/* Loading Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Loading Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg aspect-[3/4] animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PadadhikariPage() {
  const [padadhikariData, contentData] = await Promise.all([
    getPadadhikariData(),
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
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              
              {/* Page Heading */}
              <SectionHeading 
                title="पदाधिकारी"
                subtitle="ग्रामपंचायत मानेपुरी येथील पदाधिकारी आणि कर्मचारी"
              />

              {/* Tabs and Content */}
              <PadadhikariTabs data={padadhikariData} />

            </div>
          </div>
        </section>
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}
