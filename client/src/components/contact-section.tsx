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
import { ContactFormData } from "@/types";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Send } from "lucide-react";

export function ContactSection() {
  const { toast } = useToast();
  const [interests, setInterests] = useState<string[]>([]);
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Interest options with translation support
  const interestOptions = [
    { id: "snowmobile", label: language === "de" ? "Schneemobil Abenteuer" : language === "sv" ? "Snöskoter Äventyr" : "Snowmobile Adventure" },
    { id: "dogsledding", label: language === "de" ? "Husky Schlittentour" : language === "sv" ? "Hundspann Tur" : "Husky Sledding Tour" },
    { id: "northernlights", label: language === "de" ? "Polarlichter Expedition" : language === "sv" ? "Norrsken Expedition" : "Northern Lights Expedition" },
    { id: "accommodation", label: language === "de" ? "Unterkunft" : language === "sv" ? "Boende" : "Accommodation" },
    { id: "restaurant", label: language === "de" ? "Triple X Taste Restaurant" : language === "sv" ? "Triple X Taste Restaurang" : "Triple X Taste Restaurant" },
    { id: "custompackage", label: language === "de" ? "Maßgeschneidertes Paket" : language === "sv" ? "Skräddarsytt Paket" : "Custom Package" },
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
        title: t.contact.successTitle,
        description: t.contact.successMessage,
      });
      form.reset();
      setInterests([]);
    },
    onError: (error) => {
      toast({
        title: t.contact.errorTitle,
        description: error instanceof Error ? error.message : t.contact.errorMessage,
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    mutation.mutate({
      ...data,
      interests,
    });
  };

  // Handle interest checkbox changes
  const handleInterestsChange = (checked: boolean, value: string) => {
    if (checked) {
      setInterests(prev => [...prev, value]);
    } else {
      setInterests(prev => prev.filter(item => item !== value));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative premium-dark-gradient overflow-hidden">
      {/* Stars background effect */}
      <div className="stars absolute inset-0 z-1"></div>
      {/* Northern Lights animation layers */}
      <div className="northern-glow absolute inset-0 z-1"></div>
      <div className="aurora-pillar absolute z-2"></div>
      <div className="aurora-pillar-2 absolute z-2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-accent-color text-sm font-medium tracking-wider uppercase mb-2">
            {language === 'de' ? 'Kontakt' : language === 'sv' ? 'Kontakt' : 'Contact Us'}
          </span>
          <h2 className="font-bold text-3xl md:text-5xl mb-6 text-white">
            {t.contact.title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-white text-opacity-80">
            {t.contact.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form with glass effect */}
          <div className="group relative">
            {/* Decorative background element */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/30 to-purple-600/30 rounded-xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-700"></div>
            
            <div className="glass-card relative z-10 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl">
              <div className="p-8">
                <h3 className="font-medium text-xl mb-6 text-white">{t.contact.formTitle}</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">{t.contact.firstName}</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-card-bg/50 border-white/10" />
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
                            <FormLabel className="text-white">{t.contact.lastName}</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-card-bg/50 border-white/10" />
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
                          <FormLabel className="text-white">{t.contact.email}</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="bg-card-bg/50 border-white/10" />
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
                          <FormLabel className="text-white">{t.contact.phone}</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" className="bg-card-bg/50 border-white/10" />
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
                          <FormLabel className="text-primary-text">{t.contact.visitDate}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-card-bg/50 border-white/10">
                                <SelectValue placeholder={t.contact.visitDatePlaceholder} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="december-january">{t.contact.visitDateOptions.decJan}</SelectItem>
                              <SelectItem value="february-march">{t.contact.visitDateOptions.febMar}</SelectItem>
                              <SelectItem value="april-may">{t.contact.visitDateOptions.aprMay}</SelectItem>
                              <SelectItem value="other">{t.contact.visitDateOptions.other}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <FormLabel className="text-primary-text">{t.contact.interests}</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {interestOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={option.id} 
                              checked={interests.includes(option.id)}
                              onCheckedChange={(checked) => handleInterestsChange(checked as boolean, option.id)}
                              className="border-accent-color/50 data-[state=checked]:bg-accent-color data-[state=checked]:border-accent-color"
                            />
                            <label 
                              htmlFor={option.id}
                              className="text-sm cursor-pointer text-secondary-text"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary-text">{t.contact.message}</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4} 
                              {...field} 
                              className="bg-card-bg/50 border-white/10 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-accent-color hover:bg-accent-hover text-white font-medium py-3 px-6 rounded-md transition-all flex items-center justify-center gap-2"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? t.contact.sending : t.contact.send}
                      {!mutation.isPending && <Send size={16} />}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          
          {/* Right side information */}
          <div className="group">
            {/* Contact info */}
            <div className="mb-12">
              <h3 className="font-medium text-xl mb-6 text-white group-hover:text-accent-color transition-colors">
                {t.contact.info.title}
              </h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mr-5 w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-white">{t.contact.info.location}</h4>
                    <p className="text-white text-opacity-80">{t.contact.info.locationText}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-5 w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-white">{t.contact.info.phone}</h4>
                    <p className="text-white text-opacity-80">
                      {t.contact.info.phoneText1}<br />
                      {t.contact.info.phoneText2}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-5 w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-white">{t.contact.info.email}</h4>
                    <p className="text-white text-opacity-80">{t.contact.info.emailText}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ */}
            <div className="mb-12">
              <div className="glass-card border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-medium text-xl mb-6 text-white">
                  {t.contact.faq.title}
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t.contact.faq.q1}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t.contact.faq.a1}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t.contact.faq.q2}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t.contact.faq.a2}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t.contact.faq.q3}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t.contact.faq.a3}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="font-medium text-xl mb-6 text-white">
                {t.contact.social.title}
              </h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-secondary-text hover:text-accent-color hover:border-accent-color/50 transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-secondary-text hover:text-accent-color hover:border-accent-color/50 transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-secondary-text hover:text-accent-color hover:border-accent-color/50 transition-colors"
                >
                  <Youtube size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-secondary-text hover:text-accent-color hover:border-accent-color/50 transition-colors"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0 -6 0"/>
                    <path d="M12.5 8.5l-1 -1.5h-2l-1 1.5"/>
                    <path d="M17.5 6.5l-1 2l2 1c1 -1 2 -3 0 -4s-4 1 -4 3c0 .3 .3 1 1 2"/>
                    <path d="M3.5 14.5c.5 .5 1.5 -.5 2 -1.5"/>
                    <path d="M9.5 16.5l-1 1c-1 1 -2 1 -2.5 .5s0 -1.5 1 -2"/>
                    <path d="M16.5 17.5l3 -2s1 -1.5 0 -2.5s-3 1 -3.5 3s1 4 3 3"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
