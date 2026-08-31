import React, { useState } from 'react';
import { Language } from '../types';
import { SERVICE_PAGES_DATA, ServicePageData } from '../data/servicePagesData';
import { SEOHead } from './SEOHead';
import { ChemorozruchLogo } from './ChemorozruchLogo';
import { IndustrialFooter } from './IndustrialFooter';
import { LegalModal, LegalDocType } from './LegalModal';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  Wrench,
  Layers,
  ChevronRight,
  ExternalLink,
  Award,
  Factory,
  Globe,
  FileCheck,
} from 'lucide-react';

interface ServiceLandingPageProps {
  slug: string;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: (hash?: string) => void;
  onNavigateService: (slug: string) => void;
}

export const ServiceLandingPage: React.FC<ServiceLandingPageProps> = ({
  slug,
  currentLang,
  onLanguageChange,
  onNavigateHome,
  onNavigateService,
}) => {
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);
  const data: ServicePageData | undefined = SERVICE_PAGES_DATA[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Strona usługi nie została znaleziona</h1>
          <p className="text-slate-600 mb-6">Przepraszamy, podany adres nie istnieje lub został przeniesiony.</p>
          <button
            onClick={() => onNavigateHome()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do strony głównej
          </button>
        </div>
      </div>
    );
  }

  const meta = data.meta[currentLang] || data.meta.PL;
  const breadcrumb = data.breadcrumbs[currentLang] || data.breadcrumbs.PL;
  const overview = data.overview[currentLang] || data.overview.PL;
  const scope = data.scopeOfWork[currentLang] || data.scopeOfWork.PL;
  const capabilities = data.technicalCapabilities[currentLang] || data.technicalCapabilities.PL;
  const materials = data.materialsAndNorms[currentLang] || data.materialsAndNorms.PL;
  const realizations = data.relatedRealizations[currentLang] || data.relatedRealizations.PL;
  const cta = data.cta[currentLang] || data.cta.PL;

  // Other services for internal cross-linking
  const otherServices = Object.values(SERVICE_PAGES_DATA).filter((s) => s.slug !== slug);

  const langLabels: Record<Language, string> = {
    PL: 'PL',
    EN: 'EN',
    DE: 'DE',
    UA: 'UA',
  };

  const navTranslations = {
    PL: { backHome: 'Strona główna', allServices: 'Wszystkie kompetencje', getQuote: 'Zapytaj o wycenę' },
    EN: { backHome: 'Home', allServices: 'All Capabilities', getQuote: 'Request Quote' },
    DE: { backHome: 'Startseite', allServices: 'Alle Leistungen', getQuote: 'Angebot anfordern' },
    UA: { backHome: 'Головна', allServices: 'Всі послуги', getQuote: 'Запит на розрахунок' },
  }[currentLang];

  return (
    <div className="w-full min-h-screen bg-[#fbfcfd] text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* 1. SEO Head & Dynamic Meta */}
      <SEOHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonicalUrl={data.canonicalUrl}
        currentLang={currentLang}
        ogImage={data.heroImage}
        ogType="article"
        breadcrumbs={[
          { name: breadcrumb.home, url: 'https://chemorozruch.pl/' },
          { name: breadcrumb.section, url: 'https://chemorozruch.pl/#competencies-section' },
          { name: breadcrumb.current, url: data.canonicalUrl },
        ]}
        serviceData={{
          name: meta.h1,
          description: meta.description,
          serviceType: breadcrumb.current,
        }}
      />

      {/* 2. Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigateHome()}
              className="flex items-center gap-3 group focus:outline-hidden"
              aria-label="CHEMOROZRUCH Strona Główna"
            >
              <ChemorozruchLogo className="h-7 sm:h-8 w-auto text-slate-950" />
            </button>
            <div className="hidden md:block h-5 w-[1px] bg-slate-200" />
            <button
              onClick={() => onNavigateHome()}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {navTranslations.backHome}
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Language Switcher */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200/70 text-[11px] font-bold">
              {(['PL', 'EN', 'DE', 'UA'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-1 rounded-md transition-all ${
                    currentLang === lang
                      ? 'bg-white text-slate-950 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {langLabels[lang]}
                </button>
              ))}
            </div>

            {/* Contact CTA */}
            <a
              href={`mailto:${cta.email}?subject=${encodeURIComponent(`Zapytanie ofertowe: ${breadcrumb.current}`)}`}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-red-600 text-white font-poppins font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-red-700 hover:shadow-md transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 hidden xs:block" />
              <span>{navTranslations.getQuote}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative w-full bg-slate-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
        {/* Background Image with Ambient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImage}
            alt={meta.h1}
            className="w-full h-full object-cover object-center brightness-40 contrast-110"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/30 to-slate-950/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400 font-medium overflow-x-auto whitespace-nowrap py-1">
            <button
              onClick={() => onNavigateHome()}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              {breadcrumb.home}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <button
              onClick={() => onNavigateHome('competencies-section')}
              className="hover:text-white transition-colors"
            >
              {breadcrumb.section}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-red-400 font-semibold" aria-current="page">
              {breadcrumb.current}
            </span>
          </nav>

          {/* Primary H1 Heading */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              CHEMOROZRUCH • CERTYFIKOWANE WYKONAWSTWO
            </div>
            <h1 className="font-poppins font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12] mb-5">
              {meta.h1}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-3xl mb-8">
              {meta.subtitle}
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${cta.email}?subject=${encodeURIComponent(`Zapytanie ofertowe: ${breadcrumb.current}`)}`}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-poppins font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{cta.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+48338441400"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>+48 33 844 14 00</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Overview Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight mb-6">
              Kompleksowe inżynieryjne wykonawstwo przemysłowe
            </h2>
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed mb-6">
              {overview.lead}
            </p>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {overview.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Target Keywords / Badges */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Kluczowe obszary specjalizacji
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.targetKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/80 text-xs font-medium text-slate-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info Card */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-sm text-slate-950">
                  Gwarancja jakości i bezpieczeństwa
                </h3>
                <span className="text-xs text-slate-500">Certyfikaty międzynarodowe</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6 text-xs sm:text-sm text-slate-700">
              {capabilities.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>

            <div className="pt-5 border-t border-slate-100">
              <div className="text-xs text-slate-500 mb-1">Dział dedykowany:</div>
              <div className="text-xs font-bold text-slate-900 mb-3">{cta.contactPerson}</div>
              <a
                href={`mailto:${cta.email}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {cta.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Scope of Work Grid */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight mb-3">
              {scope.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {scope.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {scope.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-mono font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="font-poppins font-bold text-lg text-slate-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {item.details.map((det, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                        {det}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technical Capabilities & Specifications Table */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Machine and Capacity Specs */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <Factory className="w-6 h-6 text-red-600" />
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-slate-950">
                {capabilities.title}
              </h2>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                {capabilities.specs.map((spec, i) => (
                  <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 hover:bg-slate-50/70 transition-colors">
                    <span className="font-medium text-slate-600">{spec.label}</span>
                    <span className="font-bold text-slate-950 sm:text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Materials and Standards */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <FileCheck className="w-6 h-6 text-red-600" />
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-slate-950">
                {materials.title}
              </h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Gatunki materiałów i stopy
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {materials.materials.map((mat, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Normy wykonawcze i dyrektywy UE
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {materials.standards.map((std, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                      <span className="font-medium">{std}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured Realizations Case Studies */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
              REFERENCJE BRANŻOWE
            </span>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white tracking-tight mt-1 mb-3">
              {realizations.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Faktyczne realizacje wykonane przez inżynierów i brygady montażowe CHEMOROZRUCH.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {realizations.projects.map((proj, pIdx) => (
              <div
                key={pIdx}
                className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider mb-2">
                    {proj.clientSector}
                  </div>
                  <h3 className="font-poppins font-bold text-base text-white mb-3 leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {proj.scope}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                  <span>Generalne wykonawstwo</span>
                  <button
                    onClick={() => onNavigateHome('realizations-section')}
                    className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                  >
                    Wszystkie projekty
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Internal Cross-Linking to Other Core Services */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mb-10">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-600">
            PEŁNA OFERTA PRZEMYSŁOWA
          </span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight mt-1">
            Pozostałe kluczowe usługi CHEMOROZRUCH
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.map((srv) => {
            const srvMeta = srv.meta[currentLang] || srv.meta.PL;
            const srvBreadcrumb = srv.breadcrumbs[currentLang] || srv.breadcrumbs.PL;
            return (
              <div
                key={srv.slug}
                onClick={() => onNavigateService(srv.slug)}
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-36 rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <img
                      src={srv.heroImage}
                      alt={srvMeta.h1}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-poppins font-bold text-base text-slate-950 group-hover:text-red-600 transition-colors mb-2">
                    {srvBreadcrumb.current}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {srvMeta.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                  <span>Zobacz szczegóły oferty</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Direct Contact CTA Box */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-xs font-bold uppercase tracking-wider mb-4">
            DZIAŁ OFERTOWANIA I PRZYGOTOWANIA PRODUKCJI
          </div>
          <h2 className="font-poppins font-bold text-2xl sm:text-4xl text-white tracking-tight mb-4">
            {cta.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            {cta.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${cta.email}?subject=${encodeURIComponent(`Zapytanie ofertowe: ${breadcrumb.current}`)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-poppins font-bold text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{cta.email}</span>
            </a>
            <a
              href={`tel:${cta.phone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>{cta.phone}</span>
            </a>
          </div>

          <div className="mt-8 text-xs text-slate-400">
            Siedziba główna: ul. Chemików 1, 32-600 Oświęcim • Oddział: ul. Zglenickiego 44, 09-400 Płock
          </div>
        </div>
      </section>

      {/* 10. Global Footer */}
      <IndustrialFooter
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenLegal={(doc) => setLegalDoc(doc)}
      />

      {/* 11. Legal Modals (RODO, Sygnaliści, Polityka Prywatności) */}
      <LegalModal
        isOpen={legalDoc !== null}
        docType={legalDoc}
        onClose={() => setLegalDoc(null)}
      />
    </div>
  );
};
