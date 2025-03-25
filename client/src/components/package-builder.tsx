import { useState } from "react";
import { PackageOption } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

// Package option data by language
const packageOptionsByLanguage = {
  en: [
    {
      id: "snowmobile",
      title: "Snowmobile Adventure",
      price: 2495,
      description: "Half-day snowmobile safari through forests and across frozen lakes",
      category: "core" as const
    },
    {
      id: "dogsledding",
      title: "Dog Sledding",
      price: 1895,
      description: "Guide your own husky team through the winter wonderland",
      category: "core" as const
    },
    {
      id: "northernlights",
      title: "Northern Lights",
      price: 1695,
      description: "Evening expedition to hunt for the magical Aurora Borealis",
      category: "core" as const
    },
    {
      id: "txachalet",
      title: "TXA Chalet",
      price: 3995,
      description: "Exclusive chalet with private sauna and panoramic views",
      category: "accommodation" as const
    },
    {
      id: "partnerhotel",
      title: "Partner Hotel",
      price: 1495,
      description: "Comfortable hotel in Arvidsjaur with all amenities",
      category: "accommodation" as const
    },
    {
      id: "sauna",
      title: "Traditional Sauna",
      price: 895,
      description: "Authentic Finnish sauna experience with ice bath",
      category: "addon" as const
    },
    {
      id: "dinner",
      title: "Wilderness Dinner",
      price: 995,
      description: "Gourmet dinner experience at JayJay's Restaurant",
      category: "addon" as const
    },
    {
      id: "photography",
      title: "Photography Package",
      price: 695,
      description: "Professional photos of your adventure",
      category: "addon" as const
    }
  ],
  de: [
    {
      id: "snowmobile",
      title: "Schneemobil-Abenteuer",
      price: 2495,
      description: "Halbtägige Schneemobilsafari durch Wälder und über gefrorene Seen",
      category: "core" as const
    },
    {
      id: "dogsledding",
      title: "Hundeschlittenfahrt",
      price: 1895,
      description: "Führen Sie Ihr eigenes Husky-Team durch das Winterwunderland",
      category: "core" as const
    },
    {
      id: "northernlights",
      title: "Nordlichter",
      price: 1695,
      description: "Abendliche Expedition zur Jagd nach der magischen Aurora Borealis",
      category: "core" as const
    },
    {
      id: "txachalet",
      title: "TXA-Chalet",
      price: 3995,
      description: "Exklusives Chalet mit privater Sauna und Panoramablick",
      category: "accommodation" as const
    },
    {
      id: "partnerhotel",
      title: "Partnerhotel",
      price: 1495,
      description: "Komfortables Hotel in Arvidsjaur mit allen Annehmlichkeiten",
      category: "accommodation" as const
    },
    {
      id: "sauna",
      title: "Traditionelle Sauna",
      price: 895,
      description: "Authentisches finnisches Saunaerlebnis mit Eisbad",
      category: "addon" as const
    },
    {
      id: "dinner",
      title: "Wildnis-Dinner",
      price: 995,
      description: "Gourmet-Dinner-Erlebnis im JayJay's Restaurant",
      category: "addon" as const
    },
    {
      id: "photography",
      title: "Fotografie-Paket",
      price: 695,
      description: "Professionelle Fotos Ihres Abenteuers",
      category: "addon" as const
    }
  ],
  sv: [
    {
      id: "snowmobile",
      title: "Snöskotersafari",
      price: 2495,
      description: "Halvdags snöskotersafari genom skogar och över frusna sjöar",
      category: "core" as const
    },
    {
      id: "dogsledding",
      title: "Hundspann",
      price: 1895,
      description: "Styr ditt eget husky-team genom vinterlandskapet",
      category: "core" as const
    },
    {
      id: "northernlights",
      title: "Norrsken",
      price: 1695,
      description: "Kvällsexpedition för att jaga det magiska norrskenet",
      category: "core" as const
    },
    {
      id: "txachalet",
      title: "TXA-Chalet",
      price: 3995,
      description: "Exklusiv stuga med privat bastu och panoramautsikt",
      category: "accommodation" as const
    },
    {
      id: "partnerhotel",
      title: "Partnerhotell",
      price: 1495,
      description: "Bekvämt hotell i Arvidsjaur med alla bekvämligheter",
      category: "accommodation" as const
    },
    {
      id: "sauna",
      title: "Traditionell Bastu",
      price: 895,
      description: "Autentisk finsk bastuupplevelse med isbad",
      category: "addon" as const
    },
    {
      id: "dinner",
      title: "Vildmarksmiddag",
      price: 995,
      description: "Gourmetmiddagsupplevelse på JayJay's Restaurant",
      category: "addon" as const
    },
    {
      id: "photography",
      title: "Fotograferingspaket",
      price: 695,
      description: "Professionella foton av ditt äventyr",
      category: "addon" as const
    }
  ]
};

// Section content by language
const contentByLanguage = {
  en: {
    title: "BUILD YOUR ADVENTURE",
    subtitle: "Create your perfect Arctic experience by selecting the elements that matter most to you",
    coreExperience: "1. Choose Your Core Experience",
    accommodations: "2. Add Accommodations",
    addOns: "3. Select Add-Ons",
    perNight: "SEK/night",
    estimatedTotal: "Estimated Total",
    requestBooking: "Request Booking"
  },
  de: {
    title: "GESTALTEN SIE IHR ABENTEUER",
    subtitle: "Erstellen Sie Ihr perfektes arktisches Erlebnis, indem Sie die Elemente auswählen, die Ihnen am wichtigsten sind",
    coreExperience: "1. Wählen Sie Ihr Kernerlebnis",
    accommodations: "2. Unterkunft hinzufügen",
    addOns: "3. Zusatzoptionen auswählen",
    perNight: "SEK/Nacht",
    estimatedTotal: "Geschätzte Gesamtsumme",
    requestBooking: "Buchung anfragen"
  },
  sv: {
    title: "SKAPA DITT ÄVENTYR",
    subtitle: "Skapa din perfekta arktiska upplevelse genom att välja de element som betyder mest för dig",
    coreExperience: "1. Välj din kärnupplevelse",
    accommodations: "2. Lägg till boende",
    addOns: "3. Välj tillägg",
    perNight: "SEK/natt",
    estimatedTotal: "Beräknad totalsumma",
    requestBooking: "Begär bokning"
  }
};

export function PackageBuilder() {
  const { language } = useLanguage();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  
  // Get content and package options based on the current language
  const content = contentByLanguage[language];
  const packageOptions: PackageOption[] = packageOptionsByLanguage[language];

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
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">{content.title}</h2>
            <p className="text-lg opacity-90">{content.subtitle}</p>
          </div>
          
          <div className="bg-white text-midnight rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="mb-8">
                <h3 className="font-montserrat font-bold text-xl mb-4">{content.coreExperience}</h3>
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
                <h3 className="font-montserrat font-bold text-xl mb-4">{content.accommodations}</h3>
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
                        <span className="bg-forest text-white text-xs px-2 py-1 rounded">{option.price.toLocaleString()} {content.perNight}</span>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-montserrat font-bold text-xl mb-4">{content.addOns}</h3>
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
                  <span className="block text-gray-500 mb-1">{content.estimatedTotal}</span>
                  <span className="font-bold text-2xl">{total.toLocaleString()} SEK</span>
                </div>
                <a href="#contact" className="inline-block bg-fire text-white font-montserrat font-semibold py-3 px-6 rounded hover:bg-opacity-90 transition">
                  {content.requestBooking}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
