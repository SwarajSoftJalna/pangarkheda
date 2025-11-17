interface GovtLogosProps {
  logos: string[];
}

const govtLogos: GovtLogosProps = {
  logos: [
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395756/atalbhujal_iqvjfr.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395792/digitalIndia_t6xopn.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395808/g20_qvaoq9.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395824/jal_rptord.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395839/merigovt_eky0n8.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395883/maharastrashanshan_d1fhop.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395900/panchayatraj_k9jtzu.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395913/panchayatvikas_en2ylp.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395928/satamevjayate_w3pvxo.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395939/vasundhara_aseg5n.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395948/yojanavikas_stdqsi.png'
  ]
};

export default function GovtLogos() {

  // Filter out empty logo URLs
  const validLogos = govtLogos.logos.filter(logo => logo && logo.trim() !== '');

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
                  className="h-16 md:h-20 w-auto max-w-[120px] md:max-w-[150px] object-contain transition-transform duration-300 hover:scale-110 filter hover:grayscale-0"
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
