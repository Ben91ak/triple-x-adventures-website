/**
 * Performance optimizer utilities for detecting scrolling, visibility,
 * device capabilities, and optimizing resource usage across the application.
 */

/**
 * Pauses all video playback when the tab is not visible to reduce CPU/battery usage
 */
export function setupVisibilityBasedOptimizations() {
  // Find all video elements on the page
  const videos = document.querySelectorAll('video');
  
  // Handle visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Tab is hidden, pause all videos
      videos.forEach(video => {
        if (!video.paused) {
          video.pause();
          // Mark the video as auto-paused so we can resume it when visible again
          video.setAttribute('data-auto-paused', 'true');
        }
      });
    } else {
      // Tab is visible again, resume videos that were auto-paused
      videos.forEach(video => {
        if (video.getAttribute('data-auto-paused') === 'true') {
          // Only resume if the video was auto-paused by our code
          video.play().catch(() => {
            // Handle potential autoplay restrictions
            console.log('Auto-resume prevented by browser policy');
          });
          // Clear the auto-paused flag
          video.removeAttribute('data-auto-paused');
        }
      });
    }
  });
}

/**
 * Optimizes performance during scroll by temporarily reducing animations
 * and other resource-intensive operations
 */
export function setupScrollOptimizations() {
  let scrollTimeout: ReturnType<typeof setTimeout>;
  let isScrolling = false;
  const html = document.documentElement;
  
  // Throttled scroll handler to avoid excessive DOM operations
  function handleScroll() {
    if (!isScrolling) {
      isScrolling = true;
      html.classList.add('is-scrolling');
      
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        isScrolling = false;
      });
    }
    
    // Clear the timeout on every scroll event
    clearTimeout(scrollTimeout);
    
    // Set a timeout to remove the scrolling class after scrolling stops
    scrollTimeout = setTimeout(() => {
      html.classList.remove('is-scrolling');
    }, 150); // Wait 150ms after scrolling stops before re-enabling animations
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Optimize video playback based on visibility in the viewport
 * Only plays videos when they're visible and pauses them when scrolled out of view
 */
export function setupIntersectionObserverForVideos() {
  // Skip if IntersectionObserver is not supported
  if (!('IntersectionObserver' in window)) return;
  
  const videos = document.querySelectorAll('video');
  if (videos.length === 0) return;
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target as HTMLVideoElement;
      
      // Don't interfere with videos that have controls (user-controlled)
      if (video.hasAttribute('controls')) return;
      
      if (entry.isIntersecting) {
        // Video is visible in the viewport
        if (video.paused && !video.getAttribute('data-user-paused')) {
          // Only play if it wasn't manually paused by the user
          video.play().catch(() => {
            console.log('Autoplay prevented by browser policy');
          });
        }
      } else {
        // Video is not visible in the viewport
        if (!video.paused) {
          video.pause();
          // Mark as auto-paused so we can distinguish from user-paused
          video.setAttribute('data-auto-paused', 'true');
        }
      }
    });
  }, {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // At least 10% of the video needs to be visible
  });
  
  // Observe all videos
  videos.forEach(video => {
    videoObserver.observe(video);
    
    // Track user-initiated pause events
    video.addEventListener('pause', () => {
      if (!document.hidden && !video.getAttribute('data-auto-paused')) {
        // User manually paused the video
        video.setAttribute('data-user-paused', 'true');
      }
    });
    
    // Clear user-paused flag when user plays the video
    video.addEventListener('play', () => {
      video.removeAttribute('data-user-paused');
    });
  });
}

/**
 * Optimizes images on a page by applying lazy loading and proper sizing
 */
export function optimizePageImages() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageOptimizations);
  } else {
    initImageOptimizations();
  }
  
  function initImageOptimizations() {
    // Find all images not already optimized
    const images = document.querySelectorAll('img:not([data-optimized])');
    
    // Set up IntersectionObserver if supported
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            
            // For images without explicit loading attribute, add lazy loading
            if (!img.hasAttribute('loading')) {
              img.loading = 'lazy';
            }
            
            // Set decoding to async for better performance
            if (!img.hasAttribute('decoding')) {
              img.decoding = 'async';
            }
            
            // Mark as optimized
            img.setAttribute('data-optimized', 'true');
            
            // Stop observing this image
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px', // Start loading when within 200px of viewport
      });
      
      // Start observing images
      images.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => {
        const imgElement = img as HTMLImageElement;
        if (!imgElement.hasAttribute('loading')) {
          imgElement.loading = 'lazy';
        }
        if (!imgElement.hasAttribute('decoding')) {
          imgElement.decoding = 'async';
        }
        imgElement.setAttribute('data-optimized', 'true');
      });
    }
  }
}

/**
 * Apply all performance optimizations
 */
export function applyPerformanceOptimizations() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOptimizations);
  } else {
    initOptimizations();
  }
  
  function initOptimizations() {
    setupVisibilityBasedOptimizations();
    setupScrollOptimizations();
    optimizePageImages();
    
    // Use a short delay to ensure all videos are initialized
    setTimeout(() => {
      setupIntersectionObserverForVideos();
    }, 1000);
  }
}