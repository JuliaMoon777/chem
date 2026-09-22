import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Tag,
} from 'lucide-react';
import { Language, translations } from '../types';
import { REALIZATIONS_GALLERY, RealizationGalleryItem } from '../data/realizationsData';

interface RealizationsSectionProps {
  currentLang: Language;
}

export const RealizationsSection: React.FC<RealizationsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].realizations;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const items = REALIZATIONS_GALLERY;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? items.length - 1 : prev - 1;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === items.length - 1 ? 0 : prev + 1;
    });
  }, [items.length]);

  // Lock body scroll while lightbox is open and handle keyboard events
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  // Touch gesture handlers for mobile swipe in Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      showNext();
    } else if (isRightSwipe) {
      showPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentItem: RealizationGalleryItem | null =
    lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <section
      id="realizacje"
      className="relative w-full bg-[#F7F7F3] text-slate-900 overflow-hidden py-16 sm:py-20 lg:py-24 border-t border-slate-200/80"
    >
      {/* Background Subtle Architectural Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-slate-300/40" />
          <div className="w-px h-full bg-slate-300/25 hidden md:block" />
          <div className="w-px h-full bg-slate-300/25 hidden lg:block" />
          <div className="w-px h-full bg-slate-300/40" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
        {/* 1. INTRO (Clean, Editorial Header) */}
        <div className="max-w-3xl mb-10 sm:mb-12 lg:mb-14">
          <div className="mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-red-600 uppercase">
              {t.eyebrow}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-950 tracking-tight leading-[1.15]">
            {t.heading}
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {t.supporting}
          </p>
        </div>

        {/* 2. GALLERY GRID (8 High-Quality Slots with Aspect Ratio & Lazy Loading) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => {
            const hasTitle = Boolean(item.title[currentLang]);
            const hasCategory = Boolean(item.category[currentLang]);
            const hasLocation = Boolean(item.location[currentLang]);
            const numLabel = String(index + 1).padStart(2, '0');

            return (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Otwórz zdjęcie ${numLabel}`}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              >
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
                  <img
                    src={item.src}
                    alt={item.alt[currentLang] || `Realizacja ${numLabel}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Number Badge (Top-Left) */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="font-mono text-[11px] font-semibold text-white/95 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 tracking-wider">
                      {numLabel}
                    </span>
                  </div>

                  {/* Zoom Action Icon (Top-Right on hover) */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <div className="w-8 h-8 rounded-lg bg-white/90 text-slate-900 flex items-center justify-center shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Optional Metadata Overlay (Bottom) - Appears dynamically when populated */}
                  {(hasTitle || hasCategory || hasLocation) && (
                    <div className="absolute bottom-0 inset-x-0 p-4 z-10 space-y-1 text-white">
                      {hasCategory && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold block">
                          {item.category[currentLang]}
                        </span>
                      )}
                      {hasTitle && (
                        <h3 className="text-sm font-bold leading-tight line-clamp-1">
                          {item.title[currentLang]}
                        </h3>
                      )}
                      {hasLocation && (
                        <p className="text-[11px] text-slate-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{item.location[currentLang]}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Transition Divider Line */}
        <div className="w-full h-px bg-slate-200/80 mt-12 sm:mt-16" />
      </div>

      {/* 3. LIGHTBOX MODAL */}
      {lightboxIndex !== null && currentItem && (
        <div
          id="realizations-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd realizacji"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]"
        >
          {/* Top Bar (Counter & Close) */}
          <div
            className="w-full max-w-7xl mx-auto flex items-center justify-between text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm tracking-widest text-slate-400 uppercase font-medium">
                {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(items.length).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 font-mono">
                | CHEMOROZRUCH
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-[11px] text-slate-400 font-mono mr-2">
                [ESC] Zamknij | [← / →] Nawigacja
              </span>
              <button
                type="button"
                id="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Zamknij podgląd"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Visual Center (Prev, Image, Next) */}
          <div
            className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-2 sm:my-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Prev Button */}
            <button
              type="button"
              id="lightbox-prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Poprzednie zdjęcie"
              className="absolute left-0 sm:left-2 lg:-left-12 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg outline-none focus:ring-2 focus:ring-red-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Image Box */}
            <div className="relative max-h-[70vh] sm:max-h-[75vh] w-full flex items-center justify-center select-none">
              <img
                key={currentItem.id}
                src={currentItem.src}
                alt={currentItem.alt[currentLang] || `Realizacja ${lightboxIndex + 1}`}
                decoding="async"
                className="max-h-[70vh] sm:max-h-[75vh] max-w-[90vw] sm:max-w-[85vw] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              id="lightbox-next-btn"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Następne zdjęcie"
              className="absolute right-0 sm:right-2 lg:-right-12 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg outline-none focus:ring-2 focus:ring-red-500"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Metadata / Thumbnails */}
          <div
            className="w-full max-w-4xl mx-auto z-20 text-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Optional Title/Description if provided */}
            {(currentItem.title[currentLang] ||
              currentItem.category[currentLang] ||
              currentItem.location[currentLang] ||
              currentItem.description[currentLang]) && (
              <div className="bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 text-left max-w-2xl mx-auto">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {currentItem.category[currentLang] && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold px-2 py-0.5 rounded bg-red-950/50 border border-red-800/40">
                      {currentItem.category[currentLang]}
                    </span>
                  )}
                  {currentItem.location[currentLang] && (
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {currentItem.location[currentLang]}
                    </span>
                  )}
                </div>
                {currentItem.title[currentLang] && (
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {currentItem.title[currentLang]}
                  </h4>
                )}
                {currentItem.description[currentLang] && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {currentItem.description[currentLang]}
                  </p>
                )}
              </div>
            )}

            {/* Thumbnail Navigation Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-none max-w-full">
              {items.map((item, idx) => {
                const isActive = idx === lightboxIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`Przejdź do zdjęcia ${idx + 1}`}
                    className={`relative w-12 h-9 sm:w-14 sm:h-10 rounded-md overflow-hidden shrink-0 transition-all cursor-pointer border ${
                      isActive
                        ? 'border-red-500 ring-2 ring-red-500/50 scale-105 opacity-100'
                        : 'border-white/10 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RealizationsSection;
