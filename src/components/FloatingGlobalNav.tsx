import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface NavSectionItem {
  id: string;
  targetId: string;
  label: Record<Language, string>;
}

const NAV_SECTIONS: NavSectionItem[] = [
  {
    id: 'about',
    targetId: 'company-discovery-section',
    label: { PL: 'O firmie', EN: 'About us', DE: 'Über uns', UA: 'Про нас' },
  },
  {
    id: 'competencies',
    targetId: 'competencies-section',
    label: { PL: 'Oferta', EN: 'Offer', DE: 'Angebot', UA: 'Послуги' },
  },
  {
    id: 'certificates',
    targetId: 'certyfikaty-jakosc',
    label: { PL: 'Certyfikaty', EN: 'Certificates', DE: 'Zertifikate', UA: 'Сертифікати' },
  },
  {
    id: 'realizations',
    targetId: 'realizacje',
    label: { PL: 'Realizacje', EN: 'Realizations', DE: 'Referenzen', UA: 'Об’єкти' },
  },
  {
    id: 'contact',
    targetId: 'kontakt-cta',
    label: { PL: 'Kontakt', EN: 'Contact', DE: 'Kontakt', UA: 'Контакти' },
  },
];

interface FloatingGlobalNavProps {
  currentLang: Language;
}

