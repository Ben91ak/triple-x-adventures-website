import { useState, useEffect, useRef } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslation(language);
  
  // Effect to remove focus from the button when language changes
  useEffect(() => {
    // Remove focus from any active element
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
    
    // Also directly blur our button if it exists
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
  }, [language]);
  
  // Flag emojis for each language
  const flags = {
    en: "🇬🇧",
    de: "🇩🇪",
    sv: "🇸🇪"
  };
  
  // Flag colors for glow effects - these match the dominant colors of each flag
  const flagColors = {
    en: {
      primary: "#012169", // Deep blue
      secondary: "#C8102E", // Red
      tertiary: "#FFFFFF", // White
    },
    de: {
      primary: "#000000", // Black
      secondary: "#DD0000", // Red
      tertiary: "#FFCE00", // Gold
    },
    sv: {
      primary: "#006AA7", // Blue
      secondary: "#FECC00", // Yellow
      tertiary: "#FFFFFF", // White
    },
  };
  
  const languages = [
    { code: "en", label: t.language.en, flag: flags.en },
    { code: "de", label: t.language.de, flag: flags.de },
    { code: "sv", label: t.language.sv, flag: flags.sv },
  ];

  // Helper function to convert hex color to RGB values
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 };
  };

  // Create CSS variables for the glow animation
  const primaryRgb = hexToRgb(flagColors[language as Language].primary);
  const secondaryRgb = hexToRgb(flagColors[language as Language].secondary);
  
  const buttonStyle = {
    '--flag-primary': flagColors[language as Language].primary,
    '--flag-secondary': flagColors[language as Language].secondary,
    '--flag-tertiary': flagColors[language as Language].tertiary,
    '--flag-primary-rgb': `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`,
    '--flag-secondary-rgb': `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`,
  } as React.CSSProperties;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div
          ref={buttonRef}
          style={buttonStyle}
          className={cn(
            "relative group inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg",
            "transition-all duration-300 cursor-pointer",
            "border-[1px] border-[rgba(var(--flag-primary-rgb),0.4)]",
            "shadow-[0_0_10px_rgba(var(--flag-primary-rgb),0.1)]",
            "hover:shadow-[0_0_15px_rgba(var(--flag-secondary-rgb),0.2)]",
            "backdrop-filter backdrop-blur-[2px]",
            "focus:outline-none",
            className
          )}
        >
          <div className="relative">
            <Globe 
              className="h-4 w-4 group-hover:scale-110 transition-transform" 
              style={{ color: flagColors[language as Language].secondary }}
            />
            <div className="absolute h-2 w-2 rounded-full bg-[var(--flag-secondary)] -right-1 -top-1 scale-0 group-hover:scale-100 transition-transform"></div>
          </div>
          
          <div className="flex items-center">
            <span 
              className="hidden sm:inline ml-1 mr-1 text-transparent font-medium bg-gradient-to-r from-[var(--flag-primary)] via-[var(--flag-secondary)] to-[var(--flag-tertiary)] bg-clip-text animate-[glow-text_3s_ease_infinite] will-change-opacity" 
              style={{ 
                WebkitBackgroundClip: "text",
                backgroundSize: "200% auto",
                textShadow: "0 0 5px rgba(255,255,255,0.1)" 
              }}
            >
              {languages.find(lang => lang.code === language)?.label}
            </span>
            <span 
              className="inline sm:hidden uppercase font-bold text-transparent bg-gradient-to-r from-[var(--flag-primary)] via-[var(--flag-secondary)] to-[var(--flag-tertiary)] bg-clip-text animate-[glow-text_3s_ease_infinite] will-change-opacity" 
              style={{ 
                WebkitBackgroundClip: "text",
                backgroundSize: "200% auto",
                textShadow: "0 0 5px rgba(255,255,255,0.1)" 
              }}
            >
              {language}
            </span>
            <ChevronDown 
              className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" 
              style={{ color: flagColors[language as Language].secondary }}
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        sideOffset={8}
        className="w-48 bg-card-bg/95 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-1.5 text-primary-text animate-in zoom-in-95 duration-100"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={(e) => {
              e.currentTarget.blur(); // Remove focus state immediately
              setLanguage(lang.code as Language);
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between py-2.5 px-3 rounded-md cursor-pointer transition-all duration-200",
              "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
              language === lang.code 
                ? `bg-opacity-10 border-l-2 text-white` 
                : "hover:bg-white/5 border-l-2 border-transparent"
            )}
            style={language === lang.code ? {
              backgroundColor: `${flagColors[lang.code as Language].secondary}20`,
              borderLeftColor: flagColors[lang.code as Language].secondary,
            } : {}}
          >
            <div className="flex items-center gap-2">
              <span className="text-base mr-1">{lang.flag}</span>
              <span className="uppercase text-xs font-semibold opacity-70">{lang.code}</span>
              <span className="font-medium">{lang.label}</span>
            </div>
            {language === lang.code && (
              <div 
                className="h-5 w-5 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${flagColors[lang.code as Language].primary}30`,
                }}
              >
                <Check 
                  className="h-3 w-3" 
                  style={{
                    color: flagColors[lang.code as Language].secondary
                  }}
                />
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}