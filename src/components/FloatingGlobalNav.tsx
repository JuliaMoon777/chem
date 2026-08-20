import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface NavSectionItem {
  id: string;
  targetId: string;
  label: Record<Language, string>;
  index: string;
}

const NAV_SECTIONS: NavSectionItem[] = [
  {
    id: 'hero',
    targetId: 'hero-screen-viewport',
    label: { PL: 'Start', EN: 'Start', DE: 'Start', UA: 'Початок' },
    index: '01',
  },
  {
    id: 'about',
    targetId: 'company-discovery-section',
    label: { PL: 'O firmie', EN: 'About us', DE: 'Über uns', UA: 'Про нас' },
    index: '02',
  },
  {
    id: 'competencies',
    targetId: 'competencies-section',
    label: { PL: 'Kompetencje', EN: 'Competencies', DE: 'Kompetenzen', UA: 'Компетенції' },
    index: '03',
  },
  {
    id: 'facilities',
    targetId: 'zaplecze-technologiczne',
    label: { PL: 'Zaplecze', EN: 'Facilities', DE: 'Ausstattung', UA: 'База' },
    index: '04',
  },
  {
    id: 'process',
    targetId: 'od-projektu-do-uruchomienia',
    label: { PL: 'Proces', EN: 'Process', DE: 'Prozess', UA: 'Процес' },
    index: '05',
  },
  {
    id: 'realizations',
    targetId: 'realizacje',
    label: { PL: 'Realizacje', EN: 'Realizations', DE: 'Referenzen', UA: 'Об’єкти' },
    index: '06',
  },
  {
    id: 'certificates',
    targetId: 'certyfikaty-jakosc',
    label: { PL: 'Certyfikaty', EN: 'Certificates', DE: 'Zertifikate', UA: 'Сертифікати' },
    index: '07',
  },
  {
    id: 'locations',
    targetId: 'oddzialy-lokalizacje',
    label: { PL: 'Oddziały', EN: 'Locations', DE: 'Standorte', UA: 'Філії' },
    index: '08',
  },
  {
    id: 'contact',
    targetId: 'kontakt-cta',
    label: { PL: 'Kontakt', EN: 'Contact', DE: 'Kontakt', UA: 'Контакти' },
    index: '09',
  },
];

interface FloatingGlobalNavProps {
  currentLang: Language;
}

