'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ContentData, OfficeBearerMember, CtaSection, PopulationStats, PopulationStatsItem } from '@/lib/storage';
import ImageUpload from '@/components/ImageUpload';

// Dynamic import of EditorClient with no SSR
const EditorClient = dynamic(() => import('@/components/EditorClient'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading editor...</div>
    </div>
  ),
});

export default function HomepageAdmin() {
  const [content, setContent] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  const [yashodathaContent, setYashodathaContent] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [administrativeStructureHeading, setAdministrativeStructureHeading] = useState('');
  const [administrativeStructureImage, setAdministrativeStructureImage] = useState('');
  const [officeBearers, setOfficeBearers] = useState<OfficeBearerMember[]>([]);
  const [administrativeStructureMembers, setAdministrativeStructureMembers] = useState<OfficeBearerMember[]>([]);
  const [ctaSection, setCtaSection] = useState<CtaSection>({
    heading: '',
    subheading: '',
    phone: '',
    images: []
  });
  const [populationStats, setPopulationStats] = useState<PopulationStats>({
    mainHeading: '',
    items: []
  });
  const [govtLogos, setGovtLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/content');
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      const data = await response.json();
      setContent(data.homepage || '');
      setAboutContent(data.about || '');
      setYashodathaContent(data.yashodatha || '');
      setBannerImage(data.bannerImage || '');
      setAdministrativeStructureHeading(data.administrativeStructureHeading || '');
      setAdministrativeStructureImage(data.administrativeStructureImage || '');
      setOfficeBearers(data.officeBearers || []);
      setAdministrativeStructureMembers(data.administrativeStructureMembers || []);
      setCtaSection(data.ctaSection || {
        heading: '',
        subheading: '',
        phone: '',
        images: []
      });
      setPopulationStats(data.populationStats || {
        mainHeading: '',
        items: []
      });
      setGovtLogos(data.govtLogos || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage({ type: 'error', text: 'Failed to load content' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          homepage: content,
          about: aboutContent,
          yashodatha: yashodathaContent,
          bannerImage: bannerImage,
          administrativeStructureHeading: administrativeStructureHeading,
          administrativeStructureImage: administrativeStructureImage,
          officeBearers: officeBearers,
          administrativeStructureMembers: administrativeStructureMembers,
          ctaSection: ctaSection,
          populationStats: populationStats,
          govtLogos: govtLogos,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      setMessage({ type: 'success', text: 'Homepage content and banner saved successfully!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage({ type: 'error', text: 'Failed to save content' });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  // Office Bearers management functions
  const addOfficeBearerMember = () => {
    const newMember: OfficeBearerMember = {
      id: Date.now().toString(),
      image: '',
      name: '',
      title: '',
      desc: ''
    };
    setOfficeBearers([...officeBearers, newMember]);
  };

  const removeOfficeBearerMember = (id: string) => {
    setOfficeBearers(officeBearers.filter(member => member.id !== id));
  };

  const updateOfficeBearerMember = (id: string, field: keyof OfficeBearerMember, value: string) => {
    setOfficeBearers(officeBearers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  // Administrative Structure Members management functions
  const addAdministrativeMember = () => {
    const newMember: OfficeBearerMember = {
      id: Date.now().toString(),
      image: '',
      name: '',
      title: '',
      desc: ''
    };
    setAdministrativeStructureMembers([...administrativeStructureMembers, newMember]);
  };

  const removeAdministrativeMember = (id: string) => {
    setAdministrativeStructureMembers(administrativeStructureMembers.filter(m => m.id !== id));
  };

  const updateAdministrativeMember = (id: string, field: keyof OfficeBearerMember, value: string) => {
    setAdministrativeStructureMembers(administrativeStructureMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  // CTA Section management functions
  const updateCtaSection = (field: keyof CtaSection, value: string | string[]) => {
    setCtaSection(prev => ({ ...prev, [field]: value }));
  };

  const addCtaImage = () => {
    const newImages = [...ctaSection.images, ''];
    updateCtaSection('images', newImages);
  };

  const removeCtaImage = (index: number) => {
    const newImages = ctaSection.images.filter((_, i) => i !== index);
    updateCtaSection('images', newImages);
  };

  const updateCtaImage = (index: number, url: string) => {
    const newImages = [...ctaSection.images];
    newImages[index] = url;
    updateCtaSection('images', newImages);
  };

  // Population Stats management functions
  const updatePopulationStatsHeading = (heading: string) => {
    setPopulationStats(prev => ({ ...prev, mainHeading: heading }));
  };

  const addPopulationStatsItem = () => {
    const newItem: PopulationStatsItem = {
      id: Date.now().toString(),
      icon: '👥',
      count: 0,
      label: ''
    };
    setPopulationStats(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removePopulationStatsItem = (id: string) => {
    setPopulationStats(prev => ({ 
      ...prev, 
      items: prev.items.filter(item => item.id !== id) 
    }));
  };

  const updatePopulationStatsItem = (id: string, field: keyof PopulationStatsItem, value: string | number) => {
    setPopulationStats(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Government Logos management functions
  const addGovtLogo = () => {
    setGovtLogos(prev => [...prev, '']);
  };

  const removeGovtLogo = (index: number) => {
    setGovtLogos(prev => prev.filter((_, i) => i !== index));
  };

  const updateGovtLogo = (index: number, url: string) => {
    setGovtLogos(prev => {
      const newLogos = [...prev];
      newLogos[index] = url;
      return newLogos;
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading homepage editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Homepage Content</h1>
          <p className="text-gray-600">Edit the main content of your website homepage</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePreview}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            👁️ Preview Site
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? '💾 Saving...' : '💾 Save All Changes'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Banner Image Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Homepage Banner Image</h2>
          <p className="text-gray-600 text-sm">
            Upload or set a banner image that appears at the top of your homepage, right below the header.
          </p>
        </div>
        
        <ImageUpload
          currentImage={bannerImage}
          onImageChange={setBannerImage}
          label="Homepage Banner"
          description="Choose a banner image for your homepage. Recommended size: 1200x400 pixels"
        />
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">📸 Banner Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use high-quality images with good resolution (1200x400px recommended)</li>
            <li>• Ensure images are web-optimized for faster loading</li>
            <li>• You can upload files or paste image URLs from the web</li>
            <li>• Banner appears prominently at the top of your homepage</li>
            <li>• Leave empty to hide the banner section</li>
          </ul>
        </div>
      </div>

           {/* About Section Editor */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">About Section Editor</h2>
          <p className="text-gray-600 text-sm">
            Create and edit the about section content that appears between the banner and main content.
            Include information about officials, village details, and statistics.
          </p>
        </div>
        
        <EditorClient
          value={aboutContent}
          onEditorChange={setAboutContent}
          placeholder="Enter about section content here..."
          height={400}
        />

         <EditorClient
          value={yashodathaContent}
          onEditorChange={setYashodathaContent}
          placeholder="Enter about section content here..."
          height={400}
        />
        
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-md">
          <h3 className="font-semibold text-purple-800 mb-2">ℹ️ About Section Tips:</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Include information about village officials and their roles</li>
            <li>• Add village statistics like population, demographics, etc.</li>
            <li>• Mention key facilities and services available</li>
            <li>• Use headings to organize different sections of information</li>
          </ul>
        </div>
      </div>


      {/* Administrative Structure Section (Enhanced like Office Bearers) */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">प्रशासकीय संरचना (Administrative Structure)</h2>
          <p className="text-gray-600 text-sm">
            Manage the administrative structure with members, similar to Office Bearers. You can also set a heading and an organizational chart image.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Heading</label>
            <input
              type="text"
              value={administrativeStructureHeading}
              onChange={(e) => setAdministrativeStructureHeading(e.target.value)}
              placeholder="प्रशासकीय संरचना"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organizational Chart Image</label>
            <ImageUpload
              currentImage={administrativeStructureImage}
              onImageChange={setAdministrativeStructureImage}
              label="Administrative Structure Chart"
              description="Upload an organizational chart showing the administrative hierarchy"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {administrativeStructureMembers.map((member, index) => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Admin Member {index + 1}</h3>
                <button
                  onClick={() => removeAdministrativeMember(member.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  🗑️ Remove
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Photo</label>
                  <ImageUpload
                    currentImage={member.image}
                    onImageChange={(url) => updateAdministrativeMember(member.id, 'image', url)}
                    label={`Photo for ${member.name || 'Member'}`}
                    description="Upload a professional photo of the admin member"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name (Marathi)</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateAdministrativeMember(member.id, 'name', e.target.value)}
                      placeholder="श्रीमती अलका ढोरे"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation/Title</label>
                    <input
                      type="text"
                      value={member.title}
                      onChange={(e) => updateAdministrativeMember(member.id, 'title', e.target.value)}
                      placeholder="ग्रामपंचायत अधिकारी"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                    <textarea
                      value={member.desc || ''}
                      onChange={(e) => updateAdministrativeMember(member.id, 'desc', e.target.value)}
                      placeholder="Additional information about the admin member..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addAdministrativeMember}
            className="w-full py-3 px-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors duration-200 font-medium"
          >
            ➕ Add Administrative Member
          </button>
        </div>

        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-semibold text-green-800 mb-2">🏛️ Administrative Structure Tips:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Add all key administrative members with photos and designations</li>
            <li>• Arrange members according to hierarchy</li>
            <li>• Keep designations clear and official</li>
            <li>• Update regularly when positions change</li>
          </ul>
        </div>
      </div>

      {/* Office Bearers Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">पदाधिकारी (Office Bearers)</h2>
          <p className="text-gray-600 text-sm">
            Manage the office bearers section that displays officials with their photos, names, and designations.
          </p>
        </div>
        
        <div className="space-y-4">
          {officeBearers.map((member, index) => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Member {index + 1}</h3>
                <button
                  onClick={() => removeOfficeBearerMember(member.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  🗑️ Remove
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Photo
                  </label>
                  <ImageUpload
                    currentImage={member.image}
                    onImageChange={(url) => updateOfficeBearerMember(member.id, 'image', url)}
                    label={`Photo for ${member.name || 'Member'}`}
                    description="Upload a professional photo of the office bearer"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name (Marathi)
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateOfficeBearerMember(member.id, 'name', e.target.value)}
                      placeholder="श्रीमती अलका ढोरे"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation/Title
                    </label>
                    <input
                      type="text"
                      value={member.title}
                      onChange={(e) => updateOfficeBearerMember(member.id, 'title', e.target.value)}
                      placeholder="ग्रामपंचायत अधिकारी"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={member.desc || ''}
                      onChange={(e) => updateOfficeBearerMember(member.id, 'desc', e.target.value)}
                      placeholder="Additional information about the office bearer..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={addOfficeBearerMember}
            className="w-full py-3 px-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors duration-200 font-medium"
          >
            ➕ Add New Office Bearer
          </button>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">👥 Office Bearers Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use professional photos with good resolution (square format recommended)</li>
            <li>• Enter names in Marathi script for consistency</li>
            <li>• Keep designations clear and official</li>
            <li>• Photos will be displayed in circular format on the website</li>
            <li>• Order matters - arrange by hierarchy or importance</li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">CTA Section (Call To Action)</h2>
          <p className="text-gray-600 text-sm">
            Manage the call-to-action banner with heading, subheading, phone number, and image gallery.
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Main Heading */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Heading
            </label>
            <EditorClient
              value={ctaSection.heading}
              onEditorChange={(value) => updateCtaSection('heading', value)}
              placeholder="भारतातील पंचायती राज हे ग्रामीण स्थानिक स्वराज्य प्रणालीचे प्रतीक आहे."
              height={150}
            />
          </div>
          
          {/* Sub Heading */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Heading
            </label>
            <EditorClient
              value={ctaSection.subheading}
              onEditorChange={(value) => updateCtaSection('subheading', value)}
              placeholder="जन्म, मृत्यू व विवाह यांची नोंदणी अवश्य करा..."
              height={150}
            />
          </div>
          
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={ctaSection.phone}
              onChange={(e) => updateCtaSection('phone', e.target.value)}
              placeholder="+91-9730746355"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Images
            </label>
            <div className="space-y-4">
              {ctaSection.images.map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-800">Image {index + 1}</h4>
                    <button
                      onClick={() => removeCtaImage(index)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                  
                  <ImageUpload
                    currentImage={image}
                    onImageChange={(url) => updateCtaImage(index, url)}
                    label={`CTA Image ${index + 1}`}
                    description="Upload a banner image for the CTA section"
                  />
                </div>
              ))}
              
              <button
                onClick={addCtaImage}
                className="w-full py-3 px-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors duration-200 font-medium"
              >
                ➕ Add CTA Image
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-semibold text-green-800 mb-2">📢 CTA Section Tips:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Use compelling headings to grab attention</li>
            <li>• Keep phone number format consistent (+91-XXXXXXXXXX)</li>
            <li>• Upload high-quality banner images</li>
            <li>• Images will be displayed in a responsive gallery</li>
            <li>• Users can click images to view in fullscreen</li>
          </ul>
        </div>
      </div>

      {/* Population Stats Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">लोकसंख्या आकडेवारी (Population Statistics)</h2>
          <p className="text-gray-600 text-sm">
            Manage population statistics with icons, counts, and labels displayed in a responsive grid.
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Main Heading */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Heading
            </label>
            <input
              type="text"
              value={populationStats.mainHeading}
              onChange={(e) => updatePopulationStatsHeading(e.target.value)}
              placeholder="लोकसंख्या आकडेवारी"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          {/* Stats Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statistics Items
            </label>
            <div className="space-y-4">
              {populationStats.items.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-800">Stat {index + 1}</h4>
                    <button
                      onClick={() => removePopulationStatsItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon (Emoji)
                      </label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => updatePopulationStatsItem(item.id, 'icon', e.target.value)}
                        placeholder="👨‍👩‍👧"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Count (Number)
                      </label>
                      <input
                        type="number"
                        value={item.count}
                        onChange={(e) => updatePopulationStatsItem(item.id, 'count', parseInt(e.target.value) || 0)}
                        placeholder="740"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label (Marathi)
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updatePopulationStatsItem(item.id, 'label', e.target.value)}
                        placeholder="कुटुंब"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addPopulationStatsItem}
                className="w-full py-3 px-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors duration-200 font-medium"
              >
                ➕ Add Population Stat
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">📊 Population Stats Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use relevant emojis for visual appeal (👨‍👩‍👧, 🏠, 👨, 👩)</li>
            <li>• Enter accurate population numbers</li>
            <li>• Use Marathi labels for consistency</li>
            <li>• Stats will display in a responsive 4-column grid</li>
            <li>• Order matters - arrange by importance</li>
          </ul>
        </div>
      </div>

      {/* Government Logos Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Government Logos Section</h2>
          <p className="text-gray-600 text-sm">
            Upload and manage government logos that will be displayed in a responsive grid on the homepage.
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Logos Management */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Government Logos
            </label>
            <div className="space-y-4">
              {govtLogos.map((logo, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-800">Logo {index + 1}</h4>
                    <button
                      onClick={() => removeGovtLogo(index)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <ImageUpload
                      currentImage={logo}
                      onImageChange={(url: string) => updateGovtLogo(index, url)}
                      label="Upload government logo"
                      description="Choose a logo file or enter a URL"
                    />
                    
                    {logo && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <img
                          src={logo}
                          alt={`Government Logo ${index + 1}`}
                          className="h-20 w-auto border border-gray-200 rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <button
                onClick={addGovtLogo}
                className="w-full py-3 px-4 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-colors duration-200 font-medium"
              >
                ➕ Add Government Logo
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-md">
          <h3 className="font-semibold text-orange-800 mb-2">🏛️ Government Logos Tips:</h3>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Upload high-quality PNG/SVG logos for best results</li>
            <li>• Logos will be displayed with fixed height (80px) and auto width</li>
            <li>• Responsive layout: 6-8 logos per row on desktop, 2-3 on mobile</li>
            <li>• Hover effect will slightly enlarge each logo</li>
            <li>• Use official government logos only</li>
          </ul>
        </div>
      </div>

      {/* Homepage Content Editor */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Homepage Main Content Editor</h2>
          <p className="text-gray-600 text-sm">
            Create and edit the main content sections of your homepage. You can add headings, paragraphs, 
            lists, images, and other content elements.
          </p>
        </div>
        
        <EditorClient
          value={content}
          onEditorChange={setContent}
          placeholder="Enter your homepage content here..."
          height={600}
        />
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Homepage Content:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use headings (H1, H2, H3) to structure your content</li>
            <li>• Add information about your panchayat's services and officials</li>
            <li>• Include contact information and office hours</li>
            <li>• Use lists for services, schemes, and important announcements</li>
            <li>• Keep content updated with current information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
