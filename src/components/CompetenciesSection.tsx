import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Layers, Gauge, Activity, Wrench, Flame, Factory, HardHat } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations, CompetenceItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface CompetenciesSectionProps {
  currentLang: Language;
  onOpenInquiry: (initialSubject?: string) => void;
}

const competenceIcons: Record<string, React.ElementType> = {
  apparatus: Flame,
  pipelines: Activity,
  modernization: Wrench,
  valves: Gauge,
  epc: Factory,
  steel: HardHat,
};

export const CompetenciesSection: React.FC<CompetenciesSectionProps> = ({
  currentLang,
  onOpenInquiry,
}) => {
  const [activeCompetence, setActiveCompetence] = useState<string>('apparatus');
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const t = translations[currentLang].competencies;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (!prefersReducedMotion) {
        // Section Header Reveal
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });

        headerTl
          .fromTo(
            tagRef.current,
            { opacity: 0, y: 14, filter: 'blur(3px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }
          )
          .fromTo(
            headingRef.current,
            { opacity: 0, y: 20, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            subRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.5'
          );

        // ScrollTrigger for each of the 6 individual competency blocks & image parallax
        blockRefs.current.forEach((block, index) => {
          if (!block) return;
          const itemId = t.items[index]?.id;
          const imgEl = imageRefs.current[index];

          // Fade & slide in block
          gsap.fromTo(
            block,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 82%',
                once: true,
              },
            }
          );

          // Parallax movement on image inside its frame as the user scrolls down past it
          if (imgEl) {
            gsap.fromTo(
              imgEl,
              { yPercent: -8, scale: 1.06 },
              {
                yPercent: 8,
                scale: 1.02,
                ease: 'none',
                scrollTrigger: {
                  trigger: block,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                },
              }
            );
          }

          // Active indicator tracker
          if (itemId) {
            ScrollTrigger.create({
              trigger: block,
              start: 'top 45%',
              end: 'bottom 45%',
              onEnter: () => setActiveCompetence(itemId),
              onEnterBack: () => setActiveCompetence(itemId),
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [t.items, currentLang]);

  const scrollToCompetence = (id: string) => {
    setActiveCompetence(id);
    const target = document.getElementById(`competence-block-${id}`);
    if (target) {
      const yOffset = -90;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="competencies-section"
      ref={sectionRef}
      className="relative w-full bg-[#fcfdfe] border-t border-slate-200/90 pt-24 pb-36 text-slate-900 overflow-hidden"
    >
      {/* Background Engineering Grid & Precision Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-slate-200/80 via-slate-100 to-transparent" />
        <div className="absolute top-0 left-12 w-px h-full bg-slate-100 hidden lg:block" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-slate-100/50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div ref={tagRef} className="mb-3 select-none">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
              {t.tag}
            </span>
          </div>

          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]"
          >
            {t.heading}
          </h2>

          <p
            ref={subRef}
            className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            {t.subheading}
          </p>
        </div>

        {/* 6 FULL STORYTELLING COMPETENCY ROWS */}
        <div className="space-y-16 lg:space-y-24">
          {t.items.map((item: CompetenceItem, index: number) => {
            const IconComp = competenceIcons[item.id] || Layers;

            return (
              <div
                key={item.id}
                id={`competence-block-${item.id}`}
                ref={(el) => {
                  blockRefs.current[index] = el;
                }}
                className="relative rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-12 hover:shadow-md transition-shadow duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* LEFT COLUMN: TEXT & SCOPE & TECHNICAL SPECS (7 cols on desktop) */}
                  <div className="lg:col-span-7 flex flex-col">
                    {/* Top Quality Compliance Tag */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/70">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>UDT • TÜV • ISO</span>
                      </div>
                    </div>

                    {/* Competence Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-red-50 text-red-600">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                        {item.name}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
                      {item.shortDesc}
                    </p>

                    {/* Key Execution Scope List */}
                    <div className="mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3.5 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-red-600" />
                        <span>{t.scopeLabel}</span>
                      </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {item.scope.map((scopePoint, sIdx) => (
                          <li
                            key={sIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{scopePoint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Specs Tags & CTA Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                      {/* Specs Chips */}
                      {item.specs && item.specs.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.specs.map((spec, spIdx) => (
                            <div
                              key={spIdx}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-1.5"
                            >
                              <span className="text-slate-500">{spec.label}:</span>
                              <span className="font-bold text-slate-900">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Inquiry CTA Button */}
                      <button
                        type="button"
                        onClick={() => onOpenInquiry(item.name)}
                        className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all group/btn cursor-pointer"
                      >
                        <span>{t.inquiryBtn}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: HIGH-RES INDUSTRIAL IMAGE RIGHT BESIDE THIS TEXT (5 cols on desktop) */}
                  <div className="lg:col-span-5">
                    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-md group/img">
                      <img
                        ref={(el) => {
                          imageRefs.current[index] = el;
                        }}
                        src={item.image}
                        alt={item.imageAlt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center will-change-transform transition-transform duration-700 group-hover/img:scale-105"
                      />

                      {/* Subtle Cinematic Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                      {/* Top Corner Technical Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white flex items-center gap-2 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span>CHEMOROZRUCH // {item.index}</span>
                        </div>
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute bottom-4 inset-x-4 z-10">
                        <div className="p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm font-semibold flex items-center justify-between gap-2">
                          <span className="truncate">{item.name}</span>
                          <span className="text-[11px] font-mono text-slate-300 shrink-0">100% Dozór</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
