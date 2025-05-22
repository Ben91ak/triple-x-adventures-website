// Import HMR error handler first to intercept WebSocket errors
import './hmr-error-handler';

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { supportsFormat, optimizePageImages, prefetchImages } from "./utils/image-optimizer";
import applyAllOptimizations from "./utils/performance-optimizer";
import { initGlobalErrorHandlers } from "./utils/error-handlers";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Initialize global error handlers to catch and suppress WebSocket errors
initGlobalErrorHandlers();

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
    // No need to log in production
  }
};

// Start format detection immediately
detectImageFormats();

// Create root with concurrent mode
const root = createRoot(document.getElementById("root")!);

// Define our Core Web Vitals reporter - only loaded in development mode
const reportWebVitals = () => {
  // Skip web vitals reporting in production to reduce bundle size
  if (import.meta.env.DEV) {
    // Use a more detailed reporter for web vitals in development only
    import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onINP }) => {
      const vitalsCallback = (_metric: any) => {
        // Skip logging in production
        // Send to analytics in production instead if needed
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
  }
};

// Critical path optimization - run before DOMContentLoaded
// Prefetch high-priority images that will be needed immediately
const criticalImagePaths = [
  '/images/TXA_fallback.jpg'
  // Remove night-sky.jpg as it doesn't exist
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
    applyAllOptimizations();
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
      // Use existing verified image paths with full range of experience types
      '/images/Snowmobile/Snowmobile 1_result.webp',
      '/images/Ice Drift/Cars 1_result.webp',
      '/images/Side by Side/SBS 1_result.webp',
      '/images/Reindeers/Reindeers 1_result.webp',
      '/images/Drifting.jpg',
      '/images/Helikopter.jpg'
    ];
    prefetchImages(secondaryImagePaths, { lowPriorityDelay: 2000 });
    
  }, 500); // Delay non-critical optimizations
});

// Hydrate the app
root.render(
  <>
    <App />
    <SpeedInsights />
  </>
);
