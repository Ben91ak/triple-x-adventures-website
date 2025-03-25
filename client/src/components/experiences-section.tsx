import { Experience } from "@/types";

// Experience data
const experiences: Experience[] = [
  {
    id: 1,
    title: "Snowmobile Safari",
    description: "Carve through pristine snow-covered forests and frozen lakes on our premium snowmobiles, guided by local experts.",
    price: 2495,
    image: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tag: {
      text: "Best Seller",
      type: "bestseller"
    }
  },
  {
    id: 2,
    title: "Dog Sledding Adventure",
    description: "Experience the thrill of mushing your own team of huskies through the stunning Arctic wilderness.",
    price: 1895,
    image: "https://images.unsplash.com/photo-1517507654662-23d3b959c13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Northern Lights Expedition",
    description: "Hunt for the magical Aurora Borealis with our expert guides who know the best viewing locations.",
    price: 1695,
    image: "https://images.unsplash.com/photo-1607287914173-70adb9a862e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Traditional Ice Fishing",
    description: "Learn the ancient techniques of ice fishing from our local guides and cook your catch over an open fire.",
    price: 995,
    image: "https://images.unsplash.com/photo-1606594689023-61c61cd7dc97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Traditional Sauna Experience",
    description: "Experience authentic Finnish sauna followed by an invigorating ice bath in a frozen lake.",
    price: 895,
    image: "https://images.unsplash.com/photo-1610566286375-a33f654dc875?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Arctic Survival Workshop",
    description: "Learn essential winter survival skills from our expert guides including fire making, shelter building and navigation.",
    price: 1295,
    image: "https://images.unsplash.com/photo-1517309530578-38066e4589e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tag: {
      text: "New",
      type: "new"
    }
  }
];

export function ExperiencesSection() {
  return (
    <section id="experiences" className="py-16 md:py-24 bg-midnight text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">ARCTIC ADVENTURES</h2>
          <p className="text-lg max-w-3xl mx-auto opacity-90">Choose from our signature experiences or combine them to create your perfect Arctic adventure</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="experience-card bg-white text-midnight rounded-lg overflow-hidden shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={experience.image} 
                  alt={experience.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                
                {experience.tag && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className={`inline-block ${experience.tag.type === 'bestseller' ? 'bg-fire' : 'bg-forest'} text-white text-sm px-3 py-1 rounded-full uppercase font-semibold tracking-wide`}>
                      {experience.tag.text}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-xl mb-3">{experience.title}</h3>
                <p className="mb-4 text-gray-700">{experience.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-sm text-gray-500">From</span>
                    <span className="font-bold text-xl">{experience.price.toLocaleString()} SEK</span>
                  </div>
                  <a href="#" className="inline-block bg-midnight text-white font-montserrat font-semibold py-2 px-4 rounded hover:bg-opacity-90 transition">Explore</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="custom-button inline-block font-montserrat text-base uppercase bg-fire px-8 py-4 rounded tracking-wide font-semibold hover:bg-opacity-90 transition">View All Experiences</a>
        </div>
      </div>
    </section>
  );
}
