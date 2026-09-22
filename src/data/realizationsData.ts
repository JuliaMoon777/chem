import { Language } from '../types';

export interface RealizationGalleryItem {
  id: string;
  src: string;
  alt: Record<Language, string>;
  title: Record<Language, string>;
  category: Record<Language, string>;
  location: Record<Language, string>;
  description: Record<Language, string>;
  year?: string;
}

/**
 * Centralna konfiguracja galerii realizacji CHEMOROZRUCH.
 * 
 * Przygotowana pod wstawienie potwierdzonych zdjęć i danych od Inwestora.
 * Zdjęcia znajdują się w katalogu: /public/images/realizacje/
 * 
 * Pola tekstowe (title, category, location, description) pozostają puste
 * i zostaną uzupełnione po dostarczeniu autoryzowanych danych źródłowych.
 */
export const REALIZATIONS_GALLERY: RealizationGalleryItem[] = [
  {
    id: 'chemorozruch-realizacja-01',
    src: '/images/realizacje/chemorozruch-realizacja-01.webp',
    alt: {
      PL: 'Realizacja CHEMOROZRUCH – elementy instalacji przemysłowej',
      EN: 'CHEMOROZRUCH project – industrial plant components',
      DE: 'CHEMOROZRUCH Realisierung – Industrieanlagenkomponenten',
      UA: 'Реалізація CHEMOROZRUCH – елементи промислової установки',
    },
    title: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    category: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    location: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-realizacja-02',
    src: '/images/realizacje/chemorozruch-realizacja-02.webp',
    alt: {
      PL: 'Realizacja CHEMOROZRUCH – montaż i instalacja przemysłowa',
      EN: 'CHEMOROZRUCH project – industrial assembly and equipment',
      DE: 'CHEMOROZRUCH Realisierung – Industriemontage und Ausrüstung',
      UA: 'Реалізація CHEMOROZRUCH – монтаж та промислове обладнання',
    },
    title: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    category: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    location: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-realizacja-03',
    src: '/images/realizacje/chemorozruch-realizacja-03.webp',
    alt: {
      PL: 'Realizacja CHEMOROZRUCH – aparatura i rurociągi przemysłowe',
      EN: 'CHEMOROZRUCH project – process apparatus and industrial piping',
      DE: 'CHEMOROZRUCH Realisierung – Prozessapparate und Rohrleitungen',
      UA: 'Реалізація CHEMOROZRUCH – апарати та промислові трубопроводи',
    },
    title: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    category: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    location: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-realizacja-04',
    src: '/images/realizacje/chemorozruch-realizacja-04.webp',
    alt: {
      PL: 'Realizacja CHEMOROZRUCH – konstrukcje inżynieryjne i estakady',
      EN: 'CHEMOROZRUCH project – engineering structures and pipe bridges',
      DE: 'CHEMOROZRUCH Realisierung – Ingenieurbauten und Rohrbrücken',
      UA: 'Реалізація CHEMOROZRUCH – інженерні конструкції та естакади',
    },
    title: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    category: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    location: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-realizacja-05',
    src: '/images/realizacje/chemorozruch-realizacja-05.webp',
    alt: {
      PL: 'Realizacja CHEMOROZRUCH – aparaty procesowe i zbiorniki',
      EN: 'CHEMOROZRUCH project – process vessels and equipment',
      DE: 'CHEMOROZRUCH Realisierung – Prozessapparate und Behälter',
      UA: 'Реалізація CHEMOROZRUCH – процесні апарати та резервуари',
    },
    title: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    category: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    location: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-realizacja-06',
    src: '/images/realizacje/chemorozruch-realizacja-06.webp',
    alt: {
      PL: 'Realizacja CHEMOROZRUCH – prefabrykacja i montaż rurociągów',
      EN: 'CHEMOROZRUCH project – piping prefabrication and installation',
      DE: 'CHEMOROZRUCH Realisierung – Rohrleitungsvorfertigung und Montage',
      UA: 'Реалізація CHEMOROZRUCH – префабрикація та монтаж трубопроводів',
    },
    title: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    category: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    location: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-realizacja-07',
    src: '/images/realizacje/chemorozruch-realizacja-07.webp',
    alt: {
      PL: 'Realizacja CHEMOROZRUCH – wytwarzanie konstrukcji stalowych',
      EN: 'CHEMOROZRUCH project – steel structure fabrication',
      DE: 'CHEMOROZRUCH Realisierung – Fertigung von Stahlkonstruktionen',
      UA: 'Реалізація CHEMOROZRUCH – виготовлення сталевих конструкцій',
    },
    title: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    category: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    location: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-realizacja-08',
    src: '/images/realizacje/chemorozruch-realizacja-08.webp',
    alt: {
      PL: 'Realizacja CHEMOROZRUCH – prace remontowe i modernizacyjne',
      EN: 'CHEMOROZRUCH project – maintenance and revamp works',
      DE: 'CHEMOROZRUCH Realisierung – Instandhaltungs- und Revisionsarbeiten',
      UA: 'Реалізація CHEMOROZRUCH – ремонтні та модернізаційні роботи',
    },
    title: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    category: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    location: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
];
