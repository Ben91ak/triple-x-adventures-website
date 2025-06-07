/**
 * SEO Analytics and Performance Monitoring
 * Tracks Core Web Vitals, user engagement, and SEO metrics
 */

// Core Web Vitals tracking
export function initCoreWebVitals() {
  if ('web-vital' in window) return;
  
  // Dynamically import web-vitals for performance tracking
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
    // Track Cumulative Layout Shift
    onCLS((metric) => {
      console.log('CLS:', metric);
      sendToAnalytics('CLS', metric.value, metric.rating);
    });
    
    // Track First Input Delay
    onFID((metric) => {
      console.log('FID:', metric);
      sendToAnalytics('FID', metric.value, metric.rating);
    });
    
    // Track First Contentful Paint
    onFCP((metric) => {
      console.log('FCP:', metric);
      sendToAnalytics('FCP', metric.value, metric.rating);
    });
    
    // Track Largest Contentful Paint
    onLCP((metric) => {
      console.log('LCP:', metric);
      sendToAnalytics('LCP', metric.value, metric.rating);
    });
    
    // Track Time to First Byte
    onTTFB((metric) => {
      console.log('TTFB:', metric);
      sendToAnalytics('TTFB', metric.value, metric.rating);
    });
    
    // Track Interaction to Next Paint (new metric)
    onINP((metric) => {
      console.log('INP:', metric);
      sendToAnalytics('INP', metric.value, metric.rating);
    });
  }).catch(console.error);
}

// Send metrics to analytics
function sendToAnalytics(metricName: string, value: number, rating: string) {
  // Send to Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metricName,
      value: Math.round(metricName === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
      non_interaction: true,
    });
  }
  
  // Send to custom analytics endpoint if needed
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: metricName,
        value,
        rating,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Fail silently to not impact user experience
    });
  }
}

// Track scroll depth for engagement metrics
export function trackScrollDepth() {
  let maxScroll = 0;
  let ticking = false;
  
  const calculateScrollPercentage = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackLength = documentHeight - windowHeight;
    const scrollPercentage = Math.floor((scrollTop / trackLength) * 100);
    
    return Math.min(scrollPercentage, 100);
  };
  
  const updateMaxScroll = () => {
    const currentScroll = calculateScrollPercentage();
    
    if (currentScroll > maxScroll) {
      maxScroll = currentScroll;
      
      // Track milestone percentages
      const milestones = [25, 50, 75, 90, 100];
      milestones.forEach(milestone => {
        if (maxScroll >= milestone && maxScroll - currentScroll < 5) {
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
              event_category: 'Engagement',
              event_label: `${milestone}%`,
              value: milestone,
            });
          }
        }
      });
    }
    
    ticking = false;
  };
  
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateMaxScroll);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Track scroll depth when user leaves
  window.addEventListener('beforeunload', () => {
    if (typeof gtag !== 'undefined' && maxScroll > 0) {
      gtag('event', 'max_scroll_depth', {
        event_category: 'Engagement',
        event_label: 'Page Exit',
        value: maxScroll,
      });
    }
  });
}

// Track time on page
export function trackTimeOnPage() {
  const startTime = Date.now();
  let isHidden = false;
  
  // Track when page visibility changes
  document.addEventListener('visibilitychange', () => {
    isHidden = document.hidden;
  });
  
  // Send time on page when user leaves
  window.addEventListener('beforeunload', () => {
    if (!isHidden) {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'time_on_page', {
          event_category: 'Engagement',
          event_label: window.location.pathname,
          value: timeOnPage,
        });
      }
    }
  });
}

// Track organic search traffic
export function trackOrganicSearch() {
  const referrer = document.referrer;
  const searchEngines = [
    { name: 'google', pattern: /google\./i },
    { name: 'bing', pattern: /bing\./i },
    { name: 'yahoo', pattern: /yahoo\./i },
    { name: 'duckduckgo', pattern: /duckduckgo\./i },
    { name: 'baidu', pattern: /baidu\./i },
    { name: 'yandex', pattern: /yandex\./i },
  ];
  
  const searchEngine = searchEngines.find(se => se.pattern.test(referrer));
  
  if (searchEngine) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'organic_search_visit', {
        event_category: 'SEO',
        event_label: searchEngine.name,
        referrer: referrer,
      });
    }
    
    // Store in sessionStorage for later analysis
    sessionStorage.setItem('organic_source', searchEngine.name);
  }
}

// Track clicks on AI-optimized content
export function trackAIContentInteraction(element: HTMLElement, action: string) {
  const aiCategory = element.getAttribute('data-ai-category');
  const aiContent = element.getAttribute('data-ai-content');
  
  if (typeof gtag !== 'undefined') {
    gtag('event', 'ai_content_interaction', {
      event_category: 'AI_SEO',
      event_label: action,
      ai_category: aiCategory,
      ai_content_type: aiContent,
    });
  }
}

// Initialize all SEO tracking
export function initSEOAnalytics() {
  // Initialize Core Web Vitals tracking
  initCoreWebVitals();
  
  // Track scroll depth
  trackScrollDepth();
  
  // Track time on page
  trackTimeOnPage();
  
  // Track organic search traffic
  trackOrganicSearch();
  
  // Set up AI content interaction tracking
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const aiElement = target.closest('[data-ai-content="true"]');
    
    if (aiElement) {
      trackAIContentInteraction(aiElement as HTMLElement, 'click');
    }
  });
  
  // Track performance metrics
  if ('PerformanceObserver' in window) {
    // Track long tasks for better understanding of page performance
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {  // Tasks longer than 50ms
            console.log('Long Task detected:', entry);
            
            if (typeof gtag !== 'undefined') {
              gtag('event', 'long_task', {
                event_category: 'Performance',
                event_label: 'Long Task',
                value: Math.round(entry.duration),
              });
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.log('Long Task Observer not supported');
    }
  }
  
  // Log SEO analytics initialization
  console.log('SEO Analytics initialized');
}

// Export performance data for debugging
export function getPerformanceReport() {
  if (!window.performance) return null;
  
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  return {
    // Navigation timing
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domInteractive: navigation.domInteractive - navigation.responseEnd,
    domComplete: navigation.domComplete - navigation.domInteractive,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    
    // Resource timing summary
    resources: performance.getEntriesByType('resource').length,
    
    // Memory usage (if available)
    memory: (performance as any).memory ? {
      usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
      totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
      jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
    } : null,
  };
}