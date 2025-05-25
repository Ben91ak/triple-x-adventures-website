import React from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

type SocialLink = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Multilingual footer content
  const footerContent = {
    en: {
      description: "Authentic Arctic experiences in the heart of Swedish Lapland. Small groups, local expertise, and unforgettable adventures.",


      contactInfo: "Contact Information",
      // Removed unused properties
      address: "Storgatan 6F<br />93331 Arvidsjaur<br />Swedish Lapland, Sweden",
      imprint: "Imprint",
    },
    de: {
      description: "Authentische arktische Erlebnisse im Herzen von Schwedisch-Lappland. Kleine Gruppen, lokale Expertise und unvergessliche Abenteuer.",


      contactInfo: "Kontaktinformationen",
      // Removed unused properties
      address: "Storgatan 6F<br />93331 Arvidsjaur<br />Swedish Lapland, Sweden",
      imprint: "Impressum",
    },
    sv: {
      description: "Autentiska arktiska upplevelser i hjärtat av Svenska Lappland. Små grupper, lokal expertis och oförglömliga äventyr.",


      contactInfo: "Kontaktinformation",
      // Removed unused properties
      address: "Storgatan 6F<br />93331 Arvidsjaur<br />Swedish Lapland, Sweden",
      imprint: "Imprint",
    }
  };

  const content = footerContent[language];

  // Social media links
  const socialLinks: SocialLink[] = [
    { icon: <Facebook size={15} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={15} />, label: "Instagram", href: "http://instagram.com/triplexadventures" },
    { icon: <Youtube size={15} />, label: "YouTube", href: "#" },
    { 
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" role="img">
          <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0 -6 0"/>
          <path d="M12.5 8.5l-1 -1.5h-2l-1 1.5"/>
          <path d="M17.5 6.5l-1 2l2 1c1 -1 2 -3 0 -4s-4 1 -4 3c0 .3 .3 1 1 2"/>
          <path d="M3.5 14.5c.5 .5 1.5 -.5 2 -1.5"/>
          <path d="M9.5 16.5l-1 1c-1 1 -2 1 -2.5 .5s0 -1.5 1 -2"/>
          <path d="M16.5 17.5l3 -2s1 -1.5 0 -2.5s-3 1 -3.5 3s1 4 3 3"/>
        </svg>
      ), 
      label: "TripAdvisor", 
      href: "#" 
    }
  ];

  // Legal links are directly used in the JSX

  return (
    <>

      <footer className="relative overflow-hidden border-t border-white/5" role="contentinfo">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu" style={{ zIndex: 1 }} aria-hidden="true">
          <div className="aurora-glow-strong absolute inset-0 opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 pointer-events-none transform-gpu" style={{ zIndex: 2 }} aria-hidden="true"></div>
        
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-color/30 to-transparent" style={{ zIndex: 3 }} aria-hidden="true"></div>
        
        {/* Mobile Footer - Only visible on small screens */}
        <div className="md:hidden container mx-auto px-4 py-8 relative z-10">
          <div className="space-y-8">
            {/* Logo and Description */}
            <div className="flex flex-col items-center">
              <Link href="/" className="inline-block mb-4">
                <img 
                  src="/weiss-grun.png" 
                  alt="Triple X Adventures" 
                  className="h-14 w-auto" 
                  width="180"
                  height="56"
                />
              </Link>
              <div className="w-10 h-1 bg-accent-color rounded-full mb-4" aria-hidden="true"></div>
              <p className="text-white text-opacity-80 mb-5 text-center text-sm">{content.description}</p>
            </div>
            
            {/* Contact Information Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-white text-center">
                {content.contactInfo}
              </h2>
              <address className="not-italic">
                <ul className="space-y-4 list-none p-0">
                  <li className="flex items-start">
                    <div className="mr-3 mt-0.5 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm flex-shrink-0" aria-hidden="true">
                      <MapPin size={15} />
                    </div>
                    <span 
                      className="text-white text-opacity-80" 
                      dangerouslySetInnerHTML={{ __html: content.address }} 
                    />
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm flex-shrink-0" aria-hidden="true">
                      <Phone size={15} />
                    </div>
                    <a href="tel:+46703575455" className="text-white text-opacity-80 hover:text-accent-color transition-colors">+46 (0) 70 357 5455</a>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm flex-shrink-0" aria-hidden="true">
                      <Mail size={15} />
                    </div>
                    <a href="mailto:info@triple-x-adventures.com" className="text-white text-opacity-80 hover:text-accent-color transition-colors">info@triple-x-adventures.com</a>
                  </li>
                </ul>
              </address>
            </div>
            
            {/* Social Media Links */}
            <nav aria-label="Social Media Links" className="flex justify-center">
              <ul className="flex space-x-4 justify-center list-none p-0">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a 
                      href={social.href} 
                      className="w-10 h-10 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors"
                      aria-label={social.label}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Desktop Footer - Hidden on small screens */}
        <div className="hidden md:block container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
          {/* Main footer content */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
              {/* Logo and company info */}
              <div className="flex flex-col items-center md:items-start md:max-w-md">
                <Link href="/" className="inline-block mb-5">
                  <img 
                    src="/weiss-grun.png" 
                    alt="Triple X Adventures" 
                    className="h-16 w-auto" 
                    width="200"
                    height="64"
                  />
                </Link>
                <div className="w-12 h-1 bg-accent-color rounded-full mx-auto md:mx-0 mb-5" aria-hidden="true"></div>
                <p className="text-white text-opacity-80 mb-6 leading-relaxed text-center md:text-left">{content.description}</p>
                
                {/* Social icons */}
                <nav aria-label="Social Media Links" className="mb-6">
                  <ul className="flex space-x-4 justify-center md:justify-start list-none p-0">
                    {socialLinks.map((social, index) => (
                      <li key={index}>
                        <a 
                          href={social.href} 
                          className="w-10 h-10 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors"
                          aria-label={social.label}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {social.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              {/* Contact Info */}
              <div className="md:max-w-sm">
                <section aria-labelledby="contact-heading">
                  <h2 id="contact-heading" className="text-lg font-semibold mb-5 text-white flex items-center justify-center md:justify-start">
                    <span className="bg-accent-color/20 w-1.5 h-6 mr-2.5 rounded-full inline-block" aria-hidden="true"></span>
                    <span>{content.contactInfo}</span>
                  </h2>
                  <address className="not-italic">
                    <ul className="space-y-4 list-none p-0">
                      <li className="flex items-start">
                        <div className="mr-3 mt-0.5 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm flex-shrink-0" aria-hidden="true">
                          <MapPin size={15} />
                        </div>
                        <span 
                          className="text-white text-opacity-80" 
                          dangerouslySetInnerHTML={{ __html: content.address }} 
                        />
                      </li>
                      <li className="flex items-center">
                        <div className="mr-3 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm flex-shrink-0" aria-hidden="true">
                          <Phone size={15} />
                        </div>
                        <a href="tel:+46703575455" className="text-white text-opacity-80 hover:text-accent-color transition-colors">+46 (0) 70 357 5455</a>
                      </li>
                      <li className="flex items-center">
                        <div className="mr-3 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm flex-shrink-0" aria-hidden="true">
                          <Mail size={15} />
                        </div>
                        <a href="mailto:info@triple-x-adventures.com" className="text-white text-opacity-80 hover:text-accent-color transition-colors">info@triple-x-adventures.com</a>
                      </li>
                    </ul>
                  </address>
                </section>
              </div>
            </div>
          </div>
        </div>
        {/* Common footer section for both mobile and desktop - copyright and legal links in one line */}
        <div className="border-t border-white/10 pt-6 pb-6 mt-12 flex flex-wrap justify-center items-center gap-x-6 text-sm md:text-base">
          {/* Copyright */}
          <p className="text-white/70">
            &copy; {new Date().getFullYear()} TRIPLE X ADVENTURES AB. {t.footer.allRightsReserved || 'All rights reserved.'}
          </p>
          
          {/* Legal links in the same line */}
          <div className="flex flex-wrap justify-center items-center space-x-4 md:space-x-6">
            <Link href="/imprint" className="text-white/70 hover:text-accent-color transition-colors">
              {content.imprint}
            </Link>
            <span className="text-white/40">|</span>
            <Link href="/terms" className="text-white/70 hover:text-accent-color transition-colors">
              {t.footer.termsConditions}
            </Link>
            <span className="text-white/40">|</span>
            <Link href="/privacy-policy" className="text-white/70 hover:text-accent-color transition-colors">
              {t.footer.privacyPolicy}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
