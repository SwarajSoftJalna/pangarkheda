import { Suspense } from 'react';
import PreHeader from '@/components/PreHeader';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import About from '@/components/About';
import AdministrativeStructure from '@/components/AdministrativeStructure';
import OfficeBearers from '@/components/OfficeBearers';
import CtaSection from '@/components/CtaSection';
import PopulationStats from '@/components/PopulationStats';
import GovtLogos from '@/components/GovtLogos';
import Footer from '@/components/Footer';
// import Homepage from '@/components/Homepage';
import { ContentData } from '@/lib/storage';

async function getContent(): Promise<ContentData> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'https://gpm-orcin.vercel.app'
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/content`, {
      cache: 'no-store', // Always fetch fresh content
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching content:', error);
    // Return default content if fetch fails
    return {
      preheader: '<p>ग्रामपंचायत सावरगाव हडप, जालना</p>',
      headerTitle: 'ग्रामपंचायत सावरगाव हडप',
      headerSubtitle: 'जालना, महाराष्ट्र',
      bannerImage: '',
      about: '<h2>आमची पदाधिकारी</h2><p>ग्रामपंचायत सावरगाव हडप, जालना</p>',
      yashodatha: '<h2>यशोदाथा योजना</h2><p>ग्रामपंचायत सावरगाव हडप येथील यशोदाथा योजनेची माहिती</p>',
      header: [
        { id: '1', title: 'होम', url: '/' },
        { id: '2', title: 'पदाधिकारी', url: '/padadhikari' }
      ],
      homepage: '<div><h1>ग्रामपंचायत सावरगाव हडप, जालना</h1><p>आपल्या गावाची प्रगती, आपली जबाबदारी</p></div>',
      administrativeStructureHeading: 'प्रशासकीय संरचना',
      administrativeStructureImage: '',
      officeBearers: [],
      ctaSection: {
        heading: 'भारतातील पंचायती राज हे ग्रामीण स्थानिक स्वराज्य प्रणालीचे प्रतीक आहे.',
        subheading: 'जन्म, मृत्यू व विवाह यांची नोंदणी अवश्य करा...',
        phone: '+91-9730746355',
        images: []
      },
      populationStats: {
        mainHeading: 'लोकसंख्या आकडेवारी',
        items: [
          { id: '1', icon: '👨‍👩‍👧', count: 740, label: 'कुटुंब' },
          { id: '2', icon: '🏠', count: 3241, label: 'लोकसंख्या' },
          { id: '3', icon: '👨', count: 1730, label: 'पुरुष' },
          { id: '4', icon: '👩', count: 1511, label: 'महिला' }
        ]
      },
      govtLogos: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-green-600 h-10"></div>
      <div className="bg-white shadow-lg">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
        <div className="container-custom py-2">
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded max-w-md mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded max-w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded max-w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Page() {
  const content = await getContent();

  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSkeleton />}>
        <PreHeader content={content.preheader} />
        <Header 
          menuItems={content.header} 
          headerTitle={content.headerTitle}
          headerSubtitle={content.headerSubtitle}
        />
        <Banner imageUrl={content.bannerImage} />
        <About aboutContent={content.about} yashodathaContent={content.yashodatha} />
        <AdministrativeStructure 
          heading={content.administrativeStructureHeading}
          image={content.administrativeStructureImage}
        />
        <OfficeBearers data={content.officeBearers} />
        <CtaSection data={content.ctaSection} />
        <PopulationStats data={content.populationStats} />
        <GovtLogos logos={content.govtLogos} />
        {/* <Homepage content={content.homepage} /> */}
      </Suspense>
      
      <Footer />
      
      {/* Admin Link */}
      <div className="fixed bottom-4 right-4 z-40">
        <a
          href="/login"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
          title="Admin Panel"
        >
          <span className="mr-2">🔐</span>
          Admin Login
        </a>
      </div>
    </div>
  );
}
