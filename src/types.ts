import siteImages from './assets/images';

export type Language = 'PL' | 'EN' | 'DE' | 'UA';

export interface MetricItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

export interface CompetenceItem {
  id: string;
  index: string;
  name: string;
  shortDesc: string;
  scope: string[];
  image: string;
  imageAlt: string;
  specs: { label: string; value: string }[];
}

export interface DiscoveryItem {
  id: string;
  index: string;
  title: string;
  tagline?: string;
  description: string;
  listIntro?: string;
  bulletPoints?: string[];
  closingText?: string;
  image: string;
  imageAlt: string;
}

export interface FacilityItem {
  id: string;
  index: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  role: 'dominant' | 'supporting1' | 'supporting2' | 'supporting3';
}

export interface FacilitiesSectionContent {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  supporting: string;
  items: FacilityItem[];
}

export interface RealizationProjectDetail {
  scope: string;
  industry: string;
  location: string;
  year: string;
}

export interface RealizationProjectItem {
  id: string;
  index: string;
  num: string;
  category: string;
  title: string;
  location: string;
  summary: string;
  image: string;
  details: RealizationProjectDetail;
}

export interface RealizationsSectionContent {
  eyebrow: string;
  heading: string;
  supporting: string;
  expandDetails: string;
  hideDetails: string;
  scopeLabel: string;
  industryLabel: string;
  locationLabel: string;
  yearLabel: string;
  projects: RealizationProjectItem[];
}

export interface CertificateItem {
  id: string;
  code: string;
  name: string;
  scope: string;
  authority: string;
  normSummary: string;
}

export interface CertificatesSectionContent {
  eyebrow: string;
  heading: string;
  supporting: string;
  trustNote: string;
  prevCertLabel?: string;
  nextCertLabel?: string;
  zoomCertLabel?: string;
  standards?: CertificateItem[];
}

export interface BranchLocationItem {
  id: string;
  city: string;
  role: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  coords: { x: number; y: number };
  gpsCoords: { lat: number; lng: number };
  industrialFocus: string;
  directionsUrl: string;
  googleMapsUrl: string;
  embedQuery: string;
}

export interface LocationsSectionContent {
  eyebrow: string;
  heading: string;
  supporting: string;
  hqBadge: string;
  branchBadge: string;
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;
  focusLabel: string;
  routeBtn: string;
  openMapsBtn: string;
  copyAddressBtn: string;
  copiedLabel: string;
  viewOverviewLabel: string;
  branches: BranchLocationItem[];
}

export interface ProcessStageItem {
  id: string;
  index: string;
  name: string;
  description: string;
}

export interface ProcessSectionContent {
  eyebrow: string;
  heading: string;
  supporting: string;
  hintClick: string;
  stages: ProcessStageItem[];
}

export interface ContactCTASectionContent {
  eyebrow: string;
  heading: string;
  supporting: string;
  primaryCtaBtn: string;
  hideFormBtn: string;
  form: {
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    rodoConsent: string;
    submitBtn: string;
    submitting: string;
    successHeading: string;
    successMessage: string;
    backBtn: string;
  };
  directContact: {
    label: string;
    hqLabel: string;
    address: string;
    phone: string;
    email: string;
  };
}

export interface FooterContent {
  companyName: string;
  companySub: string;
  columns: {
    contactTitle: string;
    hqLabel: string;
    address: string;
    phone: string;
    email: string;
    navTitle: string;
    navLinks: {
      about: string;
      competencies: string;
      facilities?: string;
      process?: string;
      realizations: string;
      certificates: string;
      locations: string;
      contact: string;
    };
    infoTitle: string;
    privacy: string;
    rodo: string;
    whistleblower: string;
    linkedin: string;
  };
  copyright: string;
  allRightsReserved: string;
  backToTop: string;
}

