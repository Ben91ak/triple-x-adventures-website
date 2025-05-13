import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Send } from "lucide-react";

// Custom CSS for equal-sized containers
const equalHeightContainerStyle: React.CSSProperties = {
  height: '600px',
};

// Custom CSS for scrollable container
const scrollableContainerStyle: React.CSSProperties = {
  height: '520px', // Adjusted to fit within the container with padding
  overflowY: 'auto',
  paddingRight: '10px',
  // Using non-standard properties with type assertion
  ...({
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
  } as React.CSSProperties),
};

export function ContactSection() {
  const { toast } = useToast();
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const { language } = useLanguage();
  const { t } = useTranslation();

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
    data.interests = [...selectedPackages, ...selectedActivities];
    mutation.mutate(data as ContactFormData);
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
      {/* Remove section-specific background to use global background only */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
            {t('contact.form.contactUsLabel')}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-white">
            {t('contact.title')}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white text-opacity-80">
            {t('contact.subtitle')}
          </p>
        </div>
        
        {/* Contact Information Section */}
        <div className="glass-card border border-white/10 rounded-xl backdrop-blur-sm mb-12 max-w-6xl mx-auto">
          <div className="p-8">
            <h3 className="font-medium text-xl mb-6 text-white text-center">{t('contact.info.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#1D1D1D] p-3 rounded-full">
                  <Phone className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-200">Phone</h4>
                  <p className="text-gray-400">+49 171 1234567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#1D1D1D] p-3 rounded-full">
                  <Mail className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-200">Email</h4>
                  <p className="text-gray-400">info@triple-x-adventures.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-4">
                <div className="bg-[#1D1D1D] p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-200">Address</h4>
                  <p className="text-gray-400">Arvidsjaur, Sweden</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form and FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto" style={{ alignItems: 'stretch' }}>
          {/* Contact Form with glass effect */}
          <div className="group relative">
            
            <div className="glass-card relative z-10 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl" style={equalHeightContainerStyle}>
              <div className="p-8">
                <h3 className="font-medium text-xl mb-6 text-white">{t('contact.formTitle')}</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">{t('contact.firstName')}</FormLabel>
                            <FormControl>
                              <Input {...field} id="firstName" name="firstName" autoComplete="given-name" className="bg-card-bg/50 border-white/10" />
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
                            <FormLabel className="text-white">{t('contact.lastName')}</FormLabel>
                            <FormControl>
                              <Input {...field} id="lastName" name="lastName" autoComplete="family-name" className="bg-card-bg/50 border-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t('contact.email')}</FormLabel>
                          <FormControl>
                            <Input {...field} id="email" name="email" type="email" autoComplete="email" className="bg-card-bg/50 border-white/10" />
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
                          <FormLabel className="text-white">{t('contact.phone')}</FormLabel>
                          <FormControl>
                            <Input {...field} id="phone" name="phone" type="tel" autoComplete="tel" className="bg-card-bg/50 border-white/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="visitDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t('contact.visitDate')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-card-bg/50 border-white/10">
                                <SelectValue placeholder={t('contact.visitDatePlaceholder')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dec-jan">{t('contact.visitDateOptions.decJan')}</SelectItem>
                              <SelectItem value="feb-mar">{t('contact.visitDateOptions.febMar')}</SelectItem>
                              <SelectItem value="apr-may">{t('contact.visitDateOptions.aprMay')}</SelectItem>
                              <SelectItem value="other">{t('contact.visitDateOptions.other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <FormLabel className="text-white">{t('contact.form.desiredPackagesLabel')}</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {packageOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={option.id} 
                              checked={selectedPackages.includes(option.id)}
                              onCheckedChange={(checked) => handlePackageChange(checked as boolean, option.id)}
                              className="border-accent-color/50 data-[state=checked]:bg-accent-color data-[state=checked]:border-accent-color"
                            />
                            <label 
                              htmlFor={option.id}
                              className="text-sm cursor-pointer text-white text-opacity-90"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <FormLabel className="text-white">{t('contact.form.desiredActivitiesLabel')}</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {activityOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={option.id} 
                              checked={selectedActivities.includes(option.id)}
                              onCheckedChange={(checked) => handleActivityChange(checked as boolean, option.id)}
                              className="border-accent-color/50 data-[state=checked]:bg-accent-color data-[state=checked]:border-accent-color"
                            />
                            <label 
                              htmlFor={option.id}
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
                          <FormLabel className="text-white">{t('contact.charterFlight') || 'Charter Flight Options'}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-card-bg/50 border-white/10">
                                <SelectValue placeholder={t('contact.charterFlightPlaceholder') || 'Select a charter flight option'} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {flightOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
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
                          <FormLabel className="text-white">{t('contact.message')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              id="message" 
                              name="message"
                              placeholder={t('contact.messagePlaceholder')}
                              className="min-h-[120px] bg-card-bg/50 border-white/10" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-accent-color hover:bg-accent-color/90 text-black font-medium"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('contact.form.sending')}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          {t('contact.form.submit')}
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="group relative">
            
            <div className="glass-card relative z-10 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl" style={equalHeightContainerStyle}>
              <div className="p-8">
                <h3 className="font-medium text-xl mb-6 text-white">{t('contact.faq.title')}</h3>
                <div style={scrollableContainerStyle} className="space-y-3">
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
      </div>
    </section>
  );
}
