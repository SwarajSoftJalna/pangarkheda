interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  centered = true 
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <div className={`h-1 w-16 bg-green-600 mb-4 ${centered ? 'mx-auto' : ''}`}></div>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
