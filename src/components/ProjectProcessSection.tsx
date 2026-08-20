import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations, ProcessStageItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectProcessSectionProps {
  currentLang: Language;
}

// Stage node coordinate geometry in SVG viewBox (0 0 1000 320)
// Architectural stepped orthogonal route with precise 90-degree industrial routing
const STAGE_COORDINATES = [
  { id: 'analiza', x: 80, y: 140, labelPos: 'top', progressThreshold: 0.08 },
  { id: 'projekt', x: 250, y: 70, labelPos: 'bottom', progressThreshold: 0.25 },
  { id: 'produkcja', x: 420, y: 170, labelPos: 'top', progressThreshold: 0.45 },
  { id: 'montaz', x: 590, y: 70, labelPos: 'bottom', progressThreshold: 0.65 },
  { id: 'kontrola', x: 760, y: 170, labelPos: 'top', progressThreshold: 0.82 },
  { id: 'uruchomienie', x: 920, y: 80, labelPos: 'bottom', progressThreshold: 0.98 },
];

// SVG path with orthogonal segments connecting all 6 stages smoothly
const SVG_PROCESS_PATH = `
  M 40 140
  L 80 140
  L 165 140
  L 165 70
  L 250 70
  L 335 70
  L 335 170
  L 420 170
  L 505 170
  L 505 70
  L 590 70
  L 675 70
  L 675 170
  L 760 170
  L 840 170
  L 840 80
  L 920 80
  L 970 80
`;

