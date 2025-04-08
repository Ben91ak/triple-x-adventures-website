/**
 * Image preloader utility to ensure critical images are preloaded
 * This helps fix the "Optimized image not found" errors seen in the console
 */

interface ImagePreloadOptions {
  priority?: 'high' | 'medium' | 'low';
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Preload an image with specified options
 */
export function preloadImage(path: string, options: ImagePreloadOptions = {}) {
  const { priority = 'medium', fallback, onLoad, onError } = options;
  
  // Create a new image element
  const img = new Image();
  
  // Set loading priority (high = fetch immediately, low = lazy load)
  if (priority === 'high') {
    img.fetchPriority = 'high';
    img.loading = 'eager';
  } else if (priority === 'low') {
    img.loading = 'lazy';
  }
  
  // Set up event handlers
  img.onload = () => {
    console.log(`Image preloaded successfully: ${path}`);
    if (onLoad) onLoad();
  };
  
  img.onerror = () => {
    console.warn(`Failed to preload image: ${path}`);
    
    // Try loading the fallback if provided
    if (fallback) {
      console.log(`Attempting to load fallback: ${fallback}`);
      const fallbackImg = new Image();
      fallbackImg.src = fallback;
      
      fallbackImg.onload = () => {
        console.log(`Fallback image loaded successfully: ${fallback}`);
        if (onLoad) onLoad();
      };
      
      fallbackImg.onerror = () => {
        console.error(`Failed to load fallback image: ${fallback}`);
        if (onError) onError();
      };
    } else if (onError) {
      onError();
    }
  };
  
  // Start loading the image
  img.src = path;
  
  return img;
}

/**
 * Preload a set of images
 */
export function preloadImages(paths: string[], options: ImagePreloadOptions = {}) {
  return paths.map(path => preloadImage(path, options));
}

/**
 * Preload all critical images for the experiences section
 */
export function preloadExperienceImages() {
  // Use direct paths to the existing images based on filesystem check
  const experienceImages = [
    '/images/experiences/husky.jpg',
    '/images/experiences/snowmobile.jpg',
    '/images/Reindeers.jpg', // This one works as is
    '/images/experiences/drifting.jpg',
    '/images/experiences/ice-kart.jpg',
    '/images/experiences/helicopter.jpg',
    '/images/experiences/buggy.jpg'
  ];
  
  // Simply preload the images
  experienceImages.forEach(path => {
    preloadImage(path, {
      priority: 'high'
    });
  });
}

/**
 * Preload all critical images for the accommodations section
 */
export function preloadAccommodationImages() {
  const accommodationImages = [
    '/images/txa-chalet.jpg',
    '/images/ood-hotel.jpg',
    '/images/hotel-laponia.jpg'
  ];
  
  // Preload accommodation images
  accommodationImages.forEach(path => {
    preloadImage(path, {
      priority: 'medium'
    });
  });
}

/**
 * Preload all restaurant images
 */
export function preloadRestaurantImages() {
  const restaurantImages = [
    '/images/restaurant/dish.jpg',
    '/images/restaurant/jayjays-exterior.jpg',
    '/images/restaurant/meat-preparation.jpg'
  ];
  
  restaurantImages.forEach(path => {
    preloadImage(path, { priority: 'medium' });
  });
}

/**
 * Preload all critical images for proper website function
 */
export function preloadAllCriticalImages() {
  preloadExperienceImages();
  preloadAccommodationImages();
  preloadRestaurantImages();
  
  // Preload logo and other critical UI elements
  const uiImages = [
    '/images/night-sky.jpg' // Using confirmed existing image
  ];
  
  uiImages.forEach(path => {
    preloadImage(path, { priority: 'high' });
  });
}