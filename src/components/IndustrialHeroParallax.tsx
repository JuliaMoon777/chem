import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations } from '../types';
import siteImages from '../assets/images';

gsap.registerPlugin(ScrollTrigger);

interface IndustrialHeroParallaxProps {
  currentLang: Language;
  onOpenInquiry: () => void;
  onExploreClick: () => void;
}

export const IndustrialHeroParallax: React.FC<IndustrialHeroParallaxProps> = ({
  currentLang,
  onOpenInquiry,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const plantRef = useRef<HTMLDivElement>(null);
  
  // Cloud layer refs
  const bgMistRef = useRef<HTMLDivElement>(null);
  const bgCloudBankRef = useRef<HTMLDivElement>(null);
  const midCloudRightRef = useRef<HTMLDivElement>(null);
  const midCloudLowerRef = useRef<HTMLDivElement>(null);
  const fgCloudLeftRef = useRef<HTMLDivElement>(null);
  const fgCloudRightRef = useRef<HTMLDivElement>(null);
  
  // Text content ref
  const textContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      // DESKTOP (1024px+) — Full 100% parallax travel + subtle mouse micro-tilt
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });

        tl.to(plantRef.current, { yPercent: 12, scale: 1.18, ease: 'power1.out' }, 0);
        tl.to(bgMistRef.current, { yPercent: 25, xPercent: -8, scale: 1.08, opacity: 0.75, ease: 'sine.inOut' }, 0);
        tl.to(bgCloudBankRef.current, { yPercent: 30, xPercent: 12, scale: 1.12, opacity: 0.8, ease: 'power1.inOut' }, 0);
        tl.to(midCloudRightRef.current, { yPercent: 45, xPercent: -20, scale: 1.18, opacity: 0.8, ease: 'power2.out' }, 0);
        tl.to(midCloudLowerRef.current, { yPercent: 40, xPercent: 18, scale: 1.15, opacity: 0.75, ease: 'power1.out' }, 0);
        tl.to(fgCloudLeftRef.current, { yPercent: 75, xPercent: -32, scale: 1.35, opacity: 0.65, ease: 'power2.inOut' }, 0);
        tl.to(fgCloudRightRef.current, { yPercent: 85, xPercent: 36, scale: 1.4, opacity: 0.6, ease: 'power3.out' }, 0);
        tl.to(textContentRef.current, { y: -50, opacity: 0, scale: 0.96, ease: 'power2.in' }, 0);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: -15, ease: 'power1.in' }, 0);

        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const normX = clientX / innerWidth - 0.5;
          const normY = clientY / innerHeight - 0.5;

          gsap.to(fgCloudLeftRef.current, { x: normX * 35, y: normY * 20, duration: 1.2, ease: 'power1.out' });
          gsap.to(midCloudRightRef.current, { x: normX * -20, y: normY * -12, duration: 1.4, ease: 'power1.out' });
          gsap.to(plantRef.current, { x: normX * -10, y: normY * -6, duration: 1.8, ease: 'power1.out' });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
      });

      // TABLET (768px - 1023px) — 70-80% parallax travel
      mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        tl.to(plantRef.current, { yPercent: 8, scale: 1.12, ease: 'power1.out' }, 0);
        tl.to(bgMistRef.current, { yPercent: 18, xPercent: -5, opacity: 0.7, ease: 'sine.inOut' }, 0);
        tl.to(bgCloudBankRef.current, { yPercent: 20, xPercent: 8, opacity: 0.7, ease: 'power1.inOut' }, 0);
        tl.to(midCloudRightRef.current, { yPercent: 30, xPercent: -12, opacity: 0.75, ease: 'power2.out' }, 0);
        tl.to(midCloudLowerRef.current, { yPercent: 28, xPercent: 12, opacity: 0.7, ease: 'power1.out' }, 0);
        tl.to(fgCloudLeftRef.current, { yPercent: 45, xPercent: -18, opacity: 0.6, ease: 'power2.inOut' }, 0);
        tl.to(fgCloudRightRef.current, { yPercent: 50, xPercent: 20, opacity: 0.55, ease: 'power3.out' }, 0);
        tl.to(textContentRef.current, { y: -35, opacity: 0, ease: 'power2.in' }, 0);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: -10, ease: 'power1.in' }, 0);
      });

      // MOBILE (< 768px) — Smooth 40-50% subtle travel, maximum GPU efficiency
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        tl.to(plantRef.current, { yPercent: 5, scale: 1.08, ease: 'power1.out' }, 0);
        tl.to(bgMistRef.current, { yPercent: 10, opacity: 0.6, ease: 'sine.inOut' }, 0);
        tl.to(bgCloudBankRef.current, { yPercent: 12, opacity: 0.6, ease: 'power1.inOut' }, 0);
        tl.to(midCloudRightRef.current, { yPercent: 18, xPercent: -6, opacity: 0.65, ease: 'power2.out' }, 0);
        tl.to(midCloudLowerRef.current, { yPercent: 16, xPercent: 6, opacity: 0.6, ease: 'power1.out' }, 0);
        tl.to(fgCloudLeftRef.current, { yPercent: 25, xPercent: -8, opacity: 0.5, ease: 'power2.inOut' }, 0);
        tl.to(fgCloudRightRef.current, { yPercent: 28, xPercent: 10, opacity: 0.45, ease: 'power3.out' }, 0);
        tl.to(textContentRef.current, { y: -25, opacity: 0, ease: 'power2.in' }, 0);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: -8, ease: 'power1.in' }, 0);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-screen-viewport"
      className="relative w-full h-[100svh] min-h-[560px] max-h-[1400px] lg:h-[100dvh] bg-slate-900 will-change-transform select-none overflow-hidden"
    >
      {/* Viewport Content */}
      <div
        ref={viewportRef}
        className="relative w-full h-full overflow-hidden flex items-center justify-center"
      >

        {/* ========================================================
            LAYER 1: AERIAL TOP-DOWN INDUSTRIAL PLANT
            High drone shot of a massive, modern European chemical &
            energy complex in bright daylight with continuous smooth flight drift.
        ======================================================== */}
        <div
          ref={plantRef}
          id="hero-plant-layer"
          className="absolute inset-0 w-full h-full will-change-transform transform-gpu pointer-events-none"
        >
          <div className="relative w-full h-full animate-flight-camera transform-gpu">
            {/* Primary High-Resolution Aerial View with Responsive WebP/JPG SrcSet */}
            <picture className="w-full h-full block">
              <source
                type="image/webp"
                srcSet={`${siteImages.aerialPlant800wWebp} 800w, ${siteImages.aerialPlant1600wWebp} 1600w`}
                sizes="(max-width: 768px) 800px, 100vw"
              />
              <source
                type="image/jpeg"
                srcSet={`${siteImages.aerialPlant800wJpg} 800w, ${siteImages.aerialPlant1600wJpg} 1600w`}
                sizes="(max-width: 768px) 800px, 100vw"
              />
              <img
                src={siteImages.aerialPlant1600wJpg}
                alt="CHEMOROZRUCH – Kompleks przemysłowy, konstrukcje stalowe i instalacje chemiczne"
                width={1600}
                height={900}
                className="w-full h-full object-cover object-[50%_40%] sm:object-center brightness-[1.02] contrast-[1.03] scale-[1.04]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </picture>

            {/* Subtle Clean Daylight Sun Flare & Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/20 mix-blend-soft-light" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-white/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent" />
          </div>
        </div>

        {/* ========================================================
            LAYER 2: BACKGROUND / DEEP ATMOSPHERIC CLOUDS (Subtle & Dispersed)
        ======================================================== */}
        <div
          id="hero-cloud-deep"
          className="absolute inset-0 w-full h-full pointer-events-none transform-gpu overflow-hidden z-10"
        >
          <div
            ref={bgMistRef}
            className="absolute -top-[5%] left-[5%] sm:left-[10%] w-[420px] sm:w-[750px] max-w-[65vw] will-change-transform"
          >
            <div className="animate-cloud-pass-mid will-change-transform opacity-35">
              <img
                src={siteImages.cloud3}
                alt=""
                role="presentation"
                className="w-full h-auto object-contain pointer-events-none filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
                draggable={false}
              />
            </div>
          </div>

          <div
            ref={bgCloudBankRef}
            className="absolute -bottom-[8%] -left-[10%] w-[380px] sm:w-[680px] max-w-[55vw] will-change-transform"
          >
            <div className="animate-cloud-drift-3 will-change-transform opacity-35 sm:opacity-40">
              <img
                src={siteImages.cloud1}
                alt=""
                role="presentation"
                className="w-full h-auto object-contain pointer-events-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            LAYER 3: MID-GROUND CLOUDS (Dispersed, Framing the Perimeter)
        ======================================================== */}
        <div
          id="hero-cloud-midground"
          className="absolute inset-0 w-full h-full pointer-events-none transform-gpu overflow-hidden z-20"
        >
          <div
            ref={midCloudRightRef}
            className="absolute -top-[8%] -right-[6%] w-[400px] sm:w-[780px] max-w-[60vw] will-change-transform"
          >
            <div className="animate-cloud-drift-2 will-change-transform opacity-35 sm:opacity-45">
              <img
                src={siteImages.cloud2}
                alt=""
                role="presentation"
                className="w-full h-auto object-contain pointer-events-none filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
                draggable={false}
              />
            </div>
          </div>

          <div
            ref={midCloudLowerRef}
            className="absolute -bottom-[5%] right-[2%] sm:right-[5%] w-[360px] sm:w-[650px] max-w-[50vw] will-change-transform"
          >
            <div className="animate-cloud-drift-1 will-change-transform opacity-30 sm:opacity-35">
              <img
                src={siteImages.cloud1}
                alt=""
                role="presentation"
                className="w-full h-auto object-contain pointer-events-none filter drop-shadow-[0_12px_25px_rgba(0,0,0,0.06)]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            LAYER 4: FOREGROUND VOLUMETRIC CLOUDS (Subtle Peripheral Framing)
        ======================================================== */}
        <div
          id="hero-cloud-foreground"
          className="absolute inset-0 w-full h-full pointer-events-none transform-gpu overflow-hidden z-25"
        >
          <div
            ref={fgCloudLeftRef}
            className="absolute -top-[10%] -left-[6%] w-[420px] sm:w-[780px] max-w-[60vw] will-change-transform"
          >
            <div className="animate-cloud-drift-1 will-change-transform opacity-40 sm:opacity-50">
              <img
                src={siteImages.cloud2}
                alt=""
                role="presentation"
                className="w-full h-auto object-contain pointer-events-none filter drop-shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                draggable={false}
              />
            </div>
          </div>

          <div
            ref={fgCloudRightRef}
            className="absolute top-[2%] -right-[8%] w-[440px] sm:w-[820px] max-w-[65vw] will-change-transform"
          >
            <div className="animate-cloud-pass-fg will-change-transform opacity-30 sm:opacity-40">
              <img
                src={siteImages.cloud3}
                alt=""
                role="presentation"
                className="w-full h-auto object-contain pointer-events-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.07)]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            LAYER 5: MINIMAL & ELEGANT HERO TEXT CONTENT
            Left lower / left middle-lower area.
        ======================================================== */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-8 sm:pb-14">
          <div /> {/* Spacer */}

          {/* Left Lower Area Text Container */}
          <div
            ref={textContentRef}
            id="hero-text-content"
            className="max-w-xl text-left pointer-events-auto will-change-transform pr-2"
          >
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-poppins font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
            >
              {t.hero.headline}
            </motion.h1>

            {/* Supporting Line */}
            <motion.p
              initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-100 font-medium tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] leading-relaxed"
            >
              {t.hero.supporting}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 sm:mt-7"
            >
              <button
                id="hero-primary-cta-btn"
                onClick={onExploreClick}
                className="group inline-flex items-center justify-center gap-2.5 min-h-[44px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white font-poppins font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>{t.hero.ctaBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* Bottom subtle scroll hint */}
          <div
            ref={scrollIndicatorRef}
            className="flex items-center gap-2 text-white/80 text-xs font-medium tracking-wider uppercase drop-shadow-md cursor-pointer hover:text-white transition-colors w-fit pointer-events-auto will-change-transform py-1"
            onClick={onExploreClick}
          >
            <span>{t.hero.scrollIndicator}</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndustrialHeroParallax;

