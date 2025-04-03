import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Create root with concurrent mode
const root = createRoot(document.getElementById("root")!);

// Add event timing optimization for better interaction metrics
window.addEventListener('DOMContentLoaded', () => {
  // Use a timeout to defer non-critical initialization
  setTimeout(() => {
    // Report web vitals when available
    import('web-vitals').then((webVitals) => {
      // Correctly access the web vitals functions
      webVitals.onCLS(console.log);
      webVitals.onFID(console.log);
      webVitals.onLCP(console.log);
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });
    
    // Optimize scroll performance by detecting when scrolling happens
    // and pausing animations during the scroll
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const html = document.documentElement;
    
    window.addEventListener('scroll', () => {
      // Add class to html element during scrolling to pause animations
      if (!html.classList.contains('is-scrolling')) {
        html.classList.add('is-scrolling');
      }
      
      // Clear the timeout on each scroll event
      clearTimeout(scrollTimeout);
      
      // Set a timeout to remove the class after scrolling stops
      scrollTimeout = setTimeout(() => {
        html.classList.remove('is-scrolling');
      }, 100); // Small timeout to allow for momentum scrolling
    }, { passive: true }); // Use passive scroll listener for better performance
    
    // Preload images that are visible on the initial screen
    const preloadVisibleImages = () => {
      const imagesToPreload = document.querySelectorAll('img[loading="eager"]');
      imagesToPreload.forEach((img) => {
        const imgElement = img as HTMLImageElement;
        if (imgElement.dataset.src) {
          imgElement.src = imgElement.dataset.src;
        }
      });
    };
    
    // Preload critical images
    preloadVisibleImages();
    
  }, 0);
});

// Hydrate the app
root.render(<App />);
