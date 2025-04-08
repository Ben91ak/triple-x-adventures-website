import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, ChevronRight } from "lucide-react";

export function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Multilingual footer content
  const footerContent = {
    en: {
      description: "Authentic Arctic experiences in the heart of Swedish Lapland. Small groups, local expertise, and unforgettable adventures.",
      quickLinks: "Quick Links",
      popularAdventures: "Popular Adventures",
      contactInfo: "Contact Information",
      ourExperiences: "Our Experiences",
      accommodations: "Accommodations",
      restaurant: "JayJay's Restaurant",
      aboutUs: "About Us",
      contact: "Contact",
      blog: "Blog",
      adventures: {
        snowmobile: "Snowmobile Safari",
        dogSledding: "Dog Sledding",
        northernLights: "Northern Lights Tours",
        iceFishing: "Ice Fishing",
        arcticSurvival: "Arctic Survival",
      },
      address: "Storgatan 6F<br />93331 Arvidsjaur<br />Swedish Lapland, Sweden",
    },
    de: {
      description: "Authentische arktische Erlebnisse im Herzen von Schwedisch-Lappland. Kleine Gruppen, lokale Expertise und unvergessliche Abenteuer.",
      quickLinks: "Schnelllinks",
      popularAdventures: "Beliebte Abenteuer",
      contactInfo: "Kontaktinformationen",
      ourExperiences: "Unsere Erlebnisse",
      accommodations: "Unterkünfte",
      restaurant: "JayJay's Restaurant",
      aboutUs: "Über uns",
      contact: "Kontakt",
      blog: "Blog",
      adventures: {
        snowmobile: "Schneemobil-Safari",
        dogSledding: "Hundeschlittenfahrten",
        northernLights: "Nordlicht-Touren",
        iceFishing: "Eisfischen",
        arcticSurvival: "Arktisches Überleben",
      },
      address: "Akkavare, bei Arvidsjaur<br />Schwedisch-Lappland, Schweden",
    },
    sv: {
      description: "Autentiska arktiska upplevelser i hjärtat av Svenska Lappland. Små grupper, lokal expertis och oförglömliga äventyr.",
      quickLinks: "Snabblänkar",
      popularAdventures: "Populära Äventyr",
      contactInfo: "Kontaktinformation",
      ourExperiences: "Våra Upplevelser",
      accommodations: "Boende",
      restaurant: "JayJay's Restaurang",
      aboutUs: "Om Oss",
      contact: "Kontakt",
      blog: "Blogg",
      adventures: {
        snowmobile: "Snöskotersafari",
        dogSledding: "Hundspann",
        northernLights: "Norrskensjakt",
        iceFishing: "Isfiske",
        arcticSurvival: "Arktisk Överlevnad",
      },
      address: "Akkavare, nära Arvidsjaur<br />Svenska Lappland, Sverige",
    }
  };

  const content = footerContent[language];

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Using the global background - no section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu" style={{ zIndex: 1 }}>
        {/* Enhanced aurora effect for better visibility */}
        <div className="aurora-glow-strong absolute inset-0 opacity-30"></div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 pointer-events-none transform-gpu" style={{ zIndex: 2 }}></div>
      
      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-color/30 to-transparent" style={{ zIndex: 3 }}></div>
      
      <div className="container mx-auto px-4 pt-16 pb-8 relative" style={{ zIndex: 10 }}>
        {/* Mobile-optimized footer with improved layout */}
        <div className="mb-8 md:mb-16">
          {/* Logo, description and social icons - always full width on mobile */}
          <div className="text-center md:text-left mb-10 md:mb-0">
            <div className="mb-4 flex flex-col items-center md:items-start">
              <Link href="/">
                <img 
                  src="/weiss-grun.png" 
                  alt="Triple X Adventures" 
                  className="h-16 w-auto object-contain mb-4 hover:opacity-90 transition-opacity" 
                />
              </Link>
              <div className="w-12 h-1 bg-accent-color rounded-full"></div>
            </div>
            <p className="text-white text-opacity-80 mb-6 leading-relaxed max-w-md mx-auto md:mx-0">{content.description}</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0 -6 0"/>
                  <path d="M12.5 8.5l-1 -1.5h-2l-1 1.5"/>
                  <path d="M17.5 6.5l-1 2l2 1c1 -1 2 -3 0 -4s-4 1 -4 3c0 .3 .3 1 1 2"/>
                  <path d="M3.5 14.5c.5 .5 1.5 -.5 2 -1.5"/>
                  <path d="M9.5 16.5l-1 1c-1 1 -2 1 -2.5 .5s0 -1.5 1 -2"/>
                  <path d="M16.5 17.5l3 -2s1 -1.5 0 -2.5s-3 1 -3.5 3s1 4 3 3"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Mobile-friendly grid with auto-fit columns for other sections */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {/* Column 1 - Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center justify-center sm:justify-start">
                <span className="bg-accent-color/20 w-1.5 h-6 mr-2 rounded-full hidden sm:block"></span>
                {content.quickLinks}
              </h3>
              <ul className="space-y-2">
                {[
                  { href: "#pakete", text: content.ourExperiences },
                  { href: "#accommodations", text: content.accommodations },
                  { href: "#restaurant", text: content.restaurant },
                  { href: "#team", text: content.aboutUs },
                  { href: "#contact", text: content.contact }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-white text-opacity-80 hover:text-accent-color transition-colors flex items-center group justify-center sm:justify-start"
                    >
                      <ChevronRight 
                        size={14} 
                        className="mr-2 text-accent-color/50 group-hover:translate-x-1 transition-transform" 
                      />
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 2 - Popular Adventures */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center justify-center sm:justify-start">
                <span className="bg-accent-color/20 w-1.5 h-6 mr-2 rounded-full hidden sm:block"></span>
                {content.popularAdventures}
              </h3>
              <ul className="space-y-2">
                {[
                  { href: "#pakete", text: content.adventures.snowmobile },
                  { href: "#pakete", text: content.adventures.dogSledding },
                  { href: "#pakete", text: content.adventures.northernLights },
                  { href: "#pakete", text: content.adventures.iceFishing }
                ].map((adventure, index) => (
                  <li key={index}>
                    <a 
                      href={adventure.href} 
                      className="text-white text-opacity-80 hover:text-accent-color transition-colors flex items-center group justify-center sm:justify-start"
                    >
                      <ChevronRight 
                        size={14} 
                        className="mr-2 text-accent-color/50 group-hover:translate-x-1 transition-transform" 
                      />
                      {adventure.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3 - Contact Info */}
            <div className="text-center sm:text-left col-span-1 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center justify-center sm:justify-start">
                <span className="bg-accent-color/20 w-1.5 h-6 mr-2 rounded-full hidden sm:block"></span>
                {content.contactInfo}
              </h3>
              <ul className="space-y-4">
                <li className="flex flex-col sm:flex-row items-center sm:items-start">
                  <div className="mb-2 sm:mb-0 sm:mr-3 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm">
                    <MapPin size={16} />
                  </div>
                  <span 
                    className="text-white text-opacity-80" 
                    dangerouslySetInnerHTML={{ __html: content.address }} 
                  />
                </li>
                <li className="flex flex-col sm:flex-row items-center sm:items-center">
                  <div className="mb-2 sm:mb-0 sm:mr-3 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm">
                    <Phone size={16} />
                  </div>
                  <span className="text-white text-opacity-80">+46 (0) 70 357 5455</span>
                </li>
                <li className="flex flex-col sm:flex-row items-center sm:items-center">
                  <div className="mb-2 sm:mb-0 sm:mr-3 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm">
                    <Mail size={16} />
                  </div>
                  <span className="text-white text-opacity-80">info@triple-x-adventures.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright Section - simplified for mobile */}
        <div className="border-t border-white/5 pt-6 mt-6 text-center">
          <p className="text-white text-opacity-70 text-sm">{t.footer.copyright}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 px-2">
            {[
              { href: "#", text: t.footer.privacyPolicy },
              { href: "#", text: t.footer.termsConditions },
              { href: "#", text: t.footer.imprint }
            ].map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-white text-opacity-70 text-sm hover:text-accent-color transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}