import React, { useState, useEffect } from 'react';
import { NewsItem } from '../../types/cms';
import { Language } from '../../types';
import { cmsService } from '../../services/cmsService';
import { IndustrialHeader } from '../IndustrialHeader';
import { IndustrialFooter } from '../IndustrialFooter';
import { SEOHead } from '../SEOHead';
import { Calendar, ArrowLeft, Share2, Check, Building2, PhoneCall } from 'lucide-react';

interface NewsDetailPageProps {
  slug: string;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: (hash?: string) => void;
  onNavigateNewsList: () => void;
  onNavigateCareersList?: () => void;
  onNavigateService?: (slug: string) => void;
  onOpenLegal?: (doc: any) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  slug,
  currentLang,
  onLanguageChange,
  onNavigateHome,
  onNavigateNewsList,
  onNavigateCareersList,
  onNavigateService,
  onOpenLegal,
}) => {
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    cmsService.getNewsBySlug(slug).then((item) => {
      if (isMounted) {
        setArticle(item);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const seoTitle = article?.seo_title || (article ? `${article.title} | CHEMOROZRUCH` : 'Aktualności | CHEMOROZRUCH');
  const seoDesc = article?.meta_description || article?.excerpt || 'Aktualności i komunikaty technologiczne CHEMOROZRUCH.';
  const canonicalUrl = `https://chemorozruch.pl/aktualnosci/${slug}/`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-900 selection:bg-red-600 selection:text-white">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonicalUrl={canonicalUrl}
        currentLang={currentLang}
        routeSlug={`aktualnosci/${slug}`}
        ogType="article"
      />

      {/* Header */}
      <IndustrialHeader
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenInquiry={() => onNavigateHome('kontakt-cta')}
        onNavigateHome={() => onNavigateHome()}
      />

      <main className="flex-grow pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Navigation back */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateNewsList}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Wszystkie aktualności</span>
          </button>

          <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
            CHEMOROZRUCH / AKTUALNOŚCI
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/4" />
            <div className="h-10 bg-slate-200 rounded w-3/4" />
            <div className="aspect-[16/9] bg-slate-200 rounded-2xl" />
            <div className="space-y-3 pt-4">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-4 bg-slate-200 rounded w-4/6" />
            </div>
          </div>
        ) : !article ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Nie znaleziono artykułu
            </h1>
            <p className="text-xs text-slate-500 mb-6">
              Artykuł o podanym adresie nie istnieje lub został wycofany z publikacji.
            </p>
            <button
              type="button"
              onClick={onNavigateNewsList}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
            >
              Wróć do listy aktualności
            </button>
          </div>
        ) : (
          <article className="space-y-8">
            {/* Meta Header */}
            <div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-red-600" />
                  <span>{article.publication_date}</span>
                </span>
                <span>•</span>
                <span>CHEMOROZRUCH Sp. z o.o.</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                  {article.excerpt}
                </p>
              )}
            </div>

            {/* Cover Image */}
            {article.cover_image && (
              <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
                <img
                  src={article.cover_image}
                  alt={article.image_alt || article.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
                {article.image_alt && (
                  <p className="p-3 text-[11px] text-slate-400 text-center bg-slate-50 border-t border-slate-100">
                    {article.image_alt}
                  </p>
                )}
              </div>
            )}

            {/* Rich Content Body */}
            <div
              className="prose prose-slate max-w-none text-slate-800 text-base leading-relaxed [&>p]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ul>li]:mb-1.5 [&>ol>li]:mb-1.5 [&>a]:text-red-600 [&>a]:underline [&>strong]:text-slate-900"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Footer Bar / Share */}
            <div className="pt-8 mt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={onNavigateNewsList}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Powrót do listy aktualności</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-xs"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Skopiowano link!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-500" />
                    <span>Udostępnij artykuł</span>
                  </>
                )}
              </button>
            </div>
          </article>
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
