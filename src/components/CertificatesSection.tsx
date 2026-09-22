import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  FileCheck,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Language, translations } from '../types';
import { CERTIFICATES_DATA, CertificateDataItem } from '../data/certificatesData';

interface CertificatesSectionProps {
  currentLang: Language;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].certificates;
  const certificates: CertificateDataItem[] = CERTIFICATES_DATA;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Touch gesture coordinates for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeCert = certificates[currentIndex] || certificates[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  }, [certificates.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  }, [certificates.length]);

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  // Keyboard navigation & body scroll management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    if (isLightboxOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isLightboxOpen, closeLightbox, handlePrev, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentNumLabel = String(currentIndex + 1).padStart(2, '0');
  const totalNumLabel = String(certificates.length).padStart(2, '0');

  return (
    <section
      id="certyfikaty-jakosc"
      aria-label="Certyfikaty i uprawnienia"
      className="relative w-full bg-[#F6F6F3] text-slate-900 overflow-hidden py-16 sm:py-24 lg:py-28 border-t border-slate-200/80"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-slate-300/40" />
          <div className="w-px h-full bg-slate-300/20 hidden md:block" />
          <div className="w-px h-full bg-slate-300/20 hidden lg:block" />
          <div className="w-px h-full bg-slate-300/40" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Grid: Left Column (Intro & Certificate Metadata) / Right Column (Document Viewport & Slider) */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* LEFT COLUMN: Section Title, Supporting Info, Certificate Title & Interactive Controls */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <div>
              {/* Eyebrow */}
              <div className="mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-red-600 uppercase">
                  {t.eyebrow}
                </span>
              </div>

              {/* Main Heading (Preserved Exact Title) */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                {t.heading}
              </h2>

              {/* Supporting Line (Preserved Exact Description) */}
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                {t.supporting}
              </p>

              {/* Direct Certificate Navigation Tabs */}
              <div className="mt-6 sm:mt-8 pt-6 border-t border-slate-200/80">
                <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-500 uppercase block mb-3">
                  {currentLang === 'PL'
                    ? 'Wybierz dokument:'
                    : currentLang === 'EN'
                    ? 'Select document:'
                    : currentLang === 'DE'
                    ? 'Dokument auswählen:'
                    : 'Оберіть документ:'}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                  {certificates.map((cert, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={cert.id}
                        type="button"
                        id={`cert-tab-${cert.id}`}
                        onClick={() => setCurrentIndex(idx)}
                        aria-pressed={isActive}
                        className={`min-h-[44px] px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all text-left flex items-center justify-between border cursor-pointer ${
                          isActive
                            ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                            : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border-slate-200/90'
                        }`}
                      >
                        <span className="truncate">{cert.type}</span>
                        <span
                          className={`font-mono text-[10px] ml-2 px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-red-600 text-white font-bold'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Document Details Card (HTML Text Titles for SEO & Clarity) */}
              <div
                id="active-certificate-info"
                className="mt-6 bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 border border-red-200/60 text-red-700 text-xs font-mono font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{activeCert.type}</span>
                  </div>

                  <span className="font-mono text-xs font-medium text-slate-400">
                    {currentNumLabel} / {totalNumLabel}
                  </span>
                </div>

                {/* HTML Text Title of the Certificate */}
                <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug">
                  {activeCert.title[currentLang]}
                </h3>

                {/* Short true description if available */}
                {activeCert.description[currentLang] && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeCert.description[currentLang]}
                  </p>
                )}

                {/* Action Buttons: Prev / Next / Zoom */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  {/* Slider Arrow Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id="cert-prev-btn"
                      onClick={handlePrev}
                      aria-label={t.prevCertLabel || 'Poprzedni certyfikat'}
                      className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      id="cert-next-btn"
                      onClick={handleNext}
                      aria-label={t.nextCertLabel || 'Następny certyfikat'}
                      className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Zoom Fullscreen Trigger */}
                  <button
                    type="button"
                    id="cert-zoom-btn"
                    onClick={openLightbox}
                    aria-label={t.zoomCertLabel || 'Powiększ skan dokumentu'}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>
                      {currentLang === 'PL'
                        ? 'Powiększ skan'
                        : currentLang === 'EN'
                        ? 'Enlarge scan'
                        : currentLang === 'DE'
                        ? 'Scan vergrößern'
                        : 'Збільшити скан'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quiet Trust Note at Bottom of Column */}
            <div className="pt-5 border-t border-slate-200/80">
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                {t.trustNote}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Document Showcase Viewport (Contain mode, no clipping) */}
          <div className="col-span-12 lg:col-span-7">
            <div
              id="certificate-viewer-frame"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full rounded-2xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center"
            >
              {/* Document Header Bar */}
              <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2 font-mono">
                  <FileCheck className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-semibold text-slate-800">
                    {activeCert.title[currentLang]}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  {currentNumLabel} / {totalNumLabel}
                </span>
              </div>

              {/* Main Document Frame with object-fit: contain (Guarantees zero cropping of document) */}
              <div
                onClick={openLightbox}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox();
                  }
                }}
                aria-label={`Otwórz pełny podgląd: ${activeCert.title[currentLang]}`}
                className="group relative w-full h-[380px] sm:h-[480px] lg:h-[540px] bg-slate-50/80 rounded-xl border border-slate-200/70 p-3 sm:p-4 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {/* Document Scan with object-fit: contain */}
                <img
                  key={activeCert.id}
                  src={activeCert.src}
                  alt={activeCert.alt[currentLang] || activeCert.title[currentLang]}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain rounded-sm transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />

                {/* Hover Zoom Badge Overlay */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/85 text-white text-xs font-mono backdrop-blur-sm shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>
                      {currentLang === 'PL'
                        ? 'Kliknij, aby powiększyć'
                        : currentLang === 'EN'
                        ? 'Click to enlarge'
                        : currentLang === 'DE'
                        ? 'Zum Vergrößern klicken'
                        : 'Натисніть для збільшення'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Indicator Strip */}
              <div className="w-full mt-4 pt-3 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  {certificates.map((_, idx) => (
                    <button
                      key={`indicator-${idx}`}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Przejdź do certyfikatu ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentIndex
                          ? 'w-6 bg-red-600'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-mono text-slate-400">
                  CHEMOROZRUCH • QUALITY ASSURANCE
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* LIGHTBOX FULLSCREEN PREVIEW MODAL */}
      {isLightboxOpen && (
        <div
          id="certificates-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd certyfikatu"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]"
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-6xl mx-auto flex items-center justify-between text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm tracking-widest text-slate-400 uppercase font-medium">
                {currentNumLabel} / {totalNumLabel}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                {activeCert.title[currentLang]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-[11px] text-slate-400 font-mono mr-2">
                [ESC] Zamknij | [← / →] Nawigacja
              </span>
              <button
                type="button"
                id="cert-lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Zamknij podgląd certyfikatu"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Document Area */}
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
              id="cert-lightbox-prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Poprzedni certyfikat"
              className="absolute left-0 sm:left-2 lg:-left-12 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg outline-none focus:ring-2 focus:ring-red-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Document Image in Fullscreen Modal */}
            <div className="relative max-h-[75vh] sm:max-h-[80vh] w-full flex items-center justify-center select-none">
              <img
                key={`modal-${activeCert.id}`}
                src={activeCert.src}
                alt={activeCert.alt[currentLang] || activeCert.title[currentLang]}
                decoding="async"
                className="max-h-[75vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-lg shadow-2xl bg-white p-2 sm:p-3 border border-white/10"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              id="cert-lightbox-next-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Następny certyfikat"
              className="absolute right-0 sm:right-2 lg:-right-12 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg outline-none focus:ring-2 focus:ring-red-500"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div
            className="w-full max-w-4xl mx-auto z-20 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-none max-w-full">
              {certificates.map((cert, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={`modal-thumb-${cert.id}`}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Przejdź do: ${cert.type}`}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-mono font-medium shrink-0 transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-red-600 text-white border-red-500 shadow-md ring-2 ring-red-500/50'
                        : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/10'
                    }`}
                  >
                    {cert.type}
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

export default CertificatesSection;
