'use client';

import { useState } from 'react';
import { PadadhikariData } from '@/lib/storage';
import PadadhikariGrid from './PadadhikariGrid';

interface PadadhikariTabsProps {
  data: PadadhikariData;
}

export default function PadadhikariTabs({ data }: PadadhikariTabsProps) {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'tab3'>('tab1');

  const tabs = [
    {
      id: 'tab1' as const,
      label: 'ग्रा. पं. कार्यकर्तीणी',
      members: data.tab1
    },
    {
      id: 'tab2' as const,
      label: 'ग्रा. पं. कर्मचारी',
      members: data.tab2
    },
    {
      id: 'tab3' as const,
      label: 'सर्व सदस्य',
      members: data.tab3
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-green-700 shadow-sm border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {tab.label}
              {tab.members.length > 0 && (
                <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  {tab.members.filter(member => member.active).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content with Animation */}
      <div className="relative">
        <div 
          key={activeTab}
          className="animate-fadeIn"
        >
          {activeTabData && (
            <PadadhikariGrid
              members={activeTabData.members.filter(member => member.active)} 
              tabLabel={activeTabData.label}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
