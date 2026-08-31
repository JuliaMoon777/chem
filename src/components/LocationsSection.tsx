import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations, BranchLocationItem } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Navigation, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  Compass,
  Building2,
  Factory,
  Plus,
  Minus
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LocationsSectionProps {
  currentLang: Language;
}

type MapViewMode = 'oswiecim' | 'plock' | 'overview';
type MapLayerType = 'm' | 'k'; // 'm' = roadmap, 'k' = satellite/hybrid

export const LocationsSection: React.FC<LocationsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].locations;
  const branches: BranchLocationItem[] = t.branches;

  // Active accordion location (default: Oświęcim)
  const [activeBranchId, setActiveBranchId] = useState<string>('oswiecim');
  const [mapViewMode, setMapViewMode] = useState<MapViewMode>('oswiecim');
  const [mapLayer, setMapLayer] = useState<MapLayerType>('m');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const accordionContainerRef = useRef<HTMLDivElement>(null);

  // Active branch object
  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  // Handle location selection
  const handleSelectLocation = (id: string) => {
    setActiveBranchId(id);
    setMapViewMode(id as MapViewMode);
    setIsIframeLoaded(false);
  };

  // Handle Overview mode
  const handleSelectOverview = () => {
    setMapViewMode('overview');
    setIsIframeLoaded(false);
  };

  // Handle copy address
  const handleCopyAddress = (branch: BranchLocationItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const fullAddress = `${branch.address}, ${branch.postalCode} ${branch.city}`;
    navigator.clipboard.writeText(fullAddress);
    setCopiedId(branch.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  // Construct dynamic Google Maps embed URL
  const getMapEmbedUrl = () => {
    if (mapViewMode === 'overview') {
      return `https://maps.google.com/maps?q=CHEMOROZRUCH+O%C5%9Bwi%C4%99cim+P%C5%82ock+Polska&t=${mapLayer}&z=7&ie=UTF8&iwloc=&output=embed`;
    }
    const current = branches.find((b) => b.id === mapViewMode) || branches[0];
    return `https://maps.google.com/maps?q=${encodeURIComponent(current.embedQuery)}&t=${mapLayer}&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  // Entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        );
      }

      if (mapContainerRef.current) {
        tl.fromTo(
          mapContainerRef.current,
          { opacity: 0, scale: 1.015 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (accordionContainerRef.current) {
        tl.fromTo(
          accordionContainerRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
          '-=0.5'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="oddzialy-lokalizacje"
      aria-label="Lokalizacje firmy CHEMOROZRUCH"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#FAF9F5] border-t border-slate-200/80 overflow-hidden"
    >
      {/* Anchor for 'nasze-lokalizacje' navigation alias */}
      <div id="nasze-lokalizacje" className="absolute -top-20 left-0 w-px h-px opacity-0 pointer-events-none" />

      {/* Subtle background technical grid accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025] select-none"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. SECTION HEADER (Minimal, Industrial, High Contrast)
        ========================================================================= */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/80 shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-700 uppercase">
              {t.eyebrow}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
            {t.heading}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.supporting}
          </p>
        </div>

        {/* =========================================================================
            2. MAIN COMPOSITION: 55-60% LEFT (Map) | 40-45% RIGHT (Location Rows)
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ─────────────────────────────────────────────────────────────────────
              LEFT COLUMN: REAL GOOGLE MAP CONTAINER (Span 7 on desktop ~58%)
          ───────────────────────────────────────────────────────────────────── */}
          <div
            ref={mapContainerRef}
            className="lg:col-span-7 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Map Top Control Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 bg-slate-50/90 border-b border-slate-200/80 text-xs">
              
              {/* Location Switcher Pills */}
              <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
                {branches.map((branch) => {
                  const isActive = mapViewMode === branch.id;
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => handleSelectLocation(branch.id)}
                      className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      aria-label={`Pokaż na mapie: ${branch.city}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-500' : 'bg-slate-300'}`} />
                      <span>{branch.city}</span>
                    </button>
                  );
                })}

                {/* Overview Button */}
                <button
                  type="button"
                  onClick={handleSelectOverview}
                  className={`px-2.5 py-1.5 rounded-md font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    mapViewMode === 'overview'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label="Pokaż oba punkty na mapie Polski"
                  title="Widok ogólny Polski"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.viewOverviewLabel}</span>
                  <span className="sm:hidden">Polska</span>
                </button>
              </div>

              {/* Map Layer Toggle (Roadmap / Satellite) & External Direct Link */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMapLayer(mapLayer === 'm' ? 'k' : 'm')}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-100 text-slate-700 font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title={mapLayer === 'm' ? 'Przełącz na widok satelitarny' : 'Przełącz na mapę drogową'}
                  aria-label="Zmień warstwę mapy"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden md:inline font-mono text-[11px]">
                    {mapLayer === 'm' ? 'Satelita' : 'Mapa'}
                  </span>
                </button>

                <a
                  href={activeBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-100 text-slate-700 hover:text-red-600 transition-colors flex items-center justify-center cursor-pointer"
                  title={t.openMapsBtn}
                  aria-label={`${t.openMapsBtn} — ${activeBranch.city}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Map Frame Viewport */}
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] bg-slate-100">
              {/* Skeleton loading animation while iframe refreshes */}
              {!isIframeLoaded && (
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center z-10 animate-pulse">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <MapPin className="w-8 h-8 text-red-500 animate-bounce" />
                    <span className="text-xs font-mono tracking-wider uppercase">Ładowanie Google Maps...</span>
                  </div>
                </div>
              )}

              {/* Real Google Maps Interactive iframe embed */}
              <iframe
                key={`${mapViewMode}-${mapLayer}`}
                title={`Google Maps — CHEMOROZRUCH ${mapViewMode === 'overview' ? 'Polska' : activeBranch.city}`}
                src={getMapEmbedUrl()}
                className="w-full h-full border-0 filter contrast-[1.02]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsIframeLoaded(true)}
              />
            </div>

            {/* Bottom Info Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-50/70 border-t border-slate-200/80 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span>CHEMOROZRUCH S.A. — {activeBranch.role}</span>
              </span>
              <a
                href={activeBranch.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-red-600 font-semibold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                <span>{t.routeBtn}</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────────
              RIGHT COLUMN: LOCATION ACCORDION ROWS (Span 5 on desktop ~42%)
          ───────────────────────────────────────────────────────────────────── */}
          <div
            ref={accordionContainerRef}
            className="lg:col-span-5 flex flex-col space-y-0"
          >
            {branches.map((branch, index) => {
              const isExpanded = activeBranchId === branch.id;
              const isHQ = branch.id === 'oswiecim';

              return (
                <div
                  key={branch.id}
                  className={`group relative transition-all duration-300 ${
                    index > 0 ? 'border-t border-slate-200/80' : ''
                  }`}
                >
                  {/* Location Header Row (Click to toggle & focus map) */}
                  <button
                    type="button"
                    onClick={() => handleSelectLocation(branch.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`location-details-${branch.id}`}
                    className={`w-full py-6 sm:py-7 flex items-center justify-between text-left transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg px-2 -mx-2 ${
                      isExpanded ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4 pr-4">
                      {/* Industrial Icon / Marker indicator */}
                      <div
                        className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          isExpanded
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        }`}
                      >
                        {isHQ ? (
                          <Building2 className="w-4 h-4" />
                        ) : (
                          <Factory className="w-4 h-4" />
                        )}
                      </div>

                      {/* City Name & Role Badge */}
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                            {branch.city}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider ${
                              isExpanded
                                ? 'bg-red-50 text-red-700 border border-red-200/60'
                                : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                            }`}
                          >
                            {isHQ ? t.hqBadge : t.branchBadge}
                          </span>
                        </div>

                        {/* Short address preview when collapsed */}
                        {!isExpanded && (
                          <p className="mt-1 text-sm text-slate-500 font-normal">
                            {branch.address}, {branch.postalCode} {branch.city}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Expand/Collapse Icon (+ / −) */}
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 border ${
                        isExpanded
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-500 border-slate-200 group-hover:border-slate-300 group-hover:text-slate-900'
                      }`}
                    >
                      {isExpanded ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Location Details */}
                  {isExpanded && (
                    <div
                      id={`location-details-${branch.id}`}
                      role="region"
                      aria-label={`Szczegóły lokalizacji ${branch.city}`}
                      className="pb-8 pt-1 px-2 animate-in fade-in slide-in-from-top-2 duration-300"
                    >
                      {/* SEO-optimized Semantic HTML Address */}
                      <address className="not-italic space-y-4">
                        
                        {/* Address Box with Copy Button */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-1">
                            {t.addressLabel}
                          </span>
                          
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-semibold text-slate-900 leading-snug">
                              <p>{branch.address}</p>
                              <p className="text-slate-600">{branch.postalCode} {branch.city}, Polska</p>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handleCopyAddress(branch, e)}
                              className="px-2.5 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                              title={t.copyAddressBtn}
                            >
                              {copiedId === branch.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700 font-bold">{t.copiedLabel}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                                  <span className="hidden sm:inline">{t.copyAddressBtn}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Contact Information (Phone & Email) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Phone Link */}
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              {t.phoneLabel}
                            </span>
                            <a
                              href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-red-600 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 text-red-600" />
                              <span>{branch.phone}</span>
                            </a>
                          </div>

                          {/* Email Link */}
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-1">
                              {t.emailLabel}
                            </span>
                            <a
                              href={`mailto:${branch.email}`}
                              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-red-600 transition-colors truncate"
                            >
                              <Mail className="w-3.5 h-3.5 text-red-600" />
                              <span className="truncate">{branch.email}</span>
                            </a>
                          </div>
                        </div>

                        {/* Operational Scope / Industrial Profile Description */}
                        <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200/70">
                          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase block mb-1.5">
                            {t.focusLabel}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {branch.industrialFocus}
                          </p>
                        </div>

                        {/* Primary & Secondary Route Actions */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <a
                            href={branch.directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer"
                          >
                            <Navigation className="w-4 h-4" />
                            <span>{t.routeBtn} →</span>
                          </a>

                          <a
                            href={branch.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200 font-medium text-sm transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4 text-slate-400" />
                            <span>{t.openMapsBtn}</span>
                          </a>
                        </div>
                      </address>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationsSection;
