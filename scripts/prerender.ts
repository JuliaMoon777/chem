import fs from 'fs';
import path from 'path';
import { COMPANY_DATA } from '../src/data/companyData';
import { SERVICE_PAGES_DATA, ServicePageData } from '../src/data/servicePagesData';
import { Language } from '../src/types';

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

  // 1. Homepages (PL, EN, DE, UK)
  const homeData: Record<Language, { lang: 'pl' | 'en' | 'de' | 'uk'; prefix: string; title: string; desc: string; h1: string; h2: string; lead: string; aboutText: string; sectorsTitle: string }> = {
    PL: {
      lang: 'pl',
      prefix: '',
      title: 'Konstrukcje stalowe i instalacje przemysłowe | CHEMOROZRUCH',
      desc: 'CHEMOROZRUCH – Generalny wykonawca konstrukcji stalowych, aparatów ciśnieniowych, rurociągów oraz montażu i remontów instalacji przemysłowych. Ponad 50 lat doświadczenia.',
      h1: 'Konstrukcje stalowe i instalacje przemysłowe',
      h2: 'CHEMOROZRUCH – Generalne wykonawstwo i montaż instalacji przemysłowych',
      lead: 'Ponad 50 lat doświadczenia w prefabrykacji konstrukcji stalowych, budowie rurociągów przesyłowych i procesowych, montażu aparatów ciśnieniowych oraz generalnych remontach instalacji petrochemicznych i energetycznych.',
      aboutText: 'CHEMOROZRUCH realizuje kompleksowe projekty EPC dla przemysłu chemicznego, rafineryjnego, energetycznego i hutniczego. Nasz park maszynowy obejmuje przecinarki plazmowe HD, walce 4-rolkowe, śrutownice komorowe oraz certyfikowaną spawalnię z uprawnieniami UDT, TDT, EN 1090-2 EXC3 i ISO 3834-2.',
      sectorsTitle: 'Obsługiwane sektory przemysłu: Chemia i Petrochemia, Energetyka Zawodowa, Hutnictwo i Koksownictwo, Gazownictwo i Paliwa Płynne.',
    },
    EN: {
      lang: 'en',
      prefix: 'en/',
      title: 'Industrial Steel Structures & Process Piping Assembly | CHEMOROZRUCH',
      desc: 'CHEMOROZRUCH delivers structural steelwork, industrial equipment installation, pressure vessels, and chemical plant turnarounds with over 50 years of engineering excellence.',
      h1: 'Industrial Steel Structures & Process Piping Assembly',
      h2: 'CHEMOROZRUCH – General Contracting & Industrial Plant Construction',
      lead: 'Over 50 years of engineering excellence in structural steel fabrication, high-pressure piping networks, process equipment assembly, and plant maintenance turnarounds across Europe.',
      aboutText: 'CHEMOROZRUCH executes comprehensive industrial projects for chemical, refining, energy, and metallurgical industries with certified production according to EN 1090-2 EXC3, ISO 3834-2, PED 2014/68/EU, and ISO 9001.',
      sectorsTitle: 'Industrial sectors served: Chemical & Petrochemical, Power Generation, Metallurgy, Gas & Heavy Industry.',
    },
    DE: {
      lang: 'de',
      prefix: 'de/',
      title: 'Stahlkonstruktionen & Industriemontagen | CHEMOROZRUCH',
      desc: 'CHEMOROZRUCH fertigt Stahlkonstruktionen, montiert Industrieanlagen, Druckapparate und führt Generalreparaturen mit über 50 Jahren Erfahrung durch.',
      h1: 'Stahlkonstruktionen & Industriemontagen',
      h2: 'CHEMOROZRUCH – Generalunternehmer für Industrieanlagen und Stahlbau',
      lead: 'Über 50 Jahre Erfahrung im Stahlbau, Rohrleitungsbau, in der Montage von Druckgeräten und verfahrenstechnischen Anlagen sowie bei Generalüberholungen in der Chemie- und Energiebranche.',
      aboutText: 'CHEMOROZRUCH realisiert anspruchsvolle Industrieprojekte nach EN 1090-2 EXC3, ISO 3834-2 und Druckgeräterichtlinie PED 2014/68/EU mit eigener Fertigungshalle und modernem Maschinenpark.',
      sectorsTitle: 'Bediente Branchen: Chemie und Petrochemie, Energiewirtschaft, Hüttenwesen und Schwerindustrie.',
    },
    UA: {
      lang: 'uk',
      prefix: 'uk/',
      title: 'Металоконструкції та промисловий монтаж установок | CHEMOROZRUCH',
      desc: 'CHEMOROZRUCH здійснює виготовлення металоконструкцій, монтаж промислового обладнання, апаратів високого тиску та ремонти з понад 50-річним досвідом.',
      h1: 'Металоконструкції та промисловий монтаж установок',
      h2: 'CHEMOROZRUCH – Генеральний підрядник та монтаж промислових комплексів',
      lead: 'Понад 50 років досвіду у виготовленні металоконструкцій, монтажі технологічних трубопроводів, посудин під тиском та капітальному ремонті хімічних і енергетичних заводів.',
      aboutText: 'CHEMOROZRUCH виконує комплексні інженерні проекти за міжнародними стандартами EN 1090-2 EXC3, ISO 3834-2, PED 2014/68/EU та ISO 9001 з власною виробничою базою 12 000 м².',
      sectorsTitle: 'Галузі промисловості: Хімічна та нафтопереробна, Енергетика, Металургія, Газова промисловість.',
    },
  };

  (['PL', 'EN', 'DE', 'UA'] as Language[]).forEach((langKey) => {
    const data = homeData[langKey];
    const canonical = data.prefix ? `${BASE_URL}/${data.prefix}` : `${BASE_URL}/`;
    const outputPath = data.prefix ? path.join('dist', data.prefix, 'index.html') : path.join('dist', 'index.html');

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          name: COMPANY_DATA.legalName,
          alternateName: 'CHEMOROZRUCH',
          url: BASE_URL,
          logo: `${BASE_URL}/logo.svg`,
          taxID: COMPANY_DATA.nip,
          vatID: `PL${COMPANY_DATA.nip}`,
          telephone: COMPANY_DATA.contacts.generalHQ.phone,
          email: COMPANY_DATA.contacts.generalHQ.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: COMPANY_DATA.registeredAddress.streetAddress,
            postalCode: COMPANY_DATA.registeredAddress.postalCode,
            addressLocality: COMPANY_DATA.registeredAddress.city,
            addressCountry: 'PL',
          },
          foundingDate: '1970',
        },
        {
          '@type': 'LocalBusiness',
          '@id': `${BASE_URL}/#headquarters`,
          name: `${COMPANY_DATA.legalName} – Centrala i Zakład Produkcyjny`,
          url: BASE_URL,
          telephone: COMPANY_DATA.contacts.generalHQ.phone,
          email: COMPANY_DATA.contacts.generalHQ.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: COMPANY_DATA.operationalAddress.streetAddress,
            postalCode: COMPANY_DATA.operationalAddress.postalCode,
            addressLocality: COMPANY_DATA.operationalAddress.city,
            addressCountry: 'PL',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: COMPANY_DATA.coordinates.oswiecimHQ.lat,
            longitude: COMPANY_DATA.coordinates.oswiecimHQ.lng,
          },
        },
      ],
    };

    routes.push({
      routePath: data.prefix ? `/${data.prefix}` : '/',
      outputPath,
      lang: data.lang,
      langKey,
      title: data.title,
      description: data.desc,
      canonicalUrl: canonical,
      ogType: 'website',
      hreflangs: getHreflangs(''),
      h1: data.h1,
      h2: data.h2,
      bodyContent: `
        <header class="header-nav">
          <div class="logo">CHEMOROZRUCH</div>
          <nav>
            <a href="${data.prefix ? `/${data.prefix}` : '/'}#company-discovery-section">O firmie</a>
            <a href="${data.prefix ? `/${data.prefix}` : '/'}#competencies-section">Kompetencje</a>
            <a href="${data.prefix ? `/${data.prefix}` : '/'}#facilities-section">Zaplecze</a>
            <a href="${data.prefix ? `/${data.prefix}` : '/'}#certificates-section">Certyfikaty</a>
            <a href="${data.prefix ? `/${data.prefix}` : '/'}#realizations-section">Realizacje</a>
            <a href="${data.prefix ? `/${data.prefix}` : '/'}#kontakt-cta">Kontakt</a>
          </nav>
        </header>
        <main>
          <section id="hero" class="hero-section">
            <h1>${data.h1}</h1>
            <p class="hero-lead">${data.lead}</p>
            <div class="hero-facts">
              <span>50+ lat na rynku</span>
              <span>15 000+ t stali rocznie</span>
              <span>12 000 m² hal produkcyjnych</span>
              <span>Certyfikaty UDT, PED, EN 1090-2, ISO 3834-2</span>
            </div>
          </section>
          <section id="company-discovery-section">
            <h2>${data.h2}</h2>
            <p>${data.aboutText}</p>
            <p>${data.sectorsTitle}</p>
          </section>
          <section id="competencies-section">
            <h2>Główne linie ofertowe CHEMOROZRUCH</h2>
            <div class="services-grid">
              <article>
                <h3><a href="/${data.prefix}konstrukcje-stalowe/">Konstrukcje stalowe</a></h3>
                <p>Prefabrykacja i montaż konstrukcji przemysłowych, estakad rurowych, wież i hal technologicznych zgodnie z EN 1090-2 EXC3.</p>
              </article>
              <article>
                <h3><a href="/${data.prefix}remonty-modernizacje-instalacji-przemyslowych/">Remonty i modernizacje instalacji przemysłowych</a></h3>
                <p>Generalne przestoje remontowe (turnaround), wymiana węzłów technologicznych, modernizacja rurociągów pod nadzorem UDT/TUV.</p>
              </article>
              <article>
                <h3><a href="/${data.prefix}aparaty-cisnieniowe/">Aparaty ciśnieniowe i zbiorniki technologiczne</a></h3>
                <p>Projektowanie, wytwarzanie, regeneracja i montaż reaktorów, kolumn, wymienników ciepła i zbiorników ciśnieniowych (PED 2014/68/UE).</p>
              </article>
              <article>
                <h3><a href="/${data.prefix}montaz-urzadzen-przemyslowych/">Montaż urządzeń przemysłowych</a></h3>
                <p>Posadowienie, osiowanie laserowe, montaż pomp, sprężarek, turbin, filtrów i ciągów technologicznych.</p>
              </article>
            </div>
          </section>
          <section id="contact-info">
            <h2>Kontakt i Dane Rejestrowe</h2>
            <p><strong>${COMPANY_DATA.legalName}</strong></p>
            <p>Siedziba: ${COMPANY_DATA.operationalAddress.fullString}</p>
            <p>Oddział Płock: ${COMPANY_DATA.plockBranchAddress.fullString}</p>
            <p>NIP: ${COMPANY_DATA.nipFormatted} | REGON: ${COMPANY_DATA.regon} | KRS: ${COMPANY_DATA.krs}</p>
            <p>Telefon: ${COMPANY_DATA.contacts.generalHQ.phone} | Email: ${COMPANY_DATA.contacts.generalHQ.email}</p>
          </section>
        </main>
        <footer>
          <p>© ${new Date().getFullYear()} ${COMPANY_DATA.legalName}. Wszelkie prawa zastrzeżone.</p>
          <p>
            <a href="/rodo">Klauzula Informacyjna RODO</a> |
            <a href="/sygnalisci">Ochrona Sygnalistów</a> |
            <a href="/polityka-prywatnosci">Polityka Prywatności</a>
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
            <div class="logo"><a href="/${prefix}">CHEMOROZRUCH</a></div>
            <nav aria-label="Nawigacja">
              <a href="/${prefix}">Powrót do strony głównej</a>
              <a href="/${prefix}#kontakt-cta">Zapytanie ofertowe</a>
            </nav>
          </header>
          <main class="service-page-container">
            <nav aria-label="Breadcrumb" class="breadcrumb">
              <a href="/${prefix}">Strona główna</a> &gt;
              <span>${meta.title.split('|')[0].trim()}</span>
            </nav>
            <article>
              <h1>${meta.h1}</h1>
              <p class="service-lead">${meta.subtitle}</p>
              
              <section class="service-description">
                <h2>Opis i charakterystyka inżynieryjna</h2>
                ${overviewText}
              </section>

              <section class="service-scope">
                <h2>Zakres prac i technologii</h2>
                <ul>
                  ${scopeItems}
                </ul>
              </section>

              <section class="service-specs">
                <h2>Parametry techniczne i możliwości produkcyjne</h2>
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
                <h2>Gatunki stali i normy wykonawcze</h2>
                <p><strong>Materiały:</strong> ${materialsList}</p>
                <p><strong>Certyfikowane normy:</strong> ${standardsList}</p>
              </section>

              <section class="service-cta">
                <h2>Skonsultuj projekt z działem inżynieryjnym</h2>
                <p>Zapraszamy do kontaktu z Działem Ofertowania CHEMOROZRUCH. Przygotujemy profesjonalną wycenę i harmonogram realizacji.</p>
                <p>Telefon: <strong>${COMPANY_DATA.contacts.tendering.phone}</strong> | Email: <strong>${COMPANY_DATA.contacts.tendering.email}</strong></p>
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
          <div class="logo"><a href="/">CHEMOROZRUCH</a></div>
          <nav><a href="/">Powrót do strony głównej</a></nav>
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
    <meta property="og:image" content="${BASE_URL}/og-image.jpg" />

    <!-- Twitter Card Meta -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${BASE_URL}/og-image.jpg" />

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
