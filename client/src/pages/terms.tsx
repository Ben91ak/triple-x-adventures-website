import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { optimizePageImages } from "@/utils/performance-optimizer";

export default function TermsPage() {
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
        <title>{`${content.termsConditions} | Triple X Adventures`}</title>
        <meta name="description" content="Terms and Conditions for Triple X Adventures AB" />
        <meta property="og:title" content={`${content.termsConditions} | Triple X Adventures`} />
        <meta property="og:description" content="Terms and Conditions for Triple X Adventures AB" />
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
              <h1 className="text-3xl font-bold text-white mb-8">{content.termsConditions}</h1>
              
              <div className="text-white space-y-6 text-sm sm:text-base">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{content.termsTitle}</h3>
                  <p className="text-white/80 text-sm">
                    {content.termsIntro}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">{content.commercialTerms}</h3>
                  
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
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
