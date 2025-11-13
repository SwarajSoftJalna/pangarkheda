'use client';

import { useState, useEffect } from 'react';
import { PhotoGalleryData, GalleryImage } from '@/lib/storage';
import ImageUpload from '@/components/ImageUpload';

export default function PhotoGalleryAdmin() {
  const [photoGalleryData, setPhotoGalleryData] = useState<PhotoGalleryData>({
    heading: '',
    subheading: '',
    images: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPhotoGalleryData();
  }, []);

  const fetchPhotoGalleryData = async () => {
    try {
      const response = await fetch('/api/photo');
      if (!response.ok) {
        throw new Error('Failed to fetch photo gallery data');
      }
      const data = await response.json();
      setPhotoGalleryData(data.photoGallery);
    } catch (error) {
      console.error('Error fetching photo gallery data:', error);
      setMessage({ type: 'error', text: 'Failed to load photo gallery data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photoGallery: photoGalleryData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save photo gallery data');
      }

      setMessage({ type: 'success', text: 'फोटो गॅलरी डेटा यशस्वीरित्या सेव्ह झाला!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving photo gallery data:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to save photo gallery data' 
      });
    } finally {
      setSaving(false);
    }
  };

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Image Management
  const addImage = () => {
    const newImage: GalleryImage = {
      id: generateId(),
      src: '',
      caption: ''
    };

    setPhotoGalleryData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));
  };

  const removeImage = (imageId: string) => {
    setPhotoGalleryData(prev => ({
      ...prev,
      images: prev.images.filter(image => image.id !== imageId)
    }));
  };

  const updateImage = (imageId: string, field: keyof GalleryImage, value: string) => {
    setPhotoGalleryData(prev => ({
      ...prev,
      images: prev.images.map(image => 
        image.id === imageId ? { ...image, [field]: value } : image
      )
    }));
  };

  const updateBasicInfo = (field: keyof Pick<PhotoGalleryData, 'heading' | 'subheading'>, value: string) => {
    setPhotoGalleryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading photo gallery editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">फोटो गॅलरी व्यवस्थापन</h1>
        <p className="text-gray-600">
          Manage photo gallery heading, subheading, and images for the photo gallery page.
        </p>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Save Button */}
      <div className="mb-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              💾 Save All Changes
            </>
          )}
        </button>
      </div>

      {/* Basic Information Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Page Information</h2>
          <p className="text-gray-600 text-sm">
            Set the main heading and subheading for the photo gallery page.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Heading (Title)
            </label>
            <input
              type="text"
              value={photoGalleryData.heading}
              onChange={(e) => updateBasicInfo('heading', e.target.value)}
              placeholder="आम्ही आरोग्य करीता कटिबद्ध आहोत"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subheading (Description)
            </label>
            <textarea
              value={photoGalleryData.subheading}
              onChange={(e) => updateBasicInfo('subheading', e.target.value)}
              placeholder="आमच्या ग्रामपंचायतीत सांस्कृतिक, क्रीडा आणि सामाजिक कार्यक्रमांचे आयोजन केले जाते."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Gallery Images Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Gallery Images</h2>
              <p className="text-gray-600 text-sm">
                Upload and manage images for the photo gallery. Images will be displayed in a responsive grid.
              </p>
            </div>
            <button
              onClick={addImage}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              ➕ Add Image
            </button>
          </div>
        </div>

        {photoGalleryData.images.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-gray-400 text-6xl mb-4">🖼️</div>
            <p className="text-gray-600 mb-4">No images added yet. Click "Add Image" to get started.</p>
            <button
              onClick={addImage}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Add First Image
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoGalleryData.images.map((image, index) => (
              <div key={image.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-800">
                    Image {index + 1}
                  </h4>
                  <button
                    onClick={() => removeImage(image.id)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    🗑️ Remove
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image File
                    </label>
                    <ImageUpload
                      currentImage={image.src}
                      onImageChange={(url: string) => updateImage(image.id, 'src', url)}
                      label="Upload gallery image"
                      description="Upload image for gallery display"
                    />
                    
                    {image.src && (
                      <div className="mt-3">
                        <img
                          src={image.src}
                          alt={image.caption}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Caption
                    </label>
                    <input
                      type="text"
                      value={image.caption}
                      onChange={(e) => updateImage(image.id, 'caption', e.target.value)}
                      placeholder="आरोग्य शिबीर"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Photo Gallery Management Tips:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Image Quality:</strong> Upload high-quality images for better display</li>
          <li>• <strong>Captions:</strong> Add descriptive Marathi captions for each image</li>
          <li>• <strong>Responsive Grid:</strong> Images will automatically adjust to screen size</li>
          <li>• <strong>Order:</strong> Images are displayed in the order they appear here</li>
          <li>• <strong>File Formats:</strong> Supports JPG, PNG, and WebP formats</li>
        </ul>
      </div>
    </div>
  );
}
