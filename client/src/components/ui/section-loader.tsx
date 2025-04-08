import React from 'react';

/**
 * Loading component for lazy-loaded sections
 */
export const SectionLoader: React.FC = () => (
  <div className="w-full h-64 flex flex-col items-center justify-center space-y-4">
    <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
    <p className="text-muted-foreground">Loading experience...</p>
  </div>
);

export default SectionLoader;