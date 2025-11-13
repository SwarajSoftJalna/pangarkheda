import Link from 'next/link';
import Viewer from './Viewer';

interface PreHeaderProps {
  content: string;
}

// Helper function to extract email and phone from content
function extractContactInfo(content: string) {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  const phoneRegex = /(\+?[\d\s-()]{10,})/;
  
  const emailMatch = content.match(emailRegex);
  const phoneMatch = content.match(phoneRegex);
  
  return {
    email: emailMatch ? emailMatch[1] : null,
    phone: phoneMatch ? phoneMatch[1].replace(/\s+/g, '') : null,
    hasContactInfo: emailMatch || phoneMatch
  };
}

export default function PreHeader({ content }: PreHeaderProps) {
  if (!content.trim()) {
    return null;
  }

  const contactInfo = extractContactInfo(content);

  // If we can extract contact info, show structured layout
  if (contactInfo.hasContactInfo) {
    return (
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Left side - Contact Info */}
            <div className="flex items-center space-x-4 text-sm">
              {contactInfo.email && (
                <>
                  <div className="flex items-center space-x-1">
                    <span>📧</span>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-green-200 hover:text-white transition-colors duration-200"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                  {contactInfo.phone && <div className="hidden sm:block text-green-300">|</div>}
                </>
              )}
              {contactInfo.phone && (
                <div className="flex items-center space-x-1">
                  <span>📞</span>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-green-200 hover:text-white transition-colors duration-200"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Right side - Admin Login */}
            <div>
              <Link
                href="/login"
                className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <span>🔐</span>
                <span className="hidden sm:inline">Admin Login</span>
                <span className="sm:hidden">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: show content as-is with admin login button
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Left side - Dynamic Content */}
          <div className="flex-1">
            <Viewer 
              content={content} 
              className="text-sm [&_p]:mb-0 [&_p]:text-white [&_a]:text-green-200 [&_a:hover]:text-white [&_p]:overflow-hidden [&_p]:whitespace-nowrap [&_p]:animate-marquee md:[&_p]:animate-none md:[&_p]:whitespace-normal" 
            />
          </div>

          {/* Right side - Admin Login */}
          <div className="ml-4">
            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <span>🔐</span>
              <span className="hidden sm:inline">Admin Login</span>
              <span className="sm:hidden">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
