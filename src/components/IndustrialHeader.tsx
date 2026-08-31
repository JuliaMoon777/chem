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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-safe ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-2.5 sm:py-3.5'
          : 'bg-gradient-to-b from-white/95 via-white/70 to-transparent py-3 sm:py-5 lg:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-10 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Logo + Company Name + Subtitle */}
        <div
          id="header-brand"
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none flex-shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <ChemorozruchLogo className="w-full h-full" iconOnly={true} />
          </div>
          <div className="flex flex-col">
            <span className="font-poppins font-black text-sm sm:text-lg tracking-tight text-zinc-900 leading-tight">
              CHEMOROZRUCH
            </span>
            <span className="text-[10px] sm:text-xs text-zinc-600 font-medium tracking-wide hidden xs:inline-block">
              {t.header.companySub}
            </span>
          </div>
        </div>

        {/* Center: Desktop Quick Section Navigation (O firmie, Oferta, Certyfikaty, Realizacje, Kontakt) */}
        <nav
          aria-label="Główna nawigacja"
          className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-xs"
        >
          {[
            { id: 'company-discovery-section', label: { PL: 'O firmie', EN: 'About', DE: 'Über uns', UA: 'Про нас' } },
            { id: 'competencies-section', label: { PL: 'Oferta', EN: 'Offer', DE: 'Angebot', UA: 'Послуги' } },
            { id: 'certyfikaty-jakosc', label: { PL: 'Certyfikaty', EN: 'Certificates', DE: 'Zertifikate', UA: 'Сертифікати' } },
            { id: 'realizacje', label: { PL: 'Realizacje', EN: 'Realizations', DE: 'Referenzen', UA: 'Об’єкти' } },
            { id: 'kontakt-cta', label: { PL: 'Kontakt', EN: 'Contact', DE: 'Kontakt', UA: 'Контакти' } },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const elem = document.getElementById(item.id);
                if (elem) {
                  const offset = 75;
                  const pos = elem.getBoundingClientRect().top + window.pageYOffset - offset;
                  window.scrollTo({ top: pos, behavior: 'smooth' });
                }
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-red-600 hover:bg-slate-100/80 rounded-full transition-all duration-150"
            >
              {item.label[currentLang]}
            </a>
          ))}
        </nav>

        {/* Right: Language Selector + CTA Button */}
        <div id="header-right-actions" className="flex items-center gap-1.5 sm:gap-4 lg:gap-6 flex-shrink-0">
          {/* Simple Language Selector: PL / EN / DE / UA */}
          <nav
            id="header-language-selector"
            aria-label="Language selection"
            className="flex items-center gap-0.5 sm:gap-1 text-xs font-semibold text-zinc-600 bg-white/70 sm:bg-transparent px-1 sm:px-0 py-0.5 sm:py-0 rounded-full border sm:border-0 border-slate-200/60"
          >
            {languages.map((lang, index) => {
              const isActive = currentLang === lang;
              return (
                <React.Fragment key={lang}>
                  <button
                    id={`lang-btn-${lang.toLowerCase()}`}
                    onClick={() => onLanguageChange(lang)}
                    className={`min-h-[32px] min-w-[26px] sm:min-w-[28px] px-1 sm:px-2 py-1 rounded text-[11px] sm:text-xs transition-colors duration-150 cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'text-red-600 font-bold bg-red-50/80 sm:bg-transparent'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {lang}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-zinc-300 select-none text-[10px] hidden sm:inline">/</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* One CTA button: Wyślij zapytanie */}
          <button
            id="header-inquiry-btn"
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-sm font-semibold tracking-wide text-white min-h-[38px] sm:min-h-[42px] px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-sm shadow-red-500/20 hover:shadow-md hover:shadow-red-500/30 transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
          >
            <span>{t.header.inquiryBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 hidden xs:inline-block" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default IndustrialHeader;
