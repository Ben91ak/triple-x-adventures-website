import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";
import { GlobalBackground } from "@/components/layout/background-fixed";

export default function NotFound() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen w-full relative">
      {/* Enhanced starry night background with purple color scheme */}
      <GlobalBackground colorScheme="purple" starDensity="dense" />
      
      {/* Content with proper z-index */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 glass-card backdrop-blur-sm" style={{ backgroundColor: 'rgba(26, 29, 31, 0.7)' }}>
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-accent-color" />
              <h1 className="text-2xl font-bold text-white">{t.notFound.title}</h1>
            </div>

            <p className="mt-4 text-sm text-gray-200 mb-6">
              {t.notFound.message}
            </p>
            
            <Link href="/">
              <a className="inline-block bg-accent-color text-white font-semibold py-2 px-4 rounded hover:bg-opacity-90 transition">
                {t.notFound.returnHome}
              </a>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
