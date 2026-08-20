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
  tagline: string;
  description: string;
  bulletPoints: string[];
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
  viewCertAction: string;
  standards: CertificateItem[];
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
  industrialFocus: string;
}

export interface LocationsSectionContent {
  eyebrow: string;
  heading: string;
  supporting: string;
  hqBadge: string;
  branchBadge: string;
  phoneLabel: string;
  emailLabel: string;
  focusLabel: string;
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
      facilities: string;
      process: string;
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
      inquiryBtn: 'Wyślij zapytanie',
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
          value: 50,
          suffix: '+',
          label: 'lat doświadczenia',
          sub: 'Ciągłości technologicznej i inżynieryjnej',
        },
        {
          id: 'specialists',
          value: 180,
          suffix: '+',
          label: 'specjalistów',
          sub: 'Inżynierów, monterów i certyfikowanych spawaczy',
        },
        {
          id: 'locations',
          value: 4,
          suffix: '',
          label: 'lokalizacje',
          sub: 'Zakłady produkcyjne i bazy montażowe',
        },
        {
          id: 'founded',
          value: 1972,
          suffix: '',
          label: 'rok założenia',
          sub: 'Tradycja i polska myśl inżynieryjna',
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
          tagline: 'Generalne wykonawstwo i montaż instalacji przemysłowych',
          description:
            'Przedsiębiorstwo specjalistyczne z ponad 50-letnim doświadczeniem w realizacji kompleksowych instalacji technologicznych, rurociągów przemysłowych oraz konstrukcji stalowych dla kluczowych sektorów gospodarki.',
          bulletPoints: [
            'Własna kadra inżynierska i kierownicza',
            'Certyfikaty jakości ISO, UDT i TÜV',
            'Stabilna pozycja na rynku europejskim',
          ],
          image: siteImages.discoveryAbout,
          imageAlt: 'Kadra inżynierska i zakład Chemorozruch',
        },
        {
          id: 'projects',
          index: '02',
          title: 'Co realizujemy',
          tagline: 'Rurociągi, aparatura, montaż mechaniczny i rozruchy',
          description:
            'Wykonujemy rurociągi przemysłowe wysokich i niskich ciśnień, montaż aparatów i zbiorników ciśnieniowych, estakad rurowych, instalacji energetycznych oraz kompleksowe rozruchy technologiczne.',
          bulletPoints: [
            'Rurociągi pary, gazów, cieczy agresywnych',
            'Montaż kolumn rektyfikacyjnych i reaktorów',
            'Prefabrykacja i próby ciśnieniowe',
          ],
          image: siteImages.discoveryProjects,
          imageAlt: 'Rurociągi technologiczne i estakady instalacji',
        },
        {
          id: 'industries',
          index: '03',
          title: 'Dla jakich branż',
          tagline: 'Chemia, petrochemia, energetyka, hutnictwo i przemysł',
          description:
            'Dostarczamy zaawansowane usługi inżynieryjne dla przemysłu chemicznego, rafineryjnego, energetyki zawodowej i przemysłowej, hutnictwa, papiernictwa oraz instalacji ochrony środowiska.',
          bulletPoints: [
            'Przemysł chemiczny i nawozowy',
            'Energetyka zawodowa i elektrociepłownie',
            'Rafinerie i instalacje gazowe',
          ],
          image: siteImages.discoveryIndustries,
          imageAlt: 'Kompleksy chemiczne i energetyczne',
        },
        {
          id: 'capabilities',
          index: '04',
          title: 'Nasze możliwości',
          tagline: 'Własny park maszynowy, hale prefabrykacji i certyfikacja',
          description:
            'Dysponujemy nowoczesnymi halami prefabrykacji rurociągów i konstrukcji, zaawansowanym sprzętem spawalniczym, mobilnymi laboratoriami badań NDT oraz kompletem uprawnień UDT i TÜV.',
          bulletPoints: [
            'Hale prefabrykacji o wysokiej wydajności',
            'Zautomatyzowane metody spawania (TIG, MIG/MAG, UP)',
            'Pełna kontrola jakości spoin i badań NDT',
          ],
          image: siteImages.discoveryCapabilities,
          imageAlt: 'Hale prefabrykacji i park maszynowy',
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
      supporting: 'Wybrane realizacje dla przemysłu chemicznego, energetycznego i technologicznego.',
      expandDetails: 'Zobacz szczegóły +',
      hideDetails: 'Zwiń szczegóły −',
      scopeLabel: 'Zakres prac',
      industryLabel: 'Branża',
      locationLabel: 'Lokalizacja',
      yearLabel: 'Rok realizacji',
      projects: [
        {
          id: 'rafineria-plock',
          index: '01 / 05',
          num: '01',
          category: 'PETROCHEMIA & RAFINACJA',
          title: 'Modernizacja instalacji hydrokrakingu i rurociągów procesowych',
          location: 'Płock, Polska',
          summary: 'Prefabrykacja i montaż rurociągów wysokociśnieniowych ze stali stopowych podczas planowanego postoju remontowego.',
          image: siteImages.realizacjaRafineria,
          details: {
            scope: 'Prefabrykacja i wymiana rurociągów procesowych DN50–DN600, montaż armatury regulacyjnej, 100% badań NDT złączy spawanych.',
            industry: 'Przemysł rafineryjny i petrochemiczny',
            location: 'Płock, Polska',
            year: '2023',
          },
        },
        {
          id: 'synteza-pulawy',
          index: '02 / 05',
          num: '02',
          category: 'SYNTEZA CHEMICZNA',
          title: 'Węzeł reaktorowy i instalacja kwasu azotowego',
          location: 'Puławy, Polska',
          summary: 'Kompleksowy montaż aparatury ciśnieniowej ze stali austenitycznych oraz instalacji rurociągowych mediów agresywnych.',
          image: siteImages.realizacjaNawozy,
          details: {
            scope: 'Montaż mechaniczny kolumn absorpcyjnych, wymienników ciepła, orurowania kwasoodpornego oraz próby ciśnieniowe.',
            industry: 'Przemysł nawozowy i chemiczny',
            location: 'Puławy, Polska',
            year: '2022',
          },
        },
        {
          id: 'energetyka-kedzierzyn',
          index: '03 / 05',
          num: '03',
          category: 'ENERGETYKA ZAWODOWA',
          title: 'Magistrala parowa i układ rurociągów turbiny',
          location: 'Kędzierzyn-Koźle, Polska',
          summary: 'Wykonanie magistrali pary wysokoprężnej wraz z układem kompensacji naprężeń i zamocowań sprężynowych.',
          image: siteImages.realizacjaEnergetyka,
          details: {
            scope: 'Wykonanie i montaż rurociągów pary świeżej P91 / 16Mo3, montaż zawieszeń sprężynowych, odbiory UDT.',
            industry: 'Energetyka przemysłowa i kogeneracja',
            location: 'Kędzierzyn-Koźle, Polska',
            year: '2023',
          },
        },
        {
          id: 'estakada-tarnow',
          index: '04 / 05',
          num: '04',
          category: 'INFRASTRUKTURA PRZEMYSŁOWA',
          title: 'Wielopoziomowa estakada rurociągów technologicznych',
          location: 'Tarnów, Polska',
          summary: 'Budowa estakad stalowych oraz ułożenie tras przesyłowych mediów technologicznych i gazów technicznych.',
          image: siteImages.realizacjaEstakada,
          details: {
            scope: 'Wytworzenie i montaż 420 ton konstrukcji stalowych, montaż wiązek rurociągowych na wysokości do 22 m.',
            industry: 'Infrastruktura chemiczna',
            location: 'Tarnów, Polska',
            year: '2021',
          },
        },
        {
          id: 'aparaty-brzeg',
          index: '05 / 05',
          num: '05',
          category: 'APARATURA CIŚNIENIOWA',
          title: 'Bateria wymienników ciepła i zbiorników procesowych',
          location: 'Brzeg Dolny, Polska',
          summary: 'Posadowienie, precyzyjne osiowanie i podłączenie wielkogabarytowych aparatów procesowych w czynnym zakładzie.',
          image: siteImages.realizacjaAparaty,
          details: {
            scope: 'Transport technologiczny, montaż pionowy i poziomy aparatów, wykonanie rurociągów przyłączeniowych, próby szczelności.',
            industry: 'Chemia specjalistyczna',
            location: 'Brzeg Dolny, Polska',
            year: '2024',
          },
        },
      ],
    },
    certificates: {
      eyebrow: 'JAKOŚĆ I STANDARDY',
      heading: 'Potwierdzone standardami.',
      supporting: 'Jakość, bezpieczeństwo i zgodność potwierdzone certyfikacją branżową.',
      trustNote: 'Dokumentacja jakościowa, procedury spawalnicze (WPS/WPQR) oraz pełne raporty NDT dostępne na życzenie.',
      viewCertAction: 'Szczegóły normy ↗',
      standards: [
        {
          id: 'iso-9001',
          code: 'ISO 9001',
          name: 'System Zarządzania Jakością',
          scope: 'Projektowanie, prefabrykacja, montaż oraz rozruch rurociągów technologicznych, aparatury chemicznej i konstrukcji przemysłowych.',
          authority: 'Jednostka certyfikująca: TÜV Rheinland / UDT-CERT',
          normSummary: 'Gwarancja powtarzalności procesów inżynieryjnych i pełnej identyfikowalności materiałowej.',
        },
        {
          id: 'iso-14001',
          code: 'ISO 14001',
          name: 'System Zarządzania Środowiskowego',
          scope: 'Minimalizacja wpływu procesów produkcyjnych i montażowych na środowisko naturalne oraz optymalizacja gospodarki surowcowej.',
          authority: 'Zgodność z europejskimi dyrektywami środowiskowymi',
          normSummary: 'Zrównoważona produkcja i odpowiedzialna realizacja projektów przemysłowych.',
        },
        {
          id: 'iso-45001',
          code: 'ISO 45001',
          name: 'System Zarządzania Bezpieczeństwem i Higieną Pracy',
          scope: 'Rygorystyczne standardy BHP przy pracach montażowych i spawalniczych na czynnych obiektach chemicznych i rafineryjnych.',
          authority: 'Certyfikacja procedur bezpieczeństwa pracy w przemyśle ciężkim',
          normSummary: 'Zero tolerancji dla kompromisów w zakresie bezpieczeństwa ludzi i obiektów.',
        },
        {
          id: 'iso-3834-2',
          code: 'ISO 3834-2',
          name: 'Pełne Wymagania Jakości w Spawalnictwie',
          scope: 'Spawanie materiałów ze stali węglowych, stopowych, austenitycznych, duplex i stopów niklu pod nadzorem Międzynarodowego Inżyniera Spawalnika (IWE).',
          authority: 'Kwalifikowane technologie spawania zgodnie z EN ISO 15614',
          normSummary: 'Najwyższa klasa metalurgiczna spoin podlegająca badaniom RT, UT, MT i PT.',
        },
        {
          id: 'en-1090-2',
          code: 'PN-EN 1090-2 / EXC3',
          name: 'Wytwarzanie Konstrukcji Stalowych — Klasa EXC3',
          scope: 'Prefabrykacja i montaż nośnych konstrukcji stalowych estakad, wież technologicznych oraz hal przemysłowych podlegających obciążeniom dynamicznym.',
          authority: 'Znakowanie CE dla wyrobów konstrukcyjnych',
          normSummary: 'Spełnienie restrykcyjnych kryteriów wykonania i odbiorów w klasie wykonania EXC3.',
        },
        {
          id: 'udt-ped',
          code: 'UDT / Dyrektywa Ciśnieniowa (PED)',
          name: 'Uprawnienia Dozoru Technicznego',
          scope: 'Wytwarzanie, montaż, modernizacja i naprawa urządzeń ciśnieniowych, zbiorników i rurociągów parowych oraz gazowych.',
          authority: 'Urząd Dozoru Technicznego (UDT) / TÜV SÜD',
          normSummary: 'Pełna zgodność z Dyrektywą Ciśnieniową 2014/68/UE oraz polskimi przepisami dozorowymi.',
        },
      ],
    },
    locations: {
      eyebrow: 'ODDZIAŁY',
      heading: 'Blisko przemysłu.',
      supporting: 'Nasze zespoły działają w kluczowych ośrodkach przemysłowych w Polsce.',
      hqBadge: 'Siedziba Główna & Zakład Produkcyjny',
      branchBadge: 'Oddział Realizacyjny',
      phoneLabel: 'Telefon',
      emailLabel: 'Email',
      focusLabel: 'Obszar operacyjny',
      branches: [
        {
          id: 'oswiecim',
          city: 'Oświęcim',
          role: 'Siedziba Główna & Zakład Prefabrykacji',
          address: 'ul. Unii Europejskiej 10',
          postalCode: '32-600 Oświęcim',
          phone: '+48 33 847 21 00',
          email: 'poczta@chemorozruch.pl',
          coords: { x: 48, y: 82 },
          industrialFocus: 'Zarząd, biuro inżynieryjne, główny zakład prefabrykacji rurociągów i aparatów chemicznych.',
        },
        {
          id: 'plock',
          city: 'Płock',
          role: 'Oddział Płock',
          address: 'ul. Chemików 7',
          postalCode: '09-411 Płock',
          phone: '+48 24 365 24 00',
          email: 'plock@chemorozruch.pl',
          coords: { x: 52, y: 44 },
          industrialFocus: 'Kompleks petrochemiczny i rafineryjny (PKN ORLEN), rurociągi procesowe i postoje remontowe.',
        },
        {
          id: 'gdansk',
          city: 'Gdańsk',
          role: 'Oddział Północ / Gdańsk',
          address: 'ul. Elbląska 135',
          postalCode: '80-718 Gdańsk',
          phone: '+48 58 308 70 00',
          email: 'gdansk@chemorozruch.pl',
          coords: { x: 48, y: 15 },
          industrialFocus: 'Przemysł rafineryjny, chemiczny i stoczniowy (Rafineria Gdańska, infrastruktura portowa).',
        },
        {
          id: 'pulawy',
          city: 'Puławy',
          role: 'Oddział Puławy',
          address: 'Al. Tysiąclecia Państwa Polskiego 13',
          postalCode: '24-110 Puławy',
          phone: '+48 81 473 12 00',
          email: 'pulawy@chemorozruch.pl',
          coords: { x: 74, y: 58 },
          industrialFocus: 'Przemysł chemiczny i nawozowy (Grupa Azoty Zakłady Azotowe „Puławy”), synteza ciśnieniowa.',
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
          competencies: 'Kompetencje',
          facilities: 'Zaplecze technologiczne',
          process: 'Od projektu do uruchomienia',
          realizations: 'Realizacje',
          certificates: 'Certyfikaty i jakość',
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
          value: 50,
          suffix: '+',
          label: 'years of experience',
          sub: 'Technological continuity and engineering excellence',
        },
        {
          id: 'specialists',
          value: 180,
          suffix: '+',
          label: 'specialists',
          sub: 'Engineers, fitters, and certified welders',
        },
        {
          id: 'locations',
          value: 4,
          suffix: '',
          label: 'strategic locations',
          sub: 'Production workshops and assembly bases',
        },
        {
          id: 'founded',
          value: 1972,
          suffix: '',
          label: 'year founded',
          sub: 'Heritage of high-precision engineering',
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
      supporting: 'Selected engineering and installation projects for chemical, power, and process industries.',
      expandDetails: 'View details +',
      hideDetails: 'Hide details −',
      scopeLabel: 'Scope of work',
      industryLabel: 'Industry',
      locationLabel: 'Location',
      yearLabel: 'Year of completion',
      projects: [
        {
          id: 'rafineria-plock',
          index: '01 / 05',
          num: '01',
          category: 'PETROCHEMISTRY & REFINING',
          title: 'Hydrocracking unit revamping & process piping',
          location: 'Płock, Poland',
          summary: 'Prefabrication and erection of high-pressure alloy piping networks during scheduled refinery turnaround.',
          image: siteImages.realizacjaRafineria,
          details: {
            scope: 'Shop prefabrication and on-site replacement of DN50–DN600 process lines, control valve installation, 100% NDT inspection.',
            industry: 'Refining & Petrochemical Industry',
            location: 'Płock, Poland',
            year: '2023',
          },
        },
        {
          id: 'synteza-pulawy',
          index: '02 / 05',
          num: '02',
          category: 'CHEMICAL SYNTHESIS',
          title: 'Reactor island & nitric acid process unit',
          location: 'Puławy, Poland',
          summary: 'Turnkey erection of austenitic stainless steel pressure apparatus and aggressive medium piping networks.',
          image: siteImages.realizacjaNawozy,
          details: {
            scope: 'Mechanical assembly of absorption columns, heat exchangers, acid-resistant piping loops, and pressure proof testing.',
            industry: 'Fertilizer & Chemical Processing',
            location: 'Puławy, Poland',
            year: '2022',
          },
        },
        {
          id: 'energetyka-kedzierzyn',
          index: '03 / 05',
          num: '03',
          category: 'POWER GENERATION',
          title: 'High-pressure steam main & turbine piping system',
          location: 'Kędzierzyn-Koźle, Poland',
          summary: 'Fabrication of main high-pressure steam distribution headers with stress compensation loops and spring hangers.',
          image: siteImages.realizacjaEnergetyka,
          details: {
            scope: 'Fabrication and erection of P91 / 16Mo3 live steam lines, constant spring supports, and certified UDT commissioning.',
            industry: 'Industrial Energy & Cogeneration (CHP)',
            location: 'Kędzierzyn-Koźle, Poland',
            year: '2023',
          },
        },
        {
          id: 'estakada-tarnow',
          index: '04 / 05',
          num: '04',
          category: 'INDUSTRIAL INFRASTRUCTURE',
          title: 'Multi-tier technological pipe rack & transfer bridge',
          location: 'Tarnów, Poland',
          summary: 'Construction of heavy structural steel pipe racks and routing of complex plant utilities and technical gases.',
          image: siteImages.realizacjaEstakada,
          details: {
            scope: 'Fabrication and erection of 420 tons of structural steelwork and installation of multi-pipe bundles at heights up to 22m.',
            industry: 'Chemical Plant Infrastructure',
            location: 'Tarnów, Poland',
            year: '2021',
          },
        },
        {
          id: 'aparaty-brzeg',
          index: '05 / 05',
          num: '05',
          category: 'PRESSURE APPARATUS',
          title: 'Battery of process heat exchangers & vessel units',
          location: 'Brzeg Dolny, Poland',
          summary: 'Precision rigging, alignment, and mechanical tie-in of oversized chemical equipment in an active production facility.',
          image: siteImages.realizacjaAparaty,
          details: {
            scope: 'Rigging transport, vertical and horizontal vessel alignment, process tie-in piping, and hydrostatic leak testing.',
            industry: 'Specialty Chemical Manufacturing',
            location: 'Brzeg Dolny, Poland',
            year: '2024',
          },
        },
      ],
    },
    certificates: {
      eyebrow: 'QUALITY & STANDARDS',
      heading: 'Certified industrial standards.',
      supporting: 'Quality, safety, and regulatory compliance backed by accredited certifications.',
      trustNote: 'Quality documentation, qualified welding procedures (WPS/WPQR), and comprehensive NDT reports available upon request.',
      viewCertAction: 'Standard details ↗',
      standards: [
        {
          id: 'iso-9001',
          code: 'ISO 9001',
          name: 'Quality Management System',
          scope: 'Design, shop prefabrication, field assembly, and commissioning of technological piping, chemical apparatus, and industrial steel structures.',
          authority: 'Certification Body: TÜV Rheinland / UDT-CERT',
          normSummary: 'Guarantees repeatability of engineering processes and full material batch traceability.',
        },
        {
          id: 'iso-14001',
          code: 'ISO 14001',
          name: 'Environmental Management System',
          scope: 'Minimization of environmental footprint across fabrication and installation operations with optimal resource utilization.',
          authority: 'Compliance with EU environmental industrial directives',
          normSummary: 'Sustainable manufacturing and environmentally responsible project execution.',
        },
        {
          id: 'iso-45001',
          code: 'ISO 45001',
          name: 'Occupational Health & Safety System',
          scope: 'Rigorous HSE procedures during heavy mechanical erection and welding on live petrochemical and chemical plants.',
          authority: 'Safety certification for high-risk heavy industrial sites',
          normSummary: 'Zero-compromise policy regarding personnel and facility safety.',
        },
        {
          id: 'iso-3834-2',
          code: 'ISO 3834-2',
          name: 'Comprehensive Quality for Fusion Welding',
          scope: 'Welding of carbon, alloyed, austenitic, duplex steels, and nickel alloys supervised by International Welding Engineers (IWE).',
          authority: 'Qualified welding procedures according to EN ISO 15614',
          normSummary: 'Highest metallurgical weld integrity subject to 100% RT, UT, MT, and PT testing.',
        },
        {
          id: 'en-1090-2',
          code: 'PN-EN 1090-2 / EXC3',
          name: 'Fabrication of Steel Structures — Class EXC3',
          scope: 'Shop fabrication and site erection of load-bearing structures for pipe racks, process towers, and dynamic industrial halls.',
          authority: 'CE marking for structural steel components',
          normSummary: 'Compliance with stringent structural fabrication and testing criteria up to execution class EXC3.',
        },
        {
          id: 'udt-ped',
          code: 'UDT / Pressure Equipment Directive (PED)',
          name: 'Notified Body Authorizations',
          scope: 'Manufacturing, installation, revamping, and maintenance of pressure equipment, vessels, and high-pressure steam/gas piping.',
          authority: 'Office of Technical Inspection (UDT) / TÜV SÜD',
          normSummary: 'Full compliance with European Pressure Equipment Directive 2014/68/EU.',
        },
      ],
    },
    locations: {
      eyebrow: 'LOCATIONS',
      heading: 'Close to major industry.',
      supporting: 'Our teams operate in key industrial centers across Poland.',
      hqBadge: 'Headquarters & Fabrication Facility',
      branchBadge: 'Regional Operations Branch',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      focusLabel: 'Operational Focus',
      branches: [
        {
          id: 'oswiecim',
          city: 'Oświęcim',
          role: 'Headquarters & Main Fabrication Facility',
          address: 'ul. Unii Europejskiej 10',
          postalCode: '32-600 Oświęcim',
          phone: '+48 33 847 21 00',
          email: 'poczta@chemorozruch.pl',
          coords: { x: 48, y: 82 },
          industrialFocus: 'Executive management, engineering office, main pipe prefabrication and pressure vessel workshop.',
        },
        {
          id: 'plock',
          city: 'Płock',
          role: 'Płock Branch',
          address: 'ul. Chemików 7',
          postalCode: '09-411 Płock',
          phone: '+48 24 365 24 00',
          email: 'plock@chemorozruch.pl',
          coords: { x: 52, y: 44 },
          industrialFocus: 'Petrochemical & refining complex (PKN ORLEN), process piping and plant turnaround services.',
        },
        {
          id: 'gdansk',
          city: 'Gdańsk',
          role: 'North / Gdańsk Branch',
          address: 'ul. Elbląska 135',
          postalCode: '80-718 Gdańsk',
          phone: '+48 58 308 70 00',
          email: 'gdansk@chemorozruch.pl',
          coords: { x: 48, y: 15 },
          industrialFocus: 'Refining, chemical, and marine terminal industries (Gdańsk Refinery, seaport infrastructure).',
        },
        {
          id: 'pulawy',
          city: 'Puławy',
          role: 'Puławy Branch',
          address: 'Al. Tysiąclecia Państwa Polskiego 13',
          postalCode: '24-110 Puławy',
          phone: '+48 81 473 12 00',
          email: 'pulawy@chemorozruch.pl',
          coords: { x: 74, y: 58 },
          industrialFocus: 'Chemical synthesis and fertilizer plants (Grupa Azoty Zakłady Azotowe „Puławy”), high-pressure loops.',
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
          competencies: 'Competencies',
          facilities: 'Technical Facilities',
          process: 'From Design to Commissioning',
          realizations: 'Realizations',
          certificates: 'Certificates & Quality',
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
          value: 50,
          suffix: '+',
          label: 'Jahre Erfahrung',
          sub: 'Technologische Kontinuität seit 1972',
        },
        {
          id: 'specialists',
          value: 180,
          suffix: '+',
          label: 'Spezialisten',
          sub: 'Ingenieure, Monteure und zertifizierte Schweißer',
        },
        {
          id: 'locations',
          value: 4,
          suffix: '',
          label: 'Standorte',
          sub: 'Produktions- und Montagestützpunkte',
        },
        {
          id: 'founded',
          value: 1972,
          suffix: '',
          label: 'Gründungsjahr',
          sub: 'Ingenieurtradition und Präzision',
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
      supporting: 'Ausgewählte Realisierungen für Chemie-, Energie- und Prozessindustrieanlagen.',
      expandDetails: 'Details ansehen +',
      hideDetails: 'Details schließen −',
      scopeLabel: 'Leistungsumfang',
      industryLabel: 'Branche',
      locationLabel: 'Standort',
      yearLabel: 'Ausführungsjahr',
      projects: [
        {
          id: 'rafineria-plock',
          index: '01 / 05',
          num: '01',
          category: 'PETROCHEMIE & RAFFINERIE',
          title: 'Modernisierung der Hydrocracker-Anlage & Prozessrohrleitungen',
          location: 'Płock, Polen',
          summary: 'Vorfertigung und Montage von Hochdruck-Rohrleitungssystemen aus legierten Stählen während des Turnarounds.',
          image: siteImages.realizacjaRafineria,
          details: {
            scope: 'Werkstattvorfertigung und Baustellenmontage von Rohrleitungen DN50–DN600, Regelarmaturen und 100% ZfP-Prüfungen.',
            industry: 'Raffinerie & Petrochemie',
            location: 'Płock, Polen',
            year: '2023',
          },
        },
        {
          id: 'synteza-pulawy',
          index: '02 / 05',
          num: '02',
          category: 'CHEMISCHE SYNTHESE',
          title: 'Reaktoranlage & Salpetersäure-Produktionslinie',
          location: 'Puławy, Polen',
          summary: 'Schlüsselfertige Montage von Druckapparaten aus austenitischen Stählen und säurebeständigen Rohrleitungen.',
          image: siteImages.realizacjaNawozy,
          details: {
            scope: 'Mechanische Montage von Absorptionskolonnen, Wärmetauschern, säurebeständigen Leitungen und Druckprüfungen.',
            industry: 'Düngemittel- und Chemieindustrie',
            location: 'Puławy, Polen',
            year: '2022',
          },
        },
        {
          id: 'energetyka-kedzierzyn',
          index: '03 / 05',
          num: '03',
          category: 'ENERGIEWIRTSCHAFT',
          title: 'Hochdruckdampf-Haupttrasse & Turbinenverrohrung',
          location: 'Kędzierzyn-Koźle, Polen',
          summary: 'Fertigung der Frischdampfleitung mit thermischer Spannungskompensation und Federhängern.',
          image: siteImages.realizacjaEnergetyka,
          details: {
            scope: 'Herstellung und Montage von Frischdampfleitungen P91 / 16Mo3, Montage von Konstanthängern und UDT-Abnahme.',
            industry: 'Industrielle Energieversorgung & Kraft-Wärme-Kopplung',
            location: 'Kędzierzyn-Koźle, Polen',
            year: '2023',
          },
        },
        {
          id: 'estakada-tarnow',
          index: '04 / 05',
          num: '04',
          category: 'INDUSTRIELLE INFRASTRUKTUR',
          title: 'Mehrebenen-Rohrbrücke & Technologietrassen',
          location: 'Tarnów, Polen',
          summary: 'Errichtung von Stahlrohrbrücken und Verlegung von Versorgungsleitungen für technische Gase und Prozessmedien.',
          image: siteImages.realizacjaEstakada,
          details: {
            scope: 'Fertigung und Montage von 420 Tonnen Stahlkonstruktionen sowie Verlegung von Rohrleitungspaketen in bis zu 22 m Höhe.',
            industry: 'Chemieanlagen-Infrastruktur',
            location: 'Tarnów, Polen',
            year: '2021',
          },
        },
        {
          id: 'aparaty-brzeg',
          index: '05 / 05',
          num: '05',
          category: 'DRUCKAPPARATEBAU',
          title: 'Batterie von Prozesswärmetauschern und Behältern',
          location: 'Brzeg Dolny, Polen',
          summary: 'Schwerguttransport, präzise Einbringung, Ausrichtung und Verrohrung von Großapparaten im laufenden Werk.',
          image: siteImages.realizacjaAparaty,
          details: {
            scope: 'Schwerlast-Einbringung, vertikale/horizontale Apparateausrichtung, Einbindung in Prozessleitungen, Dichtheitsprüfungen.',
            industry: 'Spezialchemie',
            location: 'Brzeg Dolny, Polen',
            year: '2024',
          },
        },
      ],
    },
    certificates: {
      eyebrow: 'QUALITÄT & STANDARDS',
      heading: 'Zertifizierte Industriestandards.',
      supporting: 'Qualität, Sicherheit und Konformität durch anerkannte Branchenzertifizierungen bestätigt.',
      trustNote: 'Qualitätsdokumentation, qualifizierte Schweißverfahren (WPS/WPQR) und vollständige ZfP-Prüfberichte auf Anfrage verfügbar.',
      viewCertAction: 'Normdetails ↗',
      standards: [
        {
          id: 'iso-9001',
          code: 'ISO 9001',
          name: 'Qualitätsmanagementsystem',
          scope: 'Planung, Vorfertigung, Montage und Inbetriebnahme von Industrie-Rohrleitungen, chemischen Apparaten und Stahlbaukonstruktionen.',
          authority: 'Zertifizierungsstelle: TÜV Rheinland / UDT-CERT',
          normSummary: 'Garantie für reproduzierbare Ingenieurprozesse und lückenlose Chargenrückverfolgbarkeit.',
        },
        {
          id: 'iso-14001',
          code: 'ISO 14001',
          name: 'Umweltmanagementsystem',
          scope: 'Minimierung von Umweltauswirkungen in Fertigung und Montage bei nachhaltiger Rohstoffnutzung.',
          authority: 'Konformität mit europäischen Umweltrichtlinien',
          normSummary: 'Nachhaltige Fertigung und umweltbewusste Projektabwicklung in der Industrie.',
        },
        {
          id: 'iso-45001',
          code: 'ISO 45001',
          name: 'Arbeitsschutzmanagementsystem',
          scope: 'Höchste HSE-Standards bei Montage- und Schweißarbeiten in laufenden chemischen und petrochemischen Anlagen.',
          authority: 'Zertifizierung von Sicherheitsverfahren für Schwerindustrieanlagen',
          normSummary: 'Null-Toleranz-Politik gegenüber Sicherheitsrisiken für Mensch und Anlage.',
        },
        {
          id: 'iso-3834-2',
          code: 'ISO 3834-2',
          name: 'Umfassende Qualitätsanforderungen Schweißen',
          scope: 'Schweißen von Kohlenstoff-, legierten, austenitischen Stählen, Duplex und Nickellegierungen unter IWE-Aufsicht.',
          authority: 'Qualifizierte Schweißverfahren nach EN ISO 15614',
          normSummary: 'Höchste schweißtechnische Güte mit 100%-Prüfungen (RT, UT, MT, PT).',
        },
        {
          id: 'en-1090-2',
          code: 'PN-EN 1090-2 / EXC3',
          name: 'Herstellung von Stahltragwerken — Klasse EXC3',
          scope: 'Vorfertigung und Montage tragender Stahlkonstruktionen für Rohrbrücken, Prozesstürme und Industriehallen.',
          authority: 'CE-Kennzeichnung für Bauprodukte',
          normSummary: 'Erfüllung strenger Ausführungs- und Prüfkriterien der Ausführungsklasse EXC3.',
        },
        {
          id: 'udt-ped',
          code: 'UDT / Druckgeräterichtlinie (DGRL / PED)',
          name: 'Zulassungen Benannter Stellen',
          scope: 'Herstellung, Montage, Modernisierung und Instandsetzung von Druckgeräten, Behältern und Dampf-/Gasleitungen.',
          authority: 'Polnisches Amt für Technische Überwachung (UDT) / TÜV SÜD',
          normSummary: 'Vollständige Konformität mit der europäischen Richtlinie 2014/68/EU.',
        },
      ],
    },
    locations: {
      eyebrow: 'STANDORTE',
      heading: 'Nah an der Industrie.',
      supporting: 'Unsere Teams sind in den zentralen Industriezentren Polens im Einsatz.',
      hqBadge: 'Hauptsitz & Fertigungswerk',
      branchBadge: 'Regionaler Ausführungsstandort',
      phoneLabel: 'Telefon',
      emailLabel: 'E-Mail',
      focusLabel: 'Operativer Schwerpunkt',
      branches: [
        {
          id: 'oswiecim',
          city: 'Oświęcim',
          role: 'Hauptsitz & Vorfertigungswerk',
          address: 'ul. Unii Europejskiej 10',
          postalCode: '32-600 Oświęcim',
          phone: '+48 33 847 21 00',
          email: 'poczta@chemorozruch.pl',
          coords: { x: 48, y: 82 },
          industrialFocus: 'Unternehmensleitung, Ingenieurbüro, Hauptwerk für Rohrleitungs- und Apparatevorfertigung.',
        },
        {
          id: 'plock',
          city: 'Płock',
          role: 'Niederlassung Płock',
          address: 'ul. Chemików 7',
          postalCode: '09-411 Płock',
          phone: '+48 24 365 24 00',
          email: 'plock@chemorozruch.pl',
          coords: { x: 52, y: 44 },
          industrialFocus: 'Petrochemie- und Raffineriekomplex (PKN ORLEN), Prozessrohrleitungen und Anlagenstillstände.',
        },
        {
          id: 'gdansk',
          city: 'Gdańsk',
          role: 'Niederlassung Nord / Danzig',
          address: 'ul. Elbląska 135',
          postalCode: '80-718 Gdańsk',
          phone: '+48 58 308 70 00',
          email: 'gdansk@chemorozruch.pl',
          coords: { x: 48, y: 15 },
          industrialFocus: 'Raffinerie-, Chemie- und Marinestandorte (Raffinerie Danzig, Seehafeninfrastruktur).',
        },
        {
          id: 'pulawy',
          city: 'Puławy',
          role: 'Niederlassung Puławy',
          address: 'Al. Tysiąclecia Państwa Polskiego 13',
          postalCode: '24-110 Puławy',
          phone: '+48 81 473 12 00',
          email: 'pulawy@chemorozruch.pl',
          coords: { x: 74, y: 58 },
          industrialFocus: 'Chemie- und Düngemittelindustrie (Grupa Azoty Zakłady Azotowe „Puławy”), Hochdrucksynthese.',
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
          competencies: 'Kompetenzen',
          facilities: 'Technologische Ausstattung',
          process: 'Vom Entwurf bis zur Inbetriebnahme',
          realizations: 'Referenzen',
          certificates: 'Zertifikate & Qualität',
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
            value: 50,
            suffix: '+',
            label: 'років досвіду',
            sub: 'Технологічна наступність та інженерія',
          },
          {
            id: 'specialists',
            value: 180,
            suffix: '+',
            label: 'фахівців',
            sub: 'Інженери, монтажники та сертифіковані зварювальники',
          },
          {
            id: 'locations',
            value: 4,
            suffix: '',
            label: 'локації',
            sub: 'Виробничі бази та монтажні комплекси',
          },
          {
            id: 'founded',
            value: 1972,
            suffix: '',
            label: 'рік заснування',
            sub: 'Традиції інженерної точності',
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
        supporting: 'Вибрані реалізації для хімічної, енергетичної та технологічної промисловості.',
        expandDetails: 'Деталі проєкту +',
        hideDetails: 'Згорнути деталі −',
        scopeLabel: 'Обсяг робіт',
        industryLabel: 'Галузь',
        locationLabel: 'Локація',
        yearLabel: 'Рік реалізації',
        projects: [
          {
            id: 'rafineria-plock',
            index: '01 / 05',
            num: '01',
            category: 'НАФТОХІМІЯ ТА ПЕРЕРОБКА',
            title: 'Модернізація установки гідрокрекінгу та технологічних трубопроводів',
            location: 'Плоцьк, Польща',
            summary: 'Префабрикація та монтаж високотискових трубопроводів з легованих сталей під час планового ремонту.',
            image: siteImages.realizacjaRafineria,
            details: {
              scope: 'Префабрикація та заміна трубопроводів DN50–DN600, монтаж регулюючої арматури, 100% NDT контроль зварних з’єднань.',
              industry: 'Нафтопереробна та нафтохімічна галузь',
              location: 'Плоцьк, Польща',
              year: '2023',
            },
          },
          {
            id: 'synteza-pulawy',
            index: '02 / 05',
            num: '02',
            category: 'ХІМІЧНИЙ СИНТЕЗ',
            title: 'Реакторний вузол та установка азотної кислоти',
            location: 'Пулави, Польща',
            summary: 'Комплексний монтаж апаратури високого тиску з аустенітних сталей та трубопроводів агресивних середовищ.',
            image: siteImages.realizacjaNawozy,
            details: {
              scope: 'Механічний монтаж абсорбційних колон, теплообмінників, кислотостійких трубопроводів та випробування тиском.',
              industry: 'Хімічна та добривна промисловість',
              location: 'Пулави, Польща',
              year: '2022',
            },
          },
          {
            id: 'energetyka-kedzierzyn',
            index: '03 / 05',
            num: '03',
            category: 'ЕНЕРГЕТИКА',
            title: 'Парова магістраль високого тиску та обв’язка турбіни',
            location: 'Кендзежин-Козьле, Польща',
            summary: 'Виготовлення парової магістралі високого тиску із системою компенсації напружень та пружинних підвісок.',
            image: siteImages.realizacjaEnergetyka,
            details: {
              scope: 'Виготовлення та монтаж трубопроводів свіжої пари P91 / 16Mo3, монтаж пружинних підвісок, прийомка UDT.',
              industry: 'Промислова енергетика та когенерація (ТЕЦ)',
              location: 'Кендзежин-Козьле, Польща',
              year: '2023',
            },
          },
          {
            id: 'estakada-tarnow',
            index: '04 / 05',
            num: '04',
            category: 'ПРОМИСЛОВА ІНФРАСТРУКТУРА',
            title: 'Багаторівнева естакада технологічних трубопроводів',
            location: 'Тарнів, Польща',
            summary: 'Будівництво сталевих естакад та прокладання трас транспортування технологічних газів та середовищ.',
            image: siteImages.realizacjaEstakada,
            details: {
              scope: 'Виготовлення та монтаж 420 тонн металоконструкцій, прокладання пакетів трубопроводів на висоті до 22 м.',
              industry: 'Хімічна інфраструктура',
              location: 'Тарнів, Польща',
              year: '2021',
            },
          },
          {
            id: 'aparaty-brzeg',
            index: '05 / 05',
            num: '05',
            category: 'АПАРАТИ ВИСОКОГО ТИСКУ',
            title: 'Батарея технологічних теплообмінників та ємностей',
            location: 'Бжег-Дольний, Польща',
            summary: 'Такелажні роботи, точне центрування та підключення великогабаритних апаратів на діючому підприємстві.',
            image: siteImages.realizacjaAparaty,
            details: {
              scope: 'Технологічний транспорт, вертикальний і горизонтальний монтаж ємностей, обв’язка трубопроводами, випробування на герметичність.',
              industry: 'Спеціальна хімія',
              location: 'Бжег-Дольний, Польща',
              year: '2024',
            },
          },
        ],
      },
      certificates: {
        eyebrow: 'ЯКІСТЬ ТА СТАНДАРТИ',
        heading: 'Підтверджено стандартами.',
        supporting: 'Якість, безпека та відповідність нормам підтверджені галузевими сертифікатами.',
        trustNote: 'Якісна документація, кваліфіковані процедури зварювання (WPS/WPQR) та повні звіти NDT контролю надаються за запитом.',
        viewCertAction: 'Деталі стандарту ↗',
        standards: [
          {
            id: 'iso-9001',
            code: 'ISO 9001',
            name: 'Система Управління Якістю',
            scope: 'Проєктування, префабрикація, монтаж та пусконалагодження технологічних трубопроводів, хімічної апаратури та металоконструкцій.',
            authority: 'Орган сертифікації: TÜV Rheinland / UDT-CERT',
            normSummary: 'Гарантія стабільності інженерних процесів та простежуваності матеріалів.',
          },
          {
            id: 'iso-14001',
            code: 'ISO 14001',
            name: 'Система Екологічного Менеджменту',
            scope: 'Мінімізація впливу виробничих та монтажних процесів на довкілля та оптимізація використання ресурсів.',
            authority: 'Відповідність директивам ЄС у сфері охорони навколишнього середовища',
            normSummary: 'Екологічно відповідальне виконання промислових проєктів.',
          },
          {
            id: 'iso-45001',
            code: 'ISO 45001',
            name: 'Система Охорони Праці та Безпеки',
            scope: 'Суворі стандарти безпеки праці під час монтажних та зварювальних робіт на діючих нафтохімічних та хімічних заводах.',
            authority: 'Сертифікація процедур безпеки у важкій промисловості',
            normSummary: 'Нульова толерантність до ризиків для життя персоналу та безпеки об’єктів.',
          },
          {
            id: 'iso-3834-2',
            code: 'ISO 3834-2',
            name: 'Повні Вимоги до Якості Зварювання',
            scope: 'Зварювання вуглецевих, легованих, аустенітних, дуплексних сталей та сплавів нікелю під наглядом IWE.',
            authority: 'Кваліфіковані технології зварювання за стандартом EN ISO 15614',
            normSummary: 'Найвища металургійна якість швів із 100% неруйнівним контролем (RT, UT, MT, PT).',
          },
          {
            id: 'en-1090-2',
            code: 'PN-EN 1090-2 / EXC3',
            name: 'Виготовлення Сталевих Конструкцій — Клас EXC3',
            scope: 'Префабрикація та монтаж несних сталевих конструкцій естакад, технологічних веж та цехів під динамічні навантаження.',
            authority: 'Маркування CE для будівельних виробів',
            normSummary: 'Відповідність суворим критеріям виготовлення класу EXC3.',
          },
          {
            id: 'udt-ped',
            code: 'UDT / Директива Обладнання під Тиском (PED)',
            name: 'Дозволи Технічного Нагляду',
            scope: 'Виготовлення, монтаж, модернізація та ремонт обладнання під тиском, ємностей, парових та газових трубопроводів.',
            authority: 'Управління технічного нагляду (UDT) / TÜV SÜD',
            normSummary: 'Повна відповідність Директиві ЄС 2014/68/EU щодо обладнання під тиском.',
          },
        ],
      },
      locations: {
        eyebrow: 'ФІЛІЇ ТА ВІДДІЛЕННЯ',
        heading: 'Поруч із промисловістю.',
        supporting: 'Наші інженерні та монтажні команди працюють у ключових промислових вузлах Польщі.',
        hqBadge: 'Головний офіс та виробничий комплекс',
        branchBadge: 'Регіональне відділення',
        phoneLabel: 'Телефон',
        emailLabel: 'Email',
        focusLabel: 'Операційний фокус',
        branches: [
          {
            id: 'oswiecim',
            city: 'Освенцим',
            role: 'Головний офіс та завод префабрикації',
            address: 'ul. Unii Europejskiej 10',
            postalCode: '32-600 Oświęcim',
            phone: '+48 33 847 21 00',
            email: 'poczta@chemorozruch.pl',
            coords: { x: 48, y: 82 },
            industrialFocus: 'Керівництво, інженерне бюро, головний цех префабрикації трубопроводів та апаратів.',
          },
          {
            id: 'plock',
            city: 'Плоцьк',
            role: 'Відділення Плоцьк',
            address: 'ul. Chemików 7',
            postalCode: '09-411 Płock',
            phone: '+48 24 365 24 00',
            email: 'plock@chemorozruch.pl',
            coords: { x: 52, y: 44 },
            industrialFocus: 'Нафтохімічний та переробний комплекс (PKN ORLEN), технологічні трубопроводи та ремонти.',
          },
          {
            id: 'gdansk',
            city: 'Гданськ',
            role: 'Північне відділення / Гданськ',
            address: 'ul. Elbląska 135',
            postalCode: '80-718 Gdańsk',
            phone: '+48 58 308 70 00',
            email: 'gdansk@chemorozruch.pl',
            coords: { x: 48, y: 15 },
            industrialFocus: 'Нафтопереробна, хімічна та морська промисловість (Рафінерія Гданськ, портова інфраструктура).',
          },
          {
            id: 'pulawy',
            city: 'Пулави',
            role: 'Відділення Пулави',
            address: 'Al. Tysiąclecia Państwa Polskiego 13',
            postalCode: '24-110 Puławy',
            phone: '+48 81 473 12 00',
            email: 'pulawy@chemorozruch.pl',
            coords: { x: 74, y: 58 },
            industrialFocus: 'Хімічна та добривна промисловість (Grupa Azoty Zakłady Azotowe „Puławy”), синтез під тиском.',
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
            competencies: 'Компетенції',
            facilities: 'Виробничі потужності',
            process: 'Від проєкту до пусконалагодження',
            realizations: 'Реалізації',
            certificates: 'Сертифікати та якість',
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
