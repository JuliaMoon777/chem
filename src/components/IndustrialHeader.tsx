import React, { useState, useEffect } from 'react';
import { Language, translations } from '../types';
import { ChemorozruchLogo } from './ChemorozruchLogo';
import { ArrowUpRight } from 'lucide-react';

interface IndustrialHeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenInquiry: () => void;
}

export const IndustrialHeader: React.FC<IndustrialHeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenInquiry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const t = translations[currentLang];
  const languages: Language[] = ['PL', 'EN', 'DE', 'UA'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-industrial-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3 sm:py-3.5'
          : 'bg-gradient-to-b from-white/90 via-white/50 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Left: Logo + Company Name + Subtitle */}
        <div
          id="header-brand"
          className="flex items-center gap-3 sm:gap-3.5 cursor-pointer group select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <ChemorozruchLogo className="w-full h-full" iconOnly={true} />
          </div>
          <div className="flex flex-col">
            <span className="font-poppins font-black text-base sm:text-lg tracking-tight text-zinc-900 leading-tight">
              CHEMOROZRUCH
            </span>
            <span className="text-[11px] sm:text-xs text-zinc-600 font-medium tracking-wide">
              {t.header.companySub}
            </span>
          </div>
        </div>

        {/* Right: Language Selector + CTA Button */}
        <div id="header-right-actions" className="flex items-center gap-3 sm:gap-6">
          {/* Simple Language Selector: PL / EN / DE / UA */}
          <nav
            id="header-language-selector"
            aria-label="Language selection"
            className="flex items-center gap-0.5 sm:gap-1 text-xs font-semibold text-zinc-600"
          >
            {languages.map((lang, index) => {
              const isActive = currentLang === lang;
              return (
                <React.Fragment key={lang}>
                  <button
                    id={`lang-btn-${lang.toLowerCase()}`}
                    onClick={() => onLanguageChange(lang)}
                    className={`px-1.5 sm:px-2 py-1 rounded transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'text-red-600 font-bold'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {lang}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-zinc-300 select-none text-[10px]">/</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* One CTA button: Wyślij zapytanie */}
          <button
            id="header-inquiry-btn"
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-sm shadow-red-500/20 hover:shadow-md hover:shadow-red-500/30 transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            <span>{t.header.inquiryBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default IndustrialHeader;
