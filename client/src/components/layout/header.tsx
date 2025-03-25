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
                <span className="font-montserrat font-bold text-2xl tracking-tight">
                  <span className="text-fire">XXX</span> ADVENTURES
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#experiences" className="nav-link font-montserrat text-sm uppercase tracking-wide font-semibold hover:text-fire">Experiences</a>
              <a href="#stay" className="nav-link font-montserrat text-sm uppercase tracking-wide font-semibold hover:text-fire">Stay</a>
              <a href="#restaurant" className="nav-link font-montserrat text-sm uppercase tracking-wide font-semibold hover:text-fire">Restaurant</a>
              <a href="#about" className="nav-link font-montserrat text-sm uppercase tracking-wide font-semibold hover:text-fire">About</a>
              <a href="#contact" className="custom-button font-montserrat text-sm uppercase bg-fire px-6 py-3 rounded tracking-wide font-semibold hover:bg-opacity-90 transition">Book Now</a>
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
            <a href="#experiences" className="block px-3 py-2 rounded font-montserrat text-sm uppercase tracking-wide font-semibold hover:bg-gray-800 hover:text-fire" onClick={() => setMobileMenuOpen(false)}>Experiences</a>
            <a href="#stay" className="block px-3 py-2 rounded font-montserrat text-sm uppercase tracking-wide font-semibold hover:bg-gray-800 hover:text-fire" onClick={() => setMobileMenuOpen(false)}>Stay</a>
            <a href="#restaurant" className="block px-3 py-2 rounded font-montserrat text-sm uppercase tracking-wide font-semibold hover:bg-gray-800 hover:text-fire" onClick={() => setMobileMenuOpen(false)}>Restaurant</a>
            <a href="#about" className="block px-3 py-2 rounded font-montserrat text-sm uppercase tracking-wide font-semibold hover:bg-gray-800 hover:text-fire" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#contact" className="block px-3 py-3 mt-2 rounded font-montserrat text-sm uppercase bg-fire text-center tracking-wide font-semibold hover:bg-opacity-90 transition" onClick={() => setMobileMenuOpen(false)}>Book Now</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
