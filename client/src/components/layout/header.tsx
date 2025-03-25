import { useState, useEffect } from "react";
import { Link } from "wouter";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-opacity-95 shadow-md' : 'bg-opacity-80'}`} id="navbar">
      <nav className="bg-midnight bg-opacity-95 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <img src="https://placehold.co/40x40/green/white?text=X" alt="Triple X Logo" className="h-10 w-auto mr-2" />
                <span className="font-montserrat font-bold text-xl tracking-tight">
                  TRIPLE <span className="text-green-400">X</span>
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="nav-link font-montserrat text-sm tracking-wide font-semibold hover:text-green-400">Startseite</a>
              <a href="#pakete" className="nav-link font-montserrat text-sm tracking-wide font-semibold hover:text-green-400">Pakete</a>
              <a href="#about" className="nav-link font-montserrat text-sm tracking-wide font-semibold hover:text-green-400">Über uns</a>
              <a href="#restaurant" className="nav-link font-montserrat text-sm tracking-wide font-semibold hover:text-green-400">Triple X Taste</a>
              <a href="#management" className="nav-link font-montserrat text-sm tracking-wide font-semibold hover:text-green-400">Triple X Management</a>
              <a href="#contact" className="nav-link font-montserrat text-sm tracking-wide font-semibold hover:text-green-400">Kontakt</a>
              <a href="#faq" className="nav-link font-montserrat text-sm tracking-wide font-semibold hover:text-green-400">FAQ</a>
              <div className="ml-2 border border-white rounded px-3 py-1 hover:bg-white hover:text-midnight transition">
                <span>DE</span>
              </div>
            </div>
            
            <div className="md:hidden flex items-center">
              <button 
                type="button" 
                className="mobile-menu-button"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`mobile-menu md:hidden ${mobileMenuOpen ? '' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-4 space-y-1 bg-midnight">
            <a href="/" className="block px-3 py-2 rounded font-montserrat text-sm tracking-wide font-semibold hover:bg-gray-800 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Startseite</a>
            <a href="#pakete" className="block px-3 py-2 rounded font-montserrat text-sm tracking-wide font-semibold hover:bg-gray-800 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Pakete</a>
            <a href="#about" className="block px-3 py-2 rounded font-montserrat text-sm tracking-wide font-semibold hover:bg-gray-800 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Über uns</a>
            <a href="#restaurant" className="block px-3 py-2 rounded font-montserrat text-sm tracking-wide font-semibold hover:bg-gray-800 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Triple X Taste</a>
            <a href="#management" className="block px-3 py-2 rounded font-montserrat text-sm tracking-wide font-semibold hover:bg-gray-800 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Triple X Management</a>
            <a href="#contact" className="block px-3 py-2 rounded font-montserrat text-sm tracking-wide font-semibold hover:bg-gray-800 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Kontakt</a>
            <a href="#faq" className="block px-3 py-2 rounded font-montserrat text-sm tracking-wide font-semibold hover:bg-gray-800 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="mt-2 border border-white rounded px-3 py-2 text-center">
              <span>DE</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
