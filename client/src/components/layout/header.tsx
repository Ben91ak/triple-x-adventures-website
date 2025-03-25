import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Menu, X, ChevronRight } from "lucide-react";

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.mobile-menu') && !target.closest('button[aria-label="Toggle mobile menu"]')) {
          setMobileMenuOpen(false);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-dark-bg/95 shadow-md shadow-black/10 border-b border-white/5' 
          : 'py-5 bg-gradient-to-b from-black/80 to-transparent'
      }`} 
      id="navbar"
    >
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      <nav className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center group">
                <div className="relative">
                  {/* Logo glow effect */}
                  <div className="absolute -inset-1 rounded-full bg-accent-color/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Logo emblem */}
                  <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-accent-color to-purple-600 flex items-center justify-center mr-3 overflow-hidden border border-white/20 group-hover:border-white/40 transition-colors">
                    <span className="text-lg font-bold text-white drop-shadow-sm">X</span>
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                </div>
                
                <div className="flex flex-col ml-2">
                  <span className="font-bold text-xl tracking-tight">
                    <span className="text-primary-text group-hover:text-white transition-colors">TRIPLE</span>
                    <span className="text-accent-color ml-1">X</span>
                  </span>
                  <span className="text-xs text-secondary-text/70 tracking-widest uppercase -mt-1">Adventures</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="mr-6 flex items-center space-x-1">
                {[
                  { href: "/", label: t.nav.home },
                  { href: "#pakete", label: t.nav.packages },
                  { href: "#team", label: t.nav.about },
                  { href: "#restaurant", label: t.nav.restaurant },
                  { href: "#accommodations", label: t.nav.accommodations },
                  { href: "#gallery", label: t.nav.gallery },
                  { href: "#contact", label: t.nav.contact }
                ].map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className="relative px-4 py-2 text-sm tracking-wide font-medium text-secondary-text transition-all duration-200 hover:text-accent-color rounded-md hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              
              <div className="pl-4 border-l border-white/10">
                <LanguageSelector />
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <LanguageSelector className="mr-1" />
              <button 
                type="button" 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-card-bg/50 border border-white/5 hover:bg-card-bg hover:border-white/10 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X size={18} className="text-accent-color" />
                ) : (
                  <Menu size={18} className="text-secondary-text" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu with animation */}
        <div 
          className={`mobile-menu md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[440px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-5 mt-3 mx-4 rounded-xl space-y-1 bg-card-bg/90 backdrop-blur-md border border-white/10 shadow-xl">
            {[
              { href: "/", label: t.nav.home },
              { href: "#pakete", label: t.nav.packages },
              { href: "#team", label: t.nav.about },
              { href: "#restaurant", label: t.nav.restaurant },
              { href: "#accommodations", label: t.nav.accommodations },
              { href: "#gallery", label: t.nav.gallery },
              { href: "#contact", label: t.nav.contact }
            ].map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="flex items-center px-4 py-3 rounded-lg hover:bg-white/5 text-secondary-text hover:text-accent-color group transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ChevronRight 
                  size={16} 
                  className="mr-3 text-accent-color/60 group-hover:translate-x-1 transition-transform" 
                />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
