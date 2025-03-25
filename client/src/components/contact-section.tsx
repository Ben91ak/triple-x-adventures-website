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
    <section id="contact" className="py-16 md:py-24 bg-midnight text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">{t.contact.title}</h2>
          <p className="text-lg max-w-3xl mx-auto opacity-90">{t.contact.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white text-midnight rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h3 className="font-montserrat font-semibold text-xl mb-6">{t.contact.formTitle}</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.firstName}</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>{t.contact.lastName}</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                        <FormLabel>{t.contact.email}</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
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
                        <FormLabel>{t.contact.phone}</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
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
                        <FormLabel>{t.contact.visitDate}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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
                    <FormLabel>{t.contact.interests}</FormLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {interestOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={option.id} 
                            checked={interests.includes(option.id)}
                            onCheckedChange={(checked) => handleInterestsChange(checked as boolean, option.id)}
                          />
                          <label 
                            htmlFor={option.id}
                            className="text-sm cursor-pointer"
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
                        <FormLabel>{t.contact.message}</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-fire text-white font-montserrat font-semibold py-3 px-6 rounded hover:bg-opacity-90 transition"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? t.contact.sending : t.contact.send}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            <div className="mb-8">
              <h3 className="font-montserrat font-semibold text-xl mb-4">{t.contact.info.title}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-fire text-white p-3 rounded-full mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">{t.contact.info.location}</h4>
                    <p className="opacity-80">{t.contact.info.locationText}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-fire text-white p-3 rounded-full mr-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">{t.contact.info.phone}</h4>
                    <p className="opacity-80">
                      {t.contact.info.phoneText1}<br />
                      {t.contact.info.phoneText2}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-fire text-white p-3 rounded-full mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">{t.contact.info.email}</h4>
                    <p className="opacity-80">{t.contact.info.emailText}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-montserrat font-semibold text-xl mb-4">{t.contact.faq.title}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">{t.contact.faq.q1}</h4>
                  <p className="opacity-80">{t.contact.faq.a1}</p>
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">{t.contact.faq.q2}</h4>
                  <p className="opacity-80">{t.contact.faq.a2}</p>
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">{t.contact.faq.q3}</h4>
                  <p className="opacity-80">{t.contact.faq.a3}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-montserrat font-semibold text-xl mb-4">{t.contact.social.title}</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-white text-midnight hover:bg-fire hover:text-white transition w-12 h-12 rounded-full flex items-center justify-center">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-white text-midnight hover:bg-fire hover:text-white transition w-12 h-12 rounded-full flex items-center justify-center">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-white text-midnight hover:bg-fire hover:text-white transition w-12 h-12 rounded-full flex items-center justify-center">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="bg-white text-midnight hover:bg-fire hover:text-white transition w-12 h-12 rounded-full flex items-center justify-center">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
