import React, { useState, useEffect, useCallback } from 'react';
import { Language } from './types';
import { ParallaxSite } from './components/ParallaxSite';
import { ServiceLandingPage } from './components/ServiceLandingPage';
import { LegalDocType, LegalModal } from './components/LegalModal';
import { SEOHead } from './components/SEOHead';
import { NewsListPage } from './components/cms/NewsListPage';
import { NewsDetailPage } from './components/cms/NewsDetailPage';
import { CareersListPage } from './components/cms/CareersListPage';
import { CareersDetailPage } from './components/cms/CareersDetailPage';
import { AdminLoginModal } from './components/cms/AdminLoginModal';
import { AdminPanel } from './components/cms/AdminPanel';
import { cmsService } from './services/cmsService';

// 1. New Dedicated SEO Landing Pages (Target keywords & organic visibility)
const SERVICE_ROUTES: Record<string, string> = {
  'konstrukcje-stalowe': 'konstrukcje-stalowe',
  'remonty-modernizacje-instalacji-przemyslowych': 'remonty-modernizacje-instalacji-przemyslowych',
  'aparaty-cisnieniowe': 'aparaty-cisnieniowe',
  'montaz-urzadzen-przemyslowych': 'montaz-urzadzen-przemyslowych',
};

// 2. Verified Legal Document Direct Routes
const LEGAL_ROUTES: Record<string, LegalDocType> = {
  'rodo': 'rodo',
  'sygnalisci': 'sygnalisci',
  'polityka-prywatnosci': 'polityka-prywatnosci',
};

// 3. Confirmed Historical Production URLs (Client-side fallback for 301 server redirects)
const CONFIRMED_LEGACY_REDIRECTS: Record<string, string> = {
  '/o-firmie': 'company-discovery-section',
  '/oferta': 'competencies-section',
  '/certyfikaty': 'certificates-section',
  '/realizacje': 'realizations-section',
  '/kontakt': 'kontakt-cta',
};

type ViewRoute =
  | { type: 'home' }
  | { type: 'service'; slug: string }
  | { type: 'news-list' }
  | { type: 'news-detail'; slug: string }
  | { type: 'careers-list' }
  | { type: 'careers-detail'; slug: string }
  | { type: 'admin' };

/**
 * Parses pathname and returns the active language, route type, and optional legal doc.
 */
function parseUrl(pathname: string, search: string): {
  lang: Language;
  route: ViewRoute;
  legalDoc?: LegalDocType;
} {
  const parts = pathname.split('/').filter(Boolean);
  let lang: Language = 'PL';

  if (parts.length > 0) {
    const firstPart = parts[0].toLowerCase();
    if (firstPart === 'en') {
      lang = 'EN';
      parts.shift();
    } else if (firstPart === 'de') {
      lang = 'DE';
      parts.shift();
    } else if (firstPart === 'uk' || firstPart === 'ua') {
      lang = 'UA';
      parts.shift();
    }
  }

  // Fallback check for query params (?lang=en)
  if (lang === 'PL' && search) {
    const params = new URLSearchParams(search);
    const langParam = params.get('lang')?.toUpperCase();
    if (langParam === 'EN' || langParam === 'DE') {
      lang = langParam as Language;
    } else if (langParam === 'UK' || langParam === 'UA') {
      lang = 'UA';
    }
  }

  const firstSlug = parts[0] || '';
  const secondSlug = parts[1] || '';

  // Legal docs check
  const legalDoc = firstSlug && LEGAL_ROUTES[firstSlug] ? LEGAL_ROUTES[firstSlug] : undefined;

  // Route matching
  if (firstSlug === 'admin' || firstSlug === 'panel') {
    return { lang, route: { type: 'admin' }, legalDoc };
  }

  if (firstSlug === 'aktualnosci') {
    if (secondSlug) {
      return { lang, route: { type: 'news-detail', slug: secondSlug }, legalDoc };
    }
    return { lang, route: { type: 'news-list' }, legalDoc };
  }

  if (firstSlug === 'kariera') {
    if (secondSlug) {
      return { lang, route: { type: 'careers-detail', slug: secondSlug }, legalDoc };
    }
    return { lang, route: { type: 'careers-list' }, legalDoc };
  }

  if (firstSlug && SERVICE_ROUTES[firstSlug]) {
    return { lang, route: { type: 'service', slug: SERVICE_ROUTES[firstSlug] }, legalDoc };
  }

  return { lang, route: { type: 'home' }, legalDoc };
}

