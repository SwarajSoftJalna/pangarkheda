interface GalleryHeaderProps {
  heading: string;
  subheading: string;
}

export default function GalleryHeader({ heading, subheading }: GalleryHeaderProps) {
  if (!heading && !subheading) {
    return null;
  }

  // Function to highlight specific words in green
  const renderHeadingWithHighlight = (text: string) => {
    // Split by common words that should be highlighted in green
    const wordsToHighlight = ['आरोग्य', 'कटिबद्ध', 'सेवा', 'विकास', 'प्रगती'];
    
    let result = text;
    wordsToHighlight.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, `<span class="text-green-600">$1</span>`);
    });
    
    return result;
  };

  return (
    <div className="text-center mb-12">
      {heading && (
        <h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          dangerouslySetInnerHTML={{ __html: renderHeadingWithHighlight(heading) }}
        />
      )}
      
      <div className="w-16 h-1 bg-green-600 mx-auto mb-6"></div>
      
      {subheading && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
}