export interface TranslationContent {
  header: {
    companyName: string;
    companySub: string;
    inquiryBtn: string;
  };
  hero: {
    headline: string;
    supporting: string;
    ctaBtn: string;
    scrollIndicator: string;
  };
  numbers: {
    tag: string;
    heading: string;
    metrics: MetricItem[];
  };
  discovery: {
    tag: string;
    heading: string;
    subheading: string;
    items: DiscoveryItem[];
  };
  competencies: {
    tag: string;
    heading: string;
    subheading: string;
    expandScopeBtn: string;
    collapseScopeBtn: string;
    scopeLabel: string;
    inquiryBtn: string;
    items: CompetenceItem[];
  };
  facilities: FacilitiesSectionContent;
  process: ProcessSectionContent;
  realizations: RealizationsSectionContent;
  certificates: CertificatesSectionContent;
  locations: LocationsSectionContent;
  contactCTA: ContactCTASectionContent;
  footer: FooterContent;
  inquiryModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    sendBtn: string;
    successMsg: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  PL: {
    header: {
      companyName: 'CHEMOROZRUCH',
      companySub: 'Przemysłowe instalacje i technologie',
      inquiryBtn: 'Formularz kontaktowy',
    },
    hero: {
      headline: 'Napędzamy przemysł.',
      supporting: 'Przemysłowe instalacje. Realne efekty.',
      ctaBtn: 'Poznaj możliwości',
      scrollIndicator: 'Przewiń w dół',
    },
    numbers: {
      tag: 'CHEMOROZRUCH',
      heading: 'Skala, która ma znaczenie.',
      metrics: [
        {
          id: 'exp',
          value: 55,
          suffix: '+',
          label: 'lat doświadczenia',
          sub: 'Ciągłości technologicznej i inżynieryjnej',
        },
        {
          id: 'specialists',
          value: 100,
          suffix: '+',
          label: 'specjalistów',
          sub: 'Inżynierów, monterów i certyfikowanych spawaczy',
        },
        {
          id: 'founded',
          value: 1971,
          suffix: '',
          label: 'rok założenia',
          sub: 'Tradycja i polska myśl inżynieryjna',
        },
        {
          id: 'welding-tech',
          value: 170,
          suffix: '+',
          label: 'technologii spawania',
          sub: 'Kwalifikowane technologie WPQR / WPS',
        },
      ],
    },
    discovery: {
      tag: 'PRZEGLĄD POTENCJAŁU',
      heading: 'Poznaj CHEMOROZRUCH',
      subheading: 'Przemysł od środka.',
      items: [
        {
          id: 'about',
          index: '01',
          title: 'Kim jesteśmy',
          description:
            'Przedsiębiorstwo specjalistyczne z ponad 55-letnią tradycją i doświadczeniem w realizacji kompleksowych inwestycji przemysłowych. Jesteśmy spółką ze 100% polskim kapitałem, dysponującą oddziałami w Oświęcimiu i Płocku oraz zespołem ponad 100 wysoko wykwalifikowanych pracowników. Łączymy bogatą historię z nowoczesnym podejściem do wykonawstwa.',
          bulletPoints: [],
          image: '/images/o-firmie/chemorozruch-kim-jestesmy.webp',
          imageAlt: 'CHEMOROZRUCH – Kim jesteśmy',
        },
        {
          id: 'projects',
          index: '02',
          title: 'Co realizujemy',
          description:
            'Główną osią naszej działalności jest produkcja, modernizacja i serwis infrastruktury przemysłowej.',
          listIntro: 'Specjalizujemy się w:',
          bulletPoints: [
            'Wytwarzaniu konstrukcji oraz aparatów ciśnieniowych i bezciśnieniowych,',
            'Naprawach i modernizacjach urządzeń oraz instalacji zgodnie z obowiązującymi rozporządzeniami i normami prawnymi,',
            'Montażu rurociągów oraz instalacji technologicznych.',
          ],
          closingText:
            'Pełen nadzór nad procesami zapewnia własny Dział Kontroli Jakości oraz Główny Spawalnik, co gwarantuje bezpieczeństwo i pełną zgodność formalno-prawną.',
          image: '/images/o-firmie/chemorozruch-co-realizujemy.webp',
          imageAlt: 'CHEMOROZRUCH – Co realizujemy',
        },
        {
          id: 'industries',
          index: '03',
          title: 'Dla jakich branż',
          description:
            'Realizujemy kompleksowe projekty w Polsce i za granicą dla liderów rynku, takich jak ORLEN S.A., SYNTHOS S.A., Grupa Azoty PUŁAWY S.A. czy Rafineria Gdańska sp. z o.o.',
          listIntro: 'Dostarczamy rozwiązania dla kluczowych sektorów:',
          bulletPoints: [
            'Przemysł chemiczny, petrochemiczny i rafineryjny',
            'Energetyka i ochrona środowiska',
            'Przemysł spożywczy oraz instalacje przemysłowe ogólnego przeznaczenia',
          ],
          image: '/images/o-firmie/chemorozruch-branze-przemyslowe.webp',
          imageAlt: 'CHEMOROZRUCH – Dla jakich branż',
        },
        {
          id: 'capabilities',
          index: '04',
          title: 'Nasze możliwości i struktura',
          description:
            'Posiadamy zaplecze techniczne dostosowane do specyfiki realizowanych zadań:',
          bulletPoints: [
            'Zakład Wytwórczy w Oświęcimiu: Własny warsztat produkcyjny wyposażony w specjalistyczny park maszynowy (m.in. komora śrutownicza, malarnia, wypalarki plazmowe, giętarki, wiertarko-frezarki), umożliwiający precyzyjną prefabrykację skomplikowanych aparatów ciśnieniowych, zbiorników oraz konstrukcji.',
            'Oddział Remontowo-Montażowy w Płocku: Wyspecjalizowane jednostki nastawione na kompleksowy montaż, prace remontowe, serwisowe oraz regenerację armatury.',
          ],
          closingText:
            'Nad realizacją projektów czuwają zespoły technologiczne, kierownicy projektów oraz doświadczona kadra techniczna. Prace wykonują wykwalifikowani monterzy i spawacze, działający pod nadzorem specjalistów odpowiedzialnych za technologię, jakość oraz prawidłowy przebieg realizacji.',
          image: '/images/o-firmie/chemorozruch-zaplecze-techniczne.webp',
          imageAlt: 'CHEMOROZRUCH – Nasze możliwości i struktura',
        },
      ],
    },
    competencies: {
      tag: 'NASZE KOMPETENCJE',
      heading: 'Kompleksowo dla przemysłu.',
      subheading: 'Od pojedynczego urządzenia po kompleksową realizację instalacji.',
      expandScopeBtn: 'Rozwiń zakres +',
      collapseScopeBtn: 'Zwiń zakres −',
      scopeLabel: 'Kluczowy zakres wykonawczy:',
      inquiryBtn: 'Zapytaj o tę kompetencję',
      items: [
        {
          id: 'apparatus',
          index: '01',
          name: 'Aparaty przemysłowe',
          shortDesc: 'Wytwarzanie, montaż i modernizacja wymienników ciepła, kolumn rektyfikacyjnych, reaktorów oraz zbiorników ciśnieniowych.',
          scope: [
            'Wymienniki ciepła płaszczowo-rurowe',
            'Kolumny rektyfikacyjne i absorpcyjne',
            'Reaktory chemiczne i zbiorniki ciśnieniowe',
            'Montaż wkładów, wiązek rurkowych i denic',
            'Próby ciśnieniowe i badania NDT pod dozorem UDT/TÜV',
          ],
          image: siteImages.aparatyApparatus,
          imageAlt: 'Aparaty przemysłowe i wymienniki ciepła Chemorozruch',
          specs: [
            { label: 'Ciśnienie pracy', value: 'do 320 bar' },
            { label: 'Temperatura', value: '-40°C do +650°C' },
            { label: 'Materiały', value: 'Stale węglowe, kwasoodporne, duplex' },
          ],
        },
        {
          id: 'pipelines',
          index: '02',
          name: 'Rurociągi technologiczne',
          shortDesc: 'Prefabrykacja, montaż i modernizacja instalacji rurociągowych dla wymagających procesów przemysłowych.',
          scope: [
            'Rurociągi pary, kondensatu, gazów i mediów agresywnych',
            'Prefabrykacja rurociągów w halach wytwórczych',
            'Montaż na estakadach i w budynkach technologicznych',
            'Spawanie metodami TIG, MAG, MMA i orbitalnym',
            'Próby ciśnieniowe, płukanie chemiczne i pasywacja',
          ],
          image: siteImages.rurociagiPipes,
          imageAlt: 'Rurociągi technologiczne i węzły rozdzielcze Chemorozruch',
          specs: [
            { label: 'Średnice', value: 'DN15 do DN2400' },
            { label: 'Standardy', value: 'EN 13480, ASME B31.3' },
            { label: 'Dozór', value: 'UDT, TÜV, Lloyd’s' },
          ],
        },
        {
          id: 'modernization',
          index: '03',
          name: 'Remonty i modernizacje',
          shortDesc: 'Planowe przestoje remontowe, rewizje techniczne, odtwarzanie parametrów pracy i modernizacje ciągów technologicznych.',
          scope: [
            'Kompleksowa obsługa postojów remontowych (Turnarounds)',
            'Wymiana zużytych węzłów rurociągowych i aparatury',
            'Rewizje wewnętrzne i przygotowanie urządzeń do badań UDT',
            'Precyzyjne osiowanie laserowe maszyn i pomp',
            'Szybkie interwencje awaryjne 24/7',
          ],
          image: siteImages.remontyOverhaul,
          imageAlt: 'Remonty instalacji przemysłowych i modernizacje Chemorozruch',
          specs: [
            { label: 'Mobilność', value: 'Cała Polska i UE' },
            { label: 'Gotowość', value: 'Wieloosobowe brygady mobilne' },
            { label: 'BHP', value: 'Standardy SCC** / ISO 45001' },
          ],
        },
        {
          id: 'valves',
          index: '04',
          name: 'Armatura przemysłowa',
          shortDesc: 'Dostawa, regeneracja, montaż i próby zaworów regulacyjnych, odcinających oraz bezpieczeństwa.',
          scope: [
            'Montaż i regeneracja armatury wysokociśnieniowej',
            'Docieranie gniazd i wymiana uszczelnień na instalacji',
            'Nastawa i próby zaworów bezpieczeństwa pod dozorem UDT',
            'Montaż i kalibracja siłowników pneumatycznych i elektrycznych',
            'Badania szczelności wewnętrznej i zewnętrznej',
          ],
          image: siteImages.armaturaValves,
          imageAlt: 'Armatura przemysłowa i zawory wysokich ciśnień Chemorozruch',
          specs: [
            { label: 'Klasy ciśnienia', value: 'PN16 - PN400 / Class 150-2500' },
            { label: 'Zakres średnic', value: 'DN10 do DN1200' },
            { label: 'Badania', value: 'Stanowiska mobilne UDT' },
          ],
        },
        {
          id: 'epc',
          index: '05',
          name: 'Realizacje EPC',
          shortDesc: 'Kompleksowa realizacja inwestycji przemysłowych w formule "zaprojektuj i wybuduj" z pełną koordynacją rozruchową.',
          scope: [
            'Generalne wykonawstwo i zarządzanie kontraktem (EPC/EPCM)',
            'Koordynacja branży mechanicznej, AKPiA, elektrycznej i budowlanej',
            'Harmonogramowanie i optymalizacja kosztowa inwestycji',
            'Rozruch technologiczny "na zimno" i "na gorąco"',
            'Kompletna dokumentacja powykonawcza i odbiory UDT',
          ],
          image: siteImages.epcTurnkey,
          imageAlt: 'Realizacje EPC i instalacje "pod klucz" Chemorozruch',
          specs: [
            { label: 'Formuła', value: 'Turnkey / EPC / Generalne Wykonawstwo' },
            { label: 'Koordynacja', value: 'BIM / 3D Laser Scanning' },
            { label: 'Gwarancja', value: 'Pełna odpowiedzialność procesowa' },
          ],
        },
        {
          id: 'steel',
          index: '06',
          name: 'Konstrukcje stalowe',
          shortDesc: 'Prefabrykacja i montaż ciężkich konstrukcji wsporczych, estakad rurowych, pomostów obsługowych i hal przemysłowych.',
          scope: [
            'Estakady i mosty rurociągowe wysokich rozpiętości',
            'Konstrukcje wsporcze aparatów, cyklonów i reaktorów',
            'Pomosty obsługowe, klatki schodowe i platformy technologiczne',
            'Cynkowanie ogniowe i wielowarstwowe systemy antykorozyjne',
            'Montaż z użyciem ciężkiego sprzętu dźwigowego',
          ],
          image: siteImages.stalStructures,
          imageAlt: 'Konstrukcje stalowe i estakady przemysłowe Chemorozruch',
          specs: [
            { label: 'Norma wytwarzania', value: 'EN 1090-2 (klasa EXC3)' },
            { label: 'Wydajność', value: 'Do 350 ton / miesiąc' },
            { label: 'Antykorozja', value: 'Kategorie C3 - CX wg ISO 12944' },
          ],
        },
      ],
    },
    facilities: {
      eyebrow: 'ZAPLECZE TECHNOLOGICZNE',
      headingLine1: 'Własne możliwości.',
      headingLine2: 'Pełna kontrola nad realizacją.',
      supporting: 'Produkcja, prefabrykacja i obróbka realizowane z wykorzystaniem własnego zaplecza technologicznego.',
      items: [
        {
          id: 'komora-srutownicza',
          index: '01',
          name: 'Komora śrutownicza',
          description: 'Przygotowanie powierzchni elementów stalowych przed dalszym procesem zabezpieczenia i malowania do stopnia Sa 2.5 / Sa 3.0.',
          image: siteImages.srutownicaBlasting,
          imageAlt: 'Komora śrutownicza Chemorozruch',
          role: 'supporting1',
        },
        {
          id: 'wypalarka-plazmowa',
          index: '02',
          name: 'Wypalarka plazmowa',
          description: 'Precyzyjne cięcie termiczne i ukosowanie krawędzi spawalniczych blach grubych ze sterowaniem numerycznym CNC.',
          image: siteImages.plazmaPlasma,
          imageAlt: 'Wypalarka plazmowo-gazowa CNC Chemorozruch',
          role: 'supporting2',
        },
        {
          id: 'gietarka',
          index: '03',
          name: 'Giętarka',
          description: 'Zwijanie walczaków i płaszczy aparatów ciśnieniowych oraz gięcie profili na ciężkich walcach hydraulicznych.',
          image: siteImages.gietarkaBending,
          imageAlt: 'Walce 4-rolkowe i giętarka hydrauliczna Chemorozruch',
          role: 'supporting3',
        },
        {
          id: 'hala-produkcyjna',
          index: '04',
          name: 'Hale produkcyjne i montaż',
          description: 'Wielonawowy kompleks wytwórczy o powierzchni 8 500 m² z suwnicami do 50 ton i wydzieloną nawą dla stali kwasoodpornych.',
          image: siteImages.zapleczeHall,
          imageAlt: 'Główna hala produkcyjna Chemorozruch',
          role: 'dominant',
        },
        {
          id: 'wiertarko-frezarka',
          index: '05',
          name: 'Wiertarko-frezarka',
          description: 'Dokładna obróbka mechaniczna kołnierzy, dennic, płyt sitowych wymienników ciepła oraz korpusów aparatów.',
          image: siteImages.frezarkaMilling,
          imageAlt: 'Obróbka skrawaniem i frezowanie Chemorozruch',
          role: 'supporting1',
        },
        {
          id: 'malarnia',
          index: '06',
          name: 'Malarnia',
          description: 'Aplikacja wielowarstwowych systemów antykorozyjnych i ogniochronnych w ściśle kontrolowanych warunkach temperaturowych.',
          image: siteImages.malarniaSpawanie,
          imageAlt: 'Malarnia i zabezpieczenia antykorozyjne Chemorozruch',
          role: 'supporting2',
        },
        {
          id: 'zaplecze-spawalnicze',
          index: '07',
          name: 'Zaplecze spawalnicze',
          description: 'Zautomatyzowane i manualne stanowiska spawalnicze (TIG, MIG/MAG, łuk kryty) z certyfikacją UDT i badaniami NDT.',
          image: siteImages.malarniaSpawanie,
          imageAlt: 'Stanowiska spawalnicze i certyfikowane spawanie Chemorozruch',
          role: 'supporting3',
        },
      ],
    },
    process: {
      eyebrow: 'PROCES REALIZACJI',
      heading: 'Od projektu do uruchomienia.',
      supporting: 'Jeden proces. Jedna odpowiedzialność.',
      hintClick: 'Kliknij etap, aby sprawdzić szczegóły',
      stages: [
        {
          id: 'analiza',
          index: '01',
          name: 'Analiza',
          description: 'Szczegółowa weryfikacja założeń technologicznych, specyfikacji materiałowej oraz warunków brzegowych instalacji.',
        },
        {
          id: 'projekt',
          index: '02',
          name: 'Projekt',
          description: 'Przygotowanie dokumentacji technicznej i technologicznej dopasowanej do wymagań konkretnej inwestycji.',
        },
        {
          id: 'produkcja',
          index: '03',
          name: 'Produkcja',
          description: 'Prefabrykacja rurociągów, aparatów i konstrukcji we własnych halach wytwórczych z zachowaniem reżimów jakościowych.',
        },
        {
          id: 'montaz',
          index: '04',
          name: 'Montaż',
          description: 'Precyzyjny montaż mechaniczny i spawalniczy na obiekcie z zachowaniem najwyższych standardów BHP.',
        },
        {
          id: 'kontrola',
          index: '05',
          name: 'Kontrola',
          description: 'Rygorystyczne badania NDT, próby ciśnieniowe i odbiory techniczne pod nadzorem UDT / TÜV.',
        },
        {
          id: 'uruchomienie',
          index: '06',
          name: 'Uruchomienie',
          description: 'Rozruch technologiczny "na zimno" i "na gorąco", próby ruchowe oraz przekazanie instalacji do bezpiecznej eksploatacji.',
        },
      ],
    },
    realizations: {
      eyebrow: 'REALIZACJE',
      heading: 'Projekty, które pracują przez lata.',
      supporting: 'Wybrane realizacje i elementy wykonane przez CHEMOROZRUCH.',
      expandDetails: 'Zobacz szczegóły +',
      hideDetails: 'Zwiń szczegóły −',
      scopeLabel: 'Zakres prac',
      industryLabel: 'Branża',
      locationLabel: 'Lokalizacja',
      yearLabel: 'Rok realizacji',
      projects: [],
    },
    certificates: {
      eyebrow: 'JAKOŚĆ I STANDARDY',
      heading: 'Potwierdzone standardami.',
      supporting: 'Jakość, bezpieczeństwo i zgodność potwierdzone certyfikacją branżową.',
      trustNote: 'Dokumentacja jakościowa, procedury spawalnicze (WPS/WPQR) oraz pełne raporty NDT dostępne na życzenie.',
      prevCertLabel: 'Poprzedni certyfikat',
      nextCertLabel: 'Następny certyfikat',
      zoomCertLabel: 'Powiększ skan dokumentu',
      standards: [],
    },
    locations: {
      eyebrow: 'LOKALIZACJE',
      heading: 'Nasze lokalizacje',
      supporting: 'Dwa strategiczne ośrodki przemysłowe w Polsce — Oświęcim oraz Płock.',
      hqBadge: 'Siedziba Główna / Zakład',
      branchBadge: 'Oddział Płock',
      phoneLabel: 'Telefon',
      emailLabel: 'E-mail',
      addressLabel: 'Adres',
      focusLabel: 'Profil i kompetencje ośrodka',
      routeBtn: 'Wyznacz trasę',
      openMapsBtn: 'Otwórz w Google Maps',
      copyAddressBtn: 'Kopiuj adres',
      copiedLabel: 'Skopiowano!',
      viewOverviewLabel: 'Widok ogólny / Polska',
      branches: [
        {
          id: 'oswiecim',
          city: 'Oświęcim',
          role: 'Siedziba Główna / Zakład',
          address: 'ul. Unii Europejskiej 10',
          postalCode: '32-600 Oświęcim',
          phone: '+48 33 847 21 00',
          email: 'poczta@chemorozruch.pl',
          coords: { x: 48, y: 82 },
          gpsCoords: { lat: 50.0385, lng: 19.2635 },
          industrialFocus: 'Zarząd spółki, główne biuro inżynieryjne oraz wielonawowy zakład prefabrykacji rurociągów technologicznych i aparatury ciśnieniowej.',
          directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Chemorozruch+Oswiecim+ul.+Unii+Europejskiej+10+32-600+Oswiecim',
          googleMapsUrl: 'https://maps.google.com/?q=CHEMOROZRUCH+S.A.,+ul.+Unii+Europejskiej+10,+32-600+Oświęcim',
          embedQuery: 'CHEMOROZRUCH+ul.+Unii+Europejskiej+10,+32-600+Oświęcim',
        },
        {
          id: 'plock',
          city: 'Płock',
          role: 'Oddział Płock',
          address: 'ul. Witolda Zglenickiego 50 F',
          postalCode: '09-400 Płock',
          phone: '+48 24 365 24 00',
          email: 'plock@chemorozruch.pl',
          coords: { x: 52, y: 44 },
          gpsCoords: { lat: 52.5935, lng: 19.6820 },
          industrialFocus: 'Oddział realizacyjny na terenie kompleksu rafineryjno-petrochemicznego PKN ORLEN. Prefabrykacja, montaż i postoje remontowe.',
          directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=ul.+Witolda+Zglenickiego+50+F,+09-400+Plock',
          googleMapsUrl: 'https://maps.google.com/?q=ul.+Witolda+Zglenickiego+50+F,+09-400+Płock',
          embedQuery: 'ul.+Witolda+Zglenickiego+50+F,+09-400+Płock',
        },
      ],
    },
    contactCTA: {
      eyebrow: 'KONTAKT',
      heading: 'Porozmawiajmy o Twojej inwestycji.',
      supporting: 'Od pojedynczego urządzenia po kompleksową realizację przemysłową.',
      primaryCtaBtn: 'Wyślij zapytanie',
      hideFormBtn: 'Zwiń formularz',
      form: {
        nameLabel: 'Imię i nazwisko',
        namePlaceholder: 'np. Jan Kowalski',
        companyLabel: 'Firma',
        companyPlaceholder: 'np. Zakłady Chemiczne S.A.',
        emailLabel: 'E-mail',
        emailPlaceholder: 'jan.kowalski@firma.pl',
        phoneLabel: 'Telefon (opcjonalnie)',
        phonePlaceholder: '+48 000 000 000',
        messageLabel: 'Wiadomość / Zakres inwestycji',
        messagePlaceholder: 'Opisz krótko planowaną inwestycję, parametry techniczne lub harmonogram prac...',
        rodoConsent: 'Wyrażam zgodę na przetwarzanie danych osobowych w celu przygotowania oferty techniczno-handlowej.',
        submitBtn: 'Wyślij zapytanie →',
        submitting: 'Wysyłanie...',
        successHeading: 'Dziękujemy. Wiadomość została wysłana.',
        successMessage: 'Nasz zespół inżynierów przeanalizuje zakres i skontaktuje się w możliwie najkrótszym czasie.',
        backBtn: 'Wyślij kolejną wiadomość',
      },
      directContact: {
        label: 'Bezpośredni kontakt',
        hqLabel: 'Centrala & Zakład Produkcyjny',
        address: 'ul. Unii Europejskiej 10, 32-600 Oświęcim',
        phone: '+48 33 847 21 00',
        email: 'poczta@chemorozruch.pl',
      },
    },
    footer: {
      companyName: 'CHEMOROZRUCH',
      companySub: 'Przemysłowe instalacje i technologie',
      columns: {
        contactTitle: 'KONTAKT',
        hqLabel: 'Centrala i Zakład Produkcyjny',
        address: 'ul. Unii Europejskiej 10, 32-600 Oświęcim',
        phone: '+48 33 847 21 00',
        email: 'poczta@chemorozruch.pl',
        navTitle: 'NAWIGACJA',
        navLinks: {
          about: 'O firmie',
          competencies: 'Oferta',
          realizations: 'Realizacje',
          certificates: 'Certyfikaty',
          locations: 'Oddziały',
          contact: 'Kontakt',
        },
        infoTitle: 'INFORMACJE',
        privacy: 'Polityka prywatności',
        rodo: 'Klauzula informacyjna RODO',
        whistleblower: 'Sygnaliści',
        linkedin: 'LinkedIn',
      },
      copyright: 'CHEMOROZRUCH S.A.',
      allRightsReserved: 'Wszelkie prawa zastrzeżone.',
      backToTop: 'Do góry',
    },
    inquiryModal: {
      title: 'Zapytanie ofertowe',
      subtitle: 'Skontaktuj się z zespołem inżynieryjnym Chemorozruch.',
      nameLabel: 'Imię i nazwisko / Firma',
      emailLabel: 'Adres e-mail',
      phoneLabel: 'Numer telefonu',
      messageLabel: 'Zakres projektu / Specyfikacja',
      sendBtn: 'Wyślij zapytanie',
      successMsg: 'Dziękujemy! Twoje zapytanie zostało przesłane.',
    },
  },
  EN: {
    header: {
      companyName: 'CHEMOROZRUCH',
      companySub: 'Industrial Installations & Technologies',
      inquiryBtn: 'Submit Inquiry',
    },
    hero: {
      headline: 'Powering Industry.',
      supporting: 'Industrial installations. Tangible impact.',
      ctaBtn: 'Explore Capabilities',
      scrollIndicator: 'Scroll to explore',
    },
    numbers: {
      tag: 'CHEMOROZRUCH',
      heading: 'Scale that delivers certainty.',
      metrics: [
        {
          id: 'exp',
          value: 55,
          suffix: '+',
          label: 'years of experience',
          sub: 'Technological continuity and engineering excellence',
        },
        {
          id: 'specialists',
          value: 100,
          suffix: '+',
          label: 'specialists',
          sub: 'Engineers, fitters, and certified welders',
        },
        {
          id: 'founded',
          value: 1971,
          suffix: '',
          label: 'year founded',
          sub: 'Heritage of high-precision engineering',
        },
        {
          id: 'welding-tech',
          value: 170,
          suffix: '+',
          label: 'welding procedures',
          sub: 'Qualified WPQR / WPS technologies',
        },
      ],
    },
    discovery: {
      tag: 'CAPABILITY OVERVIEW',
      heading: 'Discover CHEMOROZRUCH',
      subheading: 'Industry from the inside.',
      items: [
        {
          id: 'about',
          index: '01',
          title: 'Who we are',
          tagline: 'General contracting and industrial mechanical installation',
          description:
            'A specialized engineering enterprise with over 50 years of track record in delivering turn-key technological installations, industrial piping, and steel structures for crucial sectors of the economy.',
          bulletPoints: [
            'In-house engineering and project management team',
            'ISO, UDT, and TÜV quality certifications',
            'Established presence across the European market',
          ],
          image: siteImages.discoveryAbout,
          imageAlt: 'Chemorozruch engineering team and facility',
        },
        {
          id: 'projects',
          index: '02',
          title: 'What we deliver',
          tagline: 'Piping networks, apparatus, mechanical assembly, and commissioning',
          description:
            'We engineer and install high- and low-pressure industrial piping, pressure vessels, pipe racks, energy installations, and execute comprehensive technological commissioning.',
          bulletPoints: [
            'Steam, gas, and aggressive media piping networks',
            'Installation of distillation columns and reactors',
            'Shop prefabrication and hydrostatic pressure testing',
          ],
          image: siteImages.discoveryProjects,
          imageAlt: 'Industrial piping bridges and technological installations',
        },
        {
          id: 'industries',
          index: '03',
          title: 'Industries served',
          tagline: 'Chemical, petrochemical, power generation, metallurgy, and heavy industry',
          description:
            'We provide advanced engineering services for the chemical industry, refineries, utility power plants, metallurgy, pulp & paper, and environmental protection systems.',
          bulletPoints: [
            'Chemical processing and fertilizer plants',
            'Power generation and thermal plants',
            'Refineries and gas infrastructure',
          ],
          image: siteImages.discoveryIndustries,
          imageAlt: 'Chemical and energy industrial complexes',
        },
        {
          id: 'capabilities',
          index: '04',
          title: 'Our capabilities',
          tagline: 'Dedicated workshops, precision prefabrication, and rigorous QA',
          description:
            'Equipped with modern piping prefabrication workshops, state-of-the-art welding machinery, mobile NDT testing laboratories, and certified UDT / TÜV qualifications.',
          bulletPoints: [
            'High-capacity prefabrication workshops',
            'Automated welding methods (TIG, MIG/MAG, SAW)',
            'Comprehensive non-destructive testing (NDT) QA',
          ],
          image: siteImages.discoveryCapabilities,
          imageAlt: 'Piping prefabrication workshop and machinery',
        },
      ],
    },
    competencies: {
      tag: 'OUR COMPETENCIES',
      heading: 'End-to-End Industrial Excellence.',
      subheading: 'From individual specialized apparatus to complete turn-key industrial installations.',
      expandScopeBtn: 'Expand scope +',
      collapseScopeBtn: 'Collapse scope −',
      scopeLabel: 'Key Execution Scope:',
      inquiryBtn: 'Inquire About This Competency',
      items: [
        {
          id: 'apparatus',
          index: '01',
          name: 'Industrial Apparatus',
          shortDesc: 'Fabrication, mechanical installation, and overhaul of shell-and-tube heat exchangers, columns, reactors, and pressure vessels.',
          scope: [
            'Shell-and-tube heat exchangers',
            'Distillation and absorption columns',
            'Chemical reactors and high-pressure vessels',
            'Tube bundle replacement and internal vessel fitting',
            'Hydrostatic testing and NDT inspection under UDT / TÜV',
          ],
          image: siteImages.aparatyApparatus,
          imageAlt: 'Industrial apparatus and heat exchangers Chemorozruch',
          specs: [
            { label: 'Operating Pressure', value: 'Up to 320 bar' },
            { label: 'Temperature Range', value: '-40°C to +650°C' },
            { label: 'Materials', value: 'Carbon, Stainless, Duplex & Nickel alloys' },
          ],
        },
        {
          id: 'pipelines',
          index: '02',
          name: 'Technological Piping',
          shortDesc: 'Prefabrication, mechanical assembly, and modernization of complex technological pipeline systems for demanding process media.',
          scope: [
            'High-pressure steam, gas, and hazardous chemical pipelines',
            'Workshop prefabrication of piping spools and manifolds',
            'Erection on structural pipe racks and industrial buildings',
            'Certified TIG, MAG, MMA, and orbital welding processes',
            'Pressure testing, chemical flushing, and passivation',
          ],
          image: siteImages.rurociagiPipes,
          imageAlt: 'Technological piping and manifold systems Chemorozruch',
          specs: [
            { label: 'Diameters', value: 'DN15 to DN2400' },
            { label: 'Design Codes', value: 'EN 13480, ASME B31.3' },
            { label: 'Inspection', value: 'UDT, TÜV, Lloyd’s Register' },
          ],
        },
        {
          id: 'modernization',
          index: '03',
          name: 'Overhauls & Modernization',
          shortDesc: 'Planned turnaround overhauls, technical revisions, operational restoration, and modernization of technological process lines.',
          scope: [
            'Comprehensive management of plant turnarounds (TAR)',
            'Replacement of critical pipeline nodes and process equipment',
            'Internal inspections and preparation for notified body audits',
            'Precision laser shaft and machinery alignment',
            'Rapid response emergency maintenance crews 24/7',
          ],
          image: siteImages.remontyOverhaul,
          imageAlt: 'Industrial plant maintenance and overhauls Chemorozruch',
          specs: [
            { label: 'Mobility', value: 'Poland & across European Union' },
            { label: 'Readiness', value: 'Multi-disciplinary mobile crews' },
            { label: 'HSE', value: 'SCC** / ISO 45001 certified' },
          ],
        },
        {
          id: 'valves',
          index: '04',
          name: 'Industrial Valves',
          shortDesc: 'Supply, refurbishment, on-site installation, and testing of high-pressure control, isolation, and safety relief valves.',
          scope: [
            'Installation and overhaul of high-pressure industrial valves',
            'On-site seat lapping, grinding, and packing replacement',
            'Safety relief valve set-pressure testing under UDT supervision',
            'Actuator and smart electro-pneumatic positioner calibration',
            'Internal and external seat leakage verification tests',
          ],
          image: siteImages.armaturaValves,
          imageAlt: 'Industrial valves and high pressure flow control Chemorozruch',
          specs: [
            { label: 'Pressure Ratings', value: 'PN16 - PN400 / Class 150-2500' },
            { label: 'Diameter Range', value: 'DN10 to DN1200' },
            { label: 'Test Equipment', value: 'Mobile UDT calibration test rigs' },
          ],
        },
        {
          id: 'epc',
          index: '05',
          name: 'EPC Turn-Key Execution',
          shortDesc: 'Complete turn-key delivery of industrial capital projects under design-and-build models with comprehensive commissioning.',
          scope: [
            'General contracting and project management (EPC/EPCM)',
            'Inter-disciplinary coordination of mechanical, E&I, and civil',
            'Integrated scheduling and investment cost optimization',
            'Cold loop checks and hot technological commissioning',
            'Complete as-built engineering dossier and regulatory approvals',
          ],
          image: siteImages.epcTurnkey,
          imageAlt: 'EPC turn-key industrial plant construction Chemorozruch',
          specs: [
            { label: 'Contract Model', value: 'Turnkey / EPC / General Contracting' },
            { label: 'Coordination', value: '3D BIM / Laser Point Cloud Scanning' },
            { label: 'Warranty', value: 'Full process performance guarantee' },
          ],
        },
        {
          id: 'steel',
          index: '06',
          name: 'Steel Structures',
          shortDesc: 'Prefabrication and erection of heavy structural support steelwork, pipe bridges, operating platforms, and industrial halls.',
          scope: [
            'Heavy pipe racks and large-span transfer bridges',
            'Support structures for reactors, columns, and baghouses',
            'Maintenance platforms, stair towers, and walkways',
            'Hot-dip galvanizing and multi-coat protective paint systems',
            'Heavy crane erection and on-site positioning',
          ],
          image: siteImages.stalStructures,
          imageAlt: 'Industrial structural steelwork and pipe racks Chemorozruch',
          specs: [
            { label: 'Manufacturing Code', value: 'EN 1090-2 (Execution Class EXC3)' },
            { label: 'Shop Capacity', value: 'Up to 350 metric tons / month' },
            { label: 'Corrosion Protection', value: 'ISO 12944 categories C3 - CX' },
          ],
        },
      ],
    },
    facilities: {
      eyebrow: 'TECHNOLOGICAL FACILITIES',
      headingLine1: 'In-House Capabilities.',
      headingLine2: 'Total Control Over Delivery.',
      supporting: 'Production, prefabrication, and precision processing executed with our proprietary technical facilities.',
      items: [
        {
          id: 'komora-srutownicza',
          index: '01',
          name: 'Shot Blasting Chamber',
          description: 'Surface preparation of structural steel and piping spools prior to coating to Sa 2.5 / Sa 3.0 cleanliness standard.',
          image: siteImages.srutownicaBlasting,
          imageAlt: 'Shot blasting facility Chemorozruch',
          role: 'supporting1',
        },
        {
          id: 'wypalarka-plazmowa',
          index: '02',
          name: 'CNC Plasma Cutter',
          description: 'Precision thermal cutting and automated 3D weld beveling for heavy carbon and stainless steel plates.',
          image: siteImages.plazmaPlasma,
          imageAlt: 'CNC Plasma cutting machine Chemorozruch',
          role: 'supporting2',
        },
        {
          id: 'gietarka',
          index: '03',
          name: 'Plate Bending Machine',
          description: 'High-precision rolling of thick pressure vessel shells and large-diameter pipes using 4-roll CNC hydraulics.',
          image: siteImages.gietarkaBending,
          imageAlt: '4-roll hydraulic plate roller Chemorozruch',
          role: 'supporting3',
        },
        {
          id: 'hala-produkcyjna',
          index: '04',
          name: 'Manufacturing Workshops',
          description: '8,500 m² multi-bay production facility with 50-ton overhead crane capacity and segregated stainless steel bay.',
          image: siteImages.zapleczeHall,
          imageAlt: 'Main production workshop Chemorozruch',
          role: 'dominant',
        },
        {
          id: 'wiertarko-frezarka',
          index: '05',
          name: 'Milling & Boring Center',
          description: 'Precision machining of flanges, tube sheets for heat exchangers, and heavy apparatus shells.',
          image: siteImages.frezarkaMilling,
          imageAlt: 'Precision milling center Chemorozruch',
          role: 'supporting1',
        },
        {
          id: 'malarnia',
          index: '06',
          name: 'Industrial Paint Shop',
          description: 'Application of multi-layer corrosion protection and fireproofing systems under strictly controlled microclimates.',
          image: siteImages.malarniaSpawanie,
          imageAlt: 'Paint shop Chemorozruch',
          role: 'supporting2',
        },
        {
          id: 'zaplecze-spawalnicze',
          index: '07',
          name: 'Welding Facilities',
          description: 'Automated and manual welding stations (TIG, MIG/MAG, SAW) certified by UDT/TÜV with full NDT coverage.',
          image: siteImages.malarniaSpawanie,
          imageAlt: 'Certified welding facilities Chemorozruch',
          role: 'supporting3',
        },
      ],
    },
    process: {
      eyebrow: 'EXECUTION PROCESS',
      heading: 'From project to commissioning.',
      supporting: 'One integrated process. Single-source accountability.',
      hintClick: 'Click a stage to inspect details',
      stages: [
        {
          id: 'analiza',
          index: '01',
          name: 'Analysis',
          description: 'Thorough review of technological assumptions, material metallurgy, and boundary operating parameters.',
        },
        {
          id: 'projekt',
          index: '02',
          name: 'Design',
          description: 'Preparation of comprehensive workshop, mechanical, and isometric engineering tailored to project requirements.',
        },
        {
          id: 'produkcja',
          index: '03',
          name: 'Production',
          description: 'Dedicated shop prefabrication of piping, pressure equipment, and structural steelwork under strict QA standards.',
        },
        {
          id: 'montaz',
          index: '04',
          name: 'Assembly',
          description: 'On-site heavy mechanical erection and certified pipeline welding adhering to highest HSE and SCC** protocols.',
        },
        {
          id: 'kontrola',
          index: '05',
          name: 'Inspection',
          description: 'Rigorous non-destructive testing (NDT), hydrostatic pressure verification, and notified body (UDT/TÜV) inspection.',
        },
        {
          id: 'uruchomienie',
          index: '06',
          name: 'Commissioning',
          description: 'Cold and hot technological start-up, operational loop testing, and handover of turn-key plant systems.',
        },
      ],
    },
    realizations: {
      eyebrow: 'REALIZATIONS',
      heading: 'Projects built to perform for decades.',
      supporting: 'Selected fabrications, assemblies and equipment executed by CHEMOROZRUCH.',
      expandDetails: 'View details +',
      hideDetails: 'Hide details −',
      scopeLabel: 'Scope of work',
      industryLabel: 'Industry',
      locationLabel: 'Location',
      yearLabel: 'Year of completion',
      projects: [],
    },
    certificates: {
      eyebrow: 'QUALITY & STANDARDS',
      heading: 'Certified industrial standards.',
      supporting: 'Quality, safety, and regulatory compliance backed by accredited certifications.',
      trustNote: 'Quality documentation, qualified welding procedures (WPS/WPQR), and comprehensive NDT reports available upon request.',
      prevCertLabel: 'Previous certificate',
      nextCertLabel: 'Next certificate',
      zoomCertLabel: 'Enlarge certificate scan',
      standards: [],
    },
    locations: {
      eyebrow: 'LOCATIONS',
      heading: 'Our Locations',
      supporting: 'Two strategic industrial hubs in Poland — Oświęcim and Płock.',
      hqBadge: 'Headquarters / Main Plant',
      branchBadge: 'Płock Branch',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      addressLabel: 'Address',
      focusLabel: 'Facility Profile & Scope',
      routeBtn: 'Get Directions',
      openMapsBtn: 'Open in Google Maps',
      copyAddressBtn: 'Copy Address',
      copiedLabel: 'Copied!',
      viewOverviewLabel: 'General Overview / Poland',
      branches: [
        {
          id: 'oswiecim',
          city: 'Oświęcim',
          role: 'Headquarters / Main Plant',
          address: 'ul. Unii Europejskiej 10',
          postalCode: '32-600 Oświęcim',
          phone: '+48 33 847 21 00',
          email: 'poczta@chemorozruch.pl',
          coords: { x: 48, y: 82 },
          gpsCoords: { lat: 50.0385, lng: 19.2635 },
          industrialFocus: 'Corporate executive management, main engineering bureau, and extensive multi-bay workshop for process piping and pressure equipment prefabrication.',
          directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Chemorozruch+Oswiecim+ul.+Unii+Europejskiej+10+32-600+Oswiecim',
          googleMapsUrl: 'https://maps.google.com/?q=CHEMOROZRUCH+S.A.,+ul.+Unii+Europejskiej+10,+32-600+Oświęcim',
          embedQuery: 'CHEMOROZRUCH+ul.+Unii+Europejskiej+10,+32-600+Oświęcim',
        },
        {
          id: 'plock',
          city: 'Płock',
          role: 'Płock Branch',
          address: 'ul. Witolda Zglenickiego 50 F',
          postalCode: '09-400 Płock',
          phone: '+48 24 365 24 00',
          email: 'plock@chemorozruch.pl',
          coords: { x: 52, y: 44 },
          gpsCoords: { lat: 52.5935, lng: 19.6820 },
          industrialFocus: 'Operational branch stationed directly within the PKN ORLEN refining and petrochemical complex. Piping prefabrication, field assembly, and turnaround services.',
          directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=ul.+Witolda+Zglenickiego+50+F,+09-400+Plock',
          googleMapsUrl: 'https://maps.google.com/?q=ul.+Witolda+Zglenickiego+50+F,+09-400+Płock',
          embedQuery: 'ul.+Witolda+Zglenickiego+50+F,+09-400+Płock',
        },
      ],
    },
    contactCTA: {
      eyebrow: 'CONTACT',
      heading: 'Let’s talk about your investment.',
      supporting: 'From a single equipment piece to turnkey industrial installations.',
      primaryCtaBtn: 'Submit Inquiry',
      hideFormBtn: 'Collapse Form',
      form: {
        nameLabel: 'Full Name',
        namePlaceholder: 'e.g. John Smith',
        companyLabel: 'Company',
        companyPlaceholder: 'e.g. Industrial Chemicals S.A.',
        emailLabel: 'Email',
        emailPlaceholder: 'john.smith@company.com',
        phoneLabel: 'Phone (optional)',
        phonePlaceholder: '+48 000 000 000',
        messageLabel: 'Message / Project Scope',
        messagePlaceholder: 'Briefly describe your planned project, technical specifications or timeline...',
        rodoConsent: 'I consent to the processing of personal data for the purpose of preparing a technical and commercial offer.',
        submitBtn: 'Submit Inquiry →',
        submitting: 'Submitting...',
        successHeading: 'Thank you. Your message has been sent.',
        successMessage: 'Our engineering team will review the scope and reach out as soon as possible.',
        backBtn: 'Send another message',
      },
      directContact: {
        label: 'Direct Contact',
        hqLabel: 'Headquarters & Fabrication Facility',
        address: 'ul. Unii Europejskiej 10, 32-600 Oświęcim',
        phone: '+48 33 847 21 00',
        email: 'poczta@chemorozruch.pl',
      },
    },
    footer: {
      companyName: 'CHEMOROZRUCH',
      companySub: 'Industrial installations & technologies',
      columns: {
        contactTitle: 'CONTACT',
        hqLabel: 'Headquarters & Fabrication Facility',
        address: 'ul. Unii Europejskiej 10, 32-600 Oświęcim, Poland',
        phone: '+48 33 847 21 00',
        email: 'poczta@chemorozruch.pl',
        navTitle: 'NAVIGATION',
        navLinks: {
          about: 'About Us',
          competencies: 'Offer',
          realizations: 'Realizations',
          certificates: 'Certificates',
          locations: 'Locations',
          contact: 'Contact',
        },
        infoTitle: 'INFORMATION',
        privacy: 'Privacy Policy',
        rodo: 'GDPR Information Clause',
        whistleblower: 'Whistleblowing',
        linkedin: 'LinkedIn',
      },
      copyright: 'CHEMOROZRUCH S.A.',
      allRightsReserved: 'All rights reserved.',
      backToTop: 'Back to top',
    },
    inquiryModal: {
      title: 'Project Inquiry',
      subtitle: 'Contact the Chemorozruch engineering team.',
      nameLabel: 'Full Name / Company',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone Number',
      messageLabel: 'Project Scope / Requirements',
      sendBtn: 'Submit Inquiry',
      successMsg: 'Thank you! Your inquiry has been sent.',
    },
  },
  DE: {
    header: {
      companyName: 'CHEMOROZRUCH',
      companySub: 'Industrieanlagen & Technologien',
      inquiryBtn: 'Anfrage senden',
    },
    hero: {
      headline: 'Wir treiben die Industrie an.',
      supporting: 'Industrieanlagen. Reale Ergebnisse.',
      ctaBtn: 'Möglichkeiten entdecken',
      scrollIndicator: 'Nach unten scrollen',
    },
    numbers: {
      tag: 'CHEMOROZRUCH',
      heading: 'Maßstäbe, die zählen.',
      metrics: [
        {
          id: 'exp',
          value: 55,
          suffix: '+',
          label: 'Jahre Erfahrung',
          sub: 'Technologische Kontinuität seit 1971',
        },
        {
          id: 'specialists',
          value: 100,
          suffix: '+',
          label: 'Spezialisten',
          sub: 'Ingenieure, Monteure und zertifizierte Schweißer',
        },
        {
          id: 'founded',
          value: 1971,
          suffix: '',
          label: 'Gründungsjahr',
          sub: 'Ingenieurtradition und Präzision',
        },
        {
          id: 'welding-tech',
          value: 170,
          suffix: '+',
          label: 'Schweißverfahren',
          sub: 'Qualifizierte WPQR / WPS-Technologien',
        },
      ],
    },
    discovery: {
      tag: 'LEISTUNGSSPEKTRUM',
      heading: 'CHEMOROZRUCH entdecken',
      subheading: 'Industrie von innen.',
      items: [
        {
          id: 'about',
          index: '01',
          title: 'Wer wir sind',
          tagline: 'Generalunternehmung und Industriemontage',
          description:
            'Spezialisiertes Ingenieurunternehmen mit über 50 Jahren Erfahrung im schlüsselfertigen Bau von verfahrenstechnischen Anlagen, Rohrleitungen und Stahlbau.',
          bulletPoints: [
            'Eigenes Ingenieur- und Projektleiterteam',
            'Zertifizierte Qualität nach ISO, UDT und TÜV',
            'Feste Position auf dem europäischen Markt',
          ],
          image: siteImages.discoveryAbout,
          imageAlt: 'Chemorozruch Ingenieure und Betrieb',
        },
        {
          id: 'projects',
          index: '02',
          title: 'Was wir realisieren',
          tagline: 'Rohrleitungen, Apparate, mechanische Montage & Inbetriebnahme',
          description:
            'Montage von Hoch- und Niederdruckrohrleitungen, Druckbehältern, Rohrbrücken, energietechnischen Anlagen sowie technologische Inbetriebnahmen.',
          bulletPoints: [
            'Dampf-, Gas- und Medienrohrleitungen',
            'Montage von Kolonnen und Reaktoren',
            'Vorfertigung und Druckprüfungen',
          ],
          image: siteImages.discoveryProjects,
          imageAlt: 'Industrierohrleitungen und Träger',
        },
        {
          id: 'industries',
          index: '03',
          title: 'Für welche Branchen',
          tagline: 'Chemie, Petrochemie, Energie, Metallurgie und Industrie',
          description:
            'Wir liefern spezialisierte Lösungen für Chemieanlagen, Raffinerien, Kraftwerke, Papierindustrie, Metallurgie und Umwelttechnik.',
          bulletPoints: [
            'Chemie- und Düngemittelindustrie',
            'Kraftwerke und Heizkraftwerke',
            'Raffinerie- und Gasanlagen',
          ],
          image: siteImages.discoveryIndustries,
          imageAlt: 'Chemie- und Energieanlagen',
        },
        {
          id: 'capabilities',
          index: '04',
          title: 'Unsere Kapazitäten',
          tagline: 'Eigener Maschinenpark, Vorfertigungshallen und Zertifikate',
          description:
            'Moderne Fertigungshallen für Rohrleitungen und Konstruktionen, Schweißtechnik, mobile NDT-Prüflabore und umfangreiche Zulassungen.',
          bulletPoints: [
            'Leistungsstarke Vorfertigungshallen',
            'Automatisierte Schweißverfahren (WIG, MIG/MAG, UP)',
            'Vollständige ZfP-Qualitätskontrolle',
          ],
          image: siteImages.discoveryCapabilities,
          imageAlt: 'Vorfertigungshalle und Maschinenpark',
        },
      ],
    },
    competencies: {
      tag: 'UNSERE KOMPETENZEN',
      heading: 'Ganzheitlich für die Industrie.',
      subheading: 'Vom einzelnen Spezialapparat bis zur schlüsselfertigen Gesamtanlage.',
      expandScopeBtn: 'Leistungsumfang aufklappen +',
      collapseScopeBtn: 'Leistungsumfang zuklappen −',
      scopeLabel: 'Wesentlicher Leistungsumfang:',
      inquiryBtn: 'Anfrage zu dieser Kompetenz',
      items: [
        {
          id: 'apparatus',
          index: '01',
          name: 'Industrieapparate',
          shortDesc: 'Fertigung, Montage und Überholung von Rohrbündelwärmetauschern, Rektifikationskolonnen, Reaktoren und Druckbehältern.',
          scope: [
            'Rohrbündelwärmetauscher und Kondensatoren',
            'Rektifikations- und Absorptionskolonnen',
            'Chemische Reaktoren und Druckbehälter',
            'Rohrbündelwechsel und Behältereinbauten',
            'Druckproben und ZfP-Prüfungen unter UDT / TÜV Aufsicht',
          ],
          image: siteImages.aparatyApparatus,
          imageAlt: 'Industrieapparate und Wärmetauscher Chemorozruch',
          specs: [
            { label: 'Betriebsdruck', value: 'Bis 320 bar' },
            { label: 'Temperaturbereich', value: '-40°C bis +650°C' },
            { label: 'Werkstoffe', value: 'C-Stähle, Edelstahl, Duplex & Sonderlegierungen' },
          ],
        },
        {
          id: 'pipelines',
          index: '02',
          name: 'Technologische Rohrleitungen',
          shortDesc: 'Vorfertigung, Montage und Modernisierung anspruchsvoller Rohrleitungssysteme für aggressive und hochgespannte Medien.',
          scope: [
            'Hochdruck-Dampf-, Gas- und Medienrohrleitungen',
            'Werksmäßige Vorfertigung von Rohrleitungsteilen',
            'Montage auf Rohrbrücken und in Produktionsgebäuden',
            'Zertifiziertes WIG-, MAG-, E-Hand- und Orbitalschweißen',
            'Druckprüfungen, chemische Spülung und Passivierung',
          ],
          image: siteImages.rurociagiPipes,
          imageAlt: 'Industrierohrleitungen und Verteilersysteme Chemorozruch',
          specs: [
            { label: 'Nennweiten', value: 'DN15 bis DN2400' },
            { label: 'Normen', value: 'EN 13480, ASME B31.3' },
            { label: 'Abnahme', value: 'UDT, TÜV, Lloyd’s' },
          ],
        },
        {
          id: 'modernization',
          index: '03',
          name: 'Instandhaltung & Modernisierung',
          shortDesc: 'Geplante Stillstandsrevisionen, Betriebsüberholungen, Leistungswiederherstellung und technologische Erneuerung.',
          scope: [
            'Komplettmanagement von Großstillständen (Turnarounds)',
            'Austausch verschlissener Rohrleitungsknoten und Apparate',
            'Behälterinnenprüfungen und Vorbereitung für ZÜS / TÜV',
            'Präzise Laserausrichtung von Maschinen und Pumpen',
            '24/7 Störungsdienst und Notfalleinsätze',
          ],
          image: siteImages.remontyOverhaul,
          imageAlt: 'Industrieinstandhaltung und Stillstandsrevisionen Chemorozruch',
          specs: [
            { label: 'Einsatzgebiet', value: 'Polen und gesamte EU' },
            { label: 'Verfügbarkeit', value: 'Mobile Spezialeinheiten' },
            { label: 'HSE', value: 'SCC** / ISO 45001 zertifiziert' },
          ],
        },
        {
          id: 'valves',
          index: '04',
          name: 'Industriearmaturen',
          shortDesc: 'Lieferung, Instandsetzung, Montage und Prüfung von Regel-, Absperr- und Sicherheitsventilen für Höchstdrücke.',
          scope: [
            'Montage und Aufarbeitung von Hochdruckarmaturen',
            'Läppen von Dichtflächen und Packungstausch vor Ort',
            'Einstellung und Prüfung von Sicherheitsventilen unter Aufsicht',
            'Montage und Justage pneumatischer und elektrischer Antriebe',
            'Dichtheitsprüfungen nach DIN EN 12266',
          ],
          image: siteImages.armaturaValves,
          imageAlt: 'Industriearmaturen und Hochdruckventile Chemorozruch',
          specs: [
            { label: 'Druckstufen', value: 'PN16 - PN400 / Class 150-2500' },
            { label: 'Nennweiten', value: 'DN10 bis DN1200' },
            { label: 'Prüfstände', value: 'Mobile Prüf- und Eichstände' },
          ],
        },
        {
          id: 'epc',
          index: '05',
          name: 'EPC Generalunternehmung',
          shortDesc: 'Schlüsselfertige Komplettabwicklung industrieller Investitionsprojekte im Design-and-Build-Verfahren.',
          scope: [
            'Generalunternehmung und Projektleitung (EPC/EPCM)',
            'Fachübergreifende Koordination von Mechanik, EMSR und Bau',
            'Terminplanung und Investitionskostenoptimierung',
            'Kalt- und Heißinbetriebnahme der Gesamtanlage',
            'Vollständige Bestandsdokumentation und Behördenabnahmen',
          ],
          image: siteImages.epcTurnkey,
          imageAlt: 'EPC Industrieanlagenbau und Turnkey Chemorozruch',
          specs: [
            { label: 'Projektabwicklung', value: 'Turnkey / EPC / Generalunternehmer' },
            { label: 'Koordination', value: '3D BIM / 3D Laserscanning' },
            { label: 'Gewährleistung', value: 'Volle Prozessfunktionsgarantie' },
          ],
        },
        {
          id: 'steel',
          index: '06',
          name: 'Stahlbau & Rohrbrücken',
          shortDesc: 'Vorfertigung und Errichtung schwerer Tragwerke, Rohrbrücken, Bedienbühnen und industrieller Stahlhallen.',
          scope: [
            'Schwere Rohrleitungsbrücken und Überführungen',
            'Unterstützungskonstruktionen für Reaktoren und Kolonnen',
            'Wartungsbühnen, Treppentürme und Laufstege',
            'Feuerverzinkung und mehrschichtiger Industriekorrosionsschutz',
            'Schwerkranmontage vor Ort',
          ],
          image: siteImages.stalStructures,
          imageAlt: 'Schwerer Stahlbau und Rohrbrücken Chemorozruch',
          specs: [
            { label: 'Herstellnorm', value: 'EN 1090-2 (Ausführungsklasse EXC3)' },
            { label: 'Fertigungskapazität', value: 'Bis 350 Tonnen / Monat' },
            { label: 'Korrosionsschutz', value: 'Klassen C3 bis CX nach ISO 12944' },
          ],
        },
      ],
    },
    facilities: {
      eyebrow: 'TECHNOLOGISCHE INFRASTRUKTUR',
      headingLine1: 'Eigene Kapazitäten.',
      headingLine2: 'Volle Kontrolle über die Umsetzung.',
      supporting: 'Fertigung, Vorfertigung und Bearbeitung auf Basis unseres eigenen technologischen Maschinenparks.',
      items: [
        {
          id: 'komora-srutownicza',
          index: '01',
          name: 'Strahlkabine & Oberflächentechnik',
          description: 'Oberflächenvorbereitung von Stahlbauteilen und Rohrleitungen vor der Beschichtung bis Reinheitsgrad Sa 2.5.',
          image: siteImages.srutownicaBlasting,
          imageAlt: 'Strahlkabine Chemorozruch',
          role: 'supporting1',
        },
        {
          id: 'wypalarka-plazmowa',
          index: '02',
          name: 'CNC-Plasmaschneidanlage',
          description: 'Präziser thermischer Zuschnitt und automatisiertes Schweißkantenfasen für Grobbleche mit CNC-Steuerung.',
          image: siteImages.plazmaPlasma,
          imageAlt: 'Plasmaschneidanlage Chemorozruch',
          role: 'supporting2',
        },
        {
          id: 'gietarka',
          index: '03',
          name: 'Hydraulische Walzenrundbiegemaschine',
          description: 'Runden von Zylinderschüssen für Druckbehälter und Großrohre auf 4-Walzen-Biegemaschinen.',
          image: siteImages.gietarkaBending,
          imageAlt: 'Walzenrundbiegemaschine Chemorozruch',
          role: 'supporting3',
        },
        {
          id: 'hala-produkcyjna',
          index: '04',
          name: 'Produktions- & Montagehallen',
          description: '8.500 m² überdachte Fertigungsfläche mit bis zu 50 t Kranleistung und separatem Edelstahlbereich.',
          image: siteImages.zapleczeHall,
          imageAlt: 'Produktionshalle Chemorozruch',
          role: 'dominant',
        },
        {
          id: 'wiertarko-frezarka',
          index: '05',
          name: 'Bohr- & Fräszentrum',
          description: 'Präzise spanabhebende Bearbeitung von Flanschen, Rohrböden für Wärmetauscher und Behälterschüssen.',
          image: siteImages.frezarkaMilling,
          imageAlt: 'Fräsbearbeitung Chemorozruch',
          role: 'supporting1',
        },
        {
          id: 'malarnia',
          index: '06',
          name: 'Industrielackiererei',
          description: 'Aufbringen mehrschichtiger Korrosionsschutz- und Brandschutzbeschichtungen unter kontrolliertem Raumklima.',
          image: siteImages.malarniaSpawanie,
          imageAlt: 'Industrielackiererei Chemorozruch',
          role: 'supporting2',
        },
        {
          id: 'zaplecze-spawalnicze',
          index: '07',
          name: 'Schweißtechnik & Stationen',
          description: 'Automatisierte und manuelle Schweißstationen (WIG, MAG, UP) mit UDT/TÜV-Zertifizierung und ZfP-Prüfungen.',
          image: siteImages.malarniaSpawanie,
          imageAlt: 'Schweißstationen Chemorozruch',
          role: 'supporting3',
        },
      ],
    },
    process: {
      eyebrow: 'ABWICKLUNGSPROZESS',
      heading: 'Von der Planung bis zur Inbetriebnahme.',
      supporting: 'Ein durchgängiger Prozess. Eine Verantwortung.',
      hintClick: 'Klicken Sie auf eine Phase für Details',
      stages: [
        {
          id: 'analiza',
          index: '01',
          name: 'Analyse',
          description: 'Detaillierte Prüfung verfahrenstechnischer Grundlagen, Materialgüten und technischer Randbedingungen.',
        },
        {
          id: 'projekt',
          index: '02',
          name: 'Planung',
          description: 'Erstellung werkstattreifer Ausführungs- und Fertigungsunterlagen nach internationalen Regelwerken.',
        },
        {
          id: 'produkcja',
          index: '03',
          name: 'Fertigung',
          description: 'Präzise Vorfertigung von Rohrleitungsspools, Apparaten und Stahlbau in eigenen Fertigungshallen.',
        },
        {
          id: 'montaz',
          index: '04',
          name: 'Montage',
          description: 'Fachgerechte mechanische Baustellenmontage und Schweißarbeiten unter strengsten Sicherheitsstandards.',
        },
        {
          id: 'kontrola',
          index: '05',
          name: 'Qualitätsprüfung',
          description: 'Lückenlose ZfP-Prüfungen (NDT), hydrostatische Drucktests und Abnahmen unter Aufsicht von Benannten Stellen.',
        },
        {
          id: 'uruchomienie',
          index: '06',
          name: 'Inbetriebnahme',
          description: 'Kalt- und Heißinbetriebnahme, Funktionsprobelauf und schlüsselfertige Übergabe an den Betreiber.',
        },
      ],
    },
    realizations: {
      eyebrow: 'REFERENZPROJEKTE',
      heading: 'Projekte, die über Jahrzehnte verlässlich arbeiten.',
      supporting: 'Ausgewählte Fertigungen und Montagen von CHEMOROZRUCH.',
      expandDetails: 'Details ansehen +',
      hideDetails: 'Details schließen −',
      scopeLabel: 'Leistungsumfang',
      industryLabel: 'Branche',
      locationLabel: 'Standort',
      yearLabel: 'Ausführungsjahr',
      projects: [],
    },
    certificates: {
      eyebrow: 'QUALITÄT & STANDARDS',
      heading: 'Zertifizierte Industriestandards.',
      supporting: 'Qualität, Sicherheit und Konformität durch anerkannte Branchenzertifizierungen bestätigt.',
      trustNote: 'Qualitätsdokumentation, qualifizierte Schweißverfahren (WPS/WPQR) und vollständige ZfP-Prüfberichte auf Anfrage verfügbar.',
      prevCertLabel: 'Vorheriges Zertifikat',
      nextCertLabel: 'Nächstes Zertifikat',
      zoomCertLabel: 'Zertifikatsscan vergrößern',
      standards: [],
    },
    locations: {
      eyebrow: 'STANDORTE',
      heading: 'Unsere Standorte',
      supporting: 'Zwei strategische Industriezentren in Polen — Oświęcim und Płock.',
      hqBadge: 'Hauptsitz / Werk',
      branchBadge: 'Niederlassung Płock',
      phoneLabel: 'Telefon',
      emailLabel: 'E-Mail',
      addressLabel: 'Adresse',
      focusLabel: 'Standortprofil & Kernkompetenzen',
      routeBtn: 'Route berechnen',
      openMapsBtn: 'In Google Maps öffnen',
      copyAddressBtn: 'Adresse kopieren',
      copiedLabel: 'Kopiert!',
      viewOverviewLabel: 'Gesamtübersicht / Polen',
      branches: [
        {
          id: 'oswiecim',
          city: 'Oświęcim',
          role: 'Hauptsitz / Werk',
          address: 'ul. Unii Europejskiej 10',
          postalCode: '32-600 Oświęcim',
          phone: '+48 33 847 21 00',
          email: 'poczta@chemorozruch.pl',
          coords: { x: 48, y: 82 },
          gpsCoords: { lat: 50.0385, lng: 19.2635 },
          industrialFocus: 'Unternehmensleitung, zentrales Ingenieurbüro und mehrschiffiger Vorfertigungskomplex für Prozessrohrleitungen und Druckapparatebau.',
          directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Chemorozruch+Oswiecim+ul.+Unii+Europejskiej+10+32-600+Oswiecim',
          googleMapsUrl: 'https://maps.google.com/?q=CHEMOROZRUCH+S.A.,+ul.+Unii+Europejskiej+10,+32-600+Oświęcim',
          embedQuery: 'CHEMOROZRUCH+ul.+Unii+Europejskiej+10,+32-600+Oświęcim',
        },
        {
          id: 'plock',
          city: 'Płock',
          role: 'Niederlassung Płock',
          address: 'ul. Witolda Zglenickiego 50 F',
          postalCode: '09-400 Płock',
          phone: '+48 24 365 24 00',
          email: 'plock@chemorozruch.pl',
          coords: { x: 52, y: 44 },
          gpsCoords: { lat: 52.5935, lng: 19.6820 },
          industrialFocus: 'Operative Niederlassung direkt auf dem Gelände des Raffinerie- und Petrochemiekomplexes PKN ORLEN. Rohrleitungsvorfertigung, Montage und Großstillstände.',
          directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=ul.+Witolda+Zglenickiego+50+F,+09-400+Plock',
          googleMapsUrl: 'https://maps.google.com/?q=ul.+Witolda+Zglenickiego+50+F,+09-400+Płock',
          embedQuery: 'ul.+Witolda+Zglenickiego+50+F,+09-400+Płock',
        },
      ],
    },
    contactCTA: {
      eyebrow: 'KONTAKT',
      heading: 'Lassen Sie uns über Ihre Investition sprechen.',
      supporting: 'Von einzelnen Komponenten bis zur schlüsselfertigen Industrieanlage.',
      primaryCtaBtn: 'Anfrage senden',
      hideFormBtn: 'Formular schließen',
      form: {
        nameLabel: 'Vor- und Nachname',
        namePlaceholder: 'z.B. Max Mustermann',
        companyLabel: 'Unternehmen',
        companyPlaceholder: 'z.B. Chemieanlagen AG',
        emailLabel: 'E-Mail',
        emailPlaceholder: 'max.mustermann@firma.de',
        phoneLabel: 'Telefon (optional)',
        phonePlaceholder: '+48 000 000 000',
        messageLabel: 'Nachricht / Projektumfang',
        messagePlaceholder: 'Beschreiben Sie kurz das geplante Vorhaben, technische Parameter oder Zeitpläne...',
        rodoConsent: 'Ich stimme der Verarbeitung personenbezogener Daten zur Angebotserstellung zu.',
        submitBtn: 'Anfrage senden →',
        submitting: 'Wird gesendet...',
        successHeading: 'Vielen Dank. Ihre Nachricht wurde gesendet.',
        successMessage: 'Unser Ingenieurteam wird die Anforderungen analysieren und sich zeitnah bei Ihnen melden.',
        backBtn: 'Weitere Nachricht senden',
      },
      directContact: {
        label: 'Direkter Kontakt',
        hqLabel: 'Hauptsitz & Fertigungswerk',
        address: 'ul. Unii Europejskiej 10, 32-600 Oświęcim',
        phone: '+48 33 847 21 00',
        email: 'poczta@chemorozruch.pl',
      },
    },
    footer: {
      companyName: 'CHEMOROZRUCH',
      companySub: 'Industrieanlagen & Technologien',
      columns: {
        contactTitle: 'KONTAKT',
        hqLabel: 'Hauptsitz & Fertigungswerk',
        address: 'ul. Unii Europejskiej 10, 32-600 Oświęcim, Polen',
        phone: '+48 33 847 21 00',
        email: 'poczta@chemorozruch.pl',
        navTitle: 'NAVIGATION',
        navLinks: {
          about: 'Über uns',
          competencies: 'Angebot',
          realizations: 'Referenzen',
          certificates: 'Zertifikate',
          locations: 'Standorte',
          contact: 'Kontakt',
        },
        infoTitle: 'INFORMATIONEN',
        privacy: 'Datenschutzerklärung',
        rodo: 'DSGVO-Klausel',
        whistleblower: 'Hinweisgebersystem',
        linkedin: 'LinkedIn',
      },
      copyright: 'CHEMOROZRUCH S.A.',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      backToTop: 'Nach oben',
    },
    inquiryModal: {
      title: 'Projektanfrage',
      subtitle: 'Kontaktieren Sie das Ingenieurteam von Chemorozruch.',
      nameLabel: 'Name / Unternehmen',
      emailLabel: 'E-Mail-Adresse',
      phoneLabel: 'Telefonnummer',
      messageLabel: 'Projektumfang / Spezifikation',
      sendBtn: 'Anfrage absenden',
      successMsg: 'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.',
    },
  },
  UA: {
      header: {
        companyName: 'CHEMOROZRUCH',
        companySub: 'Промислові установки та технології',
        inquiryBtn: 'Надіслати запит',
      },
      hero: {
        headline: 'Рухаємо промисловість.',
        supporting: 'Промислові установки. Реальні результати.',
        ctaBtn: 'Дізнатися про можливості',
        scrollIndicator: 'Прокрутіть вниз',
      },
      numbers: {
        tag: 'CHEMOROZRUCH',
        heading: 'Масштаб, який має значення.',
        metrics: [
          {
            id: 'exp',
            value: 55,
            suffix: '+',
            label: 'років досвіду',
            sub: 'Технологічна наступність та інженерія',
          },
          {
            id: 'specialists',
            value: 100,
            suffix: '+',
            label: 'фахівців',
            sub: 'Інженери, монтажники та сертифіковані зварювальники',
          },
          {
            id: 'founded',
            value: 1971,
            suffix: '',
            label: 'рік заснування',
            sub: 'Традиції інженерної точності',
          },
          {
            id: 'welding-tech',
            value: 170,
            suffix: '+',
            label: 'технологій зварювання',
            sub: 'Кваліфіковані технології WPQR / WPS',
          },
        ],
      },
      discovery: {
        tag: 'ОГЛЯД ПОТЕНЦІАЛУ',
        heading: 'Відкрийте CHEMOROZRUCH',
        subheading: 'Промисловість зсередини.',
        items: [
          {
            id: 'about',
            index: '01',
            title: 'Хто ми є',
            tagline: 'Генеральний підряд та промисловий монтаж',
            description:
              'Спеціалізоване інженерне підприємство з понад 50-річним досвідом реалізації комплексних технологічних установок, трубопроводів та металоконструкцій.',
            bulletPoints: [
              'Власний інженерний та керівний персонал',
              'Сертифікати якості ISO, UDT та TÜV',
              'Стабільна присутність на європейському ринку',
            ],
            image: siteImages.discoveryAbout,
            imageAlt: 'Інженерна команда Chemorozruch',
          },
          {
            id: 'projects',
            index: '02',
            title: 'Що ми реалізуємо',
            tagline: 'Трубопроводи, апарати, монтаж та пусконалагодження',
            description:
              'Монтаж промислових трубопроводів високого та низького тиску, ємностей, трубних естакад, енергетичних установок та комплексний пуск.',
            bulletPoints: [
              'Трубопроводи пари, газів та агресивних середовищ',
              'Монтаж ректифікаційних колон та реакторів',
              'Цехова префабрикація та гідравлічні випробування',
            ],
            image: siteImages.discoveryProjects,
            imageAlt: 'Технологічні трубопроводи та естакади',
          },
          {
            id: 'industries',
            index: '03',
            title: 'Для яких галузей',
            tagline: 'Хімія, нафтохімія, енергетика, металургія та промисловість',
            description:
              'Надаємо інженерні послуги для хімічної промисловості, НПЗ, енергетики, металургії, паперової промисловості та екологічних комплексів.',
            bulletPoints: [
              'Хімічна та добривна промисловість',
              'Енергетика та ТЕЦ',
              'Нафтопереробні та газові комплекси',
            ],
            image: siteImages.discoveryIndustries,
            imageAlt: 'Хімічні та енергетичні комплекси',
          },
          {
            id: 'capabilities',
            index: '04',
            title: 'Наші можливості',
            tagline: 'Власний парк верстатів, цехи префабрикації та сертифікація',
            description:
              'Сучасні цехи префабрикації трубопроводів і конструкцій, зварювальне обладнання, мобільні лабораторії NDT та сертифікати UDT і TÜV.',
            bulletPoints: [
              'Високопродуктивні цехи префабрикації',
              'Автоматизовані методи зварювання (TIG, MIG/MAG, SAW)',
              'Повний контроль якості зварних з’єднань NDT',
            ],
            image: siteImages.discoveryCapabilities,
            imageAlt: 'Цех префабрикації трубопроводів',
          },
        ],
      },
      competencies: {
        tag: 'НАШІ КОМПЕТЕНЦІЇ',
        heading: 'Комплексно для промисловості.',
        subheading: 'Від окремого апарату до комплексної реалізації установки «під ключ».',
        expandScopeBtn: 'Розгорнути обсяг +',
        collapseScopeBtn: 'Згорнути обсяг −',
        scopeLabel: 'Ключовий обсяг робіт:',
        inquiryBtn: 'Запитати про цю компетенцію',
        items: [
          {
            id: 'apparatus',
            index: '01',
            name: 'Промислові апарати',
            shortDesc: 'Виготовлення, монтаж та модернізація кожухотрубних теплообмінників, ректифікаційних колон, реакторів та посудин під тиском.',
            scope: [
              'Кожухотрубні теплообмінники та конденсатори',
              'Ректифікаційні та абсорбційні колони',
              'Хімічні реактори та ємності під тиском',
              'Заміна трубних пучків та внутрішніх елементів',
              'Гідравлічні випробування та NDT під наглядом UDT/TÜV',
            ],
            image: siteImages.aparatyApparatus,
            imageAlt: 'Промислові апарати та теплообмінники Chemorozruch',
            specs: [
              { label: 'Робочий тиск', value: 'до 320 бар' },
              { label: 'Температура', value: 'від -40°C до +650°C' },
              { label: 'Матеріали', value: 'Вуглецеві, нержавіючі сталі, дуплекс' },
            ],
          },
          {
            id: 'pipelines',
            index: '02',
            name: 'Технологічні трубопроводи',
            shortDesc: 'Префабрикація, монтаж та модернізація складних систем трубопроводів для важких промислових процесів.',
            scope: [
              'Трубопроводи пари, газів та агресивних рідин',
              'Цехова префабрикація трубних вузлів',
              'Монтаж на естакадах та в будівлях',
              'Зварювання методами TIG, MAG, MMA та орбітальним',
              'Випробування під тиском, хімічна промивка та пасивація',
            ],
            image: siteImages.rurociagiPipes,
            imageAlt: 'Технологічні трубопроводи Chemorozruch',
            specs: [
              { label: 'Діаметри', value: 'DN15 до DN2400' },
              { label: 'Стандарти', value: 'EN 13480, ASME B31.3' },
              { label: 'Нагляд', value: 'UDT, TÜV, Lloyd’s' },
            ],
          },
          {
            id: 'modernization',
            index: '03',
            name: 'Ремонти та модернізація',
            shortDesc: 'Планові зупиночні ремонти, технічні ревізії, відновлення робочих параметрів та модернізація ліній.',
            scope: [
              'Комплексний супровід зупиночних ремонтів (Turnarounds)',
              'Заміна зношених вузлів трубопроводів та апаратури',
              'Внутрішні ревізії та підготовка до експертиз',
              'Прецизійне лазерне центрування насосів та машин',
              'Швидке реагування та аварійні бригади 24/7',
            ],
            image: siteImages.remontyOverhaul,
            imageAlt: 'Ремонти промислових установок Chemorozruch',
            specs: [
              { label: 'Мобільність', value: 'Вся Польща та ЄС' },
              { label: 'Готовність', value: 'Мобільні інженерні бригади' },
              { label: 'Охорона праці', value: 'Стандарти SCC** / ISO 45001' },
            ],
          },
          {
            id: 'valves',
            index: '04',
            name: 'Промислова арматура',
            shortDesc: 'Поставка, регенерація, монтаж та випробування регулювальної, запірної та запобіжної арматури.',
            scope: [
              'Монтаж та відновлення високонапірної арматури',
              'Притирання сідел та заміна ущільнень на місці',
              'Налаштування та випробування запобіжних клапанів',
              'Монтаж та калібрування приводів і позиціонерів',
              'Випробування на герметичність за DIN EN 12266',
            ],
            image: siteImages.armaturaValves,
            imageAlt: 'Промислова арматура Chemorozruch',
            specs: [
              { label: 'Класи тиску', value: 'PN16 - PN400 / Class 150-2500' },
              { label: 'Діапазон DN', value: 'DN10 до DN1200' },
              { label: 'Випробування', value: 'Мобільні стенди перевірки' },
            ],
          },
          {
            id: 'epc',
            index: '05',
            name: 'Реалізації EPC («під ключ»)',
            shortDesc: 'Комплексна реалізація капітальних промислових інвестицій у форматі «проектуй та будуй».',
            scope: [
              'Генеральний підряд та управління проектами (EPC/EPCM)',
              'Міждисциплінарна координація механіки, КВПіА та будівництва',
              'Календарне планування та оптимізація витрат',
              'Холодне та гаряче технологічне пусконалагодження',
              'Повна виконавча документація та введення в експлуатацію',
            ],
            image: siteImages.epcTurnkey,
            imageAlt: 'EPC промислове будівництво Chemorozruch',
            specs: [
              { label: 'Модель', value: 'Turnkey / EPC / Генпідряд' },
              { label: 'Координація', value: '3D BIM / 3D Laser Scanning' },
              { label: 'Гарантія', value: 'Повна гарантія робочих параметрів' },
            ],
          },
          {
            id: 'steel',
            index: '06',
            name: 'Металоконструкції',
            shortDesc: 'Префабрикація та монтаж важких опорних металоконструкцій, трубних естакад та майданчиків обслуговування.',
            scope: [
              'Трубопровідні естакади та переходи великих прольотів',
              'Опорні конструкції реакторів, колон та циклонів',
              'Майданчики обслуговування, сходи та переходи',
              'Гаряче цинкування та багатошарові системи захисту',
              'Монтаж з використанням важких автокранів',
            ],
            image: siteImages.stalStructures,
            imageAlt: 'Металоконструкції та естакади Chemorozruch',
            specs: [
              { label: 'Стандарт', value: 'EN 1090-2 (клас EXC3)' },
              { label: 'Продуктивність', value: 'до 350 тонн / місяць' },
              { label: 'Антикорозія', value: 'Категорії C3 - CX за ISO 12944' },
            ],
          },
        ],
      },
      facilities: {
        eyebrow: 'ТЕХНОЛОГІЧНА БАЗА',
        headingLine1: 'Власні можливості.',
        headingLine2: 'Повний контроль над реалізацією.',
        supporting: 'Виробництво, префабрикація та обробка реалізуються на базі власного виробничого комплексу.',
        items: [
          {
            id: 'komora-srutownicza',
            index: '01',
            name: 'Дробоструминна камера',
            description: 'Підготовка поверхні сталевих елементів перед нанесенням захисних покриттів до ступеня чистоти Sa 2.5.',
            image: siteImages.srutownicaBlasting,
            imageAlt: 'Дробоструминна камера Chemorozruch',
            role: 'supporting1',
          },
          {
            id: 'wypalarka-plazmowa',
            index: '02',
            name: 'Плазмова різка з ЧПК',
            description: 'Високоточний термічний розкрій та автоматизоване зняття фасок товстолистового прокату.',
            image: siteImages.plazmaPlasma,
            imageAlt: 'Верстат плазмової різки з ЧПК Chemorozruch',
            role: 'supporting2',
          },
          {
            id: 'gietarka',
            index: '03',
            name: 'Листозгинальні вальці',
            description: 'Вальцювання обичайок ємностей під тиском та великих трубопроводів на 4-валкових гідравлічних вальцях.',
            image: siteImages.gietarkaBending,
            imageAlt: 'Гідравлічні вальці Chemorozruch',
            role: 'supporting3',
          },
          {
            id: 'hala-produkcyjna',
            index: '04',
            name: 'Виробничі цехи та монтаж',
            description: 'Виробничий комплекс площею 8 500 м² з мостовими кранами вантажопідйомністю до 50 тонн.',
            image: siteImages.zapleczeHall,
            imageAlt: 'Головний цех Chemorozruch',
            role: 'dominant',
          },
          {
            id: 'wiertarko-frezarka',
            index: '05',
            name: 'Свердлильно-фрезерний центр',
            description: 'Точна механічна обробка фланців, трубних решіток теплообмінників та корпусів апаратів.',
            image: siteImages.frezarkaMilling,
            imageAlt: 'Фрезерна обробка Chemorozruch',
            role: 'supporting1',
          },
          {
            id: 'malarnia',
            index: '06',
            name: 'Фарбувальний цех',
            description: 'Нанесення багатошарових антикорозійних та вогнезахисних систем у контрольованих кліматичних умовах.',
            image: siteImages.malarniaSpawanie,
            imageAlt: 'Фарбувальна камера Chemorozruch',
            role: 'supporting2',
          },
          {
            id: 'zaplecze-spawalnicze',
            index: '07',
            name: 'Зварювальний комплекс',
            description: 'Автоматизовані та ручні пости зварювання (TIG, MIG/MAG, SAW) з сертифікацією UDT/TÜV та NDT.',
            image: siteImages.malarniaSpawanie,
            imageAlt: 'Зварювальні пости Chemorozruch',
            role: 'supporting3',
          },
        ],
      },
      process: {
        eyebrow: 'ПРОЦЕС РЕАЛІЗАЦІЇ',
        heading: 'Від проєктування до пуску.',
        supporting: 'Один процес. Єдина відповідальність.',
        hintClick: 'Натисніть на етап для деталей',
        stages: [
          {
            id: 'analiza',
            index: '01',
            name: 'Аналіз',
            description: 'Детальна перевірка технологічних вимог, специфікації матеріалів та граничних параметрів установки.',
          },
          {
            id: 'projekt',
            index: '02',
            name: 'Проєкт',
            description: 'Розробка робочої та технологічної документації з урахуванням специфіки конкретного об’єкта.',
          },
          {
            id: 'produkcja',
            index: '03',
            name: 'Виробництво',
            description: 'Префабрикація трубопроводів, апаратів та металоконструкцій у власних цехах із суворим контролем якості.',
          },
          {
            id: 'montaz',
            index: '04',
            name: 'Монтаж',
            description: 'Точний механічний монтаж та зварювання безпосередньо на промисловому об’єкті за стандартами безпеки.',
          },
          {
            id: 'kontrola',
            index: '05',
            name: 'Контроль',
            description: 'Комплексний неруйнівний контроль (NDT), гідравлічні випробування та прийомка під наглядом UDT/TÜV.',
          },
          {
            id: 'uruchomienie',
            index: '06',
            name: 'Пуск',
            description: 'Холодний і гарячий пусконалагоджувальний процес, комплексні випробування та передача в експлуатацію.',
          },
        ],
      },
      realizations: {
        eyebrow: 'РЕАЛІЗОВАНІ ПРОЄКТИ',
        heading: 'Проєкти, що бездоганно працюють роками.',
        supporting: 'Вибрані виготовлені елементи та реалізації CHEMOROZRUCH.',
        expandDetails: 'Деталі проєкту +',
        hideDetails: 'Згорнути деталі −',
        scopeLabel: 'Обсяг робіт',
        industryLabel: 'Галузь',
        locationLabel: 'Локація',
        yearLabel: 'Рік реалізації',
        projects: [],
      },
      certificates: {
        eyebrow: 'ЯКІСТЬ ТА СТАНДАРТИ',
        heading: 'Підтверджено стандартами.',
        supporting: 'Якість, безпека та відповідність нормам підтверджені галузевими сертифікатами.',
        trustNote: 'Якісна документація, кваліфіковані процедури зварювання (WPS/WPQR) та повні звіти NDT контролю надаються за запитом.',
        prevCertLabel: 'Попередній сертифікат',
        nextCertLabel: 'Наступний сертифікат',
        zoomCertLabel: 'Збільшити скан документа',
        standards: [],
      },
      locations: {
        eyebrow: 'ЛОКАЦІЇ',
        heading: 'Наші локації',
        supporting: 'Два стратегічні промислові центри в Польщі — Освенцим та Плоцьк.',
        hqBadge: 'Головний офіс / Завод',
        branchBadge: 'Відділення Плоцьк',
        phoneLabel: 'Телефон',
        emailLabel: 'Email',
        addressLabel: 'Адреса',
        focusLabel: 'Профіль та виробничі потужності',
        routeBtn: 'Прокласти маршрут',
        openMapsBtn: 'Відкрити в Google Maps',
        copyAddressBtn: 'Скопіювати адресу',
        copiedLabel: 'Скопійовано!',
        viewOverviewLabel: 'Загальний огляд / Польща',
        branches: [
          {
            id: 'oswiecim',
            city: 'Освенцим',
            role: 'Головний офіс / Завод',
            address: 'ul. Unii Europejskiej 10',
            postalCode: '32-600 Oświęcim',
            phone: '+48 33 847 21 00',
            email: 'poczta@chemorozruch.pl',
            coords: { x: 48, y: 82 },
            gpsCoords: { lat: 50.0385, lng: 19.2635 },
            industrialFocus: 'Керівництво компанії, центральне інженерне бюро та багатопролітний виробничий комплекс префабрикації технологічних трубопроводів і хімічних апаратів.',
            directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Chemorozruch+Oswiecim+ul.+Unii+Europejskiej+10+32-600+Oswiecim',
            googleMapsUrl: 'https://maps.google.com/?q=CHEMOROZRUCH+S.A.,+ul.+Unii+Europejskiej+10,+32-600+Oświęcim',
            embedQuery: 'CHEMOROZRUCH+ul.+Unii+Europejskiej+10,+32-600+Oświęcim',
          },
          {
            id: 'plock',
            city: 'Плоцьк',
            role: 'Відділення Плоцьк',
            address: 'ul. Witolda Zglenickiego 50 F',
            postalCode: '09-400 Płock',
            phone: '+48 24 365 24 00',
            email: 'plock@chemorozruch.pl',
            coords: { x: 52, y: 44 },
            gpsCoords: { lat: 52.5935, lng: 19.6820 },
            industrialFocus: 'Виробничо-монтажне відділення на території нафтопереробного та нафтохімічного комплексу PKN ORLEN. Префабрикація, монтаж та планові ремонти.',
            directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=ul.+Witolda+Zglenickiego+50+F,+09-400+Plock',
            googleMapsUrl: 'https://maps.google.com/?q=ul.+Witolda+Zglenickiego+50+F,+09-400+Płock',
            embedQuery: 'ul.+Witolda+Zglenickiego+50+F,+09-400+Płock',
          },
        ],
      },
      contactCTA: {
        eyebrow: 'КОНТАКТИ',
        heading: 'Поговорімо про ваші інвестиції.',
        supporting: 'Від окремого технологічного вузла до комплексного промислового об’єкта під ключ.',
        primaryCtaBtn: 'Надіслати запит',
        hideFormBtn: 'Згорнути форму',
        form: {
          nameLabel: 'Ім’я та прізвище',
          namePlaceholder: 'наприклад, Іван Коваль',
          companyLabel: 'Компанія',
          companyPlaceholder: 'наприклад, Хімічні Заводи ПАТ',
          emailLabel: 'Електронна пошта',
          emailPlaceholder: 'ivan.koval@company.ua',
          phoneLabel: 'Телефон (необов’язково)',
          phonePlaceholder: '+48 000 000 000',
          messageLabel: 'Повідомлення / Обсяг інвестицій',
          messagePlaceholder: 'Коротко опишіть запланований проєкт, технічні вимоги або бажані терміни...',
          rodoConsent: 'Я даю згоду на обробку персональних даних з метою підготовки техніко-комерційної пропозиції.',
          submitBtn: 'Надіслати запит →',
          submitting: 'Надсилання...',
          successHeading: 'Дякуємо. Повідомлення надіслано.',
          successMessage: 'Наша інженерна група опрацює запит та зв’яжеться з вами найближчим часом.',
          backBtn: 'Надіслати ще одне повідомлення',
        },
        directContact: {
          label: 'Прямий контакт',
          hqLabel: 'Головний офіс та виробничий комплекс',
          address: 'ul. Unii Europejskiej 10, 32-600 Oświęcim',
          phone: '+48 33 847 21 00',
          email: 'poczta@chemorozruch.pl',
        },
      },
      footer: {
        companyName: 'CHEMOROZRUCH',
        companySub: 'Промислові установки та технології',
        columns: {
          contactTitle: 'КОНТАКТИ',
          hqLabel: 'Головний офіс та виробничий комплекс',
          address: 'ul. Unii Europejskiej 10, 32-600 Oświęcim, Польща',
          phone: '+48 33 847 21 00',
          email: 'poczta@chemorozruch.pl',
          navTitle: 'НАВІГАЦІЯ',
          navLinks: {
            about: 'Про компанію',
            competencies: 'Послуги',
            realizations: 'Реалізації',
            certificates: 'Сертифікати',
            locations: 'Філії',
            contact: 'Контакти',
          },
          infoTitle: 'ІНФОРМАЦІЯ',
          privacy: 'Політика конфіденційності',
          rodo: 'Положення GDPR',
          whistleblower: 'Повідомлення про порушення (Sygnaliści)',
          linkedin: 'LinkedIn',
        },
        copyright: 'CHEMOROZRUCH S.A.',
        allRightsReserved: 'Усі права захищено.',
        backToTop: 'Вгору',
      },
      inquiryModal: {
        title: 'Запит комерційної пропозиції',
        subtitle: 'Зв’яжіться з інженерною командою Chemorozruch.',
        nameLabel: 'Ім’я та прізвище / Компанія',
        emailLabel: 'Електронна пошта',
        phoneLabel: 'Номер телефону',
        messageLabel: 'Обсяг проекту / Специфікація',
        sendBtn: 'Надіслати запит',
        successMsg: 'Дякуємо! Ваш запит успішно надіслано.',
      },
    },
};
