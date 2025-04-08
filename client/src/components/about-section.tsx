import { TeamMember } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Mountain, Leaf, Heart } from "lucide-react";

// Team member data by language
const teamMembersByLanguage = {
  en: [
    {
      id: 1,
      name: "Janina JayJay Möller",
      role: "Founder & CEO",
      bio: "Founded Triple X Adventures with a passion for authentic Arctic experiences.",
      image: "/images/Team/jayjay.jpg"
    },
    {
      id: 2,
      name: "Benni Fichtner",
      role: "Project Lead",
      bio: "Manages our projects with precision and creativity.",
      image: "/images/Team/Benni.jpg"
    },
    {
      id: 3,
      name: "Jesper Axelsson",
      role: "Head Guide",
      bio: "Expert guide with years of experience in the Arctic wilderness.",
      image: "/images/Team/Jeppe.jpg"
    },
    {
      id: 4,
      name: "Henni Bruhn",
      role: "Experience Coordinator",
      bio: "Creates unforgettable customer journeys and adventure itineraries.",
      image: "/images/Team/Henni.jpg"
    },
    {
      id: 5,
      name: "Fanny Johannson",
      role: "Project Manager",
      bio: "Ensures all our adventures run smoothly from start to finish.",
      image: "/images/Team/Fanny.jpg"
    }
  ],
  de: [
    {
      id: 1,
      name: "Janina JayJay Möller",
      role: "Gründerin & CEO",
      bio: "Gründete Triple X Adventures mit einer Leidenschaft für authentische arktische Erlebnisse.",
      image: "/images/Team/jayjay.jpg"
    },
    {
      id: 2,
      name: "Benni Fichtner",
      role: "Projektmanager",
      bio: "Leitet unsere Projekte mit Präzision und Kreativität.",
      image: "/images/Team/Benni.jpg"
    },
    {
      id: 3,
      name: "Jesper Axelsson",
      role: "Meister-Hundeschlittenführer",
      bio: "Erfahrener Guide mit langjähriger Erfahrung in der arktischen Wildnis.",
      image: "/images/Team/Jeppe.jpg"
    },
    {
      id: 4,
      name: "Henni Eriksson",
      role: "Erlebniskoordinatorin",
      bio: "Gestaltet unvergessliche Kundenerlebnisse und Abenteuer-Reisepläne.",
      image: "/images/Team/Henni.jpg"
    },
    {
      id: 5,
      name: "Fanny Johannson",
      role: "Projectmanager",
      bio: "Sorgt dafür, dass alle unsere Abenteuer von Anfang bis Ende reibungslos verlaufen.",
      image: "/images/Team/Fanny.jpg"
    }
  ],
  sv: [
    {
      id: 1,
      name: "Janina JayJay Möller",
      role: "Grundare & VD",
      bio: "Grundade Triple X Adventures med en passion för autentiska arktiska upplevelser.",
      image: "/images/Team/jayjay.jpg"
    },
    {
      id: 2,
      name: "Benni Fichtner",
      role: "Projektledare",
      bio: "Leder våra projekt med precision och kreativitet.",
      image: "/images/Team/Benni.jpg"
    },
    {
      id: 3,
      name: "Jesper Axelsson",
      role: "Mästare på Hundspann",
      bio: "Erfaren guide med många års erfarenhet i den arktiska vildmarken.",
      image: "/images/Team/Jeppe.jpg"
    },
    {
      id: 4,
      name: "Henni Eriksson",
      role: "Upplevelsekoordinator",
      bio: "Skapar oförglömliga kundresor och äventyrsplaner.",
      image: "/images/Team/Henni.jpg"
    },
    {
      id: 5,
      name: "Fanny Johannson",
      role: "Projektledare",
      bio: "Ser till att alla våra äventyr löper smidigt från början till slut.",
      image: "/images/Team/Fanny.jpg"
    }
  ]
};

