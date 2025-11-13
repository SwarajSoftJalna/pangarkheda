'use client';

import { CtaSection as CtaSectionType } from '@/lib/storage';
import { useState } from 'react';
import Viewer from './Viewer';

interface CtaSectionProps {
  data: CtaSectionType;
}

export default function CtaSection({ data }: CtaSectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!data || (!data.heading && !data.subheading && !data.phone && data.images.length === 0)) {
    return null;
  }

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < data.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  };

  // Add keyboard event listener when modal is open
  if (typeof window !== 'undefined' && selectedImageIndex !== null) {
    window.addEventListener('keydown', handleKeyDown);
  }

  return (
    <>
      <section className="bg-white">
        {/* Green Banner */}
        {(data.heading || data.subheading || data.phone) && (
          <div className="bg-green-600 text-white py-4 md:py-6">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left side - Headings */}
                <div className="flex-1">
                  {data.heading && (
                    <div className="mb-2">
                      <Viewer 
                        content={data.heading} 
                        className="text-white [&_p]:text-white [&_p]:font-bold [&_p]:text-sm md:[&_p]:text-base [&_p]:mb-0 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white" 
                      />
                    </div>
                  )}
                  {data.subheading && (
                    <div>
                      <Viewer 
                        content={data.subheading} 
                        className="text-white [&_p]:text-white [&_p]:font-medium [&_p]:text-xs md:[&_p]:text-sm [&_p]:mb-0 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white" 
                      />
                    </div>
                  )}
                </div>
                
                {/* Right side - Phone */}
                {data.phone && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg 
                      className="w-5 h-5 md:w-6 md:h-6 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="font-bold text-lg md:text-xl">{data.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Images Gallery */}
        {data.images && data.images.length > 0 && (
          <div className=" pt-0 pl-0 pr-0">
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {data.images.map((image, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => openModal(index)}
                  >
                    <div className="relative overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={image}
                        alt={`CTA Image ${index + 1}`}
                        className="w-full h-48 md:h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          {selectedImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {selectedImageIndex < data.images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={data.images[selectedImageIndex]}
              alt={`CTA Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {data.images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
