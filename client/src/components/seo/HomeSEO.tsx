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
    en: 'Experience authentic winter adventures in Swedish Lapland including snowmobile tours, husky sledding, ice drifting, and Northern Lights viewing with Triple X Adventures in Arvidsjaur.',
    de: 'Erleben Sie authentische Winterabenteuer in Schwedisch-Lappland mit Schneemobiltouren, Husky-Schlittenfahrten, Ice Drifting und Nordlichter-Beobachtung mit Triple X Adventures in Arvidsjaur.',
    sv: 'Upplev autentiska vinteräventyr i svenska Lappland, inklusive snöskoteråkning, hundspannsturer, isdrift och norrskensskådning med Triple X Adventures i Arvidsjaur.'
  };
  
  const keywords = {
    en: 'snowmobile tours Swedish Lapland, Arctic adventures Sweden, Northern Lights tours Lapland, ice drifting experience Sweden, husky sledding Lapland, luxury adventure Lapland, winter activities Arvidsjaur',
    de: 'Schneemobiltouren Schwedisch-Lappland, arktische Abenteuer Schweden, Nordlicht-Touren Lappland, Ice Drifting Erlebnis Schweden, Husky-Schlittenfahrten Lappland, Luxusabenteuer Lappland, Winteraktivitäten Arvidsjaur',
    sv: 'snöskoteråkning svenska Lappland, arktiska äventyr Sverige, norrskenssturer Lappland, isdriftupplevelse Sverige, hundspannsturer Lappland, lyxäventyr Lappland, vinteraktiviteter Arvidsjaur'
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
      "description": "Arctic adventure packages in Swedish Lapland",
      "priceCurrency": "EUR"
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