export const ProjectProcessSection: React.FC<ProjectProcessSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].process;
  const stages: ProcessStageItem[] = t.stages;

  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isManualClick, setIsManualClick] = useState<boolean>(false);

  // References
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathLengthRef = useRef<number>(0);

  // Measure SVG path length on mount
  useEffect(() => {
    if (pathRef.current) {
      const totalLength = pathRef.current.getTotalLength();
      pathLengthRef.current = totalLength;
      pathRef.current.style.strokeDasharray = `${totalLength}`;
      pathRef.current.style.strokeDashoffset = `${totalLength}`;
    }
  }, []);

  // Desktop Scroll-driven line drawing and stage activation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = '0';
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !pinContainerRef.current) return;

      // 1. Header reveal when entering section
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      if (eyebrowRef.current) {
        introTl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      if (headingRef.current) {
        introTl.fromTo(
          headingRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (supportingRef.current) {
        introTl.fromTo(
          supportingRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 2. Desktop sticky scroll timeline for process line drawing
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: pinContainerRef.current,
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;

            // Draw line
            if (pathRef.current && pathLengthRef.current > 0) {
              const offset = pathLengthRef.current * (1 - progress);
              pathRef.current.style.strokeDashoffset = `${offset}`;
            }

            // Sync active stage based on scroll progress if not recently manual clicked
            if (!isManualClick) {
              let currentActive = 0;
              for (let i = 0; i < STAGE_COORDINATES.length; i++) {
                if (progress >= STAGE_COORDINATES[i].progressThreshold - 0.05) {
                  currentActive = i;
                }
              }
              setActiveStageIndex(currentActive);
            }
          },
        });
      });

      // Mobile vertical progress triggers
      mm.add('(max-width: 1023px)', () => {
        stages.forEach((stage, idx) => {
          ScrollTrigger.create({
            trigger: `#mobile-stage-${stage.id}`,
            start: 'top 70%',
            end: 'bottom 40%',
            onEnter: () => {
              if (!isManualClick) setActiveStageIndex(idx);
            },
            onEnterBack: () => {
              if (!isManualClick) setActiveStageIndex(idx);
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stages, isManualClick, currentLang]);

  // Click stage handler
  const handleStageClick = (index: number) => {
    setIsManualClick(true);
    setActiveStageIndex(index);

    // If on desktop, also animate the stroke progress to the target stage smoothly
    if (pathRef.current && pathLengthRef.current > 0 && window.innerWidth >= 1024) {
      const targetThreshold = STAGE_COORDINATES[index].progressThreshold;
      const targetOffset = pathLengthRef.current * (1 - targetThreshold);
      gsap.to(pathRef.current, {
        strokeDashoffset: targetOffset,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    // Reset manual click lock after 1.5s so scroll updates can resume naturally
    setTimeout(() => {
      setIsManualClick(false);
    }, 1500);
  };

  const activeStage = stages[activeStageIndex] || stages[0];

  return (
    <section
      id="od-projektu-do-uruchomienia"
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F5] text-slate-900 overflow-hidden border-t border-slate-200/60"
    >
      {/* Background Architectural Grid (Subtle border lines on outer edges only, never cutting through central cards) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-slate-200" />
          <div className="w-px h-full bg-slate-200" />
        </div>
      </div>

      {/* Sticky Viewport Container for Desktop Screen */}
      <div
        ref={pinContainerRef}
        className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between py-24 sm:py-28 lg:py-28"
      >
        <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
          {/* 1. INTRO (Clean, Airy Architectural Typography) */}
          <div className="max-w-3xl mb-12 lg:mb-16">
            <div ref={eyebrowRef} className="mb-4">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                {t.eyebrow}
              </span>
            </div>

            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-950 tracking-tight leading-[1.12]"
            >
              {t.heading}
            </h2>

            <p
              ref={supportingRef}
              className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
            >
              {t.supporting}
            </p>
          </div>

          {/* 2. DESKTOP CONTINUOUS INDUSTRIAL PROCESS ROUTE (One Thin Architectural Line) */}
          <div className="hidden lg:block relative w-full my-8">
            <div className="relative w-full aspect-[3.1/1] max-w-6xl mx-auto">
              {/* Architectural SVG Canvas with Precise 90-degree Stepped Route */}
              <svg
                viewBox="0 0 1000 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  {/* Subtle active gradient */}
                  <linearGradient id="chemorozruchLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="85%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                </defs>

                {/* Inactive Base Route Line (Light soft gray) */}
                <path
                  d={SVG_PROCESS_PATH}
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  strokeMiterlimit="4"
                  className="transition-colors duration-500"
                />

                {/* Active Drawn Route Line (Animated through scroll progress) */}
                <path
                  ref={pathRef}
                  d={SVG_PROCESS_PATH}
                  stroke="url(#chemorozruchLineGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  strokeMiterlimit="4"
                  className="will-change-[stroke-dashoffset]"
                />

                {/* Interactive Stage Nodes Along The Route */}
                {STAGE_COORDINATES.map((coord, index) => {
                  const stage = stages[index];
                  const isActive = index <= activeStageIndex;
                  const isCurrent = index === activeStageIndex;
                  const isLastStage = index === stages.length - 1;

                  return (
                    <g
                      key={coord.id}
                      onClick={() => handleStageClick(index)}
                      className="cursor-pointer group select-none"
                    >
                      {/* Invisible larger hit area for effortless clicking */}
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="24"
                        fill="transparent"
                      />

                      {/* Outer pulse ring for the currently active stage */}
                      {isCurrent && (
                        <circle
                          cx={coord.x}
                          cy={coord.y}
                          r={isLastStage ? '11' : '9'}
                          fill="none"
                          stroke={isLastStage ? '#DC2626' : '#0F172A'}
                          strokeWidth="1"
                          className="animate-ping opacity-30"
                        />
                      )}

                      {/* Node Circle Outer Accent */}
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r={isCurrent ? 6 : isActive ? 4.5 : 3.5}
                        fill={
                          isCurrent
                            ? isLastStage
                              ? '#DC2626'
                              : '#0F172A'
                            : isActive
                            ? '#334155'
                            : '#FFFFFF'
                        }
                        stroke={
                          isCurrent
                            ? isLastStage
                              ? '#DC2626'
                              : '#0F172A'
                            : isActive
                            ? '#334155'
                            : '#CBD5E1'
                        }
                        strokeWidth={isCurrent ? 2.5 : 1.5}
                        className="transition-all duration-400 group-hover:scale-125"
                      />

                      {/* Minimalist Stage Text Placement Above or Below Line */}
                      <g
                        transform={
                          coord.labelPos === 'top'
                            ? `translate(${coord.x}, ${coord.y - 20})`
                            : `translate(${coord.x}, ${coord.y + 26})`
                        }
                        className="transition-all duration-300 group-hover:translate-y-[-2px]"
                      >
                        {/* Stage Name */}
                        <text
                          x="0"
                          y="0"
                          textAnchor="middle"
                          fill={isCurrent ? '#090D14' : isActive ? '#334155' : '#94A3B8'}
                          className={`text-sm tracking-tight transition-all duration-300 ${
                            isCurrent
                              ? 'font-bold text-slate-950 scale-105'
                              : 'font-medium'
                          }`}
                        >
                          {stage.name}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* 3. DEDICATED ARCHITECTURAL ACTIVE DESCRIPTION */}
          <div className="hidden lg:block max-w-4xl mx-auto mt-4">
            <div className="relative p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-500 flex items-start gap-6">
              {/* Left Accent Node */}
              <div className="shrink-0 flex flex-col items-center pt-1.5">
                <span className="w-3 h-3 rounded-full bg-red-600 shadow-xs" />
              </div>

              {/* Center Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                    {activeStage.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/70">
                    ETAP REALIZACJI
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {activeStage.description}
                </p>
              </div>

              {/* Right Click Cue */}
              <div className="hidden sm:flex shrink-0 items-center text-xs font-medium text-slate-400 pt-1.5">
                <span>{t.hintClick}</span>
              </div>
            </div>
          </div>

          {/* 4. SIMPLIFIED MOBILE VERTICAL PROCESS ROUTE (< 1024px) */}
          <div className="lg:hidden relative pl-6 sm:pl-8 space-y-8 my-8">
            {/* Continuous Vertical Base Line */}
            <div className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-[1.5px] bg-slate-200" />
            
            {/* Active Vertical Fill Line */}
            <div
              className="absolute left-[15px] sm:left-[23px] top-2 w-[2px] bg-slate-900 transition-all duration-500"
              style={{
                height: `${((activeStageIndex + 1) / stages.length) * 96}%`,
              }}
            />

            {stages.map((stage, idx) => {
              const isCurrent = idx === activeStageIndex;
              const isActive = idx <= activeStageIndex;

              return (
                <div
                  key={stage.id}
                  id={`mobile-stage-${stage.id}`}
                  onClick={() => handleStageClick(idx)}
                  className="relative pl-6 cursor-pointer group"
                >
                  {/* Left Marker Node */}
                  <div
                    className={`absolute -left-[15px] sm:-left-[23px] top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      isCurrent
                        ? 'bg-red-600 border-red-600 scale-125'
                        : isActive
                        ? 'bg-slate-900 border-slate-900'
                        : 'bg-white border-slate-300'
                    }`}
                  />

                  {/* Stage Label */}
                  <div className="flex items-baseline gap-2.5">
                    <h3
                      className={`text-lg transition-colors ${
                        isCurrent
                          ? 'font-bold text-slate-950'
                          : 'font-medium text-slate-700'
                      }`}
                    >
                      {stage.name}
                    </h3>
                  </div>

                  {/* Mobile Expandable Description */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-out ${
                      isCurrent ? 'max-h-28 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm text-slate-600 leading-relaxed font-normal pl-2 border-l-2 border-red-600/40">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. SMOOTH TRANSITION TO NEXT SECTION (Thin subtle hairline) */}
        <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mt-12">
          <div className="w-full h-px bg-slate-200/70" />
        </div>
      </div>
    </section>
  );
};

export default ProjectProcessSection;
