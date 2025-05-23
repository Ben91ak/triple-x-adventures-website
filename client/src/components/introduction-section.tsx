import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { Users, Mountain, Crown } from "lucide-react";
import { useScrollAnimation, useParallax } from "@/hooks/use-scroll-animation";
import { useRef } from "react";
import { translations } from "@/translations";

// Introduction content by language
const introContentByLanguage = {
  en: {
    title: "Not Just Another Tour Company",
    description: "Triple X Adventures offers authentic Arctic experiences rooted in Swedish Lapland. Based in Arvidsjaur near the Polarcircle, we combine thrill, comfort, and authenticity in every adventure. Whether it's carving through snow-covered forests, dining around a crackling open fire, or staying in our premium accommodations, you'll leave with stories, not just memories.",
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
    description: "Triple X Adventures bietet authentische arktische Erlebnisse, verwurzelt in Schwedisch-Lappland. Mit Sitz in Arvidsjaur nahe dem Polarkreis verbinden wir Nervenkitzel, Komfort und Authentizität in jedem Abenteuer. Ob beim Fahren durch schneebedeckte Wälder, beim Essen rund um ein knisterndes offenes Feuer oder beim Aufenthalt in unseren erstklassigen Unterkünften – Sie werden mit Geschichten und nicht nur mit Erinnerungen nach Hause gehen.",
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
    description: "Triple X Adventures erbjuder autentiska arktiska upplevelser med rötter i Svenska Lappland. Med bas i Arvidsjaur nära Polcirkeln kombinerar vi spänning, komfort och autenticitet i varje äventyr. Oavsett om det handlar om att åka genom snötäckta skogar, äta runt en sprakande öppen eld eller bo i våra förstklassiga boenden, kommer du att lämna med berättelser, inte bara minnen.",
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

// Define the type for a feature explicitly
interface Feature {
  icon: string;
  title: string;
  description: string;
}

export function IntroductionSection() {
  const { language } = useLanguage();
  
  // Use content directly from our predefined content by language
  const content = introContentByLanguage[language] || introContentByLanguage.en;
  
  // Get the features array and text content
  const features: Feature[] = content.features;
  const tagline = 'ABOUT US';
  const title = content.title;
  const description = content.description;

  // Create scroll animation refs with different animation delays
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { ref: titleAnimRef, isVisible: isTitleVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true
  });

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { ref: descriptionAnimRef, isVisible: isDescriptionVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
    animationDelay: 150 // Slight delay after title
  });

  // Create a subtle parallax effect
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(0.15);

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
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Remove any background overlays that might be causing issues */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section title with fade-in animation */}
          <span 
            className={`inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2 fade-in ${isTitleVisible ? 'visible' : ''}`}
            ref={titleAnimRef as React.RefObject<HTMLSpanElement>}
          >
            {tagline}
          </span>
          
          <h2 
            className={`font-bold text-3xl md:text-5xl mb-8 text-white fade-in ${isTitleVisible ? 'visible' : ''}`}
            ref={titleAnimRef as React.RefObject<HTMLHeadingElement>}
          >
            {title}
          </h2>
          
          {/* Description with delayed fade-in - text color changed to white */}
          <p 
            className={`text-lg md:text-xl mb-16 leading-relaxed text-white max-w-3xl mx-auto fade-in ${isDescriptionVisible ? 'visible' : ''}`}
            ref={descriptionAnimRef as React.RefObject<HTMLParagraphElement>}
          >
            {description}
          </p>
          
          {/* Feature cards with staggered fade-in effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              // Create separate animation hooks for each feature with staggered delays
              const { ref: featureRef, isVisible: isFeatureVisible } = useScrollAnimation({
                threshold: 0.1,
                triggerOnce: true,
                animationDelay: 200 + (index * 150) // Stagger the animations
              });
              
              return (
                <div 
                  key={index} 
                  className={`group relative scale-up ${isFeatureVisible ? 'visible' : ''}`}
                  ref={featureRef as React.RefObject<HTMLDivElement>}
                >
                  {/* Decorative background glow */}
                  <div className="absolute -inset-px bg-gradient-to-b from-accent-color/10 to-accent-color/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  <div className="card bg-card-bg border border-white/10 backdrop-blur-sm rounded-xl p-8 transition-all duration-300 relative z-10 h-full flex flex-col items-center group-hover:border-accent-color/20">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-accent-color/10 text-accent-color mb-6 group-hover:scale-110 transition-transform duration-300">
                      {getIcon(feature.icon)}
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-white group-hover:text-accent-color transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