// About content by language
const aboutContentByLanguage = {
  en: {
    title: "WHY WE LIVE FOR THIS",
    subtitle: "Our story, our team, and our commitment to authentic Arctic adventures",
    storyTitle: "OUR STORY",
    storyParagraph1: "Triple X Adventures was born from a simple passion: sharing the raw beauty and adventure of Swedish Lapland with those who seek authentic experiences. Founded by Janina Möller in 2017 with just a few snowmobiles and a dream to show our guests the magic of Swedish Lapland.",
    storyParagraph2: "Today, we've grown into a premium adventure company, but our heart remains the same. We still operate with small groups, still work with local partners, and still believe that the Arctic isn't just a destination—it's an experience that changes you.",
    storyParagraph3: "Unlike mass tourism operations, we've chosen to stay true to our roots: personal, exclusive, and deeply connected to the land we call home.",
    valuesTitle: "OUR VALUES",
    values: [
      {
        title: "Authenticity",
        description: "We showcase the real Arctic, without filters or pretense. What you experience with us is genuine Lapland.",
        icon: "mountain"
      },
      {
        title: "Sustainability",
        description: "We tread lightly on the land we love, employing sustainable practices that preserve the Arctic for future generations.",
        icon: "leaf"
      },
      {
        title: "Passion",
        description: "Our guides aren't just employees—they're enthusiasts who love sharing their knowledge and excitement for the Arctic.",
        icon: "heart"
      }
    ],
    teamTitle: "MEET OUR TEAM",
    teamImageAlt: "Team members in Arctic gear"
  },
  de: {
    title: "WARUM WIR DAFÜR LEBEN",
    subtitle: "Unsere Geschichte, unser Team und unser Engagement für authentische arktische Abenteuer",
    storyTitle: "UNSERE GESCHICHTE",
    storyParagraph1: "Triple X Adventures entstand aus einer einfachen Leidenschaft: die unberührte Schönheit und das Abenteuer von Schwedisch-Lappland mit denen zu teilen, die authentische Erlebnisse suchen. Gegründet von Janina Möller im Jahr 2017 mit nur wenigen Schneemobilen und einem Traum, unseren Gästen die Magie von Schwedisch-Lappland zu zeigen.",
    storyParagraph2: "Heute sind wir zu einem Premium-Abenteuerunternehmen herangewachsen, aber unser Herz bleibt das gleiche. Wir arbeiten immer noch mit kleinen Gruppen, arbeiten immer noch mit lokalen Partnern zusammen und glauben immer noch, dass die Arktis nicht nur ein Reiseziel ist – es ist ein Erlebnis, das Sie verändert.",
    storyParagraph3: "Im Gegensatz zu Massentourismusunternehmen haben wir uns entschieden, unseren Wurzeln treu zu bleiben: persönlich, exklusiv und tief verbunden mit dem Land, das wir unser Zuhause nennen.",
    valuesTitle: "UNSERE WERTE",
    values: [
      {
        title: "Authentizität",
        description: "Wir präsentieren die echte Arktis, ohne Filter oder Vorwand. Was Sie mit uns erleben, ist echtes Lappland.",
        icon: "mountain"
      },
      {
        title: "Nachhaltigkeit",
        description: "Wir gehen behutsam mit dem Land um, das wir lieben, und setzen nachhaltige Praktiken ein, die die Arktis für zukünftige Generationen bewahren.",
        icon: "leaf"
      },
      {
        title: "Leidenschaft",
        description: "Unsere Guides sind nicht nur Mitarbeiter – sie sind Enthusiasten, die ihr Wissen und ihre Begeisterung für die Arktis gerne teilen.",
        icon: "heart"
      }
    ],
    teamTitle: "LERNEN SIE UNSER TEAM KENNEN",
    teamImageAlt: "Teammitglieder in arktischer Ausrüstung"
  },
  sv: {
    title: "VARFÖR VI LEVER FÖR DETTA",
    subtitle: "Vår historia, vårt team och vårt engagemang för autentiska arktiska äventyr",
    storyTitle: "VÅR HISTORIA",
    storyParagraph1: "Triple X Adventures föddes ur en enkel passion: att dela den råa skönheten och äventyret i Svenska Lappland med dem som söker autentiska upplevelser. Grundad av Janina Möller år 2017 med bara några snöskotrar och en dröm att visa våra gäster magin i Svenska Lappland.",
    storyParagraph2: "Idag har vi växt till ett premiumäventyrsföretag, men vårt hjärta förblir detsamma. Vi arbetar fortfarande med små grupper, arbetar fortfarande med lokala partners och tror fortfarande att Arktis inte bara är en destination – det är en upplevelse som förändrar dig.",
    storyParagraph3: "Till skillnad från massturismsverksamheter har vi valt att förbli trogna våra rötter: personliga, exklusiva och djupt anslutna till landet vi kallar hem.",
    valuesTitle: "VÅRA VÄRDERINGAR",
    values: [
      {
        title: "Autenticitet",
        description: "Vi visar upp den verkliga Arktis, utan filter eller låtsas. Vad du upplever med oss är genuina Lappland.",
        icon: "mountain"
      },
      {
        title: "Hållbarhet",
        description: "Vi går lätt på landet vi älskar och använder hållbara metoder som bevarar Arktis för framtida generationer.",
        icon: "leaf"
      },
      {
        title: "Passion",
        description: "Våra guider är inte bara anställda – de är entusiaster som älskar att dela sin kunskap och spänning för Arktis.",
        icon: "heart"
      }
    ],
    teamTitle: "TRÄFFA VÅRT TEAM",
    teamImageAlt: "Teammedlemmar i arktisk utrustning"
  }
};

