import { NewsItem, CareerItem } from '../types/cms';

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Rozwój parku maszynowego w Zakładzie Wytwórczym w Oświęcimiu',
    slug: 'rozwoj-parku-maszynowego-w-zakladzie-wytworczym-w-oswiecimiu',
    excerpt: 'Wprowadzenie nowych technologii obróbki i prefabrykacji aparatów ciśnieniowych w Zakładzie Produkcyjnym CHEMOROZRUCH.',
    content: `
      <p>W ramach ciągłego doskonalenia procesów technologicznych i podnoszenia standardów jakościowych, Zakład Wytwórczy CHEMOROZRUCH w Oświęcimiu zoptymalizował zaplecze spawalnicze i prefabrykacyjne.</p>
      <h2>Kluczowe możliwości technologiczne</h2>
      <p>Nowe procedury pozwalają na jeszcze szybszą i precyzyjniejszą realizację wielkogabarytowych aparatów procesowych, zbiorników ciśnieniowych oraz rurociągów przesyłowych zgodnie z normami EN 13445 i EN 1090.</p>
      <ul>
        <li>Zwiększona wydajność obróbki mechanicznej</li>
        <li>Nadzór technologiczny IWE nad każdym etapem spawania</li>
        <li>Bezpośrednia kontrola jakości i badania NDT (VT, PT, MT, UT, RT)</li>
      </ul>
      <p>Zapraszamy do kontaktu z naszym działem technicznym w celu omówienia szczegółów technicznych planowanych inwestycji.</p>
    `,
    cover_image: '/images/o-firmie/chemorozruch-hala-produkcyjna.webp',
    image_alt: 'Park maszynowy Zakładu CHEMOROZRUCH w Oświęcimiu',
    publication_date: '2026-03-10',
    created_at: '2026-03-10T10:00:00.000Z',
    updated_at: '2026-03-10T10:00:00.000Z',
    status: 'published',
    seo_title: 'Rozwój parku maszynowego w Oświęcimiu | CHEMOROZRUCH',
    meta_description: 'Informacje o rozwoju technologicznym i możliwościach produkcyjnych Zakładu Wytwórczego CHEMOROZRUCH w Oświęcimiu.',
  },
  {
    id: 'news-2',
    title: 'Zakończenie prac modernizacyjnych instalacji przemysłowej',
    slug: 'zakonczenie-prac-modernizacyjnych-instalacji-przemyslowej',
    excerpt: 'Pomyślny odbiór techniczny kompleksowych prac montażowych i rurociągowych zrealizowanych w terminie.',
    content: `
      <p>Zespoły montażowe CHEMOROZRUCH pomyślnie sfinalizowały kompleksowe prace modernizacyjne instalacji technologicznej dla klienta z sektora chemicznego.</p>
      <h2>Zakres wykonanych prac</h2>
      <p>Realizacja obejmowała prefabrykację, montaż rurociągów technologicznych ze stali kwasoodpornej oraz montaż aparatury procesowej pod nadzorem jednostki notyfikowanej.</p>
      <p>Wszystkie próby ciśnieniowe oraz badania nieniszczące spoin zostały zakończone wynikiem pozytywnym, a instalacja została przekazana do bezpiecznego rozruchu technologicznego.</p>
    `,
    cover_image: '/images/o-firmie/chemorozruch-montaz-rurociagow.webp',
    image_alt: 'Prace montażowe instalacji przemysłowej CHEMOROZRUCH',
    publication_date: '2026-02-18',
    created_at: '2026-02-18T14:30:00.000Z',
    updated_at: '2026-02-18T14:30:00.000Z',
    status: 'published',
    seo_title: 'Modernizacja instalacji przemysłowej | CHEMOROZRUCH',
    meta_description: 'Podsumowanie realizacji prac remontowo-montażowych instalacji chemicznej przez CHEMOROZRUCH.',
  },
];

