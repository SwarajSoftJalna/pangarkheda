'use client';

import { useEffect, useState } from 'react';
import { sanitizeHtml } from '@/lib/sanitizeHtml';

interface ViewerProps {
  content: string;
  className?: string;
}

export default function Viewer({ content, className = '' }: ViewerProps) {
  const [sanitizedContent, setSanitizedContent] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      sanitizeHtml(content).then((clean) => {
        setSanitizedContent(clean);
      }).catch((error) => {
        console.error('Error sanitizing HTML:', error);
        setSanitizedContent(content);
      });
    }
  }, [content, isClient]);

  if (!isClient) {
    // Server-side rendering fallback
    return (
      <div className={`content-display ${className}`}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  return (
    <div className={`content-display ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
}
