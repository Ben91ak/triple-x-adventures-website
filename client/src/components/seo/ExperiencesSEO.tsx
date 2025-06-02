import { useLanguage } from '../../contexts/LanguageContext';
import { SEO } from './SEO';

export function ExperiencesSEO() {
  const { language } = useLanguage();
  
  // Create language-specific metadata
  const titles = {
    en: 'Premium Arctic Experiences & Activities | Triple X Adventures',
    de: 'Premium Arktische Erlebnisse & Aktivitäten | Triple X Adventures',
    sv: 'Premium Arktiska Upplevelser & Aktiviteter | Triple X Adventures'
  };
  
  const descriptions = {
    en: 'Discover our range of premium Arctic experiences including snowmobile tours, ice drifting, helicopter flights, husky sledding, and all-inclusive adventure packages.',
    de: 'Entdecken Sie unsere Premium arktischen Erlebnisse wie Schneemobiltouren, Ice Drifting, Hubschrauberflüge, Husky-Schlittenfahrten und All-Inclusive-Abenteuer-Pakete.',
    sv: 'Upptäck vårt utbud av premium arktiska upplevelser inklusive snöskoterturer, isdrift, helikopterflygningar, hundspannsturer och all-inclusive äventyrspaket.'
  };
  
  const keywords = {
    en: 'Arctic experiences Sweden, premium adventure packages, snowmobile tours Lapland, ice drifting, helicopter tours, husky sledding, winter activities Sweden',
    de: 'Arktische Erlebnisse Schweden, Premium-Abenteuer-Pakete, Schneemobiltouren Lappland, Ice Drifting, Hubschraubertouren, Husky-Schlittenfahrten, Winteraktivitäten Schweden',
    sv: 'Arktiska upplevelser Sverige, premium äventyrspaket, snöskoterturer Lappland, isdrift, helikopterturer, hundspannsturer, vinteraktiviteter Sverige'
  };
  
  // Structured data for experiences (ItemList)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": ["TouristTrip", "Product"],
          "name": language === 'en' 
            ? "Premium Adventure Packages" 
            : language === 'de' 
              ? "Premium-Abenteuer-Pakete" 
              : "Premium Äventyrspaket",
          "description": language === 'en' 
            ? "All-inclusive premium packages combining multiple activities with luxury accommodations" 
            : language === 'de' 
              ? "All-inclusive Premium-Pakete, die mehrere Aktivitäten mit Luxusunterkünften kombinieren" 
              : "All-inclusive premiumpaket som kombinerar flera aktiviteter med lyxboende"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "TouristAttraction",
          "name": language === 'en' ? "Snowmobile Tours" : language === 'de' ? "Schneemobiltouren" : "Snöskoterturer",
          "description": language === 'en' ? "Experience the thrill of snowmobiling through pristine Arctic landscapes" : language === 'de' ? "Erleben Sie den Nervenkitzel des Schneemobilfahrens durch unberührte arktische Landschaften" : "Upplev spänningen av snöskoteråkning genom orörda arktiska landskap"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "TouristAttraction",
          "name": language === 'en' ? "Ice Drifting" : language === 'de' ? "Ice Drifting" : "Isdrift",
          "description": language === 'en' ? "Master the art of ice drifting on our specialized ice tracks" : language === 'de' ? "Meistern Sie die Kunst des Ice Driftings auf unseren spezialisierten Eisstrecken" : "Bemästra konsten av isdrift på våra specialiserade isbanor"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "TouristAttraction",
          "name": language === 'en' ? "Helicopter Tours" : language === 'de' ? "Hubschraubertouren" : "Helikopterturer",
          "description": language === 'en' ? "Soar above the Arctic wilderness for breathtaking aerial views" : language === 'de' ? "Schweben Sie über der arktischen Wildnis für atemberaubende Luftaufnahmen" : "Sväva över den arktiska vildmarken för hisnande vyer från luften"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "TouristAttraction",
          "name": language === 'en' ? "Husky Sledding" : language === 'de' ? "Husky-Schlittenfahrten" : "Hundspannsturer",
          "description": language === 'en' ? "Traditional dog sledding adventures through snowy forests and frozen lakes" : language === 'de' ? "Traditionelle Hundeschlittenfahrten durch verschneite Wälder und gefrorene Seen" : "Traditionella hundspannsturer genom snötäckta skogar och frusna sjöar"
        }
      }
    ]
  };
  
  // Alternate language URLs for the home page since experiences are integrated there
  const altLangLinks = [
    { lang: 'en', url: 'https://triple-x-adventures.com/en' },
    { lang: 'de', url: 'https://triple-x-adventures.com/de' },
    { lang: 'sv', url: 'https://triple-x-adventures.com/sv' }
  ];
  
  return (
    <SEO
      title={titles[language]}
      description={descriptions[language]}
      canonicalUrl={`https://triple-x-adventures.com/${language}`}
      keywords={keywords[language]}
      structuredData={structuredData}
      lang={language}
      altLangLinks={altLangLinks}
    />
  );
}