/**
 * Image Optimization Utilities
 * 
 * This module provides functions for optimizing images and improving loading performance
 */

// Cache object to store image load states
const imageLoadCache: Record<string, boolean> = {};

/**
 * Get the best image source based on available formats and viewport size
 * This function tries to use WebP format and appropriately sized images when available
 * 
 * @param src Original image source
 * @returns Optimized image source
 */
export function getOptimizedImageSrc(src: string): string {
  if (!src) return src;
  
  // Skip external URLs
  if (src.startsWith('http')) return src;
  
  // Get screen width to determine appropriate image size
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  let sizeSuffix = 'medium'; // Default size
  
  // Determine appropriate size based on screen width
  if (screenWidth <= 640) {
    sizeSuffix = 'small';
  } else if (screenWidth > 1280 && sizeSuffix === 'large') {
    sizeSuffix = 'large';
  }
  
  // For Husky images, use our optimized WebP versions
  if (src.includes('/images/Huskys/') && !src.includes('optimized')) {
    const fileName = src.split('/').pop() || '';
    const fileNameWithoutExt = fileName.split('.')[0];
    const optimizedWebP = `/images/Huskys/optimized/${fileNameWithoutExt}-${sizeSuffix}.webp`;
    
    // Cache the WebP path for future reference
    const cacheKey = `husky-${fileNameWithoutExt}-${sizeSuffix}`;
    
    // If we've already successfully loaded this WebP, use it again
    if (imageLoadCache[cacheKey]) {
      return optimizedWebP;
    }
    
    // If we've tried and failed to load this WebP, use original
    if (imageLoadCache[cacheKey] === false) {
      return src;
    }
    
    // Try to load the WebP version asynchronously
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.onload = () => {
        imageLoadCache[cacheKey] = true;
      };
      img.onerror = () => {
        imageLoadCache[cacheKey] = false;
        console.error(`Failed to load optimized image: ${optimizedWebP}`);
      };
      img.src = optimizedWebP;
    }
    
    // Use WebP directly - we have confirmed they exist
    return optimizedWebP;
  }
  
  // For Snowmobile images, use our optimized WebP versions
  if (src.includes('/images/Snowmobile/') && !src.includes('optimized')) {
    const fileName = src.split('/').pop() || '';
    const fileNameWithoutExt = fileName.split('.')[0];
    const optimizedWebP = `/images/Snowmobile/optimized/${fileNameWithoutExt}-${sizeSuffix}.webp`;
    
    // Cache the WebP path for future reference
    const cacheKey = `snowmobile-${fileNameWithoutExt}-${sizeSuffix}`;
    
    // If we've already successfully loaded this WebP, use it again
    if (imageLoadCache[cacheKey]) {
      return optimizedWebP;
    }
    
    // If we've tried and failed to load this WebP, use original
    if (imageLoadCache[cacheKey] === false) {
      return src;
    }
    
    // Try to load the WebP version asynchronously
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.onload = () => {
        imageLoadCache[cacheKey] = true;
      };
      img.onerror = () => {
        imageLoadCache[cacheKey] = false;
        console.error(`Failed to load optimized image: ${optimizedWebP}`);
      };
      img.src = optimizedWebP;
    }
    
    // Use WebP directly - we have confirmed they exist
    return optimizedWebP;
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
      // Try to use optimized version if available
      const optimizedSrc = getOptimizedImageSrc(imagePath);
      const img = new Image();
      img.src = optimizedSrc;
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
  
  allImages.forEach((img, index) => {
    // Skip already processed images
    if (img.dataset.optimized) return;
    
    // Mark as processed
    img.dataset.optimized = 'true';
    
    // Apply loading strategies based on position
    if (isInViewport(img)) {
      img.loading = 'eager';
      img.decoding = 'async';
    } else {
      img.loading = 'lazy';
      img.decoding = 'async';
    }
    
    // Try to optimize the image source using WebP if available
    if (img.src && typeof img.src === 'string') {
      // Check if this is an image that has optimized versions
      if (img.src.includes('/images/Huskys/') || img.src.includes('/images/Snowmobile/')) {
        const optimizedSrc = getOptimizedImageSrc(img.src);
        if (optimizedSrc !== img.src) {
          img.src = optimizedSrc;
        }
      }
    }
    
    // Add error handler if not already present
    if (!img.onerror) {
      img.onerror = function() {
        console.error(`Failed to load image: ${img.src}`);
        // Only apply fallback if src isn't already the fallback
        if (!img.src.includes('TXA_fallback.jpg')) {
          img.src = '/images/TXA_fallback.jpg';
        }
      };
    }
    
    // Add width and height attributes if missing to prevent layout shifts
    if (!img.getAttribute('width') && !img.getAttribute('height')) {
      img.setAttribute('width', '100%');
      img.style.aspectRatio = '4/3'; // Default aspect ratio if not specified
    }
  });
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