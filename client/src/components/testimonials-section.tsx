import { Testimonial } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Quote, Star, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export function TestimonialsSection() {
  const { language } = useLanguage();
  const translations = useTranslation(language);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get content from translations
  const content = {
    title: translations.testimonials.title,
    subtitle: translations.testimonials.subtitle
  };
  
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
            .filter((review: any) => {
              // If review has no language field, include it
              if (!review.language) return true;
              
              // Get the review language in lowercase
              const reviewLang = review.language.toLowerCase();
              
              // Check for various language code formats
              return reviewLang === language || // Exact match
                     reviewLang.startsWith(language + '-') || // Format like "de-DE"
                     reviewLang.startsWith(language + '_') || // Format like "de_DE"
                     language === 'de' && (reviewLang === 'german' || reviewLang === 'deutsch') || // Common name
                     language === 'sv' && (reviewLang === 'swedish' || reviewLang === 'svenska') || // Common name
                     language === 'en' && (reviewLang === 'english'); // Common name
            })
            .slice(0, 3); // Limit to 3 reviews
          
          setTestimonials(filteredReviews as Testimonial[]);
        } else {
          // Fallback to testimonials from translation files if no Google reviews
          setTestimonials(translations.testimonials.testimonialsList);
        }
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
        setError(translations.testimonials.errorText);
        // Fallback to testimonials from translation files
        setTestimonials(translations.testimonials.testimonialsList);
      } finally {
        setLoading(false);
      }
    }
    
    fetchGoogleReviews();
  }, [language, translations]);

  return (
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden">
      {/* Using global background without additional overlays */}
      
      <div className="container mx-auto px-4 relative z-50">
        <div className="text-center mb-16 transform-gpu fade-in">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2 text-shadow-lg">
            {translations.testimonials.sectionTitle}
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
            <span className="ml-4 text-white text-xl">{translations.testimonials.loadingText}</span>
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
            {translations.testimonials.leaveReview}
          </a>
        </div>
      </div>
    </section>
  );
}
