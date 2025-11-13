import Viewer from './Viewer';

interface HomepageProps {
  content: string;
}

export default function Homepage({ content }: HomepageProps) {
  return (
    <main className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12">
            <Viewer 
              content={content} 
              className="[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mb-4 [&_h3]:mt-8 [&_p]:text-gray-600 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-6 [&_li]:mb-2 [&_li]:text-gray-600 [&_strong]:text-gray-900 [&_strong]:font-semibold" 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
