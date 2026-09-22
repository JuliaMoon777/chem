export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  alt: string;
  hasRealLogo?: boolean;
}

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: 'orlen',
    name: 'ORLEN S.A.',
    logo: '/images/klienci/orlen.svg',
    alt: 'ORLEN S.A.',
    hasRealLogo: false, // Set to true once official SVG/PNG asset is placed in /public/images/klienci/
  },
  {
    id: 'synthos',
    name: 'SYNTHOS S.A.',
    logo: '/images/klienci/synthos.svg',
    alt: 'SYNTHOS S.A.',
    hasRealLogo: false,
  },
  {
    id: 'grupa-azoty-pulawy',
    name: 'Grupa Azoty PUŁAWY S.A.',
    logo: '/images/klienci/grupa-azoty-pulawy.svg',
    alt: 'Grupa Azoty PUŁAWY S.A.',
    hasRealLogo: false,
  },
  {
    id: 'rafineria-gdanska',
    name: 'Rafineria Gdańska sp. z o.o.',
    logo: '/images/klienci/rafineria-gdanska.svg',
    alt: 'Rafineria Gdańska sp. z o.o.',
    hasRealLogo: false,
  },
];
