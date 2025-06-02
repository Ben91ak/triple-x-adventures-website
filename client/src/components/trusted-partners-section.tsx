import { memo } from 'react';
import { motion } from 'framer-motion';

// Only export the TrustedPartnersSection component
export const TrustedPartnersSection = memo(function TrustedPartnersSection() {

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center my-12">
            <div className="flex-grow h-px bg-white/10"></div>
            <h3 className="mx-4 text-xl text-white/60 font-medium">{'Our Trusted Partners'}</h3>
            <div className="flex-grow h-px bg-white/10"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            {/* Partner Logo Images */}
            {[
              { name: 'AE', src: '/images/Partnerlogos/AE.svg' },
              { name: 'AMG', src: '/images/Partnerlogos/AMG.svg' },
              { name: 'Audi', src: '/images/Partnerlogos/Audi.svg' },
              { name: 'BGE', src: '/images/Partnerlogos/BGE.svg' },
              { name: 'Laponia Resort', src: '/images/Partnerlogos/Laponia resort.svg' },
              { name: 'Latitude', src: '/images/Partnerlogos/Latitude web.svg' },
              { name: 'Porsche Experience', src: '/images/Partnerlogos/Porsche exp.svg' },
              { name: 'Skidoo', src: '/images/Partnerlogos/Skidoo.svg' },
              { name: 'TCB', src: '/images/Partnerlogos/TCB.svg' },
              { name: 'TH', src: '/images/Partnerlogos/TH.svg' },
              { name: 'Volkswagen', src: '/images/Partnerlogos/VW Logo.svg' },
              { name: 'Drivecenter Arena', src: '/images/Drivecenter/Drivecenter-Arena-white-logo-small-web.svg' }
            ].map((partner) => (
              <div 
                key={partner.name}
                className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex items-center justify-center w-[40%] sm:w-[30%] md:w-[15%] h-[80px] bg-white/5 rounded-lg p-4"
                role="img"
                aria-label={`${partner.name} - Trusted partner`}
              >
                <img 
                  src={partner.src} 
                  alt={`${partner.name} logo`} 
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});
