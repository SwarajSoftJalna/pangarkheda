import { OfficeBearerMember } from '@/lib/storage';

interface OfficeBearersProps {
  data: OfficeBearerMember[];
}

export default function OfficeBearers({ data }: OfficeBearersProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              पदाधिकारी
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
          </div>
          
          {/* Office Bearers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {data.map((member) => (
              <div
                key={member.id}
                className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                {/* Member Photo */}
                <div className="relative mb-6">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden bg-gray-200 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-100">
                        <svg
                          className="w-16 h-16 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Member Info */}
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 font-medium">
                    {member.title}
                  </p>
                  {member.desc && (
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-xs mx-auto">
                      {member.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
