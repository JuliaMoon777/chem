import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations, FacilityItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface TechFacilitiesSectionProps {
  currentLang: Language;
}

export const TechFacilitiesSection: React.FC<TechFacilitiesSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].facilities;
  
  // Confirmed equipment list according to Chemorozruch specification
  const equipmentList: FacilityItem[] = t.items;

  // Active equipment state (default to the first item or allow toggling)
  const [activeItemId, setActiveItemId] = useState<string>(equipmentList[0].id);

  // References for GSAP scroll reveals & parallax
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const mainImageContainerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const subImage1ContainerRef = useRef<HTMLDivElement>(null);
  const subImage1Ref = useRef<HTMLImageElement>(null);
  const subImage2ContainerRef = useRef<HTMLDivElement>(null);
  const subImage2Ref = useRef<HTMLImageElement>(null);
  const labelsContainerRef = useRef<HTMLDivElement>(null);

  // Filter images to display in the asymmetric spread
  const dominantItem = equipmentList.find((i) => i.role === 'dominant') || equipmentList[3];
  const supportingItem1 = equipmentList.find((i) => i.role === 'supporting1') || equipmentList[0];
  const supportingItem2 = equipmentList.find((i) => i.role === 'supporting2') || equipmentList[1];

  // Helper to determine which image is currently focused based on active item
  const activeItem = equipmentList.find((i) => i.id === activeItemId) || equipmentList[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // 1. SECTION INTRO SCROLL REVEAL (Eyebrow -> Heading -> Supporting)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (supportingRef.current) {
        tl.fromTo(
          supportingRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 2. ASYMMETRIC IMAGES STAGGERED REVEAL
      if (mainImageContainerRef.current) {
        tl.fromTo(
          mainImageContainerRef.current,
          { opacity: 0, y: 35, scale: 1.03 },
          { opacity: 1, y: 0, scale: 1.0, duration: 1.0, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (subImage1ContainerRef.current) {
        tl.fromTo(
          subImage1ContainerRef.current,
          { opacity: 0, y: 30, scale: 1.02 },
          { opacity: 1, y: 0, scale: 1.0, duration: 0.9, ease: 'power2.out' },
          '-=0.7' // +120ms stagger relative to main
        );
      }

      if (subImage2ContainerRef.current) {
        tl.fromTo(
          subImage2ContainerRef.current,
          { opacity: 0, y: 30, scale: 1.02 },
          { opacity: 1, y: 0, scale: 1.0, duration: 0.9, ease: 'power2.out' },
          '-=0.6' // +220ms stagger
        );
      }

      if (labelsContainerRef.current) {
        tl.fromTo(
          labelsContainerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // 3. SUBTLE INDEPENDENT PARALLAX FOR IMAGES (Calm, precise depth)
      // Main image: translateY(-2%) -> translateY(3%)
      if (mainImageRef.current && mainImageContainerRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          { yPercent: -2, scale: 1.04 },
          {
            yPercent: 3,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: mainImageContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Small image 1: translateY(4%) -> translateY(-3%)
      if (subImage1Ref.current && subImage1ContainerRef.current) {
        gsap.fromTo(
          subImage1Ref.current,
          { yPercent: 4, scale: 1.05 },
          {
            yPercent: -3,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: subImage1ContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          }
        );
      }

      // Small image 2: translateY(-4%) -> translateY(2%)
      if (subImage2Ref.current && subImage2ContainerRef.current) {
        gsap.fromTo(
          subImage2Ref.current,
          { yPercent: -4, scale: 1.05 },
          {
            yPercent: 2,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: subImage2ContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  // Handle clicking on an equipment label
  const handleItemClick = (id: string) => {
    setActiveItemId(id);
  };

  return (
    <section
      id="zaplecze-technologiczne"
      ref={sectionRef}
      className="relative w-full bg-[#F4F4F0] text-slate-900 pt-28 pb-36 lg:pt-36 lg:pb-44 overflow-hidden border-t border-slate-300/40"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* 1. SECTION INTRO (Magazine Editorial Header with Generous Whitespace) */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          {/* Small Eyebrow */}
          <div ref={eyebrowRef} className="mb-4">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
              {t.eyebrow}
            </span>
          </div>

          {/* Large Dark Graphite Heading */}
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.12]"
          >
            {t.headingLine1}
            <br />
            {t.headingLine2}
          </h2>

          {/* Short Supporting Sentence */}
          {t.supporting && (
            <p
              ref={supportingRef}
              className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl"
            >
              {t.supporting}
            </p>
          )}
        </div>

        {/* 2. ASYMMETRIC DESKTOP COMPOSITION (Left 60% Dominant / Right 40% Two Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 lg:mb-24">
          {/* LEFT / CENTER: One Dominant Production Image (approx 58-62% visual weight) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div
              ref={mainImageContainerRef}
              onClick={() => handleItemClick(dominantItem.id)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[1.35/1] overflow-hidden rounded-sm cursor-pointer group bg-slate-200"
            >
              <img
                ref={mainImageRef}
                src={
                  // If current active item matches any item, we can gracefully display active or dominant
                  activeItem.role === 'dominant' ? activeItem.image : dominantItem.image
                }
                alt={dominantItem.imageAlt}
                loading="lazy"
                className={`w-full h-full object-cover object-center will-change-transform transition-all duration-700 ${
                  activeItem.role === 'dominant'
                    ? 'scale-[1.025] opacity-100'
                    : 'opacity-95 group-hover:scale-105'
                }`}
              />
            </div>
            {/* Subtle external caption */}
            <p className="mt-2.5 text-xs text-slate-500 font-normal">
              {dominantItem.name}
            </p>
          </div>

          {/* RIGHT: Two Smaller Supporting Detail Images Placed Directly on Page */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-8">
            {/* Supporting Image 1 */}
            <div>
              <div
                ref={subImage1ContainerRef}
                onClick={() => handleItemClick(supportingItem1.id)}
                className="relative w-full aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-sm cursor-pointer group bg-slate-200"
              >
                <img
                  ref={subImage1Ref}
                  src={supportingItem1.image}
                  alt={supportingItem1.imageAlt}
                  loading="lazy"
                  className={`w-full h-full object-cover object-center will-change-transform transition-all duration-700 ${
                    activeItemId === supportingItem1.id
                      ? 'scale-[1.025] opacity-100'
                      : activeItemId === dominantItem.id
                      ? 'opacity-85'
                      : 'opacity-70 group-hover:opacity-100 group-hover:scale-102'
                  }`}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 font-normal">
                {supportingItem1.name}
              </p>
            </div>

            {/* Supporting Image 2 */}
            <div>
              <div
                ref={subImage2ContainerRef}
                onClick={() => handleItemClick(supportingItem2.id)}
                className="relative w-full aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-sm cursor-pointer group bg-slate-200"
              >
                <img
                  ref={subImage2Ref}
                  src={supportingItem2.image}
                  alt={supportingItem2.imageAlt}
                  loading="lazy"
                  className={`w-full h-full object-cover object-center will-change-transform transition-all duration-700 ${
                    activeItemId === supportingItem2.id
                      ? 'scale-[1.025] opacity-100'
                      : activeItemId === dominantItem.id
                      ? 'opacity-85'
                      : 'opacity-70 group-hover:opacity-100 group-hover:scale-102'
                  }`}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 font-normal">
                {supportingItem2.name}
              </p>
            </div>
          </div>
        </div>

        {/* 3. EQUIPMENT LABELS WITH THIN DIVIDERS & IN-LINE CLICK REVEAL */}
        {/* Preferred Option B: Vertical editorial list with thin divider lines + hidden descriptions revealed on click */}
        <div ref={labelsContainerRef} className="max-w-5xl mx-auto pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {/* Column 1 */}
            <div className="flex flex-col">
              {equipmentList.slice(0, 3).map((item) => {
                const isActive = activeItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="group py-5 border-b border-slate-300/70 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-baseline justify-between gap-4 transition-transform duration-300 group-hover:translate-x-1.5">
                      <div className="flex items-center gap-3">
                        {/* Active Accent Indicator Line */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isActive ? 'bg-red-600 scale-125' : 'bg-slate-300 opacity-40 group-hover:opacity-80'
                          }`}
                        />
                        <h3
                          className={`text-lg sm:text-xl tracking-tight transition-colors duration-300 ${
                            isActive
                              ? 'font-bold text-slate-950'
                              : 'font-medium text-slate-700 group-hover:text-slate-950'
                          }`}
                        >
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {/* Short Description (Max 2 short lines, revealed only when active) */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isActive ? 'max-h-24 opacity-100 pt-3' : 'max-h-0 opacity-0 pt-0'
                      }`}
                    >
                      <p className="pl-4 text-sm text-slate-600 leading-relaxed font-normal border-l-2 border-red-600/40">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              {equipmentList.slice(3, 7).map((item) => {
                const isActive = activeItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="group py-5 border-b border-slate-300/70 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-baseline justify-between gap-4 transition-transform duration-300 group-hover:translate-x-1.5">
                      <div className="flex items-center gap-3">
                        {/* Active Accent Indicator Line */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isActive ? 'bg-red-600 scale-125' : 'bg-slate-300 opacity-40 group-hover:opacity-80'
                          }`}
                        />
                        <h3
                          className={`text-lg sm:text-xl tracking-tight transition-colors duration-300 ${
                            isActive
                              ? 'font-bold text-slate-950'
                              : 'font-medium text-slate-700 group-hover:text-slate-950'
                          }`}
                        >
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {/* Short Description (Max 2 short lines, revealed only when active) */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isActive ? 'max-h-24 opacity-100 pt-3' : 'max-h-0 opacity-0 pt-0'
                      }`}
                    >
                      <p className="pl-4 text-sm text-slate-600 leading-relaxed font-normal border-l-2 border-red-600/40">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. TRANSITION TO NEXT SECTION (Thin subtle hairline settling naturally) */}
        <div className="mt-24 lg:mt-32 w-full h-px bg-slate-300/50" />
      </div>
    </section>
  );
};

export default TechFacilitiesSection;
