import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { Calendar, Users, MapPin, Clock, CalendarCheck } from "lucide-react";

export function BookingSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this data to a server
    setTimeout(() => {
      setFormSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        const form = e.target as HTMLFormElement;
        form.reset();
      }, 3000);
    }, 1000);
  };
  
  // Define experience keys once
  const experienceKeys = ["snowmobile", "husky", "aurora", "iceFishing", "survival"];

  return (
    <section id="booking" className="relative py-24 lg:py-32 overflow-hidden" aria-labelledby="booking-title">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/90 via-dark-bg to-dark-bg/90 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/images/noise-pattern.png')] opacity-20"></div>
        <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-accent-color/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 
            id="booking-title"
            className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight"
          >
            <span className="bg-accent-color/20 w-2 h-8 mr-3 rounded-full inline-block" aria-hidden="true"></span>
            <span>{t('bookingSection.title')}</span>
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            {t('bookingSection.subtitle')}
          </p>
        </div>
        
        {/* Booking Form Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card-bg border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 md:p-8 lg:p-10">
              {formSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-accent-color/20 mx-auto flex items-center justify-center mb-6">
                    <CalendarCheck size={36} className="text-accent-color" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t('bookingSection.successMessage')}</h3>
                  <p className="text-white/70">{t('bookingSection.successConfirmation')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        {t('bookingSection.nameLabel')} <span className="text-accent-color">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full bg-dark-bg/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-color/50 focus:border-accent-color/50 transition-all"
                        placeholder={t('bookingSection.namePlaceholder')}
                      />
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        {t('bookingSection.emailLabel')} <span className="text-accent-color">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full bg-dark-bg/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-color/50 focus:border-accent-color/50 transition-all"
                        placeholder={t('bookingSection.emailPlaceholder')}
                      />
                    </div>
                    
                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                        {t('bookingSection.phoneLabel')}
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full bg-dark-bg/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-color/50 focus:border-accent-color/50 transition-all"
                        placeholder={t('bookingSection.phonePlaceholder')}
                      />
                    </div>
                    
                    {/* Date Field */}
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-white/80 mb-2">
                        {t('bookingSection.dateLabel')} <span className="text-accent-color">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="date" 
                          id="date" 
                          required
                          className="w-full bg-dark-bg/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-color/50 focus:border-accent-color/50 transition-all"
                          placeholder={t('bookingSection.datePlaceholder')}
                        />
                        <Calendar className="absolute top-3 right-4 text-accent-color/70" size={20} />
                      </div>
                    </div>
                    
                    {/* Participants Field */}
                    <div>
                      <label htmlFor="participants" className="block text-sm font-medium text-white/80 mb-2">
                        {t('bookingSection.participantsLabel')} <span className="text-accent-color">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="number" 
                          id="participants" 
                          min="1"
                          max="20"
                          required
                          className="w-full bg-dark-bg/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-color/50 focus:border-accent-color/50 transition-all"
                          placeholder={t('bookingSection.participantsPlaceholder')}
                        />
                        <Users className="absolute top-3 right-4 text-accent-color/70" size={20} />
                      </div>
                    </div>
                    
                    {/* Experience Selection */}
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-white/80 mb-2">
                        {t('bookingSection.experienceLabel')} <span className="text-accent-color">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          id="experience" 
                          required
                          className="w-full bg-dark-bg/70 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-accent-color/50 focus:border-accent-color/50 transition-all"
                        >
                          <option value="" disabled selected hidden>{t('bookingSection.experiencePlaceholder')}</option>
                          {experienceKeys.map((key) => (
                            <option key={key} value={t(`bookingSection.experiences.${key}`)}>
                              {t(`bookingSection.experiences.${key}`)}
                            </option>
                          ))}
                        </select>
                        <MapPin className="absolute top-3 right-4 text-accent-color/70" size={20} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      {t('bookingSection.messageLabel')}
                    </label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full bg-dark-bg/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-color/50 focus:border-accent-color/50 transition-all resize-none"
                      placeholder={t('bookingSection.messagePlaceholder')}
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button 
                      type="submit"
                      className="bg-accent-color hover:bg-accent-color/90 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 flex items-center shadow-glow-sm min-w-[200px] justify-center"
                    >
                      <Clock size={18} className="mr-2" />
                      <span>{t('bookingSection.submitButton')}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 