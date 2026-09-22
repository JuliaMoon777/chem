import { Language } from '../types';

export interface CertificateDataItem {
  id: string;
  type: string;
  src: string;
  title: Record<Language, string>;
  alt: Record<Language, string>;
  description: Record<Language, string>;
}

/**
 * Centralna konfiguracja skanów certyfikatów i uprawnień CHEMOROZRUCH.
 * 
 * Skany dokumentów umieszczone są w katalogu: /public/images/certyfikaty/
 * 
 * Po dostarczeniu autoryzowanych skanów od Inwestora, w tym miejscu
 * aktualizowane są docelowe opisy i specyficzne nazwy dokumentów.
 */
export const CERTIFICATES_DATA: CertificateDataItem[] = [
  {
    id: 'chemorozruch-certyfikat-iso',
    type: 'ISO',
    src: '/images/certyfikaty/chemorozruch-certyfikat-iso.webp',
    title: {
      PL: 'Certyfikat ISO – CHEMOROZRUCH',
      EN: 'ISO Certificate – CHEMOROZRUCH',
      DE: 'ISO-Zertifikat – CHEMOROZRUCH',
      UA: 'Сертифікат ISO – CHEMOROZRUCH',
    },
    alt: {
      PL: 'Certyfikat systemu zarządzania jakością ISO CHEMOROZRUCH',
      EN: 'CHEMOROZRUCH ISO quality management system certificate',
      DE: 'CHEMOROZRUCH ISO-Qualitätsmanagementsystem-Zertifikat',
      UA: 'Сертифікат системи управління якістю ISO CHEMOROZRUCH',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-certyfikat-udt',
    type: 'UDT',
    src: '/images/certyfikaty/chemorozruch-certyfikat-udt.webp',
    title: {
      PL: 'Uprawnienia UDT – CHEMOROZRUCH',
      EN: 'UDT Approvals – CHEMOROZRUCH',
      DE: 'UDT-Zulassungen – CHEMOROZRUCH',
      UA: 'Дозволи UDT – CHEMOROZRUCH',
    },
    alt: {
      PL: 'Uprawnienia Urzędu Dozoru Technicznego (UDT) CHEMOROZRUCH',
      EN: 'CHEMOROZRUCH Technical Inspection Authority (UDT) authorization',
      DE: 'CHEMOROZRUCH Zulassungen des Technischen Überwachungsamtes (UDT)',
      UA: 'Дозволи Управління технічного нагляду (UDT) CHEMOROZRUCH',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-certyfikat-en-1090',
    type: 'EN 1090',
    src: '/images/certyfikaty/chemorozruch-certyfikat-en-1090.webp',
    title: {
      PL: 'Certyfikat EN 1090 – CHEMOROZRUCH',
      EN: 'EN 1090 Certificate – CHEMOROZRUCH',
      DE: 'Zertifikat EN 1090 – CHEMOROZRUCH',
      UA: 'Сертифікат EN 1090 – CHEMOROZRUCH',
    },
    alt: {
      PL: 'Certyfikat zgodności zakładowej kontroli produkcji EN 1090 CHEMOROZRUCH',
      EN: 'CHEMOROZRUCH EN 1090 factory production control certificate',
      DE: 'CHEMOROZRUCH Zertifikat der werkseigenen Produktionskontrolle EN 1090',
      UA: 'Сертифікат відповідності заводського виробничого контролю EN 1090 CHEMOROZRUCH',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
  {
    id: 'chemorozruch-certyfikat-iso-3834',
    type: 'ISO 3834',
    src: '/images/certyfikaty/chemorozruch-certyfikat-iso-3834.webp',
    title: {
      PL: 'Certyfikat ISO 3834 – CHEMOROZRUCH',
      EN: 'ISO 3834 Certificate – CHEMOROZRUCH',
      DE: 'ISO 3834-Zertifikat – CHEMOROZRUCH',
      UA: 'Сертифікат ISO 3834 – CHEMOROZRUCH',
    },
    alt: {
      PL: 'Certyfikat wymagań jakości w spawalnictwie ISO 3834 CHEMOROZRUCH',
      EN: 'CHEMOROZRUCH ISO 3834 welding quality requirements certificate',
      DE: 'CHEMOROZRUCH Zertifikat der Qualitätsanforderungen für das Schmelzschweißen ISO 3834',
      UA: 'Сертифікат вимог до якості зварювання ISO 3834 CHEMOROZRUCH',
    },
    description: {
      PL: '',
      EN: '',
      DE: '',
      UA: '',
    },
  },
];