export const FloatingGlobalNav: React.FC<FloatingGlobalNavProps> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('about');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isUserIdle, setIsUserIdle] = useState<boolean>(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerButtonRef = useRef<HTMLButtonElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Scroll Progress & Active Section Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScrollable > 0 ? Math.min(Math.max(currentScroll / totalScrollable, 0), 1) : 0;
      setScrollProgress(progress);

      // Reset idle timer on active scrolling
      setIsUserIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsUserIdle(true);
      }, 4000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Reset idle timer on interaction
    const handleInteraction = () => {
      setIsUserIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsUserIdle(true);
      }, 4000);
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
          { opacity: 1, scale: 1, x: 0, duration: 0.35, ease: 'power2.out' }
        );
      }
      if (itemsContainerRef.current) {
        gsap.fromTo(
          itemsContainerRef.current.children,
          { opacity: 0, x: 8 },
          { opacity: 1, x: 0, duration: 0.28, stagger: 0.04, ease: 'power2.out', delay: 0.04 }
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
      const headerOffset = 75;
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
          Position: Fixed on right, vertically centered (Available from 1st screen)
      ========================================================================= */}
      <div
        ref={navContainerRef}
        className={`hidden md:flex fixed right-5 lg:right-7 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-auto select-none transition-all duration-400 ease-out ${
          isUserIdle && !isOpen ? 'opacity-70 hover:opacity-100' : 'opacity-100'
        }`}
        aria-label="Szybka nawigacja po sekcjach"
      >
        {/* EXPANDED DESKTOP DOCK PANEL */}
        {isOpen && (
          <div
            ref={panelRef}
            className="mb-3 w-56 lg:w-60 p-3 rounded-[24px] bg-[#FAF9F5]/95 backdrop-blur-xl border border-slate-900/[0.1] shadow-[0_20px_45px_-12px_rgba(15,23,42,0.18),0_0_0_1px_rgba(255,255,255,0.8)_inset] transition-all origin-bottom-right"
            role="dialog"
            aria-modal="false"
            aria-label="Menu nawigacji"
          >
            {/* Header of Dock */}
            <div className="flex items-center justify-between px-3 pt-1 pb-2 mb-1.5 border-b border-slate-200/80 text-[10px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
              <span>SZYBKIE MENU</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
                aria-label="Zamknij menu"
              >
                ✕
              </button>
            </div>

            {/* List of 5 Required Sections */}
            <div ref={itemsContainerRef} className="space-y-1">
              {NAV_SECTIONS.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSelectSection(section.targetId)}
                    className={`w-full group flex items-center px-3.5 py-2.5 rounded-xl text-left text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-slate-900/[0.06] text-slate-950 font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-900/[0.03] font-medium'
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
          className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-[#FAF9F5]/92 backdrop-blur-xl border border-slate-900/[0.1] shadow-[0_8px_24px_-6px_rgba(15,23,42,0.14),0_0_0_1px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.2)] hover:bg-[#FAF9F5] transition-all duration-300 cursor-pointer ${
            isOpen ? 'ring-2 ring-red-500/30' : ''
          }`}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Zamknij menu nawigacji' : 'Otwórz menu nawigacji'}
        >
          {/* Subtle Vertical Scroll Progress Line */}
          <div className="relative w-1 h-5 bg-slate-200/90 rounded-full overflow-hidden flex flex-col justify-end">
            <div
              className="w-full bg-red-600 rounded-full transition-all duration-150 ease-out"
              style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          {/* Active section label snippet */}
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono font-bold tracking-[0.18em] text-slate-400 uppercase leading-none">
              {isOpen ? 'ZAMKNIJ' : 'MENU'}
            </span>
            <span className="text-xs font-semibold text-slate-800 tracking-tight leading-tight transition-colors group-hover:text-red-600">
              {isOpen ? '✕' : activeSection.label[currentLang]}
            </span>
          </div>

          {/* Three minimal dots */}
          <div className="flex flex-col gap-0.5 items-center justify-center pl-1 text-slate-400 group-hover:text-slate-700 transition-colors">
            <span className={`w-1 h-1 rounded-full ${isOpen ? 'bg-red-600' : 'bg-current'} transition-colors`} />
            <span className={`w-1 h-1 rounded-full ${isOpen ? 'bg-red-600' : 'bg-current'} transition-colors`} />
            <span className={`w-1 h-1 rounded-full ${isOpen ? 'bg-red-600' : 'bg-current'} transition-colors`} />
          </div>
        </button>
      </div>

      {/* =========================================================================
          MOBILE: FLOATING TRANSLUCENT BOTTOM CAPSULE & EXPANDING SHEET
          Position: Bottom center floating pill (Available from 1st screen)
      ========================================================================= */}
      <div
        className={`md:hidden fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none transition-all duration-400 ${
          isUserIdle && !isOpen ? 'opacity-75' : 'opacity-100'
        }`}
      >
        <button
          ref={mobileTriggerButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#FAF9F5]/95 backdrop-blur-xl border border-slate-900/[0.1] shadow-[0_12px_32px_-6px_rgba(15,23,42,0.2),0_0_0_1px_rgba(255,255,255,0.9)_inset] active:scale-98 transition-transform cursor-pointer"
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

          <span className="text-xs text-slate-400 font-bold">
            {isOpen ? '✕' : '↑↓'}
          </span>
        </button>
      </div>

      {/* MOBILE EXPANDED NAVIGATION SHEET */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end pointer-events-auto">
          {/* Backdrop Tap Area */}
          <div
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Sheet Content */}
          <div
            ref={mobileSheetRef}
            className="relative w-full max-w-md mx-auto bg-[#FAF9F5]/98 backdrop-blur-2xl rounded-t-[32px] border-t border-x border-slate-900/[0.1] shadow-[0_-20px_50px_-10px_rgba(15,23,42,0.22)] p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] max-h-[75vh] flex flex-col will-change-transform animate-in slide-in-from-bottom duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Nawigacja mobilna"
          >
            {/* Top Sheet Grab Handle */}
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/80 text-xs font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
              <span>SZYBKA NAWIGACJA</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-200/60 text-slate-700 active:scale-95"
                aria-label="Zamknij menu"
              >
                ✕
              </button>
            </div>

            {/* Touch-Friendly Vertical List of 5 Sections */}
            <div className="space-y-1.5 overflow-y-auto overscroll-contain py-1">
              {NAV_SECTIONS.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSelectSection(section.targetId)}
                    className={`w-full min-h-[50px] flex items-center px-4 py-3 rounded-2xl text-left transition-all active:scale-[0.98] ${
                      isActive
                        ? 'bg-slate-900/[0.07] text-slate-950 font-bold shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-900/[0.03]'
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
                      <span className="text-sm font-semibold tracking-tight">
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
