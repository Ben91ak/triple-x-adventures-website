import { Testimonial } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Quote, Star, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

// Testimonial data by language
const testimonialsByLanguage = {
  en: [
    {
      id: 1,
      text: "Triple X Adventures delivered an experience that was simply beyond words. The snowmobile trip through pristine forests felt like entering another world, and our guide Erik's knowledge added so much depth to the journey.",
      author: "Sarah J.",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 2,
      text: "The dog sledding adventure was incredible! These aren't tourist-factory experiences but real, authentic Arctic adventures. The TXA Chalet was amazing too—watching the northern lights from the sauna was unforgettable.",
      author: "Michael T.",
      location: "Berlin, Germany",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 3,
      text: "What sets Triple X apart is the personal touch. We've done winter activities elsewhere, but here we felt like guests rather than tourists. The meal at JayJay's was a highlight—I'm still dreaming about that reindeer stew!",
      author: "Emma L.",
      location: "Sydney, Australia",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    }
  ],
  de: [
    {
      id: 1,
      text: "Triple X Adventures hat ein Erlebnis geliefert, das einfach unbeschreiblich ist. Die Schneemobilfahrt durch unberührte Wälder fühlte sich an, als würde man eine andere Welt betreten, und das Wissen unseres Guides Erik hat der Reise so viel Tiefe verliehen.",
      author: "Sarah J.",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 2,
      text: "Das Hundeschlittenabenteuer war unglaublich! Dies sind keine Touristenfabrikerlebnisse, sondern echte, authentische arktische Abenteuer. Das TXA-Chalet war auch erstaunlich – die Nordlichter von der Sauna aus zu beobachten war unvergesslich.",
      author: "Michael T.",
      location: "Berlin, Deutschland",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 3,
      text: "Was Triple X auszeichnet, ist die persönliche Note. Wir haben anderswo Winteraktivitäten unternommen, aber hier fühlten wir uns wie Gäste und nicht wie Touristen. Das Essen bei JayJay's war ein Highlight – ich träume immer noch von diesem Rentiereintopf!",
      author: "Emma L.",
      location: "Sydney, Australien",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    }
  ],
  sv: [
    {
      id: 1,
      text: "Triple X Adventures levererade en upplevelse som var helt enkelt bortom ord. Snöskoterturen genom orörda skogar kändes som att komma in i en annan värld, och vår guide Eriks kunskap tillförde så mycket djup till resan.",
      author: "Sarah J.",
      location: "London, Storbritannien",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 2,
      text: "Hundspannsäventyret var otroligt! Dessa är inte turistfabriksupplevelser utan riktiga, autentiska arktiska äventyr. TXA-chaléet var också fantastiskt – att titta på norrsken från bastun var oförglömligt.",
      author: "Michael T.",
      location: "Berlin, Tyskland",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 3,
      text: "Det som skiljer Triple X från mängden är den personliga touchen. Vi har gjort vinteraktiviteter på andra ställen, men här kände vi oss som gäster snarare än turister. Måltiden på JayJay's var en höjdpunkt – jag drömmer fortfarande om den rengrytan!",
      author: "Emma L.",
      location: "Sydney, Australien",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get content based on the current language
  const content = contentByLanguage[language];
  
  // Fetch Google reviews
  useEffect(() => {
    async function fetchGoogleReviews() {
      try {
        setLoading(true);
        const response = await fetch('/api/google-reviews');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }
        
        const data = await response.json();
        
        // If we successfully got reviews from Google
        if (data.reviews && data.reviews.length > 0) {
          // Filter reviews by language if possible, otherwise use all
          const filteredReviews = data.reviews
            .filter((review: any) => !review.language || review.language.toLowerCase().includes(language))
            .slice(0, 3); // Limit to 3 reviews
          
          setTestimonials(filteredReviews as Testimonial[]);
        } else {
          // Fallback to hardcoded testimonials if no Google reviews
          setTestimonials(testimonialsByLanguage[language]);
        }
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
        setError('Failed to load reviews');
        // Fallback to hardcoded testimonials
        setTestimonials(testimonialsByLanguage[language]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchGoogleReviews();
  }, [language]);

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Using global background without additional overlays */}
      
      <div className="container mx-auto px-4 relative z-50">
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
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-12 h-12 text-accent-color animate-spin" />
            <span className="ml-4 text-white text-xl">Loading reviews...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-white/80 text-xl">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`group relative transform-gpu stagger-${index % 5 + 1}`}>
                {/* Card with glass effect */}
                <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl p-8 relative z-10 h-full flex flex-col transition-colors duration-300 transform-gpu"
                     style={{ backgroundColor: 'rgba(26, 29, 31, 0.7)' }}>
                  {/* Quote icon */}
                  <div className="absolute -top-4 -left-2 text-accent-color">
                    <Quote size={40} className="relative z-10" />
                  </div>
                  
                  <div className="pt-6 flex-grow">
                    <p className="mb-6 text-white/90 text-shadow-sm leading-relaxed">{testimonial.text}</p>
                    
                    {/* Stars - Google style */}
                    <div className="flex mb-4 items-center">
                      {/* Display filled stars based on rating - Google yellow color */}
                      {[...Array(Math.floor(testimonial.rating || 0))].map((_, i) => (
                        <Star key={i} size={18} className="relative z-10 mr-1" fill="#FBBC05" stroke="#FBBC05" />
                      ))}
                      
                      {/* Display empty stars to complete 5 stars */}
                      {[...Array(5 - Math.floor(testimonial.rating || 0))].map((_, i) => (
                        <Star key={i} size={18} className="relative z-10 mr-1" stroke="#FBBC05" fill="transparent" />
                      ))}
                      
                      {/* Display rating number next to stars - Google style */}
                      <span className="ml-2 text-sm font-medium" style={{ color: '#FBBC05' }}>{testimonial.rating?.toFixed(1) || '0.0'}</span>
                    </div>
                    
                    {/* Author info */}
                    <div className="flex items-center mt-auto">
                      <div className="relative mr-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 p-1 relative transform-gpu">
                          <img 
                            src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}`} 
                            alt={testimonial.author} 
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-shadow-md">{testimonial.author}</h4>
                        <p className="text-sm text-accent-color">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <a 
            href="https://www.google.com/maps/place/Triple+X+Adventures+AB/@65.594411,19.1676481,650m/data=!3m1!1e3!4m16!1m9!3m8!1s0x4678587d4026714b:0xf4873ce005ddc35f!2sTriple+X+Adventures+AB!8m2!3d65.5944088!4d19.170223!9m1!1b1!16s%2Fg%2F11ggncdcdq!3m5!1s0x4678587d4026714b:0xf4873ce005ddc35f!8m2!3d65.5944088!4d19.170223!16s%2Fg%2F11ggncdcdq?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#A4D233] text-white rounded-lg hover:bg-[#8FBB1C] transition-colors shadow-md"
          >
            {language === 'de' ? 'Bewertung abgeben' : 
             language === 'sv' ? 'Lämna ett omdöme' : 
             'Leave a Review'}
          </a>
        </div>
      </div>
    </section>
  );
}
