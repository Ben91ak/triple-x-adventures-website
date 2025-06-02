import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { optimizePageImages } from "@/utils/performance-optimizer";

export default function ImprintPage() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const content = t.footer;

  // Run image optimization when component mounts
  useEffect(() => {
    optimizePageImages();
  }, [language]);

  return (
    <div className="font-opensans text-slate relative">
      <Helmet>
        <title>{`${content.imprint} | Triple X Adventures`}</title>
        <meta name="description" content="Legal information about Triple X Adventures AB" />
        <meta property="og:title" content={`${content.imprint} | Triple X Adventures`} />
        <meta property="og:description" content="Legal information about Triple X Adventures AB" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Enhanced unified animated background with starry night effect */}
      <GlobalBackground intensity="medium" starDensity="medium" />
      
      {/* Main content with appropriate z-index */}
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 md:pt-32 pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card-bg/80 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-10 shadow-glow-sm">
<h1 className="text-3xl font-bold text-white mb-8">{content.imprint}</h1>
              
              <div className="prose prose-invert max-w-none text-white/80">
                <h3 className="text-lg font-semibold text-white">Company Information</h3>
                <p className="text-sm">
                  Triple X Adventures AB<br />
                  Storgatan 6F<br />
                  93331 Arvidsjaur<br />
                  Sweden
                </p>
                <p className="text-sm">
                  <strong>Represented by:</strong><br />
                  Janina Möller, Roberth Möller
                </p>
                <p className="text-sm">
                  <strong>Contact:</strong><br />
                   Telephone: +46 70 357 5455<br />
                    Email: <a href="mailto:info@triple-x-adventures.com" className="text-accent-color hover:underline">info@triple-x-adventures.com</a>
                </p>
                <p className="text-sm">
                  <strong>Register entry:</strong><br />
                  Entry in the Handelsregister.<br />
                  Registering court: Bolagsverket<br />
                  Registration number: 559122-4745
                </p>
                <p className="text-sm">
                  <strong>VAT ID:</strong><br />
                  VAT identification number according to §27a Value Added Tax Act:<br />
                  SE 559122474501
                </p>
                <p className="text-sm">
                  <strong>Responsible for the content:</strong><br />
                  Janina Möller, Roberth Möller<br />
                  Storgatan 6F<br />
                  93331 Arvidsjaur<br />
                  Sweden
                </p>
                <p className="text-sm">
                  The European Commission provides a platform for online dispute resolution (OS): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-accent-color hover:underline">https://ec.europa.eu/consumers/odr</a>.<br />
                  You can find our email address in the imprint above. We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
                </p>
                
                <h4 className="font-medium mt-6 text-md">Content disclaimer</h4>
                <p>
                  The information provided on www.triple-x-adventures.com is for general informational purposes only. 
                  All information on the site is provided in good faith, however, we make no representation or warranty of any kind, 
                  express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any 
                  information on the site. Under no circumstance shall we have any liability to you for any loss or damage of any 
                  kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use 
                  of the site and your reliance on any information on the site is solely at your own risk. The site may contain 
                  (or you may be sent through the site) links to other websites or content belonging to or originating from third 
                  parties or links to websites and features. Such external links are not investigated, monitored, or checked for 
                  accuracy, adequacy, validity, reliability, availability or completeness by us.
                  For any queries, please contact us at <a href="mailto:info@triple-x-adventures.com" className="text-accent-color hover:underline">info@triple-x-adventures.com</a>.
                </p>

                <p className="mt-6">
                  © {new Date().getFullYear()} TRIPLE X ADVENTURES AB. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
