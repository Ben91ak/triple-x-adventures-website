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

// Package option data by language (unchanged from original)
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

// Departure airports by language (unchanged from original)
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

// Section content by language (unchanged from original)
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
    <section id="package-builder" className="py-24 md:py-32 relative overflow-hidden">
      {/* Using the global background - no need for section-specific background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        {/* Simple glow effect to complement global background */}
        <div className="aurora-glow absolute inset-0 opacity-30"></div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-text text-shadow-lg">{content.title}</h2>
          <p className="text-lg max-w-2xl mx-auto text-secondary-text leading-relaxed text-shadow-sm">{content.subtitle}</p>
        </div>
        
        {/* Package builder cards */}
        <div className="glass-card bg-card-bg/70 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl transform-gpu">
          
          {/* Step 1: Core Experiences */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-color/10 border border-accent-color/30">
                <Snowflake size={24} className="text-accent-color" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-text text-shadow-sm">{content.coreExperience}</h3>
              </div>
            </div>
            
            <div className="w-20 h-1 bg-accent-color rounded-full opacity-80 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {packageOptions
                .filter(option => option.category === 'core')
                .map(option => (
                  <div 
                    key={option.id}
                    className={`group relative cursor-pointer transition-all duration-300`}
                    onClick={() => toggleOption(option.id)}
                  >
                    {/* Option background glow on hover/selected - ENHANCED GLOW EFFECT */}
                    <div className={`absolute -inset-2 rounded-xl bg-accent-color/30 blur-lg 
                      ${isSelected(option.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} 
                      transition-opacity duration-300`}
                    ></div>
                    
                    <div className={`relative z-10 card p-5 border group-hover:border-accent-color/70 transition-all duration-300
                      ${isSelected(option.id) 
                        ? 'bg-card-bg/80 border-accent-color/90 shadow-[0_0_25px_rgba(129,255,0,0.30)]' 
                        : 'bg-card-bg/70 border-white/15'}`}
                    >
                      {/* Inner glow effect on selection - ENHANCED */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-accent-color/20 to-transparent rounded-xl opacity-0 transition-opacity duration-300 ${isSelected(option.id) ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
                      
                      <div className="relative z-10 flex justify-between items-start mb-4">
                        <h4 className={`font-bold text-shadow-sm ${isSelected(option.id) ? 'text-accent-color' : 'text-primary-text group-hover:text-accent-color'} transition-colors duration-300`}>
                          {option.title}
                        </h4>
                        <button 
                          className={`ml-2 w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-300 
                            ${isSelected(option.id) 
                              ? 'bg-accent-color text-black shadow-md shadow-accent-color/20' 
                              : 'bg-card-bg/80 border border-white/20 text-white/70'}`}
                        >
                          {isSelected(option.id) ? <Minus size={16} /> : <Plus size={16} />}
                        </button>
                      </div>
                      
                      <p className="relative z-10 text-sm text-secondary-text mb-4 line-clamp-2 text-shadow-sm">{option.description}</p>
                      
                      <div className="relative z-10 flex justify-between items-center">
                        <div className="text-accent-color font-bold text-shadow-sm">
                          {formatPrice(option.price)} SEK
                        </div>
                        <div>
                          {getCategoryIcon('core', isSelected(option.id))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Step 2: Accommodations */}
          <div className="p-6 md:p-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-color/10 border border-accent-color/30">
                <Home size={24} className="text-accent-color" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-text text-shadow-sm">{content.accommodations}</h3>
              </div>
            </div>
            
            <div className="w-20 h-1 bg-accent-color rounded-full opacity-80 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {packageOptions
                .filter(option => option.category === 'accommodation')
                .map(option => (
                  <div 
                    key={option.id}
                    className={`group relative cursor-pointer transition-all duration-300`}
                    onClick={() => toggleOption(option.id)}
                  >
                    {/* Option background glow on hover/selected - ENHANCED GLOW EFFECT */}
                    <div className={`absolute -inset-2 rounded-xl bg-accent-color/30 blur-lg 
                      ${isSelected(option.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} 
                      transition-opacity duration-300`}
                    ></div>
                    
                    <div className={`relative z-10 card p-5 border group-hover:border-accent-color/70 transition-all duration-300
                      ${isSelected(option.id) 
                        ? 'bg-card-bg/80 border-accent-color/90 shadow-[0_0_25px_rgba(129,255,0,0.30)]' 
                        : 'bg-card-bg/70 border-white/15'}`}
                    >
                      {/* Inner glow effect on selection - ENHANCED */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-accent-color/20 to-transparent rounded-xl opacity-0 transition-opacity duration-300 ${isSelected(option.id) ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
                      
                      <div className="relative z-10 flex justify-between items-start mb-4">
                        <h4 className={`font-bold text-shadow-sm ${isSelected(option.id) ? 'text-accent-color' : 'text-primary-text group-hover:text-accent-color'} transition-colors duration-300`}>
                          {option.title}
                        </h4>
                        <button 
                          className={`ml-2 w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-300 
                            ${isSelected(option.id) 
                              ? 'bg-accent-color text-black shadow-md shadow-accent-color/20' 
                              : 'bg-card-bg/80 border border-white/20 text-white/70'}`}
                        >
                          {isSelected(option.id) ? <Minus size={16} /> : <Plus size={16} />}
                        </button>
                      </div>
                      
                      <p className="relative z-10 text-sm text-secondary-text mb-4 text-shadow-sm">{option.description}</p>
                      
                      <div className="relative z-10 flex justify-between items-center">
                        <div className="text-accent-color font-bold text-shadow-sm">
                          {formatPrice(option.price)} {content.perNight}
                        </div>
                        <div>
                          {getCategoryIcon('accommodation', isSelected(option.id))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Step 3: Add-Ons */}
          <div className="p-6 md:p-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-color/10 border border-accent-color/30">
                <Coffee size={24} className="text-accent-color" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-text text-shadow-sm">{content.addOns}</h3>
              </div>
            </div>
            
            <div className="w-20 h-1 bg-accent-color rounded-full opacity-80 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {packageOptions
                .filter(option => option.category === 'addon')
                .map(option => (
                  <div 
                    key={option.id}
                    className={`group relative cursor-pointer transition-all duration-300`}
                    onClick={() => toggleOption(option.id)}
                  >
                    {/* Option background glow on hover/selected - ENHANCED GLOW EFFECT */}
                    <div className={`absolute -inset-2 rounded-xl bg-accent-color/30 blur-lg 
                      ${isSelected(option.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'} 
                      transition-opacity duration-300`}
                    ></div>
                    
                    <div className={`relative z-10 card p-5 border group-hover:border-accent-color/70 transition-all duration-300
                      ${isSelected(option.id) 
                        ? 'bg-card-bg/80 border-accent-color/90 shadow-[0_0_25px_rgba(129,255,0,0.30)]' 
                        : 'bg-card-bg/70 border-white/15'}`}
                    >
                      {/* Inner glow effect on selection - ENHANCED */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-accent-color/20 to-transparent rounded-xl opacity-0 transition-opacity duration-300 ${isSelected(option.id) ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
                      
                      <div className="relative z-10 flex justify-between items-start mb-4">
                        <h4 className={`font-bold text-shadow-sm ${isSelected(option.id) ? 'text-accent-color' : 'text-primary-text group-hover:text-accent-color'} transition-colors duration-300`}>
                          {option.title}
                        </h4>
                        <button 
                          className={`ml-2 w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-300 
                            ${isSelected(option.id) 
                              ? 'bg-accent-color text-black shadow-md shadow-accent-color/20' 
                              : 'bg-card-bg/80 border border-white/20 text-white/70'}`}
                        >
                          {isSelected(option.id) ? <Minus size={16} /> : <Plus size={16} />}
                        </button>
                      </div>
                      
                      <p className="relative z-10 text-sm text-secondary-text mb-4 line-clamp-2 text-shadow-sm">{option.description}</p>
                      
                      <div className="relative z-10 flex justify-between items-center">
                        <div className="text-accent-color font-bold text-shadow-sm">
                          {formatPrice(option.price)} SEK
                        </div>
                        <div>
                          {getCategoryIcon('addon', isSelected(option.id))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          {/* Booking Summary and Button */}
          <div className="p-6 md:p-8 bg-card-bg/50 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="flex flex-col items-center md:items-start">
                  <span className="block text-secondary-text mb-1 text-shadow-sm">{content.estimatedTotal}</span>
                  <span className="font-bold text-3xl text-primary-text text-shadow-lg">
                    {formatPrice(total)} SEK
                  </span>
                </div>
              </div>
              
              <div>
                <button 
                  onClick={() => setIsDialogOpen(true)}
                  disabled={selectedOptions.length === 0}
                  className="group relative transform-gpu"
                >
                  {/* Enhanced button hover glow effect */}
                  <div className="absolute -inset-1 bg-accent-color/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform-gpu will-change-opacity"></div>
                  
                  <div className="relative bg-accent-color hover:brightness-110 text-black font-bold py-4 px-8 flex items-center space-x-3 transition-colors duration-300 group-hover:shadow-lg shadow-md transform-gpu">
                    <ShoppingBag size={20} />
                    <span>{content.requestBooking}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card-bg border-white/20 text-primary-text">
          <DialogHeader>
            <DialogTitle className="text-primary-text text-2xl">{content.formTitle}</DialogTitle>
            <DialogDescription className="text-secondary-text">
              {content.formDescription}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-primary-text">{content.firstName}</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="bg-dark-bg/80 border-white/20 focus:border-accent-color/70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-primary-text">{content.lastName}</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="bg-dark-bg/80 border-white/20 focus:border-accent-color/70"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-text">{content.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-dark-bg/80 border-white/20 focus:border-accent-color/70"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary-text">{content.phone}</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-dark-bg/80 border-white/20 focus:border-accent-color/70"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-primary-text">{content.startDate}</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="bg-dark-bg/80 border-white/20 focus:border-accent-color/70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-primary-text">{content.endDate}</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="bg-dark-bg/80 border-white/20 focus:border-accent-color/70"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departureAirport" className="text-primary-text">{content.departureAirport}</Label>
                <Select 
                  value={formData.departureAirport} 
                  onValueChange={(value) => handleSelectChange('departureAirport', value)}
                >
                  <SelectTrigger className="bg-dark-bg/80 border-white/20 focus:border-accent-color/70">
                    <SelectValue placeholder={content.selectDeparture} />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-bg border-white/20">
                    {departureOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupSize" className="text-primary-text">{content.groupSize}</Label>
                <Input
                  id="groupSize"
                  name="groupSize"
                  type="number"
                  min="1"
                  value={formData.groupSize}
                  onChange={handleNumberChange}
                  required
                  className="bg-dark-bg/80 border-white/20 focus:border-accent-color/70"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalRequests" className="text-primary-text">{content.additionalRequests}</Label>
              <Textarea
                id="additionalRequests"
                name="additionalRequests"
                value={formData.additionalRequests}
                onChange={handleInputChange}
                className="bg-dark-bg/80 border-white/20 focus:border-accent-color/70 min-h-[100px]"
              />
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-white/20 hover:bg-card-bg/50 hover:text-primary-text"
              >
                {content.cancel}
              </Button>
              <Button 
                type="submit"
                className="bg-accent-color hover:bg-accent-color/90 text-black"
                disabled={adventureMutation.isPending}
              >
                {adventureMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span> 
                    {content.submit}
                  </span>
                ) : content.submit}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}