export const INITIAL_CAREERS: CareerItem[] = [
  {
    id: 'job-1',
    position: 'Monter Konstrukcji Stalowych i Rurociągów',
    slug: 'monter-konstrukcji-stalowych-i-rurociagow-oswiecim',
    location: 'Oświęcim / delegacje (woj. małopolskie, śląskie, mazowieckie)',
    intro: 'Poszukujemy doświadczonych monterów do realizacji projektów montażu konstrukcji stalowych, aparatów i rurociągów przemysłowych.',
    description: `
      <p>Przedsiębiorstwo Remontowo-Montażowe CHEMOROZRUCH Sp. z o.o. zatrudni osoby na stanowisko Montera do pracy przy realizacjach przemysłowych na obiektach energetycznych, chemicznych i rafineryjnych.</p>
    `,
    responsibilities: `
      <ul>
        <li>Montaż konstrukcji stalowych hal i estakad technologicznych</li>
        <li>Montaż oraz prefabrykacja rurociągów technologicznych (stal węglowa i kwasoodporna)</li>
        <li>Współpraca ze spawaczami i kadrą inżynieryjną</li>
        <li>Praca zgodnie z dokumentacją techniczną (izometryki) oraz zasadami BHP</li>
      </ul>
    `,
    requirements: `
      <ul>
        <li>Doświadczenie na stanowisku montera konstrukcji lub rurociągów min. 2 lata</li>
        <li>Umiejętność czytania rysunku technicznego i schematów izometrycznych</li>
        <li>Uprawnienia do pracy na wysokości pow. 3m</li>
        <li>Zaangażowanie, sumienność i gotowość do pracy w zespole</li>
      </ul>
    `,
    offer: `
      <ul>
        <li>Stabilne zatrudnienie w oparciu o umowę o pracę w firmie o ponad 50-letniej tradycji</li>
        <li>Atrakcyjne wynagrodzenie adekwatne do umiejętności i doświadczenia</li>
        <li>Zapewnione zakwaterowanie i transport przy pracach wyjazdowych</li>
        <li>Wszystkie niezbędne narzędzia pracy oraz markową odzież ochronną</li>
        <li>Możliwość podnoszenia kwalifikacji i zdobywania certyfikatów branżowych</li>
      </ul>
    `,
    application_information: `
      <p>Osoby zainteresowane prosimy o przesłanie CV na adres e-mail: <strong>kadry@chemorozruch.pl</strong> z dopiskiem w tytule: <em>„Monter – Rekrutacja”</em> lub kontakt telefoniczny z Działem Kadr: <strong>+48 33 843 00 81</strong>.</p>
    `,
    publication_date: '2026-03-01',
    created_at: '2026-03-01T09:00:00.000Z',
    updated_at: '2026-03-01T09:00:00.000Z',
    status: 'published',
    seo_title: 'Praca: Monter Konstrukcji i Rurociągów | CHEMOROZRUCH',
    meta_description: 'Oferta pracy na stanowisku Monter Konstrukcji Stalowych i Rurociągów w firmie CHEMOROZRUCH Sp. z o.o. Sprawdź wymagania i aplikuj.',
  },
  {
    id: 'job-2',
    position: 'Spawacz TIG / MAG (141 / 135)',
    slug: 'spawacz-tig-mag-oswiecim-plock',
    location: 'Oświęcim (Zakład Wytwórczy) / Płock',
    intro: 'Zatrudnimy wykwalifikowanych spawaczy metodami 141 (TIG) oraz 135 (MAG) z aktualnymi certyfikatami TUV/UDT.',
    description: `
      <p>W związku z dynamicznym rozwojem i nowymi kontraktami poszukujemy spawaczy do pracy na warsztacie produkcyjnym w Oświęcimiu oraz przy projektach montażowych w Oddziale w Płocku.</p>
    `,
    responsibilities: `
      <ul>
        <li>Spawanie rurociągów ciśnieniowych i aparatury procesowej ze stali ferrytycznych i austenitycznych</li>
        <li>Wykonywanie spoin poddawanych 100% badaniom nieniszczącym NDT (RT / UT / PT)</li>
        <li>Przestrzeganie instrukcji technologicznych spawania (WPS)</li>
      </ul>
    `,
    requirements: `
      <ul>
        <li>Aktualne certyfikaty spawalnicze PN-EN ISO 9606-1 (metoda 141 lub 135)</li>
        <li>Doświadczenie w spawaniu rur ciśnieniowych lub zbiorników</li>
        <li>Wysoka precyzja i dbałość o jakość wykonywanych połączeń</li>
      </ul>
    `,
    offer: `
      <ul>
        <li>Umowa o pracę w stabilnej spółce inżynieryjnej</li>
        <li>Bardzo dobre warunki finansowe ze stawką godzinową i premiami jakościowymi</li>
        <li>Praca w nowoczesnym zakładzie z pełnym zapleczem socjalnym i wentylacją spawalniczą</li>
        <li>Odnowienia certyfikatów i podnoszenie uprawnień na koszt pracodawcy</li>
      </ul>
    `,
    application_information: `
      <p>Aplikacje prosimy kierować na adres: <strong>kadry@chemorozruch.pl</strong> z tytułem: <em>„Spawacz – Rekrutacja”</em> lub o bezpośredni kontakt z kierownikiem spawalnictwa.</p>
    `,
    publication_date: '2026-02-25',
    created_at: '2026-02-25T11:00:00.000Z',
    updated_at: '2026-02-25T11:00:00.000Z',
    status: 'published',
    seo_title: 'Praca: Spawacz TIG / MAG | CHEMOROZRUCH',
    meta_description: 'Zatrudnimy spawacza TIG / MAG (141 / 135) w Zakładzie Wytwórczym CHEMOROZRUCH w Oświęcimiu i Płocku. Atrakcyjne warunki.',
  },
];
