import { PopulationStats as PopulationStatsType } from '@/lib/storage';

interface PopulationStatsProps {
  data: PopulationStatsType;
}

export default function PopulationStats({ data }: PopulationStatsProps) {
  if (!data || !data.mainHeading || data.items.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-10 text-center">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 relative">
            {data.mainHeading}
            <div className="h-1 w-12 bg-green-600 mx-auto mt-2"></div>
          </h2>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {data.items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="text-3xl md:text-4xl mb-4 text-green-600">
                  {item.icon}
                </div>
                
                {/* Count */}
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                  {item.count.toLocaleString()}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
