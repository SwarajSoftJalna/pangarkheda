interface GovtLogosProps {
  logos: string[];
}

export default function GovtLogos({ logos }: GovtLogosProps) {
  if (!logos || logos.length === 0) {
    return null;
  }

  // Filter out empty logo URLs
  const validLogos = logos.filter(logo => logo && logo.trim() !== '');

  if (validLogos.length === 0) {
    return null;
  }

  return (
    <section className="py-10 bg-white border-t-2 border-green-600">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {validLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Government Logo ${index + 1}`}
                  className="h-16 md:h-20 w-auto max-w-[120px] md:max-w-[150px] object-contain transition-transform duration-300 hover:scale-110 filter grayscale hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
