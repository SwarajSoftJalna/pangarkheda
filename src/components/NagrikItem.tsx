'use client';

import { NagrikItem as NagrikItemType } from '@/lib/storage';

interface NagrikItemProps {
  item: NagrikItemType;
}

export default function NagrikItem({ item }: NagrikItemProps) {
  if (!item.url || !item.label) {
    return null;
  }

  const handleClick = () => {
    if (item.type === 'pdf') {
      // Open PDF in new tab
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'link') {
      // Open external link in new tab
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const getIcon = () => {
    return item.type === 'pdf' ? '📄' : '🔗';
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left block text-gray-700 hover:text-green-700 hover:bg-green-50 px-3 py-2 rounded-md transition-colors duration-200 border border-transparent hover:border-green-200"
    >
      <div className="flex items-center space-x-3">
        <span className="text-lg">{getIcon()}</span>
        <span className="flex-1 underline decoration-dotted underline-offset-2">
          {item.label}
        </span>
        <span className="text-xs text-gray-500 uppercase">
          {item.type === 'pdf' ? 'PDF' : 'Link'}
        </span>
      </div>
    </button>
  );
}
