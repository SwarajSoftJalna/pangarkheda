'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FooterData } from '@/lib/storage';
import { Instagram, Twitter, Facebook, Youtube, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch('/api/footer');
      if (response.ok) {
        const data = await response.json();
        setFooterData(data.footer);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isExternalUrl = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const getSocialIcon = (platform: string) => {
    const iconProps = { size: 20, className: "text-gray-300" };
    
    switch (platform) {
      case 'instagram':
        return <Instagram {...iconProps} />;
      case 'twitter':
        return <Twitter {...iconProps} />;
      case 'facebook':
        return <Facebook {...iconProps} />;
      case 'youtube':
        return <Youtube {...iconProps} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <footer className="bg-neutral-900 text-gray-300 py-10">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading footer...</div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return null;
  }

  return (
    <footer className="bg-neutral-900 text-gray-300 py-10">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1 - Important Links (Left) */}
            {footerData.column1 && footerData.column1.length > 0 && (
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">महत्त्वाच्या लिंक</h3>
                <ul className="space-y-2">
                  {footerData.column1.map((link, index) => (
                    <li key={index}>
                      {isExternalUrl(link.url) ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-green-500 transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="text-gray-300 hover:text-green-500 transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Column 2 - Important Links (Right) */}
            {footerData.column2 && footerData.column2.length > 0 && (
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">उपयुक्त लिंक</h3>
                <ul className="space-y-2">
                  {footerData.column2.map((link, index) => (
                    <li key={index}>
                      {isExternalUrl(link.url) ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-green-500 transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="text-gray-300 hover:text-green-500 transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Column 3 - Social Media */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">सोशल मीडिया</h3>
              <div className="flex space-x-3">
                {Object.entries(footerData.social).map(([platform, url]) => {
                  if (!url || url.trim() === '') return null;
                  
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-200"
                      title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                    >
                      {getSocialIcon(platform)}
                    </a>
                  );
                })}
              </div>
              
              {/* Show message if no social links */}
              {Object.values(footerData.social).every(url => !url || url.trim() === '') && (
                <p className="text-gray-500 text-sm">सोशल मीडिया लिंक उपलब्ध नाहीत</p>
              )}
            </div>

            {/* Column 4 - Address */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">पत्ता</h3>
              <div className="space-y-3">
                
                {/* Address Lines */}
                {footerData.address.lines && (
                  <div className="flex items-start space-x-2">
                    <MapPin size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {footerData.address.lines}
                    </p>
                  </div>
                )}

                {/* Phone */}
                {footerData.address.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-green-500 flex-shrink-0" />
                    <a
                      href={`tel:${footerData.address.phone}`}
                      className="text-gray-300 hover:text-green-500 transition-colors duration-200 text-sm"
                    >
                      {footerData.address.phone}
                    </a>
                  </div>
                )}

                {/* Panchayat Code */}
                {footerData.address.code && (
                  <div className="text-sm">
                    <span className="text-gray-400">पंचायत कोड: </span>
                    <span className="text-white font-semibold">{footerData.address.code}</span>
                  </div>
                )}

                {/* Get Directions Link */}
                {footerData.address.mapLink && (
                  <div>
                    <a
                      href={footerData.address.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-500 hover:text-green-400 transition-colors duration-200 text-sm font-medium"
                    >
                      <MapPin size={14} className="mr-1" />
                      दिशा मिळवा
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} ग्रामपंचायत मानेपुरी. सर्व हक्क राखीव.
              </p>
              <p className="text-gray-500 text-xs">
                Powered by Swaraj Gram Software
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
