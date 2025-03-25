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
  
  const languages = [
    { code: "en", label: t.language.en },
    { code: "de", label: t.language.de },
    { code: "sv", label: t.language.sv },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-secondary-text bg-transparent hover:bg-white/5 rounded-lg border border-divider-color transition-colors",
            className
          )}
        >
          <Globe className="h-4 w-4 text-accent-color" />
          <span className="hidden sm:inline">{languages.find(lang => lang.code === language)?.label}</span>
          <span className="inline sm:hidden uppercase">{language}</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 bg-card-bg border border-divider-color shadow-xl rounded-lg p-1 text-primary-text"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code as Language);
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer",
              language === lang.code 
                ? "bg-accent-color/10 text-accent-color" 
                : "hover:bg-white/5"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="uppercase text-xs font-medium opacity-70">{lang.code}</span>
              <span>{lang.label}</span>
            </div>
            {language === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}