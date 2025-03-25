import { Accommodation } from "@/types";

// Accommodation data
const accommodations: Accommodation[] = [
  {
    id: 1,
    title: "TXA - CHALET",
    description: "Übernachte im eigenen TXA - Chalet und erlebe ein Höchstmaß an Komfort. Unser exklusives Chalet bietet eine perfekte Mischung aus rustikalem Charme und modernem Luxus.",
    pricePerNight: 3995,
    image: "https://images.unsplash.com/photo-1517600585934-41e19605986d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      { icon: "fas fa-user-group", text: "Bis zu 8 Gäste" },
      { icon: "fas fa-bed", text: "4 Schlafzimmer" },
      { icon: "fas fa-hot-tub", text: "Private Sauna" },
      { icon: "fas fa-utensils", text: "Voll ausgestattete Küche" }
    ]
  },
  {
    id: 2,
    title: "HOTEL LAPONIA",
    description: "Eine komfortable Alternative zu unserem TXA Chalet. Das Hotel Laponia bietet Ihnen einen angenehmen Aufenthalt vor und nach Ihren Abenteuern, mit allen Annehmlichkeiten, die Sie benötigen.",
    pricePerNight: 1495,
    image: "https://images.unsplash.com/photo-1505692795793-20f543407193?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      { icon: "fas fa-location-dot", text: "Zentrale Lage" },
      { icon: "fas fa-snowflake", text: "Arktisches Ambiente" },
      { icon: "fas fa-shuttle-van", text: "Transfer inklusive" },
      { icon: "fas fa-concierge-bell", text: "Concierge-Service" }
    ]
  }
];

export function AccommodationsSection() {
  return (
    <section id="stay" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-midnight">UNTERKÜNFTE</h2>
          <p className="text-lg max-w-3xl mx-auto text-slate">Premium-Unterkünfte, die den Charme der Wildnis mit modernem Komfort verbinden</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="bg-ice rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
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
                      <i className={`${feature.icon} text-green-600 mr-3`}></i>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-sm text-gray-500">Ab</span>
                    <span className="font-bold text-2xl text-midnight">{accommodation.pricePerNight.toLocaleString()} SEK</span>
                    <span className="text-gray-500">/Nacht</span>
                  </div>
                  <a href="#contact" className="inline-block bg-green-600 text-white font-montserrat font-semibold py-3 px-6 rounded hover:bg-green-700 transition">
                    {accommodation.id === 1 ? "Verfügbarkeit prüfen" : "Optionen anzeigen"}
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
