/**
 * Performance optimization utilities for Triple X Adventures website
 * 
 * This module contains functions to optimize various aspects of website performance,
 * including image loading, third-party script management, and general best practices.
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Optimizes page images by applying best practices
 * - Sets loading attributes
 * - Adds decoding attributes
 * - Sets fetchpriority for important images
 */
export function optimizePageImages(): void {
  if (!isBrowser) return;
  
  // Wait for the DOM to be ready
  setTimeout(() => {
    // Hero section and above-the-fold images
    const criticalImages = document.querySelectorAll('img[critical="true"], .hero-section img, header img');
    criticalImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'eager';
        img.decoding = 'sync';
        img.setAttribute('fetchpriority', 'high');
      }
    });
    
    // Below the fold images
    const nonCriticalImages = document.querySelectorAll('img:not([critical="true"]):not(.hero-section img):not(header img)');
    nonCriticalImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'lazy';
        img.decoding = 'async';
      }
    });
    
    // Set proper sizes attributes for responsive images
    const responsiveImages = document.querySelectorAll('img[srcset]');
    responsiveImages.forEach(img => {
      if (img instanceof HTMLImageElement && !img.sizes) {
        img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
      }
    });
  }, 100);
}

/**
 * Preloads critical images for faster rendering
 */
export function preloadAllCriticalImages(): void {
  if (!isBrowser) return;
  
  const criticalImageUrls = [
    '/weiss-grun.png', // Logo
    '/images/TXA_fallback_optimized.jpg', // Hero background fallback
    '/videos/TXA Teaser 2025 Homepage.webm', // Hero video
    '/images/experiences/Snowmobile 1_result.webp', // First experience image
  ];
  
  criticalImageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.crossOrigin = 'anonymous';
    
    // Only add if it doesn't already exist
    if (!document.querySelector(`link[rel="preload"][href="${url}"]`)) {
      document.head.appendChild(link);
    }
  });
  
  // Preload first few seconds of video for hero section
  const videoLink = document.createElement('link');
  videoLink.rel = 'preload';
  videoLink.as = 'video';
  videoLink.href = '/videos/TXA Teaser 2025 Homepage.webm';
  videoLink.type = 'video/webm';
  
  // Only add if it doesn't already exist
  if (!document.querySelector('link[rel="preload"][as="video"]')) {
    document.head.appendChild(videoLink);
  }
}

/**
 * Manages third-party scripts by loading them with appropriate strategy
 * @param url Script URL to load
 * @param priority 'high' for critical scripts, 'low' for non-essential
 * @param callback Optional callback function when script loads
 */
export function loadThirdPartyScript(url: string, priority: 'high' | 'low', callback?: () => void): void {
  if (!isBrowser) return;
  
  const script = document.createElement('script');
  script.src = url;
  
  // Set appropriate attributes based on priority
  if (priority === 'low') {
    script.async = true;
    script.defer = true;
  }
  
  // Add callback if provided
  if (callback) {
    script.onload = callback;
  }
  
  // Add script to document
  document.body.appendChild(script);
}

/**
 * Defers non-critical CSS loading
 * @param href CSS file URL
 */
export function loadDeferredCSS(href: string): void {
  if (!isBrowser) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  
  document.head.appendChild(link);
}

/**
 * Monitors performance metrics and logs them
 */
export function monitorPerformance(): void {
  if (!isBrowser || !('performance' in window) || !('getEntriesByType' in performance)) return;
  
  // This will run after the page has loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Get performance metrics
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigationEntry) {
        // Calculate key metrics
        const pageLoadTime = navigationEntry.loadEventEnd - navigationEntry.startTime;
        const timeToFirstByte = navigationEntry.responseStart - navigationEntry.requestStart;
        const domContentLoaded = navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;
        
        // Log metrics
        console.log(`Performance metrics:
- Page load time: ${Math.round(pageLoadTime)}ms
- Time to first byte: ${Math.round(timeToFirstByte)}ms
- DOM Content Loaded: ${Math.round(domContentLoaded)}ms`);
        
        // Send to analytics if needed
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'performance', {
            pageLoadTime: Math.round(pageLoadTime),
            timeToFirstByte: Math.round(timeToFirstByte),
            domContentLoaded: Math.round(domContentLoaded)
          });
        }
      }
      
      // Get Largest Contentful Paint if available
      try {
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        if (lcpEntries && lcpEntries.length > 0) {
          const lcp = lcpEntries[lcpEntries.length - 1];
          console.log(`Largest Contentful Paint: ${Math.round(lcp.startTime)}ms`);
        }
      } catch (e) {
        // LCP API might not be supported
      }
      
      // Clear entries to avoid memory leaks
      performance.clearMarks();
      performance.clearMeasures();
      performance.clearResourceTimings();
    }, 3000);
  });
}

/**
 * Dynamically loads web fonts with appropriate strategy
 */
export function optimizeFonts(): void {
  if (!isBrowser) return;
  
  // Create font preconnect links
  const fontDomains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
  
  fontDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    
    // Only add if it doesn't already exist
    if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      document.head.appendChild(link);
    }
  });
  
  // Add font display swap for better CLS
  if ('fonts' in document) {
    (document as any).fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }
}

// Configure Intersection Observer for improved lazy loading
export function setupIntersectionObserver(): void {
  if (!isBrowser || !('IntersectionObserver' in window)) return;
  
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target as HTMLImageElement;
        
        // Replace src with data-src
        if (lazyImage.dataset.src) {
          lazyImage.src = lazyImage.dataset.src;
        }
        
        // Replace srcset with data-srcset
        if (lazyImage.dataset.srcset) {
          lazyImage.srcset = lazyImage.dataset.srcset;
        }
        
        lazyImage.classList.remove('lazy');
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  }, {
    rootMargin: '300px 0px', // Start loading when image is 300px away
    threshold: 0
  });
  
  // Observe all images with the 'lazy' class
  const lazyImages = document.querySelectorAll('img.lazy');
  lazyImages.forEach(image => {
    lazyImageObserver.observe(image);
  });
}

// This type definition is for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Export a default function that applies all optimizations
export default function applyAllOptimizations(): void {
  if (!isBrowser) return;
  
  optimizePageImages();
  preloadAllCriticalImages();
  optimizeFonts();
  setupIntersectionObserver();
  monitorPerformance();
}