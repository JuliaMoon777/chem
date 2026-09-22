/**
 * Centralized Company Data Source of Truth for CHEMOROZRUCH
 *
 * STRICT GOVERNANCE:
 * - Every data field conforms to { value: T, requiresConfirmation: boolean }
 * - Unconfirmed fields (requiresConfirmation: true) are flagged for human verification
 *   and MUST NOT be output into Schema.org / JSON-LD structured data.
 * - Confirmed fields (requiresConfirmation: false) are safe for production SEO.
 */

export interface CompanyField<T = string> {
  value: T;
  requiresConfirmation: boolean;
  formatted?: string;
  notes?: string;
}

export interface AddressValue {
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  fullString: string;
}

export interface CoordinatesValue {
  lat: number;
  lng: number;
}

export type AddressField = CompanyField<AddressValue> & AddressValue;

export interface CompanyDataConfig {
  // Required Canonical Fields per Mandate
  legalCompanyName: CompanyField<string>;
  legalForm: CompanyField<string>;
  registeredAddress: AddressField;
  operationalAddress: AddressField;
  oswiecimAddress: AddressField;
  plockAddress: AddressField;
  plockBranchAddress: AddressValue;
  NIP: CompanyField<string>;
  REGON: CompanyField<string>;
  KRS: CompanyField<string>;
  mainPhone: CompanyField<string>;
  offerPhone: CompanyField<string>;
  plockPhone: CompanyField<string>;
  generalEmail: CompanyField<string>;
  offerEmail: CompanyField<string>;
  plockEmail: CompanyField<string>;
  rodoEmail: CompanyField<string>;
  sygnalisciEmail: CompanyField<string>;
  coordinates: CompanyField<{
    oswiecimHQ: CoordinatesValue;
    plockBranch: CoordinatesValue;
  }>;

  // Additional Verified Constants
  brandName: CompanyField<string>;
  foundingYear: CompanyField<number>;
  vatId: CompanyField<string>;

  // Convenience contacts map for UI components
  contacts: {
    generalHQ: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      description?: string;
      requiresConfirmation: boolean;
    };
    tendering: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      description?: string;
      requiresConfirmation: boolean;
    };
    management: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      requiresConfirmation: boolean;
    };
    plockBranch: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      description?: string;
      requiresConfirmation: boolean;
    };
    careers: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      requiresConfirmation: boolean;
    };
    privacyDPO: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      requiresConfirmation: boolean;
    };
    whistleblower: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      requiresConfirmation: boolean;
    };
  };

  // Backwards-compatible legacy accessors
  legalName: string;
  nip: string;
  nipFormatted: string;
  regon: string;
  krs: string;
}

