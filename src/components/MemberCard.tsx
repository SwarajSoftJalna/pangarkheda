import { PadadhikariMember } from '@/lib/storage';

interface MemberCardProps {
  member: PadadhikariMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300 bg-white">
        {/* Member Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-gray-400 text-6xl">👤</div>
            </div>
          )}
          
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>

        {/* Member Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
          <h3 className="text-white font-bold text-lg mb-1 leading-tight">
            {member.name}
          </h3>
          <div className="inline-block bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
            {member.role}
          </div>
        </div>
      </div>
    </div>
  );
}
