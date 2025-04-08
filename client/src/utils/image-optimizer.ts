/**
 * Image Optimization Utilities
 * 
 * This module provides functions for optimizing images and improving loading performance
 * with features for:
 * - WebP/AVIF format detection and usage
 * - Responsive image loading based on device capabilities
 * - Intelligent lazy loading with priority detection
 * - Layout shift prevention
 * - Error handling and fallbacks
 * - Performance monitoring
 */

// Typings for image format support
type ImageFormat = 'webp' | 'avif' | 'jpeg' | 'png';
type FormatSupportCache = Record<ImageFormat, boolean | null>;

// Cache object to store image load states
const imageLoadCache: Record<string, boolean> = {};

// Cache for format support detection
const formatSupportCache: FormatSupportCache = {
  webp: null,
  avif: null,
  jpeg: true, // Always assume JPEG support
  png: true   // Always assume PNG support
};

// Check WebP support during initialization (client-side only)
if (typeof window !== 'undefined') {
  (async () => {
    try {
      const webpSupported = await supportsWebP();
      console.log(`WebP support: ${webpSupported ? 'Yes' : 'No'}`);
      
      // Also try to check AVIF (newer format with better compression)
      const avifSupported = await supportsFormat('avif');
      console.log(`AVIF support: ${avifSupported ? 'Yes' : 'No'}`);
    } catch (e) {
      // Ignore errors in format detection and default to JPEG
      console.warn('Error detecting image format support:', e);
    }
  })();
}

// Network condition detection
interface NetworkInfo {
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | '5g' | 'unknown';
  effectiveBandwidth: number; // Mbps
  saveData: boolean;
}

// Default network info - will be updated when available
let networkInfo: NetworkInfo = {
  connectionType: 'unknown',
  effectiveBandwidth: 10, // Default assumption of good connection
  saveData: false
};

// Initialize network information API if available
if (typeof navigator !== 'undefined' && 'connection' in navigator) {
  const connection = (navigator as any).connection;
  
  if (connection) {
    // Update network info initially
    networkInfo = {
      connectionType: connection.effectiveType || 'unknown',
      effectiveBandwidth: connection.downlink || 10,
      saveData: !!connection.saveData
    };
    
    // Listen for changes in network conditions
    connection.addEventListener('change', () => {
      networkInfo = {
        connectionType: connection.effectiveType || 'unknown',
        effectiveBandwidth: connection.downlink || 10,
        saveData: !!connection.saveData
      };
    });
  }
}

/**
 * Check if the browser supports a specific image format
 * This function caches the result to avoid redundant checks
 * 
 * @param format Image format to check support for
 * @returns Promise resolving to boolean indicating format support
 */
export async function supportsFormat(format: ImageFormat): Promise<boolean> {
  // Return cached result if available
  if (formatSupportCache[format] !== null) return formatSupportCache[format] as boolean;
  
  // Skip check on server
  if (typeof window === 'undefined') return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = function() {
      formatSupportCache[format] = true;
      resolve(true);
    };
    
    img.onerror = function() {
      formatSupportCache[format] = false;
      resolve(false);
    };
    
    // Test images for different formats
    switch(format) {
      case 'webp':
        img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
        break;
      case 'avif':
        img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        break;
      default:
        // For formats we always assume support for, resolve immediately
        formatSupportCache[format] = true;
        resolve(true);
        return;
    }
  });
}

/**
 * Check if the browser supports WebP format
 * This function caches the result to avoid redundant checks
 * 
 * @returns Promise resolving to boolean indicating WebP support
 */
export async function supportsWebP(): Promise<boolean> {
  return supportsFormat('webp');
}

/**
 * Get the best image source based on available formats and viewport size
 * This function tries to use WebP/AVIF format and appropriately sized images when available
 * 
 * @param src Original image source
 * @param options Optional configuration for optimization
 * @returns Optimized image source
 */
