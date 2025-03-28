import { useState } from "react";
import { PackageOption } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { 
  Plus, Minus, Snowflake, Home, Coffee, 
  ShoppingBag, Sparkles, PlaneTakeoff, 
  Calendar, User, Users, Mail, Phone 
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api, AdventureFormData } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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

// Departure airports by language
const departureAirportsByLanguage = {
  en: [
    { value: "munich", label: "Munich" },
    { value: "stuttgart", label: "Stuttgart" },
    { value: "koln", label: "Cologne/Bonn" },
    { value: "hannover", label: "Hannover" },
    { value: "stockholm", label: "Stockholm" },
    { value: "privatejet", label: "Private Jet" },
    { value: "own", label: "Own Arrival" }
  ],
  de: [
    { value: "munich", label: "München" },
    { value: "stuttgart", label: "Stuttgart" },
    { value: "koln", label: "Köln/Bonn" },
    { value: "hannover", label: "Hannover" },
    { value: "stockholm", label: "Stockholm" },
    { value: "privatejet", label: "Privatjet" },
    { value: "own", label: "Eigene Anreise" }
  ],
  sv: [
    { value: "munich", label: "München" },
    { value: "stuttgart", label: "Stuttgart" },
    { value: "koln", label: "Köln/Bonn" },
    { value: "hannover", label: "Hannover" },
    { value: "stockholm", label: "Stockholm" },
    { value: "privatejet", label: "Privatjet" },
    { value: "own", label: "Egen ankomst" }
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
    requestBooking: "Request Booking",
    // Form content
    formTitle: "Complete Your Adventure Request",
    formDescription: "Please provide your details to receive a personalized quote",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone (optional)",
    startDate: "Start Date (optional)",
    endDate: "End Date (optional)",
    departureAirport: "Departure Airport",
    groupSize: "Group Size",
    additionalRequests: "Additional Requests (optional)",
    submit: "Submit Request",
    cancel: "Cancel",
    selectDeparture: "Select departure",
    success: "Adventure request submitted successfully! We'll contact you shortly.",
    error: "There was an error submitting your request. Please try again."
  },
  de: {
    title: "GESTALTE DEIN ABENTEUER",
    subtitle: "Erstelle dein perfektes arktisches Erlebnis, indem du die Elemente auswählst, die dir am wichtigsten sind",
    coreExperience: "1. Wähle dein Kernerlebnis",
    accommodations: "2. Unterkunft hinzufügen",
    addOns: "3. Zusatzoptionen auswählen",
    perNight: "SEK/Nacht",
    estimatedTotal: "Geschätzte Gesamtsumme",
    requestBooking: "Buchung anfragen",
    // Form content
    formTitle: "Vervollständige deine Abenteueranfrage",
    formDescription: "Bitte gib deine Daten an, um ein personalisiertes Angebot zu erhalten",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefon (optional)",
    startDate: "Startdatum (optional)",
    endDate: "Enddatum (optional)",
    departureAirport: "Abflughafen",
    groupSize: "Gruppengröße",
    additionalRequests: "Zusätzliche Wünsche (optional)",
    submit: "Anfrage senden",
    cancel: "Abbrechen",
    selectDeparture: "Abflughafen wählen",
    success: "Abenteueranfrage erfolgreich übermittelt! Wir werden uns in Kürze bei dir melden.",
    error: "Bei der Übermittlung deiner Anfrage ist ein Fehler aufgetreten. Bitte versuche es erneut."
  },
  sv: {
    title: "SKAPA DITT ÄVENTYR",
    subtitle: "Skapa din perfekta arktiska upplevelse genom att välja de element som betyder mest för dig",
    coreExperience: "1. Välj din kärnupplevelse",
    accommodations: "2. Lägg till boende",
    addOns: "3. Välj tillägg",
    perNight: "SEK/natt",
    estimatedTotal: "Beräknad totalsumma",
    requestBooking: "Begär bokning",
    // Form content
    formTitle: "Slutför din äventyrsförfrågan",
    formDescription: "Vänligen ange dina uppgifter för att få en personlig offert",
    firstName: "Förnamn",
    lastName: "Efternamn",
    email: "E-post",
    phone: "Telefon (valfritt)",
    startDate: "Startdatum (valfritt)",
    endDate: "Slutdatum (valfritt)",
    departureAirport: "Avgångsflygplats",
    groupSize: "Gruppstorlek",
    additionalRequests: "Ytterligare önskemål (valfritt)",
    submit: "Skicka förfrågan",
    cancel: "Avbryt",
    selectDeparture: "Välj avgång",
    success: "Äventyrsförfrågan har skickats! Vi kontaktar dig inom kort.",
    error: "Det uppstod ett fel när din förfrågan skulle skickas. Försök igen."
  }
};

