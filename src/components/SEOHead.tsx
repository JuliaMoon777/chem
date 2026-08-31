import React, { useEffect } from 'react';
import { Language } from '../types';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  currentLang: Language;
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
  keywords = 'konstrukcje stalowe, montaż urządzeń przemysłowych, aparaty ciśnieniowe, remont i modernizacja instalacji przemysłowych, rurociągi przemysłowe, CHEMOROZRUCH',
  canonicalUrl,
  currentLang,
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

    // 3. Primary Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // 4. Indexing & Environment Guard (Vercel Previews vs Production)
    const hostname = window.location.hostname;
    const isProduction = hostname === 'chemorozruch.pl' || hostname === 'www.chemorozruch.pl';
    const robotsContent = isProduction
      ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      : 'noindex, nofollow';
    setMetaTag('name', 'robots', robotsContent);
    setMetaTag('name', 'googlebot', robotsContent);

    // 5. Canonical Link
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
    setMetaTag('property', 'og:site_name', 'CHEMOROZRUCH');
    
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

    // 8. Dynamic Hreflang alternates
    const baseUrl = canonicalUrl.split('?')[0];
    const hreflangs: Array<{ lang: string; href: string }> = [
      { lang: 'pl', href: baseUrl },
      { lang: 'en', href: `${baseUrl}?lang=en` },
      { lang: 'de', href: `${baseUrl}?lang=de` },
      { lang: 'uk', href: `${baseUrl}?lang=uk` },
      { lang: 'x-default', href: baseUrl },
    ];

    // Remove previous dynamic hreflangs
    document.querySelectorAll('link[data-dynamic-hreflang="true"]').forEach((el) => el.remove());

    // Append current hreflangs
    hreflangs.forEach(({ lang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', href);
      link.setAttribute('data-dynamic-hreflang', 'true');
      document.head.appendChild(link);
    });

    // 9. Structured Data (JSON-LD)
    const existingJsonLd = document.getElementById('dynamic-jsonld-schema');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const jsonLdData: any = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['Organization', 'GeneralContractor'],
          '@id': 'https://chemorozruch.pl/#organization',
          name: 'CHEMOROZRUCH Sp. z o.o.',
          alternateName: 'CHEMOROZRUCH',
          url: 'https://chemorozruch.pl/',
          logo: 'https://chemorozruch.pl/images/chemorozruch_plant_topdown_1787214324065.jpg',
          description: 'Generalny wykonawca w zakresie konstrukcji stalowych, montażu instalacji przemysłowych, aparatów ciśnieniowych oraz remontów i modernizacji instalacji.',
          telephone: '+48 33 844 14 00',
          email: 'biuro@chemorozruch.pl',
          foundingDate: '1971',
          vatID: 'PL5490001815',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'ul. Chemików 1',
            addressLocality: 'Oświęcim',
            postalCode: '32-600',
            addressCountry: 'PL',
          },
          location: [
            {
              '@type': 'Place',
              name: 'CHEMOROZRUCH Sp. z o.o. – Siedziba Główna Oświęcim',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Chemików 1',
                addressLocality: 'Oświęcim',
                postalCode: '32-600',
                addressCountry: 'PL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 50.0385,
                longitude: 19.2635,
              },
              telephone: '+48 33 844 14 00',
            },
            {
              '@type': 'Place',
              name: 'CHEMOROZRUCH Sp. z o.o. – Oddział Płock',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Zglenickiego 44',
                addressLocality: 'Płock',
                postalCode: '09-400',
                addressCountry: 'PL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 52.5855,
                longitude: 19.6890,
              },
              telephone: '+48 24 365 42 10',
            },
          ],
          department: [
            {
              '@type': 'ContactPoint',
              contactType: 'Dział Ofertowania',
              email: 'oferty@chemorozruch.pl',
              telephone: '+48 33 844 14 00',
            },
            {
              '@type': 'ContactPoint',
              contactType: 'Biuro Zarządu',
              email: 'biuro@chemorozruch.pl',
              telephone: '+48 33 844 14 00',
            },
            {
              '@type': 'ContactPoint',
              contactType: 'Oddział Płock',
              email: 'plock@chemorozruch.pl',
              telephone: '+48 24 365 42 10',
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
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Usługi Przemysłowe CHEMOROZRUCH',
        },
      });
    }

    const script = document.createElement('script');
    script.id = 'dynamic-jsonld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

  }, [title, description, keywords, canonicalUrl, currentLang, ogImage, ogType, breadcrumbs, serviceData]);

  return null;
};
