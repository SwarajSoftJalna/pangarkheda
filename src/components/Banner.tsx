'use client';

interface BannerProps {
  imageUrl: string;
}

export default function Banner({ imageUrl }: BannerProps) {
  if (!imageUrl || !imageUrl.trim()) {
    return null;
  }

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
      <img
        src={imageUrl}
        alt="Banner"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Hide banner if image fails to load
          const target = e.target as HTMLImageElement;
          target.parentElement?.remove();
        }}
      />
      {/* Optional overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
}
