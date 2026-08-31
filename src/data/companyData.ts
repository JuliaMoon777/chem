/**
 * Centralized Company Data Source of Truth for CHEMOROZRUCH
 * 
 * NOTE: Values marked with `requiresConfirmation: true` have slight discrepancies
 * across historical documents (e.g., S.A. vs Sp. z o.o., Chemików 1 vs Unii Europejskiej 10).
 * They are consolidated here so that all components (Footer, Contact, Schema.org, SEO)
 * consume one unified dataset pending formal client/human sign-off.
 */

export interface CorporateAddress {
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  fullString: string;
  requiresConfirmation?: boolean;
}

export interface ContactChannel {
  department: string;
  email: string;
  phone: string;
  phoneClean: string;
  description?: string;
  requiresConfirmation?: boolean;
}

export interface CompanyDataConfig {
  brandName: string;
  legalName: string;
  legalForm: string;
  legalFormRequiresConfirmation: boolean;
  
  registeredAddress: CorporateAddress;
  operationalAddress: CorporateAddress;
  plockBranchAddress: CorporateAddress;

  nip: string;
  nipFormatted: string;
  regon: string;
  krs: string;
  krsRequiresConfirmation: boolean;
  vatId: string;

  foundingYear: number;

  contacts: {
    generalHQ: ContactChannel;
    tendering: ContactChannel;
    management: ContactChannel;
    plockBranch: ContactChannel;
    careers: ContactChannel;
    privacyDPO: ContactChannel;
    whistleblower: ContactChannel;
  };

  coordinates: {
    oswiecimHQ: { lat: number; lng: number };
    plockBranch: { lat: number; lng: number };
  };
}

export const COMPANY_DATA: CompanyDataConfig = {
  brandName: 'CHEMOROZRUCH',
  legalName: 'CHEMOROZRUCH Sp. z o.o.',
  legalForm: 'Spółka z ograniczoną odpowiedzialnością',
  legalFormRequiresConfirmation: true, // Marked for human/client confirmation (historical references also mention S.A.)

  registeredAddress: {
    streetAddress: 'ul. Chemików 1',
    postalCode: '32-600',
    city: 'Oświęcim',
    country: 'Polska',
    fullString: 'ul. Chemików 1, 32-600 Oświęcim, Polska',
    requiresConfirmation: true, // Requires confirmation against current KRS extract
  },

  operationalAddress: {
    streetAddress: 'ul. Unii Europejskiej 10',
    postalCode: '32-600',
    city: 'Oświęcim',
    country: 'Polska',
    fullString: 'ul. Unii Europejskiej 10, 32-600 Oświęcim, Polska',
    requiresConfirmation: true, // Operational manufacturing workshop / offices address
  },

  plockBranchAddress: {
    streetAddress: 'ul. Zglenickiego 44',
    postalCode: '09-400',
    city: 'Płock',
    country: 'Polska',
    fullString: 'ul. Zglenickiego 44, 09-400 Płock, Polska (Teren Kompleksu Przemysłowego PKN ORLEN)',
    requiresConfirmation: false,
  },

  nip: '5490001815',
  nipFormatted: '549-00-01-815',
  regon: '070494488',
  krs: '0000057211',
  krsRequiresConfirmation: true,
  vatId: 'PL5490001815',

  foundingYear: 1971,

  contacts: {
    generalHQ: {
      department: 'Centrala / Siedziba Główna Oświęcim',
      email: 'biuro@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      description: 'Sekretariat i biuro zarządu',
      requiresConfirmation: false,
    },
    tendering: {
      department: 'Dział Ofertowania i Przygotowania Produkcji',
      email: 'oferty@chemorozruch.pl',
      phone: '+48 33 847 43 20',
      phoneClean: '+48338474320',
      description: 'Wyceny, zapytania ofertowe, kosztorysowanie konstrukcji i instalacji',
      requiresConfirmation: false,
    },
    management: {
      department: 'Zarząd Spółki',
      email: 'biuro@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      requiresConfirmation: false,
    },
    plockBranch: {
      department: 'Oddział Płock',
      email: 'plock@chemorozruch.pl',
      phone: '+48 24 365 42 10',
      phoneClean: '+48243654210',
      description: 'Biuro techniczno-wykonawcze w Płocku',
      requiresConfirmation: false,
    },
    careers: {
      department: 'Dział Kadr i Rekrutacji',
      email: 'rekrutacja@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      requiresConfirmation: false,
    },
    privacyDPO: {
      department: 'Inspektor Ochrony Danych (RODO)',
      email: 'iod@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      requiresConfirmation: false,
    },
    whistleblower: {
      department: 'Zgłoszenia Wewnętrzne (Sygnaliści)',
      email: 'sygnalisci@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      requiresConfirmation: false,
    },
  },

  coordinates: {
    oswiecimHQ: {
      lat: 50.0385,
      lng: 19.2635,
    },
    plockBranch: {
      lat: 52.5855,
      lng: 19.6890,
    },
  },
};
