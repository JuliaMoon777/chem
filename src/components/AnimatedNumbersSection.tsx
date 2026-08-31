import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedNumbersSectionProps {
  currentLang: Language;
}

export const AnimatedNumbersSection: React.FC<AnimatedNumbersSectionProps> = ({ currentLang }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const vertDividerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const t = translations[currentLang].numbers;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (prefersReducedMotion) {
        // Immediate display for reduced motion preference
        numberRefs.current.forEach((el, index) => {
          if (el && t.metrics[index]) {
            el.textContent = `${t.metrics[index].value}`;
          }
        });
        setAnimated(true);
        return;
      }

      // ScrollTrigger configured to start when section enters 80% of viewport
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          setAnimated(true);
          const tl = gsap.timeline();

          // 1. Tag & Heading gentle reveal
          tl.fromTo(
            tagRef.current,
            { opacity: 0, y: 14, filter: 'blur(3px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
          ).fromTo(
            headingRef.current,
            { opacity: 0, y: 20, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' },
            '-=0.5'
          );

          // 2. Horizontal divider lines draw like engineering blueprint (0% -> 100%)
          tl.fromTo(
            lineTopRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.1, ease: 'power3.inOut' },
            '-=0.4'
          ).fromTo(
            lineBottomRef.current,
            { scaleX: 0, transformOrigin: 'right center' },
            { scaleX: 1, duration: 1.1, ease: 'power3.inOut' },
            '-=0.9'
          );

          // 3. Vertical divider lines draw vertically
          vertDividerRefs.current.forEach((divider) => {
            if (divider) {
              tl.fromTo(
                divider,
                { scaleY: 0, transformOrigin: 'top center' },
                { scaleY: 1, duration: 0.9, ease: 'power2.inOut' },
                '-=0.85'
              );
            }
          });

          // 4. Staggered count-up & metrics card entrance
          metricRefs.current.forEach((item, index) => {
            const metric = t.metrics[index];
            if (!item || !metric) return;

            // Stagger reveal of the container
            tl.fromTo(
              item,
              { opacity: 0, y: 24, filter: 'blur(4px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
              index === 0 ? '-=0.7' : '-=0.62'
            );

            // Counter animation object
            const counterObj = { val: 0 };
            const numEl = numberRefs.current[index];

            if (numEl) {
              tl.to(
                counterObj,
                {
                  val: metric.value,
                  duration: metric.value > 1000 ? 1.8 : 1.4,
                  ease: 'power2.out', // Smooth, organic, non-linear deceleration
                  onUpdate: () => {
                    numEl.textContent = Math.floor(counterObj.val).toLocaleString();
                  },
                },
                index === 0 ? '-=0.7' : '-=0.65'
              );
            }
          });
        },
      });

      return () => {
        trigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang, t.metrics]);

  return (
    <section
      ref={sectionRef}
      id="company-numbers-section"
      className="relative w-full bg-[#fbfcfd] text-slate-900 pt-14 pb-20 sm:pt-18 sm:pb-24 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-t border-slate-200/70"
    >
      {/* Background Architectural Grid Guide (Very subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f018_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f018_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Intro */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <div
            ref={tagRef}
            className="mb-3 select-none"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
              {t.tag}
            </span>
          </div>

          <h2
            ref={headingRef}
            className="font-poppins font-black text-3xl sm:text-4xl lg:text-5xl text-slate-950 tracking-tight leading-[1.12]"
          >
            {t.heading}
          </h2>
        </div>

        {/* Top Architectural Divider Line (Draws 0 -> 100%) */}
        <div
          ref={lineTopRef}
          className="w-full h-px bg-slate-300 will-change-transform mb-0"
        />

        {/* Metrics Grid: 3 Balanced Columns with Clean Vertical Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 relative">
          {t.metrics.map((metric, index) => (
            <div
              key={metric.id}
              ref={(el) => (metricRefs.current[index] = el)}
              className="relative px-6 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-16 flex flex-col justify-between group"
            >
              {/* Vertical Divider for desktop (Draws top -> bottom) */}
              {index > 0 && (
                <>
                  <div
                    ref={(el) => (vertDividerRefs.current[index] = el)}
                    className="hidden md:block absolute left-0 top-6 bottom-6 w-px bg-slate-200/90 will-change-transform"
                  />
                  <div className="md:hidden absolute top-0 left-6 right-6 h-px bg-slate-200/80" />
                </>
              )}

              {/* Number display */}
              <div>
                <div className="flex items-baseline gap-1 font-poppins font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-slate-950">
                  <span
                    ref={(el) => (numberRefs.current[index] = el)}
                    className="tabular-nums"
                  >
                    {animated ? metric.value : 0}
                  </span>
                  {metric.suffix && (
                    <span className="text-red-600 font-bold text-3xl sm:text-4xl lg:text-5xl ml-0.5">
                      {metric.suffix}
                    </span>
                  )}
                </div>

                {/* Primary Metric Label */}
                <h3 className="mt-3 sm:mt-4 font-poppins font-bold text-base sm:text-lg text-slate-900 leading-snug">
                  {metric.label}
                </h3>
              </div>

              {/* Sub-label description */}
              <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {metric.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Architectural Divider Line (Draws 0 -> 100%) */}
        <div
          ref={lineBottomRef}
          className="w-full h-px bg-slate-300 will-change-transform mt-0"
        />
      </div>
    </section>
  );
};

export default AnimatedNumbersSection;
