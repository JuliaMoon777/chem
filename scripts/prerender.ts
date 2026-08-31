import fs from 'fs';
import path from 'path';
import { COMPANY_DATA } from '../src/data/companyData';
import { SERVICE_PAGES_DATA, ServicePageData } from '../src/data/servicePagesData';
import { Language, translations } from '../src/types';

interface RouteDefinition {
  routePath: string; // e.g. '/', '/en/', '/konstrukcje-stalowe/', '/rodo'
  outputPath: string; // e.g. 'dist/index.html', 'dist/en/index.html', 'dist/konstrukcje-stalowe/index.html'
  lang: 'pl' | 'en' | 'de' | 'uk';
  langKey: Language;
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: string;
  isLegal?: boolean;
  isService?: boolean;
  serviceSlug?: string;
  hreflangs: { lang: string; url: string }[];
  h1: string;
  h2?: string;
  bodyContent: string;
  structuredData: object;
}

const BASE_URL = 'https://chemorozruch.pl';

// Helper for hreflang links
function getHreflangs(pageSuffix: string = '') {
  const cleanSuffix = pageSuffix.startsWith('/') ? pageSuffix.slice(1) : pageSuffix;
  const plUrl = cleanSuffix ? `${BASE_URL}/${cleanSuffix}` : `${BASE_URL}/`;
  const enUrl = `${BASE_URL}/en/${cleanSuffix}`;
  const deUrl = `${BASE_URL}/de/${cleanSuffix}`;
  const ukUrl = `${BASE_URL}/uk/${cleanSuffix}`;

  return [
    { lang: 'pl', url: plUrl },
    { lang: 'en', url: enUrl },
    { lang: 'de', url: deUrl },
    { lang: 'uk', url: ukUrl },
    { lang: 'x-default', url: plUrl },
  ];
}