export function getOptimizedImageSrc(
  src: string, 
  options?: { 
    forceFormat?: ImageFormat, 
    format?: ImageFormat, // Added format option as an alias to forceFormat
    quality?: 'low' | 'medium' | 'high',
    priority?: boolean
  }
): string {
  if (!src) return src;
  
  // Skip data URIs
  if (src.startsWith('data:')) return src;
  
  // Skip external URLs unless they're from our CDN
  if (src.startsWith('http') && !src.includes('riker.replit.dev') && !src.includes('replit.app')) {
    return src;
  }
  
  // If the path includes the full domain, extract just the path part
  if (src.includes('riker.replit.dev') || src.includes('replit.app')) {
    try {
      src = new URL(src).pathname;
    } catch (e) {
      // If URL parsing fails, keep the original
      console.warn(`Failed to parse URL: ${src}`);
    }
  }
  
  // Default options
  const { forceFormat, format, quality = 'medium', priority = false } = options || {};
  
  // Use format as an alias to forceFormat if provided
  const effectiveFormat = format || forceFormat;
  
  // Get screen width to determine appropriate image size
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  
  // Use network conditions to determine appropriate size
  let sizeSuffix = 'medium'; // Default size
  
  // Calculate effective screen width accounting for device pixel ratio
  const effectiveWidth = screenWidth * devicePixelRatio;
  
  // Determine size based on screen dimensions and network conditions
  if (networkInfo.saveData || networkInfo.connectionType === 'slow-2g' || networkInfo.connectionType === '2g') {
    // Always use small images on poor connections or when data saver is enabled
    sizeSuffix = 'small';
  } else if (effectiveWidth <= 640 || networkInfo.effectiveBandwidth < 1.5) {
    // Small screens or slow connections
    sizeSuffix = 'small';
  } else if (effectiveWidth > 1280 && networkInfo.effectiveBandwidth >= 5 && !networkInfo.saveData) {
    // Large, high-DPI screens with good connection
    sizeSuffix = 'large';
  }
  
  // Override size suffix based on quality parameter
  if (quality === 'low') {
    sizeSuffix = 'small';
  } else if (quality === 'high' && networkInfo.effectiveBandwidth >= 5 && !networkInfo.saveData) {
    sizeSuffix = 'large';
  }
  
  // Determine best available format
  let bestFormat: ImageFormat = 'jpeg'; // Default fallback
  
  // If format is forced or provided, use that
  if (effectiveFormat) {
    bestFormat = effectiveFormat;
  } 
  // Otherwise determine based on browser support
  else {
    if (formatSupportCache.avif === true) {
      bestFormat = 'avif';
    } else if (formatSupportCache.webp === true) {
      bestFormat = 'webp';
    } else if (src.endsWith('.png')) {
      bestFormat = 'png';
    }
  }
  
  // Optimization logic for specific image collections
  
  // Common function to handle image optimization across collections
  const getOptimizedVersionForCollection = (
    collectionPath: string, 
    fileNameWithoutExt: string,
    format: ImageFormat
  ): string | null => {
    // Build path to optimized version
    const optimizedPath = `${collectionPath}/optimized/${fileNameWithoutExt}-${sizeSuffix}.${format}`;
    
    // Create a cache key for this specific optimized version
    const cacheKey = `${collectionPath.replace('/images/', '')}-${fileNameWithoutExt}-${sizeSuffix}-${format}`;
    
    // If we've previously loaded this successfully, use it again
    if (imageLoadCache[cacheKey] === true) {
      return optimizedPath;
    }
    
    // If we've tried this before and it failed, don't try again
    if (imageLoadCache[cacheKey] === false) {
      return null;
    }
    
    // Try to load the optimized version asynchronously to confirm it exists
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.onload = () => {
        imageLoadCache[cacheKey] = true;
      };
      img.onerror = () => {
        imageLoadCache[cacheKey] = false;
        // Only log if it's not a normal fallback situation
        if (format === bestFormat) {
          console.warn(`Optimized image not found: ${optimizedPath}`);
        }
      };
      img.src = optimizedPath;
      
      // If this is a high priority image, also preload it
      if (priority) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = optimizedPath;
        document.head.appendChild(link);
      }
    }
    
    return optimizedPath;
  };
  
  // Extract filename if there is one
  const fileName = src.split('/').pop() || '';
  const fileNameWithoutExt = fileName.split('.')[0];
  
  // Path normalization - handle various path inconsistencies
  // Fixed paths for adventure images using the original asset versions we've copied
  if (src.includes('/images/Huskys/') || src.toLowerCase().includes('husky')) {
    // Check WebP support and use the optimized version with appropriate size
    const useWebP = formatSupportCache.webp === true;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const size = screenWidth < 768 ? 'small' : 'medium';
    
    if (useWebP) {
      return `/images/Huskys/optimized/Husky-${size}.webp`;
    } else {
      return `/images/Huskys/optimized/Husky-${size}.jpg`;
    }
  }
  
  if (src.includes('/images/Snowmobile/') || src.toLowerCase().includes('snowmobile')) {
    // Check WebP support and use the optimized version with appropriate size
    const useWebP = formatSupportCache.webp === true;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    
    // Select image size based on screen width and device pixel ratio
    let size = 'medium';
    if (screenWidth < 768) {
      size = 'small';
    } else if (screenWidth > 1440 && devicePixelRatio > 1) {
      size = 'large';
    }
    
    if (useWebP) {
      return `/images/Snowmobile/optimized/Snowmobile-${size}.webp`;
    } else {
      return `/images/Snowmobile/optimized/Snowmobile-${size}.jpg`;
    }
  }
  
  // Special cases for specific files with spaces - using optimized versions with sizing
  if (src.includes('Ice Kart') || src.includes('ice-kart') || src.includes('Ice-Kart')) {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const size = screenWidth < 768 ? 'small' : 'medium';
    return `/images/optimized/ice-kart-${size}.jpg`;
  }
  
  if (src.includes('Ice Fishing') || src.includes('Ice-Fishing') || src.includes('ice-fishing')) {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const size = screenWidth < 768 ? 'small' : 'medium';
    return `/images/optimized/Ice-Fishing-${size}.jpg`;
  }
  
  if (src.includes('Side By Side Buggy Drifting.jpg') || src.includes('Side-By-Side-Buggy-Drifting.jpg') || src.includes('buggy')) {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const size = screenWidth < 768 ? 'small' : 'medium';
    const useWebP = formatSupportCache.webp === true;
    
    if (useWebP) {
      return `/images/optimized/buggy-${size}.webp`;
    } else {
      return `/images/optimized/buggy-${size}.jpg`;
    }
  }
  
  if (src.includes('JayJays Restaurant.jpg') || src.includes('JayJays-Restaurant.jpg') || src.includes('jayjays')) {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const size = screenWidth < 768 ? 'small' : 'medium';
    const useWebP = formatSupportCache.webp === true;
    
    if (useWebP) {
      return `/images/restaurant/optimized/jayjays-exterior-${size}.webp`;
    } else {
      return `/images/restaurant/optimized/jayjays-exterior-${size}.jpg`;
    }
  }
  
  // Handle common path pattern issues with experiences
  if (src.includes('experiences/') || src.includes('Experiences/')) {
    // Make path lowercase for consistency
    src = src.replace(/Experiences\//i, 'experiences/');
    
    // Convert spaces in filenames to dashes
    const fileName = src.split('/').pop() || '';
    const fileNameFixed = fileName.replace(/\s+/g, '-').toLowerCase();
    
    if (fileName !== fileNameFixed) {
      const pathWithoutFile = src.substring(0, src.lastIndexOf('/') + 1);
      return `${pathWithoutFile}${fileNameFixed}`;
    }
  }
  
  // Handle filenames with spaces
  if (fileName.includes(' ')) {
    const pathWithoutFile = src.substring(0, src.lastIndexOf('/') + 1);
    const fileNameFixed = fileName.replace(/\s+/g, '-').toLowerCase();
    return `${pathWithoutFile}${fileNameFixed}`;
  }
  
  // Generic optimization for any image in the images folder
  if (src.includes('/images/') && !src.includes('optimized')) {
    // Extract the folder path
    const pathParts = src.split('/');
    const fileName = pathParts.pop() || '';
    const folderPath = pathParts.join('/');
    const fileNameWithoutExt = fileName.split('.')[0];
    
    // Check if we have an optimized version
    const useWebP = formatSupportCache.webp === true;
    const useAvif = formatSupportCache.avif === true;
    const deviceFormat = useAvif ? 'avif' : (useWebP ? 'webp' : 'jpg');
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    // Choose size based on device width
    let size = 'medium';
    if (screenWidth < 768) {
      size = 'small';
    } else if (screenWidth > 1440 && devicePixelRatio > 1) {
      size = 'large';
    }
    
    // Try to use the optimized version with the most appropriate format and size
    const genericOptimizedPath = `${folderPath}/optimized/${fileNameWithoutExt}-${size}.${deviceFormat}`;
    const fallbackOptimizedPath = `${folderPath}/optimized/${fileNameWithoutExt}-${size}.jpg`;
    const cacheKey = `generic-${folderPath}-${fileNameWithoutExt}-${size}-${deviceFormat}`;
    const fallbackCacheKey = `generic-${folderPath}-${fileNameWithoutExt}-${size}-jpg`;
    
    // Check cache first for primary format
    if (imageLoadCache[cacheKey] === true) {
      return genericOptimizedPath;
    }
    
    // Check cache for fallback format
    if (deviceFormat !== 'jpg' && imageLoadCache[fallbackCacheKey] === true) {
      return fallbackOptimizedPath;
    }
    
    // For images that we know should have optimized versions, use them
    const knownOptimizedFolders = [
      'experiences/', 
      'accommodations/', 
      'restaurant/', 
      'activities/'
    ];
    
    // Check if this is from a folder we know has optimized versions
    const isKnownFolder = knownOptimizedFolders.some(folder => src.toLowerCase().includes(folder.toLowerCase()));
    
    // Try to load the appropriate version
    if (typeof window !== 'undefined') {
      // First try WebP/AVIF version
      if (deviceFormat !== 'jpg') {
        const modernImg = new Image();
        modernImg.onload = () => {
          imageLoadCache[cacheKey] = true;
        };
        modernImg.onerror = () => {
          imageLoadCache[cacheKey] = false;
          
          // If modern format fails, try JPG fallback
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            imageLoadCache[fallbackCacheKey] = true;
          };
          fallbackImg.onerror = () => {
            imageLoadCache[fallbackCacheKey] = false;
          };
          fallbackImg.src = fallbackOptimizedPath;
        };
        modernImg.src = genericOptimizedPath;
      } else {
        // Just try the JPG version
        const img = new Image();
        img.onload = () => {
          imageLoadCache[fallbackCacheKey] = true;
        };
        img.onerror = () => {
          imageLoadCache[fallbackCacheKey] = false;
        };
        img.src = fallbackOptimizedPath;
      }
    }
    
    // For known image folders, we'll gamble on the optimized version existing
    // The error handler on the actual <img> tag will catch failures and provide fallbacks
    if (isKnownFolder) {
      return deviceFormat !== 'jpg' ? genericOptimizedPath : fallbackOptimizedPath;
    }
  }
  
  return src;
}

