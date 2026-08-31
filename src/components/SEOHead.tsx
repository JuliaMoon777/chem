import React, { useEffect } from 'react';
import { Language } from '../types';
import { COMPANY_DATA } from '../data/companyData';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  currentLang: Language;
  routeSlug?: string; // e.g. "" for home, or "konstrukcje-stalowe" for a service page
  ogImage?: string;
  ogType?: 'website' | 'article';
  breadcrumbs?: Array<{ name: string; url: string }>;
  serviceData?: {
    name: string;
    description: string;
    serviceType: string;
  };
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  currentLang,
  routeSlug = '',
  ogImage = 'https://chemorozruch.pl/images/chemorozruch_plant_topdown_1787214324065.jpg',
  ogType = 'website',
  breadcrumbs,
  serviceData,
}) => {
  useEffect(() => {
    // 1. Technical lang code (Ukrainian is 'uk', not 'ua')
    const htmlLang = currentLang === 'UA' ? 'uk' : currentLang.toLowerCase();
    document.documentElement.lang = htmlLang;

    // 2. Document Title
    document.title = title;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Primary Meta Tags (meta keywords explicitly removed per SEO best practices)
    setMetaTag('name', 'description', description);

    // Remove legacy keywords tag if it exists in DOM
    const existingKeywords = document.querySelector('meta[name="keywords"]');
    if (existingKeywords) {
      existingKeywords.remove();
    }

    // 4. Indexing & Environment Guard (Vercel Previews vs Production)
    const hostname = window.location.hostname;
    const isProduction = hostname === 'chemorozruch.pl' || hostname === 'www.chemorozruch.pl';
    const robotsContent = isProduction
      ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      : 'noindex, nofollow';
    setMetaTag('name', 'robots', robotsContent);
    setMetaTag('name', 'googlebot', robotsContent);

    // 5. Canonical Link (Self-referencing for each localized URL)
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', COMPANY_DATA.brandName);
    
    const localeMap: Record<Language, string> = {
      PL: 'pl_PL',
      EN: 'en_US',
      DE: 'de_DE',
      UA: 'uk_UA',
    };
    setMetaTag('property', 'og:locale', localeMap[currentLang] || 'pl_PL');

    // 7. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 8. Clean Reciprocal Hreflang Clusters (pl, en, de, uk, x-default)
    const cleanSlug = routeSlug ? `${routeSlug.replace(/^\//, '').replace(/\/$/, '')}/` : '';
    const hreflangs: Array<{ lang: string; href: string }> = [
      { lang: 'pl', href: `https://chemorozruch.pl/${cleanSlug}` },
      { lang: 'en', href: `https://chemorozruch.pl/en/${cleanSlug}` },
      { lang: 'de', href: `https://chemorozruch.pl/de/${cleanSlug}` },
      { lang: 'uk', href: `https://chemorozruch.pl/uk/${cleanSlug}` },
      { lang: 'x-default', href: `https://chemorozruch.pl/${cleanSlug}` },
    ];

    // Remove previous dynamic hreflangs
    document.querySelectorAll('link[data-dynamic-hreflang="true"]').forEach((el) => el.remove());

    // Append clean hreflangs
    hreflangs.forEach(({ lang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', href);
      link.setAttribute('data-dynamic-hreflang', 'true');
      document.head.appendChild(link);
    });

    // 9. Structured Data (Schema.org JSON-LD) — Consuming Centralized Verified COMPANY_DATA
    const existingJsonLd = document.getElementById('dynamic-jsonld-schema');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const jsonLdData: any = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://chemorozruch.pl/#organization',
          name: COMPANY_DATA.legalName,
          alternateName: COMPANY_DATA.brandName,
          url: 'https://chemorozruch.pl/',
          logo: 'https://chemorozruch.pl/images/chemorozruch_plant_topdown_1787214324065.jpg',
          description: 'Inżynieria i wykonawstwo przemysłowe: konstrukcje stalowe, aparaty ciśnieniowe, montaż instalacji przemysłowych oraz remonty technologiczne.',
          telephone: COMPANY_DATA.contacts.generalHQ.phone,
          email: COMPANY_DATA.contacts.generalHQ.email,
          foundingDate: `${COMPANY_DATA.foundingYear}`,
          vatID: COMPANY_DATA.vatId,
          taxID: COMPANY_DATA.nip,
          address: {
            '@type': 'PostalAddress',
            streetAddress: COMPANY_DATA.registeredAddress.streetAddress,
            addressLocality: COMPANY_DATA.registeredAddress.city,
            postalCode: COMPANY_DATA.registeredAddress.postalCode,
            addressCountry: 'PL',
          },
          location: [
            {
              '@type': 'Place',
              name: `${COMPANY_DATA.brandName} – Siedziba Główna Oświęcim`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: COMPANY_DATA.registeredAddress.streetAddress,
                addressLocality: COMPANY_DATA.registeredAddress.city,
                postalCode: COMPANY_DATA.registeredAddress.postalCode,
                addressCountry: 'PL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: COMPANY_DATA.coordinates.oswiecimHQ.lat,
                longitude: COMPANY_DATA.coordinates.oswiecimHQ.lng,
              },
              telephone: COMPANY_DATA.contacts.generalHQ.phone,
            },
            {
              '@type': 'Place',
              name: `${COMPANY_DATA.brandName} – Oddział Płock`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: COMPANY_DATA.plockBranchAddress.streetAddress,
                addressLocality: COMPANY_DATA.plockBranchAddress.city,
                postalCode: COMPANY_DATA.plockBranchAddress.postalCode,
                addressCountry: 'PL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: COMPANY_DATA.coordinates.plockBranch.lat,
                longitude: COMPANY_DATA.coordinates.plockBranch.lng,
              },
              telephone: COMPANY_DATA.contacts.plockBranch.phone,
            },
          ],
          department: [
            {
              '@type': 'ContactPoint',
              contactType: COMPANY_DATA.contacts.tendering.department,
              email: COMPANY_DATA.contacts.tendering.email,
              telephone: COMPANY_DATA.contacts.tendering.phone,
            },
            {
              '@type': 'ContactPoint',
              contactType: COMPANY_DATA.contacts.management.department,
              email: COMPANY_DATA.contacts.management.email,
              telephone: COMPANY_DATA.contacts.management.phone,
            },
            {
              '@type': 'ContactPoint',
              contactType: COMPANY_DATA.contacts.plockBranch.department,
              email: COMPANY_DATA.contacts.plockBranch.email,
              telephone: COMPANY_DATA.contacts.plockBranch.phone,
            },
          ],
        },
      ],
    };

    // Append Breadcrumbs if present
    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdData['@graph'].push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.url,
        })),
      });
    }

    // Append Service schema if on a service page
    if (serviceData) {
      jsonLdData['@graph'].push({
        '@type': 'Service',
        name: serviceData.name,
        description: serviceData.description,
        serviceType: serviceData.serviceType,
        provider: {
          '@id': 'https://chemorozruch.pl/#organization',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Polska, Unia Europejska',
        },
      });
    }

    const script = document.createElement('script');
    script.id = 'dynamic-jsonld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

  }, [title, description, canonicalUrl, currentLang, routeSlug, ogImage, ogType, breadcrumbs, serviceData]);

  return null;
};
