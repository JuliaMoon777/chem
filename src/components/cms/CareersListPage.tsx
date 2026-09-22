import React, { useState, useEffect, useRef } from 'react';
import { CareerItem } from '../../types/cms';
import { Language } from '../../types';
import { cmsService } from '../../services/cmsService';
import { IndustrialHeader } from '../IndustrialHeader';
import { IndustrialFooter } from '../IndustrialFooter';
import { SEOHead } from '../SEOHead';
import { Briefcase, MapPin, ArrowRight, ArrowLeft, Users, ShieldCheck, Award } from 'lucide-react';

interface CareersListPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: (hash?: string) => void;
  onNavigateCareerDetail: (slug: string) => void;
  onNavigateNews?: () => void;
  onNavigateService?: (slug: string) => void;
  onOpenLegal?: (doc: any) => void;
  onOpenAdminLogin?: () => void;
}

export const CareersListPage: React.FC<CareersListPageProps> = ({
  currentLang,
  onLanguageChange,
  onNavigateHome,
  onNavigateCareerDetail,
  onNavigateNews,
  onNavigateService,
  onOpenLegal,
  onOpenAdminLogin,
}) => {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hidden 5-click/tap admin trigger on main heading
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleHeadingAdminTrigger = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      if (onOpenAdminLogin) {
        onOpenAdminLogin();
      }
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    cmsService.getPublishedCareers().then((items) => {
      if (isMounted) {
        setCareers(items);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const pageTitle = currentLang === 'PL'
    ? 'Kariera i Oferty Pracy | CHEMOROZRUCH'
    : currentLang === 'EN'
    ? 'Careers & Job Opportunities | CHEMOROZRUCH'
    : currentLang === 'DE'
    ? 'Karriere & Stellenangebote | CHEMOROZRUCH'
    : 'Кар’єра та вакансії | CHEMOROZRUCH';

  const pageDesc = currentLang === 'PL'
    ? 'Dołącz do zespołu inżynierów, monterów i spawaczy CHEMOROZRUCH. Stabilne zatrudnienie, bezpieczne warunki i praca przy prestiżowych inwestycjach przemysłowych.'
    : 'Join the engineering and fabrication team at CHEMOROZRUCH. Explore open jobs for fitters, welders, and technical specialists.';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-900 selection:bg-red-600 selection:text-white">
      <SEOHead
        title={pageTitle}
        description={pageDesc}
        canonicalUrl="https://chemorozruch.pl/kariera/"
        currentLang={currentLang}
        routeSlug="kariera"
        ogType="website"
      />

      {/* Header */}
      <IndustrialHeader
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenInquiry={() => onNavigateHome('kontakt-cta')}
        onNavigateHome={() => onNavigateHome()}
      />

      <main className="flex-grow pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigateHome()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Strona główna</span>
          </button>

          <span className="text-xs text-slate-400 font-mono">
            CHEMOROZRUCH / KARIERA
          </span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Rekrutacja i Rozwój</span>
          </div>
          <h1
            onClick={handleHeadingAdminTrigger}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight select-text"
          >
            Kariera
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Budujemy trwałe relacje, stawiamy na najwyższe bezpieczeństwo pracy oraz rozwój kompetencji monterskich, spawalniczych i inżynierskich.
          </p>
        </div>

        {/* Company Values Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="p-3 w-fit rounded-xl bg-red-50 text-red-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Stabilność i Bezpieczeństwo
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ponad 50 lat tradycji na rynku przemysłowym. Umowa o pracę, terminowe wypłaty i najwyższe standardy BHP.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="p-3 w-fit rounded-xl bg-red-50 text-red-600 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Certyfikacja i Rozwój
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Finansujemy odnowienia i poszerzanie uprawnień spawalniczych (TUV, UDT) oraz kwalifikacji monterskich.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="p-3 w-fit rounded-xl bg-red-50 text-red-600 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Doświadczona Kadra
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Praca w zespole zaufanych fachowców pod bezpośrednim nadzorem Głównego Spawalnika (IWE) i kierowników projektów.
            </p>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Aktualne Oferty Pracy ({careers.length})
          </h2>
          <span className="text-xs text-slate-500">
            Oświęcim / Płock / Projekty wyjazdowe
          </span>
        </div>

        {/* Job Offers List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse space-y-3">
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : careers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">
              Brak aktywnych rekrutacji w tej chwili
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Prześlij swoje CV spontanicznie na adres: <strong className="text-slate-700">kadry@chemorozruch.pl</strong> – chętnie skontaktujemy się przy nowych projektach.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {careers.map((job) => (
              <article
                key={job.id}
                onClick={() => onNavigateCareerDetail(job.slug)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {job.position}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      <MapPin className="w-3 h-3 text-red-600" />
                      <span>{job.location}</span>
                    </span>
                  </div>

                  {job.intro && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {job.intro}
                    </p>
                  )}
                </div>

                <div className="shrink-0 flex items-center md:justify-end">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 group-hover:bg-red-600 text-white text-xs font-bold transition-all shadow-xs group-hover:shadow-md">
                    <span>Zobacz ofertę</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <IndustrialFooter
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenLegal={onOpenLegal}
        onNavigateNews={onNavigateNews}
        onNavigateCareers={() => onNavigateHome()}
      />
    </div>
  );
};
