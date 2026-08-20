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
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const introEyebrowRef = useRef<HTMLDivElement>(null);
  const introHeadingRef = useRef<HTMLHeadingElement>(null);
  const introSupportingRef = useRef<HTMLParagraphElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Scroll Trigger setup for sticky cinematic presentation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // 1. Intro Reveal
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      if (introEyebrowRef.current) {
        introTl.fromTo(
          introEyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
      if (introHeadingRef.current) {
        introTl.fromTo(
          introHeadingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        );
      }
      if (introSupportingRef.current) {
        introTl.fromTo(
          introSupportingRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 2. Desktop Sticky Scroll Storytelling
      if (isDesktop && !prefersReducedMotion && pinContainerRef.current) {
        const totalProjects = projects.length;
        
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(totalProjects - 1) * 90}%`,
          pin: pinContainerRef.current,
          scrub: 0.5,
          onUpdate: (self) => {
            const rawIndex = Math.floor(self.progress * totalProjects);
            const clampedIndex = Math.min(Math.max(rawIndex, 0), totalProjects - 1);
            setActiveProjectIndex(clampedIndex);
          },
        });
      }

      // 3. Mobile Viewport Triggers
      if (!isDesktop) {
        projects.forEach((proj, idx) => {
          ScrollTrigger.create({
            trigger: `#mobile-project-${proj.id}`,
            start: 'top 75%',
            end: 'bottom 25%',
            onEnter: () => setActiveProjectIndex(idx),
            onEnterBack: () => setActiveProjectIndex(idx),
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [projects, currentLang]);

  const activeProject = projects[activeProjectIndex] || projects[0];

  const handleToggleDetails = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  const handleIndicatorClick = (index: number) => {
    setActiveProjectIndex(index);
    if (window.innerWidth >= 1024 && sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const totalScroll = (projects.length - 1) * (window.innerHeight * 0.9);
      const targetScroll = sectionTop + (index / (projects.length - 1)) * totalScroll;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  // Alternating layout index for desktop (even: text left / image right, odd: text right / image left)
  const isImageLeft = activeProjectIndex % 2 === 1;

  return (
    <section
      id="realizacje"
      ref={sectionRef}
      className="relative w-full bg-[#F7F7F3] text-slate-900 overflow-hidden"
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
      <div
        ref={pinContainerRef}
        className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between py-20 sm:py-24 lg:py-24"
      >
        <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
          {/* 1. INTRO (Clean, Airy Editorial Header) */}
          <div className="max-w-3xl mb-8 lg:mb-12">
            <div ref={introEyebrowRef} className="mb-3">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                {t.eyebrow}
              </span>
            </div>

            <h2
              ref={introHeadingRef}
              className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.14]"
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

          {/* 2. SUBTLE PROGRESS INDICATOR (01 ——— 02 ——— 03 ——— 04 ——— 05) */}
          <div className="hidden lg:flex items-center justify-between max-w-5xl mb-8 pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-8 w-full">
              {projects.map((proj, idx) => {
                const isActive = idx === activeProjectIndex;
                const isPassed = idx < activeProjectIndex;

                return (
                  <button
                    key={proj.id}
                    onClick={() => handleIndicatorClick(idx)}
                    className="flex-1 flex flex-col gap-2 group text-left cursor-pointer transition-all duration-300"
                  >
                    {/* Progress Bar Segment */}
                    <div className="relative w-full h-[2px] bg-slate-200 overflow-hidden">
                      <div
                        className={`absolute inset-0 transition-all duration-500 ease-out ${
                          isActive
                            ? 'bg-red-600 w-full'
                            : isPassed
                            ? 'bg-slate-800 w-full'
                            : 'w-0 bg-transparent'
                        }`}
                      />
                    </div>

                    {/* Step Label */}
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span
                        className={`text-[11px] uppercase tracking-wider truncate transition-colors duration-300 ${
                          isActive
                            ? 'text-slate-950 font-bold'
                            : isPassed
                            ? 'text-slate-700 font-medium'
                            : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      >
                        {proj.category.split('&')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. DESKTOP CINEMATIC SHOWCASE (One Dominant Project at a time, ~70% Image / ~30% Text) */}
          <div className="hidden lg:block relative w-full">
            <div
              className={`grid grid-cols-12 gap-10 xl:gap-14 items-center transition-all duration-500 ${
                isImageLeft ? 'direction-rtl' : ''
              }`}
            >
              {/* Project Info Column (~30% / 4 Cols) */}
              <div
                ref={textContainerRef}
                className={`col-span-12 lg:col-span-5 xl:col-span-4 ${
                  isImageLeft ? 'lg:order-2 text-left' : 'lg:order-1'
                }`}
              >
                <div className="space-y-4">
                  {/* Category */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-red-600 font-semibold">
                      {activeProject.category}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl xl:text-3xl font-bold text-slate-950 tracking-tight leading-snug">
                    {activeProject.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{activeProject.location}</span>
                  </div>

                  {/* Summary Text */}
                  <p className="text-sm xl:text-base text-slate-600 font-normal leading-relaxed pt-1">
                    {activeProject.summary}
                  </p>

                  {/* Expandable Technical Details Button */}
                  <div className="pt-2">
                    <button
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
                      className={`overflow-hidden transition-all duration-400 ease-out ${
                        expandedProjectId === activeProject.id
                          ? 'max-h-64 opacity-100 mt-3'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-4 rounded bg-white/80 border border-slate-200 text-xs space-y-2.5 shadow-2xs">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                            {t.scopeLabel}
                          </span>
                          <span className="text-slate-700 leading-relaxed block">
                            {activeProject.details.scope}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                          <div>
                            <span className="font-mono text-[10px] uppercase text-slate-400 block">
                              {t.industryLabel}
                            </span>
                            <span className="text-slate-800 font-medium truncate block">
                              {activeProject.details.industry}
                            </span>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] uppercase text-slate-400 block">
                              {t.yearLabel}
                            </span>
                            <span className="text-slate-800 font-medium block">
                              {activeProject.details.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dominant Image Column (~70% / 8 Cols) */}
              <div
                ref={imagesContainerRef}
                className={`col-span-12 lg:col-span-7 xl:col-span-8 ${
                  isImageLeft ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-slate-200 shadow-sm border border-slate-200/80 group">
                  {projects.map((proj, idx) => {
                    const isCurrent = idx === activeProjectIndex;

                    return (
                      <div
                        key={proj.id}
                        className={`absolute inset-0 transition-all duration-700 ease-out ${
                          isCurrent
                            ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                            : 'opacity-0 scale-104 z-0 pointer-events-none'
                        }`}
                      >
                        <img
                          src={proj.image}
                          alt={proj.title}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.015]"
                        />

                        {/* Subtle bottom meta tag badge */}
                        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-slate-950/70 backdrop-blur-xs text-white text-[11px] font-mono tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>{proj.location}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 4. MOBILE VERTICAL PROJECT STORYTELLING (< 1024px) */}
          <div className="lg:hidden space-y-16 my-8">
            {projects.map((proj, idx) => {
              const isExpanded = expandedProjectId === proj.id;

              return (
                <article
                  key={proj.id}
                  id={`mobile-project-${proj.id}`}
                  className="space-y-4"
                >
                  {/* Full-width Image */}
                  <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-slate-200 border border-slate-200/80">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-red-600 font-semibold block">
                      {proj.category}
                    </span>

                    <h3 className="text-xl font-bold text-slate-950 tracking-tight leading-snug">
                      {proj.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <span>{proj.location}</span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal pt-1">
                      {proj.summary}
                    </p>

                    {/* Mobile Expand Details */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleToggleDetails(proj.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-900"
                      >
                        <span>
                          {isExpanded ? t.hideDetails : t.expandDetails}
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="p-3.5 rounded bg-white border border-slate-200 text-xs space-y-2">
                          <div>
                            <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                              {t.scopeLabel}
                            </span>
                            <span className="text-slate-700 leading-relaxed block">
                              {proj.details.scope}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                            <div>
                              <span className="font-mono text-[10px] uppercase text-slate-400 block">
                                {t.industryLabel}
                              </span>
                              <span className="text-slate-800 font-medium block">
                                {proj.details.industry}
                              </span>
                            </div>
                            <div>
                              <span className="font-mono text-[10px] uppercase text-slate-400 block">
                                {t.yearLabel}
                              </span>
                              <span className="text-slate-800 font-medium block">
                                {proj.details.year}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Transition Line */}
        <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mt-12">
          <div className="w-full h-px bg-slate-200/80" />
        </div>
      </div>
    </section>
  );
};

export default RealizationsSection;
