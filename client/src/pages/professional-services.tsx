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
          <section className="py-24 text-left">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg leading-tight">
                    Professional <span style={{ color: 'rgb(149, 204, 47)' }}>Services</span> in Swedish Lapland
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-lg">
                    Tailored solutions for corporate groups, film productions, and exclusive collaborations in the Arctic wilderness.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href="#contact" style={{ backgroundColor: 'rgb(149, 204, 47)' }} className="text-white px-6 py-3 rounded-lg font-bold custom-button hover:shadow-lg transition-all">
                      GET IN TOUCH
                    </a>
                    <a href="#services" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold custom-button hover:shadow-lg transition-all">
                      EXPLORE SERVICES
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
                      className="w-full h-full object-cover scale-115 transition-transform duration-700 ease-in-out group-hover:scale-125"
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

          {/* Services Grid - Redesigned with modern gradient cards */}
          <section id="services" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="mb-12 text-center max-w-4xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Our Professional <span style={{ color: 'rgb(149, 204, 47)' }}>Services</span>
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">Tailored Arctic solutions for brands, productions & events in the far north</p>
              </motion.div>
              
              <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
                {/* Corporate & Industry Events */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full"
                >
                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-8 rounded-2xl shadow-xl border border-white/5 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(149, 204, 47, 0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="rgb(149, 204, 47)" style={{ color: 'rgb(149, 204, 47)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Corporate & Industry Events</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-slate-200 mb-3">Full-service planning and execution for companies, teams, and automotive brands.</p>
                      <p className="text-slate-200">From creative concepts to on-ground logistics – we bring Arctic dreams to life.</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Driving Events & Car Testing</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-200">
                          <li>Ice tracks, snow-covered trails, and custom-built courses for winter driving experiences</li>
                          <li>Vehicle testing under extreme Arctic conditions</li>
                          <li>Support with permits, safety, and local partnerships</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Teambuilding Adventures</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-200">
                          <li>Snowmobile safaris, survival training, dog sledding – designed for bonding and challenge</li>
                          <li>Custom group programs with tailored itineraries</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Winter Retreats & Leadership Training</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-200">
                          <li>Cozy stays in chalets, fireside dinners at JayJay's, and workshops in the wild</li>
                          <li>Designed to build trust, resilience, and team spirit</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Product Launches & Masterclasses</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-200">
                          <li>Stand-out locations, full event planning, Arctic logistics & media support</li>
                          <li>Create unforgettable brand moments under the Northern Lights</li>
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
                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-8 rounded-2xl shadow-xl border border-white/5 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(149, 204, 47, 0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="rgb(149, 204, 47)" style={{ color: 'rgb(149, 204, 47)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Production Support</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-slate-200">The perfect Arctic backdrop – and everything behind the scenes to make it work.</p>
                    </div>
                    
                    <ul className="list-disc pl-5 space-y-2 text-slate-200">
                      <li>Location Scouting & Permits (Frozen lakes, forests, remote wilderness)</li>
                      <li>Arctic logistics: Transport, fuel, satellite comms & heated facilities</li>
                      <li>Experienced Guides & Safety Experts for remote film support</li>
                      <li>Snowmobiles and off-road transport designed for rugged conditions</li>
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
                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-8 rounded-2xl shadow-xl border border-white/5 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(149, 204, 47, 0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="rgb(149, 204, 47)" style={{ color: 'rgb(149, 204, 47)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Custom VIP Experiences</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-slate-200">Exclusive experiences for brand ambassadors, high-end clients, and press.</p>
                    </div>
                    
                    <ul className="list-disc pl-5 space-y-2 text-slate-200">
                      <li>Luxury Arctic Adventures with private guides & premium touches</li>
                      <li>Access to untouched nature & secret locations</li>
                      <li>Brand Collaborations & Event Hosting</li>
                      <li>Ambassador trips, content creation, and Arctic storytelling</li>
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
                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-8 rounded-2xl shadow-xl border border-white/5 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'rgba(149, 204, 47, 0.2)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="rgb(149, 204, 47)" style={{ color: 'rgb(149, 204, 47)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Consulting & Planning</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-slate-200">Your strategic partner for projects in the North.</p>
                    </div>
                    
                    <ul className="list-disc pl-5 space-y-2 text-slate-200">
                      <li>Concept development & logistics for Arctic events</li>
                      <li>Expertise in handling harsh climates and remote environments</li>
                      <li>Local partnerships with landowners and suppliers</li>
                      <li>Full-service coordination from idea to execution</li>
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
                  <h3 className="text-5xl font-bold text-white mb-3">500+</h3>
                  <div className="w-12 h-1 mx-auto mb-4" style={{ backgroundColor: 'rgb(149, 204, 47)' }}></div>
                  <p className="text-slate-200">
                    Satisfied Clients and Adventure Enthusiasts
                  </p>
                </div>
                
                <div className="p-6 rounded-xl backdrop-blur-sm bg-midnight/30 border border-white/5 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-5xl font-bold text-white mb-3">25+</h3>
                  <div className="w-12 h-1 mx-auto mb-4" style={{ backgroundColor: 'rgb(149, 204, 47)' }}></div>
                  <p className="text-slate-200">
                    Professional Services and Custom Experiences
                  </p>
                </div>
                
                <div className="p-6 rounded-xl backdrop-blur-sm bg-midnight/30 border border-white/5 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-5xl font-bold text-white mb-3">98.3%</h3>
                  <div className="w-12 h-1 mx-auto mb-4" style={{ backgroundColor: 'rgb(149, 204, 47)' }}></div>
                  <p className="text-slate-200">
                    Customer Satisfaction Rating
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
                  Partnering with <span style={{ color: 'rgb(149, 204, 47)' }}>Drivecenter Arena</span>
                </h2>
                <p className="text-slate-300 max-w-3xl mx-auto">
                  Elevating Arctic Motorsport Experiences
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="text-slate-200 mb-6">
                    We're thrilled to collaborate with Drivecenter Arena, Scandinavia's longest and most versatile racing facility, located in Fällfors, Västerbotten County. Transformed from a former military airbase, this 4,270-meter track stands as Sweden's premier motorsport destination.
                  </p>

                  <div className="bg-gradient-to-br from-midnight to-[#1a3f50] p-6 rounded-xl border border-white/5 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Key Highlights:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-[rgb(149,204,47)] mr-2">•</span>
                        <span className="text-slate-200"><strong>Scandinavia's Longest Track:</strong> A 4,270-meter circuit designed by TTI GmbH, offering 16 challenging turns that test the skills of even the most seasoned drivers.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[rgb(149,204,47)] mr-2">•</span>
                        <span className="text-slate-200"><strong>Year-Round Motorsport Hub:</strong> Hosting events from the Midnattssolsloppet under the midnight sun to the FIM Snowcross World Championship, Drivecenter Arena is a beacon for motorsport enthusiasts throughout the year.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[rgb(149,204,47)] mr-2">•</span>
                        <span className="text-slate-200"><strong>State-of-the-Art Facilities:</strong> Equipped with 24 modern pit garages, grandstands seating 5,000 spectators, and on-site accommodations, including a hotel with 76 rooms, ensuring a comprehensive experience for participants and visitors alike.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[rgb(149,204,47)] mr-2">•</span>
                        <span className="text-slate-200"><strong>Diverse Driving Experiences:</strong> From high-speed track days and drifting challenges to off-road adventures with Polaris RZRs, the arena offers a great selection of activities and services to all adrenaline levels.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[rgb(149,204,47)] mr-2">•</span>
                        <span className="text-slate-200"><strong>Comprehensive Training Programs:</strong> Providing risk and safety training, driver education, and vehicle testing services, making it a hub for both recreational and professional development.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Experience the Fusion of Speed and Arctic Wilderness</h3>
                    <p className="text-slate-200">
                    Thanks to our partnership with Drivecenter Arena, we can offer unique motorsport experiences in the stunning nature of northern Sweden. Whether you’re after high-speed action or peaceful Arctic views, this collaboration gives you a perfect mix of both.
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
                      <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video group">
                        <img 
                          src="/images/Drivecenter/Drivecenter-Arena-Karta-Omrade-Detaljerad-Responsiv-Vit-Bakg-2023-03.svg" 
                          alt="Drivecenter Arena track map" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
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
                          <h4 className="text-white font-semibold">Ready to experience Drivecenter Arena?</h4>
                          <p className="text-slate-300 text-sm">Contact us to plan your motorsport adventure</p>
                        </div>
                        <a 
                          href="#contact" 
                          style={{ backgroundColor: 'rgb(149, 204, 47)' }} 
                          className="text-white px-4 py-2 rounded-lg font-medium text-sm custom-button hover:shadow-lg transition-all whitespace-nowrap"
                        >
                          GET IN TOUCH
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
                      Let's Talk <span style={{ color: 'rgb(149, 204, 47)' }}>Arctic Business</span>
                    </h2>
                    <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'rgb(149, 204, 47)' }}></div>
                    <p className="text-slate-200 text-center mb-10 max-w-2xl mx-auto">
                      Have an idea, a team, or a project? We're ready to build it together in the Arctic.
                    </p>

                    <form className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
                      <div className="relative md:col-span-1">
                        <label className="text-white/70 text-sm block mb-1 ml-1">Your Name</label>
                        <div className="flex items-center">
                          <div className="absolute left-3 text-[rgb(149,204,47)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-midnight/50 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[rgb(149,204,47)] focus:ring-1 focus:ring-[rgb(149,204,47)] transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="relative md:col-span-1">
                        <label className="text-white/70 text-sm block mb-1 ml-1">Your Email</label>
                        <div className="flex items-center">
                          <div className="absolute left-3 text-[rgb(149,204,47)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full bg-midnight/50 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[rgb(149,204,47)] focus:ring-1 focus:ring-[rgb(149,204,47)] transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="relative md:col-span-2">
                        <label className="text-white/70 text-sm block mb-1 ml-1">Your Message</label>
                        <div className="flex">
                          <div className="absolute left-3 top-3 text-[rgb(149,204,47)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          </div>
                          <textarea
                            placeholder="Tell us about your project or idea..."
                            rows={4}
                            className="w-full bg-midnight/50 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[rgb(149,204,47)] focus:ring-1 focus:ring-[rgb(149,204,47)] transition-all duration-300"
                            required
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 flex justify-center mt-2">
                        <button 
                          type="submit"
                          className="bg-[rgb(149,204,47)] hover:bg-[rgba(149,204,47,0.9)] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(149,204,47,0.5)] transform hover:-translate-y-1 flex items-center gap-2"
                        >
                          <span>Send Message</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </form>

                    <div className="flex items-center justify-center mt-10">
                      <div className="h-px bg-white/10 flex-grow"></div>
                      <p className="text-white/70 text-center mx-4">
                        Or email us directly at{' '}
                        <a href="mailto:info@triple-x-adventures.com" className="text-[rgb(149,204,47)] hover:text-white font-medium transition-colors">
                          info@triple-x-adventures.com
                        </a>
                      </p>
                      <div className="h-px bg-white/10 flex-grow"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Partners and Sponsors Section */}
          <section className="pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center my-12">
                  <div className="flex-grow h-px bg-white/10"></div>
                  <h3 className="mx-4 text-xl text-white/60 font-medium">Our Trusted Partners</h3>
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
                  ].map((partner, index) => (
                    <div 
                      key={index}
                      className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex items-center justify-center w-[40%] sm:w-[30%] md:w-[15%] h-[80px] bg-white/5 rounded-lg p-4"
                    >
                      <img 
                        src={partner.src} 
                        alt={`${partner.name} logo`} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </article>
  );
});

export default ProfessionalServices;
