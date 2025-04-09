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

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      
      // Add keyboard accessibility for menu closing with Escape key
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      document.addEventListener('keydown', handleEscKey);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#pakete", label: t.nav.packages },
    { href: "#accommodations", label: t.nav.accommodations },
    { href: "#contact", label: t.nav.contact }
  ];

  return (
    <header 
      className={`fixed w-full z-[90] transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-dark-bg/95 shadow-md shadow-black/10 border-b border-white/5' 
          : 'py-5 bg-gradient-to-b from-black/80 to-transparent'
      }`} 
      id="navbar"
      role="banner"
    >
      <div className="absolute inset-0 backdrop-blur-sm" aria-hidden="true"></div>
      
      <nav className="relative z-10" aria-label="Main Navigation">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center relative z-20">
              <Link href="/" className="flex-shrink-0 flex items-center group">
                <span className="sr-only">Triple X Adventures - Return to homepage</span>
                <div className="relative">
                  {/* Logo glow effect */}
                  <div className="absolute -inset-2 rounded-lg bg-accent-color/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
                  
                  {/* Logo */}
                  <div className="relative overflow-hidden h-10 transition-all">
                    <img 
                      src="/weiss-grun.png" 
                      alt="Triple X Adventures" 
                      className="h-10 object-contain transition-transform group-hover:scale-105 duration-300" 
                      width="200"
                      height="40"
                    />
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center relative z-20">
              <ul className="mr-6 flex items-center flex-wrap justify-center list-none" role="menu">
                {navItems.map((item, index) => (
                  <li key={index} role="none">
                    {item.href.startsWith('#') ? (
                      <a 
                        href={item.href} 
                        className="relative px-2 lg:px-4 py-2 text-xs lg:text-sm tracking-wide font-medium text-white whitespace-nowrap transition-all duration-200 hover:text-accent-color rounded-md hover:bg-white/5"
                        role="menuitem"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link 
                        href={item.href} 
                        className="relative px-2 lg:px-4 py-2 text-xs lg:text-sm tracking-wide font-medium text-white whitespace-nowrap transition-all duration-200 hover:text-accent-color rounded-md hover:bg-white/5"
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              
              <div className="pl-4 border-l border-white/10">
                <LanguageSelector />
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3 relative z-20">
              <LanguageSelector className="mr-1" />
              <button 
                type="button" 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-card-bg/50 border border-white/5 hover:bg-card-bg hover:border-white/10 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X size={18} className="text-accent-color" aria-hidden="true" />
                ) : (
                  <Menu size={18} className="text-white" aria-hidden="true" />
                )}
                <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-dark-bg/80 backdrop-blur-lg z-[100]" 
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          ></div>
        )}
        
        {/* Mobile menu panel */}
        <div 
          id="mobile-menu"
          className={`mobile-menu lg:hidden overflow-hidden transition-all duration-300 ease-in-out fixed top-20 left-0 right-0 z-[101] px-4 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
          aria-hidden={!mobileMenuOpen}
        >
          <nav className="py-5 mx-auto max-w-md rounded-xl space-y-1 bg-dark-bg border border-white/10 shadow-2xl" aria-label="Mobile Navigation">
            <ul role="menu">
              {navItems.map((item, index) => (
                <li key={index} role="none">
                  {item.href.startsWith('#') ? (
                    <a 
                      href={item.href} 
                      className="block px-4 py-3 rounded-lg hover:bg-accent-color/10 text-white hover:text-accent-color group transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuOpen(false);
                      }}
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <ChevronRight 
                          size={18} 
                          className="mr-3 text-accent-color group-hover:translate-x-1 transition-transform" 
                          aria-hidden="true"
                        />
                        <span className="font-medium text-base">{item.label}</span>
                      </div>
                    </a>
                  ) : (
                    <Link 
                      href={item.href} 
                      className="block px-4 py-3 rounded-lg hover:bg-accent-color/10 text-white hover:text-accent-color group transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuOpen(false);
                      }}
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <ChevronRight 
                          size={18} 
                          className="mr-3 text-accent-color group-hover:translate-x-1 transition-transform" 
                          aria-hidden="true"
                        />
                        <span className="font-medium text-base">{item.label}</span>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
}
