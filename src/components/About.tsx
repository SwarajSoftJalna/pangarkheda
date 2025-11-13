import Viewer from './Viewer';

interface AboutProps {
  aboutContent: string;
  yashodathaContent: string;
}

export default function About({ aboutContent, yashodathaContent }: AboutProps) {
  // Don't render if both contents are empty
  if (!aboutContent.trim() && !yashodathaContent.trim()) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* About Section */}
              {aboutContent.trim() && (
                <div className="space-y-4">
                  <Viewer 
                    content={aboutContent} 
                    className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-green-800 [&_h2]:mb-4 [&_p]:text-gray-700 [&_p]:mb-4 [&_p]:leading-relaxed [&_.about-section]:space-y-4 [&_.officials-info]:mt-6 [&_.officials-info_p]:text-sm [&_.officials-info_p]:text-gray-600"
                  />
                </div>
              )}
              
              {/* Yashodatha Section */}
              {yashodathaContent.trim() && (
                <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-gray-200 pt-8 lg:pt-0 lg:pl-8">
                  <Viewer 
                    content={yashodathaContent} 
                    className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-green-800 [&_h2]:mb-4 [&_p]:text-gray-700 [&_p]:mb-4 [&_p]:leading-relaxed [&_.yashodatha-section]:space-y-4"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
