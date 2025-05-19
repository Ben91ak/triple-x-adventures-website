import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { contactFormSchema } from "@shared/schema";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { ContactFormData } from "@/types/index";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Send, Loader2 } from "lucide-react";

// Custom CSS for scrollable container with green indicator
const scrollableContainerStyle: React.CSSProperties = {
  height: '400px', // Fixed height to ensure scrollability
  maxHeight: '400px',
  overflowY: 'auto',
  paddingRight: '10px',
  // Using non-standard properties with type assertion
  ...({
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(164, 210, 51, 0.7) transparent', // Green accent color (#A4D233) with transparency
  } as React.CSSProperties),
};

export function ContactSection() {
  const { toast } = useToast();
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  // Style for container
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  // Package options using translation keys
  const packageOptions = [
    { id: "arctic-adventure-week", label: t('contact.form.packages.arcticWeek') },
    { id: "arctic-adventure-weekend", label: t('contact.form.packages.arcticWeekend') },
    { id: "sideways-adventure-week", label: t('contact.form.packages.sidewaysWeek') },
    { id: "sideways-adventure-weekend", label: t('contact.form.packages.sidewaysWeekend') },
    { id: "performance-package-week", label: t('contact.form.packages.performanceWeek') },
    { id: "performance-package-weekend", label: t('contact.form.packages.performanceWeekend') },
    { id: "incentive-events", label: t('contact.form.packages.incentive') },
    { id: "customized-events", label: t('contact.form.packages.custom') },
  ];
  
  // Activity options using translation keys
  const activityOptions = [
    { id: "snowmobile-tour", label: t('contact.form.activities.snowmobile') },
    { id: "reindeer-visit", label: t('contact.form.activities.reindeer') },
    { id: "snowshoe-hike", label: t('contact.form.activities.snowshoe') },
    { id: "arctic-spa", label: t('contact.form.activities.spa') },
    { id: "restaurant", label: t('contact.form.activities.restaurant') },
    { id: "helicopter-flight", label: t('contact.form.activities.helicopter') },
    { id: "northern-lights", label: t('contact.form.activities.aurora') },
  ];

  // Charter flight options
  const flightOptions = [
    { value: "none", label: t('contact.form.flight.none') || "No charter flight needed" },
    { value: "stuttgart", label: "Stuttgart" },
    { value: "munich", label: "Munich" },
    { value: "cologne-bonn", label: "Cologne/Bonn" },
    { value: "hannover", label: "Hannover" },
    { value: "stockholm", label: "Stockholm" },
    { value: "private-jet", label: t('contact.form.flight.privateJet') || "Private Jet" },
  ];

  // Set up form with zod validation
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      visitDate: "",
      interests: [],
      charterFlight: "",
      message: "",
    },
  });

  // Set up mutation for form submission
  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return api.submitContactForm(data);
    },
    onSuccess: () => {
      toast({
        title: t('contact.successTitle'),
        description: t('contact.successMessage'),
        variant: "default",
      });
      form.reset();
      setSelectedPackages([]);
      setSelectedActivities([]);
    },
    onError: (error) => {
      toast({
        title: t('contact.errorTitle'),
        description: t('contact.errorMessage'),
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    // Map package and activity selections to their labels
    const packageLabels = selectedPackages.map(id => {
      const option = packageOptions.find(opt => opt.id === id);
      return option ? option.label : id;
    });
    
    const activityLabels = selectedActivities.map(id => {
      const option = activityOptions.find(opt => opt.id === id);
      return option ? option.label : id;
    });
    
    // Combine all interests into a single array
    const allInterests = [...packageLabels, ...activityLabels];
    
    // Create the form data with the interests field populated
    const formData = { 
      ...data, 
      interests: allInterests.length > 0 ? allInterests : undefined 
    };
    
    mutation.mutate(formData as ContactFormData);
  };

  // Handle package checkbox changes
  const handlePackageChange = (checked: boolean, value: string) => {
    if (checked) {
      setSelectedPackages(prev => [...prev, value]);
    } else {
      setSelectedPackages(prev => prev.filter(item => item !== value));
    }
  };

  // Handle activity checkbox changes
  const handleActivityChange = (checked: boolean, value: string) => {
    if (checked) {
      setSelectedActivities(prev => [...prev, value]);
    } else {
      setSelectedActivities(prev => prev.filter(item => item !== value));
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Title and Contact Information */}
        <div className="text-center mb-10">
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-white">
            {t('contact.title')}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white text-opacity-80 mb-8">
            {t('contact.subtitle')}
          </p>
          
          {/* Contact Information Cards */}
          <div className="glass-card border border-white/10 rounded-xl backdrop-blur-sm mb-12 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1A1D1F] p-3 rounded-full">
                    <Phone className="w-5 h-5 text-[#A4D233]" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-white">Phone</h4>
                    <p className="text-gray-300">+46 70 357 54 55</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1A1D1F] p-3 rounded-full">
                    <Mail className="w-5 h-5 text-[#A4D233]" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-gray-300">info@triple-x-adventures.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1A1D1F] p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-[#A4D233]" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-white">Address</h4>
                    <p className="text-gray-300">Storgatan 6F, 93331 Arvidsjaur, Swedish Lapland, Sweden</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vertical layout for Contact Form and FAQ */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {/* Contact Form Section */}
          <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
            <div className="p-6" style={containerStyle}>
              <h3 className="font-medium text-xl mb-4 text-white">{t('contact.formTitle')}</h3>
              
              {/* Contact Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" autoComplete="on">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="firstName" className="text-white">{t('contact.firstName')}</FormLabel>
                          <FormControl>
                            <Input id="firstName" {...field} autoComplete="given-name" className="bg-[#1A1D1F] border border-white/10 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="lastName" className="text-white">{t('contact.lastName')}</FormLabel>
                          <FormControl>
                            <Input id="lastName" {...field} autoComplete="family-name" className="bg-[#1A1D1F] border border-white/10 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="email" className="text-white">{t('contact.email')}</FormLabel>
                          <FormControl>
                            <Input id="email" {...field} type="email" autoComplete="email" className="bg-[#1A1D1F] border border-white/10 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="phone" className="text-white">{t('contact.phone')}</FormLabel>
                          <FormControl>
                            <Input id="phone" {...field} type="tel" autoComplete="tel" className="bg-[#1A1D1F] border border-white/10 text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="visitDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="visitDate" className="text-white">{t('contact.visitDate')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger id="visitDate" name="visitDate" className="bg-[#1A1D1F] border border-white/10 text-white hover:border-[#A4D233] focus:border-[#A4D233] h-10 rounded-md">
                              <SelectValue placeholder={t('contact.visitDatePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1A1D1F] border border-white/10 rounded-md">
                            <SelectItem value="dec-jan" className="text-white hover:bg-[#A4D233]/10 focus:bg-[#A4D233]/20">{t('contact.visitDateOptions.decJan')}</SelectItem>
                            <SelectItem value="feb-mar" className="text-white hover:bg-[#A4D233]/10 focus:bg-[#A4D233]/20">{t('contact.visitDateOptions.febMar')}</SelectItem>
                            <SelectItem value="apr-may" className="text-white hover:bg-[#A4D233]/10 focus:bg-[#A4D233]/20">{t('contact.visitDateOptions.aprMay')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">{t('contact.form.desiredPackagesLabel')}</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {packageOptions.map((option) => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`package-${option.id}`}
                                  name={`package-${option.id}`}
                                  checked={selectedPackages.includes(option.id)}
                                  onCheckedChange={(checked) => handlePackageChange(checked as boolean, option.id)}
                                  className="border-[#A4D233]/50 data-[state=checked]:bg-[#A4D233] data-[state=checked]:border-[#A4D233]"
                                />
                                <label 
                                  htmlFor={`package-${option.id}`}
                                  className="text-sm cursor-pointer text-white text-opacity-90"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">{t('contact.form.desiredActivitiesLabel')}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {activityOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`activity-${option.id}`}
                            name={`activity-${option.id}`}
                            checked={selectedActivities.includes(option.id)}
                            onCheckedChange={(checked) => handleActivityChange(checked as boolean, option.id)}
                            className="border-[#A4D233]/50 data-[state=checked]:bg-[#A4D233] data-[state=checked]:border-[#A4D233]"
                          />
                          <label 
                            htmlFor={`activity-${option.id}`}
                            className="text-sm cursor-pointer text-white text-opacity-90"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="charterFlight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="charterFlight" className="text-white">{t('contact.charterFlight')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger id="charterFlight" name="charterFlight" className="bg-[#1A1D1F] border border-white/10 text-white hover:border-[#A4D233] focus:border-[#A4D233] h-10 rounded-md">
                              <SelectValue placeholder={t('contact.charterFlightPlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1A1D1F] border border-white/10 rounded-md">
                            {flightOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value} className="text-white hover:bg-[#A4D233]/10 focus:bg-[#A4D233]/20">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message" className="text-white">{t('contact.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            id="message"
                            {...field} 
                            className="bg-[#1A1D1F] border border-white/10 text-white min-h-[120px]" 
                            placeholder={t('contact.messagePlaceholder')}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full bg-[#A4D233] hover:bg-[#8FBB1C] text-white font-medium h-10 rounded-md"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('contact.send')}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="glass-card border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
            <div className="p-6" style={containerStyle}>
              <h3 className="font-medium text-xl mb-4 text-white">{t('contact.faq.title')}</h3>
              <div style={scrollableContainerStyle} className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q1')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a1')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q2')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a2')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q3')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a3')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q4')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a4')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q5')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a5')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q6')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a6')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q7')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a7')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q8')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a8')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q9')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a9')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q10')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a10')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q11')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a11')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q12')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a12')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q13')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a13')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-white">{t('contact.faq.q14')}</h4>
                  <p className="text-white text-opacity-80 text-sm leading-relaxed">{t('contact.faq.a14')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
