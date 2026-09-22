import React, { useState, useEffect } from 'react';
import { CareerItem } from '../../types/cms';
import { Language } from '../../types';
import { cmsService } from '../../services/cmsService';
import { IndustrialHeader } from '../IndustrialHeader';
import { IndustrialFooter } from '../IndustrialFooter';
import { SEOHead } from '../SEOHead';
import { MapPin, Calendar, ArrowLeft, Mail, Phone, CheckCircle2, Award, ShieldAlert, Sparkles } from 'lucide-react';

interface CareersDetailPageProps {
  slug: string;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: (hash?: string) => void;
  onNavigateCareersList: () => void;
  onNavigateNewsList?: () => void;
  onNavigateService?: (slug: string) => void;
  onOpenLegal?: (doc: any) => void;
}

export const CareersDetailPage: React.FC<CareersDetailPageProps> = ({
  slug,
  currentLang,
  onLanguageChange,
  onNavigateHome,
  onNavigateCareersList,
  onNavigateNewsList,
  onNavigateService,
  onOpenLegal,
}) => {
  const [job, setJob] = useState<CareerItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    cmsService.getCareerBySlug(slug).then((item) => {
      if (isMounted) {
        setJob(item);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const seoTitle = job?.seo_title || (job ? `Praca: ${job.position} | CHEMOROZRUCH` : 'Kariera | CHEMOROZRUCH');
  const seoDesc = job?.meta_description || job?.intro || 'Oferta pracy w CHEMOROZRUCH Sp. z o.o. Sprawdź wymagania i dołącz do naszego zespołu.';
  const canonicalUrl = `https://chemorozruch.pl/kariera/${slug}/`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-900 selection:bg-red-600 selection:text-white">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonicalUrl={canonicalUrl}
        currentLang={currentLang}
        routeSlug={`kariera/${slug}`}
        ogType="article"
      />

      {/* Header */}
      <IndustrialHeader
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenInquiry={() => onNavigateHome('kontakt-cta')}
        onNavigateHome={() => onNavigateHome()}
      />

      <main className="flex-grow pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Navigation back */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateCareersList}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Wszystkie oferty pracy</span>
          </button>

          <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
            CHEMOROZRUCH / KARIERA
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/4" />
            <div className="h-10 bg-slate-200 rounded w-2/3" />
            <div className="h-32 bg-slate-200 rounded-2xl" />
          </div>
        ) : !job ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Nie znaleziono oferty pracy
            </h1>
            <p className="text-xs text-slate-500 mb-6">
              Ogłoszenie mogło zostać zakończone lub przeniesione.
            </p>
            <button
              type="button"
              onClick={onNavigateCareersList}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
            >
              Wróć do listy ofert
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Header / Intro Card */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{job.location}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Opublikowano: {job.publication_date}</span>
                </span>
                {job.status === 'closed' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    Rekrutacja zakończona
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {job.position}
              </h1>

              {job.intro && (
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                  {job.intro}
                </p>
              )}
            </div>

            {/* Main Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                {job.description && (
                  <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                      O stanowisku
                    </h2>
                    <div
                      className="prose prose-slate text-sm sm:text-base leading-relaxed text-slate-700 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </section>
                )}

                {/* Responsibilities */}
                {job.responsibilities && (
                  <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                      Zakres obowiązków
                    </h2>
                    <div
                      className="prose prose-slate text-sm sm:text-base leading-relaxed text-slate-700 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ul>li]:mb-1.5"
                      dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                    />
                  </section>
                )}

                {/* Requirements */}
                {job.requirements && (
                  <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                      Wymagania i kwalifikacje
                    </h2>
                    <div
                      className="prose prose-slate text-sm sm:text-base leading-relaxed text-slate-700 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ul>li]:mb-1.5"
                      dangerouslySetInnerHTML={{ __html: job.requirements }}
                    />
                  </section>
                )}

                {/* Offer */}
                {job.offer && (
                  <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-red-600" />
                      <span>Co oferujemy</span>
                    </h2>
                    <div
                      className="prose prose-slate text-sm sm:text-base leading-relaxed text-slate-700 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ul>li]:mb-1.5 [&>strong]:text-slate-900"
                      dangerouslySetInnerHTML={{ __html: job.offer }}
                    />
                  </section>
                )}
              </div>

              {/* Right Col: How to apply / Contact Card */}
              <div className="space-y-6">
                <div className="sticky top-28 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                  <div>
                    <span className="text-[11px] font-mono tracking-wider text-red-400 uppercase font-bold block mb-1">
                      Rekrutacja
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      Aplikuj na to stanowisko
                    </h2>
                  </div>

                  <div
                    className="text-xs sm:text-sm text-slate-300 leading-relaxed [&>p]:mb-3 [&>strong]:text-white"
                    dangerouslySetInnerHTML={{ __html: job.application_information }}
                  />

                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <a
                      href="mailto:kadry@chemorozruch.pl?subject=Aplikacja:%20Monter%20/%20Spawacz"
                      className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Wyślij CV: kadry@chemorozruch.pl</span>
                    </a>

                    <a
                      href="tel:+48338430081"
                      className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Zadzwoń: +48 33 843 00 81</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal pt-2">
                    Prosimy o dołączenie klauzuli o przetwarzaniu danych osobowych (RODO) do celów rekrutacji.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <IndustrialFooter
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenLegal={onOpenLegal}
        onNavigateNews={onNavigateNewsList}
        onNavigateCareers={onNavigateCareersList}
      />
    </div>
  );
};
