import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Users, Mountain, Crown } from "lucide-react";

// Introduction content by language
const introContentByLanguage = {
  en: {
    title: "Not Just Another Tour Company",
    description: "Triple X Adventures offers authentic Arctic experiences rooted in Swedish Lapland. Based in Akkavare near Arvidsjaur, we combine thrill, comfort, and authenticity in every adventure. Whether it's carving through snow-covered forests, dining around a crackling open fire, or staying in our premium accommodations, you'll leave with stories, not just memories.",
    features: [
      {
        icon: "users",
        title: "Small Groups",
        description: "Personal attention and authentic experiences with small, intimate group sizes"
      },
      {
        icon: "mountain",
        title: "Local Experts",
        description: "Our guides are passionate locals with deep knowledge of the Arctic wilderness"
      },
      {
        icon: "crown",
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
        icon: "users",
        title: "Kleine Gruppen",
        description: "Persönliche Betreuung und authentische Erlebnisse mit kleinen, intimen Gruppengrößen"
      },
      {
        icon: "mountain",
        title: "Lokale Experten",
        description: "Unsere Guides sind leidenschaftliche Einheimische mit tiefem Wissen über die arktische Wildnis"
      },
      {
        icon: "crown",
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
        icon: "users",
        title: "Små grupper",
        description: "Personlig uppmärksamhet och autentiska upplevelser med små, intima gruppstorlekar"
      },
      {
        icon: "mountain",
        title: "Lokala experter",
        description: "Våra guider är passionerade lokalinvånare med djup kunskap om den arktiska vildmarken"
      },
      {
        icon: "crown",
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

  // Map feature icons to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users size={38} />;
      case 'mountain':
        return <Mountain size={38} />;
      case 'crown':
        return <Crown size={38} />;
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative hero-transition-overlap northern-lights-gradient">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-card-bg/30 via-dark-bg to-card-bg/30 opacity-95 z-0"></div>
      
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 z-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
            {language === 'de' ? 'Über Uns' : language === 'sv' ? 'Om Oss' : 'About Us'}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-8 text-primary-text">
            {content.title}
          </h2>
          <p className="text-lg md:text-xl mb-16 leading-relaxed text-secondary-text max-w-3xl mx-auto">
            {content.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {content.features.map((feature, index) => (
              <div key={index} className="group relative">
                {/* Decorative background glow */}
                <div className="absolute -inset-px bg-gradient-to-b from-accent-color/10 to-accent-color/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                <div className="card bg-card-bg border border-white/10 backdrop-blur-sm rounded-xl p-8 transition-all duration-300 relative z-10 h-full flex flex-col items-center group-hover:border-accent-color/20">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-accent-color/10 text-accent-color mb-6 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(feature.icon)}
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-primary-text group-hover:text-accent-color transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-text">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
