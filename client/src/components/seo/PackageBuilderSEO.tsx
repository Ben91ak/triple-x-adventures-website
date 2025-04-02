import { useLanguage } from '../../contexts/LanguageContext';
import { SEO } from './SEO';

export function PackageBuilderSEO() {
  const { language } = useLanguage();
  
  // Create language-specific metadata
  const titles = {
    en: 'Custom Adventure Package Builder | Triple X Adventures',
    de: 'Individueller Abenteuerpaket-Konfigurator | Triple X Adventures',
    sv: 'Anpassad Äventyrspaket-Byggare | Triple X Adventures'
  };
  
  const descriptions = {
    en: 'Build your custom Arctic adventure package with our interactive tool. Choose your preferred activities, accommodations, and trip details for a personalized Swedish Lapland experience.',
    de: 'Erstellen Sie Ihr individuelles arktisches Abenteuerpaket mit unserem interaktiven Tool. Wählen Sie Ihre bevorzugten Aktivitäten, Unterkünfte und Reisedetails für ein personalisiertes Erlebnis in Schwedisch-Lappland.',
    sv: 'Bygg ditt skräddarsydda arktiska äventyrspaket med vårt interaktiva verktyg. Välj dina önskade aktiviteter, boenden och resdetaljer för en personlig upplevelse i svenska Lappland.'
  };
  
  const keywords = {
    en: 'custom Arctic adventure, build your own Lapland trip, personalized winter package, Swedish Lapland custom tour, tailor-made Arctic experience',
    de: 'individuelles arktisches Abenteuer, gestalten Sie Ihre eigene Lappland-Reise, personalisiertes Winterpaket, Schwedisch-Lappland individuelle Tour, maßgeschneidertes Arktis-Erlebnis',
    sv: 'skräddarsytt arktiskt äventyr, bygg din egen Lappland-resa, personligt vinterpaket, svenska Lappland skräddarsydd tur, skräddarsydd arktisk upplevelse'
  };
  
  // Structured data for package builder
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
    "potentialAction": {
      "@type": "CreateAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://triple-x-adventures.com/{language}/package-builder",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Trip",
        "name": "Custom Arctic Adventure"
      }
    },
    "mainEntity": {
      "@type": "Service",
      "name": "Custom Adventure Package",
      "description": descriptions[language],
      "provider": {
        "@type": "Organization",
        "name": "Triple X Adventures"
      }
    }
  };
  
  // Alternate language URLs
  const altLangLinks = [
    { lang: 'en', url: 'https://triple-x-adventures.com/en/package-builder' },
    { lang: 'de', url: 'https://triple-x-adventures.com/de/package-builder' },
    { lang: 'sv', url: 'https://triple-x-adventures.com/sv/package-builder' }
  ];
  
  return (
    <SEO
      title={titles[language]}
      description={descriptions[language]}
      canonicalUrl={`https://triple-x-adventures.com/${language}/package-builder`}
      keywords={keywords[language]}
      structuredData={structuredData}
      lang={language}
      altLangLinks={altLangLinks}
    />
  );
}