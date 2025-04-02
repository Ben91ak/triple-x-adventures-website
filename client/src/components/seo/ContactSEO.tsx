import { useLanguage } from '../../contexts/LanguageContext';
import { SEO } from './SEO';

export function ContactSEO() {
  const { language } = useLanguage();
  
  // Create language-specific metadata
  const titles = {
    en: 'Contact Us | Triple X Adventures',
    de: 'Kontaktiere Uns | Triple X Adventures',
    sv: 'Kontakta Oss | Triple X Adventures'
  };
  
  const descriptions = {
    en: 'Get in touch with the Triple X Adventures team to plan your Arctic adventure in Swedish Lapland. Contact us for custom packages, bookings, and inquiries.',
    de: 'Nehmen Sie Kontakt mit dem Triple X Adventures-Team auf, um Ihr arktisches Abenteuer in Schwedisch-Lappland zu planen. Kontaktieren Sie uns für individuelle Pakete, Buchungen und Anfragen.',
    sv: 'Kontakta Triple X Adventures-teamet för att planera ditt arktiska äventyr i svenska Lappland. Kontakta oss för skräddarsydda paket, bokningar och förfrågningar.'
  };
  
  const keywords = {
    en: 'contact Triple X Adventures, book Arctic adventure, Swedish Lapland bookings, Arvidsjaur adventure contact, custom winter trip planning',
    de: 'Kontakt Triple X Adventures, arktisches Abenteuer buchen, Schwedisch-Lappland Buchungen, Arvidsjaur Abenteuer Kontakt, individuelle Winterreiseplanung',
    sv: 'kontakt Triple X Adventures, boka arktiskt äventyr, svenska Lappland bokningar, Arvidsjaur äventyr kontakt, skräddarsydd vinterreseplanering'
  };
  
  // Structured data for contact page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": titles[language],
    "description": descriptions[language],
    "mainEntity": {
      "@type": "Organization",
      "name": "Triple X Adventures",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Storgatan 6F",
        "addressLocality": "Arvidsjaur",
        "postalCode": "933 31",
        "addressCountry": "SE"
      },
      "telephone": "+46 70 319 84 99",
      "email": "info@triplexadventures.com",
      "url": "https://triple-x-adventures.com",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    }
  };
  
  // Alternate language URLs
  const altLangLinks = [
    { lang: 'en', url: 'https://triple-x-adventures.com/en/contact' },
    { lang: 'de', url: 'https://triple-x-adventures.com/de/contact' },
    { lang: 'sv', url: 'https://triple-x-adventures.com/sv/contact' }
  ];
  
  return (
    <SEO
      title={titles[language]}
      description={descriptions[language]}
      canonicalUrl={`https://triple-x-adventures.com/${language}/contact`}
      keywords={keywords[language]}
      structuredData={structuredData}
      lang={language}
      altLangLinks={altLangLinks}
    />
  );
}