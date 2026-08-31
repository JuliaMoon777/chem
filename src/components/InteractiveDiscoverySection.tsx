import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface InteractiveDiscoverySectionProps {
  currentLang: Language;
  onOpenInquiry: () => void;
}

export const InteractiveDiscoverySection: React.FC<InteractiveDiscoverySectionProps> = ({
  currentLang,
  onOpenInquiry,
}) => {
  const [activeId, setActiveId] = useState<string>('about');
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageParallaxRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  const t = translations[currentLang].discovery;
  const currentItem = t.items.find((item) => item.id === activeId) || t.items[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Section Entrance Animation
      if (!prefersReducedMotion) {
        gsap.fromTo(
          tagRef.current,
          { opacity: 0, y: 16, filter: 'blur(3px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 22, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );

        rowsRef.current.forEach((row, idx) => {
          if (row) {
            gsap.fromTo(
              row,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: idx * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 65%',
                  once: true,
                },
              }
            );
          }
        });

        // Desktop Image Parallax inside stable frame
        if (imageParallaxRef.current && imageContainerRef.current) {
          gsap.fromTo(
            imageParallaxRef.current,
            { yPercent: -5, scale: 1.05 },
            {
              yPercent: 5,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: imageContainerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      ref={sectionRef}
      id="company-discovery-section"
      className="relative w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="max-w-2xl mb-16 sm:mb-20">
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
          <p className="mt-3 text-base sm:text-lg text-slate-700 font-normal">
            {t.subheading}
          </p>
        </div>

        {/* 2-Column Architectural Layout on Desktop: Accordion (Left) + Dynamic Single Image (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Editorial Accordion (7 cols) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-slate-300/80 border-y border-slate-300/80">
            {t.items.map((item, index) => {
              const isOpen = activeId === item.id;

              return (
                <div
                  key={item.id}
                  ref={(el) => (rowsRef.current[index] = el)}
                  className="group py-6 sm:py-8 transition-colors duration-200"
                >
                  {/* Clickable Header Row */}
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="w-full flex items-center justify-between text-left cursor-pointer select-none outline-none group-focus-visible:ring-2 group-focus-visible:ring-red-500 rounded-sm"
                    aria-expanded={isOpen}
                    id={`accordion-btn-${item.id}`}
                  >
                    <div className="flex items-baseline gap-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 sm:group-hover:translate-x-2">
                      <h3
                        className={`font-poppins font-bold text-xl sm:text-2xl lg:text-3xl transition-colors duration-200 ${
                          isOpen
                            ? 'text-red-600'
                            : 'text-slate-950 group-hover:text-red-600'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Minimalist Indicator: + to × / - */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ml-4 ${
                        isOpen
                          ? 'border-red-500 bg-red-50 text-red-600 rotate-90 scale-105'
                          : 'border-slate-300 bg-white text-slate-600 group-hover:border-red-400 group-hover:text-red-600'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Content Area using Grid Template Rows for 60fps Smooth Transitions */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-5 sm:mt-6'
                        : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-0 sm:pl-10 space-y-4">
                        {/* Tagline */}
                        <p className="font-poppins font-semibold text-sm sm:text-base text-slate-800 leading-snug">
                          {item.tagline}
                        </p>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                          {item.description}
                        </p>

                        {/* Verified Features / Bullet Points */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          {item.bulletPoints.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-center gap-2 text-xs sm:text-sm text-slate-800"
                            >
                              <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Mobile Image preview if expanded on mobile */}
                        <div className="block lg:hidden pt-4">
                          <div className="w-full h-56 rounded-xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-200">
                            <img
                              src={item.image}
                              alt={item.imageAlt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <p className="mt-2 text-xs text-slate-500 font-normal">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Dynamic One-Image Visual with Parallax & Crossfade (5 cols) */}
          <div
            ref={imageContainerRef}
            className="hidden lg:block lg:col-span-5 sticky top-32"
          >
            <div className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
              {/* Parallax inner container */}
              <div
                ref={imageParallaxRef}
                className="absolute inset-0 w-full h-[112%] -top-[6%] will-change-transform"
              >
                {/* Dynamic Image Crossfading Layer */}
                {t.items.map((item) => {
                  const isVisible = activeId ? activeId === item.id : item.id === 'about';

                  return (
                    <div
                      key={item.id}
                      className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                        isVisible
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-[1.03] z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Subtle caption outside the image */}
            <div className="mt-3 px-1">
              <p className="text-xs text-slate-500 font-normal">
                {currentItem.title} – {currentItem.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDiscoverySection;