/**
 * Builds localized canonical path
 */
export function buildLocalizedPath(slug: string | undefined, lang: Language): string {
  const prefix = lang === 'PL' ? '' : lang === 'UA' ? '/uk' : `/${lang.toLowerCase()}`;
  if (!slug) {
    return prefix === '' ? '/' : `${prefix}/`;
  }
  const cleanSlug = slug.replace(/^\//, '').replace(/\/$/, '');
  const isLegal = cleanSlug === 'rodo' || cleanSlug === 'sygnalisci' || cleanSlug === 'polityka-prywatnosci';
  return `${prefix}/${cleanSlug}${isLegal ? '' : '/'}`;
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('PL');
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>({ type: 'home' });
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Check initial auth on mount
  useEffect(() => {
    cmsService.checkSession().then((auth) => {
      setIsAdminLoggedIn(auth.isAuthenticated);
    });
  }, []);

  // Sync state with current location
  const handleLocationChange = useCallback(() => {
    const { pathname, search, hash } = window.location;
    const { lang, route, legalDoc } = parseUrl(pathname, search);

    setCurrentLang(lang);
    setCurrentRoute(route);
    setActiveLegalDoc(legalDoc || null);

    // If navigated to /admin and not logged in, open login modal
    if (route.type === 'admin' && !isAdminLoggedIn) {
      setIsAdminModalOpen(true);
    }

    // Check confirmed client-side legacy redirect fallbacks
    const cleanPath = pathname.replace(/\/$/, '') || '/';
    const targetHash = CONFIRMED_LEGACY_REDIRECTS[cleanPath];
    if (targetHash) {
      const homePath = buildLocalizedPath(undefined, lang);
      window.history.replaceState({}, '', `${homePath}#${targetHash}`);
      setTimeout(() => {
        document.getElementById(targetHash)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (hash) {
      const hashId = hash.replace(/^#/, '');
      setTimeout(() => {
        document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [isAdminLoggedIn]);

  useEffect(() => {
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [handleLocationChange]);

  // Language switch handler
  const handleLanguageChange = (newLang: Language) => {
    let slug: string | undefined;
    if (activeLegalDoc) {
      slug = activeLegalDoc;
    } else if (currentRoute.type === 'service') {
      slug = currentRoute.slug;
    } else if (currentRoute.type === 'news-list') {
      slug = 'aktualnosci';
    } else if (currentRoute.type === 'news-detail') {
      slug = `aktualnosci/${currentRoute.slug}`;
    } else if (currentRoute.type === 'careers-list') {
      slug = 'kariera';
    } else if (currentRoute.type === 'careers-detail') {
      slug = `kariera/${currentRoute.slug}`;
    }

    const targetPath = buildLocalizedPath(slug, newLang);
    window.history.pushState({}, '', targetPath);
    setCurrentLang(newLang);
  };

  // Home navigation handler
  const handleNavigateHome = (hash?: string) => {
    const targetPath = buildLocalizedPath(undefined, currentLang);
    const fullUrl = hash ? `${targetPath}#${hash}` : targetPath;
    window.history.pushState({}, '', fullUrl);
    setCurrentRoute({ type: 'home' });
    setActiveLegalDoc(null);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Service navigation handler
  const handleNavigateService = (slug: string) => {
    const targetPath = buildLocalizedPath(slug, currentLang);
    window.history.pushState({}, '', targetPath);
    setCurrentRoute({ type: 'service', slug });
    setActiveLegalDoc(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // News navigation handlers
  const handleNavigateNewsList = () => {
    const targetPath = buildLocalizedPath('aktualnosci', currentLang);
    window.history.pushState({}, '', targetPath);
    setCurrentRoute({ type: 'news-list' });
    setActiveLegalDoc(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateNewsDetail = (slug: string) => {
    const targetPath = buildLocalizedPath(`aktualnosci/${slug}`, currentLang);
    window.history.pushState({}, '', targetPath);
    setCurrentRoute({ type: 'news-detail', slug });
    setActiveLegalDoc(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Careers navigation handlers
  const handleNavigateCareersList = () => {
    const targetPath = buildLocalizedPath('kariera', currentLang);
    window.history.pushState({}, '', targetPath);
    setCurrentRoute({ type: 'careers-list' });
    setActiveLegalDoc(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCareerDetail = (slug: string) => {
    const targetPath = buildLocalizedPath(`kariera/${slug}`, currentLang);
    window.history.pushState({}, '', targetPath);
    setCurrentRoute({ type: 'careers-detail', slug });
    setActiveLegalDoc(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin triggers
  const handleOpenAdminLogin = () => {
    if (isAdminLoggedIn) {
      window.history.pushState({}, '', '/admin/');
      setCurrentRoute({ type: 'admin' });
    } else {
      setIsAdminModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminModalOpen(false);
    window.history.pushState({}, '', '/admin/');
    setCurrentRoute({ type: 'admin' });
  };

  const handleAdminLogout = async () => {
    await cmsService.logout();
    setIsAdminLoggedIn(false);
    handleNavigateHome();
  };

  // Legal document open/close
  const handleOpenLegal = (doc: LegalDocType) => {
    if (doc) {
      const targetPath = buildLocalizedPath(doc, currentLang);
      window.history.pushState({}, '', targetPath);
      setActiveLegalDoc(doc);
    }
  };

  const handleCloseLegal = () => {
    setActiveLegalDoc(null);
    const { pathname } = window.location;
    if (pathname.includes('/rodo') || pathname.includes('/sygnalisci') || pathname.includes('/polityka-prywatnosci')) {
      let baseSlug: string | undefined;
      if (currentRoute.type === 'service') baseSlug = currentRoute.slug;
      else if (currentRoute.type === 'news-list') baseSlug = 'aktualnosci';
      else if (currentRoute.type === 'news-detail') baseSlug = `aktualnosci/${currentRoute.slug}`;
      else if (currentRoute.type === 'careers-list') baseSlug = 'kariera';
      else if (currentRoute.type === 'careers-detail') baseSlug = `kariera/${currentRoute.slug}`;

      const homePath = buildLocalizedPath(baseSlug, currentLang);
      window.history.pushState({}, '', homePath);
    }
  };

  // Homepage SEO meta titles
  const homepageTitles: Record<Language, string> = {
    PL: 'Konstrukcje stalowe i instalacje przemysłowe | CHEMOROZRUCH',
    EN: 'Industrial Steel Structures & Process Piping Assembly | CHEMOROZRUCH',
    DE: 'Stahlkonstruktionen & Industriemontagen | CHEMOROZRUCH',
    UA: 'Металоконструкції та промисловий монтаж установок | CHEMOROZRUCH',
  };

  const homepageDescriptions: Record<Language, string> = {
    PL: 'CHEMOROZRUCH realizuje konstrukcje stalowe, montaż urządzeń przemysłowych, aparaty ciśnieniowe oraz remonty i modernizacje instalacji przemysłowych.',
    EN: 'CHEMOROZRUCH delivers structural steelwork, industrial equipment installation, pressure vessels, and chemical plant turnarounds.',
    DE: 'CHEMOROZRUCH fertigt Stahlkonstruktionen, montiert Industrieanlagen, Druckapparate und führt Generalreparaturen durch.',
    UA: 'CHEMOROZRUCH здійснює виготовлення металоконструкцій, монтаж промислового обладнання, апаратів високого тиску та ремонти.',
  };

  const legalMeta: Record<string, { title: string; desc: string }> = {
    rodo: {
      title: 'RODO - Klauzula Informacyjna | CHEMOROZRUCH Sp. z o.o.',
      desc: 'Obowiązek informacyjny i klauzula informacyjna dotycząca przetwarzania danych osobowych (RODO) w Przedsiębiorstwie Remontowo-Montażowym CHEMOROZRUCH Sp. z o.o.',
    },
    sygnalisci: {
      title: 'Procedura Zgłoszeń Wewnętrznych (Sygnaliści) | CHEMOROZRUCH Sp. z o.o.',
      desc: 'Procedura dokonywania zgłoszeń naruszeń prawa i podejmowania działań następczych w CHEMOROZRUCH Sp. z o.o. zgodnie z Ustawą o ochronie sygnalistów.',
    },
    'polityka-prywatnosci': {
      title: 'Polityka Prywatności i Plików Cookies | CHEMOROZRUCH Sp. z o.o.',
      desc: 'Zasady ochrony prywatności, przetwarzania danych oraz polityka plików cookies w serwisie internetowym CHEMOROZRUCH.',
    },
  };

  const currentHomepageCanonical = `https://chemorozruch.pl${buildLocalizedPath(undefined, currentLang)}`;

  return (
    <>
      {/* 1. SEO Head for Homepage / Legal Doc Routes */}
      {currentRoute.type === 'home' && (
        <SEOHead
          title={
            activeLegalDoc && legalMeta[activeLegalDoc]
              ? legalMeta[activeLegalDoc].title
              : homepageTitles[currentLang]
          }
          description={
            activeLegalDoc && legalMeta[activeLegalDoc]
              ? legalMeta[activeLegalDoc].desc
              : homepageDescriptions[currentLang]
          }
          canonicalUrl={
            activeLegalDoc
              ? `https://chemorozruch.pl${buildLocalizedPath(activeLegalDoc, currentLang)}`
              : currentHomepageCanonical
          }
          currentLang={currentLang}
          routeSlug={activeLegalDoc || ''}
          ogType="website"
        />
      )}

      {/* 2. Primary Route Rendering */}
      {currentRoute.type === 'admin' && isAdminLoggedIn ? (
        <AdminPanel
          onLogout={handleAdminLogout}
          onNavigatePublic={(path) => {
            if (path.startsWith('/aktualnosci/')) {
              handleNavigateNewsDetail(path.replace('/aktualnosci/', ''));
            } else if (path.startsWith('/kariera/')) {
              handleNavigateCareerDetail(path.replace('/kariera/', ''));
            } else {
              handleNavigateHome();
            }
          }}
        />
      ) : currentRoute.type === 'service' ? (
        <ServiceLandingPage
          slug={currentRoute.slug}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigateHome={handleNavigateHome}
          onNavigateService={handleNavigateService}
        />
      ) : currentRoute.type === 'news-list' ? (
        <NewsListPage
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigateHome={handleNavigateHome}
          onNavigateService={handleNavigateService}
          onNavigateNewsDetail={handleNavigateNewsDetail}
          onNavigateCareers={handleNavigateCareersList}
          onOpenLegal={handleOpenLegal}
          onOpenAdminLogin={handleOpenAdminLogin}
        />
      ) : currentRoute.type === 'news-detail' ? (
        <NewsDetailPage
          slug={currentRoute.slug}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigateHome={handleNavigateHome}
          onNavigateNewsList={handleNavigateNewsList}
          onNavigateCareersList={handleNavigateCareersList}
          onNavigateService={handleNavigateService}
          onOpenLegal={handleOpenLegal}
        />
      ) : currentRoute.type === 'careers-list' ? (
        <CareersListPage
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigateHome={handleNavigateHome}
          onNavigateCareerDetail={handleNavigateCareerDetail}
          onNavigateNews={handleNavigateNewsList}
          onNavigateService={handleNavigateService}
          onOpenLegal={handleOpenLegal}
          onOpenAdminLogin={handleOpenAdminLogin}
        />
      ) : currentRoute.type === 'careers-detail' ? (
        <CareersDetailPage
          slug={currentRoute.slug}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigateHome={handleNavigateHome}
          onNavigateCareersList={handleNavigateCareersList}
          onNavigateNewsList={handleNavigateNewsList}
          onNavigateService={handleNavigateService}
          onOpenLegal={handleOpenLegal}
        />
      ) : (
        <ParallaxSite
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigateService={handleNavigateService}
          onNavigateNews={handleNavigateNewsList}
          onNavigateCareers={handleNavigateCareersList}
          onOpenLegal={handleOpenLegal}
        />
      )}

      {/* 3. Direct Legal Modal */}
      <LegalModal
        isOpen={activeLegalDoc !== null}
        docType={activeLegalDoc}
        onClose={handleCloseLegal}
      />

      {/* 4. Admin Login Modal (Hidden trigger / /admin route) */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          if (currentRoute.type === 'admin' && !isAdminLoggedIn) {
            handleNavigateHome();
          }
        }}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </>
  );
}

