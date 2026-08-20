import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations } from '../types';
import { ChemorozruchLogo } from './ChemorozruchLogo';

gsap.registerPlugin(ScrollTrigger);

interface IndustrialFooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const IndustrialFooter: React.FC<IndustrialFooterProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const t = translations[currentLang].footer;
  const languages: Language[] = ['PL', 'EN', 'DE', 'UA'];

  const footerRef = useRef<HTMLElement>(null);
  const topDividerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  // Smooth scroll helper for anchor navigation
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!footerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // 1. Top thin divider expanding across
      if (topDividerRef.current) {
        tl.fromTo(
          topDividerRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }
        );
      }

      // 2. Top brand row fade in
      if (topRowRef.current) {
        tl.fromTo(
          topRowRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.35'
        );
      }

      // 3. Grid Columns stagger
      if (gridRef.current) {
        const columns = gridRef.current.children;
        tl.fromTo(
          columns,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
          '-=0.2'
        );
      }

      // 4. Watermark and bottom legal bar
      if (watermarkRef.current) {
        tl.fromTo(
          watermarkRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power1.out' },
          '-=0.2'
        );
      }

      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.4'
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, [currentLang]);

  return (
    <footer
      ref={footerRef}
      id="main-footer"
      className="relative w-full bg-[#FAF9F5] text-slate-900 pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-14 border-t border-slate-200/90 overflow-hidden select-none"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Animated Top Sub-Divider */}
        <div
          ref={topDividerRef}
          className="w-full h-px bg-slate-200 mb-10 sm:mb-14 will-change-transform"
        />

        {/* TOP ROW: Brand Identity (Left) + Language Selector (Right) */}
        <div
          ref={topRowRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 sm:pb-12 border-b border-slate-200/80"
        >
          {/* Left: Logo & Company Heading */}
          <div
            onClick={scrollToTop}
            className="flex items-center gap-3.5 cursor-pointer group select-none inline-flex"
            aria-label="CHEMOROZRUCH - Przejdź na górę strony"
          >
            <div className="w-9 h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <ChemorozruchLogo className="w-full h-full" iconOnly={true} />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-black text-lg sm:text-xl tracking-tight text-slate-950 leading-tight">
                {t.companyName}
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">
                {t.companySub}
              </span>
            </div>
          </div>

          {/* Right: Language Switcher PL / EN / DE / UA */}
          <div className="flex items-center gap-1 self-start sm:self-center bg-slate-200/60 p-1 rounded-md border border-slate-300/40">
            {languages.map((lang) => {
              const isActive = currentLang === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-3 py-1 text-xs font-mono font-bold tracking-wider rounded transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-red-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
                  aria-label={`Zmień język na ${lang}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN 4 BALANCED RESPONSIVE COLUMNS (Adaptive for Mobile, Tablet, Laptop, and Ultrawide) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pt-10 sm:pt-14 pb-14 sm:pb-16 border-b border-slate-200/70"
        >
          
          {/* COLUMN 1: KONTAKT (Main Verified Details) (Span 4 on desktop) */}
          <div className="lg:col-span-4 space-y-3.5 pr-0 lg:pr-6">
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase block mb-3">
              {t.columns.contactTitle}
            </span>

            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-0.5">
                  {t.columns.hqLabel}
                </span>
                <p className="font-semibold text-slate-900 leading-snug">
                  {t.columns.address}
                </p>
              </div>

              <div className="pt-0.5">
                <span className="text-xs font-mono text-slate-400 block mb-0.5">
                  Telefon
                </span>
                <a
                  href={`tel:${t.columns.phone.replace(/\s+/g, '')}`}
                  className="group inline-flex items-center gap-1 text-slate-900 font-bold hover:text-red-600 transition-colors"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {t.columns.phone}
                  </span>
                </a>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 block mb-0.5">
                  E-mail
                </span>
                <a
                  href={`mailto:${t.columns.email}`}
                  className="group inline-flex items-center gap-1 text-slate-900 font-bold hover:text-red-600 transition-colors"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {t.columns.email}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: NAWIGACJA — CZĘŚĆ 1 (Span 3 on desktop) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase block mb-3">
              {t.columns.navTitle}
            </span>

            <nav className="flex flex-col space-y-2.5 text-sm">
              <a
                href="#company-discovery-section"
                onClick={(e) => scrollToSection(e, 'company-discovery-section')}
                className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {t.columns.navLinks.about}
                </span>
              </a>

              <a
                href="#competencies-section"
                onClick={(e) => scrollToSection(e, 'competencies-section')}
                className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {t.columns.navLinks.competencies}
                </span>
              </a>

              <a
                href="#tech-facilities-section"
                onClick={(e) => scrollToSection(e, 'tech-facilities-section')}
                className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {t.columns.navLinks.facilities}
                </span>
              </a>

              <a
                href="#process-section"
                onClick={(e) => scrollToSection(e, 'process-section')}
                className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {t.columns.navLinks.process}
                </span>
              </a>
            </nav>
          </div>

          {/* COLUMN 3: NAWIGACJA — CZĘŚĆ 2 / REALIZACJE & ODDZIAŁY (Span 3 on desktop) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase block mb-3">
              {currentLang === 'PL' ? 'STRUKTURA' : currentLang === 'EN' ? 'PORTFOLIO' : currentLang === 'DE' ? 'STRUKTUR' : 'ПОРТФОЛІО'}
            </span>

            <nav className="flex flex-col space-y-2.5 text-sm">
              <a
                href="#realizations-section"
                onClick={(e) => scrollToSection(e, 'realizations-section')}
                className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {t.columns.navLinks.realizations}
                </span>
              </a>

              <a
                href="#certificates-quality-section"
                onClick={(e) => scrollToSection(e, 'certificates-quality-section')}
                className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {t.columns.navLinks.certificates}
                </span>
              </a>

              <a
                href="#oddzialy-lokalizacje"
                onClick={(e) => scrollToSection(e, 'oddzialy-lokalizacje')}
                className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {t.columns.navLinks.locations}
                </span>
              </a>

              <a
                href="#kontakt-cta"
                onClick={(e) => scrollToSection(e, 'kontakt-cta')}
                className="group inline-flex items-center text-slate-900 font-bold hover:text-red-600 transition-colors pt-0.5"
              >
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {t.columns.navLinks.contact} →
                </span>
              </a>
            </nav>
          </div>

          {/* COLUMN 4: INFORMACJE & LEGAL (Span 2 on desktop) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase block mb-3">
              {t.columns.infoTitle}
            </span>

            <ul className="space-y-2.5 text-sm text-slate-700">
              <li>
                <span className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors cursor-pointer">
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {t.columns.privacy}
                  </span>
                </span>
              </li>
              <li>
                <span className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors cursor-pointer">
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {t.columns.rodo}
                  </span>
                </span>
              </li>
              <li>
                <span className="group inline-flex items-center text-slate-700 hover:text-red-600 transition-colors cursor-pointer">
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {t.columns.whistleblower}
                  </span>
                </span>
              </li>
              <li className="pt-1">
                <a
                  href="https://www.linkedin.com/company/chemorozruch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-slate-800 font-bold hover:text-red-600 transition-colors"
                >
                  <svg className="w-4 h-4 text-slate-500 group-hover:text-red-600 transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    {t.columns.linkedin}
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* LARGE SUBTLE EDITORIAL WORDMARK (Clean Responsive SVG Text — never clips, perfectly scales across all screen widths) */}
        <div
          ref={watermarkRef}
          className="w-full overflow-hidden py-6 sm:py-8 pointer-events-none select-none flex justify-center"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1200 130"
            className="w-full h-auto max-h-20 sm:max-h-28 lg:max-h-36 text-slate-900/[0.04]"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-poppins font-black text-[130px] tracking-tight fill-current"
            >
              CHEMOROZRUCH
            </text>
          </svg>
        </div>

        {/* BOTTOM BAR: Copyright (Left) & Back To Top (Right) */}
        <div
          ref={bottomBarRef}
          className="pt-6 sm:pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500"
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} {t.copyright}
            </span>
            <span>•</span>
            <span>{t.allRightsReserved}</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-slate-600 hover:text-slate-950 font-bold transition-colors cursor-pointer py-1.5 px-3 rounded-md hover:bg-slate-200/50"
            aria-label="Przewiń na początek strony"
          >
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
              ↑
            </span>
            <span>{t.backToTop}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default IndustrialFooter;
