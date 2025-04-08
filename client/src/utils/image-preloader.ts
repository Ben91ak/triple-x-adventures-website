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
 * Enhanced with format alternatives and better fallback mechanisms
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
    
    // Try alternative formats and paths when the main image fails
    tryAlternatives(path, onLoad, onError, fallback);
  };
  
  // Start loading the image
  img.src = path;
  
  return img;
}

/**
 * Try alternative image formats and paths when the main image fails to load
 */
function tryAlternatives(
  originalPath: string, 
  onSuccess?: () => void, 
  onFail?: () => void,
  initialFallback?: string
) {
  // First try the explicit fallback if provided
  if (initialFallback) {
    console.log(`Attempting to load fallback: ${initialFallback}`);
    const fallbackImg = new Image();
    
    fallbackImg.onload = () => {
      console.log(`Fallback image loaded successfully: ${initialFallback}`);
      if (onSuccess) onSuccess();
    };
    
    fallbackImg.onerror = () => {
      console.error(`Failed to load fallback image: ${initialFallback}`);
      tryFormatAlternatives(originalPath, onSuccess, onFail);
    };
    
    fallbackImg.src = initialFallback;
    return;
  }
  
  // If no explicit fallback, try format alternatives
  tryFormatAlternatives(originalPath, onSuccess, onFail);
}

/**
 * Try different file formats and path variations
 */
function tryFormatAlternatives(
  originalPath: string,
  onSuccess?: () => void,
  onFail?: () => void
) {
  // Extract path components
  const pathParts = originalPath.split('.');
  if (pathParts.length < 2) {
    if (onFail) onFail();
    return;
  }
  
  const extension = pathParts.pop() || '';
  const basePath = pathParts.join('.');
  
  // Try WebP format first
  const webpPath = `${basePath}.webp`;
  console.log(`Trying WebP alternative: ${webpPath}`);
  
  const webpImg = new Image();
  webpImg.onload = () => {
    console.log(`WebP alternative loaded successfully: ${webpPath}`);
    if (onSuccess) onSuccess();
  };
  
  webpImg.onerror = () => {
    // Try AVIF format next
    const avifPath = `${basePath}.avif`;
    console.log(`Trying AVIF alternative: ${avifPath}`);
    
    const avifImg = new Image();
    avifImg.onload = () => {
      console.log(`AVIF alternative loaded successfully: ${avifPath}`);
      if (onSuccess) onSuccess();
    };
    
    avifImg.onerror = () => {
      // Try different path formations as a last resort
      tryPathAlternatives(originalPath, onSuccess, onFail);
    };
    
    avifImg.src = avifPath;
  };
  
  webpImg.src = webpPath;
}

/**
 * Try different path structures as a last resort
 * Enhanced with more comprehensive alternatives based on actual filesystem scan
 */
