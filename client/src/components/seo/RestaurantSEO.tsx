import { useLanguage } from '../../contexts/LanguageContext';
import { SEO } from './SEO';

export function RestaurantSEO() {
  const { language } = useLanguage();
  
  // Create language-specific metadata
  const titles = {
    en: 'JayJay\'s Restaurant - Authentic Lapland Cuisine | Triple X Adventures',
    de: 'JayJay\'s Restaurant - Authentische Lappland-Küche | Triple X Adventures',
    sv: 'JayJay\'s Restaurant - Autentisk Lappländsk Matkultur | Triple X Adventures'
  };
  
  const descriptions = {
    en: 'Experience authentic Lapland cuisine at JayJay\'s Restaurant in Arvidsjaur. Enjoy local specialties including reindeer, Arctic char, and traditional Swedish dishes in a cozy atmosphere.',
    de: 'Erleben Sie authentische Lappland-Küche im JayJay\'s Restaurant in Arvidsjaur. Genießen Sie lokale Spezialitäten wie Rentier, arktische Saiblinge und traditionelle schwedische Gerichte in gemütlicher Atmosphäre.',
    sv: 'Upplev autentisk lappländsk matkultur på JayJay\'s Restaurant i Arvidsjaur. Njut av lokala specialiteter som ren, röding och traditionella svenska rätter i en mysig atmosfär.'
  };
  
  const keywords = {
    en: 'Lapland cuisine Arvidsjaur, JayJay\'s Restaurant Sweden, authentic Swedish food, reindeer meat restaurant, local dining Swedish Lapland, Arvidsjaur restaurant',
    de: 'Lappland-Küche Arvidsjaur, JayJay\'s Restaurant Schweden, authentisches schwedisches Essen, Rentierfleisch-Restaurant, lokale Gastronomie Schwedisch-Lappland, Arvidsjaur Restaurant',
    sv: 'Lappländsk matkultur Arvidsjaur, JayJay\'s Restaurant Sverige, autentisk svensk mat, renköttrestaurang, lokala restauranger svenska Lappland, Arvidsjaur restaurang'
  };
  
  // Structured data for restaurant
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "JayJay's Restaurant",
    "image": "https://triple-x-adventures.com/images/restaurant/jayjays-exterior.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Karlavagnen 1",
      "addressLocality": "Arvidsjaur",
      "postalCode": "933 32",
      "addressCountry": "SE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "65.5895",
      "longitude": "19.1738"
    },
    "telephone": "+46 70 319 84 99",
    "servesCuisine": "Swedish, Lapland, Scandinavian",
    "priceRange": "€€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "18:00",
        "closes": "22:00"
      }
    ],
    "menu": "https://triple-x-adventures.com/restaurant-menu",
    "acceptsReservations": "True"
  };
  
  // Alternate language URLs
  const altLangLinks = [
    { lang: 'en', url: 'https://triple-x-adventures.com/en/restaurant' },
    { lang: 'de', url: 'https://triple-x-adventures.com/de/restaurant' },
    { lang: 'sv', url: 'https://triple-x-adventures.com/sv/restaurant' }
  ];
  
  return (
    <SEO
      title={titles[language]}
      description={descriptions[language]}
      canonicalUrl={`https://triple-x-adventures.com/${language}/restaurant`}
      keywords={keywords[language]}
      structuredData={structuredData}
      lang={language}
      altLangLinks={altLangLinks}
    />
  );
}