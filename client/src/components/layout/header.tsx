import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { LanguageSelector } from "@/components/ui/language-selector";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
  const t = useTranslation(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinkClasses = "nav-link relative text-sm tracking-wide font-medium text-secondary-text transition-colors duration-200 hover:text-primary-text after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent-color after:transition-all hover:after:w-full";

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled 
          ? 'py-3 bg-dark-bg/90 border-b border-divider-color shadow-sm' 
          : 'py-5 bg-dark-bg/50'
      }`} 
      id="navbar"
    >
      <nav className="text-primary-text">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                {/* Logo with gradient effect */}
                <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 overflow-hidden">
                  <span className="text-lg font-bold text-white">X</span>
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <span className="font-bold text-xl tracking-tight">
                  <span className="text-primary-text">TRIPLE</span>
                  <span className="text-accent-color ml-1">X</span>
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className={navLinkClasses}>{t.nav.home}</a>
              <a href="#pakete" className={navLinkClasses}>{t.nav.packages}</a>
              <a href="#about" className={navLinkClasses}>{t.nav.about}</a>
              <a href="#restaurant" className={navLinkClasses}>{t.nav.restaurant}</a>
              <a href="#accommodations" className={navLinkClasses}>{t.nav.accommodations}</a>
              <a href="#gallery" className={navLinkClasses}>{t.nav.gallery}</a>
              <a href="#contact" className={navLinkClasses}>{t.nav.contact}</a>
              <LanguageSelector />
            </div>
            
            <div className="md:hidden flex items-center space-x-3">
              <LanguageSelector className="mr-1" />
              <button 
                type="button" 
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 focus:outline-none"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d={mobileMenuOpen 
                      ? "M18 6L6 18M6 6l12 12" // X shape when open
                      : "M4 6h16M4 12h16M4 18h16"} // Hamburger when closed
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeLinejoin="round">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu with animation */}
        <div 
          className={`mobile-menu md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-3 space-y-2 border-t border-divider-color bg-card-bg/80 backdrop-blur-sm">
            <a href="/" className="block px-3 py-2.5 rounded-lg hover:bg-white/5 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a>
            <a href="#pakete" className="block px-3 py-2.5 rounded-lg hover:bg-white/5 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.packages}</a>
            <a href="#about" className="block px-3 py-2.5 rounded-lg hover:bg-white/5 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</a>
            <a href="#restaurant" className="block px-3 py-2.5 rounded-lg hover:bg-white/5 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.restaurant}</a>
            <a href="#accommodations" className="block px-3 py-2.5 rounded-lg hover:bg-white/5 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.accommodations}</a>
            <a href="#gallery" className="block px-3 py-2.5 rounded-lg hover:bg-white/5 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.gallery}</a>
            <a href="#contact" className="block px-3 py-2.5 rounded-lg hover:bg-white/5 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
