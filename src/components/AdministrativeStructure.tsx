interface AdministrativeStructureProps {
  heading: string;
  image: string;
}

export default function AdministrativeStructure({ heading, image }: AdministrativeStructureProps) {
  if (!heading && !image) {
    return null;
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {heading && (
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                {heading}
              </h2>
              <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
            </div>
          )}
          
          {image && (
            <div className="rounded-lg p-6">
              <div className="flex justify-center">
                <img
                  src={image}
                  alt={heading || 'Administrative Structure'}
                  className="max-w-full h-auto"
                  style={{ maxHeight: '800px' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
