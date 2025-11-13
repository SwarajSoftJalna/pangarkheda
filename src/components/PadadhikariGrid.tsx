import { PadadhikariMember } from '@/lib/storage';
import MemberCard from './MemberCard';

interface PadadhikariGridProps {
  members: PadadhikariMember[];
  tabLabel: string;
}

export default function PadadhikariGrid({ members, tabLabel }: PadadhikariGridProps) {
  if (members.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-8xl mb-6">👥</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {tabLabel} मध्ये कोणतेही सदस्य नाहीत
        </h3>
        <p className="text-gray-600">
          या विभागात सदस्य जोडले जाण्याची प्रतीक्षा आहे.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}
