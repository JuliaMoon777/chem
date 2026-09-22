import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, FileText, ArrowLeft, Printer, Building2, Mail, Phone } from 'lucide-react';
import { ChemorozruchLogo } from './ChemorozruchLogo';
import { COMPANY_DATA } from '../data/companyData';

export type LegalDocType = 'rodo' | 'sygnalisci' | 'polityka-prywatnosci' | null;

interface LegalModalProps {
  isOpen: boolean;
  docType: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, docType, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Scroll to top when docType changes
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen, docType]);

  if (!isOpen || !docType) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="legal-document-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-document-title"
    >
      {/* Background click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Large Accessible Modal Window */}
      <div className="relative w-full max-w-4xl h-full sm:h-[92vh] max-h-[1000px] bg-[#FAF9F5] sm:rounded-3xl border border-slate-200/90 shadow-[0_25px_70px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="flex-shrink-0 px-6 sm:px-8 py-4 sm:py-5 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              aria-label="Wróć do strony"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 flex-shrink-0">
                <ChemorozruchLogo className="w-full h-full" iconOnly={true} />
              </div>
              <div>
                <span className="font-poppins font-black text-xs sm:text-sm tracking-tight text-slate-950 block leading-tight">
                  {COMPANY_DATA.legalCompanyName.value}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  DOKUMENTACJA PRAWNA I COMPLIANCE
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Drukuj dokument"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drukuj</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 transition-colors cursor-pointer"
              aria-label="Zamknij dokument"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-10 text-slate-800 leading-relaxed font-sans overscroll-contain"
        >
          {docType === 'rodo' && <RodoLegalText />}
          {docType === 'sygnalisci' && <SygnalisciLegalText />}
          {docType === 'polityka-prywatnosci' && <PrivacyLegalText />}
        </div>

        {/* Bottom Verification Footer */}
        <div className="flex-shrink-0 px-6 sm:px-8 py-3.5 bg-slate-100/90 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dokument zatwierdzony przez Dział Prawny {COMPANY_DATA.legalCompanyName.value}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-red-600 font-bold hover:underline cursor-pointer"
          >
            Zamknij i wróć do serwisu
          </button>
        </div>

      </div>
    </div>
  );
};

