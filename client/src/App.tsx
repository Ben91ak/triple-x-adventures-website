import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense, memo, useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import { VideoProvider } from "@/contexts/VideoContext";
import applyAllOptimizations from "@/utils/performance-optimizer";
import { initImagePreloading } from "@/utils/image-preloader";
import "./styles/theme.css";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const ProfessionalServices = lazy(() => import("@/pages/professional-services"));
const NotFound = lazy(() => import("@/pages/not-found"));
const About = lazy(() => import("@/pages/about"));
const Accommodations = lazy(() => import("@/pages/accommodations"));
const Contact = lazy(() => import("@/pages/contact"));
const Restaurant = lazy(() => import("@/pages/restaurant"));
const Admin = lazy(() => import("@/pages/admin"));
const MediaManager = lazy(() => import("@/pages/admin/media"));

// Loading fallback component for lazy-loaded pages with improved HTML5 semantics
const PageLoader = () => (
  <article className="flex items-center justify-center min-h-screen bg-dark-bg" aria-live="polite" role="status">
    <div className="text-primary-text">
      <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-accent-color" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className="sr-only">Loading page content...</span>
    </div>
  </article>
);

// Memoize Router component to prevent unnecessary re-renders
const Router = memo(function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/professional-services" component={ProfessionalServices} />
        <Route path="/about" component={About} />
        <Route path="/accommodations" component={Accommodations} />
        <Route path="/contact" component={Contact} />
        <Route path="/restaurant" component={Restaurant} />
        
        {/* Admin routes */}
        <Route path="/admin" component={Admin} />
        <Route path="/admin/media" component={MediaManager} />
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
});

function App() {
  // Configure performance options for QueryClient
  queryClient.setDefaultOptions({
    queries: {
      // Better stale time for less frequent refetching
      staleTime: 5 * 60 * 1000,
      // Cache results for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed queries only twice
      retry: 2,
      // Use network-only for initial query
      refetchOnWindowFocus: false,
    },
  });

  // Apply performance optimizations when app loads
  useEffect(() => {
    // Apply all performance optimizations
    applyAllOptimizations();
    
    // Initialize image preloading system
    initImagePreloading();
    
    // Register a service worker for offline capabilities
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch(error => {
          console.log('Service Worker registration failed:', error);
        });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LanguageProvider>
          <VideoProvider>
            <Router />
            <Toaster />
          </VideoProvider>
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