export function PackageBuilder() {
  const { language } = useLanguage();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    departureAirport: "",
    groupSize: 1,
    additionalRequests: ""
  });
  const { toast } = useToast();
  
  // Get content and package options based on the current language
  const content = contentByLanguage[language];
  const packageOptions: PackageOption[] = packageOptionsByLanguage[language];
  const departureOptions = departureAirportsByLanguage[language];

  // Adventure form submission mutation
  const adventureMutation = useMutation({
    mutationFn: (data: AdventureFormData) => api.submitAdventureForm(data),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: content.success,
        duration: 5000,
      });
      setIsDialogOpen(false);
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        startDate: "",
        endDate: "",
        departureAirport: "",
        groupSize: 1,
        additionalRequests: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: content.error,
        variant: "destructive",
        duration: 5000,
      });
      console.error("Adventure submission error:", error);
    }
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setFormData(prev => ({ ...prev, [name]: numValue }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare selected options by category
    const selectedPackages = packageOptions
      .filter(opt => selectedOptions.includes(opt.id) && opt.category === 'core')
      .map(opt => opt.id);
    
    const selectedAccommodations = packageOptions
      .filter(opt => selectedOptions.includes(opt.id) && opt.category === 'accommodation')
      .map(opt => opt.id);
    
    const selectedActivities = packageOptions
      .filter(opt => selectedOptions.includes(opt.id) && opt.category === 'addon')
      .map(opt => opt.id);
    
    // Submit the adventure form data
    adventureMutation.mutate({
      ...formData,
      selectedPackages,
      selectedAccommodations,
      selectedActivities,
      preferredLanguage: language
    });
  };

  // Get icon for category
  const getCategoryIcon = (category: string, selected: boolean = false) => {
    const iconSize = 18;
    const className = selected ? "text-accent-color" : "text-white/70";
    
    switch(category) {
      case 'core':
        return <Snowflake size={iconSize} className={className} />;
      case 'accommodation':
        return <Home size={iconSize} className={className} />;
      case 'addon':
        return <Coffee size={iconSize} className={className} />;
      default:
        return <Sparkles size={iconSize} className={className} />;
    }
  };

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

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : language === 'de' ? 'de-DE' : 'sv-SE').format(price);
  };

  return (
    <section id="package-builder" className="py-24 md:py-32 relative">
      {/* Background with diagonal gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-card-bg/40 to-dark-bg opacity-95 z-0"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')]  opacity-60 z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Logo with "Build Your Adventure" text */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="relative w-28 h-28 mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-accent-color/30 to-accent-color/10 rounded-full blur-xl opacity-70"></div>
            <img 
              src="./attached_assets/170804_Logo-TripleX_final.png" 
              alt="Triple X Adventures" 
              className="w-full h-full object-contain relative z-10"
            />
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-text">{content.title}</h2>
            <p className="text-lg max-w-2xl mx-auto text-secondary-text leading-relaxed">{content.subtitle}</p>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="glass-card bg-card-bg/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            {/* Steps section */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {[
                { title: content.coreExperience, icon: <Snowflake size={24} className="text-accent-color" /> },
                { title: content.accommodations, icon: <Home size={24} className="text-accent-color" /> },
                { title: content.addOns, icon: <Coffee size={24} className="text-accent-color" /> }
              ].map((step, index) => (
                <div key={index} className="p-6 bg-gradient-to-b from-card-bg/80 to-card-bg/20 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-card-bg border border-white/10 flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-lg text-primary-text">{step.title}</h3>
                </div>
              ))}
            </div>
            
            <div className="p-8 md:p-10">
              {/* Core Experiences */}
              <div className="mb-12">
                <div className="mb-6">
                  <h3 className="font-bold text-2xl mb-2 text-primary-text">
                    {content.coreExperience}
                  </h3>
                  <div className="w-20 h-1 bg-accent-color rounded-full opacity-80"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packageOptions.filter(opt => opt.category === 'core').map(option => (
                    <div 
                      key={option.id}
                      className={`group relative cursor-pointer transition-all duration-300`}
                      onClick={() => toggleOption(option.id)}
                    >
                      {/* Option background glow on hover/selected */}
                      <div className={`absolute -inset-1 rounded-xl bg-accent-color/20 blur-md 
                        ${isSelected(option.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} 
                        transition-opacity duration-300`}
                      ></div>
                      
                      <div className={`relative z-10 card p-5 border group-hover:border-accent-color/40
                        ${isSelected(option.id) 
                          ? 'bg-card-bg border-accent-color/50' 
                          : 'bg-card-bg/50 border-white/5'}`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className={`font-bold ${isSelected(option.id) ? 'text-accent-color' : 'text-primary-text group-hover:text-accent-color'} transition-colors`}>
                            {option.title}
                          </h4>
                          <div className={`flex items-center justify-center h-7 w-7 rounded-full
                            ${isSelected(option.id) 
                              ? 'bg-accent-color text-black' 
                              : 'bg-card-bg border border-white/20 text-white/50'}`}
                          >
                            {isSelected(option.id) ? <Minus size={16} /> : <Plus size={16} />}
                          </div>
                        </div>
                        
                        <p className="text-sm text-secondary-text mb-4 line-clamp-2">{option.description}</p>
                        
                        <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                          <div className="text-accent-color font-bold">
                            {formatPrice(option.price)} <span className="text-xs font-normal">SEK</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon('core', isSelected(option.id))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Accommodations */}
              <div className="mb-12">
                <div className="mb-6">
                  <h3 className="font-bold text-2xl mb-2 text-primary-text">
                    {content.accommodations}
                  </h3>
                  <div className="w-20 h-1 bg-accent-color rounded-full opacity-80"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packageOptions.filter(opt => opt.category === 'accommodation').map(option => (
                    <div 
                      key={option.id}
                      className="group relative cursor-pointer transition-all duration-300"
                      onClick={() => toggleOption(option.id)}
                    >
                      {/* Option background glow on hover/selected */}
                      <div className={`absolute -inset-1 rounded-xl bg-accent-color/20 blur-md 
                        ${isSelected(option.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} 
                        transition-opacity duration-300`}
                      ></div>
                      
                      <div className={`relative z-10 card p-5 border group-hover:border-accent-color/40
                        ${isSelected(option.id) 
                          ? 'bg-card-bg border-accent-color/50' 
                          : 'bg-card-bg/50 border-white/5'}`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className={`font-bold ${isSelected(option.id) ? 'text-accent-color' : 'text-primary-text group-hover:text-accent-color'} transition-colors`}>
                            {option.title}
                          </h4>
                          <div className={`flex items-center justify-center h-7 w-7 rounded-full
                            ${isSelected(option.id) 
                              ? 'bg-accent-color text-black' 
                              : 'bg-card-bg border border-white/20 text-white/50'}`}
                          >
                            {isSelected(option.id) ? <Minus size={16} /> : <Plus size={16} />}
                          </div>
                        </div>
                        
                        <p className="text-sm text-secondary-text mb-4">{option.description}</p>
                        
                        <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                          <div className="text-accent-color font-bold">
                            {formatPrice(option.price)} <span className="text-xs font-normal">{content.perNight}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon('accommodation', isSelected(option.id))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Addons */}
              <div className="mb-8">
                <div className="mb-6">
                  <h3 className="font-bold text-2xl mb-2 text-primary-text">
                    {content.addOns}
                  </h3>
                  <div className="w-20 h-1 bg-accent-color rounded-full opacity-80"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packageOptions.filter(opt => opt.category === 'addon').map(option => (
                    <div 
                      key={option.id}
                      className="group relative cursor-pointer transition-all duration-300"
                      onClick={() => toggleOption(option.id)}
                    >
                      {/* Option background glow on hover/selected */}
                      <div className={`absolute -inset-1 rounded-xl bg-accent-color/20 blur-md 
                        ${isSelected(option.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} 
                        transition-opacity duration-300`}
                      ></div>
                      
                      <div className={`relative z-10 card p-5 border group-hover:border-accent-color/40
                        ${isSelected(option.id) 
                          ? 'bg-card-bg border-accent-color/50' 
                          : 'bg-card-bg/50 border-white/5'}`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className={`font-bold ${isSelected(option.id) ? 'text-accent-color' : 'text-primary-text group-hover:text-accent-color'} transition-colors`}>
                            {option.title}
                          </h4>
                          <div className={`flex items-center justify-center h-7 w-7 rounded-full
                            ${isSelected(option.id) 
                              ? 'bg-accent-color text-black' 
                              : 'bg-card-bg border border-white/20 text-white/50'}`}
                          >
                            {isSelected(option.id) ? <Minus size={16} /> : <Plus size={16} />}
                          </div>
                        </div>
                        
                        <p className="text-sm text-secondary-text mb-4 line-clamp-2">{option.description}</p>
                        
                        <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                          <div className="text-accent-color font-bold">
                            {formatPrice(option.price)} <span className="text-xs font-normal">SEK</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon('addon', isSelected(option.id))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Summary section */}
              <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left mb-6 sm:mb-0">
                  <span className="block text-secondary-text mb-1">{content.estimatedTotal}</span>
                  <span className="font-bold text-3xl text-primary-text">
                    {formatPrice(total)} <span className="text-accent-color">SEK</span>
                  </span>
                </div>
                
                <button 
                  onClick={() => setIsDialogOpen(true)}
                  className="group relative rounded-lg overflow-hidden"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 group-hover:bg-accent-color/20 transition-colors duration-300"></div>
                  
                  <div className="relative bg-accent-color hover:brightness-110 text-black font-bold py-4 px-8 flex items-center space-x-2 transition-all duration-300 group-hover:shadow-lg">
                    <ShoppingBag size={20} />
                    <span>{content.requestBooking}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adventure Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] bg-card-bg border-white/10 text-primary-text">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary-text">
              {content.formTitle}
            </DialogTitle>
            <DialogDescription className="text-secondary-text">
              {content.formDescription}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-primary-text">
                  <User size={16} className="inline mr-2 text-accent-color" />
                  {content.firstName}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="bg-card-bg/50 border-white/10"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-primary-text">
                  <User size={16} className="inline mr-2 text-accent-color" />
                  {content.lastName}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="bg-card-bg/50 border-white/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-text">
                  <Mail size={16} className="inline mr-2 text-accent-color" />
                  {content.email}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-card-bg/50 border-white/10"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-primary-text">
                  <Phone size={16} className="inline mr-2 text-accent-color" />
                  {content.phone}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-card-bg/50 border-white/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-primary-text">
                  <Calendar size={16} className="inline mr-2 text-accent-color" />
                  {content.startDate}
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="bg-card-bg/50 border-white/10"
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-primary-text">
                  <Calendar size={16} className="inline mr-2 text-accent-color" />
                  {content.endDate}
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="bg-card-bg/50 border-white/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Departure Airport */}
              <div className="space-y-2">
                <Label htmlFor="departureAirport" className="text-primary-text">
                  <PlaneTakeoff size={16} className="inline mr-2 text-accent-color" />
                  {content.departureAirport}
                </Label>
                <Select 
                  value={formData.departureAirport} 
                  onValueChange={(value) => handleSelectChange('departureAirport', value)}
                  required
                >
                  <SelectTrigger className="bg-card-bg/50 border-white/10">
                    <SelectValue placeholder={content.selectDeparture} />
                  </SelectTrigger>
                  <SelectContent className="bg-card-bg border-white/10">
                    {departureOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Group Size */}
              <div className="space-y-2">
                <Label htmlFor="groupSize" className="text-primary-text">
                  <Users size={16} className="inline mr-2 text-accent-color" />
                  {content.groupSize}
                </Label>
                <Input
                  id="groupSize"
                  name="groupSize"
                  type="number"
                  value={formData.groupSize}
                  onChange={handleNumberChange}
                  min="1"
                  required
                  className="bg-card-bg/50 border-white/10"
                />
              </div>
            </div>

            {/* Additional Requests */}
            <div className="space-y-2">
              <Label htmlFor="additionalRequests" className="text-primary-text">
                <Coffee size={16} className="inline mr-2 text-accent-color" />
                {content.additionalRequests}
              </Label>
              <Textarea
                id="additionalRequests"
                name="additionalRequests"
                value={formData.additionalRequests}
                onChange={handleInputChange}
                className="bg-card-bg/50 border-white/10"
                rows={3}
              />
            </div>

            <DialogFooter className="mt-8">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="border-white/10 hover:bg-card-bg/80"
              >
                {content.cancel}
              </Button>
              <Button 
                type="submit" 
                className="bg-accent-color hover:brightness-110 text-black"
                disabled={adventureMutation.isPending}
              >
                {adventureMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                    {content.submit}
                  </div>
                ) : content.submit}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}