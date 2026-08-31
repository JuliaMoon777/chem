import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { ParallaxSite } from './components/ParallaxSite';
import { ServiceLandingPage } from './components/ServiceLandingPage';
import { LegalDocType, LegalModal } from './components/LegalModal';
import { SEOHead } from './components/SEOHead';

// Service routes supported
const SERVICE_ROUTES: Record<string, string> = {
  'konstrukcje-stalowe': 'konstrukcje-stalowe',
  'remonty-modernizacje-instalacji-przemyslowych': 'remonty-modernizacje-instalacji-przemyslowych',
  'aparaty-cisnieniowe': 'aparaty-cisnieniowe',
  'montaz-urzadzen-przemyslowych': 'montaz-urzadzen-przemyslowych',
};

// Old URLs fallback mapping (in case accessed via client-side routing)
const CLIENT_REDIRECTS: Record<string, { serviceSlug?: string; hash?: string; legalDoc?: LegalDocType }> = {
  '/o-firmie': { hash: 'company-discovery-section' },
  '/o-firmie.html': { hash: 'company-discovery-section' },
  '/about': { hash: 'company-discovery-section' },
  '/oferta': { hash: 'competencies-section' },
  '/oferta.html': { hash: 'competencies-section' },
  '/uslugi': { hash: 'competencies-section' },
  '/konstrukcje': { serviceSlug: 'konstrukcje-stalowe' },
  '/oferta/konstrukcje-stalowe': { serviceSlug: 'konstrukcje-stalowe' },
  '/montaz': { serviceSlug: 'montaz-urzadzen-przemyslowych' },
  '/oferta/montaz': { serviceSlug: 'montaz-urzadzen-przemyslowych' },
  '/aparaty': { serviceSlug: 'aparaty-cisnieniowe' },
  '/zbiorniki-cisnieniowe': { serviceSlug: 'aparaty-cisnieniowe' },
  '/oferta/aparaty-cisnieniowe': { serviceSlug: 'aparaty-cisnieniowe' },
  '/remonty': { serviceSlug: 'remonty-modernizacje-instalacji-przemyslowych' },
  '/modernizacje': { serviceSlug: 'remonty-modernizacje-instalacji-przemyslowych' },
  '/certyfikaty': { hash: 'certificates-section' },
  '/certyfikaty.html': { hash: 'certificates-section' },
  '/realizacje': { hash: 'realizations-section' },
  '/realizacje.html': { hash: 'realizations-section' },
  '/kontakt': { hash: 'kontakt-cta' },
  '/kontakt.html': { hash: 'kontakt-cta' },
  '/zaplecze-technologiczne': { hash: 'tech-facilities-section' },
  '/park-maszynowy': { hash: 'tech-facilities-section' },
  '/lokalizacje': { hash: 'locations-section' },
  '/rodo': { legalDoc: 'rodo' },
  '/polityka-prywatnosci': { legalDoc: 'polityka-prywatnosci' },
  '/sygnalisci': { legalDoc: 'sygnalisci' },
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [currentLang, setCurrentLang] = useState<Language>('PL');
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);

  // Parse path and query params on load and popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(path);

      // Check query param for language (?lang=en, ?lang=de, ?lang=uk)
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang')?.toUpperCase();
      if (langParam === 'EN' || langParam === 'DE') {
        setCurrentLang(langParam as Language);
      } else if (langParam === 'UK' || langParam === 'UA') {
        setCurrentLang('UA');
      } else if (langParam === 'PL') {
        setCurrentLang('PL');
      }

      // Check client redirects
      const redirect = CLIENT_REDIRECTS[path];
      if (redirect) {
        if (redirect.serviceSlug) {
          window.history.replaceState({}, '', `/${redirect.serviceSlug}/`);
          setCurrentPath(`/${redirect.serviceSlug}`);
        } else if (redirect.legalDoc) {
          setActiveLegalDoc(redirect.legalDoc);
        } else if (redirect.hash) {
          window.history.replaceState({}, '', `/#${redirect.hash}`);
          setTimeout(() => {
            document.getElementById(redirect.hash!)?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Navigation handlers
  const handleNavigateHome = (hash?: string) => {
    const targetUrl = hash ? `/#${hash}` : '/';
    window.history.pushState({}, '', targetUrl);
    setCurrentPath('/');
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateService = (slug: string) => {
    const targetUrl = `/${slug}/`;
    window.history.pushState({}, '', targetUrl);
    setCurrentPath(`/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine active route
  const cleanPath = currentPath.replace(/^\//, '').replace(/\/$/, '');
  const activeServiceSlug = SERVICE_ROUTES[cleanPath];

  // Homepage SEO meta titles based on language
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

  return (
    <>
      {/* Dynamic SEO Head for Homepage */}
      {!activeServiceSlug && (
        <SEOHead
          title={homepageTitles[currentLang]}
          description={homepageDescriptions[currentLang]}
          keywords="konstrukcje stalowe, montaż urządzeń przemysłowych, aparaty ciśnieniowe, remont i modernizacja instalacji przemysłowych, rurociągi przemysłowe, zbiorniki ciśnieniowe, firma montażowa, CHEMOROZRUCH"
          canonicalUrl="https://chemorozruch.pl/"
          currentLang={currentLang}
          ogType="website"
        />
      )}

      {/* Render Route */}
      {activeServiceSlug ? (
        <ServiceLandingPage
          slug={activeServiceSlug}
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onNavigateHome={handleNavigateHome}
          onNavigateService={handleNavigateService}
        />
      ) : (
        <ParallaxSite
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onNavigateService={handleNavigateService}
        />
      )}

      {/* Direct Legal Route Modal Fallback */}
      <LegalModal
        isOpen={activeLegalDoc !== null}
        docType={activeLegalDoc}
        onClose={() => {
          setActiveLegalDoc(null);
          if (window.location.pathname === '/rodo' || window.location.pathname === '/polityka-prywatnosci' || window.location.pathname === '/sygnalisci') {
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
          }
        }}
      />
    </>
  );
}
