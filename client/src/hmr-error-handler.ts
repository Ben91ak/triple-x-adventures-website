/**
 * HMR WebSocket Error Handler
 * 
 * This script handles WebSocket connection errors that might occur during development
 * with Vite's Hot Module Replacement. It prevents these errors from appearing in the console.
 */

// Wait for DOMContentLoaded to ensure window is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // Setup error handlers for WebSocket connections
  setupWebSocketErrorHandling();
  
  // Add unhandled rejection handler for fetch/XHR/WebSocket errors
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    if (error && error.message && typeof error.message === 'string') {
      // Check if it's related to HMR connection
      if (
        error.message.includes('WebSocket') || 
        error.message.includes('ws://') || 
        error.message.includes('wss://') ||
        error.message.includes('replit.dev')
      ) {
        // Prevent the error from showing in console
        event.preventDefault();
        console.log('HMR: WebSocket connection issue suppressed');
      }
    }
  });
});

/**
 * Sets up error handling for WebSocket connections
 */
function setupWebSocketErrorHandling() {
  try {
    // Store original error event handler
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    // Override addEventListener to intercept WebSocket error handlers
    EventTarget.prototype.addEventListener = function(
      type: string, 
      listener: EventListenerOrEventListenerObject, 
      options?: boolean | AddEventListenerOptions
    ) {
      if (
        type === 'error' && 
        this instanceof WebSocket && 
        (this.url.includes('/_vite/') || this.url.includes('replit.dev'))
      ) {
        console.log('HMR: WebSocket error handler intercepted');
        
        // Create a wrapper for the error event listener
        const wrappedListener = function(this: any, event: Event) {
          // Prevent the default browser error handling
          event.preventDefault?.();
          
          console.log('HMR: WebSocket connection issue - hot reloading may not work');
          
          // Still call the original listener
          if (typeof listener === 'function') {
            listener.call(this, event);
          } else if (listener && typeof listener.handleEvent === 'function') {
            listener.handleEvent.call(listener, event);
          }
        };
        
        // Call the original addEventListener with our wrapped listener
        return originalAddEventListener.call(this, type, wrappedListener as EventListener, options);
      }
      
      // Default behavior for all other cases
      return originalAddEventListener.call(this, type, listener, options);
    };
    
    console.log('HMR error handling initialized');
  } catch (err) {
    console.warn('Could not set up HMR error handling:', err);
  }
}

export {};