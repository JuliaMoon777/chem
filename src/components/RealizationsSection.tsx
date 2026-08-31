import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations, RealizationProjectItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface RealizationsSectionProps {
  currentLang: Language;
}

export const RealizationsSection: React.FC<RealizationsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].realizations;
  const projects: RealizationProjectItem[] = t.projects;

  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // References
  const sectionRef = useRef<HTMLElement>(null);
  const introEyebrowRef = useRef<HTMLDivElement>(null);
  const introHeadingRef = useRef<HTMLHeadingElement>(null);
  const introSupportingRef = useRef<HTMLParagraphElement>(null);
  const tabRailRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Simple, non-intrusive entrance animation on scroll into view
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
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
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
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
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  // Keep active index in bounds if language changes
  const activeIndex = Math.min(activeProjectIndex, Math.max(0, projects.length - 1));
  const activeProject = projects[activeIndex] || projects[0];

  const handleSelectTab = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveProjectIndex(index);

    // Scroll only the horizontal tab rail container if the tab is partially offscreen
    const buttonEl = tabButtonRefs.current[index];
    const railEl = tabRailRef.current;
    if (buttonEl && railEl) {
      const buttonLeft = buttonEl.offsetLeft;
      const buttonWidth = buttonEl.offsetWidth;
      const railWidth = railEl.offsetWidth;
      const scrollTarget = buttonLeft - railWidth / 2 + buttonWidth / 2;
      railEl.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex = currentIndex;
    if (e.key === 'ArrowRight') {
      targetIndex = (currentIndex + 1) % projects.length;
    } else if (e.key === 'ArrowLeft') {
      targetIndex = (currentIndex - 1 + projects.length) % projects.length;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = projects.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    handleSelectTab(targetIndex);
    tabButtonRefs.current[targetIndex]?.focus();
  };

  const handleToggleDetails = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="realizacje"
      ref={sectionRef}
      className="relative w-full bg-[#F7F7F3] text-slate-900 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Background Subtle Architectural Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-slate-300/40" />
          <div className="w-px h-full bg-slate-300/25 hidden md:block" />
          <div className="w-px h-full bg-slate-300/25 hidden lg:block" />
          <div className="w-px h-full bg-slate-300/40" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
        {/* 1. INTRO (Clean, Airy Editorial Header) */}
        <div className="max-w-3xl mb-8 lg:mb-10">
          <div ref={introEyebrowRef} className="mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
              {t.eyebrow}
            </span>
          </div>

          <h2
            ref={introHeadingRef}
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-950 tracking-tight leading-[1.15]"
          >
            {t.heading}
          </h2>

          <p
            ref={introSupportingRef}
            className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            {t.supporting}
          </p>
        </div>

        {/* 2. CATEGORY TABS RAIL (Fully interactive, horizontally swipeable on mobile, no page jumps) */}
        <div className="mb-8 lg:mb-10 pb-2 border-b border-slate-200/90">
          <div
            ref={tabRailRef}
            role="tablist"
            aria-label={t.eyebrow}
            className="flex items-center gap-3 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-none py-1 -mx-2 px-2"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {projects.map((proj, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={proj.id}
                  ref={(el) => { tabButtonRefs.current[idx] = el; }}
                  role="tab"
                  type="button"
                  id={`project-tab-${proj.id}`}
                  aria-selected={isActive}
                  aria-controls={`project-panel-${proj.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => handleSelectTab(idx, e)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="flex-shrink-0 group flex flex-col gap-2.5 text-left cursor-pointer pb-2 transition-all outline-none"
                >
                  {/* Tab Progress / Active Line */}
                  <div className="relative w-full min-w-[120px] sm:min-w-[150px] lg:min-w-0 h-[2px] bg-slate-200 overflow-hidden rounded-full">
                    <div
                      className={`h-full transition-all duration-300 ease-out ${
                        isActive
                          ? 'bg-red-600 w-full'
                          : 'w-0 bg-transparent group-hover:w-full group-hover:bg-slate-300'
                      }`}
                    />
                  </div>

                  {/* Tab Label */}
                  <div className="flex items-center text-[11px] sm:text-xs font-mono">
                    <span
                      className={`uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${
                        isActive
                          ? 'text-slate-950 font-bold'
                          : 'text-slate-500 group-hover:text-slate-800 font-medium'
                      }`}
                    >
                      {proj.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ACTIVE PROJECT TABPANEL (Unified Responsive Showcase, ~40% Info / ~60% Image) */}
        <div
          role="tabpanel"
          id={`project-panel-${activeProject.id}`}
          aria-labelledby={`project-tab-${activeProject.id}`}
          className="relative w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            {/* Project Info Column (~5 Cols on desktop, full width on mobile) */}
            <div className="lg:col-span-5 xl:col-span-5 min-h-[280px] flex flex-col justify-between">
              <div key={activeProject.id} className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                {/* Category & Location */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-red-600 font-semibold px-2.5 py-1 rounded bg-red-50/80 border border-red-200/60">
                    {activeProject.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{activeProject.location}</span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold text-slate-950 tracking-tight leading-snug">
                  {activeProject.title}
                </h3>

                {/* Summary Text */}
                <p className="text-sm xl:text-base text-slate-600 font-normal leading-relaxed">
                  {activeProject.summary}
                </p>

                {/* Expandable Technical Details */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleToggleDetails(activeProject.id)}
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-900 hover:text-red-600 transition-colors py-1 cursor-pointer"
                  >
                    <span>
                      {expandedProjectId === activeProject.id
                        ? t.hideDetails
                        : t.expandDetails}
                    </span>
                  </button>

                  {/* Expandable Details Box */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      expandedProjectId === activeProject.id
                        ? 'max-h-72 opacity-100 mt-3'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-xs space-y-2.5 shadow-xs">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                          {t.scopeLabel}
                        </span>
                        <span className="text-slate-700 leading-relaxed block font-sans">
                          {activeProject.details.scope}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                            {t.industryLabel}
                          </span>
                          <span className="text-slate-900 font-medium truncate block font-sans">
                            {activeProject.details.industry}
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                            {t.yearLabel}
                          </span>
                          <span className="text-slate-900 font-medium block font-sans">
                            {activeProject.details.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dominant Image Column (~7 Cols on desktop, full width on mobile) */}
            <div className="lg:col-span-7 xl:col-span-7">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-200 shadow-md border border-slate-200/90 group">
                {projects.map((proj, idx) => {
                  const isCurrent = idx === activeIndex;

                  return (
                    <div
                      key={proj.id}
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        isCurrent
                          ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                          : 'opacity-0 scale-[1.015] z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  );
                })}
              </div>
              {/* Subtle external caption */}
              <p className="mt-2.5 text-xs text-slate-500 font-normal">
                {activeProject.title} – {activeProject.location}
              </p>
            </div>
          </div>
        </div>

        {/* Transition Divider Line */}
        <div className="w-full h-px bg-slate-200/80 mt-12 sm:mt-16" />
      </div>
    </section>
  );
};

export default RealizationsSection;
