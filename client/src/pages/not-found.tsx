import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

export default function NotFound() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">{t.notFound.title}</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 mb-6">
            {t.notFound.message}
          </p>
          
          <Link href="/">
            <a className="inline-block bg-midnight text-white font-montserrat font-semibold py-2 px-4 rounded hover:bg-opacity-90 transition">
              {t.notFound.returnHome}
            </a>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
