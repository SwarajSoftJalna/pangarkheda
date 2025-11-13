import { GalleryImage } from '@/lib/storage';
import ResponsiveImage from './ResponsiveImage';

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  // Filter out images without src (empty or null/undefined)
  // More lenient filtering for base64 images
  const validImages = images.filter(image => {
    if (!image.src || image.src.trim() === '') return false;
    
    // For base64 images, check if they have reasonable length
    if (image.src.startsWith('data:image/')) {
      return image.src.length > 30; // Lowered threshold to test truncated images
    }
    
    // For regular URLs, just check if not empty
    return true;
  });

  // Debug logging (remove in production)
  console.log('GalleryGrid - Total images:', images.length);
  console.log('GalleryGrid - Valid images:', validImages.length);
  console.log('GalleryGrid - Images data:', images);
  console.log('GalleryGrid - Image src lengths:', images.map(img => ({ 
    id: img.id, 
    caption: img.caption, 
    srcLength: img.src?.length || 0,
    srcPreview: img.src?.substring(0, 100) + '...'
  })));

  if (validImages.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-8xl mb-6">📸</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          कोणतेही फोटो उपलब्ध नाहीत
        </h3>
        <p className="text-gray-600">
          फोटो गॅलरीमध्ये प्रतिमा जोडल्या जाण्याची प्रतीक्षा आहे.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {validImages.map((image) => (
        <div key={image.id} className="aspect-square">
          <ResponsiveImage 
            image={image} 
            className="w-full h-full cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}
