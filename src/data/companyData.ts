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

// 5. Central Company Data Source of Truth (Single Source of Truth)
export const companyData = {
  oswiecim: {
    address: 'ul. Lipowa 5',
    postalCode: '32-600',
    city: 'Oświęcim',
    country: 'Polska',
    fullString: 'ul. Lipowa 5, 32-600 Oświęcim',
  },
  plock: {
    address: 'ul. Witolda Zglenickiego 50 F',
    postalCode: '09-400',
    city: 'Płock',
    country: 'Polska',
    fullString: 'ul. Witolda Zglenickiego 50 F, 09-400 Płock',
  },
  phones: {
    sekretariat: '(0-33) 842-39-20',
    sekretariatTel: '+48338423920',
    mobile: '604 163 594',
    mobileTel: '+48604163594',
  },
  nip: '5490000173',
  regon: '070625487',
};

export const COMPANY_DATA: CompanyDataConfig = {
  // 1. Legal Company Name
  legalCompanyName: {
    value: 'CHEMOROZRUCH Sp. z o.o.',
    requiresConfirmation: false,
    notes: 'Legal company name',
  },

  // 2. Legal Form
  legalForm: {
    value: 'Spółka z ograniczoną odpowiedzialnością (Sp. z o.o.)',
    requiresConfirmation: false,
  },

  // 3. Registered Address (Siedziba rejestrowa Oświęcim)
  registeredAddress: {
    value: {
      streetAddress: companyData.oswiecim.address,
      postalCode: companyData.oswiecim.postalCode,
      city: companyData.oswiecim.city,
      country: companyData.oswiecim.country,
      fullString: `${companyData.oswiecim.address}, ${companyData.oswiecim.postalCode} ${companyData.oswiecim.city}`,
    },
    requiresConfirmation: false,
    streetAddress: companyData.oswiecim.address,
    postalCode: companyData.oswiecim.postalCode,
    city: companyData.oswiecim.city,
    country: companyData.oswiecim.country,
    fullString: `${companyData.oswiecim.address}, ${companyData.oswiecim.postalCode} ${companyData.oswiecim.city}`,
  },

  // 4. Operational Address (Adres operacyjny / Zakład produkcyjny)
  operationalAddress: {
    value: {
      streetAddress: companyData.oswiecim.address,
      postalCode: companyData.oswiecim.postalCode,
      city: companyData.oswiecim.city,
      country: companyData.oswiecim.country,
      fullString: `${companyData.oswiecim.address}, ${companyData.oswiecim.postalCode} ${companyData.oswiecim.city}`,
    },
    requiresConfirmation: false,
    streetAddress: companyData.oswiecim.address,
    postalCode: companyData.oswiecim.postalCode,
    city: companyData.oswiecim.city,
    country: companyData.oswiecim.country,
    fullString: `${companyData.oswiecim.address}, ${companyData.oswiecim.postalCode} ${companyData.oswiecim.city}`,
  },

  // 5. Oświęcim Address
  oswiecimAddress: {
    value: {
      streetAddress: companyData.oswiecim.address,
      postalCode: companyData.oswiecim.postalCode,
      city: companyData.oswiecim.city,
      country: companyData.oswiecim.country,
      fullString: `${companyData.oswiecim.address}, ${companyData.oswiecim.postalCode} ${companyData.oswiecim.city}`,
    },
    requiresConfirmation: false,
    streetAddress: companyData.oswiecim.address,
    postalCode: companyData.oswiecim.postalCode,
    city: companyData.oswiecim.city,
    country: companyData.oswiecim.country,
    fullString: `${companyData.oswiecim.address}, ${companyData.oswiecim.postalCode} ${companyData.oswiecim.city}`,
  },

  // 6. Płock Address
  plockAddress: {
    value: {
      streetAddress: companyData.plock.address,
      postalCode: companyData.plock.postalCode,
      city: companyData.plock.city,
      country: companyData.plock.country,
      fullString: `${companyData.plock.address}, ${companyData.plock.postalCode} ${companyData.plock.city}`,
    },
    requiresConfirmation: false,
    streetAddress: companyData.plock.address,
    postalCode: companyData.plock.postalCode,
    city: companyData.plock.city,
    country: companyData.plock.country,
    fullString: `${companyData.plock.address}, ${companyData.plock.postalCode} ${companyData.plock.city}`,
  },

  // Convenience alias for branch address
  plockBranchAddress: {
    streetAddress: companyData.plock.address,
    postalCode: companyData.plock.postalCode,
    city: companyData.plock.city,
    country: companyData.plock.country,
    fullString: `${companyData.plock.address}, ${companyData.plock.postalCode} ${companyData.plock.city}`,
  },

  // 7. NIP
  NIP: {
    value: companyData.nip,
    formatted: companyData.nip,
    requiresConfirmation: false,
  },

  // 8. REGON
  REGON: {
    value: companyData.regon,
    requiresConfirmation: false,
  },

  // 9. KRS
  KRS: {
    value: '0000057211',
    requiresConfirmation: false,
  },

  // 10. Main Phone
  mainPhone: {
    value: companyData.phones.sekretariat,
    formatted: companyData.phones.sekretariat,
    requiresConfirmation: false,
  },

  // 11. Offer Phone
  offerPhone: {
    value: companyData.phones.mobile,
    formatted: companyData.phones.mobile,
    requiresConfirmation: false,
  },

  // 12. Płock Phone
  plockPhone: {
    value: companyData.phones.sekretariat,
    formatted: companyData.phones.sekretariat,
    requiresConfirmation: false,
  },

  // 13. General Email
  generalEmail: {
    value: 'biuro@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 14. Offer Email
  offerEmail: {
    value: 'oferty@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 15. Płock Email
  plockEmail: {
    value: 'plock@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 16. RODO Email
  rodoEmail: {
    value: 'rodo@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 17. Sygnaliści Email
  sygnalisciEmail: {
    value: 'sygnalisci@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 18. Coordinates
  coordinates: {
    value: {
      oswiecimHQ: { lat: 50.0385, lng: 19.2635 },
      plockBranch: { lat: 52.5855, lng: 19.6890 },
    },
    requiresConfirmation: false,
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
    value: `PL${companyData.nip}`,
    requiresConfirmation: false,
  },

  // Backwards-compatible shortcuts for UI components
  legalName: 'CHEMOROZRUCH Sp. z o.o.',
  nip: companyData.nip,
  nipFormatted: companyData.nip,
  regon: companyData.regon,
  krs: '0000057211',

  contacts: {
    generalHQ: {
      department: 'Centrala / Siedziba Główna Oświęcim',
      email: 'biuro@chemorozruch.pl',
      phone: companyData.phones.sekretariat,
      phoneClean: companyData.phones.sekretariatTel,
      description: 'Sekretariat i biuro zarządu',
      requiresConfirmation: false,
    },
    tendering: {
      department: 'Dział Ofertowania i Przygotowania Produkcji',
      email: 'oferty@chemorozruch.pl',
      phone: companyData.phones.mobile,
      phoneClean: companyData.phones.mobileTel,
      description: 'Wyceny, zapytania ofertowe, kosztorysowanie konstrukcji i instalacji',
      requiresConfirmation: false,
    },
    management: {
      department: 'Zarząd Spółki',
      email: 'biuro@chemorozruch.pl',
      phone: companyData.phones.sekretariat,
      phoneClean: companyData.phones.sekretariatTel,
      requiresConfirmation: false,
    },
    plockBranch: {
      department: 'Oddział Płock',
      email: 'plock@chemorozruch.pl',
      phone: companyData.phones.sekretariat,
      phoneClean: companyData.phones.sekretariatTel,
      description: 'Biuro techniczno-wykonawcze w Płocku',
      requiresConfirmation: false,
    },
    careers: {
      department: 'Dział Kadr i Rekrutacji',
      email: 'rekrutacja@chemorozruch.pl',
      phone: companyData.phones.sekretariat,
      phoneClean: companyData.phones.sekretariatTel,
      requiresConfirmation: false,
    },
    privacyDPO: {
      department: 'Inspektor Ochrony Danych (RODO)',
      email: 'rodo@chemorozruch.pl',
      phone: companyData.phones.sekretariat,
      phoneClean: companyData.phones.sekretariatTel,
      requiresConfirmation: false,
    },
    whistleblower: {
      department: 'Zgłoszenia Wewnętrzne (Sygnaliści)',
      email: 'sygnalisci@chemorozruch.pl',
      phone: companyData.phones.sekretariat,
      phoneClean: companyData.phones.sekretariatTel,
      requiresConfirmation: false,
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
