import { Helmet } from 'react-helmet-async';

type Language = 'en' | 'de' | 'sv';

interface AltLangLink {
  lang: string;
  url: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
  structuredData?: Record<string, any>;
  lang?: Language;
  altLangLinks?: AltLangLink[];
  children?: React.ReactNode;
}

export function SEO({
  title,
  description,
  canonicalUrl = "https://triplexadventures.com",
  ogImage = "/images/TXA_fallback_optimized.jpg",
  ogType = "website",
  keywords,
  structuredData,
  lang,
  altLangLinks,
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
      {keywords && <meta name="keywords" content={keywords} />}
      {lang && <meta property="og:locale" content={lang} />}
      
      {/* Canonical Link */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Alternate Language Links */}
      {altLangLinks && altLangLinks.map(link => (
        <link 
          key={link.lang}
          rel="alternate" 
          hrefLang={link.lang} 
          href={link.url} 
        />
      ))}
      
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