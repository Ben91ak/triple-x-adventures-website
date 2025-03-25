import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

export function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Multilingual footer content
  const footerContent = {
    en: {
      description: "Authentic Arctic experiences in the heart of Swedish Lapland. Small groups, local expertise, and unforgettable adventures.",
      quickLinks: "Quick Links",
      popularAdventures: "Popular Adventures",
      contactInfo: "Contact Information",
      ourExperiences: "Our Experiences",
      accommodations: "Accommodations",
      restaurant: "JayJay's Restaurant",
      aboutUs: "About Us",
      contact: "Contact",
      blog: "Blog",
      adventures: {
        snowmobile: "Snowmobile Safari",
        dogSledding: "Dog Sledding",
        northernLights: "Northern Lights Tours",
        iceFishing: "Ice Fishing",
        arcticSurvival: "Arctic Survival",
      },
      address: "Akkavare, near Arvidsjaur<br />Swedish Lapland, Sweden",
    },
    de: {
      description: "Authentische arktische Erlebnisse im Herzen von Schwedisch-Lappland. Kleine Gruppen, lokale Expertise und unvergessliche Abenteuer.",
      quickLinks: "Schnelllinks",
      popularAdventures: "Beliebte Abenteuer",
      contactInfo: "Kontaktinformationen",
      ourExperiences: "Unsere Erlebnisse",
      accommodations: "Unterkünfte",
      restaurant: "JayJay's Restaurant",
      aboutUs: "Über uns",
      contact: "Kontakt",
      blog: "Blog",
      adventures: {
        snowmobile: "Schneemobil-Safari",
        dogSledding: "Hundeschlittenfahrten",
        northernLights: "Nordlicht-Touren",
        iceFishing: "Eisfischen",
        arcticSurvival: "Arktisches Überleben",
      },
      address: "Akkavare, bei Arvidsjaur<br />Schwedisch-Lappland, Schweden",
    },
    sv: {
      description: "Autentiska arktiska upplevelser i hjärtat av Svenska Lappland. Små grupper, lokal expertis och oförglömliga äventyr.",
      quickLinks: "Snabblänkar",
      popularAdventures: "Populära Äventyr",
      contactInfo: "Kontaktinformation",
      ourExperiences: "Våra Upplevelser",
      accommodations: "Boende",
      restaurant: "JayJay's Restaurang",
      aboutUs: "Om Oss",
      contact: "Kontakt",
      blog: "Blogg",
      adventures: {
        snowmobile: "Snöskotersafari",
        dogSledding: "Hundspann",
        northernLights: "Norrskensjakt",
        iceFishing: "Isfiske",
        arcticSurvival: "Arktisk Överlevnad",
      },
      address: "Akkavare, nära Arvidsjaur<br />Svenska Lappland, Sverige",
    }
  };

  const content = footerContent[language];

  return (
    <footer className="bg-midnight text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-6">Triple X Adventures</h3>
            <p className="opacity-80 mb-6">{content.description}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-fire transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-fire transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-fire transition">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white hover:text-fire transition">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">{content.quickLinks}</h3>
            <ul className="space-y-3">
              <li><a href="#experiences" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.ourExperiences}</a></li>
              <li><a href="#stay" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.accommodations}</a></li>
              <li><a href="#restaurant" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.restaurant}</a></li>
              <li><a href="#about" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.aboutUs}</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.contact}</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.blog}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">{content.popularAdventures}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.adventures.snowmobile}</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.adventures.dogSledding}</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.adventures.northernLights}</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.adventures.iceFishing}</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">{content.adventures.arcticSurvival}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">{content.contactInfo}</h3>
            <ul className="space-y-3 opacity-80">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-fire"></i>
                <span dangerouslySetInnerHTML={{ __html: content.address }} />
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-fire"></i>
                <span>+46 (0) 70 357 5455</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-fire"></i>
                <span>info@triple-x-adventures.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-sm opacity-70">
          <p>{t.footer.copyright}</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-fire transition">{t.footer.privacyPolicy}</a>
            <a href="#" className="hover:text-fire transition">{t.footer.termsConditions}</a>
            <a href="#" className="hover:text-fire transition">{t.footer.imprint}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