// =========================================================================
// 1. OFICJALNY TEKST RODO (KLAUZULA INFORMACYJNA)
// =========================================================================
const RodoLegalText: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-6 text-slate-800">
    <div className="border-b border-slate-200 pb-5 mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold mb-3">
        <FileText className="w-3.5 h-3.5" />
        KLAUZULA INFORMACYJNA RODO
      </div>
      <h1 id="legal-document-title" className="font-poppins font-black text-2xl sm:text-3xl text-slate-950 tracking-tight leading-tight">
        Obowiązek Informacyjny RODO
      </h1>
      <p className="text-sm text-slate-600 mt-2 font-medium">
        Zgodnie z art. 13 i art. 14 Ogólnego Rozporządzenia o Ochronie Danych Osobowych (UE) 2016/679 (RODO)
      </p>
    </div>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        1. Administrator Danych Osobowych
      </h2>
      <p className="text-sm sm:text-base leading-relaxed">
        Administratorem Państwa danych osobowych jest{' '}
        <strong>{COMPANY_DATA.legalCompanyName.value}</strong> z siedzibą w Oświęcimiu, {COMPANY_DATA.registeredAddress.value.streetAddress}, {COMPANY_DATA.registeredAddress.value.postalCode} {COMPANY_DATA.registeredAddress.value.city}, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS: {COMPANY_DATA.KRS.value}, NIP: {COMPANY_DATA.NIP.formatted || COMPANY_DATA.NIP.value}, REGON: {COMPANY_DATA.REGON.value} (dalej: „Administrator” lub „Spółka”).
      </p>
      <div className="bg-slate-100/80 p-4 rounded-xl text-sm space-y-1.5 border border-slate-200/60 font-mono">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-600" />
          <span>Siedziba: {COMPANY_DATA.registeredAddress.value.fullString}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-slate-600" />
          <span>Kontakt w sprawach ochrony danych: <a href={`mailto:${COMPANY_DATA.rodoEmail.value}`} className="text-red-600 font-bold hover:underline">{COMPANY_DATA.rodoEmail.value}</a> / <a href={`mailto:${COMPANY_DATA.generalEmail.value}`} className="text-red-600 hover:underline">{COMPANY_DATA.generalEmail.value}</a></span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-slate-600" />
          <span>Telefon: {COMPANY_DATA.mainPhone.formatted || COMPANY_DATA.mainPhone.value}</span>
        </div>
      </div>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        2. Cele i Podstawy Prawne Przetwarzania Danych
      </h2>
      <p className="text-sm sm:text-base">
        Administrator przetwarza Państwa dane osobowe w następujących celach:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
        <li>
          <strong>Zawarcie i realizacja umów handlowych, kontraktów wykonawczych oraz zleceń produkcyjno-montażowych</strong> – na podstawie art. 6 ust. 1 lit. b RODO (niezbędność do wykonania umowy lub podjęcia działań przed jej zawarciem).
        </li>
        <li>
          <strong>Obsługa zapytań ofertowych, korespondencji bieżącej i zapytań przez formularz kontaktowy</strong> – na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora polegający na budowaniu relacji biznesowych i obsłudze klientów).
        </li>
        <li>
          <strong>Wypełnienie obowiązków prawnych ciążących na Administratorze</strong>, w szczególności wynikających z przepisów prawa podatkowego, rachunkowości oraz przepisów prawa budowlanego i dozoru technicznego (UDT, TUV) – na podstawie art. 6 ust. 1 lit. c RODO.
        </li>
        <li>
          <strong>Ustalenie, dochodzenie lub obrona przed roszczeniami</strong> – na podstawie art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora).
        </li>
        <li>
          <strong>Procesy rekrutacyjne i zatrudnienie</strong> – na podstawie art. 6 ust. 1 lit. c RODO (Kodeks pracy) oraz art. 6 ust. 1 lit. a RODO (zgoda kandydata na przetwarzanie dodatkowych danych).
        </li>
      </ul>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        3. Odbiorcy Danych Osobowych
      </h2>
      <p className="text-sm sm:text-base">
        Dane osobowe mogą być przekazywane podmiotom współpracującym ze Spółką wyłącznie w zakresie niezbędnym do realizacji wyżej wymienionych celów, w tym:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
        <li>Podwykonawcom, partnerom technologicznym i dostawcom usług IT;</li>
        <li>Bankom, instytucjom finansowym i ubezpieczeniowym;</li>
        <li>Operatorom pocztowym, kurierskim i spedycyjnym;</li>
        <li>Kancelariom prawnym i firmom audytorskim;</li>
        <li>Organom publicznym i instytucjom państwowym uprawnionym do uzyskania danych na podstawie bezwzględnie obowiązujących przepisów prawa.</li>
      </ul>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        4. Okres Przechowywania Danych
      </h2>
      <p className="text-sm sm:text-base">
        Państwa dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
        <li>W przypadku umów – przez czas trwania umowy oraz okres przedawnienia roszczeń z niej wynikających;</li>
        <li>W zakresie wymaganym przepisami prawa – przez okres nakazany przez przepisy prawa podatkowego i ustawy o rachunkowości (zwykle 5 lat od końca roku podatkowego);</li>
        <li>W przypadku korespondencji i zapytań – do czasu zakończenia korespondencji lub wniesienia skutecznego sprzeciwu;</li>
        <li>W przypadku zgody – do momentu jej cofnięcia.</li>
      </ul>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        5. Prawa Osób, Których Dane Dotyczą
      </h2>
      <p className="text-sm sm:text-base">
        Każdej osobie, której dane dotyczą, przysługują następujące prawa:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
        <li><strong>Prawo dostępu</strong> do treści swoich danych oraz otrzymania ich kopii (art. 15 RODO);</li>
        <li><strong>Prawo do sprostowania</strong> (poprawiania) swoich danych (art. 16 RODO);</li>
        <li><strong>Prawo do usunięcia danych</strong> („prawo do bycia zapomnianym”) w przypadkach określonych w art. 17 RODO;</li>
        <li><strong>Prawo do ograniczenia przetwarzania</strong> danych (art. 18 RODO);</li>
        <li><strong>Prawo do przenoszenia danych</strong> (art. 20 RODO);</li>
        <li><strong>Prawo do wniesienia sprzeciwu</strong> wobec przetwarzania danych na podstawie uzasadnionego interesu (art. 21 RODO);</li>
        <li><strong>Prawo do wniesienia skargi</strong> do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</li>
      </ul>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        6. Informacja o Zautomatyzowanym Podejmowaniu Decyzji
      </h2>
      <p className="text-sm sm:text-base">
        Państwa dane osobowe nie podlegają zautomatyzowanemu podejmowaniu decyzji, w tym profilowaniu. Dane nie są przekazywane do państw trzecich poza Europejski Obszar Gospodarczy.
      </p>
    </section>
  </div>
);

