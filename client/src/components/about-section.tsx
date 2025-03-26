import { TeamMember } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Mountain, Leaf, Heart } from "lucide-react";

// Team member data by language
const teamMembersByLanguage = {
  en: [
    {
      id: 1,
      name: "Erik Lindström",
      role: "Founder & Lead Guide",
      bio: "Born and raised in Arvidsjaur, Erik has been exploring these mountains since childhood.",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Anna Bergman",
      role: "Experience Director",
      bio: "With a background in hospitality, Anna ensures every aspect of your stay exceeds expectations.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Johan Nilsson",
      role: "Master Dog Sledder",
      bio: "Johan has been training huskies for over 15 years and treats each dog as family.",
      image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Lars Johansson",
      role: "Chef at JayJay's",
      bio: "A culinary artist who specializes in traditional Arctic cuisine with a modern twist.",
      image: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
  ],
  de: [
    {
      id: 1,
      name: "Erik Lindström",
      role: "Gründer & Hauptführer",
      bio: "In Arvidsjaur geboren und aufgewachsen, erkundet Erik diese Berge seit seiner Kindheit.",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Anna Bergman",
      role: "Erlebnisdirektorin",
      bio: "Mit einem Hintergrund im Gastgewerbe stellt Anna sicher, dass jeder Aspekt Ihres Aufenthalts die Erwartungen übertrifft.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Johan Nilsson",
      role: "Meister-Hundeschlittenführer",
      bio: "Johan trainiert seit über 15 Jahren Huskies und behandelt jeden Hund wie ein Familienmitglied.",
      image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Lars Johansson",
      role: "Koch bei JayJay's",
      bio: "Ein Kochkünstler, der sich auf traditionelle arktische Küche mit modernem Twist spezialisiert hat.",
      image: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
  ],
  sv: [
    {
      id: 1,
      name: "Erik Lindström",
      role: "Grundare & Huvudguide",
      bio: "Född och uppvuxen i Arvidsjaur, Erik har utforskat dessa berg sedan barndomen.",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Anna Bergman",
      role: "Upplevelsedirektör",
      bio: "Med bakgrund inom gästfrihet säkerställer Anna att varje aspekt av din vistelse överträffar förväntningarna.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Johan Nilsson",
      role: "Mästare på Hundspann",
      bio: "Johan har tränat huskies i över 15 år och behandlar varje hund som familj.",
      image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Lars Johansson",
      role: "Kock på JayJay's",
      bio: "En kulinarisk konstnär som specialiserar sig på traditionell arktisk mat med en modern twist.",
      image: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
  ]
};

// About content by language
const aboutContentByLanguage = {
  en: {
    title: "WHY WE LIVE FOR THIS",
    subtitle: "Our story, our team, and our commitment to authentic Arctic adventures",
    storyTitle: "OUR STORY",
    storyParagraph1: "Triple X Adventures was born from a simple passion: sharing the raw beauty and adventure of Swedish Lapland with those who seek authentic experiences. Founded by local adventurers who grew up in these forests and mountains, we started with just a few snowmobiles and a deep knowledge of the land.",
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
    storyParagraph1: "Triple X Adventures entstand aus einer einfachen Leidenschaft: die unberührte Schönheit und das Abenteuer von Schwedisch-Lappland mit denen zu teilen, die authentische Erlebnisse suchen. Gegründet von lokalen Abenteurern, die in diesen Wäldern und Bergen aufwuchsen, begannen wir mit nur wenigen Schneemobilen und einem tiefen Wissen über das Land.",
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
    storyParagraph1: "Triple X Adventures föddes ur en enkel passion: att dela den råa skönheten och äventyret i Svenska Lappland med dem som söker autentiska upplevelser. Grundat av lokala äventyrare som växte upp i dessa skogar och berg, började vi med bara några snöskotrar och en djup kunskap om landet.",
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
      {/* Background with premium dark gradient - more optimized for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-card-bg/30 via-dark-bg to-card-bg/30 opacity-95 z-0"></div>
      
      {/* Northern lights glow effect - simplified for better performance */}
      <div className="absolute inset-0 pointer-events-none z-0 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-color/5 via-transparent to-transparent opacity-20 transform-gpu"></div>
      </div>
      
      {/* Subtle pattern overlay - optimized with transform-gpu for better performance */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 z-0 pointer-events-none transform-gpu"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2 text-shadow-sm">
            {language === 'de' ? 'Unser Team' : language === 'sv' ? 'Vårt Team' : 'Our Team'}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-primary-text text-shadow-lg">
            {content.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-secondary-text text-shadow-sm">
            {content.subtitle}
          </p>
        </div>
        
        {/* Our Story with image - optimized for performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
          <div className="group relative transform-gpu">
            {/* Glass effect wrapper - optimized with transform-gpu and transition-opacity */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent-color/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 transform-gpu"></div>
            
            <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg relative z-10 transform-gpu">
              <div className="p-8">
                <h3 className="font-bold text-2xl mb-6 text-primary-text group-hover:text-accent-color transition-colors duration-300 text-shadow-sm">
                  {content.storyTitle}
                </h3>
                <div className="space-y-4 text-secondary-text">
                  <p className="leading-relaxed text-shadow-sm">{content.storyParagraph1}</p>
                  <p className="leading-relaxed text-shadow-sm">{content.storyParagraph2}</p>
                  <p className="leading-relaxed text-shadow-sm">{content.storyParagraph3}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl shadow-xl transform-gpu">
            {/* Image with gradient overlay - simplified hover effect for better performance */}
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 transform-gpu"></div>
              <img 
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt={content.teamImageAlt} 
                className="w-full h-full object-cover transform-gpu"
                loading="eager"
                width="500"
                height="300"
              />
            </div>
          </div>
        </div>
        
        {/* Our Values - optimized for performance */}
        <div className="mb-24">
          <h3 className="font-bold text-2xl mb-12 text-center text-primary-text text-shadow-sm">
            {content.valuesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {content.values.map((value, index) => (
              <div key={index} className="group relative transform-gpu">
                {/* Hover glow effect - optimized with reduced blur and transform-gpu */}
                <div className="absolute -inset-px bg-gradient-to-br from-accent-color/10 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 transform-gpu"></div>
                
                <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl p-6 relative z-10 h-full flex flex-col items-center text-center group-hover:border-accent-color/30 transition-colors duration-300 transform-gpu">
                  <div className="w-14 h-14 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color mb-5 group-hover:scale-110 transition-transform duration-300 transform-gpu">
                    {getValueIcon(value.icon)}
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-primary-text group-hover:text-accent-color transition-colors duration-300 text-shadow-sm">
                    {value.title}
                  </h4>
                  <p className="text-secondary-text text-shadow-sm">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Members */}
        <div>
          <h3 className="font-bold text-2xl mb-12 text-center text-primary-text text-shadow-sm">
            {content.teamTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative transform-gpu">
                {/* Decorative background glow - optimized with reduced opacity for better performance */}
                <div className="absolute -inset-px bg-gradient-to-t from-accent-color/5 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl p-6 relative z-10 flex flex-col items-center text-center group-hover:border-accent-color/30 transition-colors duration-300 transform-gpu">
                  {/* Image with color border - optimized transitions */}
                  <div className="mb-5 w-32 h-32 rounded-full overflow-hidden border border-accent-color/40 p-1 transition-transform duration-300 group-hover:scale-105 transform-gpu">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                  
                  <h4 className="font-bold text-lg mb-1 text-primary-text group-hover:text-accent-color transition-colors duration-300 text-shadow-sm">
                    {member.name}
                  </h4>
                  <p className="text-accent-color font-medium mb-3 text-sm">
                    {member.role}
                  </p>
                  <p className="text-secondary-text text-sm text-shadow-sm">
                    {member.bio}
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
