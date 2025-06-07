import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  structuredData?: any;
  children?: React.ReactNode;
  noindex?: boolean;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

export function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "/images/TXA_fallback_optimized.jpg",
  ogType = "website",
  structuredData,
  children,
  noindex = false,
  article = false,
  publishedTime,
  modifiedTime,
  author,
  additionalMetaTags = []
}: SEOProps) {
  const [location] = useLocation();
  const siteName = "Triple X Adventures";
  const siteUrl = 'https://triplexadventures.com';
  
  // Format the title with site name
  const formattedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // Format canonical URL correctly
  const fullCanonicalUrl = canonicalUrl 
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`)
    : `${siteUrl}${location}`;
  
  // Format OG image URL correctly  
  const fullOgImageUrl = ogImage.startsWith('http') 
    ? ogImage
    : `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  // Default organization structured data with 2025 best practices
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${siteUrl}/#organization`,
    "name": "Triple X Adventures",
    "alternateName": "TXA",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/images/logo.png`,
      "width": "600",
      "height": "200"
    },
    "image": [
      fullOgImageUrl,
      `${siteUrl}/images/hero-winter.jpg`,
      `${siteUrl}/images/snowmobile-tour.jpg`
    ],
    "description": "Premium Arctic adventure experiences in Swedish Lapland including snowmobiling, dog sledding, northern lights tours, and wilderness expeditions.",
    "slogan": "The Real Arctic Deal",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Adventure Base Road 1",
      "addressLocality": "Kiruna",
      "addressRegion": "Norrbotten",
      "postalCode": "981 00",
      "addressCountry": "SE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 67.8558,
      "longitude": 20.2253
    },
    "telephone": "+46-XXX-XXX-XXX",
    "email": "info@triplexadventures.com",
    "priceRange": "$$$",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "SEK,EUR,USD",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/triplexadventures",
      "https://www.instagram.com/triplexadventures",
      "https://www.youtube.com/triplexadventures",
      "https://www.tripadvisor.com/triplexadventures"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Arctic Adventure Tours",
      "itemListElement": [
        {
          "@type": "TouristTrip",
          "name": "Snowmobile Tours",
          "description": "Guided snowmobile adventures through Swedish Lapland",
          "touristType": "Adventure seekers",
          "duration": "P0DT2H30M"
        },
        {
          "@type": "TouristTrip",
          "name": "Dog Sledding Expeditions",
          "description": "Authentic husky sledding experiences in the Arctic wilderness",
          "touristType": "Nature lovers",
          "duration": "P0DT4H"
        },
        {
          "@type": "TouristTrip",
          "name": "Northern Lights Tours",
          "description": "Professional guided aurora borealis viewing experiences",
          "touristType": "Photography enthusiasts",
          "duration": "P0DT6H"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "312",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewBody": "Absolutely incredible Arctic experience! The guides were professional and the landscapes were breathtaking."
      }
    ]
  };

  // Website schema for search engines with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "Triple X Adventures",
    "description": "Premium Arctic adventure experiences in Swedish Lapland",
    "publisher": {
      "@id": `${siteUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US"
  };

  // Breadcrumb schema for better navigation understanding
  const breadcrumbSchema = location !== '/' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": fullCanonicalUrl
      }
    ]
  } : null;

  // Article schema for blog posts or news
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": fullOgImageUrl,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": {
      "@type": "Person",
      "name": author || "Triple X Adventures Team"
    },
    "publisher": {
      "@id": `${siteUrl}/#organization`
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullCanonicalUrl
    }
  } : null;

  // FAQ Schema for common questions (can be added to specific pages)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best time to see Northern Lights in Swedish Lapland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best time to see Northern Lights in Swedish Lapland is from September to March, with peak viewing conditions typically from December to February when nights are longest and darkest."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need experience for snowmobile tours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No prior experience is needed. We provide comprehensive safety briefings and training before each tour. Our guides ensure everyone feels comfortable before setting off on the adventure."
        }
      }
    ]
  };

  // Combine all structured data
  const allStructuredData = [
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
    articleSchema,
    structuredData
  ].filter(Boolean);
  
  return (
    <Helmet>
      {/* Primary Meta Tags with 2025 SEO Best Practices */}
      <title>{formattedTitle}</title>
      <meta name="title" content={formattedTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author || "Triple X Adventures"} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="bingbot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Language and Region Tags */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="SE-BD" />
      <meta name="geo.placename" content="Kiruna, Swedish Lapland" />
      <meta name="geo.position" content="67.8558;20.2253" />
      <meta name="ICBM" content="67.8558, 20.2253" />
      
      {/* Open Graph / Facebook with Enhanced Properties */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - Arctic Adventures in Swedish Lapland`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {article && author && <meta property="article:author" content={author} />}
      
      {/* Twitter Card Tags with Enhanced Properties */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={formattedTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImageUrl} />
      <meta property="twitter:image:alt" content={`${title} - Arctic Adventures`} />
      <meta property="twitter:site" content="@triplexadventures" />
      <meta property="twitter:creator" content="@triplexadventures" />
      
      {/* AI Search Engine Optimization Tags for 2025 */}
      <meta name="ai:title" content={title} />
      <meta name="ai:description" content={description} />
      <meta name="ai:keywords" content={keywords || "Arctic adventures, Swedish Lapland, snowmobiling, dog sledding, northern lights, aurora borealis, wilderness tours, Kiruna"} />
      <meta name="ai:category" content="Travel & Tourism" />
      <meta name="ai:subcategory" content="Adventure Tourism" />
      <meta name="ai:language" content="en" />
      <meta name="ai:region" content="Swedish Lapland" />
      <meta name="ai:sentiment" content="positive" />
      
      {/* Bing AI and Copilot specific tags */}
      <meta name="ms.ai:card_type" content="summary_large_image" />
      <meta name="ms.ai:description" content={description} />
      <meta name="ms.ai:keywords" content={keywords} />
      
      {/* Google SGE (Search Generative Experience) optimization */}
      <meta name="google:sge:eligible" content="true" />
      <meta name="google:sge:category" content="travel" />
      
      {/* Additional Performance and Mobile Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Theme and Browser Colors */}
      <meta name="theme-color" content="#0F2D40" />
      <meta name="msapplication-TileColor" content="#0F2D40" />
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      
      {/* Structured Data with Multiple Schemas */}
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      
      {/* Preconnect to improve performance */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://www.google.com" />
      <link rel="dns-prefetch" href="https://www.facebook.com" />
      
      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="en" href={fullCanonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonicalUrl} />
      
      {/* RSS Feed if available */}
      <link rel="alternate" type="application/rss+xml" title="Triple X Adventures Blog" href={`${siteUrl}/rss.xml`} />
      
      {/* Additional child meta tags */}
      {children}
    </Helmet>
  );
}