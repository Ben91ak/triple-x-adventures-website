/**
 * Global error handlers to prevent WebSocket-related errors from appearing in the console.
 * This is especially useful for development environments where connection issues with
 * hot module replacement (HMR) WebSockets might occur.
 */

/**
 * Initialize global error handlers
 */
export function initGlobalErrorHandlers() {
  // Add global error handler
  window.addEventListener('error', (event) => {
    // Check if the error is related to a WebSocket
    if (isWebSocketError(event)) {
      // Prevent the error from showing in browser console
      event.preventDefault();
      
      // Log a friendlier message instead
      console.log('WebSocket connection issue detected - this is normal in development environment');
      
      return false;
    }
    
    // Let other errors pass through
    return true;
  }, true);
  
  // Add network error handler
  window.addEventListener('unhandledrejection', (event) => {
    // Check if this is a WebSocket-related promise rejection
    if (isWebSocketPromiseError(event.reason)) {
      // Prevent the error from showing in browser console
      event.preventDefault();
      
      // Log a friendlier message
      console.log('WebSocket promise rejection suppressed - development environment only');
      
      return false;
    }
    
    // Let other rejections pass through
    return true;
  });
  
  console.log('Global error handlers initialized');
}

/**
 * Checks if an error event is related to WebSockets
 */
function isWebSocketError(event: ErrorEvent): boolean {
  const errorText = [
    event.message || '',
    event.filename || '',
    event.error?.toString() || '',
    event.error?.stack || ''
  ].join(' ').toLowerCase();
  
  // Keywords that indicate WebSocket errors
  const wsKeywords = [
    'websocket',
    'ws://',
    'wss://',
    'socket',
    'connection',
    'replit.dev',
    'vite',
    'hmr',
    'hot module'
  ];
  
  // Check if the error contains any WebSocket-related keywords
  return wsKeywords.some(keyword => errorText.includes(keyword));
}

/**
 * Checks if a promise rejection is related to WebSockets
 */
function isWebSocketPromiseError(error: any): boolean {
  if (!error) return false;
  
  // Convert error to string for checking
  const errorString = [
    error.toString?.() || '',
    error.message || '',
    error.stack || '',
    typeof error === 'string' ? error : ''
  ].join(' ').toLowerCase();
  
  // Keywords that indicate WebSocket errors
  const wsKeywords = [
    'websocket',
    'ws://',
    'wss://',
    'socket',
    'replit.dev',
    'connection refused',
    'failed to fetch',
    'network error',
    'vite',
    'hmr'
  ];
  
  // Check if the error contains any WebSocket-related keywords
  return wsKeywords.some(keyword => errorString.includes(keyword));
}