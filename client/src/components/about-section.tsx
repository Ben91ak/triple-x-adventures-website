import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { Users, MapPin, Crown } from 'lucide-react'; // Using Lucide icons

// No need for TeamMember type here
// import { TeamMember } from "@/types";

export function AboutSection() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const features = [
    {
      icon: <Users size={28} className="text-slate-400" />,
      title: "Small Groups",
      text: "Personal attention and authentic experiences with small, intimate group sizes"
    },
    {
      icon: <MapPin size={28} className="text-slate-400" />,
      title: "Local Experts",
      text: "Our guides are passionate locals with deep knowledge of the Arctic wilderness"
    },
    {
      icon: <Crown size={28} className="text-slate-400" />,
      title: "Premium Service",
      text: "High-quality equipment, accommodation and dining experiences throughout"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-gray-900 text-white relative overflow-hidden">
      {/* Background elements if needed */}
      {/* <div className="absolute inset-0 bg-black opacity-50 z-0"></div> */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-sm font-medium tracking-wider uppercase mb-3 text-slate-400">
            ABOUT US
          </span>
          <h2 className="font-bold text-4xl md:text-5xl mb-6 text-white leading-tight">
            Not Just Another Tour Company
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Triple X Adventures offers authentic Arctic experiences rooted in Swedish Lapland. 
            Based in Arvidsjaur near the Polarcircle, we combine thrill, comfort, and 
            authenticity in every adventure. Whether it's carving through snow-covered 
            forests, dining around a crackling open fire, or staying in our premium 
            accommodations, you'll leave with stories, not just memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-xl p-8 flex flex-col items-center text-center shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-lg bg-gray-700">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
