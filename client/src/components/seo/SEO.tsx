import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: Record<string, any>;
  keywords?: string;
  noIndex?: boolean;
  lang?: string;
  altLangLinks?: {
    lang: string;
    url: string;
  }[];
}

export function SEO({
  title = 'Premium Arctic Adventures | Triple X Adventures',
  description = 'Experience unforgettable winter adventures in Swedish Lapland including snowmobile tours, husky sledding, ice drifting, and Northern Lights viewing. Discover the real Arctic with Triple X Adventures in Arvidsjaur.',
  canonicalUrl = 'https://triple-x-adventures.com',
  ogImage = '/images/triple-x-adventures-og.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  keywords = 'snowmobile tours Swedish Lapland, Arctic adventures Sweden, Northern Lights tours Lapland, ice drifting experience Sweden, husky sledding Lapland, luxury adventure Lapland, winter activities Arvidsjaur',
  noIndex = false,
  lang = 'en',
  altLangLinks = [],
}: SEOProps) {
  const siteName = 'Triple X Adventures';
  const baseUrl = 'https://triple-x-adventures.com';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Indexing Control */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'sv_SE'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`} />
      
      {/* Alternate Language Links */}
      {altLangLinks.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}