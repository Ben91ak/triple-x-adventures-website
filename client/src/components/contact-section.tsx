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
  { id: "snowmobile", label: "Snowmobiling" },
  { id: "dogsledding", label: "Dog Sledding" },
  { id: "northernlights", label: "Northern Lights" },
  { id: "accommodation", label: "Accommodation" },
  { id: "restaurant", label: "JayJay's Restaurant" },
  { id: "custompackage", label: "Custom Package" },
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
        title: "Message Sent",
        description: "We've received your inquiry and will get back to you shortly.",
      });
      form.reset();
      setInterests([]);
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
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
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">LET'S MAKE WINTER LEGENDARY</h2>
          <p className="text-lg max-w-3xl mx-auto opacity-90">Ready to experience the real Arctic? Contact us to start planning your adventure</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white text-midnight rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h3 className="font-montserrat font-semibold text-xl mb-6">Contact Us</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
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
                          <FormLabel>Last Name</FormLabel>
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
                        <FormLabel>Email Address</FormLabel>
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
                        <FormLabel>Phone Number</FormLabel>
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
                        <FormLabel>When are you planning to visit?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time frame" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="december-january">December - January</SelectItem>
                            <SelectItem value="february-march">February - March</SelectItem>
                            <SelectItem value="april-may">April - May</SelectItem>
                            <SelectItem value="other">Other / Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>I'm interested in (select all that apply)</FormLabel>
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
                        <FormLabel>Your Message</FormLabel>
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
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            <div className="mb-8">
              <h3 className="font-montserrat font-semibold text-xl mb-4">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-fire text-white p-3 rounded-full mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">Our Location</h4>
                    <p className="opacity-80">Akkavare, near Arvidsjaur<br />Swedish Lapland, Sweden</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-fire text-white p-3 rounded-full mr-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">Phone</h4>
                    <p className="opacity-80">+46 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-fire text-white p-3 rounded-full mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">Email</h4>
                    <p className="opacity-80">adventures@triplexarctic.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-montserrat font-semibold text-xl mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">What's the best time to visit?</h4>
                  <p className="opacity-80">The prime season runs from December to April, with January to March offering the best snow conditions and northern lights visibility.</p>
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">How do I get to Arvidsjaur?</h4>
                  <p className="opacity-80">Arvidsjaur has its own airport with connections to Stockholm. We offer transfers from the airport to our location.</p>
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold mb-1">Do I need special gear?</h4>
                  <p className="opacity-80">We provide all specialist equipment including thermal suits, boots, and helmets. Just bring warm base layers and your sense of adventure!</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-montserrat font-semibold text-xl mb-4">Connect With Us</h3>
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
