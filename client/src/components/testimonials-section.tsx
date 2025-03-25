import { Testimonial } from "@/types";

// Testimonial data
const testimonials: Testimonial[] = [
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
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-ice">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-midnight">WHAT ADVENTURERS SAY</h2>
          <p className="text-lg max-w-3xl mx-auto text-slate">Stories from those who've experienced the Real Arctic Deal</p>
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
