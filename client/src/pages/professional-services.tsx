import { memo, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { GlobalBackground } from '@/components/layout/background-fixed';
import { BackToTop } from '@/components/ui/back-to-top';
import { SEO } from '@/components/seo/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/translations';
import { motion } from 'framer-motion';
import { optimizePageImages } from '@/utils/performance-optimizer';
import { preloadAllCriticalImages } from '@/utils/image-preloader';
import { TrustedPartnersSection } from '@/components/trusted-partners-section';

const ProfessionalServices = memo(function ProfessionalServices() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Run image optimization and preloading when component mounts
  useEffect(() => {
    optimizePageImages();
    preloadAllCriticalImages();
  }, [language]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Professional & Corporate Services in Swedish Lapland",
    "provider": {
      "@type": "Organization",
      "name": "Triple X Adventures",
      "url": "https://triplexadventures.com"
    }
  };

  return (
    <article className="font-opensans text-slate relative" itemScope itemType="https://schema.org/Service">
      <SEO
        title="Professional Services | Triple X Adventures"
        description="Tailored solutions for corporate groups, film productions, and exclusive collaborations in Swedish Lapland."
        structuredData={structuredData}
      />

      {/* Enhanced unified animated background with starry night effect */}
      <GlobalBackground intensity="high" starDensity="dense" />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        {/* Critical path section - load immediately */}
        <Header />
        
        {/* Back to Top button */}
        <BackToTop />

        <main>
          {/* Hero Section - Modern style */}
          <section className="py-24 text-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg leading-tight mx-auto">
                    {t.professionalServices.hero.title}
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-lg mx-auto">
                    {t.professionalServices.hero.subtitle}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <a href="#contact" style={{ backgroundColor: 'rgb(149, 204, 47)' }} className="text-white px-6 py-3 rounded-lg font-bold custom-button hover:shadow-lg transition-all">
                      {t.professionalServices.hero.cta.contact}
                    </a>
                    <a href="#services" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold custom-button hover:shadow-lg transition-all">
                      {t.professionalServices.hero.cta.explore}
                    </a>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-video md:aspect-square group">
                    <img 
                      src="/images/Professional Services.jpg" 
                      alt="Professional services in Swedish Lapland" 
                      /* Option 1 – closest preset */
 /* Option 1 – closest preset */
 className="w-full h-full object-cover scale-110 transition-transform duration-700 ease-in-out group-hover:scale-125"

 /* Option 2 – arbitrary value (requires Tailwind v3.2+) */
 /* className="w-full h-full object-cover scale-[1.15] transition-transform duration-700 ease-in-out group-hover:scale-[1.25]" */

 /* Option 2 – arbitrary value (requires Tailwind v3.2+) */
 /* className="w-full h-full object-cover scale-[1.15] transition-transform duration-700 ease-in-out group-hover:scale-[1.25]" */
                      style={{ transformOrigin: 'center center' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/professional-services-hero.jpg';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="text-center px-8 py-6 rounded-xl bg-midnight/80 backdrop-blur-sm border border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-300 w-4/5 max-w-md">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Arctic Excellence</h3>
                        <p className="text-base md:text-lg text-white">Premium corporate experiences</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Partners and Sponsors Section */}
          <TrustedPartnersSection />

          {/* Services Grid - Redesigned with modern gradient cards */}
          <section id="services" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="mb-12 text-center max-w-4xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.professionalServices.services.title}</h2>
                <p className="text-slate-300 max-w-2xl mx-auto">{t.professionalServices.services.subtitle}</p>
              </motion.div>
              
              <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
                {/* Corporate & Industry Events */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full"
                >
                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-8 rounded-2xl shadow-xl border border-white/5 hover:shadow-2xl transition-all duration-300 text-center">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(149, 204, 47, 0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="rgb(149, 204, 47)" style={{ color: 'rgb(149, 204, 47)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{t.professionalServices.services.corporate.title}</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-slate-300 mt-1">{t.professionalServices.services.corporate.description}</p>
                      <p className="text-slate-200">{t.professionalServices.services.corporate.subtitle}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{t.professionalServices.services.corporate.drivingEvents.title}</h4>
                        <ul className="list-none text-slate-300 space-y-2 pl-0 inline-block text-center">
                          {t.professionalServices.services.corporate.drivingEvents.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{t.professionalServices.services.corporate.teambuilding.title}</h4>
                        <ul className="list-none space-y-1 text-slate-200 pl-0 inline-block text-center">
                          {t.professionalServices.services.corporate.teambuilding.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{t.professionalServices.services.corporate.retreats.title}</h4>
                        <ul className="list-none space-y-1 text-slate-200 pl-0 inline-block text-center">
                          {t.professionalServices.services.corporate.retreats.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{t.professionalServices.services.corporate.productLaunches.title}</h4>
                        <ul className="list-none space-y-1 text-slate-200 pl-0 inline-block text-center">
                          {t.professionalServices.services.corporate.productLaunches.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="w-full flex items-center justify-center">
                  <div className="w-24 h-px bg-[rgb(149,204,47)]/30"></div>
                </div>

                {/* Production Support */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-full"
                >
                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-8 rounded-2xl shadow-xl border border-white/5 hover:shadow-2xl transition-all duration-300 text-center">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(149, 204, 47, 0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="rgb(149, 204, 47)" style={{ color: 'rgb(149, 204, 47)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{t.professionalServices.services.production.title}</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-slate-200">{t.professionalServices.services.production.description}</p>
                    </div>
                    
                    <ul className="list-none space-y-2 text-slate-200 pl-0 inline-block text-center">
                      {t.professionalServices.services.production.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="w-full flex items-center justify-center">
                  <div className="w-24 h-px bg-[rgb(149,204,47)]/30"></div>
                </div>

                {/* Custom VIP Experiences */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-8 rounded-2xl shadow-xl border border-white/5 hover:shadow-2xl transition-all duration-300 text-center">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(149, 204, 47, 0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="rgb(149, 204, 47)" style={{ color: 'rgb(149, 204, 47)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{t.professionalServices.services.vip.title}</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-slate-200">{t.professionalServices.services.vip.description}</p>
                    </div>
                    
                    <ul className="list-none space-y-2 text-slate-200 pl-0 inline-block text-center">
                      {t.professionalServices.services.vip.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="w-full flex items-center justify-center">
                  <div className="w-24 h-px bg-[rgb(149,204,47)]/30"></div>
                </div>

                {/* Consulting & Planning */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-full"
                >
                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-8 rounded-2xl shadow-xl border border-white/5 hover:shadow-2xl transition-all duration-300 text-center">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(149, 204, 47, 0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="rgb(149, 204, 47)" style={{ color: 'rgb(149, 204, 47)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{t.professionalServices.services.consulting.title}</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-slate-200">{t.professionalServices.services.consulting.description}</p>
                    </div>
                    
                    <ul className="list-none space-y-2 text-slate-200 pl-0 inline-block text-center">
                      {t.professionalServices.services.consulting.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section - With animated counters */}
          <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 to-midnight/10 z-0"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
              >
                <div className="p-6 rounded-xl backdrop-blur-sm bg-midnight/30 border border-white/5 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-5xl font-bold text-white mb-3">{t.professionalServices.stats.clients.number}</h3>
                  <div className="w-12 h-1 mx-auto mb-4" style={{ backgroundColor: 'rgb(149, 204, 47)' }}></div>
                  <p className="text-slate-200">
                    {t.professionalServices.stats.clients.text}
                  </p>
                </div>
                
                <div className="p-6 rounded-xl backdrop-blur-sm bg-midnight/30 border border-white/5 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-5xl font-bold text-white mb-3">{t.professionalServices.stats.services.number}</h3>
                  <div className="w-12 h-1 mx-auto mb-4" style={{ backgroundColor: 'rgb(149, 204, 47)' }}></div>
                  <p className="text-slate-200">
                    {t.professionalServices.stats.services.text}
                  </p>
                </div>
                
                <div className="p-6 rounded-xl backdrop-blur-sm bg-midnight/30 border border-white/5 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-5xl font-bold text-white mb-3">{t.professionalServices.stats.satisfaction.number}</h3>
                  <div className="w-12 h-1 mx-auto mb-4" style={{ backgroundColor: 'rgb(149, 204, 47)' }}></div>
                  <p className="text-slate-200">
                    {t.professionalServices.stats.satisfaction.text}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact CTA - Redesigned with modern style */}
          {/* Drivecenter Arena Partnership Section */}
          <section className="py-24 bg-gradient-to-b from-transparent to-black/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {t.professionalServices.drivecenter.title}
                </h2>
                <p className="text-slate-300 max-w-3xl mx-auto">
                  {t.professionalServices.drivecenter.subtitle}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="text-slate-200 mb-6">
                    {t.professionalServices.drivecenter.description}
                  </p>

                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-6 rounded-xl border border-white/5 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">{t.professionalServices.drivecenter.highlights.title}</h3>
                    <ul className="space-y-3">
                      {t.professionalServices.drivecenter.highlights.items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[rgb(149,204,47)] mr-2">•</span>
                          <span className="text-slate-200" dangerouslySetInnerHTML={{ __html: item }}></span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{t.professionalServices.drivecenter.experience.title}</h3>
                    <p className="text-slate-200">
                    {t.professionalServices.drivecenter.experience.description}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <div className="relative py-8 px-4 flex justify-center items-center">
                        <img 
                          src="/images/Drivecenter/Drivecenter-Arena-Karta-Omrade-Detaljerad-Responsiv-Vit-Bakg-2023-03.svg" 
                          alt="Drivecenter Arena track map" 
                          className="w-full max-w-4xl transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
                          <img 
                            src="/images/Drivecenter/Drivecenter-Arena-white-logo-small-web.svg" 
                            alt="Drivecenter Arena Logo" 
                            className="h-8 md:h-10"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg aspect-video group">
                      <img 
                        src="/images/Drivecenter/Drivecenter-Arena-Porsche-PCCS_Close-racing.jpg" 
                        alt="Drivecenter offroad track" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-lg aspect-video group">
                      <img 
                        src="/images/Drivecenter/Drift-Masters-European-Championship-Bilsport-Racing-Racingbana-Drivecenter-Arena-DMEC-2022-Sweden-14-scaled.webp" 
                        alt="Drivecenter Fan Area" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="col-span-2 mt-4">
                      <div className="bg-gradient-to-br from-[#1a3f50] to-midnight p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-semibold">{t.professionalServices.drivecenter.cta.title}</h4>
                          <p className="text-slate-300 text-sm">{t.professionalServices.drivecenter.cta.subtitle}</p>
                        </div>
                        <a 
                          href="#contact" 
                          className="text-white px-4 py-2 rounded-lg font-medium text-sm custom-button hover:shadow-lg transition-all whitespace-nowrap hover:bg-accent/90"
                        >
                          {t.professionalServices.drivecenter.cta.button}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="contact" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent z-0"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-8 md:p-12 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm relative overflow-hidden max-w-4xl mx-auto">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[rgb(149,204,47)]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[rgb(149,204,47)]/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
                      {t.professionalServices.contact.title}
                    </h2>
                    <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'rgb(149, 204, 47)' }}></div>
                    <p className="text-slate-200 text-center mb-10 max-w-2xl mx-auto">
                      {t.professionalServices.contact.description}
                    </p>

                    <div className="max-w-2xl mx-auto text-center p-8 bg-midnight/30 rounded-xl border border-[rgb(149,204,47)]/30">
                      <div className="text-[rgb(149,204,47)] mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                      <p className="text-slate-200 text-lg mb-6">
                        Ready to discuss your professional services needs? Email us directly at{' '}
                        <a 
                          href="mailto:info@triple-x-adventures.com" 
                          className="text-[rgb(149,204,47)] hover:text-white font-medium transition-colors underline"
                        >
                          info@triple-x-adventures.com
                        </a>
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <a 
                          href="/contact" 
                          className="bg-[rgb(149,204,47)] hover:bg-[rgba(149,204,47,0.9)] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(149,204,47,0.5)] transform hover:-translate-y-1 flex items-center gap-2"
                        >
                          <span>Visit Contact Page</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                        
                        <a 
                          href="tel:+46703575455" 
                          className="border border-[rgb(149,204,47)] text-[rgb(149,204,47)] hover:bg-[rgb(149,204,47)]/10 font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>Call Us</span>
                        </a>
                      </div>
                    </div>


                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Placeholder for removed Partners section - it's now above the Services section */}
        </main>

        <Footer />
      </div>
    </article>
  );
});

export default ProfessionalServices;

// Enable Static Site Generation with Incremental Static Regeneration
export async function getStaticProps() {
  // You can fetch any data needed for the professional services page here
  
  return {
    props: {
      // Any props you want to pass to the ProfessionalServices component
    },
    // Revalidate every 60 seconds (1 minute)
    // Adjust this value based on how frequently your content changes
    revalidate: 60,
  };
}
