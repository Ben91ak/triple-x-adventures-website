import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { GlobalBackground } from "@/components/layout/background-fixed";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { optimizePageImages } from "@/utils/performance-optimizer";

export default function PrivacyPolicyPage() {
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
        <title>{`${content.privacyPolicy} | Triple X Adventures`}</title>
        <meta name="description" content="Privacy Policy for Triple X Adventures AB" />
        <meta property="og:title" content={`${content.privacyPolicy} | Triple X Adventures`} />
        <meta property="og:description" content="Privacy Policy for Triple X Adventures AB" />
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
              <h1 className="text-3xl font-bold text-white mb-8">{content.privacyPolicy}</h1>
              
              <div className="text-white space-y-6 text-sm sm:text-base">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{content.privacyPolicyTitle}</h3>
                  <p className="text-white/80 text-sm">
                    {content.privacyPolicyIntro}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{content.automaticCollection}</h4>
                  <p className="text-white/80 text-sm mb-4">
                    {content.automaticCollectionText}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{content.personalInfoCollection}</h4>
                  <p className="text-white/80 text-sm mb-4">
                    {content.personalInfoCollectionText}
                  </p>
                  <ul className="text-white/80 text-sm list-disc pl-5 mb-4">
                    {content.personalInfoItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-white/80 text-sm mb-4">
                    {content.personalInfoChoice}
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
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
