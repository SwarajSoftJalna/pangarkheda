'use client';

import { useState } from 'react';
import { GalleryImage } from '@/lib/storage';

interface ResponsiveImageProps {
  image: GalleryImage;
  className?: string;
}

export default function ResponsiveImage({ image, className = '' }: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    console.log('Image loaded successfully:', image.caption, 'src length:', image.src.length);
    setIsLoading(false);
  };

  const handleError = () => {
    console.log('Image failed to load:', image.caption, 'src length:', image.src.length, 'src preview:', image.src.substring(0, 100));
    setIsLoading(false);
    setHasError(true);
  };

  if (!image.src) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="text-gray-400 text-4xl mb-2">🖼️</div>
          <p className="text-gray-500 text-sm">No image</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="text-gray-400 text-4xl mb-2">❌</div>
          <p className="text-gray-500 text-sm">Failed to load</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-md ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-2xl">📸</div>
        </div>
      )}
      
      <img
        src={image.src}
        alt={image.caption}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {image.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white text-sm font-medium">{image.caption}</p>
        </div>
      )}
    </div>
  );
}
