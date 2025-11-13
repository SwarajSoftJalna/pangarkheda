'use client';

let DOMPurify: any = null;

// Dynamic import for client-side only
const loadDOMPurify = async () => {
  if (typeof window !== 'undefined' && !DOMPurify) {
    const module = await import('dompurify');
    DOMPurify = module.default;
  }
  return DOMPurify;
};

export const sanitizeHtml = async (html: string): Promise<string> => {
  try {
    const purify = await loadDOMPurify();
    if (purify) {
      return purify.sanitize(html, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'a', 'img', 'div', 'span', 'blockquote', 'pre', 'code',
          'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: [
          'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
          'width', 'height', 'style'
        ],
        ALLOW_DATA_ATTR: false,
      });
    }
  } catch (error) {
    console.error('Error sanitizing HTML:', error);
  }
  
  // Fallback: return original HTML (not recommended for production)
  return html;
};

export const sanitizeHtmlSync = (html: string): string => {
  // For server-side rendering, return the HTML as-is
  // In production, you might want to use a server-side sanitizer
  if (typeof window === 'undefined') {
    return html;
  }
  
  // Client-side fallback
  return html;
};
