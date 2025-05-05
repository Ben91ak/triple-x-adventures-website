import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Add a class to the body to indicate scrolling to top
    document.body.classList.add('scrolling-to-top');
    
    // Remove the class after animation completes
    setTimeout(() => {
      document.body.classList.remove('scrolling-to-top');
    }, 1000);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-accent-color shadow-lg transform transition-all duration-300 ${
        isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      } hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-color focus:ring-opacity-50`}
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5 text-white" />
    </button>
  );
}