// =========================================================================
// 2. OFICJALNY TEKST PROCEDURY SYGNALISTÓW
// =========================================================================
const SygnalisciLegalText: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-6 text-slate-800">
    <div className="border-b border-slate-200 pb-5 mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold mb-3">
        <ShieldCheck className="w-3.5 h-3.5" />
        PROCEDURA ZGŁOSZEŃ WEWNĘTRZNYCH
      </div>
      <h1 className="font-poppins font-black text-2xl sm:text-3xl text-slate-950 tracking-tight leading-tight">
        Ochrona Sygnalistów i Zgłoszenia Wewnętrzne
      </h1>
      <p className="text-sm text-slate-600 mt-2 font-medium">
        Zgodnie z Ustawą z dnia 14 czerwca 2024 r. o ochronie sygnalistów oraz Dyrektywą Parlamentu Europejskiego i Rady (UE) 2019/1937
      </p>
    </div>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        1. Cel i Zakres Procedury
      </h2>
      <p className="text-sm sm:text-base leading-relaxed">
        Niniejsza Procedura Zgłoszeń Wewnętrznych określa zasady przyjmowania, weryfikacji i rozpatrywania zgłoszeń naruszeń prawa w spółce <strong>CHEMOROZRUCH Sp. z o.o.</strong> oraz środki ochrony osób dokonujących zgłoszenia (Sygnalistów), osób pomagających w dokonaniu zgłoszenia oraz osób powiązanych ze Sygnalistą.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        2. Kto Może Dokonać Zgłoszenia
      </h2>
      <p className="text-sm sm:text-base">
        Sygnalistą może być każda osoba fizyczna, która zgłasza informację o naruszeniu prawa uzyskaną w kontekście związanym z pracą, w tym:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
        <li>Pracownik oraz pracownik tymczasowy;</li>
        <li>Osoba świadcząca pracę na innej podstawie niż stosunek pracy (np. umowa zlecenia, B2B);</li>
        <li>Przedsiębiorca, wykonawca, podwykonawca lub dostawca;</li>
        <li>Członek organu osoby prawnej (zarząd, rada nadzorcza);</li>
        <li>Stażysta, praktykant lub wolontariusz;</li>
        <li>Kandydat do pracy w trakcie procesu rekrutacyjnego lub negocjacji umowy.</li>
      </ul>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        3. Zakres Przedmiotowy Zgłoszeń
      </h2>
      <p className="text-sm sm:text-base">
        Zgłoszeniu podlegają informacje o podejrzeniu naruszenia prawa dotyczące w szczególności:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200/50">
          • Zamówień publicznych i przetargów
        </div>
        <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200/50">
          • Bezpieczeństwa produktów i instalacji
        </div>
        <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200/50">
          • Ochrony środowiska i odpadów
        </div>
        <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200/50">
          • Bezpieczeństwa sieci i systemów IT
        </div>
        <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200/50">
          • Ochrony prywatności i danych osobowych
        </div>
        <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200/50">
          • Przeciwdziałania korupcji i nadużyciom
        </div>
        <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200/50">
          • Bezpieczeństwa i higieny pracy (BHP)
        </div>
        <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200/50">
          • Interesów finansowych Spółki i Skarbu Państwa
        </div>
      </div>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        4. Dedykowane Kanały Zgłoszeń Wewnętrznych
      </h2>
      <p className="text-sm sm:text-base">
        W celu zagwarantowania pełnej poufności i bezpieczeństwa, {COMPANY_DATA.legalCompanyName.value} ustanawia następujące niezależne kanały przyjmowania zgłoszeń:
      </p>

      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-red-50/50 border border-red-200/60 text-sm">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Mail className="w-4 h-4 text-red-600" />
            <span>Kanał elektroniczny (szyfrowany):</span>
          </div>
          <p className="text-slate-700">
            Wiadomość e-mail na dedykowany, poufny adres skrzynki Koordynatora ds. Naruszeń:{' '}
            <a href={`mailto:${COMPANY_DATA.sygnalisciEmail.value}`} className="text-red-600 font-bold hover:underline">
              {COMPANY_DATA.sygnalisciEmail.value}
            </a>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/80 text-sm">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-700" />
            <span>Kanał pocztowy (tradycyjny):</span>
          </div>
          <p className="text-slate-700 font-mono text-xs leading-relaxed">
            {COMPANY_DATA.legalCompanyName.value}<br />
            {COMPANY_DATA.registeredAddress.value.streetAddress}, {COMPANY_DATA.registeredAddress.value.postalCode} {COMPANY_DATA.registeredAddress.value.city}<br />
            z dopiskiem na kopercie: <strong>„ZGŁOSZENIE NARUSZENIA – POUFNE DO RĄK WŁASNYCH KOORDYNATORA DS. NARUSZEŃ”</strong>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/80 text-sm">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-700" />
            <span>Zgłoszenie ustne / spotkanie bezpośrednie:</span>
          </div>
          <p className="text-slate-700">
            Na wniosek Sygnalisty spotkanie bezpośrednie organizowane jest w terminie nie dłuższym niż 14 dni od dnia zgłoszenia wniosku.
          </p>
        </div>
      </div>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        5. Gwarancja Ochrony i Bezwzględny Zakaz Działań Odwetowych
      </h2>
      <p className="text-sm sm:text-base">
        Wobec Sygnalisty obowiązuje <strong>bezwzględny zakaz podejmowania jakichkolwiek działań odwetowych</strong>, prób lub gróźb takich działań, w szczególności:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
        <li>Wypowiedzenia lub rozwiązania stosunku pracy lub umowy cywilnoprawnej;</li>
        <li>Obniżenia wynagrodzenia, wstrzymania premii lub pominięcia przy awansie;</li>
        <li>Przeniesienia na niższe stanowisko, zmiany miejsca lub czasu pracy;</li>
        <li>Stosowania mobbingu, dyskryminacji, zastraszania lub wykluczenia;</li>
        <li>Wypowiedzenia umów handlowych lub wstrzymania zleceń.</li>
      </ul>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        6. Tryb Rozpatrywania Zgłoszeń i Terminy
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
        <li>
          <strong>Potwierdzenie przyjęcia:</strong> Koordynator przesyła Sygnaliście potwierdzenie przyjęcia zgłoszenia w terminie <strong>7 dni</strong> od jego otrzymania.
        </li>
        <li>
          <strong>Postępowanie wyjaśniające:</strong> Podejmowane są bezstronne i poufne działania następcze mające na celu weryfikację faktów i usunięcie naruszenia.
        </li>
        <li>
          <strong>Informacja zwrotna:</strong> Sygnalista otrzymuje informację o planowanych lub podjętych działaniach następczych oraz o powodach takich działań w terminie nieprzekraczającym <strong>3 miesięcy</strong> od dnia potwierdzenia przyjęcia zgłoszenia.
        </li>
      </ul>
    </section>
  </div>
);

