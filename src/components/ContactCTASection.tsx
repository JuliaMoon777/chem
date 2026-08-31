import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types';
import { 
  Building2, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  ChevronDown,
  Copy, 
  Check, 
  Briefcase, 
  FileSpreadsheet, 
  Wrench, 
  Truck
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactCTASectionProps {
  currentLang: Language;
  onOpenLegal?: (doc: 'rodo' | 'sygnalisci' | 'polityka-prywatnosci') => void;
}

interface SpecialistContact {
  role: Record<Language, string>;
  name?: string;
  email: string;
  phone?: string;
}

interface DepartmentItem {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  email: string;
  phone: string;
  phoneDisplay: string;
  hours: Record<Language, string>;
  icon: React.ComponentType<{ className?: string }>;
  tag: Record<Language, string>;
  specialists?: SpecialistContact[];
}

const DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'handlowy',
    name: {
      PL: 'Dział Handlowy i Ofertowanie',
      EN: 'Commercial & Tendering Department',
      DE: 'Vertrieb & Angebotserstellung',
      UA: 'Комерційний відділ та Тендери',
    },
    description: {
      PL: 'Wyceny, zapytania ofertowe, przetargi i kalkulacje nowych realizacji.',
      EN: 'Project estimations, RFQs, commercial tenders and new industrial realizations.',
      DE: 'Kalkulationen, Ausschreibungen, Angebote und neue Industrieanlagen.',
      UA: 'Розрахунки вартості, запити комерційних пропозицій, тендери та нові реалізації.',
    },
    email: 'oferty@chemorozruch.pl',
    phone: '+48338474320',
    phoneDisplay: '+48 33 847 43 20',
    hours: {
      PL: 'Pn – Pt: 07:00 – 15:00',
      EN: 'Mon – Fri: 07:00 – 15:00',
      DE: 'Mo – Fr: 07:00 – 15:00',
      UA: 'Пн – Пт: 07:00 – 15:00',
    },
    icon: FileSpreadsheet,
    tag: {
      PL: 'WYCENY & OFERTY',
      EN: 'TENDERS & RFQ',
      DE: 'ANGEBOTE & VERTRIEB',
      UA: 'ТЕНДЕРИ ТА ОЦІНКА',
    },
    specialists: [
      {
        role: {
          PL: 'Kierownik Działu Handlowego',
          EN: 'Commercial Department Manager',
          DE: 'Leiter Vertrieb & Kalkulation',
          UA: 'Керівник комерційного відділу',
        },
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 847 43 20',
      },
      {
        role: {
          PL: 'Specjalista ds. Ofertowania i Kosztorysowania',
          EN: 'Cost Estimation & Bidding Specialist',
          DE: 'Kalkulations- und Angebotsspezialist',
          UA: 'Спеціаліст з кошторисів та пропозицій',
        },
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 847 43 22',
      },
    ],
  },
  {
    id: 'techniczny',
    name: {
      PL: 'Dział Techniczny i Realizacji',
      EN: 'Technical & Project Execution Department',
      DE: 'Technische Abteilung & Montage',
      UA: 'Технічний відділ та Реалізація',
    },
    description: {
      PL: 'Sprawy techniczne dotyczące realizowanych instalacji, montażu aparatury i rurociągów oraz odbiorów UDT.',
      EN: 'Technical engineering, mechanical assembly, process piping and technical inspections.',
      DE: 'Technische Betreuung von Industrieanlagen, Rohrleitungsbau, Apparate und TÜV/UDT-Abnahmen.',
      UA: 'Технічні питання щодо монтажу обладнання, трубопроводів та нагляду UDT.',
    },
    email: 'realizacje@chemorozruch.pl',
    phone: '+48338474340',
    phoneDisplay: '+48 33 847 43 40',
    hours: {
      PL: 'Pn – Pt: 07:00 – 15:00',
      EN: 'Mon – Fri: 07:00 – 15:00',
      DE: 'Mo – Fr: 07:00 – 15:00',
      UA: 'Пн – Пт: 07:00 – 15:00',
    },
    icon: Wrench,
    tag: {
      PL: 'INŻYNIERIA & MONTAŻ',
      EN: 'ENGINEERING & ASSEMBLY',
      DE: 'ENGINEERING & MONTAGE',
      UA: 'ІНЖЕНЕРІЯ ТА МОНТАЖ',
    },
    specialists: [
      {
        role: {
          PL: 'Główny Inżynier / Kierownik Realizacji',
          EN: 'Chief Engineer / Project Execution Manager',
          DE: 'Chefingenieur / Montageleiter',
          UA: 'Головний інженер / Керівник реалізації',
        },
        email: 'realizacje@chemorozruch.pl',
        phone: '+48 33 847 43 40',
      },
      {
        role: {
          PL: 'Inżynieria Spawalnictwa i Kontrola NDT',
          EN: 'Welding Engineering & NDT Quality Control',
          DE: 'Schweißfachingenieur & ZfP-Prüfung',
          UA: 'Інженерія зварювання та контроль NDT',
        },
        email: 'techniczny@chemorozruch.pl',
        phone: '+48 33 847 43 45',
      },
    ],
  },
  {
    id: 'centrala',
    name: {
      PL: 'Sekretariat / Centrala Zarządu',
      EN: 'Secretariat / Executive Office',
      DE: 'Sekretariat / Hauptverwaltung',
      UA: 'Секретаріат / Головний офіс',
    },
    description: {
      PL: 'Sprawy ogólne, kontakt z firmą, zarząd, kancelaria i korespondencja.',
      EN: 'General corporate matters, board affairs, registry and correspondence.',
      DE: 'Allgemeine Angelegenheiten, Unternehmensleitung, Vorstand und Korrespondenz.',
      UA: 'Загальні питання, зв’язок з компанією, керівництво та канцелярія.',
    },
    email: 'biuro@chemorozruch.pl',
    phone: '+48338474300',
    phoneDisplay: '+48 33 847 43 00',
    hours: {
      PL: 'Pn – Pt: 07:00 – 15:00',
      EN: 'Mon – Fri: 07:00 – 15:00',
      DE: 'Mo – Fr: 07:00 – 15:00',
      UA: 'Пн – Пт: 07:00 – 15:00',
    },
    icon: Building2,
    tag: {
      PL: 'CENTRALA & ZARZĄD',
      EN: 'HQ & BOARD',
      DE: 'HAUPTSITZ & VORSTAND',
      UA: 'ГОЛОВНИЙ ОФІС',
    },
    specialists: [
      {
        role: {
          PL: 'Sekretariat Zarządu & Kancelaria',
          EN: 'Executive Secretariat & General Registry',
          DE: 'Vorstandssekretariat & Poststelle',
          UA: 'Секретаріат керівництва та канцелярія',
        },
        email: 'biuro@chemorozruch.pl',
        phone: '+48 33 847 43 00',
      },
      {
        role: {
          PL: 'Dział Finansowo-Księgowy',
          EN: 'Finance & Accounting Department',
          DE: 'Finanz- und Rechnungswesen',
          UA: 'Фінансово-бухгалтерський відділ',
        },
        email: 'ksiegowosc@chemorozruch.pl',
        phone: '+48 33 847 43 10',
      },
    ],
  },
  {
    id: 'zaopatrzenie',
    name: {
      PL: 'Dział Zaopatrzenia i Logistyki',
      EN: 'Procurement & Logistics Department',
      DE: 'Einkauf & Materiallogistik',
      UA: 'Відділ постачання та Логістики',
    },
    description: {
      PL: 'Dostawy certyfikowanych materiałów hutniczych, armatury przemysłowej i transport wielkogabarytowy.',
      EN: 'Certified metallurgical supplies, industrial valves, heavy haulage and freight.',
      DE: 'Einkauf von Stahlwerkstoffen, Industriearmaturen und Schwerlasttransporte.',
      UA: 'Постачання сертифікованого металу, промислової арматури та спецтранспорт.',
    },
    email: 'zaopatrzenie@chemorozruch.pl',
    phone: '+48338474330',
    phoneDisplay: '+48 33 847 43 30',
    hours: {
      PL: 'Pn – Pt: 07:00 – 14:30',
      EN: 'Mon – Fri: 07:00 – 14:30',
      DE: 'Mo – Fr: 07:00 – 14:30',
      UA: 'Пн – Пт: 07:00 – 14:30',
    },
    icon: Truck,
    tag: {
      PL: 'DOSTAWY & SPEDYCJA',
      EN: 'SUPPLY & LOGISTICS',
      DE: 'EINKAUF & LOGISTIK',
      UA: 'ПОСТАЧАННЯ ТА ЛОГІСТИКА',
    },
    specialists: [
      {
        role: {
          PL: 'Dział Zakupów i Kontraktacji Materiałów',
          EN: 'Material Purchasing & Contracting',
          DE: 'Einkauf & Materialdisposition',
          UA: 'Відділ закупівель та контрактування',
        },
        email: 'zaopatrzenie@chemorozruch.pl',
        phone: '+48 33 847 43 30',
      },
      {
        role: {
          PL: 'Magazyn Główny & Przyjęcia Dostaw',
          EN: 'Central Warehouse & Inbound Logistics',
          DE: 'Hauptlager & Warenannahme',
          UA: 'Головний склад та прийом вантажів',
        },
        email: 'magazyn@chemorozruch.pl',
        phone: '+48 33 847 43 35',
      },
    ],
  },
  {
    id: 'plock',
    name: {
      PL: 'Oddział Realizacyjny Płock',
      EN: 'Płock Operational Branch',
      DE: 'Niederlassung Płock',
      UA: 'Відділення Плоцьк',
    },
    description: {
      PL: 'Realizacja projektów i montażu przemysłowego na terenie kompleksu rafineryjnego PKN ORLEN i Polski centralnej.',
      EN: 'Industrial and petrochemical installation works within the PKN ORLEN refining complex and Central Poland.',
      DE: 'Montage- und Instandhaltungsprojekte auf dem Gelände des Raffineriekomplexes PKN ORLEN und Zentralpolen.',
      UA: 'Промисловий монтаж на території нафтопереробного комплексу PKN ORLEN та центральної Польщі.',
    },
    email: 'plock@chemorozruch.pl',
    phone: '+48243652400',
    phoneDisplay: '+48 24 365 24 00',
    hours: {
      PL: 'Pn – Pt: 07:00 – 15:00',
      EN: 'Mon – Fri: 07:00 – 15:00',
      DE: 'Mo – Fr: 07:00 – 15:00',
      UA: 'Пн – Пт: 07:00 – 15:00',
    },
    icon: Building2,
    tag: {
      PL: 'ODDZIAŁ PŁOCK',
      EN: 'PŁOCK BRANCH',
      DE: 'FILIALE PŁOCK',
      UA: 'ВІДДІЛЕННЯ ПЛОЦЬК',
    },
    specialists: [
      {
        role: {
          PL: 'Kierownik Oddziału Płock',
          EN: 'Płock Branch Operations Manager',
          DE: 'Niederlassungsleiter Płock',
          UA: 'Керівник відділення Плоцьк',
        },
        email: 'plock@chemorozruch.pl',
        phone: '+48 24 365 24 00',
      },
    ],
  },
];

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({ currentLang }) => {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' }
        );
      }

      if (listRef.current) {
        tl.fromTo(
          listRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  const handleCopy = (text: string, label: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2200);
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedDept((prev) => (prev === id ? null : id));
  };

  const labels = {
    eyebrow: {
      PL: 'KONTAKT & DZIAŁY',
      EN: 'CONTACT & DEPARTMENTS',
      DE: 'KONTAKT & ABTEILUNGEN',
      UA: 'КОНТАКТИ ТА ВІДДІЛИ',
    },
    heading: {
      PL: 'Bezpośredni kontakt z działami',
      EN: 'Direct contact with our departments',
      DE: 'Direkter Kontakt zu den Fachabteilungen',
      UA: 'Прямий зв’язок з відділами',
    },
    subheading: {
      PL: 'Wybierz właściwy dział, aby nawiązać bezpośredni kontakt inżynierski. Kliknięcie adresu e-mail uruchamia program pocztowy.',
      EN: 'Select the relevant department to establish direct engineering contact. Clicking the email opens your email application.',
      DE: 'Wählen Sie die zuständige Abteilung für den direkten Kontakt. Ein Klick auf die E-Mail öffnet Ihr E-Mail-Programm.',
      UA: 'Оберіть відповідний відділ для прямого інженерного зв’язку. Натискання на e-mail відкриває поштовий клієнт.',
    },
    writeEmailBtn: {
      PL: 'Napisz e-mail',
      EN: 'Write email',
      DE: 'E-Mail schreiben',
      UA: 'Написати e-mail',
    },
    phoneLabel: {
      PL: 'Telefon',
      EN: 'Phone',
      DE: 'Telefon',
      UA: 'Телефон',
    },
    detailsBtn: {
      PL: 'Szczegóły działu',
      EN: 'Department details',
      DE: 'Abteilungsdetails',
      UA: 'Деталі відділу',
    },
    closeDetailsBtn: {
      PL: 'Zwiń szczegóły',
      EN: 'Hide details',
      DE: 'Details ausblenden',
      UA: 'Згорнути деталі',
    },
  };

  return (
    <section
      id="kontakt-cta"
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F5] text-slate-900 overflow-hidden py-16 sm:py-20 lg:py-24 border-t border-slate-200"
    >
      {/* Background Architectural Subtle Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-slate-300/60" />
          <div className="w-px h-full bg-slate-300/40 hidden md:block" />
          <div className="w-px h-full bg-slate-300/40 hidden lg:block" />
          <div className="w-px h-full bg-slate-300/60" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* 1. SECTION HEADER (Spacious, clean typographic hierarchy) */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/70 text-red-700 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{labels.eyebrow[currentLang]}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.12] font-poppins">
            {labels.heading[currentLang]}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {labels.subheading[currentLang]}
          </p>
        </div>

        {/* 2. EDITORIAL DEPARTMENT CONTACT LIST */}
        <div
          ref={listRef}
          className="border-t border-slate-200 divide-y divide-slate-200/90 mb-16 sm:mb-20"
        >
          {DEPARTMENTS.map((dept) => {
            const isExpanded = expandedDept === dept.id;
            const hasSpecialists = Boolean(dept.specialists && dept.specialists.length > 0);

            return (
              <div
                key={dept.id}
                className="group relative transition-colors duration-200 hover:bg-white/70"
              >
                {/* Main Row */}
                <div className="py-6 sm:py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left Column: Department info & Credentials */}
                  <div className="flex-1 min-w-0 pr-0 lg:pr-8">
                    
                    {/* Tag badge & hours */}
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-slate-100 group-hover:bg-red-50 text-slate-600 group-hover:text-red-700 transition-colors">
                        {dept.tag[currentLang]}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{dept.hours[currentLang]}</span>
                      </span>
                    </div>

                    {/* Department Title (Shifts 3-5px on desktop hover) */}
                    <h3 className="font-poppins font-bold text-xl sm:text-2xl lg:text-[26px] text-slate-950 tracking-tight transition-transform duration-200 transform group-hover:translate-x-1.5">
                      <a
                        href={`mailto:${dept.email}`}
                        className="hover:text-red-600 transition-colors"
                        aria-label={`${labels.writeEmailBtn[currentLang]} - ${dept.name[currentLang]}`}
                      >
                        {dept.name[currentLang]}
                      </a>
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl">
                      {dept.description[currentLang]}
                    </p>

                    {/* Contact Credentials (Email & Phone) */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono">
                      
                      {/* Email Link */}
                      <div className="inline-flex items-center gap-2 min-h-[44px]">
                        <a
                          href={`mailto:${dept.email}`}
                          className="inline-flex items-center gap-2 text-slate-900 group-hover:text-red-600 font-bold hover:underline transition-colors py-1"
                          aria-label={`Email: ${dept.email}`}
                        >
                          <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <span>{dept.email}</span>
                        </a>
                        <button
                          type="button"
                          onClick={(e) => handleCopy(dept.email, `${dept.id}-email`, e)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 rounded transition-colors cursor-pointer"
                          title="Kopiuj email"
                          aria-label="Kopiuj email"
                        >
                          {copiedText === `${dept.id}-email` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Phone Link */}
                      <div className="inline-flex items-center gap-2 min-h-[44px]">
                        <a
                          href={`tel:${dept.phone}`}
                          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-950 font-medium transition-colors py-1"
                          aria-label={`Telefon: ${dept.phoneDisplay}`}
                        >
                          <Phone className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors flex-shrink-0" />
                          <span>{dept.phoneDisplay}</span>
                        </a>
                        <button
                          type="button"
                          onClick={(e) => handleCopy(dept.phoneDisplay, `${dept.id}-phone`, e)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 rounded transition-colors cursor-pointer"
                          title="Kopiuj telefon"
                          aria-label="Kopiuj telefon"
                        >
                          {copiedText === `${dept.id}-phone` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                    </div>

                  </div>

                  {/* Right Column: Actions (Mailto button + Optional Expand) */}
                  <div className="flex items-center gap-3 self-start lg:self-center flex-shrink-0 pt-2 lg:pt-0">
                    
                    {/* Action button: Napisz e-mail → */}
                    <a
                      href={`mailto:${dept.email}`}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[46px] rounded-xl bg-slate-900 hover:bg-red-600 text-white text-sm font-semibold tracking-wide transition-all duration-200 group-hover:shadow-md active:scale-[0.98]"
                      aria-label={`${labels.writeEmailBtn[currentLang]} - ${dept.name[currentLang]}`}
                    >
                      <span>{labels.writeEmailBtn[currentLang]}</span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </a>

                    {/* Optional Expand Toggle (if specialists exist) */}
                    {hasSpecialists && (
                      <button
                        type="button"
                        onClick={(e) => toggleExpand(dept.id, e)}
                        className={`inline-flex items-center justify-center p-3 min-h-[46px] min-w-[46px] rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all cursor-pointer ${
                          isExpanded ? 'bg-slate-100 text-slate-900 border-slate-300' : ''
                        }`}
                        title={isExpanded ? labels.closeDetailsBtn[currentLang] : labels.detailsBtn[currentLang]}
                        aria-label={isExpanded ? labels.closeDetailsBtn[currentLang] : labels.detailsBtn[currentLang]}
                        aria-expanded={isExpanded}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-red-600' : ''
                          }`}
                        />
                      </button>
                    )}

                  </div>

                </div>

                {/* Collapsible Specialists Section */}
                {hasSpecialists && isExpanded && (
                  <div className="pb-6 pt-2 pl-0 sm:pl-4 border-t border-slate-100 animate-fade-in">
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                      <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-1">
                        {currentLang === 'PL'
                          ? 'Bezpośrednie kontakty specjalistyczne:'
                          : currentLang === 'EN'
                          ? 'Direct specialist contacts:'
                          : currentLang === 'DE'
                          ? 'Direkte Fachkontakte:'
                          : 'Прямі контакти спеціалістів:'}
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {dept.specialists?.map((spec, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200/60 text-xs font-mono space-y-1.5">
                            <span className="font-bold text-slate-900 font-sans block text-sm">
                              {spec.role[currentLang]}
                            </span>
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                              <a
                                href={`mailto:${spec.email}`}
                                className="text-slate-700 hover:text-red-600 underline font-semibold transition-colors"
                              >
                                {spec.email}
                              </a>
                            </div>
                            {spec.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                <a
                                  href={`tel:${spec.phone.replace(/\s+/g, '')}`}
                                  className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                  {spec.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContactCTASection;