/**
 * Prefetch important images to improve perceived load time
 * Also prefetches optimized WebP versions when available
 * 
 * @param imagePaths Array of image paths to prefetch
 * @param options Configuration options
 */
export function prefetchImages(
  imagePaths: string[], 
  options?: { priorityImages?: string[], lowPriorityDelay?: number }
): void {
  if (!imagePaths || !imagePaths.length) return;
  
  const { priorityImages = [], lowPriorityDelay = 1000 } = options || {};
  
  // First prefetch any high-priority images immediately
  if (priorityImages.length > 0) {
    priorityImages.forEach(imagePath => {
      // Try to use optimized version if available - mark as high priority
      const optimizedSrc = getOptimizedImageSrc(imagePath, { 
        quality: 'high',
        priority: true 
      });
      
      // Create image and preload tag for high-priority images
      const img = new Image();
      img.src = optimizedSrc;
      
      // Also add a preload link to ensure browser prioritizes these images
      if (typeof document !== 'undefined') {
        const existingPreload = document.querySelector(`link[rel="preload"][href="${optimizedSrc}"]`);
        if (!existingPreload) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = optimizedSrc;
          
          // Add fetchpriority attribute if supported 
          if ('fetchpriority' in HTMLLinkElement.prototype) {
            link.setAttribute('fetchpriority', 'high');
          }
          
          document.head.appendChild(link);
        }
      }
    });
  }
  
  // Function to prefetch a batch of images
  const prefetchBatch = (paths: string[], startIndex: number, batchSize: number) => {
    const endIndex = Math.min(startIndex + batchSize, paths.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const imagePath = paths[i];
      // Try to use optimized version if available
      const optimizedSrc = getOptimizedImageSrc(imagePath);
      const img = new Image();
      img.src = optimizedSrc;
    }
    
    // If there are more images to prefetch, schedule the next batch
    if (endIndex < paths.length) {
      setTimeout(() => {
        prefetchBatch(paths, endIndex, batchSize);
      }, 100); // Small delay between batches to avoid overwhelming the browser
    }
  };
  
  // Wait for the browser to be idle before prefetching remaining images
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      // Filter out any images already prefetched in priority list
      const remainingImages = imagePaths.filter(path => !priorityImages.includes(path));
      prefetchBatch(remainingImages, 0, 3); // Start prefetching in batches of 3
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      // Filter out any images already prefetched in priority list
      const remainingImages = imagePaths.filter(path => !priorityImages.includes(path));
      prefetchBatch(remainingImages, 0, 3); // Start prefetching in batches of 3
    }, lowPriorityDelay);
  }
}

