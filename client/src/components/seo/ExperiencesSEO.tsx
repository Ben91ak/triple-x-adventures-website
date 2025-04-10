import { useLanguage } from '../../contexts/LanguageContext';
import { SEO } from './SEO';

export function ExperiencesSEO() {
  const { language } = useLanguage();
  
  // Create language-specific metadata
  const titles = {
    en: 'Arctic Experiences & Activities | Triple X Adventures',
    de: 'Arktische Erlebnisse & Aktivitäten | Triple X Adventures',
    sv: 'Arktiska Upplevelser & Aktiviteter | Triple X Adventures'
  };
  
  const descriptions = {
    en: 'Discover our range of thrilling Arctic experiences including snowmobile tours, ice drifting, helicopter flights, and authentic Lapland adventures.',
    de: 'Entdecken Sie unsere spannenden arktischen Erlebnisse wie Schneemobiltouren, Ice Drifting, Hubschrauberflüge und authentische Lappland-Abenteuer.',
    sv: 'Upptäck vårt utbud av spännande arktiska upplevelser inklusive snöskoterturer, isdrift, helikopterflygningar och autentiska Lappländska äventyr.'
  };
  
  const keywords = {
    en: 'Arctic experiences Sweden, snowmobile tours Lapland, ice drifting experience, helicopter tours Swedish Lapland, winter activities Sweden',
    de: 'Arktische Erlebnisse Schweden, Schneemobiltouren Lappland, Ice Drifting Erlebnis, Hubschraubertouren Schwedisch-Lappland, Winteraktivitäten Schweden',
    sv: 'Arktiska upplevelser Sverige, snöskoterturer Lappland, isdriftupplevelse, helikopterturer svenska Lappland, vinteraktiviteter Sverige'
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
          "@type": "TouristAttraction",
          "name": language === 'en' ? "Snowmobile Tours" : language === 'de' ? "Schneemobiltouren" : "Snöskoterturer",
          "description": language === 'en' ? "Experience the thrill of snowmobiling through pristine Arctic landscapes" : language === 'de' ? "Erleben Sie den Nervenkitzel des Schneemobilfahrens durch unberührte arktische Landschaften" : "Upplev spänningen av snöskoteråkning genom orörda arktiska landskap"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "TouristAttraction",
          "name": language === 'en' ? "Ice Drifting" : language === 'de' ? "Ice Drifting" : "Isdrift",
          "description": language === 'en' ? "Master the art of ice drifting on our specialized ice tracks" : language === 'de' ? "Meistern Sie die Kunst des Ice Driftings auf unseren spezialisierten Eisstrecken" : "Bemästra konsten av isdrift på våra specialiserade isbanor"
        }
      }
    ]
  };
  
  // Alternate language URLs
  const altLangLinks = [
    { lang: 'en', url: 'https://triple-x-adventures.com/en/experiences' },
    { lang: 'de', url: 'https://triple-x-adventures.com/de/experiences' },
    { lang: 'sv', url: 'https://triple-x-adventures.com/sv/experiences' }
  ];
  
  return (
    <SEO
      title={titles[language]}
      description={descriptions[language]}
      canonicalUrl={`https://triple-x-adventures.com/${language}/experiences`}
      keywords={keywords[language]}
      structuredData={structuredData}
      lang={language}
      altLangLinks={altLangLinks}
    />
  );
}