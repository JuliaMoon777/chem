import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations } from '../types';
const contactHeroImg = '/images/kontakt_instalacje_przemyslowe_1787219382832.jpg';

gsap.registerPlugin(ScrollTrigger);

interface ContactCTASectionProps {
  currentLang: Language;
}

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].contactCTA;

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form inputs
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    rodo: true,
  });

  // Focus tracking for minimal input underline animations
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // References
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const ctaBtnRef = useRef<HTMLDivElement>(null);
  const directContactRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);

  // Scroll entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // 1. Entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Image container reveal
      if (imageContainerRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { opacity: 0, scale: 1.025 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }
        );
      }

      // Content column stagger
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.6'
        );
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.35'
        );
      }

      if (supportingRef.current) {
        tl.fromTo(
          supportingRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (ctaBtnRef.current) {
        tl.fromTo(
          ctaBtnRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.25'
        );
      }

      if (directContactRef.current) {
        tl.fromTo(
          directContactRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        );
      }

      // 2. Subtle inside-image vertical parallax during scroll (translateY -3% to +3%)
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { yPercent: -3, scale: 1.06 },
          {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  // Form expansion animation
  useEffect(() => {
    if (!formWrapRef.current) return;

    if (isFormOpen) {
      gsap.fromTo(
        formWrapRef.current,
        { height: 0, opacity: 0, y: 16 },
        {
          height: 'auto',
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }
      );
    }
  }, [isFormOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate swift server response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      rodo: true,
    });
    setIsSubmitted(false);
  };

  return (
    <section
      id="kontakt-cta"
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F5] text-slate-900 overflow-hidden py-24 sm:py-32 lg:py-36 border-t border-slate-200"
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
        
        {/* Main Desktop Grid: LEFT (~55-60%) Image Scene + RIGHT (~40-45%) Minimal CTA Content */}
        <div className="grid grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">

          {/* LEFT: Large Premium Industrial Photograph with Subtle Parallax (~58%) */}
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <div
              ref={imageContainerRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl shadow-sm border border-slate-200/90 bg-slate-100 select-none"
            >
              <img
                ref={imageInnerRef}
                src={contactHeroImg}
                alt="Nowoczesne instalacje przemysłowe Chemorozruch"
                className="w-full h-full object-cover will-change-transform"
                loading="lazy"
              />

              {/* Delicate daylight contrast vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />

              {/* Understated bottom badge */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white/90 bg-slate-950/50 backdrop-blur-xs px-2.5 py-1 rounded">
                  CHEMOROZRUCH • ZAKŁAD & INSTALACJE
                </span>
                <span className="text-[10px] font-mono text-white/80 hidden sm:inline-block">
                  READY FOR EXECUTION
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Headline, Primary CTA & In-Place Minimal Underline Form (~42%) */}
          <div ref={contentColRef} className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between">
            
            {/* Header & Typography */}
            <div>
              <div ref={eyebrowRef} className="mb-3">
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-slate-500 uppercase">
                  {t.eyebrow}
                </span>
              </div>

              <h2
                ref={headingRef}
                className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-950 tracking-tight leading-[1.14]"
              >
                {t.heading}
              </h2>

              <p
                ref={supportingRef}
                className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
              >
                {t.supporting}
              </p>
            </div>

            {/* Primary Action Button (Default State) */}
            {!isFormOpen && (
              <div ref={ctaBtnRef} className="mt-8 sm:mt-10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-base rounded-md shadow-xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{t.primaryCtaBtn}</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            )}

            {/* In-Place Smooth Expandable Minimal Underline Form */}
            {isFormOpen && (
              <div ref={formWrapRef} className="mt-8 sm:mt-10 pt-4 overflow-hidden">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header bar of open form with close toggle */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                        {t.form.submitBtn.replace('→', '').trim()}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="text-xs font-mono text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        {t.hideFormBtn} ✕
                      </button>
                    </div>

                    {/* Field: Name */}
                    <div className="relative">
                      <label
                        className={`block text-xs font-mono transition-colors duration-200 mb-1 ${
                          focusedField === 'name' ? 'text-red-600 font-bold' : 'text-slate-500'
                        }`}
                      >
                        {t.form.nameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t.form.namePlaceholder}
                        className="w-full bg-transparent py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 border-0 border-b border-slate-300 focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Field: Company */}
                    <div className="relative">
                      <label
                        className={`block text-xs font-mono transition-colors duration-200 mb-1 ${
                          focusedField === 'company' ? 'text-red-600 font-bold' : 'text-slate-500'
                        }`}
                      >
                        {t.form.companyLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t.form.companyPlaceholder}
                        className="w-full bg-transparent py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 border-0 border-b border-slate-300 focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Grid for Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <label
                          className={`block text-xs font-mono transition-colors duration-200 mb-1 ${
                            focusedField === 'email' ? 'text-red-600 font-bold' : 'text-slate-500'
                          }`}
                        >
                          {t.form.emailLabel} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder={t.form.emailPlaceholder}
                          className="w-full bg-transparent py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 border-0 border-b border-slate-300 focus:border-red-600 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="relative">
                        <label
                          className={`block text-xs font-mono transition-colors duration-200 mb-1 ${
                            focusedField === 'phone' ? 'text-red-600 font-bold' : 'text-slate-500'
                          }`}
                        >
                          {t.form.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          placeholder={t.form.phonePlaceholder}
                          className="w-full bg-transparent py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 border-0 border-b border-slate-300 focus:border-red-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Field: Message */}
                    <div className="relative">
                      <label
                        className={`block text-xs font-mono transition-colors duration-200 mb-1 ${
                          focusedField === 'message' ? 'text-red-600 font-bold' : 'text-slate-500'
                        }`}
                      >
                        {t.form.messageLabel} *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t.form.messagePlaceholder}
                        className="w-full bg-transparent py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 border-0 border-b border-slate-300 focus:border-red-600 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* RODO Consent Checkbox */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="rodo-checkbox"
                        required
                        checked={formData.rodo}
                        onChange={(e) => setFormData({ ...formData, rodo: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                      />
                      <label htmlFor="rodo-checkbox" className="text-xs text-slate-500 leading-snug cursor-pointer select-none">
                        {t.form.rodoConsent}
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-slate-400 text-white font-semibold text-sm rounded-md shadow-xs transition-all duration-200 cursor-pointer"
                      >
                        <span>{isSubmitting ? t.form.submitting : t.form.submitBtn}</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Success Confirmation State (Clean, Understated) */
                  <div className="py-6 px-5 bg-white/70 border border-slate-200/90 rounded-lg">
                    <div className="flex items-center gap-2.5 text-red-600 mb-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <h4 className="text-base font-bold text-slate-950">
                        {t.form.successHeading}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                      {t.form.successMessage}
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-mono font-bold text-red-600 hover:text-red-700 underline underline-offset-4 cursor-pointer"
                    >
                      {t.form.backBtn}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Direct Company Contact Details (Quietly Displayed Below CTA) */}
            <div
              ref={directContactRef}
              className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 text-xs font-mono"
            >
              <span className="text-[10px] uppercase text-slate-400 tracking-wider block mb-3 font-semibold">
                {t.directContact.label} • {t.directContact.hqLabel}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block mb-0.5">Adres</span>
                  <span className="text-slate-800 font-medium">{t.directContact.address}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Telefon & Email</span>
                  <div className="space-y-0.5">
                    <a
                      href={`tel:${t.directContact.phone.replace(/\s+/g, '')}`}
                      className="group flex items-center gap-1.5 text-slate-800 font-bold hover:text-red-600 transition-colors"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        {t.directContact.phone}
                      </span>
                    </a>
                    <a
                      href={`mailto:${t.directContact.email}`}
                      className="group flex items-center gap-1.5 text-slate-800 font-bold hover:text-red-600 transition-colors"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        {t.directContact.email}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactCTASection;
