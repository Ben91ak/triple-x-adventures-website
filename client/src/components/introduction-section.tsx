import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

// Introduction content by language
const introContentByLanguage = {
  en: {
    title: "Not Just Another Tour Company",
    description: "Triple X Adventures offers authentic Arctic experiences rooted in Swedish Lapland. Based in Akkavare near Arvidsjaur, we combine thrill, comfort, and authenticity in every adventure. Whether it's carving through snow-covered forests, dining around a crackling open fire, or staying in our premium accommodations, you'll leave with stories, not just memories.",
    features: [
      {
        icon: "fas fa-user-group",
        title: "Small Groups",
        description: "Personal attention and authentic experiences with small, intimate group sizes"
      },
      {
        icon: "fas fa-mountain",
        title: "Local Experts",
        description: "Our guides are passionate locals with deep knowledge of the Arctic wilderness"
      },
      {
        icon: "fas fa-crown",
        title: "Premium Service",
        description: "High-quality equipment, accommodation and dining experiences throughout"
      }
    ]
  },
  de: {
    title: "Nicht nur ein weiteres Tourunternehmen",
    description: "Triple X Adventures bietet authentische arktische Erlebnisse, verwurzelt in Schwedisch-Lappland. Mit Sitz in Akkavare nahe Arvidsjaur verbinden wir Nervenkitzel, Komfort und Authentizität in jedem Abenteuer. Ob beim Fahren durch schneebedeckte Wälder, beim Essen rund um ein knisterndes offenes Feuer oder beim Aufenthalt in unseren erstklassigen Unterkünften – Sie werden mit Geschichten und nicht nur mit Erinnerungen nach Hause gehen.",
    features: [
      {
        icon: "fas fa-user-group",
        title: "Kleine Gruppen",
        description: "Persönliche Betreuung und authentische Erlebnisse mit kleinen, intimen Gruppengrößen"
      },
      {
        icon: "fas fa-mountain",
        title: "Lokale Experten",
        description: "Unsere Guides sind leidenschaftliche Einheimische mit tiefem Wissen über die arktische Wildnis"
      },
      {
        icon: "fas fa-crown",
        title: "Premium-Service",
        description: "Hochwertige Ausrüstung, Unterkunft und Speiseerlebnisse durchgehend"
      }
    ]
  },
  sv: {
    title: "Inte bara ett till turföretag",
    description: "Triple X Adventures erbjuder autentiska arktiska upplevelser med rötter i Svenska Lappland. Med bas i Akkavare nära Arvidsjaur kombinerar vi spänning, komfort och autenticitet i varje äventyr. Oavsett om det handlar om att åka genom snötäckta skogar, äta runt en sprakande öppen eld eller bo i våra förstklassiga boenden, kommer du att lämna med berättelser, inte bara minnen.",
    features: [
      {
        icon: "fas fa-user-group",
        title: "Små grupper",
        description: "Personlig uppmärksamhet och autentiska upplevelser med små, intima gruppstorlekar"
      },
      {
        icon: "fas fa-mountain",
        title: "Lokala experter",
        description: "Våra guider är passionerade lokalinvånare med djup kunskap om den arktiska vildmarken"
      },
      {
        icon: "fas fa-crown",
        title: "Premiumservice",
        description: "Högkvalitativ utrustning, boende och matupplevelser genomgående"
      }
    ]
  }
};

export function IntroductionSection() {
  const { language } = useLanguage();
  
  // Get content based on the current language
  const content = introContentByLanguage[language];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6 text-midnight">{content.title}</h2>
          <p className="text-lg mb-10 leading-relaxed">{content.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {content.features.map((feature, index) => (
              <div key={index} className="p-6">
                <div className="text-fire text-4xl mb-4">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="font-montserrat font-semibold text-xl mb-3 text-midnight">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