function tryPathAlternatives(
  originalPath: string,
  onSuccess?: () => void,
  onFail?: () => void
) {
  // Try paths that we know exist in the filesystem
  let alternativePaths: string[] = [];
  
  // Extract filename and handle special cases
  const fileName = originalPath.split('/').pop() || '';
  const baseName = fileName.split('.')[0].toLowerCase();
  
  // Try different path formats based on what we found in filesystem
  if (originalPath.includes('/experiences/')) {
    // If path has /experiences/ subfolder, try the root /images/ versions
    alternativePaths.push(`/images/${fileName}`);
    
    // Try with different capitalization
    const capitalizedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    alternativePaths.push(`/images/${capitalizedName}.jpg`);
    
    // Handle special cases
    if (baseName.includes('husky')) {
      alternativePaths.push('/images/Huskys/Husky.jpg');
      alternativePaths.push('/images/husky.jpg');
      alternativePaths.push('/images/Husky.jpg');
    } 
    else if (baseName.includes('snowmobile')) {
      alternativePaths.push('/images/Snowmobile/Snowmobile.jpg');
      alternativePaths.push('/images/snowmobile.jpg');
      alternativePaths.push('/images/Snowmobile.jpg');
      alternativePaths.push('/images/Snowmobile/Snowmobile 2.jpg');
      alternativePaths.push('/images/Snowmobile/Snowmobile 3.jpg');
    }
    else if (baseName.includes('drift')) {
      alternativePaths.push('/images/drifting.jpg');
      alternativePaths.push('/images/Drifting.jpg');
    }
    else if (baseName.includes('kart') || baseName.includes('ice-kart')) {
      alternativePaths.push('/images/ice-kart.jpg');
      alternativePaths.push('/images/Ice-Fishing.jpg'); // Potential alternative if ice-kart is not found
    }
    else if (baseName.includes('helicopter') || baseName.includes('heli')) {
      alternativePaths.push('/images/helicopter.jpg');
      alternativePaths.push('/images/Helikopter.jpg');
    }
  } else {
    // If not in experiences folder, check if we have other variants
    alternativePaths.push(`/images/experiences/${fileName}`);
    
    // Try with different capitalization
    const capitalizedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    alternativePaths.push(`/images/${capitalizedName}.jpg`);
    
    // Handle special cases 
    if (baseName.includes('husky')) {
      alternativePaths.push('/images/Huskys/Husky.jpg');
      alternativePaths.push('/images/experiences/husky.jpg');
      alternativePaths.push('/images/Husky.jpg');
    } 
    else if (baseName.includes('snowmobile')) {
      alternativePaths.push('/images/Snowmobile/Snowmobile.jpg');
      alternativePaths.push('/images/experiences/snowmobile.jpg');
      alternativePaths.push('/images/Snowmobile.jpg');
      alternativePaths.push('/images/Snowmobile/Snowmobile 2.jpg');
      alternativePaths.push('/images/Snowmobile/Snowmobile 3.jpg');
    }
    else if (baseName.includes('drift')) {
      alternativePaths.push('/images/experiences/drifting.jpg');
      alternativePaths.push('/images/Drifting.jpg');
    }
    else if (baseName.includes('kart') || baseName.includes('ice-kart')) {
      alternativePaths.push('/images/experiences/ice-kart.jpg');
      alternativePaths.push('/images/Ice-Fishing.jpg'); // Potential alternative if ice-kart is not found
    }
    else if (baseName.includes('helicopter') || baseName.includes('heli')) {
      alternativePaths.push('/images/experiences/helicopter.jpg');
      alternativePaths.push('/images/Helikopter.jpg');
    }
  }
  
  // Always try the fallback as last resort
  alternativePaths.push('/images/TXA_fallback.jpg');
  alternativePaths.push('/images/TXA_fallback_optimized.jpg');
  
  // Try each alternative path in sequence
  tryNextPath(0);
  
  function tryNextPath(index: number) {
    if (index >= alternativePaths.length) {
      // We've tried all alternatives without success
      if (onFail) onFail();
      return;
    }
    
    const altPath = alternativePaths[index];
    console.log(`Trying alternative path: ${altPath}`);
    
    const altImg = new Image();
    altImg.onload = () => {
      console.log(`Alternative path loaded successfully: ${altPath}`);
      if (onSuccess) onSuccess();
    };
    
    altImg.onerror = () => {
      // Try the next alternative path
      tryNextPath(index + 1);
    };
    
    altImg.src = altPath;
  }
}

/**
 * Preload a set of images
 */
export function preloadImages(paths: string[], options: ImagePreloadOptions = {}) {
  return paths.map(path => preloadImage(path, options));
}

/**
 * Preload all critical images for the experiences section
 * Updated with correct capitalization and paths based on filesystem check
 */
export function preloadExperienceImages() {
  // Use actual verified image paths based on filesystem check
  const experienceImages = [
    // Primary images with verified paths
    '/images/Huskys/Husky.jpg',
    '/images/Snowmobile/Snowmobile.jpg',
    '/images/Reindeers.jpg',
    
    // Images with both capitalization variants
    '/images/drifting.jpg',
    '/images/Drifting.jpg',
    
    // Other experience images
    '/images/ice-kart.jpg',
    '/images/helicopter.jpg',
    '/images/Helikopter.jpg',
    '/images/buggy.jpg',
    '/images/Ice-Fishing.jpg',
    
    // Experience directory images
    '/images/experiences/husky.jpg',
    '/images/experiences/snowmobile.jpg',
    '/images/experiences/drifting.jpg',
    '/images/experiences/ice-kart.jpg',
    '/images/experiences/helicopter.jpg',
    '/images/experiences/buggy.jpg',
    
    // Alternative snowmobile images
    '/images/Snowmobile/Snowmobile 2.jpg',
    '/images/Snowmobile/Snowmobile 3.jpg'
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