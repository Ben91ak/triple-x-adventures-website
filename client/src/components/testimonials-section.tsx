import { Testimonial } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Quote, Star } from "lucide-react";

// Testimonial data by language
const testimonialsByLanguage = {
  en: [
    {
      id: 1,
      text: "Triple X Adventures delivered an experience that was simply beyond words. The snowmobile trip through pristine forests felt like entering another world, and our guide Erik's knowledge added so much depth to the journey.",
      author: {
        name: "Sarah J.",
        location: "London, UK",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5
    },
    {
      id: 2,
      text: "The dog sledding adventure was incredible! These aren't tourist-factory experiences but real, authentic Arctic adventures. The TXA Chalet was amazing too—watching the northern lights from the sauna was unforgettable.",
      author: {
        name: "Michael T.",
        location: "Berlin, Germany",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5
    },
    {
      id: 3,
      text: "What sets Triple X apart is the personal touch. We've done winter activities elsewhere, but here we felt like guests rather than tourists. The meal at JayJay's was a highlight—I'm still dreaming about that reindeer stew!",
      author: {
        name: "Emma L.",
        location: "Sydney, Australia",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5
    }
  ],
  de: [
    {
      id: 1,
      text: "Triple X Adventures hat ein Erlebnis geliefert, das einfach unbeschreiblich ist. Die Schneemobilfahrt durch unberührte Wälder fühlte sich an, als würde man eine andere Welt betreten, und das Wissen unseres Guides Erik hat der Reise so viel Tiefe verliehen.",
      author: {
        name: "Sarah J.",
        location: "London, UK",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5
    },
    {
      id: 2,
      text: "Das Hundeschlittenabenteuer war unglaublich! Dies sind keine Touristenfabrikerlebnisse, sondern echte, authentische arktische Abenteuer. Das TXA-Chalet war auch erstaunlich – die Nordlichter von der Sauna aus zu beobachten war unvergesslich.",
      author: {
        name: "Michael T.",
        location: "Berlin, Deutschland",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5
    },
    {
      id: 3,
      text: "Was Triple X auszeichnet, ist die persönliche Note. Wir haben anderswo Winteraktivitäten unternommen, aber hier fühlten wir uns wie Gäste und nicht wie Touristen. Das Essen bei JayJay's war ein Highlight – ich träume immer noch von diesem Rentiereintopf!",
      author: {
        name: "Emma L.",
        location: "Sydney, Australien",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5
    }
  ],
  sv: [
    {
      id: 1,
      text: "Triple X Adventures levererade en upplevelse som var helt enkelt bortom ord. Snöskoterturen genom orörda skogar kändes som att komma in i en annan värld, och vår guide Eriks kunskap tillförde så mycket djup till resan.",
      author: {
        name: "Sarah J.",
        location: "London, Storbritannien",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5
    },
    {
      id: 2,
      text: "Hundspannsäventyret var otroligt! Dessa är inte turistfabriksupplevelser utan riktiga, autentiska arktiska äventyr. TXA-chaléet var också fantastiskt – att titta på norrsken från bastun var oförglömligt.",
      author: {
        name: "Michael T.",
        location: "Berlin, Tyskland",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5
    },
    {
      id: 3,
      text: "Det som skiljer Triple X från mängden är den personliga touchen. Vi har gjort vinteraktiviteter på andra ställen, men här kände vi oss som gäster snarare än turister. Måltiden på JayJay's var en höjdpunkt – jag drömmer fortfarande om den rengrytan!",
      author: {
        name: "Emma L.",
        location: "Sydney, Australien",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5
    }
  ]
};

// Section content by language
const contentByLanguage = {
  en: {
    title: "WHAT ADVENTURERS SAY",
    subtitle: "Stories from those who've experienced the Real Arctic Deal"
  },
  de: {
    title: "WAS ABENTEURER SAGEN",
    subtitle: "Geschichten von denen, die das echte arktische Erlebnis erfahren haben"
  },
  sv: {
    title: "VAD ÄVENTYRARE SÄGER",
    subtitle: "Berättelser från de som har upplevt den äkta arktiska upplevelsen"
  }
};

export function TestimonialsSection() {
  const { language } = useLanguage();
  
  // Get content and testimonials based on the current language
  const content = contentByLanguage[language];
  const testimonials: Testimonial[] = testimonialsByLanguage[language];

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Using the global background - no need for section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Simple glow effect to complement global background */}
        <div className="aurora-glow absolute inset-0 opacity-30"></div>
      </div>
      
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-dark-bg transform-gpu" style={{ zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 pointer-events-none transform-gpu" style={{ zIndex: 15 }}></div>
      
      <div className="container mx-auto px-4 relative z-50" style={{ zIndex: 50 }}>
        <div className="text-center mb-16 transform-gpu fade-in">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2 text-shadow-lg">
            {language === 'de' ? 'Erfahrungen' : language === 'sv' ? 'Upplevelser' : 'Experiences'}
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
        
        {/* Background aurora glow for testimonials */}
        <div className="relative fade-in scale-up transform-gpu visible">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-[600px] aurora-glow opacity-30 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`group relative transform-gpu stagger-${index % 5 + 1}`}>
                {/* Decorative glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-accent-color/20 via-accent-color/10 to-transparent rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 transform-gpu"></div>
                
                {/* Card with enhanced glass effect */}
                <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl p-8 relative z-10 h-full flex flex-col group-hover:border-accent-color/30 transition-colors duration-300 transform-gpu"
                     style={{ backgroundColor: 'rgba(26, 29, 31, 0.7)' }}>
                  {/* Quote icon with glow */}
                  <div className="absolute -top-4 -left-2 text-accent-color">
                    <div className="relative">
                      <div className="absolute inset-0 blur-md text-accent-color opacity-50"></div>
                      <Quote size={40} className="relative z-10" />
                    </div>
                  </div>
                  
                  <div className="pt-6 flex-grow">
                    <p className="mb-6 text-white/90 text-shadow-sm leading-relaxed">{testimonial.text}</p>
                    
                    {/* Stars with glow effect */}
                    <div className="flex mb-4 text-accent-color">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="relative mr-1">
                          <div className="absolute inset-0 text-accent-color blur-sm opacity-40"></div>
                          <Star key={i} size={18} className="fill-accent-color relative z-10" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Author info with premium styling */}
                    <div className="flex items-center mt-auto">
                      <div className="relative mr-4">
                        {/* Accent color glow around avatar */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-accent-color via-accent-color/50 to-accent-color/30 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 p-1 relative transform-gpu">
                          <img 
                            src={testimonial.author.image} 
                            alt={testimonial.author.name} 
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-shadow-md">{testimonial.author.name}</h4>
                        <p className="text-sm text-accent-color">{testimonial.author.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
