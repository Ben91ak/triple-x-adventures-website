import { useState } from "react";
import { PackageOption } from "@/types";

// Package option data
const packageOptions: PackageOption[] = [
  {
    id: "snowmobile",
    title: "Snowmobile Adventure",
    price: 2495,
    description: "Half-day snowmobile safari through forests and across frozen lakes",
    category: "core"
  },
  {
    id: "dogsledding",
    title: "Dog Sledding",
    price: 1895,
    description: "Guide your own husky team through the winter wonderland",
    category: "core"
  },
  {
    id: "northernlights",
    title: "Northern Lights",
    price: 1695,
    description: "Evening expedition to hunt for the magical Aurora Borealis",
    category: "core"
  },
  {
    id: "txachalet",
    title: "TXA Chalet",
    price: 3995,
    description: "Exclusive chalet with private sauna and panoramic views",
    category: "accommodation"
  },
  {
    id: "partnerhotel",
    title: "Partner Hotel",
    price: 1495,
    description: "Comfortable hotel in Arvidsjaur with all amenities",
    category: "accommodation"
  },
  {
    id: "sauna",
    title: "Traditional Sauna",
    price: 895,
    description: "Authentic Finnish sauna experience with ice bath",
    category: "addon"
  },
  {
    id: "dinner",
    title: "Wilderness Dinner",
    price: 995,
    description: "Gourmet dinner experience at JayJay's Restaurant",
    category: "addon"
  },
  {
    id: "photography",
    title: "Photography Package",
    price: 695,
    description: "Professional photos of your adventure",
    category: "addon"
  }
];

export function PackageBuilder() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  const toggleOption = (optionId: string) => {
    // Find the option
    const option = packageOptions.find(opt => opt.id === optionId);
    if (!option) return;

    // Check if already selected
    if (selectedOptions.includes(optionId)) {
      // Remove from selection and subtract price
      setSelectedOptions(prev => prev.filter(id => id !== optionId));
      setTotal(prev => prev - option.price);
    } else {
      // Add to selection and add price
      setSelectedOptions(prev => [...prev, optionId]);
      setTotal(prev => prev + option.price);
    }
  };

  const isSelected = (optionId: string) => selectedOptions.includes(optionId);

  return (
    <section id="package-builder" className="py-16 md:py-24 bg-midnight text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">BUILD YOUR ADVENTURE</h2>
            <p className="text-lg opacity-90">Create your perfect Arctic experience by selecting the elements that matter most to you</p>
          </div>
          
          <div className="bg-white text-midnight rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="mb-8">
                <h3 className="font-montserrat font-bold text-xl mb-4">1. Choose Your Core Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packageOptions.filter(opt => opt.category === 'core').map(option => (
                    <div 
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        isSelected(option.id) 
                          ? 'bg-ice border-fire' 
                          : 'border-gray-200 hover:bg-ice hover:border-fire'
                      }`}
                      onClick={() => toggleOption(option.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{option.title}</span>
                        <span className="bg-fire text-white text-xs px-2 py-1 rounded">{option.price.toLocaleString()} SEK</span>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-montserrat font-bold text-xl mb-4">2. Add Accommodations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageOptions.filter(opt => opt.category === 'accommodation').map(option => (
                    <div 
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        isSelected(option.id) 
                          ? 'bg-ice border-fire' 
                          : 'border-gray-200 hover:bg-ice hover:border-fire'
                      }`}
                      onClick={() => toggleOption(option.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{option.title}</span>
                        <span className="bg-forest text-white text-xs px-2 py-1 rounded">{option.price.toLocaleString()} SEK/night</span>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-montserrat font-bold text-xl mb-4">3. Select Add-Ons</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packageOptions.filter(opt => opt.category === 'addon').map(option => (
                    <div 
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        isSelected(option.id) 
                          ? 'bg-ice border-fire' 
                          : 'border-gray-200 hover:bg-ice hover:border-fire'
                      }`}
                      onClick={() => toggleOption(option.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{option.title}</span>
                        <span className="bg-midnight text-white text-xs px-2 py-1 rounded">{option.price.toLocaleString()} SEK</span>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
                <div>
                  <span className="block text-gray-500 mb-1">Estimated Total</span>
                  <span className="font-bold text-2xl">{total.toLocaleString()} SEK</span>
                </div>
                <a href="#contact" className="inline-block bg-fire text-white font-montserrat font-semibold py-3 px-6 rounded hover:bg-opacity-90 transition">Request Booking</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
