export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  alt: string;
}

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: 'orlen',
    name: 'ORLEN S.A.',
    logo: '/images/klienci/orlen.svg',
    alt: 'ORLEN S.A.',
  },
  {
    id: 'synthos',
    name: 'SYNTHOS S.A.',
    logo: '/images/klienci/synthos.svg',
    alt: 'SYNTHOS S.A.',
  },
  {
    id: 'grupa-azoty-pulawy',
    name: 'Grupa Azoty PUŁAWY S.A.',
    logo: '/images/klienci/grupa-azoty-pulawy.svg',
    alt: 'Grupa Azoty PUŁAWY S.A.',
  },
  {
    id: 'rafineria-gdanska',
    name: 'Rafineria Gdańska sp. z o.o.',
    logo: '/images/klienci/rafineria-gdanska.svg',
    alt: 'Rafineria Gdańska sp. z o.o.',
  },
];
