import { Suspense } from 'react';
import { PhotoGalleryData, ContentData } from '@/lib/storage';
import PreHeader from '@/components/PreHeader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryHeader from '@/components/GalleryHeader';
import GalleryGrid from '@/components/GalleryGrid';

async function getPhotoGalleryData(): Promise<PhotoGalleryData> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'https://gpm-orcin.vercel.app'
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/photo`, {
      cache: 'no-store', // Always fetch fresh content
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch photo gallery data');
    }
    
    const data = await response.json();
    return data.photoGallery;
  } catch (error) {
    console.error('Error fetching photo gallery data:', error);
    // Return default empty data if fetch fails
    return {
      heading: 'फोटो गॅलरी',
      subheading: 'आमच्या ग्रामपंचायतीतील विविध कार्यक्रमांचे फोटो',
      images: []
    };
  }
}

async function getContentData(): Promise<ContentData> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'https://gpm-orcin.vercel.app'
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
      preheader: '<p>ग्रामपंचायत सावरगाव हडप, जालना</p>',
      header: [
        { id: '1', title: 'होम', url: '/' },
        { id: '2', title: 'फोटो गॅलरी', url: '/photo' }
      ],
      headerTitle: 'ग्रामपंचायत सावरगाव हडप',
      headerSubtitle: 'जालना, महाराष्ट्र',
      bannerImage: '',
      about: '',
      yashodatha: '',
      homepage: '',
      administrativeStructureHeading: '',
      administrativeStructureImage: '',
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
        {/* Loading Header */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-1 w-16 bg-gray-200 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-80 mx-auto animate-pulse"></div>
        </div>

        {/* Loading Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function PhotoGalleryPage() {
  const [photoGalleryData, contentData] = await Promise.all([
    getPhotoGalleryData(),
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
            
            {/* Gallery Header */}
            <GalleryHeader 
              heading={photoGalleryData.heading}
              subheading={photoGalleryData.subheading}
            />

            {/* Gallery Grid */}
            <GalleryGrid images={photoGalleryData.images} />

          </div>
        </section>
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}