/**
 * Apply optimal image loading attributes to all images on the page
 */
export function optimizePageImages(): void {
  if (typeof document === 'undefined') return;
  
  // Wait for the browser to be idle
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      applyImageOptimizations();
    });
  } else {
    // Fallback
    setTimeout(applyImageOptimizations, 1000);
  }
}

/**
 * Helper function to apply optimizations to all images
 */
function applyImageOptimizations(): void {
  const allImages = document.querySelectorAll('img');
  const supportsIntersectionObserver = 'IntersectionObserver' in window;
  const dataProtocol = 'data:';
  
  // Process images based on priority
  // First apply optimizations to images that are in the viewport
  const priorityImages: HTMLImageElement[] = [];
  const nonPriorityImages: HTMLImageElement[] = [];
  
  // Split images into priority (in viewport) and non-priority
  allImages.forEach((img) => {
    // Skip already processed images
    if (img.dataset.optimized) return;
    
    // Skip data URIs and blank images
    const src = img.getAttribute('src');
    if (!src || src.startsWith(dataProtocol)) return;
    
    // Mark as processed
    img.dataset.optimized = 'true';
    
    if (isInViewport(img)) {
      priorityImages.push(img as HTMLImageElement);
    } else {
      nonPriorityImages.push(img as HTMLImageElement);
    }
  });
  
  // Process priority images immediately
  priorityImages.forEach(img => optimizeImage(img, true));
  
  // Use Intersection Observer for non-priority images if available
  if (supportsIntersectionObserver && nonPriorityImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          optimizeImage(img, false);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px', // Start loading when image is 200px from viewport
      threshold: 0.01
    });
    
    nonPriorityImages.forEach(img => {
      imageObserver.observe(img);
      // Set a lazy loading attribute for browsers that support it
      // as a fallback in case observer doesn't trigger
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  } else {
    // Fallback for browsers without Intersection Observer
    nonPriorityImages.forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
      
      // Process the image after a short delay to prioritize critical elements
      setTimeout(() => optimizeImage(img, false), 100);
    });
  }
}

