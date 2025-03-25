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

// The interests options
const interestOptions = [
  { id: "snowmobile", label: "Schneemobil Abenteuer" },
  { id: "dogsledding", label: "Husky Schlittentour" },
  { id: "northernlights", label: "Polarlichter Expedition" },
  { id: "accommodation", label: "Unterkunft" },
  { id: "restaurant", label: "Triple X Taste Restaurant" },
  { id: "custompackage", label: "Maßgeschneidertes Paket" },
];

export function ContactSection() {
  const { toast } = useToast();
  const [interests, setInterests] = useState<string[]>([]);

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
        title: "Nachricht Gesendet",
        description: "Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
      });
      form.reset();
      setInterests([]);
    },
    onError: (error) => {
      toast({
        title: "Übermittlung Fehlgeschlagen",
        description: error instanceof Error ? error.message : "Bitte versuchen Sie es später noch einmal.",
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
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">MACHEN WIR DEN WINTER LEGENDÄR</h2>
          <p className="text-lg max-w-3xl mx-auto opacity-90">Bereit für ein echtes arktisches Erlebnis? Kontaktieren Sie uns, um Ihr Abenteuer zu planen</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white text-midnight rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h3 className="font-montserrat font-semibold text-xl mb-6">Kontakt</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vorname</FormLabel>
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
                          <FormLabel>Nachname</FormLabel>
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
                        <FormLabel>E-Mail-Adresse</FormLabel>
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
                        <FormLabel>Telefonnummer</FormLabel>
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
                        <FormLabel>Wann planen Sie Ihren Besuch?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Zeitraum auswählen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="december-january">Dezember - Januar</SelectItem>
                            <SelectItem value="february-march">Februar - März</SelectItem>
                            <SelectItem value="april-may">April - Mai</SelectItem>
                            <SelectItem value="other">Andere / Noch nicht sicher</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>Ich interessiere mich für (Mehrfachauswahl möglich)</FormLabel>
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
                        <FormLabel>Ihre Nachricht</FormLabel>
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
                    {mutation.isPending ? "Wird gesendet..." : "Nachricht senden"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            <div className="mb-8">
              <h3 className="font-montserrat font-semibold text-xl mb-4">Kontaktieren Sie uns</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-fire text-white p-3 rounded-full mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">Unser Standort</h4>
                    <p className="opacity-80">Akkavare, nahe Arvidsjaur<br />Schwedisch Lappland, Schweden</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-fire text-white p-3 rounded-full mr-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">Telefon</h4>
                    <p className="opacity-80">+46 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-fire text-white p-3 rounded-full mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">E-Mail</h4>
                    <p className="opacity-80">adventures@triplexarctic.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-montserrat font-semibold text-xl mb-4">Häufig gestellte Fragen</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">Was ist die beste Reisezeit?</h4>
                  <p className="opacity-80">Die Hauptsaison läuft von Dezember bis April, wobei Januar bis März die besten Schneebedingungen und Polarlichtsichtbarkeit bieten.</p>
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">Wie komme ich nach Arvidsjaur?</h4>
                  <p className="opacity-80">Arvidsjaur hat einen eigenen Flughafen mit Verbindungen nach Stockholm. Wir bieten Transfers vom Flughafen zu unserem Standort an.</p>
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">Benötige ich spezielle Ausrüstung?</h4>
                  <p className="opacity-80">Wir stellen alle Spezialausrüstungen wie Thermoanzüge, Stiefel und Helme zur Verfügung. Bringen Sie einfach warme Grundbekleidung und Ihren Abenteuersinn mit!</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-montserrat font-semibold text-xl mb-4">Folgen Sie uns</h3>
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
