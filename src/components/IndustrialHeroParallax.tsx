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
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Master ScrollTrigger timeline with scrub linked directly to scrolling past the hero
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.0, // Ultra-smooth silky inertia response
          invalidateOnRefresh: true,
        },
      });

      // 1. PLANT (Background Drone Perspective): Non-linear slow zoom and subtle ascent
      tl.to(
        plantRef.current,
        {
          yPercent: 12,
          scale: 1.18,
          ease: 'power1.out',
        },
        0
      );

      // 2. BACKGROUND CLOUDS / DISTANT MIST
      tl.to(
        bgMistRef.current,
        {
          yPercent: 25,
          xPercent: -8,
          scale: 1.08,
          opacity: 0.75,
          ease: 'sine.inOut',
        },
        0
      );

      tl.to(
        bgCloudBankRef.current,
        {
          yPercent: 30,
          xPercent: 12,
          scale: 1.12,
          opacity: 0.8,
          ease: 'power1.inOut',
        },
        0
      );

      // 3. MID-GROUND CLOUDS: Intermediate distinct speeds and directional drifts
      tl.to(
        midCloudRightRef.current,
        {
          yPercent: 45,
          xPercent: -20,
          scale: 1.18,
          opacity: 0.8,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        midCloudLowerRef.current,
        {
          yPercent: 40,
          xPercent: 18,
          scale: 1.15,
          opacity: 0.75,
          ease: 'power1.out',
        },
        0
      );

      // 4. FOREGROUND CLOUDS: Fastest non-linear speed, sweeping past camera
      tl.to(
        fgCloudLeftRef.current,
        {
          yPercent: 75,
          xPercent: -32,
          scale: 1.35,
          opacity: 0.65,
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        fgCloudRightRef.current,
        {
          yPercent: 85,
          xPercent: 36,
          scale: 1.4,
          opacity: 0.6,
          ease: 'power3.out',
        },
        0
      );

      // 5. HERO TEXT & CONTROLS: Smooth lift and fade out as viewer scrolls
      tl.to(
        textContentRef.current,
        {
          y: -50,
          opacity: 0,
          scale: 0.96,
          ease: 'power2.in',
        },
        0
      );

      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -15,
          ease: 'power1.in',
        },
        0
      );

      // Interactive subtle mouse parallax response
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const normX = (clientX / innerWidth) - 0.5;
        const normY = (clientY / innerHeight) - 0.5;

        // Micro-tilt for foreground vs background
        gsap.to(fgCloudLeftRef.current, {
          x: normX * 35,
          y: normY * 20,
          duration: 1.2,
          ease: 'power1.out',
        });
        gsap.to(midCloudRightRef.current, {
          x: normX * -20,
          y: normY * -12,
          duration: 1.4,
          ease: 'power1.out',
        });
        gsap.to(plantRef.current, {
          x: normX * -10,
          y: normY * -6,
          duration: 1.8,
          ease: 'power1.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-screen-viewport"
      className="relative w-full h-screen min-h-[640px] max-h-[1200px] bg-slate-900 will-change-transform select-none overflow-hidden"
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
            {/* Primary High-Resolution Aerial View */}
            <img
              src={siteImages.aerialPlant}
              alt="Chemorozruch aerial industrial plant view"
              className="w-full h-full object-cover object-center brightness-[1.02] contrast-[1.03] scale-[1.04]"
              loading="eager"
              decoding="async"
              draggable={false}
            />

            {/* Subtle Daytime Sun Flare & Atmosphere (Clean, bright, premium) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/35 via-transparent to-amber-50/20 mix-blend-soft-light" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-white/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/10 to-transparent" />
          </div>
        </div>

        {/* ========================================================
            LAYER 2: BACKGROUND / DEEP ATMOSPHERIC CLOUDS
            Slowest staggered parallax layer (High distance)
        ======================================================== */}
        <div
          id="hero-cloud-deep"
          className="absolute inset-0 w-full h-full pointer-events-none transform-gpu overflow-hidden z-10"
        >
          {/* Distant soft mist drifting across center */}
          <div
            ref={bgMistRef}
            className="absolute top-[18%] -left-[10%] w-[1050px] max-w-[85vw] opacity-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] animate-cloud-pass-mid will-change-transform"
          >
            <img
              src={siteImages.cloud1}
              alt=""
              role="presentation"
              className="w-full h-auto object-contain pointer-events-none filter brightness-105"
              draggable={false}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Lower-left soft cloud bank */}
          <div
            ref={bgCloudBankRef}
            className="absolute -bottom-[8%] -left-[5%] w-[950px] max-w-[75vw] opacity-95 drop-shadow-[0_25px_45px_rgba(0,0,0,0.22)] animate-cloud-drift-3 will-change-transform"
          >
            <img
              src={siteImages.cloud2}
              alt=""
              role="presentation"
              className="w-full h-auto object-contain pointer-events-none filter brightness-105"
              draggable={false}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>

        {/* ========================================================
            LAYER 3: MID-GROUND CLOUDS
            Intermediate staggered non-linear speeds for rich volume
        ======================================================== */}
        <div
          id="hero-cloud-midground"
          className="absolute inset-0 w-full h-full pointer-events-none transform-gpu overflow-hidden z-15"
        >
          {/* Top-Right Soft Drifting Cloud */}
          <div
            ref={midCloudRightRef}
            className="absolute -top-[10%] -right-[8%] w-[980px] max-w-[75vw] opacity-95 drop-shadow-[0_25px_45px_rgba(0,0,0,0.2)] animate-cloud-drift-2 will-change-transform"
          >
            <img
              src={siteImages.cloud2}
              alt=""
              role="presentation"
              className="w-full h-auto object-contain pointer-events-none filter brightness-105"
              draggable={false}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Lower Right Cloud Layer */}
          <div
            ref={midCloudLowerRef}
            className="absolute bottom-[0%] right-[0%] w-[880px] max-w-[70vw] opacity-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] animate-cloud-drift-1 will-change-transform"
          >
            <img
              src={siteImages.cloud1}
              alt=""
              role="presentation"
              className="w-full h-auto object-contain pointer-events-none filter brightness-105"
              draggable={false}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>

        {/* ========================================================
            LAYER 4: FOREGROUND VOLUMETRIC CLOUDS (Camera Altitude)
            Fastest non-linear motion, sweeps past the viewpoint
        ======================================================== */}
        <div
          id="hero-cloud-foreground"
          className="absolute inset-0 w-full h-full pointer-events-none transform-gpu overflow-hidden z-20"
        >
          {/* Top-Left Floating Cloud Billow */}
          <div
            ref={fgCloudLeftRef}
            className="absolute -top-[10%] -left-[10%] w-[1150px] max-w-[90vw] opacity-95 drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] animate-cloud-drift-1 will-change-transform"
          >
            <img
              src={siteImages.cloud3}
              alt=""
              role="presentation"
              className="w-full h-auto object-contain pointer-events-none filter brightness-110"
              draggable={false}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Foreground passing cloud wisp */}
          <div
            ref={fgCloudRightRef}
            className="absolute top-[5%] -right-[15%] w-[1250px] max-w-[98vw] opacity-90 drop-shadow-[0_30px_60px_rgba(0,0,0,0.22)] animate-cloud-pass-fg will-change-transform"
          >
            <img
              src={siteImages.cloud3}
              alt=""
              role="presentation"
              className="w-full h-auto object-contain pointer-events-none filter brightness-110"
              draggable={false}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>

        {/* ========================================================
            LAYER 5: MINIMAL & ELEGANT HERO TEXT CONTENT
            Left lower / left middle-lower area.
            Small visual area, does not cover the plant.
        ======================================================== */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-12 sm:pb-16">
          <div /> {/* Spacer */}

          {/* Left Lower Area Text Container */}
          <div
            ref={textContentRef}
            id="hero-text-content"
            className="max-w-xl text-left pointer-events-auto will-change-transform"
          >
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-poppins font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
            >
              {t.hero.headline}
            </motion.h1>

            {/* Supporting Line */}
            <motion.p
              initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-100 font-medium tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
            >
              {t.hero.supporting}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-7"
            >
              <button
                id="hero-primary-cta-btn"
                onClick={onExploreClick}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white font-poppins font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>{t.hero.ctaBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* Bottom subtle scroll hint */}
          <div
            ref={scrollIndicatorRef}
            className="flex items-center gap-2 text-white/80 text-xs font-medium tracking-wider uppercase drop-shadow-md cursor-pointer hover:text-white transition-colors w-fit pointer-events-auto will-change-transform"
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