/**
 * Apply optimizations to a single image
 * @param img The image element to optimize
 * @param isPriority Whether this is a priority image (in viewport)
 */
function optimizeImage(img: HTMLImageElement, isPriority: boolean): void {
  try {
    // Skip images that are part of a responsive set or picture element
    if (img.closest('picture') || img.srcset) {
      // For responsive images, we just ensure proper loading attributes
      img.decoding = 'async';
      img.loading = isPriority ? 'eager' : 'lazy';
      return;
    }
    
    // Extract original attributes to preserve for fallback scenarios
    const originalSrc = img.src;
    const originalWidth = img.getAttribute('width');
    const originalHeight = img.getAttribute('height');
    const originalAlt = img.getAttribute('alt') || '';
    
    // Get natural dimensions of the image for aspect ratio
    let aspectRatio = null;
    if (img.naturalWidth && img.naturalHeight) {
      aspectRatio = img.naturalWidth / img.naturalHeight;
    }
    
    // Apply loading strategies based on priority
    if (isPriority) {
      img.loading = 'eager'; // Load immediately
      img.decoding = 'async'; // Process asynchronously
      
      // Set fetchpriority attribute using setAttribute for better compatibility
      // This signals to the browser that this is a high-priority fetch
      img.setAttribute('fetchpriority', 'high');
      
      // Also add importance attribute as a backup for older browsers (may be removed in future)
      img.setAttribute('importance', 'high');
    } else {
      img.loading = 'lazy'; // Defer loading until near viewport
      img.decoding = 'async'; // Process asynchronously
      
      // For low-priority images, explicitly mark as low priority if supported
      if (networkInfo.saveData) {
        img.setAttribute('fetchpriority', 'low');
      }
    }
    
    // Set appropriate image quality based on priority and network conditions
    const quality = isPriority ? 'high' : (networkInfo.saveData ? 'low' : 'medium');
    
    // Try to optimize the image source using modern formats if available
    if (img.src && typeof img.src === 'string') {
      // Check if this is an image that has optimized versions or contains the domain
      if (img.src.includes('/images/') || img.src.includes('riker.replit.dev')) {
        const optimizedSrc = getOptimizedImageSrc(img.src, {
          priority: isPriority,
          quality
        });
        
        if (optimizedSrc !== img.src) {
          img.src = optimizedSrc;
        }
      }
    }
    
    // Add error handler with smarter fallback strategy
    if (!img.onerror) {
      img.onerror = function() {
        const currentSrc = img.src;
        console.warn(`Failed to load optimized image: ${currentSrc}`);
        
        // Try a series of fallbacks:
        
        // 1. If we're trying an optimized version, fall back to original
        if (currentSrc !== originalSrc && currentSrc.includes('/optimized/')) {
          console.info(`Falling back to original image: ${originalSrc}`);
          img.src = originalSrc;
          return; // Exit and give the original a chance to load
        }
        
        // 2. If original fails, try a WebP version regardless of browser support
        if (currentSrc === originalSrc && !currentSrc.endsWith('.webp') && currentSrc.includes('/images/')) {
          // Generate a WebP path by replacing extension
          const webpSrc = currentSrc.replace(/\.(jpe?g|png)$/, '.webp');
          if (webpSrc !== currentSrc) {
            console.info(`Trying WebP fallback: ${webpSrc}`);
            img.src = webpSrc;
            return; // Exit and give WebP a chance to load
          }
        }
        
        // 3. Final fallback to a known good image
        if (!currentSrc.includes('TXA_fallback.jpg')) {
          console.info('Using default fallback image');
          img.src = '/images/TXA_fallback.jpg';
          // Reset dimensions to match the fallback image
          img.removeAttribute('width');
          img.removeAttribute('height');
          img.style.aspectRatio = 'auto';
        }
      };
    }
    
    // Add width and height attributes if missing to prevent layout shifts (CLS)
    if (!originalWidth && !originalHeight) {
      // Set dimensions to prevent layout shifts
      if (aspectRatio) {
        // If we know the aspect ratio, use it
        img.style.aspectRatio = `${aspectRatio}`;
      } else {
        // Default aspect ratio if not known
        img.style.aspectRatio = '4/3';
      }
      
      // For proper layout behavior
      img.setAttribute('width', '100%');
      img.style.display = 'block'; // Prevent inline gaps
    }
    
    // Add accessibility attributes if missing
    if (!originalAlt && img.getAttribute('role') !== 'presentation') {
      // If the image is likely decorative, mark it as presentation
      if (img.closest('.bg-image') || img.closest('.decoration')) {
        img.setAttribute('role', 'presentation');
        img.setAttribute('alt', '');
      } else {
        // Otherwise, add a basic alt derived from filename or parent context
        const filename = img.src.split('/').pop()?.split('.')[0] || '';
        const parentText = img.closest('figure')?.querySelector('figcaption')?.textContent ||
                       img.closest('a')?.textContent || '';
        
        const altText = parentText || filename.replace(/[-_]/g, ' ');
        img.setAttribute('alt', altText);
      }
    }
    
    // For priority images above the fold, preload
    if (isPriority && typeof document !== 'undefined') {
      // Check if we already have a preload for this image
      const existingPreload = document.querySelector(`link[rel="preload"][href="${img.src}"]`);
      if (!existingPreload) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        
        // Set fetchpriority if supported
        if ('fetchpriority' in HTMLLinkElement.prototype) {
          link.setAttribute('fetchpriority', 'high');
        }
        
        // If image is WebP format, add the 'type' attribute for better browser handling
        if (img.src.endsWith('.webp')) {
          link.setAttribute('type', 'image/webp');
        } else if (img.src.endsWith('.avif')) {
          link.setAttribute('type', 'image/avif');
        }
        
        // Add to head for high priority loading
        document.head.appendChild(link);
        
        // For hero images or large above-the-fold images, consider prerendering if network is good
        if (img.width > 600 && !networkInfo.saveData && networkInfo.effectiveBandwidth > 5) {
          if ('fetchpriority' in HTMLLinkElement.prototype) {
            img.setAttribute('fetchpriority', 'high');
            img.setAttribute('importance', 'high');
          }
        }
      }
    }
    
    // For important images, track loading performance
    if (isPriority && window.performance && 'PerformanceObserver' in window) {
      try {
        // Create a unique ID for this image if not present
        if (!img.id) {
          img.id = `img-${Math.random().toString(36).substring(2, 9)}`;
        }
        
        // Mark the start of loading
        performance.mark(`${img.id}-start`);
        
        // Listen for load completion
        img.addEventListener('load', () => {
          performance.mark(`${img.id}-end`);
          performance.measure(
            `image-load-${img.id}`,
            `${img.id}-start`,
            `${img.id}-end`
          );
        });
      } catch (e) {
        // Ignore performance measurement errors
      }
    }
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

/**
 * Check if an element is currently in the viewport
 */
function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}