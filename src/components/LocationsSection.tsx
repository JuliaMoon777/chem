import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations, BranchLocationItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface LocationsSectionProps {
  currentLang: Language;
}

// Highly authentic, high-fidelity outline of Poland (viewBox 0 0 800 760)
// Includes Baltic Sea coast, Hel peninsula, Szczecin lagoon, Vistula lagoon,
// Carpathian mountain arc (Bieszczady, Tatras, Sudetes), Odra and Bug river borders.
const POLAND_DETAILED_PATH = `
  M 205,98 
  L 230,85 L 268,76 L 312,71 L 360,65 L 400,64 L 438,72 L 468,70 
  L 485,60 L 512,88 L 498,96 L 472,94 L 465,108 L 485,115 L 530,122
  L 555,142 L 565,178 L 590,205 L 610,230 L 612,260 L 628,285 L 635,330
  L 645,365 L 662,400 L 678,440 L 675,475 L 655,510 L 620,555 L 600,580
  L 582,610 L 565,650 L 540,685 L 505,710 L 468,690 L 440,682 L 405,670
  L 375,695 L 340,698 L 305,675 L 275,650 L 245,630 L 220,622 L 185,580
  L 160,560 L 140,530 L 128,490 L 138,450 L 152,410 L 140,370 L 130,330
  L 125,290 L 118,240 L 122,190 L 135,150 L 160,120 L 182,108 Z
`;

// Regional internal voivodeship separation lines for unmistakable real map feel
const POLAND_REGIONS = [
  // Pomorskie / Zachodniopomorskie boundary
  "M 268,76 Q 285,160 300,230",
  // Warmińsko-Mazurskie
  "M 438,72 Q 470,160 520,220",
  // Mazowieckie center loop
  "M 380,210 Q 510,260 540,380",
  // Dolnośląskie / Śląskie / Małopolskie south belt
  "M 140,450 Q 280,480 440,520",
  "M 440,520 Q 540,550 620,555",
  // Central Poland vertical axis
  "M 300,230 Q 370,360 410,500"
];

// Major Rivers: Wisła & Odra
const WISLA_RIVER = `
  M 435,680
  Q 450,590 445,530
  Q 485,460 515,395
  Q 510,340 440,290
  Q 380,260 365,200
  Q 360,140 465,108
`;

const ODRA_RIVER = `
  M 320,670
  Q 260,560 210,480
  Q 175,410 145,340
  Q 125,280 120,180
`;

// Exact coordinates calibrated to SVG 800x760
const BRANCH_COORDINATES: Record<string, { x: number; y: number }> = {
  oswiecim: { x: 420, y: 585 }, // Oświęcim (Silesia/Małopolska industrial hub)
  plock: { x: 418, y: 285 },    // Płock (Central Mazovia on Wisła)
  gdansk: { x: 445, y: 112 },   // Gdańsk (Baltic coast / Gulf of Gdańsk)
  pulawy: { x: 558, y: 418 },   // Puławy (Eastern chemical basin on Wisła)
};

