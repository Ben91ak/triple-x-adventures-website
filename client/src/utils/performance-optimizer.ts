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
          video.dataset.autoPaused = 'true';
        }
      });
    } else {
      // Tab is visible again, resume videos that were auto-paused
      videos.forEach(video => {
        if (video.dataset.autoPaused === 'true') {
          // Only resume if the video was auto-paused by our code
          video.play().catch(() => {
            // Handle potential autoplay restrictions
            console.log('Auto-resume prevented by browser policy');
          });
          // Clear the auto-paused flag
          delete video.dataset.autoPaused;
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
        if (video.paused && !video.dataset.userPaused) {
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
          video.dataset.autoPaused = 'true';
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
      if (!document.hidden && !video.dataset.autoPaused) {
        // User manually paused the video
        video.dataset.userPaused = 'true';
      }
    });
    
    // Clear user-paused flag when user plays the video
    video.addEventListener('play', () => {
      delete video.dataset.userPaused;
    });
  });
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
    
    // Use a short delay to ensure all videos are initialized
    setTimeout(() => {
      setupIntersectionObserverForVideos();
    }, 1000);
  }
}