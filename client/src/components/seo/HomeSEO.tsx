import { useLanguage } from '../../contexts/LanguageContext';
import { SEO } from './SEO';

export function HomeSEO() {
  const { language } = useLanguage();
  
  // Create language-specific metadata
  const titles = {
    en: 'Premium Arctic Adventures | Triple X Adventures',
    de: 'Premium Arktische Abenteuer | Triple X Adventures',
    sv: 'Premium Arktiska Äventyr | Triple X Adventures'
  };
  
  const descriptions = {
    en: 'Experience unforgettable winter adventures in Swedish Lapland including premium snowmobile tours, husky sledding, ice drifting, and Northern Lights viewing. Discover the real Arctic with Triple X Adventures in Arvidsjaur.',
    de: 'Erleben Sie unvergessliche Winterabenteuer in Schwedisch-Lappland mit Premium-Schneemobiltouren, Husky-Schlittenfahrten, Ice Drifting und Nordlichter-Beobachtung. Entdecken Sie die echte Arktis mit Triple X Adventures in Arvidsjaur.',
    sv: 'Upplev oförglömliga vinteräventyr i svenska Lappland, inklusive premium snöskoteråkning, hundspannsturer, isdrift och norrskensskådning. Upptäck den verkliga Arktis med Triple X Adventures i Arvidsjaur.'
  };
  
  const keywords = {
    en: 'premium snowmobile tours Swedish Lapland, luxury Arctic adventures Sweden, Northern Lights Arvidsjaur, ice drifting experience Sweden, husky sledding Lapland, exclusive winter experiences, Arctic tourism, adventure travel Sweden, luxury accommodation Lapland, Nordic cuisine',
    de: 'Premium-Schneemobiltouren Schwedisch-Lappland, Luxus-Arktisabenteuer Schweden, Nordlichter Arvidsjaur, Ice-Drifting-Erlebnis Schweden, Husky-Schlittenfahrten Lappland, exklusive Wintererlebnisse, Arktis-Tourismus, Abenteuerreisen Schweden, Luxusunterkunft Lappland, nordische Küche',
    sv: 'premium snöskoteråkning svenska Lappland, lyx arktiska äventyr Sverige, norrsken Arvidsjaur, isdriftupplevelse Sverige, hundspannsturer Lappland, exklusiva vinterupplevelser, arktisk turism, äventyrsresor Sverige, lyxboende Lappland, nordisk mat'
  };
  
  // Structured data for better search engine understanding (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Triple X Adventures",
    "url": "https://triple-x-adventures.com",
    "logo": "https://triple-x-adventures.com/images/txa-logo.png",
    "description": descriptions[language],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Storgatan 6F",
      "addressLocality": "Arvidsjaur",
      "postalCode": "933 31",
      "addressCountry": "SE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "65.5910",
      "longitude": "19.1751"
    },
    "telephone": "+46 70 319 84 99",
    "email": "info@triplexadventures.com",
    "sameAs": [
      "https://www.facebook.com/triplexadventures",
      "https://www.instagram.com/triplexadventures"
    ],
    "offers": {
      "@type": "Offer",
      "description": "Premium Arctic adventure experiences in Swedish Lapland",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "valueAddedTaxIncluded": true
      }
    },
    "areaServed": {
      "@type": "Place",
      "name": "Swedish Lapland",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "65.5910",
        "longitude": "19.1751"
      }
    }
  };
  
  // Alternate language URLs
  const altLangLinks = [
    { lang: 'en', url: 'https://triple-x-adventures.com/en' },
    { lang: 'de', url: 'https://triple-x-adventures.com/de' },
    { lang: 'sv', url: 'https://triple-x-adventures.com/sv' }
  ];
  
  return (
    <SEO
      title={titles[language]}
      description={descriptions[language]}
      keywords={keywords[language]}
      structuredData={structuredData}
      lang={language}
      altLangLinks={altLangLinks}
    />
  );
}