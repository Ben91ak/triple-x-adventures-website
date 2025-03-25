import { TeamMember } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

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
        icon: "fas fa-mountain"
      },
      {
        title: "Sustainability",
        description: "We tread lightly on the land we love, employing sustainable practices that preserve the Arctic for future generations.",
        icon: "fas fa-leaf"
      },
      {
        title: "Passion",
        description: "Our guides aren't just employees—they're enthusiasts who love sharing their knowledge and excitement for the Arctic.",
        icon: "fas fa-heart"
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
        icon: "fas fa-mountain"
      },
      {
        title: "Nachhaltigkeit",
        description: "Wir gehen behutsam mit dem Land um, das wir lieben, und setzen nachhaltige Praktiken ein, die die Arktis für zukünftige Generationen bewahren.",
        icon: "fas fa-leaf"
      },
      {
        title: "Leidenschaft",
        description: "Unsere Guides sind nicht nur Mitarbeiter – sie sind Enthusiasten, die ihr Wissen und ihre Begeisterung für die Arktis gerne teilen.",
        icon: "fas fa-heart"
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
        icon: "fas fa-mountain"
      },
      {
        title: "Hållbarhet",
        description: "Vi går lätt på landet vi älskar och använder hållbara metoder som bevarar Arktis för framtida generationer.",
        icon: "fas fa-leaf"
      },
      {
        title: "Passion",
        description: "Våra guider är inte bara anställda – de är entusiaster som älskar att dela sin kunskap och spänning för Arktis.",
        icon: "fas fa-heart"
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

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-midnight">{content.title}</h2>
          <p className="text-lg max-w-3xl mx-auto text-slate">{content.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="font-montserrat font-semibold text-2xl mb-4 text-midnight">{content.storyTitle}</h3>
            <p className="mb-4 text-slate leading-relaxed">{content.storyParagraph1}</p>
            <p className="mb-4 text-slate leading-relaxed">{content.storyParagraph2}</p>
            <p className="text-slate leading-relaxed">{content.storyParagraph3}</p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt={content.teamImageAlt} 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        <div className="bg-ice rounded-lg p-8 md:p-12 mb-16">
          <h3 className="font-montserrat font-semibold text-2xl mb-6 text-center text-midnight">{content.valuesTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.values.map((value, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${index === 0 ? 'bg-forest' : index === 1 ? 'bg-fire' : 'bg-midnight'} text-white rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${value.icon} text-2xl`}></i>
                </div>
                <h4 className="font-montserrat font-semibold text-lg mb-2 text-midnight">{value.title}</h4>
                <p className="text-slate">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-montserrat font-semibold text-2xl mb-8 text-center text-midnight">{content.teamTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="mb-4 aspect-square overflow-hidden rounded-full mx-auto w-48">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-montserrat font-semibold text-lg mb-1 text-midnight">{member.name}</h4>
                <p className="text-fire font-semibold mb-2">{member.role}</p>
                <p className="text-slate">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
