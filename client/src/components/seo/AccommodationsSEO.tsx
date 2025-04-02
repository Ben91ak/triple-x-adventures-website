import { useLanguage } from '../../contexts/LanguageContext';
import { SEO } from './SEO';

export function AccommodationsSEO() {
  const { language } = useLanguage();
  
  // Create language-specific metadata
  const titles = {
    en: 'Premium Arctic Accommodations | Triple X Adventures',
    de: 'Premium Arktische Unterkünfte | Triple X Adventures',
    sv: 'Premium Arktiska Boenden | Triple X Adventures'
  };
  
  const descriptions = {
    en: 'Stay in comfort at our premium Arctic accommodations including the Triple X Chalet, luxurious ÖÖD mirror houses, and Hotel Laponia in Arvidsjaur, Swedish Lapland.',
    de: 'Übernachten Sie komfortabel in unseren erstklassigen arktischen Unterkünften, darunter das Triple X Chalet, luxuriöse ÖÖD-Spiegelhäuser und das Hotel Laponia in Arvidsjaur, Schwedisch-Lappland.',
    sv: 'Bo bekvämt i våra förstklassiga arktiska boenden, inklusive Triple X Chalet, lyxiga ÖÖD-spegelhus och Hotel Laponia i Arvidsjaur, svenska Lappland.'
  };
  
  const keywords = {
    en: 'Arctic accommodations Sweden, luxury cabins Lapland, Triple X Chalet Arvidsjaur, ÖÖD mirror house Sweden, Hotel Laponia Arvidsjaur, premium lodging Swedish Lapland',
    de: 'Arktische Unterkünfte Schweden, Luxushütten Lappland, Triple X Chalet Arvidsjaur, ÖÖD Spiegelhaus Schweden, Hotel Laponia Arvidsjaur, Premium-Unterkunft Schwedisch-Lappland',
    sv: 'Arktiska boenden Sverige, lyxstugor Lappland, Triple X Chalet Arvidsjaur, ÖÖD spegelhus Sverige, Hotel Laponia Arvidsjaur, premiumboende svenska Lappland'
  };
  
  // Structured data for accommodations
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "LodgingBusiness",
          "name": "Triple X Chalet",
          "description": language === 'en' ? "Luxury private chalet with panoramic views of the Arctic landscape" : language === 'de' ? "Luxuriöses privates Chalet mit Panoramablick auf die arktische Landschaft" : "Lyxig privat chalet med panoramautsikt över det arktiska landskapet",
          "image": "https://triple-x-adventures.com/images/txa-chalet.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Arvidsjaur",
            "addressCountry": "SE"
          },
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Sauna" },
            { "@type": "LocationFeatureSpecification", "name": "Fireplace" },
            { "@type": "LocationFeatureSpecification", "name": "Private Terrace" }
          ]
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "LodgingBusiness",
          "name": "ÖÖD Mirror Houses",
          "description": language === 'en' ? "Modern mirror houses blending into the pristine Arctic environment" : language === 'de' ? "Moderne Spiegelhäuser, die sich in die unberührte arktische Umgebung einfügen" : "Moderna spegelhus som smälter in i den orörda arktiska miljön",
          "image": "https://triple-x-adventures.com/images/ood-house.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Arvidsjaur",
            "addressCountry": "SE"
          },
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Panoramic Views" },
            { "@type": "LocationFeatureSpecification", "name": "Minimalist Design" },
            { "@type": "LocationFeatureSpecification", "name": "Heated Floors" }
          ]
        }
      }
    ]
  };
  
  // Alternate language URLs
  const altLangLinks = [
    { lang: 'en', url: 'https://triple-x-adventures.com/en/accommodations' },
    { lang: 'de', url: 'https://triple-x-adventures.com/de/accommodations' },
    { lang: 'sv', url: 'https://triple-x-adventures.com/sv/accommodations' }
  ];
  
  return (
    <SEO
      title={titles[language]}
      description={descriptions[language]}
      canonicalUrl={`https://triple-x-adventures.com/${language}/accommodations`}
      keywords={keywords[language]}
      structuredData={structuredData}
      lang={language}
      altLangLinks={altLangLinks}
    />
  );
}