export const LocationsSection: React.FC<LocationsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].locations;
  const branches: BranchLocationItem[] = t.branches;

  const [activeBranchId, setActiveBranchId] = useState<string>('oswiecim');
  const [hoveredBranchId, setHoveredBranchId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const mapSvgRef = useRef<SVGSVGElement>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const effectiveActiveId = hoveredBranchId || activeBranchId;
  const activeBranch = branches.find((b) => b.id === effectiveActiveId) || branches[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !mapSvgRef.current) return;

      // 1. Map Outline draw & fill reveal on scroll enter
      const polandPath = mapSvgRef.current.querySelector('#poland-main-land');
      const regions = mapSvgRef.current.querySelectorAll('.poland-region-line');
      const rivers = mapSvgRef.current.querySelectorAll('.poland-river-line');
      const markers = mapSvgRef.current.querySelectorAll('.map-interactive-pin');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });

      tl.fromTo(
        polandPath,
        { opacity: 0, scale: 0.95, transformOrigin: 'center center' },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        [...regions, ...rivers],
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        markers,
        { scale: 0, opacity: 0, transformOrigin: 'center bottom' },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(2)',
        },
        '-=0.3'
      );

      // 2. TRUE CONTINUOUS SCROLL PARALLAX (Interactive dynamic shift of pins across the map on scroll)
      const pinOswiecim = mapSvgRef.current.querySelector('#pin-oswiecim');
      const pinPlock = mapSvgRef.current.querySelector('#pin-plock');
      const pinGdansk = mapSvgRef.current.querySelector('#pin-gdansk');
      const pinPulawy = mapSvgRef.current.querySelector('#pin-pulawy');
      const mapBgGrid = mapSvgRef.current.querySelector('#map-topo-grid');

      if (pinOswiecim && pinPlock && pinGdansk && pinPulawy) {
        // Pins dynamically breathe and float with depth disparity during user scroll
        gsap.to(pinGdansk, {
          y: -22,
          x: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to(pinPlock, {
          y: -10,
          x: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to(pinPulawy, {
          y: 16,
          x: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        });

        gsap.to(pinOswiecim, {
          y: 20,
          x: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      }

      if (mapBgGrid) {
        gsap.to(mapBgGrid, {
          y: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  return (
    <section
      id="oddzialy-lokalizacje"
      ref={sectionRef}
      className="relative w-full bg-[#F5F5F0] text-slate-900 overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-slate-200"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-slate-400" />
          <div className="w-px h-full bg-slate-400/40 hidden md:block" />
          <div className="w-px h-full bg-slate-400/40 hidden lg:block" />
          <div className="w-px h-full bg-slate-400" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Intro */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="mb-3">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-slate-500 uppercase">
              {t.eyebrow}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            {t.heading}
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {t.supporting}
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: REAL AUTHENTIC MAP OF POLAND WITH PIN BADGES (~60%) */}
          <div className="col-span-12 lg:col-span-7 flex justify-center items-center relative">
            <div
              ref={mapWrapRef}
              className="relative w-full max-w-[620px] aspect-[800/760] bg-[#ECECE5] rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-300/80 select-none"
            >
              {/* Compass Rose & Geographic Coordinates Overlay */}
              <div className="absolute top-4 left-6 pointer-events-none flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-slate-500 tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span>POLSKA / INDUSTRIAL REGIONS</span>
              </div>
              <div className="absolute top-4 right-6 pointer-events-none font-mono text-[10px] text-slate-400">
                52°13'N 21°00'E
              </div>

              <svg
                ref={mapSvgRef}
                viewBox="0 0 800 760"
                className="w-full h-full overflow-visible"
                aria-label="Interaktywna mapa Polski z oddziałami Chemorozruch"
              >
                <defs>
                  {/* Drop Shadow for Landmass */}
                  <filter id="poland-shadow" x="-10%" y="-10%" width="125%" height="125%">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.08" />
                  </filter>

                  {/* Pin Glow Filter */}
                  <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#DC2626" floodOpacity="0.35" />
                  </filter>
                  
                  {/* Subtle terrain dot pattern */}
                  <pattern id="dot-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#CBD5E1" fillOpacity="0.4" />
                  </pattern>
                </defs>

                {/* Topographic Background Coordinate Grid */}
                <g id="map-topo-grid" className="opacity-40" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3,6">
                  <line x1="100" y1="60" x2="100" y2="720" />
                  <line x1="250" y1="60" x2="250" y2="720" />
                  <line x1="400" y1="60" x2="400" y2="720" />
                  <line x1="550" y1="60" x2="550" y2="720" />
                  <line x1="700" y1="60" x2="700" y2="720" />
                  <line x1="60" y1="180" x2="740" y2="180" />
                  <line x1="60" y1="340" x2="740" y2="340" />
                  <line x1="60" y1="500" x2="740" y2="500" />
                  <line x1="60" y1="660" x2="740" y2="660" />
                </g>

                {/* Baltic Sea Label */}
                <text x="280" y="55" className="fill-slate-400 font-mono text-[13px] tracking-widest uppercase font-semibold">
                  MORZE BAŁTYCKIE
                </text>

                {/* Main Authentic Poland Territory SVG */}
                <g filter="url(#poland-shadow)">
                  <path
                    id="poland-main-land"
                    d={POLAND_DETAILED_PATH}
                    fill="#FCFCFA"
                    stroke="#C5C2B8"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* Subtle internal texture */}
                  <path
                    d={POLAND_DETAILED_PATH}
                    fill="url(#dot-pattern)"
                    stroke="none"
                  />
                </g>

                {/* Regional Dividing Borders (Województwa boundaries) */}
                {POLAND_REGIONS.map((d, i) => (
                  <path
                    key={`region-${i}`}
                    d={d}
                    fill="none"
                    stroke="#D8D4CA"
                    strokeWidth="1.2"
                    strokeDasharray="4,4"
                    className="poland-region-line"
                  />
                ))}

                {/* Major Rivers (Wisła, Odra) */}
                <path
                  d={WISLA_RIVER}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="1.8"
                  strokeOpacity="0.6"
                  strokeLinecap="round"
                  className="poland-river-line"
                />
                <path
                  d={ODRA_RIVER}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  className="poland-river-line"
                />

                {/* River Labels */}
                <text x="440" y="315" className="fill-slate-400 font-mono text-[9px] tracking-wider italic">
                  Wisła
                </text>
                <text x="175" y="420" className="fill-slate-400 font-mono text-[9px] tracking-wider italic">
                  Odra
                </text>

                {/* Connecting Industrial Route Corridors */}
                {branches.map((branch) => {
                  const hqCoords = BRANCH_COORDINATES['oswiecim'];
                  const targetCoords = BRANCH_COORDINATES[branch.id];
                  if (!targetCoords || branch.id === 'oswiecim') return null;

                  const isConnectedActive = effectiveActiveId === branch.id || effectiveActiveId === 'oswiecim';

                  return (
                    <g key={`route-line-${branch.id}`}>
                      <line
                        x1={hqCoords.x}
                        y1={hqCoords.y}
                        x2={targetCoords.x}
                        y2={targetCoords.y}
                        stroke={isConnectedActive ? '#DC2626' : '#CBD5E1'}
                        strokeWidth={isConnectedActive ? '2' : '1'}
                        strokeDasharray={isConnectedActive ? 'none' : '4,4'}
                        strokeOpacity={isConnectedActive ? 0.8 : 0.5}
                        className="transition-all duration-300"
                      />
                      {/* Animated data pulse on active connection */}
                      {isConnectedActive && (
                        <circle r="3.5" fill="#DC2626">
                          <animate
                            attributeName="cx"
                            from={hqCoords.x}
                            to={targetCoords.x}
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            from={hqCoords.y}
                            to={targetCoords.y}
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* HIGH-PRECISION LOCATION PINS (Real map pin design with badges) */}
                {branches.map((branch) => {
                  const coords = BRANCH_COORDINATES[branch.id] || { x: 400, y: 400 };
                  const isCurrent = effectiveActiveId === branch.id;
                  const isHq = branch.id === 'oswiecim';

                  return (
                    <g
                      key={branch.id}
                      id={`pin-${branch.id}`}
                      className="map-interactive-pin cursor-pointer group"
                      onClick={() => setActiveBranchId(branch.id)}
                      onMouseEnter={() => setHoveredBranchId(branch.id)}
                      onMouseLeave={() => setHoveredBranchId(null)}
                      style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                    >
                      {/* Radar Pulse Wave for active pin */}
                      {isCurrent && (
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r={isHq ? 24 : 18}
                          fill="none"
                          stroke="#DC2626"
                          strokeWidth="2"
                          className="animate-ping opacity-35"
                        />
                      )}

                      {/* Wide clickable zone */}
                      <circle cx={coords.x} cy={coords.y} r="32" fill="transparent" />

                      {/* Map Pin Teardrop Shape */}
                      <g
                        transform={`translate(${coords.x}, ${coords.y}) scale(${isCurrent ? 1.25 : 1})`}
                        className="transition-transform duration-300 ease-out"
                        filter={isCurrent ? 'url(#pin-glow)' : 'none'}
                      >
                        {/* Pin body (Teardrop vector pointing at coordinates) */}
                        <path
                          d="M 0,0 C -6,-6 -10,-14 -10,-20 C -10,-28 -4,-34 0,-34 C 4,-34 10,-28 10,-20 C 10,-14 6,-6 0,0 Z"
                          fill={isCurrent ? '#DC2626' : isHq ? '#991B1B' : '#1E293B'}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                        {/* Pin Center Pip */}
                        <circle cx="0" cy="-20" r="3.5" fill="#FFFFFF" />
                      </g>

                      {/* Architectural Floating Label Badge */}
                      <g
                        transform={`translate(${coords.x + (branch.id === 'pulawy' ? -10 : 16)}, ${coords.y - 12})`}
                        className="transition-transform duration-300"
                      >
                        <rect
                          x={branch.id === 'pulawy' ? -105 : 0}
                          y="-14"
                          width={isHq ? 115 : 95}
                          height="24"
                          rx="4"
                          fill={isCurrent ? '#0F172A' : '#FFFFFF'}
                          stroke={isCurrent ? '#DC2626' : '#CBD5E1'}
                          strokeWidth={isCurrent ? '1.5' : '1'}
                          className="shadow-sm transition-colors duration-300"
                        />
                        <text
                          x={branch.id === 'pulawy' ? -105 + 10 : 10}
                          y="2"
                          className={`font-mono text-[11px] font-bold select-none transition-colors duration-300 ${
                            isCurrent ? 'fill-white' : 'fill-slate-900'
                          }`}
                        >
                          {branch.city}
                          {isHq && <tspan className="fill-red-500 ml-1"> [HQ]</tspan>}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom Interactive Legend */}
              <div className="mt-2 pt-2 border-t border-slate-300/60 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                    <strong>HQ</strong> Oświęcim
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    Oddziały regionalne
                  </span>
                </div>
                <div className="text-slate-400">
                  Kliknij pin lub miasto z listy
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE CITY INDEX & DETAILS EXPANSION (~40%) */}
          <div ref={listRef} className="col-span-12 lg:col-span-5">
            <div className="space-y-0">
              <div className="w-full h-px bg-slate-300" />

              {branches.map((branch) => {
                const isSelected = activeBranchId === branch.id;
                const isHovered = hoveredBranchId === branch.id;
                const isItemActive = isSelected || isHovered;
                const isHq = branch.id === 'oswiecim';

                return (
                  <div
                    key={branch.id}
                    className="location-list-row group"
                    onMouseEnter={() => setHoveredBranchId(branch.id)}
                    onMouseLeave={() => setHoveredBranchId(null)}
                  >
                    {/* Clickable Header Row */}
                    <div
                      onClick={() => setActiveBranchId(branch.id)}
                      className="py-5 sm:py-6 flex items-center justify-between cursor-pointer select-none transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 transition-transform duration-300 group-hover:translate-x-1.5">
                        {/* Status Light */}
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            isItemActive ? 'bg-red-600 scale-125' : 'bg-slate-300 group-hover:bg-slate-500'
                          }`}
                        />

                        {/* City Name */}
                        <span
                          className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                            isItemActive ? 'text-slate-950' : 'text-slate-700'
                          }`}
                        >
                          {branch.city}
                        </span>

                        {/* HQ Tag */}
                        {isHq && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                            HQ
                          </span>
                        )}
                      </div>

                      {/* Direction Arrow */}
                      <svg
                        className={`w-5 h-5 transition-all duration-300 ${
                          isSelected
                            ? 'text-red-600 rotate-90 translate-x-1'
                            : isHovered
                            ? 'text-red-600 translate-x-1'
                            : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    {/* Smooth Expandable In-Place Contact Details */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isSelected ? 'max-h-80 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                      }`}
                    >
                      <div className="pl-5 sm:pl-6 pr-2 space-y-3 border-l-2 border-red-600 ml-1 bg-white/50 py-3 rounded-r-lg">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-0.5 font-bold">
                            {isHq ? t.hqBadge : t.branchBadge}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-slate-950">
                            {branch.address}, {branch.postalCode}
                          </h4>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {branch.industrialFocus}
                        </p>

                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono border-t border-slate-200">
                          <div>
                            <span className="text-[10px] uppercase text-slate-400 block mb-0.5">
                              {t.phoneLabel}
                            </span>
                            <a
                              href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                              className="text-slate-900 font-bold hover:text-red-600 transition-colors"
                            >
                              {branch.phone}
                            </a>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-slate-400 block mb-0.5">
                              {t.emailLabel}
                            </span>
                            <a
                              href={`mailto:${branch.email}`}
                              className="text-slate-900 font-bold hover:text-red-600 transition-colors truncate block"
                            >
                              {branch.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-300" />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
