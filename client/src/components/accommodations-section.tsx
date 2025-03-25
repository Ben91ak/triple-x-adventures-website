import { Accommodation } from "@/types";

// Accommodation data
const accommodations: Accommodation[] = [
  {
    id: 1,
    title: "TXA CHALET",
    description: "Our exclusive chalet offers a perfect blend of rustic charm and modern luxury. With panoramic views of the Arctic landscape, a private sauna, and premium amenities, it's the ideal base for your adventure.",
    pricePerNight: 3995,
    image: "https://images.unsplash.com/photo-1517600585934-41e19605986d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      { icon: "fas fa-user-group", text: "Up to 8 guests" },
      { icon: "fas fa-bed", text: "4 bedrooms" },
      { icon: "fas fa-hot-tub", text: "Private sauna" },
      { icon: "fas fa-utensils", text: "Full kitchen" }
    ]
  },
  {
    id: 2,
    title: "PARTNER HOTELS",
    description: "We've partnered with the finest accommodations in Arvidsjaur to offer you comfortable stays before and after your adventures. From boutique hotels to traditional lodges, we ensure your entire experience is premium.",
    pricePerNight: 1495,
    image: "https://images.unsplash.com/photo-1505692795793-20f543407193?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      { icon: "fas fa-location-dot", text: "Central locations" },
      { icon: "fas fa-snowflake", text: "Arctic ambiance" },
      { icon: "fas fa-shuttle-van", text: "Transfer included" },
      { icon: "fas fa-concierge-bell", text: "Concierge service" }
    ]
  }
];

export function AccommodationsSection() {
  return (
    <section id="stay" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-midnight">STAY WITH US</h2>
          <p className="text-lg max-w-3xl mx-auto text-slate">Premium accommodations that blend wilderness charm with modern comfort</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="bg-ice rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-96">
                <img 
                  src={accommodation.image} 
                  alt={`${accommodation.title} exterior`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="font-montserrat font-bold text-2xl mb-3 text-midnight">{accommodation.title}</h3>
                <p className="mb-4 text-slate">{accommodation.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {accommodation.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <i className={`${feature.icon} text-fire mr-3`}></i>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-sm text-gray-500">From</span>
                    <span className="font-bold text-2xl text-midnight">{accommodation.pricePerNight.toLocaleString()} SEK</span>
                    <span className="text-gray-500">/night</span>
                  </div>
                  <a href="#" className="inline-block bg-fire text-white font-montserrat font-semibold py-3 px-6 rounded hover:bg-opacity-90 transition">
                    {accommodation.id === 1 ? "Check Availability" : "View Options"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
