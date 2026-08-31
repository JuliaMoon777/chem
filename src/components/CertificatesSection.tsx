import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations, CertificateItem } from '../types';
import siteImages from '../assets/images';

gsap.registerPlugin(ScrollTrigger);

interface CertificatesSectionProps {
  currentLang: Language;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].certificates;
  const standards: CertificateItem[] = t.standards;

  // Single expanded item state (default open first item or null)
  const [expandedId, setExpandedId] = useState<string | null>('iso-9001');

  // References
  const sectionRef = useRef<HTMLElement>(null);
  const introEyebrowRef = useRef<HTMLDivElement>(null);
  const introHeadingRef = useRef<HTMLHeadingElement>(null);
  const introSupportingRef = useRef<HTMLParagraphElement>(null);
  const trustNoteRef = useRef<HTMLDivElement>(null);
  const rowsContainerRef = useRef<HTMLDivElement>(null);

  // Scroll reveal animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // 1. Intro Reveal Timeline
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      if (introEyebrowRef.current) {
        introTl.fromTo(
          introEyebrowRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }

      if (introHeadingRef.current) {
        introTl.fromTo(
          introHeadingRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.25'
        );
      }

      if (introSupportingRef.current) {
        introTl.fromTo(
          introSupportingRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 2. Animate list rows & divider lines with precise stagger
      if (rowsContainerRef.current) {
        const rows = rowsContainerRef.current.querySelectorAll('.cert-row-item');
        const lines = rowsContainerRef.current.querySelectorAll('.cert-divider-line');

        // Staggered row fade in
        gsap.fromTo(
          rows,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.09,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rowsContainerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );

        // Staggered line drawing (width 0 -> 100%)
        gsap.fromTo(
          lines,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.09,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rowsContainerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="certyfikaty-jakosc"
      ref={sectionRef}
      className="relative w-full bg-[#F6F6F3] text-slate-900 overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-slate-200/60"
    >
      {/* Background Architectural Framing Lines (Extremely subtle 3-4% opacity) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-slate-300/40" />
          <div className="w-px h-full bg-slate-300/20 hidden md:block" />
          <div className="w-px h-full bg-slate-300/20 hidden lg:block" />
          <div className="w-px h-full bg-slate-300/40" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* LEFT COLUMN: Section Heading, Intro, Subtle Quality Inspection Element & Trust Note */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Eyebrow */}
              <div ref={introEyebrowRef} className="mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                  {t.eyebrow}
                </span>
              </div>

              {/* Main Heading */}
              <h2
                ref={introHeadingRef}
                className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.14]"
              >
                {t.heading}
              </h2>

              {/* Short Supporting Line */}
              <p
                ref={introSupportingRef}
                className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-md"
              >
                {t.supporting}
              </p>

              {/* One Understated Inspection Photo (Subtle visual proof of testing without dominating) */}
              <div className="mt-8 lg:mt-10 max-w-sm hidden sm:block">
                <div className="aspect-[4/3] rounded-sm overflow-hidden bg-slate-200 border border-slate-300/70 shadow-2xs group">
                  <img
                    src={siteImages.jakoscBadaniaNdt}
                    alt={
                      currentLang === 'PL'
                        ? 'Badania NDT i kontrola jakości spawania'
                        : currentLang === 'EN'
                        ? 'NDT testing and welding quality control'
                        : currentLang === 'DE'
                        ? 'ZfP-Prüfung und Schweißqualitätskontrolle'
                        : 'Неруйнівний контроль NDT та перевірка зварних з’єднань'
                    }
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[25%] contrast-[1.03] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500 font-normal">
                  {currentLang === 'PL'
                    ? 'Badania nieniszczące (NDT) i kontrola jakości spoin'
                    : currentLang === 'EN'
                    ? 'Non-destructive testing (NDT) & weld quality control'
                    : currentLang === 'DE'
                    ? 'Zerstörungsfreie Prüfung (ZfP) & Schweißnahtkontrolle'
                    : 'Неруйнівний контроль (NDT) та перевірка якості зварних швів'}
                </p>
              </div>
            </div>

            {/* Quiet Trust Note at Bottom of Column */}
            <div ref={trustNoteRef} className="mt-10 lg:mt-14 pt-6 border-t border-slate-200/80">
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                {t.trustNote}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Editorial Standards Index with Thin Divider Lines */}
          <div ref={rowsContainerRef} className="col-span-12 lg:col-span-7">
            <div className="space-y-0">
              {/* Top boundary line */}
              <div className="cert-divider-line w-full h-px bg-slate-300/80" />

              {standards.map((cert) => {
                const isExpanded = expandedId === cert.id;

                return (
                  <div key={cert.id} className="cert-row-item group">
                    <div
                      onClick={() => handleToggle(cert.id)}
                      className="py-6 sm:py-7 flex items-center justify-between cursor-pointer select-none transition-all duration-300"
                    >
                      {/* Standard Name & Code */}
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span
                          className={`text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1.5 ${
                            isExpanded ? 'text-slate-950' : 'text-slate-800'
                          }`}
                        >
                          {cert.code}
                        </span>

                        {/* Quiet subtitle on desktop */}
                        <span className="hidden md:inline text-xs font-mono text-slate-400 truncate max-w-xs transition-colors duration-300 group-hover:text-slate-600">
                          // {cert.name}
                        </span>
                      </div>

                      {/* Expanding Trigger Symbol (+ / −) */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                            isExpanded
                              ? 'border-red-600 bg-red-50 text-red-600 rotate-45'
                              : 'border-slate-300 text-slate-500 group-hover:border-red-500 group-hover:text-red-600'
                          }`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Smooth Expandable In-Place Content Panel */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isExpanded ? 'max-h-72 opacity-100 pb-7' : 'max-h-0 opacity-0 pb-0'
                      }`}
                    >
                      <div className="pl-1 sm:pl-2 pr-2 text-slate-600 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          <h4 className="text-sm font-semibold text-slate-900">
                            {cert.name}
                          </h4>
                        </div>

                        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600">
                          {cert.scope}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500 border-t border-slate-200/60">
                          <span className="text-slate-600 font-medium">
                            {cert.authority}
                          </span>
                          <span className="text-slate-400">
                            {cert.normSummary}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Row Divider Line */}
                    <div className="cert-divider-line w-full h-px bg-slate-300/80 transition-colors duration-300 group-hover:bg-slate-400/90" />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
