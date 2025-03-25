import { Testimonial } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

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
    <section className="py-16 md:py-24 bg-ice">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-midnight">{content.title}</h2>
          <p className="text-lg max-w-3xl mx-auto text-slate">{content.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="text-fire text-4xl absolute -top-4 left-6">
                <i className="fas fa-quote-left"></i>
              </div>
              <div className="pt-6">
                <p className="mb-6 text-slate italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.author.image} 
                      alt={testimonial.author.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-midnight">{testimonial.author.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.author.location}</p>
                  </div>
                  <div className="ml-auto text-fire">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
