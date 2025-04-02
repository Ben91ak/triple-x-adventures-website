import { useLanguage } from '../../contexts/LanguageContext';
import { SEO } from './SEO';

export function AdventureMapSEO() {
  const { language } = useLanguage();
  
  // Create language-specific metadata
  const titles = {
    en: 'Interactive Adventure Map | Triple X Adventures',
    de: 'Interaktive Abenteuerkarte | Triple X Adventures',
    sv: 'Interaktiv Äventyrskarta | Triple X Adventures'
  };
  
  const descriptions = {
    en: 'Explore our interactive map of Swedish Lapland to discover exciting adventure locations, accommodations, and natural attractions around Arvidsjaur.',
    de: 'Erkunden Sie unsere interaktive Karte von Schwedisch-Lappland, um spannende Abenteuerorte, Unterkünfte und Naturattraktionen rund um Arvidsjaur zu entdecken.',
    sv: 'Utforska vår interaktiva karta över svenska Lappland för att upptäcka spännande äventyrsplatser, boenden och naturattraktioner runt Arvidsjaur.'
  };
  
  const keywords = {
    en: 'Swedish Lapland map, Arvidsjaur adventure locations, Arctic tourism map, winter activity locations Lapland, Triple X Adventures locations',
    de: 'Schwedisch-Lappland Karte, Arvidsjaur Abenteuerorte, Arktis-Tourismus Karte, Winteraktivitäten Standorte Lappland, Triple X Adventures Standorte',
    sv: 'Svenska Lappland karta, Arvidsjaur äventyrsplatser, arktisk turism karta, vinteraktiviteter platser Lappland, Triple X Adventures platser'
  };
  
  // Structured data for the map
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": titles[language],
    "description": descriptions[language],
    "isPartOf": {
      "@type": "WebSite",
      "name": "Triple X Adventures",
      "url": "https://triple-x-adventures.com"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "contentUrl": "https://triple-x-adventures.com/images/adventure-map-preview.jpg"
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".adventure-map-description", ".map-legend"]
    }
  };
  
  // Alternate language URLs
  const altLangLinks = [
    { lang: 'en', url: 'https://triple-x-adventures.com/en/adventure-map' },
    { lang: 'de', url: 'https://triple-x-adventures.com/de/adventure-map' },
    { lang: 'sv', url: 'https://triple-x-adventures.com/sv/adventure-map' }
  ];
  
  return (
    <SEO
      title={titles[language]}
      description={descriptions[language]}
      canonicalUrl={`https://triple-x-adventures.com/${language}/adventure-map`}
      keywords={keywords[language]}
      structuredData={structuredData}
      lang={language}
      altLangLinks={altLangLinks}
    />
  );
}