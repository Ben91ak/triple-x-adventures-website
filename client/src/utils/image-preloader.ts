/**
 * Image preloading utilities to enhance user experience by preloading critical images
 * This helps reduce layout shifts and provides a smoother visual experience
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Critical images that should be preloaded for the best experience
const criticalImagePaths = [
  // Logo and branding
  '/weiss-grun.png',
  
  // Hero section background
  '/images/TXA_fallback_optimized.jpg',
  '/images/TXA_fallback.webp',
  
  // Experience featured images (first visible)
  '/images/experiences/Snowmobile 1_result.webp',
  '/images/experiences/Dog Sledding 1_result.webp',
  
  // UI elements
  '/images/pattern-dots.png'
];

/**
 * Preloads all critical images for faster initial rendering
 */
export function preloadAllCriticalImages(): void {
  if (!isBrowser) return;
  
  // Check if preloading is already in progress or completed
  if (window.sessionStorage && window.sessionStorage.getItem('imagesPreloaded') === 'true') {
    console.log('Critical images already preloaded in this session');
    return;
  }
  
  // Preload all critical images
  const preloadPromises = criticalImagePaths.map(path => preloadImage(path));
  
  // Mark as completed once all images are preloaded
  Promise.all(preloadPromises)
    .then(() => {
      console.log('All critical images preloaded successfully');
      if (window.sessionStorage) {
        window.sessionStorage.setItem('imagesPreloaded', 'true');
      }
    })
    .catch(error => {
      console.error('Error preloading images:', error);
    });
}

/**
 * Preloads a single image
 * @param src Image source URL
 * @returns Promise that resolves when the image is loaded
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      resolve();
      return;
    }
    
    // Check if image is already cached
    const img = new Image();
    
    img.onload = () => {
      resolve();
    };
    
    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      reject(new Error(`Failed to preload: ${src}`));
    };
    
    img.src = src;
  });
}

/**
 * Preloads images for a specific section to improve user experience as they scroll
 * @param section Section name to preload images for
 */
export function preloadSectionImages(section: 'experiences' | 'accommodations' | 'restaurant'): void {
  if (!isBrowser) return;
  
  // Define section-specific images
  const sectionImages: Record<string, string[]> = {
    experiences: [
      '/images/Snowmobile/Snowmobile 1_result.webp',
      '/images/Huskys/Husky 1_result.webp',
      '/images/Ice-Fishing.jpg',
      '/images/Reindeers.jpg',
      '/images/Side-By-Side-Buggy-Drifting.jpg'
    ],
    accommodations: [
      '/images/accommodations/Cabin 1_result.webp',
      '/images/accommodations/Cabin 2_result.webp',
      '/images/accommodations/Cabin 3_result.webp'
    ],
    restaurant: [
      '/images/restaurant/Restaurant 1_result.webp',
      '/images/restaurant/Restaurant 2_result.webp',
      '/images/restaurant/Restaurant 3_result.webp'
    ]
  };
  
  // Get images for the specified section
  const images = sectionImages[section] || [];
  
  // Preload images with lower priority
  if (images.length > 0) {
    console.log(`Preloading ${images.length} images for ${section} section`);
    
    // Use requestIdleCallback for non-critical preloading if available
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        images.forEach(image => preloadImage(image));
      }, { timeout: 2000 });
    } else {
      // Fallback to setTimeout for browsers without requestIdleCallback
      setTimeout(() => {
        images.forEach(image => preloadImage(image));
      }, 200);
    }
  }
}

/**
 * Uses IntersectionObserver to preload images just before they come into view
 */
export function setupLazyPreloading(): void {
  if (!isBrowser || !('IntersectionObserver' in window)) return;
  
  // Sections to observe for preloading
  const sections = [
    { id: 'experiences', threshold: 0.2 },
    { id: 'accommodations', threshold: 0.2 },
    { id: 'restaurant', threshold: 0.2 }
  ];
  
  // Track which sections have been preloaded
  const preloadedSections = new Set<string>();
  
  // Create observer
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        // Only preload each section once
        if (!preloadedSections.has(sectionId)) {
          preloadedSections.add(sectionId);
          
          // Preload section images
          if (sectionId === 'experiences' || 
              sectionId === 'accommodations' || 
              sectionId === 'restaurant') {
            preloadSectionImages(sectionId);
          }
          
          // Stop observing once preloaded
          sectionObserver.unobserve(entry.target);
        }
      }
    });
  }, {
    rootMargin: '200px 0px', // Start loading 200px before section comes into view
    threshold: 0.1
  });
  
  // Start observing sections
  sections.forEach(section => {
    const element = document.getElementById(section.id);
    if (element) {
      sectionObserver.observe(element);
    }
  });
}

/**
 * Initialize all image preloading features
 */
export function initImagePreloading(): void {
  if (!isBrowser) return;
  
  // Preload critical images immediately
  preloadAllCriticalImages();
  
  // Set up lazy preloading for section images
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLazyPreloading);
  } else {
    setupLazyPreloading();
  }
}