export const COMPANY_DATA: CompanyDataConfig = {
  // 1. Legal Company Name — discrepancy exists between full historical registry name and abbreviated Sp. z o.o.
  legalCompanyName: {
    value: 'CHEMOROZRUCH Sp. z o.o.',
    requiresConfirmation: true,
    notes: 'Legal text in older bylaws mentions full form: Przedsiębiorstwo Budowy i Napraw Aparatury Chemicznej i Przemysłowej „CHEMOROZRUCH” Spółka z o.o.',
  },

  // 2. Legal Form — flagged to verify Sp. z o.o. vs S.A.
  legalForm: {
    value: 'Spółka z ograniczoną odpowiedzialnością (Sp. z o.o.)',
    requiresConfirmation: true,
    notes: 'Requires confirmation of current corporate registry status (Sp. z o.o. vs S.A.)',
  },

  // 3. Registered Address (Siedziba rejestrowa)
  registeredAddress: {
    value: {
      streetAddress: 'ul. Chemików 1',
      postalCode: '32-600',
      city: 'Oświęcim',
      country: 'Polska',
      fullString: 'ul. Chemików 1, 32-600 Oświęcim, Polska',
    },
    requiresConfirmation: true,
    notes: 'Address in formal KRS registration vs operational plant address at ul. Unii Europejskiej 10',
    streetAddress: 'ul. Chemików 1',
    postalCode: '32-600',
    city: 'Oświęcim',
    country: 'Polska',
    fullString: 'ul. Chemików 1, 32-600 Oświęcim, Polska',
  },

  // 4. Operational Address (Adres operacyjny / Zakład produkcyjny)
  operationalAddress: {
    value: {
      streetAddress: 'ul. Unii Europejskiej 10',
      postalCode: '32-600',
      city: 'Oświęcim',
      country: 'Polska',
      fullString: 'ul. Unii Europejskiej 10, 32-600 Oświęcim, Polska',
    },
    requiresConfirmation: true,
    notes: 'Operational manufacturing workshop and engineering base',
    streetAddress: 'ul. Unii Europejskiej 10',
    postalCode: '32-600',
    city: 'Oświęcim',
    country: 'Polska',
    fullString: 'ul. Unii Europejskiej 10, 32-600 Oświęcim, Polska',
  },

  // 5. Oświęcim Address
  oswiecimAddress: {
    value: {
      streetAddress: 'ul. Unii Europejskiej 10',
      postalCode: '32-600',
      city: 'Oświęcim',
      country: 'Polska',
      fullString: 'ul. Unii Europejskiej 10, 32-600 Oświęcim, Polska',
    },
    requiresConfirmation: true,
    streetAddress: 'ul. Unii Europejskiej 10',
    postalCode: '32-600',
    city: 'Oświęcim',
    country: 'Polska',
    fullString: 'ul. Unii Europejskiej 10, 32-600 Oświęcim, Polska',
  },

  // 6. Płock Address
  plockAddress: {
    value: {
      streetAddress: 'ul. Zglenickiego 44',
      postalCode: '09-400',
      city: 'Płock',
      country: 'Polska',
      fullString: 'ul. Zglenickiego 44, 09-400 Płock, Polska (Teren Kompleksu Przemysłowego PKN ORLEN)',
    },
    requiresConfirmation: true,
    notes: 'Discrepancy noted: Zglenickiego 44 vs Zglenickiego 50 F',
    streetAddress: 'ul. Zglenickiego 44',
    postalCode: '09-400',
    city: 'Płock',
    country: 'Polska',
    fullString: 'ul. Zglenickiego 44, 09-400 Płock, Polska (Teren Kompleksu Przemysłowego PKN ORLEN)',
  },

  // Convenience alias for branch address
  plockBranchAddress: {
    streetAddress: 'ul. Zglenickiego 44',
    postalCode: '09-400',
    city: 'Płock',
    country: 'Polska',
    fullString: 'ul. Zglenickiego 44, 09-400 Płock, Polska (Teren Kompleksu Przemysłowego PKN ORLEN)',
  },

  // 7. NIP
  NIP: {
    value: '5490001815',
    formatted: '549-00-01-815',
    requiresConfirmation: true,
    notes: 'Discrepancy noted with LegalModal legacy draft (549-000-24-41 vs 5490001815)',
  },

  // 8. REGON
  REGON: {
    value: '070494488',
    requiresConfirmation: true,
    notes: 'Discrepancy noted with LegalModal legacy draft (070440360 vs 070494488)',
  },

  // 9. KRS
  KRS: {
    value: '0000057211',
    requiresConfirmation: true,
    notes: 'Discrepancy noted with LegalModal legacy draft (0000088880 vs 0000057211)',
  },

  // 10. Main Phone
  mainPhone: {
    value: '+48 33 847 43 00',
    formatted: '+48 33 847 43 00',
    requiresConfirmation: true,
    notes: 'Discrepancy noted with legacy switchboard (+48 33 847 21 00 vs +48 33 847 43 00)',
  },

  // 11. Offer Phone
  offerPhone: {
    value: '+48 33 847 43 20',
    formatted: '+48 33 847 43 20',
    requiresConfirmation: true,
  },

  // 12. Płock Phone
  plockPhone: {
    value: '+48 24 365 42 10',
    formatted: '+48 24 365 42 10',
    requiresConfirmation: true,
    notes: 'Discrepancy noted (+48 24 365 42 10 vs +48 24 365 24 00)',
  },

  // 13. General Email
  generalEmail: {
    value: 'biuro@chemorozruch.pl',
    requiresConfirmation: true,
    notes: 'Discrepancy noted (biuro@chemorozruch.pl vs poczta@chemorozruch.pl)',
  },

  // 14. Offer Email
  offerEmail: {
    value: 'oferty@chemorozruch.pl',
    requiresConfirmation: true,
  },

  // 15. Płock Email
  plockEmail: {
    value: 'plock@chemorozruch.pl',
    requiresConfirmation: true,
  },

  // 16. RODO Email
  rodoEmail: {
    value: 'rodo@chemorozruch.pl',
    requiresConfirmation: true,
    notes: 'Discrepancy noted (rodo@chemorozruch.pl vs iod@chemorozruch.pl)',
  },

  // 17. Sygnaliści Email
  sygnalisciEmail: {
    value: 'sygnalisci@chemorozruch.pl',
    requiresConfirmation: true,
  },

  // 18. Coordinates
  coordinates: {
    value: {
      oswiecimHQ: { lat: 50.0385, lng: 19.2635 },
      plockBranch: { lat: 52.5855, lng: 19.6890 },
    },
    requiresConfirmation: true,
  },

  // 19. Brand Name (Confirmed)
  brandName: {
    value: 'CHEMOROZRUCH',
    requiresConfirmation: false,
  },

  // 20. Founding Year (Confirmed: 1971)
  foundingYear: {
    value: 1971,
    requiresConfirmation: false,
  },

  // VAT ID
  vatId: {
    value: 'PL5490001815',
    requiresConfirmation: true,
  },

  // Backwards-compatible shortcuts for UI components
  legalName: 'CHEMOROZRUCH Sp. z o.o.',
  nip: '5490001815',
  nipFormatted: '549-00-01-815',
  regon: '070494488',
  krs: '0000057211',

  contacts: {
    generalHQ: {
      department: 'Centrala / Siedziba Główna Oświęcim',
      email: 'biuro@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      description: 'Sekretariat i biuro zarządu',
      requiresConfirmation: true,
    },
    tendering: {
      department: 'Dział Ofertowania i Przygotowania Produkcji',
      email: 'oferty@chemorozruch.pl',
      phone: '+48 33 847 43 20',
      phoneClean: '+48338474320',
      description: 'Wyceny, zapytania ofertowe, kosztorysowanie konstrukcji i instalacji',
      requiresConfirmation: true,
    },
    management: {
      department: 'Zarząd Spółki',
      email: 'biuro@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      requiresConfirmation: true,
    },
    plockBranch: {
      department: 'Oddział Płock',
      email: 'plock@chemorozruch.pl',
      phone: '+48 24 365 42 10',
      phoneClean: '+48243654210',
      description: 'Biuro techniczno-wykonawcze w Płocku',
      requiresConfirmation: true,
    },
    careers: {
      department: 'Dział Kadr i Rekrutacji',
      email: 'rekrutacja@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      requiresConfirmation: true,
    },
    privacyDPO: {
      department: 'Inspektor Ochrony Danych (RODO)',
      email: 'rodo@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      requiresConfirmation: true,
    },
    whistleblower: {
      department: 'Zgłoszenia Wewnętrzne (Sygnaliści)',
      email: 'sygnalisci@chemorozruch.pl',
      phone: '+48 33 847 43 00',
      phoneClean: '+48338474300',
      requiresConfirmation: true,
    },
  },
};

