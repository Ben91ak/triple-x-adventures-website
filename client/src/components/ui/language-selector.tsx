import { useState } from "react";
import { Check, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useTranslation } from "@/translations";

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const t = useTranslation(language);
  
  // Flag emojis for each language
  const flags = {
    en: "🇬🇧",
    de: "🇩🇪",
    sv: "🇸🇪"
  };
  
  const languages = [
    { code: "en", label: t.language.en, flag: flags.en },
    { code: "de", label: t.language.de, flag: flags.de },
    { code: "sv", label: t.language.sv, flag: flags.sv },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "group flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-secondary-text bg-card-bg/40 hover:bg-card-bg/80 rounded-lg border border-white/5 hover:border-white/10 transition-all",
            className
          )}
        >
          <div className="relative">
            <Globe className="h-4 w-4 text-accent-color group-hover:scale-110 transition-transform" />
            <div className="absolute h-2 w-2 rounded-full bg-accent-color -right-1 -top-1 scale-0 group-hover:scale-100 transition-transform"></div>
          </div>
          
          <div className="flex items-center">
            <span className="hidden sm:inline ml-1 mr-1">{languages.find(lang => lang.code === language)?.label}</span>
            <span className="inline sm:hidden uppercase">{language}</span>
            <ChevronDown className="h-3 w-3 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        sideOffset={8}
        className="w-48 bg-card-bg/95 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-1.5 text-primary-text animate-in zoom-in-95 duration-100"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code as Language);
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between py-2.5 px-3 rounded-md cursor-pointer",
              language === lang.code 
                ? "bg-accent-color/10 text-accent-color border-l-2 border-accent-color" 
                : "hover:bg-white/5 border-l-2 border-transparent"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-base mr-1">{lang.flag}</span>
              <span className="uppercase text-xs font-semibold opacity-70">{lang.code}</span>
              <span className="font-medium">{lang.label}</span>
            </div>
            {language === lang.code && (
              <div className="h-5 w-5 rounded-full bg-accent-color/10 flex items-center justify-center">
                <Check className="h-3 w-3" />
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}