export const FloatingGlobalNav: React.FC<FloatingGlobalNavProps> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);
  const [isUserIdle, setIsUserIdle] = useState<boolean>(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerButtonRef = useRef<HTMLButtonElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Scroll Progress & Active Section Tracker via ScrollTrigger and scroll events
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScrollable > 0 ? Math.min(Math.max(currentScroll / totalScrollable, 0), 1) : 0;
      setScrollProgress(progress);

      // Hero visibility check (first 35% of hero screen)
      const heroEl = document.getElementById('hero-screen-viewport');
      if (heroEl) {
        const heroHeight = heroEl.offsetHeight;
        setIsHeroVisible(currentScroll < heroHeight * 0.35);
      } else {
        setIsHeroVisible(currentScroll < 250);
      }

      // Reset idle timer on active scrolling
      setIsUserIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsUserIdle(true);
      }, 3500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Reset idle timer on mouse movement / touch
    const handleInteraction = () => {
      setIsUserIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsUserIdle(true);
      }, 3500);
    };

    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // 2. Active Section Detection with GSAP ScrollTrigger
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    NAV_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.targetId);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveSectionId(section.id),
          onEnterBack: () => setActiveSectionId(section.id),
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // 3. Desktop Panel Expansion Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (isOpen) {
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, scale: 0.94, x: 10 },
          { opacity: 1, scale: 1, x: 0, duration: 0.38, ease: 'power2.out' }
        );
      }
      if (itemsContainerRef.current) {
        gsap.fromTo(
          itemsContainerRef.current.children,
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.32, stagger: 0.035, ease: 'power2.out', delay: 0.05 }
        );
      }
    }
  }, [isOpen]);

  // 4. Keyboard Navigation (Escape key to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        if (window.innerWidth >= 1024) {
          triggerButtonRef.current?.focus();
        } else {
          mobileTriggerButtonRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Smooth scroll handler
  const handleSelectSection = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const activeSection = NAV_SECTIONS.find((s) => s.id === activeSectionId) || NAV_SECTIONS[0];

  return (
    <>
      {/* =========================================================================
          DESKTOP & TABLET: FLOATING TRANSLUCENT RIGHT-SIDE CAPSULE & DOCK
          Position: Fixed on right, vertically centered (z-index 45)
          Soft translucent capsule, organic rounded curves, subtle scroll progress
      ========================================================================= */}
      <div
        ref={navContainerRef}
        className={`hidden md:flex fixed right-5 lg:right-7 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-auto select-none transition-all duration-500 ease-out ${
          isHeroVisible ? 'opacity-0 translate-x-4 pointer-events-none' : isUserIdle && !isOpen ? 'opacity-60 hover:opacity-100' : 'opacity-100'
        }`}
        aria-label="Nawigacja po sekcjach"
      >
        {/* EXPANDED DESKTOP DOCK PANEL */}
        {isOpen && (
          <div
            ref={panelRef}
            className="mb-3 w-56 lg:w-64 p-3.5 rounded-[28px] bg-[#FAF9F5]/90 backdrop-blur-xl border border-slate-900/[0.07] shadow-[0_16px_40px_-12px_rgba(15,23,42,0.12),0_0_0_1px_rgba(255,255,255,0.7)_inset] transition-all origin-bottom-right"
            role="dialog"
            aria-modal="false"
            aria-label="Menu nawigacji"
          >
            {/* Header of Dock */}
            <div className="flex items-center justify-between px-3 pt-1 pb-2.5 mb-1.5 border-b border-slate-200/70 text-[10px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
              <span>NAWIGACJA</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
                aria-label="Zamknij menu"
              >
                ✕
              </button>
            </div>

            {/* List of Sections */}
            <div ref={itemsContainerRef} className="space-y-0.5 max-h-[60vh] overflow-y-auto pr-1">
              {NAV_SECTIONS.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSelectSection(section.targetId)}
                    className={`w-full group flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-slate-900/[0.04] text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-900/[0.02] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-red-600 scale-125 shadow-[0_0_8px_rgba(220,38,38,0.5)]'
                            : 'bg-slate-300 group-hover:bg-slate-400'
                        }`}
                      />
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {section.label[currentLang]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* COLLAPSED FLOATING CAPSULE BUTTON */}
        <button
          ref={triggerButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-[#FAF9F5]/90 backdrop-blur-xl border border-slate-900/[0.08] shadow-[0_8px_24px_-6px_rgba(15,23,42,0.1),0_0_0_1px_rgba(255,255,255,0.8)_inset] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.14)] hover:bg-[#FAF9F5] transition-all duration-300 cursor-pointer ${
            isOpen ? 'ring-2 ring-red-500/20' : ''
          }`}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Zamknij menu nawigacji' : 'Otwórz menu nawigacji'}
        >
          {/* Subtle Vertical Scroll Progress Line */}
          <div className="relative w-1 h-5 bg-slate-200/80 rounded-full overflow-hidden flex flex-col justify-end">
            <div
              className="w-full bg-red-600 rounded-full transition-all duration-150 ease-out"
              style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          {/* Active section label snippet or MENU */}
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono font-bold tracking-[0.18em] text-slate-400 uppercase leading-none">
              {isOpen ? 'ZAMKNIJ' : 'SEKCJA'}
            </span>
            <span className="text-xs font-semibold text-slate-800 tracking-tight leading-tight transition-colors group-hover:text-red-600">
              {isOpen ? '✕' : activeSection.label[currentLang]}
            </span>
          </div>

          {/* Three minimal dots / icon */}
          <div className="flex flex-col gap-0.5 items-center justify-center pl-1 text-slate-400 group-hover:text-slate-700 transition-colors">
            <span className={`w-1 h-1 rounded-full ${isOpen ? 'bg-red-600' : 'bg-current'} transition-colors`} />
            <span className={`w-1 h-1 rounded-full ${isOpen ? 'bg-red-600' : 'bg-current'} transition-colors`} />
            <span className={`w-1 h-1 rounded-full ${isOpen ? 'bg-red-600' : 'bg-current'} transition-colors`} />
          </div>
        </button>
      </div>

      {/* =========================================================================
          MOBILE: FLOATING TRANSLUCENT BOTTOM CAPSULE & EXPANDING SHEET
          Position: Bottom center floating pill (16px above bottom safe area)
      ========================================================================= */}
      <div
        className={`md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none transition-all duration-400 ${
          isHeroVisible ? 'opacity-0 translate-y-4 pointer-events-none' : isUserIdle && !isOpen ? 'opacity-70' : 'opacity-100'
        }`}
      >
        <button
          ref={mobileTriggerButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#FAF9F5]/92 backdrop-blur-xl border border-slate-900/[0.08] shadow-[0_10px_30px_-6px_rgba(15,23,42,0.16),0_0_0_1px_rgba(255,255,255,0.8)_inset] active:scale-98 transition-transform cursor-pointer"
          aria-expanded={isOpen}
          aria-label="Otwórz nawigację sekcji"
        >
          {/* Scroll progress ring */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            <svg className="w-4 h-4 -rotate-90" viewBox="0 0 20 20">
              <circle
                cx="10"
                cy="10"
                r="8"
                className="stroke-slate-200"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="10"
                cy="10"
                r="8"
                className="stroke-red-600"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={50.26}
                strokeDashoffset={50.26 * (1 - scrollProgress)}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 tracking-tight">
              {activeSection.label[currentLang]}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              {isOpen ? 'Zamknij' : 'Menu'}
            </span>
          </div>

          <span className="text-xs text-slate-400">
            {isOpen ? '✕' : '↑↓'}
          </span>
        </button>
      </div>

      {/* MOBILE EXPANDED NAVIGATION SHEET (Floating upward with large rounded corners) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end pointer-events-auto">
          {/* Backdrop Tap Area */}
          <div
            className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Sheet Content */}
          <div
            ref={mobileSheetRef}
            className="relative w-full max-w-md mx-auto bg-[#FAF9F5]/96 backdrop-blur-2xl rounded-t-[32px] border-t border-x border-slate-900/[0.08] shadow-[0_-20px_50px_-10px_rgba(15,23,42,0.18)] p-6 pb-8 max-h-[75vh] flex flex-col will-change-transform animate-in slide-in-from-bottom duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Nawigacja mobilna"
          >
            {/* Top Sheet Grab Handle */}
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/80 text-xs font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
              <span>PRZEJDŹ DO SEKCJI</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-200/50 text-slate-600 active:scale-95"
                aria-label="Zamknij menu"
              >
                ✕
              </button>
            </div>

            {/* Touch-Friendly Vertical List */}
            <div className="space-y-1 overflow-y-auto overscroll-contain py-1">
              {NAV_SECTIONS.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSelectSection(section.targetId)}
                    className={`w-full min-h-[48px] flex items-center justify-between px-4 py-2.5 rounded-2xl text-left transition-all active:scale-[0.98] ${
                      isActive
                        ? 'bg-slate-900/[0.06] text-slate-950 font-bold'
                        : 'text-slate-700 hover:bg-slate-900/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full transition-all ${
                          isActive
                            ? 'bg-red-600 scale-125 shadow-[0_0_8px_rgba(220,38,38,0.6)]'
                            : 'bg-slate-300'
                        }`}
                      />
                      <span className="text-sm tracking-tight">
                        {section.label[currentLang]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingGlobalNav;