export function AboutSection() {
  const { language } = useLanguage();
  
  // Get content and team members based on the current language
  const content = aboutContentByLanguage[language];
  const teamMembers: TeamMember[] = teamMembersByLanguage[language];

  // Map value icons to Lucide components
  const getValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'mountain':
        return <Mountain size={28} />;
      case 'leaf':
        return <Leaf size={28} />;
      case 'heart':
        return <Heart size={28} />;
      default:
        return null;
    }
  };

  return (
    <section id="team" className="py-24 md:py-32 relative overflow-hidden">
      {/* Using the global background - no need for section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Simple glow effect to complement global background */}
        <div className="aurora-glow absolute inset-0 opacity-30"></div>
      </div>
      
      {/* Removed dark overlay for consistency */}
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 pointer-events-none transform-gpu" style={{ zIndex: 15 }}></div>
      
      <div className="container mx-auto px-4 relative z-50" style={{ zIndex: 50 }}>
        <div className="text-center mb-16 transform-gpu">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2 text-shadow-lg">
            {language === 'de' ? 'Unser Team' : language === 'sv' ? 'Vårt Team' : 'Our Team'}
          </span>
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight text-white text-shadow-lg" 
            style={{ 
              color: '#FFFFFF', 
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
            }}>
            {content.title}
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-white text-shadow-lg mb-8">
            {content.subtitle}
          </p>
        </div>
        
        {/* Our Story with image - optimized for performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-20 max-w-6xl mx-auto fade-in scale-up transform-gpu visible">
          <div className="group relative transform-gpu h-full min-h-[400px]">
            {/* Aurora glow effect behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-full max-h-full aurora-glow opacity-30 pointer-events-none"></div>
            
            <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl relative z-10 transform-gpu h-full" 
                style={{ backgroundColor: 'rgba(26, 29, 31, 0.7)' }}>
              <div className="p-8 h-full flex flex-col">
                <h3 className="font-bold text-2xl mb-6 text-white group-hover:text-accent-color transition-colors duration-300 text-shadow-lg"
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.75)' }}>
                  {content.storyTitle}
                </h3>
                <div className="space-y-4 text-white flex-grow">
                  <p className="leading-relaxed text-shadow-sm">{content.storyParagraph1}</p>
                  <p className="leading-relaxed text-shadow-sm">{content.storyParagraph2}</p>
                  <p className="leading-relaxed text-shadow-sm">{content.storyParagraph3}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl shadow-2xl transform-gpu h-full min-h-[400px]">
            {/* Image with gradient overlay and glass effect - using no-blur variant for better visibility */}
            <div className="relative h-full glassmorphism-no-blur">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10 transform-gpu"></div>
              <img 
                src="/images/About TXA.jpg" 
                alt={content.teamImageAlt} 
                className="w-full h-full object-cover transform-gpu brightness-110"
                loading="eager"
                width="500"
                height="300"
              />
              {/* Northern lights glow overlay with reduced opacity for better image visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-color/10 via-transparent to-transparent opacity-20 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
        
        {/* Our Values - optimized with premium look */}
        <div className="mb-24 fade-in transform-gpu visible">
          <h3 className="font-bold text-2xl md:text-3xl mb-12 text-center text-white text-shadow-lg"
              style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.75)' }}>
            {content.valuesTitle}
          </h3>
          
          {/* Background aurora glow for values section */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-[400px] aurora-glow opacity-30 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {content.values.map((value, index) => (
                <div key={index} className="group relative transform-gpu">
                  {/* Hover glow effect */}
                  <div className="absolute -inset-px bg-gradient-to-br from-accent-color/20 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 transform-gpu"></div>
                  
                  <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl p-6 relative z-10 h-full flex flex-col items-center text-center group-hover:border-accent-color/30 transition-colors duration-300 transform-gpu"
                      style={{ backgroundColor: 'rgba(26, 29, 31, 0.7)' }}>
                    <div className="w-14 h-14 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color mb-5 group-hover:scale-110 transition-transform duration-300 transform-gpu">
                      {getValueIcon(value.icon)}
                    </div>
                    <h4 className="font-bold text-xl mb-3 text-white group-hover:text-accent-color transition-colors duration-300 text-shadow-md">
                      {value.title}
                    </h4>
                    <p className="text-white/80 text-shadow-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Team Members */}
        <div className="fade-in transform-gpu visible">
          <h3 className="font-bold text-2xl md:text-3xl mb-12 text-center text-white text-shadow-lg"
              style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.75)' }}>
            {content.teamTitle}
          </h3>
          
          {/* Background aurora glow for team section */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-[600px] aurora-glow opacity-30 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={member.id} className={`group relative transform-gpu stagger-${index % 5 + 1}`}>
                  {/* Decorative background glow */}
                  <div className="absolute -inset-px bg-gradient-to-t from-accent-color/20 via-accent-color/10 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 transform-gpu"></div>
                  
                  <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl p-6 relative z-10 flex flex-col items-center text-center group-hover:border-accent-color/30 transition-colors duration-300 transform-gpu h-full"
                      style={{ backgroundColor: 'rgba(26, 29, 31, 0.7)' }}>
                    {/* Image with accent color glow and circular frame */}
                    <div className="relative mb-5">
                      {/* Outer glow ring */}
                      <div className="absolute -inset-1 bg-gradient-to-br from-accent-color via-accent-color/50 to-accent-color/30 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                      
                      {/* Dark circular border */}
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-800/80 relative transition-transform duration-300 group-hover:scale-105 transform-gpu flex items-center justify-center bg-gray-900/80">
                        {/* Inner white/translucent border */}
                        <div className="w-[90%] h-[90%] rounded-full overflow-hidden border border-white/20 flex items-center justify-center">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-[90%] h-[90%] object-cover rounded-full"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-lg mb-1 text-white group-hover:text-accent-color transition-colors duration-300 text-shadow-md">
                      {member.name}
                    </h4>
                    <p className="text-accent-color font-medium text-sm">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
