import React, { useState, useEffect, useRef } from 'react';
import { NewsItem } from '../../types/cms';
import { Language, translations } from '../../types';
import { cmsService } from '../../services/cmsService';
import { IndustrialHeader } from '../IndustrialHeader';
import { IndustrialFooter } from '../IndustrialFooter';
import { SEOHead } from '../SEOHead';
import { Calendar, ArrowRight, ArrowLeft, Newspaper, Clock } from 'lucide-react';

interface NewsListPageProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: (hash?: string) => void;
  onNavigateService?: (slug: string) => void;
  onNavigateNewsDetail: (slug: string) => void;
  onOpenLegal?: (doc: any) => void;
  onOpenAdminLogin?: () => void;
}

export const NewsListPage: React.FC<NewsListPageProps> = ({
  currentLang,
  onLanguageChange,
  onNavigateHome,
  onNavigateService,
  onNavigateNewsDetail,
  onOpenLegal,
  onOpenAdminLogin,
}) => {
  const [news, setNews] = useState<NewsItem[]>([]);
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
    cmsService.getPublishedNews().then((items) => {
      if (isMounted) {
        setNews(items);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const pageTitle = currentLang === 'PL'
    ? 'Aktualności i Komunikaty | CHEMOROZRUCH'
    : currentLang === 'EN'
    ? 'News & Announcements | CHEMOROZRUCH'
    : currentLang === 'DE'
    ? 'Aktuelles & Mitteilungen | CHEMOROZRUCH'
    : 'Новини та оголошення | CHEMOROZRUCH';

  const pageDesc = currentLang === 'PL'
    ? 'Bieżące informacje o projektach, rozwoju technologicznym i działalności Przedsiębiorstwa Remontowo-Montażowego CHEMOROZRUCH Sp. z o.o.'
    : 'Latest news, project updates, and technology insights from CHEMOROZRUCH.';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-900 selection:bg-red-600 selection:text-white">
      <SEOHead
        title={pageTitle}
        description={pageDesc}
        canonicalUrl="https://chemorozruch.pl/aktualnosci/"
        currentLang={currentLang}
        routeSlug="aktualnosci"
        ogType="website"
      />

      {/* Header */}
      <IndustrialHeader
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenInquiry={() => onNavigateHome('kontakt-cta')}
        onNavigateHome={() => onNavigateHome()}
      />

      {/* Breadcrumbs & Hero Title */}
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
            CHEMOROZRUCH / AKTUALNOŚCI
          </span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Centrum Informacji</span>
          </div>
          <h1
            onClick={handleHeadingAdminTrigger}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight select-text"
          >
            Aktualności i komunikaty
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Informacje z życia firmy, realizacje kluczowych inwestycji przemysłowych oraz rozwój technologiczny naszych zakładów.
          </p>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 animate-pulse"
              >
                <div className="aspect-[16/10] bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">
              Brak opublikowanych aktualności
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Wkrótce pojawią się tutaj nowe komunikaty i relacje z realizacji.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                onClick={() => onNavigateNewsDetail(item.slug)}
                className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={item.cover_image || '/images/o-firmie/chemorozruch-hala-produkcyjna.webp'}
                    alt={item.image_alt || item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-xs">
                    <Calendar className="w-3 h-3 text-red-400" />
                    <span>{item.publication_date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h2>
                    {item.excerpt && (
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-red-600 group-hover:text-red-700 flex items-center gap-1.5 transition-all group-hover:translate-x-0.5">
                      <span>Czytaj więcej</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Artykuł
                    </span>
                  </div>
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
        onNavigateNews={() => onNavigateHome()}
        onNavigateCareers={() => onNavigateHome()}
      />
    </div>
  );
};
