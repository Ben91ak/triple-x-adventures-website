// Utility functions for scroll position preservation in modals

let savedScrollPosition = 0;
let scrollbarWidth = 0;

// Calculate scrollbar width
export function getScrollbarWidth(): number {
  if (scrollbarWidth !== 0) return scrollbarWidth;
  
  // Create a temporary div to measure scrollbar width
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; 
  (outer.style as any).msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode?.removeChild(outer);
  
  return scrollbarWidth;
}

// Disable body scroll and preserve scroll position
export function disableBodyScroll(): void {
  // Save current scroll position
  savedScrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  
  // Get scrollbar width to prevent layout shift (skip on mobile)
  const scrollWidth = window.innerWidth <= 768 ? 0 : getScrollbarWidth();
  
  // Apply styles to prevent scrolling and maintain position
  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedScrollPosition}px`;
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
  document.body.style.left = '0';
  document.body.style.right = '0';
  
  // Different touch handling for mobile vs desktop
  if (window.innerWidth <= 768) {
    // On mobile, allow touch but prevent rubber band scrolling
    document.body.style.touchAction = 'none';
    (document.body.style as any).webkitOverflowScrolling = 'touch';
  } else {
    document.body.style.touchAction = 'manipulation';
  }
  
  // Prevent layout shift by adding padding for scrollbar width (desktop only)
  if (scrollWidth > 0) {
    document.body.style.paddingRight = `${scrollWidth}px`;
  }
  
  // Add modal class for additional styling
  document.body.classList.add('modal-open');
}

// Restore body scroll and scroll position
export function enableBodyScroll(): void {
  // Remove modal class
  document.body.classList.remove('modal-open');
  
  // Restore body styles
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.body.style.touchAction = '';
  document.body.style.left = '';
  document.body.style.right = '';
  (document.body.style as any).webkitOverflowScrolling = '';
  
  // Restore scroll position with fallback for mobile Safari
  requestAnimationFrame(() => {
    window.scrollTo({ top: savedScrollPosition, behavior: 'instant' });
    // Fallback for older browsers
    if (window.scrollY !== savedScrollPosition) {
      window.scrollTo(0, savedScrollPosition);
    }
  });
}

// Clean up function for emergency cleanup
export function cleanupScrollState(): void {
  document.body.classList.remove('modal-open');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.body.style.touchAction = '';
  document.body.style.left = '';
  document.body.style.right = '';
  (document.body.style as any).webkitOverflowScrolling = '';
} 