// Generate all route definitions
function buildRoutes(): RouteDefinition[] {
  const routes: RouteDefinition[] = [];

  // 1. Homepages (PL, EN, DE, UK) — Consuming Centralized Translations & COMPANY_DATA
  const homeMeta: Record<Language, { lang: 'pl' | 'en' | 'de' | 'uk'; prefix: string; title: string; desc: string; h1: string }> = {
    PL: {
      lang: 'pl',
      prefix: '',
      title: 'Konstrukcje stalowe i instalacje przemysłowe | CHEMOROZRUCH',
      desc: 'CHEMOROZRUCH – Generalny wykonawca konstrukcji stalowych, aparatów ciśnieniowych, rurociągów oraz montażu i remontów instalacji przemysłowych. Ponad 50 lat doświadczenia.',
      h1: 'Konstrukcje stalowe i instalacje przemysłowe',
    },
    EN: {
      lang: 'en',
      prefix: 'en/',
      title: 'Industrial Steel Structures & Process Piping Assembly | CHEMOROZRUCH',
      desc: 'CHEMOROZRUCH delivers structural steelwork, industrial equipment installation, pressure vessels, and chemical plant turnarounds with over 50 years of engineering excellence.',
      h1: 'Industrial Steel Structures & Process Piping Assembly',
    },
    DE: {
      lang: 'de',
      prefix: 'de/',
      title: 'Stahlkonstruktionen & Industriemontagen | CHEMOROZRUCH',
      desc: 'CHEMOROZRUCH fertigt Stahlkonstruktionen, montiert Industrieanlagen, Druckapparate und führt Generalreparaturen mit über 50 Jahren Erfahrung durch.',
      h1: 'Stahlkonstruktionen & Industriemontagen',
    },
    UA: {
      lang: 'uk',
      prefix: 'uk/',
      title: 'Металоконструкції та промисловий монтаж установок | CHEMOROZRUCH',
      desc: 'CHEMOROZRUCH здійснює виготовлення металоконструкцій, монтаж промислового обладнання, апаратів високого тиску та ремонти з понад 50-річним досвідом.',
      h1: 'Металоконструкції та промисловий монтаж установок',
    },
  };

  (['PL', 'EN', 'DE', 'UA'] as Language[]).forEach((langKey) => {
    const meta = homeMeta[langKey];
    const t = translations[langKey];
    const canonical = meta.prefix ? `${BASE_URL}/${meta.prefix}` : `${BASE_URL}/`;
    const outputPath = meta.prefix ? path.join('dist', meta.prefix, 'index.html') : path.join('dist', 'index.html');

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          name: COMPANY_DATA.legalName,
          alternateName: COMPANY_DATA.brandName,
          url: `${BASE_URL}/`,
          logo: `${BASE_URL}/images/chemorozruch_plant_topdown_1787214324065.jpg`,
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

    const metricsHtml = t.numbers.metrics
      .map((m) => `<span><strong>${m.value}${m.suffix}</strong> ${m.label} – ${m.sub}</span>`)
      .join(' | ');

    const discoveryHtml = t.discovery.items
      .map(
        (item) => `
        <article class="discovery-item">
          <h3>${item.title}</h3>
          <p class="tagline"><strong>${item.tagline}</strong></p>
          <p>${item.description}</p>
          <ul>
            ${item.bulletPoints.map((bp) => `<li>${bp}</li>`).join('')}
          </ul>
        </article>
      `
      )
      .join('\n');

    const facilitiesHtml = t.facilities.items
      .map(
        (f) => `
        <div class="facility-item">
          <h4>${f.name}</h4>
          <p>${f.description}</p>
        </div>
      `
      )
      .join('\n');

    const certificatesHtml = t.certificates.standards
      .map(
        (c) => `
        <div class="cert-item">
          <strong>${c.code} – ${c.name}</strong> (${c.authority})
          <p>${c.scope}</p>
        </div>
      `
      )
      .join('\n');

    const realizationsHtml = t.realizations.projects
      .map(
        (p) => `
        <div class="realization-item">
          <h4>${p.title} (${p.details.year}, ${p.details.location})</h4>
          <p>${p.summary}</p>
          <p><small>${t.realizations.scopeLabel}: ${p.details.scope} | ${t.realizations.industryLabel}: ${p.details.industry}</small></p>
        </div>
      `
      )
      .join('\n');

    const branchesHtml = t.locations.branches
      .map(
        (b) => `
        <div class="branch-item">
          <h4>${b.city} – ${b.role}</h4>
          <p>${b.address}, ${b.postalCode} ${b.city}</p>
          <p>Tel: ${b.phone} | Email: ${b.email}</p>
          <p><small>${b.industrialFocus}</small></p>
        </div>
      `
      )
      .join('\n');

    routes.push({
      routePath: meta.prefix ? `/${meta.prefix}` : '/',
      outputPath,
      lang: meta.lang,
      langKey,
      title: meta.title,
      description: meta.desc,
      canonicalUrl: canonical,
      ogType: 'website',
      hreflangs: getHreflangs(''),
      h1: meta.h1,
      h2: `${COMPANY_DATA.brandName} – ${t.hero.headline} ${t.hero.supporting}`,
      bodyContent: `
        <header class="header-nav">
          <div class="logo">${COMPANY_DATA.brandName}</div>
          <nav aria-label="Nawigacja">
            <a href="${meta.prefix ? `/${meta.prefix}` : '/'}#company-discovery-section">${t.footer.columns.navLinks.about}</a>
            <a href="${meta.prefix ? `/${meta.prefix}` : '/'}#competencies-section">${t.footer.columns.navLinks.competencies}</a>
            <a href="${meta.prefix ? `/${meta.prefix}` : '/'}#facilities-section">${t.footer.columns.navLinks.facilities}</a>
            <a href="${meta.prefix ? `/${meta.prefix}` : '/'}#certificates-section">${t.footer.columns.navLinks.certificates}</a>
            <a href="${meta.prefix ? `/${meta.prefix}` : '/'}#realizations-section">${t.footer.columns.navLinks.realizations}</a>
            <a href="${meta.prefix ? `/${meta.prefix}` : '/'}#locations-section">${t.footer.columns.navLinks.locations}</a>
            <a href="${meta.prefix ? `/${meta.prefix}` : '/'}#kontakt-cta">${t.footer.columns.navLinks.contact}</a>
          </nav>
        </header>
        <main>
          <section id="hero" class="hero-section">
            <h1>${meta.h1}</h1>
            <p class="hero-lead">${t.hero.headline} ${t.hero.supporting}</p>
            <div class="hero-facts">
              ${metricsHtml}
            </div>
          </section>

          <section id="company-discovery-section">
            <h2>${t.discovery.heading} – ${t.discovery.subheading}</h2>
            <div class="discovery-grid">
              ${discoveryHtml}
            </div>
          </section>

          <section id="competencies-section">
            <h2>${t.competencies.heading}</h2>
            <p>${t.competencies.subheading}</p>
            <div class="services-grid">
              <article>
                <h3><a href="/${meta.prefix}konstrukcje-stalowe/">${SERVICE_PAGES_DATA['konstrukcje-stalowe'].meta[langKey].h1}</a></h3>
                <p>${SERVICE_PAGES_DATA['konstrukcje-stalowe'].meta[langKey].subtitle}</p>
              </article>
              <article>
                <h3><a href="/${meta.prefix}remonty-modernizacje-instalacji-przemyslowych/">${SERVICE_PAGES_DATA['remonty-modernizacje-instalacji-przemyslowych'].meta[langKey].h1}</a></h3>
                <p>${SERVICE_PAGES_DATA['remonty-modernizacje-instalacji-przemyslowych'].meta[langKey].subtitle}</p>
              </article>
              <article>
                <h3><a href="/${meta.prefix}aparaty-cisnieniowe/">${SERVICE_PAGES_DATA['aparaty-cisnieniowe'].meta[langKey].h1}</a></h3>
                <p>${SERVICE_PAGES_DATA['aparaty-cisnieniowe'].meta[langKey].subtitle}</p>
              </article>
              <article>
                <h3><a href="/${meta.prefix}montaz-urzadzen-przemyslowych/">${SERVICE_PAGES_DATA['montaz-urzadzen-przemyslowych'].meta[langKey].h1}</a></h3>
                <p>${SERVICE_PAGES_DATA['montaz-urzadzen-przemyslowych'].meta[langKey].subtitle}</p>
              </article>
            </div>
          </section>

          <section id="facilities-section">
            <h2>${t.facilities.headingLine1} ${t.facilities.headingLine2}</h2>
            <p>${t.facilities.supporting}</p>
            <div class="facilities-list">
              ${facilitiesHtml}
            </div>
          </section>

          <section id="certificates-section">
            <h2>${t.certificates.heading}</h2>
            <p>${t.certificates.supporting}</p>
            <div class="certs-list">
              ${certificatesHtml}
            </div>
          </section>

          <section id="realizations-section">
            <h2>${t.realizations.heading}</h2>
            <p>${t.realizations.supporting}</p>
            <div class="realizations-list">
              ${realizationsHtml}
            </div>
          </section>

          <section id="locations-section">
            <h2>${t.locations.heading}</h2>
            <p>${t.locations.supporting}</p>
            <div class="branches-list">
              ${branchesHtml}
            </div>
          </section>

          <section id="kontakt-cta">
            <h2>${t.contactCTA.heading}</h2>
            <p>${t.contactCTA.supporting}</p>
            <p><strong>${COMPANY_DATA.legalName}</strong></p>
            <p>Siedziba: ${COMPANY_DATA.operationalAddress.fullString}</p>
            <p>Oddział Płock: ${COMPANY_DATA.plockBranchAddress.fullString}</p>
            <p>NIP: ${COMPANY_DATA.nipFormatted} | REGON: ${COMPANY_DATA.regon} | KRS: ${COMPANY_DATA.krs}</p>
            <p>Telefon: ${COMPANY_DATA.contacts.generalHQ.phone} | Email: ${COMPANY_DATA.contacts.generalHQ.email}</p>
          </section>
        </main>
        <footer>
          <p>© ${new Date().getFullYear()} ${COMPANY_DATA.legalName}. ${t.footer.allRightsReserved}</p>
          <p>
            <a href="/rodo">${t.footer.columns.rodo}</a> |
            <a href="/sygnalisci">${t.footer.columns.whistleblower}</a> |
            <a href="/polityka-prywatnosci">${t.footer.columns.privacy}</a>
          </p>
        </footer>
      `,
      structuredData,
    });
  });

  // 2. Service Pages (4 services x 4 languages = 16 pages)
  const servicesList: ServicePageData[] = Object.values(SERVICE_PAGES_DATA);

  servicesList.forEach((service) => {
    (['PL', 'EN', 'DE', 'UA'] as Language[]).forEach((langKey) => {
      const langCode: 'pl' | 'en' | 'de' | 'uk' = langKey === 'UA' ? 'uk' : (langKey.toLowerCase() as any);
      const prefix = langKey === 'PL' ? '' : `${langCode}/`;
      const canonical = `${BASE_URL}/${prefix}${service.slug}/`;
      const outputPath = path.join('dist', prefix, service.slug, 'index.html');
      const meta = service.meta[langKey];
      const hreflangs = getHreflangs(`${service.slug}/`);

      const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: langKey === 'PL' ? 'Strona główna' : langKey === 'EN' ? 'Home' : langKey === 'DE' ? 'Startseite' : 'Головна',
                item: `${BASE_URL}/${prefix}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: meta.title.split('|')[0].trim(),
                item: canonical,
              },
            ],
          },
          {
            '@type': 'Service',
            name: meta.h1,
            description: meta.description,
            provider: {
              '@type': 'Organization',
              name: COMPANY_DATA.legalName,
              url: BASE_URL,
              foundingDate: `${COMPANY_DATA.foundingYear}`,
              taxID: COMPANY_DATA.nip,
              vatID: COMPANY_DATA.vatId,
            },
            areaServed: ['Polska', 'Niemcy', 'Unia Europejska'],
            serviceType: meta.h1,
          },
        ],
      };

      const overviewText = service.overview[langKey]?.paragraphs?.map((p) => `<p>${p}</p>`).join('\n') || '';
      const scopeItems = service.scopeOfWork[langKey]?.items?.map((item) => `<li><strong>${item.title}:</strong> ${item.description}</li>`).join('\n') || '';
      const specsTable = service.technicalCapabilities[langKey]?.specs?.map((spec) => `<tr><td>${spec.label}</td><td>${spec.value}</td></tr>`).join('\n') || '';
      const materialsList = service.materialsAndNorms[langKey]?.materials?.join(', ') || '';
      const standardsList = service.materialsAndNorms[langKey]?.standards?.join(', ') || '';

      routes.push({
        routePath: `/${prefix}${service.slug}/`,
        outputPath,
        lang: langCode,
        langKey,
        title: meta.title,
        description: meta.description,
        canonicalUrl: canonical,
        ogType: 'article',
        isService: true,
        serviceSlug: service.slug,
        hreflangs,
        h1: meta.h1,
        bodyContent: `
          <header class="header-nav">
            <div class="logo"><a href="/${prefix}">${COMPANY_DATA.brandName}</a></div>
            <nav aria-label="Nawigacja">
              <a href="/${prefix}">${service.breadcrumbs[langKey]?.home || 'Strona główna'}</a>
              <a href="/${prefix}#kontakt-cta">${service.cta[langKey]?.btnText || 'Zapytanie ofertowe'}</a>
            </nav>
          </header>
          <main class="service-page-container">
            <nav aria-label="Breadcrumb" class="breadcrumb">
              <a href="/${prefix}">${service.breadcrumbs[langKey]?.home || 'Strona główna'}</a> &gt;
              <span>${meta.title.split('|')[0].trim()}</span>
            </nav>
            <article>
              <h1>${meta.h1}</h1>
              <p class="service-lead">${meta.subtitle}</p>
              
              <section class="service-description">
                <h2>${service.scopeOfWork[langKey]?.title || 'Opis i charakterystyka inżynieryjna'}</h2>
                ${overviewText}
              </section>

              <section class="service-scope">
                <h2>${service.scopeOfWork[langKey]?.subtitle || 'Zakres prac i technologii'}</h2>
                <ul>
                  ${scopeItems}
                </ul>
              </section>

              <section class="service-specs">
                <h2>${service.technicalCapabilities[langKey]?.title || 'Parametry techniczne'}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Parametr</th>
                      <th>Wartość / Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${specsTable}
                  </tbody>
                </table>
              </section>

              <section class="service-materials">
                <h2>${service.materialsAndNorms[langKey]?.title || 'Gatunki stali i normy wykonawcze'}</h2>
                <p><strong>Materiały:</strong> ${materialsList}</p>
                <p><strong>Certyfikowane normy:</strong> ${standardsList}</p>
              </section>

              <section class="service-cta">
                <h2>${service.cta[langKey]?.title || 'Skonsultuj projekt z działem inżynieryjnym'}</h2>
                <p>${service.cta[langKey]?.description || 'Zapraszamy do kontaktu z Działem Ofertowania CHEMOROZRUCH.'}</p>
                <p>Telefon: <strong>${service.cta[langKey]?.phone || COMPANY_DATA.contacts.tendering.phone}</strong> | Email: <strong>${service.cta[langKey]?.email || COMPANY_DATA.contacts.tendering.email}</strong></p>
              </section>
            </article>
          </main>
          <footer>
            <p>© ${new Date().getFullYear()} ${COMPANY_DATA.legalName}.</p>
            <p><a href="/rodo">RODO</a> | <a href="/sygnalisci">Sygnaliści</a> | <a href="/polityka-prywatnosci">Polityka Prywatności</a></p>
          </footer>
        `,
        structuredData,
      });
    });
  });

  // 3. Legal Direct Access Pages (/rodo, /sygnalisci, /polityka-prywatnosci)
  const legalPages = [
    {
      slug: 'rodo',
      title: 'Klauzula Informacyjna RODO | CHEMOROZRUCH',
      desc: 'Obowiązek informacyjny zgodny z art. 13 i 14 RODO w CHEMOROZRUCH Sp. z o.o. Zasady przetwarzania i ochrony danych osobowych kontrahentów i pracowników.',
      h1: 'Obowiązek Informacyjny RODO – CHEMOROZRUCH Sp. z o.o.',
      content: `
        <h1>Obowiązek Informacyjny RODO</h1>
        <p>Zgodnie z art. 13 i art. 14 Ogólnego Rozporządzenia o Ochronie Danych Osobowych (UE) 2016/679 (RODO).</p>
        <h2>1. Administrator Danych Osobowych</h2>
        <p>Administratorem Państwa danych osobowych jest <strong>${COMPANY_DATA.legalName}</strong> z siedzibą w Oświęcimiu, ${COMPANY_DATA.registeredAddress.fullString}, NIP: ${COMPANY_DATA.nipFormatted}, REGON: ${COMPANY_DATA.regon}, KRS: ${COMPANY_DATA.krs}.</p>
        <p>Kontakt w sprawach ochrony danych: <a href="mailto:${COMPANY_DATA.contacts.privacyDPO.email}">${COMPANY_DATA.contacts.privacyDPO.email}</a> | Centrala: ${COMPANY_DATA.contacts.generalHQ.phone}</p>
        <h2>2. Cele i Podstawy Prawne Przetwarzania</h2>
        <ul>
          <li>Zawarcie i realizacja kontraktów wykonawczych i zamówień przemysłowych (art. 6 ust. 1 lit. b RODO).</li>
          <li>Obsługa zapytań ofertowych i korespondencji technicznej (art. 6 ust. 1 lit. f RODO).</li>
          <li>Wypełnienie obowiązków podatkowych, księgowych oraz dozorowych UDT/TUV (art. 6 ust. 1 lit. c RODO).</li>
          <li>Dochodzenie i obrona przed roszczeniami (art. 6 ust. 1 lit. f RODO).</li>
        </ul>
        <h2>3. Odbiorcy Danych</h2>
        <p>Dane mogą być przekazywane podwykonawcom technicznym, bankom, ubezpieczycielom, operatorom logistycznym oraz uprawnionym organom państwowym.</p>
        <h2>4. Prawa Osób</h2>
        <p>Przysługuje Państwu prawo dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu oraz skargi do Prezesa UODO.</p>
      `,
    },
    {
      slug: 'sygnalisci',
      title: 'Procedura Zgłoszeń Wewnętrznych i Ochrona Sygnalistów | CHEMOROZRUCH',
      desc: 'Wewnętrzna procedura dokonywania zgłoszeń naruszeń prawa oraz ochrona sygnalistów w CHEMOROZRUCH Sp. z o.o. Poufne kanały raportowania.',
      h1: 'Procedura Zgłoszeń Wewnętrznych i Ochrona Sygnalistów – CHEMOROZRUCH',
      content: `
        <h1>Ochrona Sygnalistów i Zgłoszenia Wewnętrzne</h1>
        <p>Zgodnie z Ustawą z dnia 14 czerwca 2024 r. o ochronie sygnalistów oraz Dyrektywą (UE) 2019/1937.</p>
        <h2>1. Cel Procedury</h2>
        <p>Procedura określa bezpieczne i poufne kanały zgłaszania naruszeń prawa w spółce <strong>${COMPANY_DATA.legalName}</strong> oraz gwarancje ochrony przed działaniami odwetowymi.</p>
        <h2>2. Bezpieczne Kanały Zgłoszeń</h2>
        <p><strong>Dedykowany adres e-mail:</strong> <a href="mailto:${COMPANY_DATA.contacts.whistleblower.email}">${COMPANY_DATA.contacts.whistleblower.email}</a></p>
        <p><strong>Poczta tradycyjna:</strong> ${COMPANY_DATA.legalName}, ${COMPANY_DATA.registeredAddress.fullString} z dopiskiem na kopercie: <em>„ZGŁOSZENIE NARUSZENIA – POUFNE DO RĄK WŁASNYCH KOORDYNATORA DS. NARUSZEŃ”</em></p>
        <h2>3. Gwarancja Ochrony</h2>
        <p>Wobec Sygnalisty obowiązuje bezwzględny zakaz podejmowania jakichkolwiek działań odwetowych, dyskryminacji lub wykluczenia.</p>
      `,
    },
    {
      slug: 'polityka-prywatnosci',
      title: 'Polityka Prywatności i Plików Cookies | CHEMOROZRUCH',
      desc: 'Zasady przetwarzania danych i wykorzystywania technologii plików cookies w serwisie internetowym chemorozruch.pl.',
      h1: 'Polityka Prywatności i Cookies – CHEMOROZRUCH Sp. z o.o.',
      content: `
        <h1>Polityka Prywatności Serwisu</h1>
        <p>Zasady korzystania z serwisu internetowego chemorozruch.pl oraz technologii plików cookies.</p>
        <h2>1. Informacje Ogólne</h2>
        <p>Serwis internetowy jest prowadzony przez <strong>${COMPANY_DATA.legalName}</strong> z siedzibą w Oświęcimiu.</p>
        <h2>2. Pliki Cookies</h2>
        <p>Serwis wykorzystuje wyłącznie niezbędne pliki cookies do prawidłowego wyświetlania serwisu, zapamiętywania preferencji językowych (PL/EN/DE/UA) oraz anonimowej analityki.</p>
      `,
    },
  ];

  legalPages.forEach((legal) => {
    const canonical = `${BASE_URL}/${legal.slug}`;
    const outputPath = path.join('dist', legal.slug, 'index.html');
    routes.push({
      routePath: `/${legal.slug}`,
      outputPath,
      lang: 'pl',
      langKey: 'PL',
      title: legal.title,
      description: legal.desc,
      canonicalUrl: canonical,
      ogType: 'article',
      isLegal: true,
      hreflangs: [{ lang: 'pl', url: canonical }],
      h1: legal.h1,
      bodyContent: `
        <header class="header-nav">
          <div class="logo"><a href="/">${COMPANY_DATA.brandName}</a></div>
          <nav aria-label="Nawigacja"><a href="/">Powrót do strony głównej</a></nav>
        </header>
        <main class="legal-document-container">
          <article>
            ${legal.content}
          </article>
        </main>
        <footer>
          <p>© ${new Date().getFullYear()} ${COMPANY_DATA.legalName}. Wszelkie prawa zastrzeżone.</p>
        </footer>
      `,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: legal.title,
        description: legal.desc,
        url: canonical,
      },
    });
  });

  return routes;
}

// Generate the final static HTML using dist/index.html as template
async function prerender() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Template dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  // Extract JS scripts and CSS link tags injected by Vite
  const scriptMatch = templateHtml.match(/<script\s+type="module"\s+crossorigin\s+src="([^"]+)"><\/script>/);
  const cssMatch = templateHtml.match(/<link\s+rel="stylesheet"\s+crossorigin\s+href="([^"]+)">/);

  const scriptTag = scriptMatch ? scriptMatch[0] : '';
  const cssTag = cssMatch ? cssMatch[0] : '';

  console.log(`Extracted bundles:\n  CSS: ${cssTag}\n  JS: ${scriptTag}`);

  const routes = buildRoutes();
  console.log(`\nPrerendering ${routes.length} static routes...`);

  for (const route of routes) {
    const dir = path.dirname(route.outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Build hreflang link tags
    const hreflangTags = route.hreflangs
      .map((hl) => `<link rel="alternate" hreflang="${hl.lang}" href="${hl.url}" />`)
      .join('\n    ');

    // Structured data JSON-LD script
    const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(route.structuredData, null, 2)}\n    </script>`;

    // Build the complete standalone pre-rendered HTML document
    const html = `<!DOCTYPE html>
<html lang="${route.lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#FAF9F5" />
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${route.canonicalUrl}" />
    
    <!-- Indexing and Robots Rules -->
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    
    <!-- Reciprocal Multi-language Hreflang Cluster -->
    ${hreflangTags}

    <!-- Open Graph Protocol -->
    <meta property="og:site_name" content="CHEMOROZRUCH" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:type" content="${route.ogType}" />
    <meta property="og:url" content="${route.canonicalUrl}" />
    <meta property="og:locale" content="${route.lang === 'pl' ? 'pl_PL' : route.lang === 'en' ? 'en_US' : route.lang === 'de' ? 'de_DE' : 'uk_UA'}" />
    <meta property="og:image" content="${BASE_URL}/images/chemorozruch_plant_topdown_1787214324065.jpg" />

    <!-- Twitter Card Meta -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${BASE_URL}/images/chemorozruch_plant_topdown_1787214324065.jpg" />

    <!-- Structured Data JSON-LD -->
    ${jsonLdTag}

    <!-- Favicon and Brand Assets -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Fonts preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet" />

    <!-- Production Compiled Styles -->
    ${cssTag}
  </head>
  <body class="bg-[#FAF9F5] text-slate-900 font-sans antialiased selection:bg-red-500 selection:text-white">
    <div id="root">${route.bodyContent}</div>
    ${scriptTag}
  </body>
</html>`;

    fs.writeFileSync(route.outputPath, html, 'utf8');
    const size = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
    console.log(`  ✓ [${route.lang.toUpperCase()}] ${route.routePath} -> ${route.outputPath} (${size} KB)`);
  }

  console.log(`\nPrerendering successfully generated ${routes.length} crawlable static HTML pages!`);
  
  // Clean up temporary cjs bundle if it exists
  const tempBundle = path.join(distDir, 'prerender.cjs');
  if (fs.existsSync(tempBundle)) {
    try {
      fs.unlinkSync(tempBundle);
    } catch {}
  }
}

prerender().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