/**
 * Generates a strictly compliant Schema.org Organization structured data object.
 * CRITICAL DIRECTIVE: ONLY confirmed fields (requiresConfirmation === false) are emitted.
 * Any unconfirmed field (address, NIP, KRS, phones, coordinates) is excluded.
 */
export function getSafeOrganizationJsonLd(): object {
  const org: Record<string, any> = {
    '@type': 'Organization',
    '@id': 'https://chemorozruch.pl/#organization',
    name: COMPANY_DATA.brandName.value,
    url: 'https://chemorozruch.pl/',
    logo: 'https://chemorozruch.pl/images/chemorozruch_plant_topdown_1787214324065.jpg',
    description: 'Inżynieria i wykonawstwo przemysłowe: konstrukcje stalowe, aparaty ciśnieniowe, montaż instalacji przemysłowych oraz remonty technologiczne.',
  };

  if (!COMPANY_DATA.legalCompanyName.requiresConfirmation) {
    org.legalName = COMPANY_DATA.legalCompanyName.value;
  }
  if (!COMPANY_DATA.foundingYear.requiresConfirmation) {
    org.foundingDate = `${COMPANY_DATA.foundingYear.value}`;
  }
  if (!COMPANY_DATA.NIP.requiresConfirmation) {
    org.taxID = COMPANY_DATA.NIP.value;
  }
  if (!COMPANY_DATA.vatId.requiresConfirmation) {
    org.vatID = COMPANY_DATA.vatId.value;
  }
  if (!COMPANY_DATA.generalEmail.requiresConfirmation) {
    org.email = COMPANY_DATA.generalEmail.value;
  }
  if (!COMPANY_DATA.mainPhone.requiresConfirmation) {
    org.telephone = COMPANY_DATA.mainPhone.value;
  }
  if (!COMPANY_DATA.registeredAddress.requiresConfirmation) {
    org.address = {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_DATA.registeredAddress.value.streetAddress,
      addressLocality: COMPANY_DATA.registeredAddress.value.city,
      postalCode: COMPANY_DATA.registeredAddress.value.postalCode,
      addressCountry: 'PL',
    };
  }

  return org;
}
