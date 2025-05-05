import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  structuredData?: Record<string, any>;
  children?: React.ReactNode;
}

export function SEO({
  title,
  description,
  canonicalUrl = "https://triplexadventures.com",
  ogImage = "/images/TXA_fallback_optimized.jpg",
  ogType = "website",
  structuredData,
  children
}: SEOProps) {
  // Default site name to append to titles
  const siteName = "Triple X Adventures";
  
  // Format the title with site name
  const formattedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // Format canonical URL correctly
  const fullCanonicalUrl = canonicalUrl.startsWith('http') 
    ? canonicalUrl
    : `https://triplexadventures.com${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`;
  
  // Format OG image URL correctly  
  const fullOgImageUrl = ogImage.startsWith('http') 
    ? ogImage
    : `https://triplexadventures.com${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="title" content={formattedTitle} />
      <meta name="description" content={description} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={formattedTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImageUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional meta tags */}
      {children}
    </Helmet>
  );
}