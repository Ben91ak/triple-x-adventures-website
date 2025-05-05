import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";

type FooterLink = {
  href: string;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type SocialLink = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isImprintOpen, setIsImprintOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Multilingual footer content
  const footerContent = {
    en: {
      description: "Authentic Arctic experiences in the heart of Swedish Lapland. Small groups, local expertise, and unforgettable adventures.",
      quickLinks: "Quick Links",
      popularAdventures: "Popular Adventures",
      contactInfo: "Contact Information",
      ourExperiences: "Our Experiences",
      accommodations: "Accommodations",
      restaurant: "JayJay's Restaurant",
      aboutUs: "About Us",
      contact: "Contact",
      blog: "Blog",
      adventures: {
        snowmobile: "Snowmobile Safari",
        dogSledding: "Dog Sledding",
        northernLights: "Northern Lights Tours",
        iceFishing: "Ice Fishing",
        arcticSurvival: "Arctic Survival",
      },
      address: "Storgatan 6F<br />93331 Arvidsjaur<br />Swedish Lapland, Sweden",
    },
    de: {
      description: "Authentische arktische Erlebnisse im Herzen von Schwedisch-Lappland. Kleine Gruppen, lokale Expertise und unvergessliche Abenteuer.",
      quickLinks: "Schnelllinks",
      popularAdventures: "Beliebte Abenteuer",
      contactInfo: "Kontaktinformationen",
      ourExperiences: "Unsere Erlebnisse",
      accommodations: "Unterkünfte",
      restaurant: "JayJay's Restaurant",
      aboutUs: "Über uns",
      contact: "Kontakt",
      blog: "Blog",
      adventures: {
        snowmobile: "Schneemobil-Safari",
        dogSledding: "Hundeschlittenfahrten",
        northernLights: "Nordlicht-Touren",
        iceFishing: "Eisfischen",
        arcticSurvival: "Arktisches Überleben",
      },
      address: "Akkavare, bei Arvidsjaur<br />Schwedisch-Lappland, Schweden",
    },
    sv: {
      description: "Autentiska arktiska upplevelser i hjärtat av Svenska Lappland. Små grupper, lokal expertis och oförglömliga äventyr.",
      quickLinks: "Snabblänkar",
      popularAdventures: "Populära Äventyr",
      contactInfo: "Kontaktinformation",
      ourExperiences: "Våra Upplevelser",
      accommodations: "Boende",
      restaurant: "JayJay's Restaurang",
      aboutUs: "Om Oss",
      contact: "Kontakt",
      blog: "Blogg",
      adventures: {
        snowmobile: "Snöskotersafari",
        dogSledding: "Hundspann",
        northernLights: "Norrskensjakt",
        iceFishing: "Isfiske",
        arcticSurvival: "Arktisk Överlevnad",
      },
      address: "Akkavare, nära Arvidsjaur<br />Svenska Lappland, Sverige",
    }
  };

  const content = footerContent[language];

  // Social media links
  const socialLinks: SocialLink[] = [
    { icon: <Facebook size={15} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={15} />, label: "Instagram", href: "http://instagram.com/triplexadventures" },
    { icon: <Youtube size={15} />, label: "YouTube", href: "#" },
    { 
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" role="img">
          <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0 -6 0"/>
          <path d="M12.5 8.5l-1 -1.5h-2l-1 1.5"/>
          <path d="M17.5 6.5l-1 2l2 1c1 -1 2 -3 0 -4s-4 1 -4 3c0 .3 .3 1 1 2"/>
          <path d="M3.5 14.5c.5 .5 1.5 -.5 2 -1.5"/>
          <path d="M9.5 16.5l-1 1c-1 1 -2 1 -2.5 .5s0 -1.5 1 -2"/>
          <path d="M16.5 17.5l3 -2s1 -1.5 0 -2.5s-3 1 -3.5 3s1 4 3 3"/>
        </svg>
      ), 
      label: "TripAdvisor", 
      href: "#" 
    }
  ];

  // Quick links
  const quickLinks: FooterLink[] = [
    { href: "#experiences", text: content.ourExperiences },
    { href: "#accommodations", text: content.accommodations },
    { href: "#restaurant", text: content.restaurant },
    { href: "#team", text: content.aboutUs },
    { href: "#contact", text: content.contact }
  ];

  // Popular adventures
  const popularAdventures: FooterLink[] = [
    { href: "#experiences", text: content.adventures.snowmobile },
    { href: "#experiences", text: content.adventures.dogSledding },
    { href: "#experiences", text: content.adventures.northernLights },
    { href: "#experiences", text: content.adventures.iceFishing }
  ];

  // Legal links
  const legalLinks: FooterLink[] = [
    { 
      href: "#", 
      text: t.footer.privacyPolicy,
      onClick: (e) => {
        e.preventDefault();
        setIsPrivacyOpen(true);
      }
    },
    { 
      href: "#", 
      text: t.footer.termsConditions,
      onClick: (e) => {
        e.preventDefault();
        setIsTermsOpen(true);
      }
    },
    { 
      href: "#", 
      text: t.footer.imprint,
      onClick: (e) => {
        e.preventDefault();
        setIsImprintOpen(true);
      }
    }
  ];

  return (
    <>
      <footer className="relative overflow-hidden border-t border-white/5" role="contentinfo">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu" style={{ zIndex: 1 }} aria-hidden="true">
          <div className="aurora-glow-strong absolute inset-0 opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wNCIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjkgNTguNWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1em0wIDFhNi41IDYuNSAwIDEgMCAwIDEzIDYuNSA2LjUgMCAwIDAgMC0xM3ptMS0uMDg3YTcuNSA3LjUgMCAxIDEgMCAxNSA3LjUgNy41IDAgMCAxIDAtMTV6TTIwIDU5LjVhNy41IDcuNSAwIDEgMSAwIDE1IDcuNSA3LjUgMCAwIDEgMC0xNXptMCAxYTYuNSA2LjUgMCAxIDAgMCAxMyA2LjUgNi41IDAgMCAwIDAtMTN6bTAtMWE3LjUgNy41IDAgMSAxIDAgMTUgNy41IDcuNSAwIDAgMSAwLTE1eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 pointer-events-none transform-gpu" style={{ zIndex: 2 }} aria-hidden="true"></div>
        
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-color/30 to-transparent" style={{ zIndex: 3 }} aria-hidden="true"></div>
        
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
          {/* Main footer content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* Logo and company info - 4 columns on desktop */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start">
                <Link href="/" className="inline-block mb-5">
                  <img 
                    src="/weiss-grun.png" 
                    alt="Triple X Adventures" 
                    className="h-16 w-auto" 
                    width="200"
                    height="64"
                  />
                </Link>
                <div className="w-12 h-1 bg-accent-color rounded-full mx-auto md:mx-0 mb-5" aria-hidden="true"></div>
                <p className="text-white text-opacity-80 mb-6 leading-relaxed text-center md:text-left">{content.description}</p>
                
                {/* Social icons */}
                <nav aria-label="Social Media Links" className="mb-6">
                  <ul className="flex space-x-4 justify-center md:justify-start list-none p-0">
                    {socialLinks.map((social, index) => (
                      <li key={index}>
                        <a 
                          href={social.href} 
                          className="w-10 h-10 rounded-full bg-card-bg/80 border border-white/10 flex items-center justify-center text-white hover:text-accent-color hover:border-accent-color/50 transition-colors"
                          aria-label={social.label}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {social.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              {/* Spacer column for better layout */}
              <div className="hidden md:block md:col-span-1"></div>
              
              {/* Links columns - 7 columns total on desktop */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Quick Links */}
                <div className="col-span-1">
                  <nav aria-labelledby="quick-links-heading">
                    <h2 id="quick-links-heading" className="text-lg font-semibold mb-5 text-white flex items-center">
                      <span className="bg-accent-color/20 w-1.5 h-6 mr-2.5 rounded-full inline-block" aria-hidden="true"></span>
                      <span>{content.quickLinks}</span>
                    </h2>
                    <ul className="space-y-3 list-none p-0">
                      {quickLinks.map((link, index) => (
                        <li key={index}>
                          <a 
                            href={link.href} 
                            className="text-white text-opacity-80 hover:text-accent-color transition-colors flex items-center group"
                          >
                            <ChevronRight 
                              size={14} 
                              className="mr-2 text-accent-color/50 group-hover:translate-x-1 transition-transform" 
                              aria-hidden="true"
                            />
                            <span>{link.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                {/* Popular Adventures */}
                <div className="col-span-1">
                  <nav aria-labelledby="adventures-heading">
                    <h2 id="adventures-heading" className="text-lg font-semibold mb-5 text-white flex items-center">
                      <span className="bg-accent-color/20 w-1.5 h-6 mr-2.5 rounded-full inline-block" aria-hidden="true"></span>
                      <span>{content.popularAdventures}</span>
                    </h2>
                    <ul className="space-y-3 list-none p-0">
                      {popularAdventures.map((adventure, index) => (
                        <li key={index}>
                          <a 
                            href={adventure.href} 
                            className="text-white text-opacity-80 hover:text-accent-color transition-colors flex items-center group"
                          >
                            <ChevronRight 
                              size={14} 
                              className="mr-2 text-accent-color/50 group-hover:translate-x-1 transition-transform" 
                              aria-hidden="true"
                            />
                            <span>{adventure.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                {/* Contact Info */}
                <div className="col-span-1">
                  <section aria-labelledby="contact-heading">
                    <h2 id="contact-heading" className="text-lg font-semibold mb-5 text-white flex items-center">
                      <span className="bg-accent-color/20 w-1.5 h-6 mr-2.5 rounded-full inline-block" aria-hidden="true"></span>
                      <span>{content.contactInfo}</span>
                    </h2>
                    <address className="not-italic">
                      <ul className="space-y-4 list-none p-0">
                        <li className="flex items-start">
                          <div className="mr-3 mt-0.5 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm flex-shrink-0" aria-hidden="true">
                            <MapPin size={15} />
                          </div>
                          <span 
                            className="text-white text-opacity-80" 
                            dangerouslySetInnerHTML={{ __html: content.address }} 
                          />
                        </li>
                        <li className="flex items-center">
                          <div className="mr-3 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm flex-shrink-0" aria-hidden="true">
                            <Phone size={15} />
                          </div>
                          <a href="tel:+46703575455" className="text-white text-opacity-80 hover:text-accent-color transition-colors">+46 (0) 70 357 5455</a>
                        </li>
                        <li className="flex items-center">
                          <div className="mr-3 w-8 h-8 rounded-full bg-accent-color/10 flex items-center justify-center text-accent-color shadow-glow-sm flex-shrink-0" aria-hidden="true">
                            <Mail size={15} />
                          </div>
                          <a href="mailto:info@triple-x-adventures.com" className="text-white text-opacity-80 hover:text-accent-color transition-colors">info@triple-x-adventures.com</a>
                        </li>
                      </ul>
                    </address>
                  </section>
                </div>
              </div>
            </div>
            
            {/* Copyright Section */}
            <div className="border-t border-white/10 pt-8 mt-12">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <p className="text-white text-opacity-70 text-sm text-center md:text-left">{t.footer.copyright}</p>
                <nav aria-label="Legal Links">
                  <ul className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2 list-none p-0">
                    {legalLinks.map((link, index) => (
                      <li key={index}>
                        <a 
                          href={link.href} 
                          className="text-white text-opacity-70 text-sm hover:text-accent-color transition-colors"
                          onClick={link.onClick}
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Imprint Modal */}
      <Modal
        isOpen={isImprintOpen}
        onClose={() => setIsImprintOpen(false)}
        title="Imprint"
      >
        <div className="text-white space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">TRIPLE X ADVENTURES AB</h3>
            <p className="text-white/80">
              Storgatan 6F<br />
              93331 Arvidsjaur<br />
              Sweden
            </p>
            <p className="mt-2 text-white/80">
              Email: <a href="mailto:info@triple-x-adventures.com" className="text-accent-color hover:underline">info@triple-x-adventures.com</a><br />
              Website: <a href="https://www.triple-x-adventures.com" className="text-accent-color hover:underline" target="_blank" rel="noreferrer">www.triple-x-adventures.com</a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Authorized representative managing directors:</h3>
            <p className="text-white/80">Janina Möller, Roberth Möller</p>
          </div>

          <div>
            <p className="text-white/80">
              Organization number: 559122-4745<br />
              Sales Tax Identification number: SE 559122474501
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Content disclaimer</h3>
            <p className="text-white/80 text-sm">
              The information provided on www.triple-x-adventures.com is for general informational purposes only. 
              All information on the site is provided in good faith, however, we make no representation or warranty 
              of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, 
              or completeness of any information on the site. Under no circumstance shall we have any liability to you 
              for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information 
              provided on the site. Your use of the site and your reliance on any information on the site is solely at 
              your own risk. The site may contain (or you may be sent through the site) links to other websites or content 
              belonging to or originating from third parties or links to websites and features. Such external links are not 
              investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.
            </p>
            <p className="mt-4 text-white/80">
              For any queries, please contact us at <a href="mailto:info@triple-x-adventures.com" className="text-accent-color hover:underline">info@triple-x-adventures.com</a>.
            </p>
          </div>
        </div>
      </Modal>

      {/* Terms and Conditions Modal */}
      <Modal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms and Conditions"
      >
        <div className="text-white space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <h3 className="text-lg font-semibold mb-4">TERMS AND CONDITIONS</h3>
            <p className="text-white/80 text-sm">
              The following terms and conditions shall be applied to packages offered and delivered during all seasons by Triple X Adventures AB (hereinafter referred to as "TXA") through its package programs in the following destinations: Arvidsjaur, Swedish Lapland, and any other areas where the services are delivered.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">COMMERCIAL TERMS</h3>
            
            <h4 className="font-medium mb-2">Services and Prices:</h4>
            <p className="text-white/80 text-sm mb-4">
              The prices and services offered and to be delivered by TXA under these terms and conditions for the packages are set out in the program descriptions for each weekly program service. The given prices include VAT according to the taxation laws and regulations of Sweden. TXA reserves the right to change the prices in case of any unforeseen increases in costs (including but not limited to taxes, fuel prices, etc.) beyond the control of TXA.
            </p>
            
            <h4 className="font-medium mb-2">Reservation:</h4>
            <p className="text-white/80 text-sm mb-4">
              A reservation received by TXA is considered confirmed upon the reservation confirmation sent by TXA to the consumer. Payment options will be presented in our offers, or in the case of on-the-spot reservations, during the booking process.
            </p>
            
            <h4 className="font-medium mb-2">Payment Terms for Package Guests:</h4>
            <ol className="text-white/80 text-sm list-decimal pl-5 space-y-2 mb-4">
              <li><strong>Deposit:</strong> A 60% non-refundable deposit of the total amount is required at the time of booking. This deposit secures your reservation.</li>
              <li><strong>Final Payment:</strong> The remaining 40% balance payment of the total amount is due 4 weeks before the booking date.</li>
              <li><strong>Payment Methods:</strong> Payment options will be presented in our offers or, in the case of on-the-spot reservations, during the booking process.</li>
            </ol>
            
            <h4 className="font-medium mb-2">Cancellation Terms:</h4>
            <ol className="text-white/80 text-sm list-decimal pl-5 space-y-2 mb-4">
              <li>
                <strong>Cancellation by Customer:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Up to 28 days before arrival: If you cancel up to 28 days before your scheduled arrival, a service fee of 30% of the total booking amount will be charged.</li>
                  <li>27 to 1 day before arrival or no-show: If you cancel within 27 days before your arrival or do not show up, 100% of the total booking amount will be charged.</li>
                </ul>
              </li>
              <li>
                <strong>Rebooking and Transfer:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>You may rebook or transfer your package travel trip to another date within the current calendar year or to a third party, up to 28 days before departure, at no additional cost.</li>
                  <li>We recommend purchasing extra travel insurance to cover unforeseen cancellations.</li>
                </ul>
              </li>
              <li>
                <strong>How to Cancel:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>To cancel your booking, please contact us via email at <a href="mailto:info@triple-x-adventures.com" className="text-accent-color hover:underline">info@triple-x-adventures.com</a>, or call us at +46 (0)72 231 5455. Be sure to refer to your booking reference number.</li>
                </ul>
              </li>
            </ol>
            
            <h4 className="font-medium mb-2">Changes to Reservation:</h4>
            <p className="text-white/80 text-sm mb-4">
              All changes or alterations to your reservation must be made in writing during office hours in Sweden. Requested changes are subject to written approval by TXA and may incur additional charges.
            </p>
            
            <h4 className="font-medium mb-2">Child Policy:</h4>
            <p className="text-white/80 text-sm mb-4">
              For children aged 4-14 years, TXA will apply special child rates on request. Children over 140 cm in height are allowed to sit on the snowmobile.
            </p>
            
            <h4 className="font-medium mb-2">Pregnant Women:</h4>
            <p className="text-white/80 text-sm mb-4">
              Pregnant women should not use the snowmobile or the sledge pulled by the snowmobile as the vibrations and exhaust fumes may be harmful. If the program requires special organization (e.g., additional transport), TXA shall not be responsible for the possible extra costs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">GENERAL TERMS & CONDITIONS</h3>
            
            <h4 className="font-medium mb-2">Definitions:</h4>
            <p className="text-white/80 text-sm mb-4">
              "TXA" is one of the following companies specified in the offer or reservation confirmation of TXA: Triple X Adventures AB.<br /><br />
              "Consumer" is a person who has delivered the order or otherwise confirmed the booking to TXA. For the avoidance of any doubt, a company, corporation, or community is not a person. Hereinafter each alone "party" and together "parties".<br /><br />
              "Order" is any documentation in written form, from the consumer to TXA to make a booking.<br /><br />
              "Order confirmation" is any documentation from TXA to the consumer including prices and specifications of the services and confirming the availability of the ordered services.
            </p>
            
            <h4 className="font-medium mb-2">Service Language:</h4>
            <p className="text-white/80 text-sm mb-4">
              The language used for guiding and during all services is English unless otherwise stated or agreed.
            </p>
            
            <h4 className="font-medium mb-2">Liability:</h4>
            <p className="text-white/80 text-sm mb-4">
              TXA shall exercise pro-activity, contingency, due diligence, and appropriate health and safety measures in accordance with the laws and regulations of Sweden and Swedish standards of recommended practices of program services at all times when delivering offered services under these terms and conditions.
            </p>
            
            <h4 className="font-medium mb-2">Liability Insurance:</h4>
            <p className="text-white/80 text-sm mb-4">
              TXA has general "Third-Party Liability Insurance" for bodily injury and property damage.
            </p>
            
            <h4 className="font-medium mb-2">Snowmobile Tours:</h4>
            <p className="text-white/80 text-sm mb-4">
              All snowmobiles used in tours are insured as required by Swedish law. Tour participants are held liable for damages caused to snowmobiles. The amount of the compulsory deductible expense is at most SEK 22,200 per driver per snowmobile per incident.<br /><br />
              The driver of the snowmobile must be at least 16 years of age and in possession of a valid driver's license. Swedish law prohibits driving a snowmobile under the influence of alcohol. As the responsible tour organizer, TXA reserves the right to change the routing, schedules, and duration of the excursions if necessary due to prevailing weather conditions, or if deemed advisable due to safety reasons and the comfort of the participants. TXA also reserves the right to discontinue the tour if a participant is seen as a potential danger to him/herself or to others, or is in poor health. NOTE! Take your driving license with you on the snowmobile tours as the police may check the validity of the license during the tours!
            </p>
            
            <h4 className="font-medium mb-2">Other Injuries:</h4>
            <p className="text-white/80 text-sm mb-4">
              TXA may only be held liable for personal injuries or material damage arising from accidents that have happened during the delivery of the offered services and which are caused by the negligence of TXA or its employees or sub-contractors or by the provision of faulty equipment. TXA is not liable for any accidental damage or injury which has to be indemnified under the travel insurance of a customer. Personal travel insurance is always highly recommended. Program services, e.g., snowmobile and husky safaris, can be physically demanding and the participants may be exposed to different kinds of physical strain. In case the consumer has any illnesses or disabilities (for instance heart disease, asthma, diabetes, epilepsy, back or hip problems) that could affect his/her ability to take part in the services, or if she/he is pregnant, she/he should prior to participating in any services consult medical experts about her/his ability to participate in the service in question. Should the consumer have an illness or disability of this nature, he/she acknowledges that he/she participates in the service at his/her own risk.
            </p>
            
            <h4 className="font-medium mb-2">Animals:</h4>
            <p className="text-white/80 text-sm mb-4">
              All animals used in the services (reindeer adventures and husky rides) are trained as far as possible for the activity. However, the behavior of animals can never be fully predicted and therefore, in order to reduce risks, given safety and other instructions have to be obeyed.
            </p>
            
            <h4 className="font-medium mb-2">Force Majeure:</h4>
            <p className="text-white/80 text-sm mb-4">
              TXA is not liable for any default, damage, or loss due to a condition of force majeure or to unreasonable impairment of the party's operations due to a similar cause (including but not limited to government decisions, war, strike, weather, lack of snow, epidemic, pandemic, or other natural conditions, etc.). If encountering a force majeure condition, TXA shall notify the other party and keep the other party informed of the continuance of the force majeure condition and of any relevant change of circumstances whilst such force majeure continues. When encountering a force majeure condition, each party shall take all reasonable steps available to minimize the effects of the force majeure on the performance of their obligations under this contractual relationship. If a force majeure condition occurs, TXA has the right to move the event whereby no additional costs shall apply for the other party.
            </p>
            
            <h4 className="font-medium mb-2">Applicable Law and Jurisdiction:</h4>
            <p className="text-white/80 text-sm mb-4">
              These terms and conditions shall be governed by and construed in accordance with Swedish Law. The Swedish Courts shall have exclusive jurisdiction to settle any dispute, controversy, or claim related to such a demand. The District Court of Sweden shall be the court of the first instance.
            </p>
            
            <h4 className="font-medium mb-2">Severability:</h4>
            <p className="text-white/80 text-sm mb-4">
              If any part, term, or provision of these terms and conditions is partly or wholly held invalid, illegal, or unenforceable, the validity or enforceability of other provisions, the extent part, and the remainder of these terms and conditions shall remain in full force and effect.
            </p>
            
            <h4 className="font-medium mb-2">Contacting Us:</h4>
            <p className="text-white/80 text-sm">
              If you would like to contact us concerning any matter relating to this, you may do so via the contact form, send an email to <a href="mailto:info@triple-x-adventures.com" className="text-accent-color hover:underline">info@triple-x-adventures.com</a>, or write a letter to:<br /><br />
              Triple X Adventures AB<br />
              Storgatan 6F<br />
              93331 Arvidsjaur<br />
              Sweden
            </p>
          </div>
        </div>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <div className="text-white space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <h3 className="text-lg font-semibold mb-4">PRIVACY POLICY</h3>
            <p className="text-white/80 text-sm">
              This privacy policy ("Policy") describes how Triple X Adventures AB ("Triple X Adventures AB", "we", "us", or "our") collects, protects, and uses the personally identifiable information ("Personal Information") you ("User", "you", or "your") may provide on the triple-x-adventures.com website and any of its products or services (collectively, "Website" or "Services"). It also describes the choices you have regarding the use of your Personal Information and how you can access and update that information. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Automatic Collection of Information</h4>
            <p className="text-white/80 text-sm mb-4">
              Our top priority is customer data security, and we exercise a no-logs policy. We may process only minimal user data, only as much as is absolutely necessary to maintain the Website or Services. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding Website usage. This statistical information is not otherwise aggregated in such a way that would identify any particular user of the system.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Collection of Personal Information</h4>
            <p className="text-white/80 text-sm mb-4">
              You can visit the Website without telling us who you are or revealing any information by which someone could identify you as a specific, identifiable individual. However, if you wish to use some of the Website's features, you may be asked to provide certain Personal Information (for example, your name and email address). We receive and store any information you knowingly provide to us when you make a purchase, or fill out any online form on the Website. This information may include:
            </p>
            <ul className="text-white/80 text-sm list-disc pl-5 mb-4">
              <li>Personal details such as name, country of residence, etc.</li>
              <li>Contact information such as email address, address, etc.</li>
            </ul>
            <p className="text-white/80 text-sm mb-4">
              You can choose not to provide us with your Personal Information, but then you may not be able to take advantage of some of the Website's features. Users who are uncertain about what information is mandatory are welcome to contact us.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Storing Personal Information</h4>
            <p className="text-white/80 text-sm mb-4">
              We will retain and use your Personal Information for the period necessary to comply with our legal obligations, resolve disputes, and enforce our agreements, unless a longer retention period is required or permitted by law. We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally. Once the retention period expires, Personal Information shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification, and the right to data portability cannot be enforced after the expiration of the retention period.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Use and Processing of Collected Information</h4>
            <p className="text-white/80 text-sm mb-4">
              In order to make our Website and Services available to you, or to meet a legal obligation, we need to collect and use certain Personal Information. If you do not provide the information that we request, we may not be able to provide you with the requested products or services. Some of the information we collect is directly from you via our Website. However, we may also collect Personal Information about you from other sources. Any of the information we collect from you may be used for the following purposes:
            </p>
            <ul className="text-white/80 text-sm list-disc pl-5 mb-4">
              <li>Deliver products or services</li>
              <li>Improve products and services</li>
              <li>Respond to inquiries and offer support</li>
              <li>Improve user experience</li>
              <li>Respond to legal requests and prevent harm</li>
              <li>Run and operate our Website and Services</li>
            </ul>
            <p className="text-white/80 text-sm mb-4">
              Processing your Personal Information depends on how you interact with our Website, where you are located in the world, and if one of the following applies:
            </p>
            <ul className="text-white/80 text-sm list-disc pl-5 mb-4">
              <li>You have given your consent for one or more specific purposes.</li>
              <li>Provision of information is necessary for the performance of an agreement with you and/or for any pre-contractual obligations thereof.</li>
              <li>Processing is necessary for compliance with a legal obligation to which you are subject.</li>
              <li>Processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in us.</li>
              <li>Processing is necessary for the purposes of the legitimate interests pursued by us or by a third party.</li>
            </ul>
            <p className="text-white/80 text-sm mb-4">
              Note that under some legislations we may be allowed to process information until you object to such processing (by opting out), without having to rely on consent or any other of the following legal bases below. In any case, we will be happy to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Information is a statutory or contractual requirement, or a requirement necessary to enter into a contract.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Information Transfer and Storage</h4>
            <p className="text-white/80 text-sm mb-4">
              Depending on your location, data transfers may involve transferring and storing your information in a country other than your own. You are entitled to learn about the legal basis of information transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by us to safeguard your information. If any such transfer takes place, you can find out more by checking the relevant sections of this document or inquiring with us using the information provided in the contact section.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">The Rights of Users</h4>
            <p className="text-white/80 text-sm mb-4">
              You may exercise certain rights regarding your information processed by us. In particular, you have the right to:
            </p>
            <ul className="text-white/80 text-sm list-disc pl-5 mb-4">
              <li>Withdraw consent where you have previously given your consent to the processing of your information.</li>
              <li>Object to the processing of your information if the processing is carried out on a legal basis other than consent.</li>
              <li>Learn if information is being processed by us, obtain disclosure regarding certain aspects of the processing, and obtain a copy of the information undergoing processing.</li>
              <li>Verify the accuracy of your information and ask for it to be updated or corrected.</li>
              <li>Restrict the processing of your information, in which case, we will not process your information for any purpose other than storing it.</li>
              <li>Obtain the erasure of your Personal Information from us under certain circumstances.</li>
              <li>Receive your information in a structured, commonly used, and machine-readable format and, if technically feasible, to have it transmitted to another controller without any hindrance. This provision is applicable provided that your information is processed by automated means and that the processing is based on your consent, on a contract which you are part of, or on pre-contractual obligations thereof.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">The Right to Object to Processing</h4>
            <p className="text-white/80 text-sm mb-4">
              Where Personal Information is processed for the public interest, in the exercise of an official authority vested in us, or for the purposes of the legitimate interests pursued by us, you may object to such processing by providing a ground related to your particular situation to justify the objection. You must know that, however, should your Personal Information be processed for direct marketing purposes, you can object to that processing at any time without providing any justification. To learn whether we are processing Personal Information for direct marketing purposes, you may refer to the relevant sections of this document.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">How to Exercise These Rights</h4>
            <p className="text-white/80 text-sm mb-4">
              Any requests to exercise user rights can be directed to Triple X Adventures AB through the contact details provided in this document. These requests can be exercised free of charge and will be addressed by Triple X Adventures AB as early as possible.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Billing and Payments</h4>
            <p className="text-white/80 text-sm mb-4">
              We use third-party payment processors to assist us in processing your payment information securely. Such third-party processors' use of your Personal Information is governed by their respective privacy policies, which may or may not contain privacy protections as protective as this privacy policy. We suggest that you review their respective privacy policies.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Product and Service Providers</h4>
            <p className="text-white/80 text-sm mb-4">
              We may contract with other companies to provide certain products and services. These service providers are not authorized to use or disclose the information except as necessary to perform services on our behalf or comply with legal requirements. We may share Personal Information for these purposes only with third parties whose privacy policies are consistent with ours or who agree to abide by our policies with respect to Personal Information. Our service providers are given the information they need to perform their designated functions, and we do not authorize them to use or disclose Personal Information for their own marketing or other purposes.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Privacy of Children</h4>
            <p className="text-white/80 text-sm mb-4">
              We recognize the need to provide further privacy protections with respect to Personal Information we may collect from children and take many special precautions to protect the privacy of children. We do not require any Personal Information from them at any time. We encourage children to consult with their parents before submitting any information to any website. We believe parents should be involved in the online activities of their children and suggest that parents do their best to provide their children with a safe and friendly online environment.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Cookies</h4>
            <p className="text-white/80 text-sm mb-4">
              The Website uses "cookies" to help personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you and can only be read by a web server in the domain that issued the cookie to you. We may use cookies to collect, store, and track information for statistical purposes to operate our Website and Services. You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the features of the Website and Services. To learn more about cookies and how to manage them, visit internetcookies.org.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Do Not Track Signals</h4>
            <p className="text-white/80 text-sm mb-4">
              Some browsers incorporate a do-not-track feature that signals to websites you visit that you do not want to have your online activity tracked. Tracking is not the same as using or collecting information in connection with a website. For these purposes, tracking refers to collecting personally identifiable information from consumers who use or visit a website or online service as they move across different websites over time. The way browsers transmit the "do not track" signal is not consistent yet. As a result, this Website is not yet set up to interpret or respond to do-not-track signals communicated by your browser. Even so, as described in more detail throughout this Policy, we limit our use and collection of your Personal Information.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Advertisement</h4>
            <p className="text-white/80 text-sm mb-4">
              We may display online advertisements and we may share aggregated and non-identifying information about our customers that we collect through the registration process or through online surveys and promotions with certain advertisers. We do not share personally identifiable information about individual customers with advertisers. In some instances, we may use this aggregated and non-identifying information to deliver tailored advertisements to the intended audience.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Affiliates</h4>
            <p className="text-white/80 text-sm mb-4">
              We may disclose information about you to our affiliates to offer you related or additional products and services. Any information relating to you that we provide to our affiliates will be treated by those affiliates in accordance with the terms of this privacy policy.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Links to Other Websites</h4>
            <p className="text-white/80 text-sm mb-4">
              Our Website contains links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other websites or third parties. We encourage you to be aware when you leave our Website and to read the privacy statements of each and every website that may collect Personal Information.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Information Security</h4>
            <p className="text-white/80 text-sm mb-4">
              We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We maintain reasonable administrative, technical, and physical safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of Personal Information in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed. Therefore, while we strive to protect your Personal Information, you acknowledge that:
            </p>
            <ul className="text-white/80 text-sm list-disc pl-5 mb-4">
              <li>There are security and privacy limitations of the internet which are beyond our control;</li>
              <li>The security, integrity, and privacy of any and all information and data exchanged between you and our Website cannot be guaranteed;</li>
              <li>Any such information and data may be viewed or tampered with in transit by a third party, despite best efforts.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Data Breach</h4>
            <p className="text-white/80 text-sm mb-4">
              In the event we become aware that the security of the Website has been compromised or users' Personal Information has been disclosed to unrelated third parties as a result of external activity, including, but not limited to, security attacks or fraud, we reserve the right to take reasonably appropriate measures, including, but not limited to, investigation and reporting, as well as notification to and cooperation with law enforcement authorities. In the event of a data breach, we will make reasonable efforts to notify affected individuals if we believe that there is a reasonable risk of harm to the user as a result of the breach or if notice is otherwise required by law. When we do, we will send you an email.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Changes and Amendments</h4>
            <p className="text-white/80 text-sm mb-4">
              We may update this privacy policy from time to time in our discretion and will notify you of any material changes to the way in which we treat Personal Information. When changes are made, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways in our discretion, such as through contact information you have provided. Any updated version of this privacy policy will be effective immediately upon the posting of the revised privacy policy unless otherwise specified. Your continued use of the Website or Services after the effective date of the revised privacy policy (or such other act specified at that time) will constitute your consent to those changes. However, we will not, without your consent, use your Personal Data in a manner materially different than what was stated at the time your Personal Data was collected.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Acceptance of This Policy</h4>
            <p className="text-white/80 text-sm mb-4">
              You acknowledge that you have read this Policy and agree to all its terms and conditions. By using the Website or its Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to use or access the Website and its Services.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Contacting Us</h4>
            <p className="text-white/80 text-sm">
              If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to individual rights and your Personal Information, you may send an email to <a href="mailto:info@triple-x-adventures.com" className="text-accent-color hover:underline">info@triple-x-adventures.com</a> or write a letter to:
            </p>
            <p className="text-white/80 text-sm mt-4">
              Triple X Adventures AB<br />
              Storgatan 6F<br />
              93331 Arvidsjaur<br />
              Sweden
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
