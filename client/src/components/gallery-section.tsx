import { GalleryImage } from "@/types";

// Gallery data
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1518453047662-8a8d3ffb8c8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    alt: "Northern lights over snowy landscape"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    alt: "Snowmobiling through forest"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1517507654662-23d3b959c13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    alt: "Dog sledding team"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    alt: "Winter cabin in snow"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    alt: "Cozy fireplace"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1628105541664-ae6ee9dec166?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    alt: "Arctic landscape"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1609081214573-e409272dcd51?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    alt: "Traditional food"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1522775417749-4471cce3631b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    alt: "Husky dogs"
  }
];

export function GallerySection() {
  return (
    <section className="py-16 md:py-24 bg-midnight">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-white">ARCTIC MOMENTS</h2>
          <p className="text-lg max-w-3xl mx-auto text-white opacity-90">Glimpses of the adventures that await you in Swedish Lapland</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="gallery-item overflow-hidden rounded-lg">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="inline-block text-ice font-montserrat font-semibold py-2 border-b-2 border-fire hover:text-fire transition">View Full Gallery</a>
        </div>
      </div>
    </section>
  );
}
