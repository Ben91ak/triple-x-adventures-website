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
        description: error instanceof Error ? error.message : t('contact.errorMessage'),
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    mutation.mutate({
      ...data,
      interests: [...selectedPackages, ...selectedActivities], // Combine both selections
    });
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
        <div className="text-center mb-16">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form with glass effect */}
          <div className="group relative">
            {/* Decorative background element */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-color/30 to-purple-600/30 rounded-xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-700"></div>
            
            <div className="glass-card relative z-10 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl">
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
                            <FormLabel className="text-white">{t('contact.lastName')}</FormLabel>
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
                          <FormLabel className="text-white">{t('contact.email')}</FormLabel>
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
                          <FormLabel className="text-white">{t('contact.phone')}</FormLabel>
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
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t('contact.message')}</FormLabel>
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
                      {mutation.isPending ? t('contact.sending') : t('contact.send')}
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
                {t('contact.info.title')}
              </h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mr-5 w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-white">{t('contact.info.location')}</h4>
                    <p className="text-white text-opacity-80">Storgatan 6F, 93331 Arvidsjaur, Swedish Lapland, Sweden</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-5 w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-white">{t('contact.info.phone')}</h4>
                    <p className="text-white text-opacity-80">
                      {t('contact.info.phoneText1')}
                      <br />
                      {t('contact.info.phoneText2')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-5 w-12 h-12 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-white">{t('contact.info.email')}</h4>
                    <p className="text-white text-opacity-80">{t('contact.info.emailText')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ */}
            <div className="mb-12">
              <div className="glass-card border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-medium text-xl mb-6 text-white">
                  {t('contact.faq.title')}
                </h3>
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q1')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a1')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q2')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a2')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q3')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a3')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q4')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a4')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q5')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a5')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q6')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a6')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q7')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a7')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q8')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a8')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q9')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a9')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q10')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a10')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q11')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a11')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q12')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a12')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q13')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a13')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">{t('contact.faq.q14')}</h4>
                    <p className="text-white text-opacity-80 text-sm">{t('contact.faq.a14')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="font-medium text-xl mb-6 text-white">
                {t('contact.social.title')}
              </h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors"
                >
                  <Youtube size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors"
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