// =========================================================================
// 3. OFICJALNY TEKST POLITYKI PRYWATNOŚCI & COOKIES
// =========================================================================
const PrivacyLegalText: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-6 text-slate-800">
    <div className="border-b border-slate-200 pb-5 mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold mb-3">
        <FileText className="w-3.5 h-3.5" />
        POLITYKA PRYWATNOŚCI I COOKIES
      </div>
      <h1 className="font-poppins font-black text-2xl sm:text-3xl text-slate-950 tracking-tight leading-tight">
        Polityka Prywatności Serwisu
      </h1>
      <p className="text-sm text-slate-600 mt-2 font-medium">
        Zasady korzystania z serwisu internetowego www.chemorozruch.pl oraz technologii plików cookies
      </p>
    </div>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        1. Informacje Ogólne
      </h2>
      <p className="text-sm sm:text-base leading-relaxed">
        Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazywanych przez Użytkowników w związku z korzystaniem z serwisu internetowego {COMPANY_DATA.legalCompanyName.value}
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        2. Pliki Cookies (Ciasteczka)
      </h2>
      <p className="text-sm sm:text-base">
        Serwis internetowy wykorzystuje pliki cookies (niewielkie pliki tekstowe zapisywane na urządzeniu końcowym Użytkownika) w celu:
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
        <li>Zapewnienia prawidłowego działania oraz bezpieczeństwa serwisu (cookies niezbędne);</li>
        <li>Zapamiętania preferencji Użytkownika (np. wybór języka: PL/EN/DE/UA);</li>
        <li>Tworzenia anonimowych statystyk oglądalności pomagających ulepszać strukturę serwisu.</li>
      </ul>
      <p className="text-sm sm:text-base">
        Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookies w swojej przeglądarce internetowej.
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="font-poppins font-bold text-base sm:text-lg text-slate-900 text-red-600">
        3. Kontakt z Administratorem
      </h2>
      <p className="text-sm sm:text-base">
        Wszelkie pytania i wnioski dotyczące ochrony prywatności należy kierować na adres e-mail:{' '}
        <a href="mailto:biuro@chemorozruch.pl" className="text-red-600 font-bold hover:underline">
          biuro@chemorozruch.pl
        </a>
      </p>
    </section>
  </div>
);

export default LegalModal;
