import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { supportsFormat, optimizePageImages, prefetchImages } from "./utils/image-optimizer";
import { applyPerformanceOptimizations } from "./utils/performance-optimizer";

// Initialize image format detection early
// This runs immediately before the app renders to detect WebP/AVIF support
const detectImageFormats = async () => {
  try {
    // Pre-detect WebP and AVIF support before rendering anything
    // This helps us make better image format choices on initial load
    const webpPromise = supportsFormat('webp');
    const avifPromise = supportsFormat('avif');
    
    // Wait for the most important format detection to complete
    await webpPromise;
    
    // Let AVIF detection continue in the background
    avifPromise.catch(() => {/* Ignore failures */});
  } catch (e) {
    // Safely continue if detection fails
    console.warn('Image format detection failed:', e);
  }
};

// Start format detection immediately
detectImageFormats();

// Create root with concurrent mode
const root = createRoot(document.getElementById("root")!);

// Define our Core Web Vitals reporter
const reportWebVitals = () => {
  // Use a more detailed reporter for web vitals
  import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onINP }) => {
    const vitalsCallback = (metric: any) => {
      // Log all vitals with clear labels
      const value = Math.round(metric.value * 100) / 100;
      console.info(`Web Vitals: ${metric.name} = ${value}`);
      
      // For really poor values, log a warning
      if (
        (metric.name === 'CLS' && metric.value > 0.1) || 
        (metric.name === 'LCP' && metric.value > 2500) ||
        (metric.name === 'FID' && metric.value > 100) ||
        (metric.name === 'TTFB' && metric.value > 600) ||
        (metric.name === 'INP' && metric.value > 200)
      ) {
        console.warn(`Poor Web Vital: ${metric.name} = ${value}`);
      }
      
      // If we have a real analytics service, we would send the data there
      // Example: analyticsService.sendEvent('web-vitals', metric.name, value);
    };
    
    // Monitor all Core Web Vitals
    onCLS(vitalsCallback);
    onFID(vitalsCallback);
    onLCP(vitalsCallback);
    onTTFB(vitalsCallback);
    onINP(vitalsCallback);
  }).catch(() => {
    // Silently fail if web-vitals is not available
  });
};

// Critical path optimization - run before DOMContentLoaded
// Prefetch high-priority images that will be needed immediately
const criticalImagePaths = [
  '/images/TXA_fallback.jpg',
  '/images/night-sky.jpg'
];
prefetchImages(criticalImagePaths, { 
  priorityImages: criticalImagePaths,
  lowPriorityDelay: 0 // Immediate prefetch for critical images
});

// Split our optimization work between critical and non-critical phases
window.addEventListener('DOMContentLoaded', () => {
  // Critical optimizations - run immediately on DOMContentLoaded
  // This helps with LCP (Largest Contentful Paint)
  const runCriticalOptimizations = () => {
    // Run initial page image optimization targeting only above-the-fold content
    optimizePageImages();
    
    // Start Core Web Vitals monitoring
    reportWebVitals();
    
    // Apply the new comprehensive performance optimizations
    applyPerformanceOptimizations();
  };
  
  // Run critical optimizations right away
  runCriticalOptimizations();
  
  // Schedule non-critical optimizations for after the page is interactive
  // This helps with TTI (Time to Interactive) and INP (Interaction to Next Paint)
  setTimeout(() => {
    // Set up intersection observer for animations and lazy loading
    if ('IntersectionObserver' in window) {
      // Create observer for revealing elements on scroll
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing after animation is triggered
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0.15
      });
      
      // Observe all animation elements
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        revealObserver.observe(el);
      });
    }
    
    // Prefetch remaining important images for fast navigation
    const secondaryImagePaths = [
      '/images/husky.jpg',
      '/images/snowmobile.jpg',
      '/images/drifting.jpg'
    ];
    prefetchImages(secondaryImagePaths, { lowPriorityDelay: 2000 });
    
  }, 500); // Delay non-critical optimizations
});

// Hydrate the app
root.render(<App />);
