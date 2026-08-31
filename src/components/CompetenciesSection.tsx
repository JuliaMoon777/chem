import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Check, Compass, Layers, Wrench, ShieldCheck, Flame, Factory, HardHat, RefreshCw, Cpu, Activity } from 'lucide-react';
import { Language } from '../types';
import siteImages from '../assets/images';

interface CompetenciesSectionProps {
  currentLang: Language;
  onOpenInquiry: (initialSubject?: string) => void;
}

interface CompetenceTabContent {
  id: string;
  tabLabel: Record<Language, string>;
  stageBadge: Record<Language, string>;
  heading: Record<Language, string>;
  description: Record<Language, string>;
  keyPoints: Record<Language, string[]>;
  image: string;
  imageAlt: Record<Language, string>;
  ctaSubject: Record<Language, string>;
}

const COMPETENCE_TABS: CompetenceTabContent[] = [
  {
    id: 'projektowanie',
    tabLabel: {
      PL: 'Projektowanie',
      EN: 'Engineering',
      DE: 'Projektierung',
      UA: 'Проєктування',
    },
    stageBadge: {
      PL: 'PROJEKTOWANIE I INŻYNIERIA',
      EN: 'ENGINEERING & TECHNICAL DESIGN',
      DE: 'PROJEKTIERUNG & INGENIEURWESEN',
      UA: 'ПРОЄКТУВАННЯ ТА ІНЖЕНЕРІЯ',
    },
    heading: {
      PL: 'Dobre wykonanie zaczyna się od dobrego rozwiązania.',
      EN: 'Flawless execution begins with the right engineering solution.',
      DE: 'Eine fehlerfreie Ausführung beginnt mit der richtigen technischen Lösung.',
      UA: 'Якісне виконання починається з правильного технічного рішення.',
    },
    description: {
      PL: 'Wspieramy klientów już na etapie przygotowania technicznego inwestycji. Pomagamy przełożyć potrzeby zakładu na rozwiązania możliwe do wykonania, montażu i późniejszej eksploatacji.',
      EN: 'We support clients from the early technical preparation stage, translating industrial operational requirements into solutions ready for fabrication, assembly, and long-term service.',
      DE: 'Wir unterstützen Kunden bereits in der technischen Vorbereitungsphase und übersetzen betriebliche Anforderungen in montage- und fertigungsgerechte Industrielösungen.',
      UA: 'Ми підтримуємо клієнтів уже на етапі технічної підготовки, допомагаючи трансформувати потреби підприємства у надійні рішення для виготовлення, монтажу та експлуатації.',
    },
    keyPoints: {
      PL: [
        'Weryfikacja założeń technologicznych i specyfikacji instalacji',
        'Analiza wykonalności montażowej na czynnych obiektach',
        'Optymalizacja materiałowa i dobór sprawdzonych stopów stali',
        'Opracowanie dokumentacji wykonawczej i technologicznej',
      ],
      EN: [
        'Verification of technological assumptions and installation specs',
        'Constructability analysis within operating industrial plants',
        'Material optimization and alloy selection for aggressive media',
        'Preparation of fabrication and assembly documentation',
      ],
      DE: [
        'Prüfung technologischer Vorgaben und Anlagenspezifikationen',
        'Montagebarkeitsanalyse in bestehenden Industrieanlagen',
        'Werkstoffoptimierung und Auswahl beständiger Stahlgüten',
        'Erstellung von Ausführungs- und Fertigungsunterlagen',
      ],
      UA: [
        'Перевірка технологічних вимог та специфікацій установки',
        'Аналіз технологічності монтажу на діючих підприємствах',
        'Оптимізація матеріалів та підбір стійких марок сталі',
        'Розробка робочої та технологічної документації',
      ],
    },
    image: siteImages.discoveryAbout,
    imageAlt: {
      PL: 'Projektowanie i inżynieria przemysłowa CHEMOROZRUCH',
      EN: 'Industrial engineering and technical design CHEMOROZRUCH',
      DE: 'Industrielle Projektierung und Engineering CHEMOROZRUCH',
      UA: 'Промислове проєктування та інженерія CHEMOROZRUCH',
    },
    ctaSubject: {
      PL: 'Projektowanie i inżynieria instalacji',
      EN: 'Industrial Engineering and Technical Design',
      DE: 'Projektierung und Engineering von Industrieanlagen',
      UA: 'Проєктування та інженерія установок',
    },
  },
  {
    id: 'produkcja',
    tabLabel: {
      PL: 'Produkcja',
      EN: 'Fabrication',
      DE: 'Fertigung',
      UA: 'Виробництво',
    },
    stageBadge: {
      PL: 'PREFABRYKACJA I PRODUKCJA',
      EN: 'PREFABRICATION & MANUFACTURING',
      DE: 'VORFERTIGUNG & PRODUKTION',
      UA: 'ПРЕФАБРИКАЦІЯ ТА ВИРОБНИЦТВО',
    },
    heading: {
      PL: 'Zaplecze, które pozwala przejść od projektu do wykonania.',
      EN: 'In-house manufacturing capabilities to turn designs into reality.',
      DE: 'Eigene Fertigungskapazitäten für den direkten Übergang von der Planung zur Umsetzung.',
      UA: 'Власні виробничі потужності для переходу від проєкту до виготовлення.',
    },
    description: {
      PL: 'Realizujemy prefabrykację elementów instalacji przemysłowych, konstrukcji stalowych, rurociągów technologicznych oraz aparatury zgodnie z wymaganiami technicznymi projektu i obowiązującymi normami.',
      EN: 'We fabricate process piping spools, heavy steel structures, pressure vessels, and industrial heat exchangers according to precise project requirements, ISO 3834-2, and EN/ASME standards.',
      DE: 'Wir fertigen Rohrleitungsspools, schwere Stahlkonstruktionen, Druckbehälter und industrielle Wärmetauscher nach strengen Projektspezifikationen, ISO 3834-2 und EN/ASME-Normen.',
      UA: 'Виготовляємо вузли технологічних трубопроводів, сталеві конструкції, апарати та теплообмінники відповідно до проєктних вимог та стандартів якості.',
    },
    keyPoints: {
      PL: [
        'Konstrukcje stalowe, estakady i podpory rurociągowe wg EN 1090 (EXC3)',
        'Aparaty ciśnieniowe, zbiorniki ciśnieniowe i wymienniki przemysłowe',
        'Prefabrykacja rurociągów technologicznych (DN15 – DN2400)',
        'Zabezpieczenia antykorozyjne, śrutowanie i certyfikowane badania NDT',
      ],
      EN: [
        'Structural steel, pipe racks, and supports certified up to EN 1090 EXC3',
        'Pressure vessels, storage tanks, and industrial heat exchangers',
        'Process piping spool fabrication from DN15 up to DN2400',
        'Surface shot-blasting, multi-layer coating, and 100% NDT inspection',
      ],
      DE: [
        'Stahlkonstruktionen, Rohrbrücken und Tragsysteme nach EN 1090 (EXC3)',
        'Druckbehälter, Reaktorgefäße und industrielle Wärmetauscher',
        'Vorfertigung technologischer Rohrleitungen von DN15 bis DN2400',
        'Oberflächenbehandlung, Sandstrahlen und zertifizierte ZfP-Prüfungen',
      ],
      UA: [
        'Сталеві конструкції, естакади та опори за стандартом EN 1090 (EXC3)',
        'Апарати високого тиску, ємності та промислові теплообмінники',
        'Префабрикація трубопроводів діаметром від DN15 до DN2400',
        'Антикорозійний захист, дробоструминна обробка та неруйнівний контроль NDT',
      ],
    },
    image: siteImages.zapleczeHall,
    imageAlt: {
      PL: 'Prefabrykacja i produkcja aparatury przemysłowej CHEMOROZRUCH',
      EN: 'Fabrication and manufacturing base CHEMOROZRUCH',
      DE: 'Vorfertigung und Produktionswerk CHEMOROZRUCH',
      UA: 'Префабрикація та виробництво CHEMOROZRUCH',
    },
    ctaSubject: {
      PL: 'Prefabrykacja i produkcja aparatury / rurociągów',
      EN: 'Fabrication and Manufacturing of Process Equipment',
      DE: 'Fertigung von Apparaten und Rohrleitungen',
      UA: 'Виготовлення апаратів та трубопроводів',
    },
  },
  {
    id: 'montaz',
    tabLabel: {
      PL: 'Montaż',
      EN: 'Installation',
      DE: 'Montage',
      UA: 'Монтаж',
    },
    stageBadge: {
      PL: 'MONTAŻ PRZEMYSŁOWY',
      EN: 'MECHANICAL & SITE ASSEMBLY',
      DE: 'INDUSTRIEMONTAGE & BAUSTELLEN',
      UA: 'ПРОМИСЛОВИЙ МОНТАЖ',
    },
    heading: {
      PL: 'Produkcja i montaż w rękach jednego partnera.',
      EN: 'Fabrication and field assembly unified under one reliable partner.',
      DE: 'Fertigung und Industriemontage vereint in einer Hand.',
      UA: 'Виробництво та монтаж у руках одного надійного партнера.',
    },
    description: {
      PL: 'Łączymy własne zaplecze wykonawcze z doświadczeniem montażowym, wspierając realizację instalacji i urządzeń bezpośrednio w zakładach przemysłowych.',
      EN: 'We merge our manufacturing base with specialized on-site rigging and installation teams, assembling heavy equipment, process systems, and structural framing safely inside operational facilities.',
      DE: 'Wir verbinden eigene Vorfertigung mit routinierten Montageteams und errichten Prozessanlagen, Großapparate und Rohrleitungssysteme direkt in Industrie- und Chemiebetrieben.',
      UA: 'Ми поєднуємо власну виробничу базу з великим монтажним досвідом, виконуючи встановлення обладнання та систем безпосередньо на підприємствах.',
    },
    keyPoints: {
      PL: [
        'Montaż konstrukcji stalowych hal, estakad i wież technologicznych',
        'Montaż urządzeń przemysłowych, kolumn, reaktorów i wymienników',
        'Scalanie i spawanie rurociągów na obiektach chemicznych i rafineryjnych',
        'Certyfikowana kadra montażowa ze standardami BHP i SCC/VCA',
      ],
      EN: [
        'Heavy structural steel assembly, pipe trestles, and process towers',
        'Industrial machinery erection, columns, reactors, and exchangers',
        'On-site welding and piping tie-ins within chemical/refinery units',
        'Certified assembly workforce operating under strict EHS/SCC rules',
      ],
      DE: [
        'Montage von Stahltragwerken, Rohrbrücken und Verfahrenstürmen',
        'Aufstellung von Industriemaschinen, Kolonnen und Reaktionsbehältern',
        'Baustellenschweißung und Einbindung in Chemie- und Raffinerieanlagen',
        'Zertifiziertes Montagepersonal mit hohen HSE- und SCC-Standards',
      ],
      UA: [
        'Монтаж сталевих конструкцій, естакад та технологічних веж',
        'Встановлення промислового обладнання, колон, реакторів та теплообмінників',
        'Зварювання та підключення трубопроводів на хімічних підприємствах',
        'Сертифікований персонал з дотриманням найвищих стандартів безпеки',
      ],
    },
    image: siteImages.realizacjaRafineria,
    imageAlt: {
      PL: 'Montaż instalacji i konstrukcji stalowych CHEMOROZRUCH',
      EN: 'Industrial mechanical assembly CHEMOROZRUCH',
      DE: 'Industriemontage und Stahlbau CHEMOROZRUCH',
      UA: 'Промисловий монтаж установок CHEMOROZRUCH',
    },
    ctaSubject: {
      PL: 'Montaż konstrukcji stalowych i urządzeń przemysłowych',
      EN: 'Mechanical Assembly and Structural Installation',
      DE: 'Industriemontage von Stahlbau und Ausrüstung',
      UA: 'Монтаж сталевих конструкцій та промислового обладнання',
    },
  },
  {
    id: 'uruchomienie',
    tabLabel: {
      PL: 'Uruchomienie',
      EN: 'Commissioning',
      DE: 'Inbetriebnahme',
      UA: 'Пусконалагодження',
    },
    stageBadge: {
      PL: 'URUCHOMIENIE I WSPARCIE',
      EN: 'COMMISSIONING & STARTUP SUPPORT',
      DE: 'INBETRIEBNAHME & BETREUUNG',
      UA: 'ПУСКОНАЛАГОДЖЕННЯ ТА ПІДТРИМКА',
    },
    heading: {
      PL: 'Jesteśmy obecni również wtedy, gdy instalacja zaczyna pracować.',
      EN: 'We remain by your side as the plant comes online.',
      DE: 'Wir begleiten Sie verlässlich, wenn die Anlage in Betrieb geht.',
      UA: 'Ми поруч з вами під час запуску установки в роботу.',
    },
    description: {
      PL: 'Wspieramy klienta na etapie uruchomienia oraz w rozwiązywaniu zagadnień technicznych pojawiających się podczas wdrażania wykonanych instalacji i urządzeń.',
      EN: 'We provide technical assistance during cold and hot plant commissioning, addressing engineering and piping adjustments as systems reach operating pressure and temperature.',
      DE: 'Wir unterstützen den Kunden bei Kalt- und Warminbetriebnahmen und lösen technische Fragen beim Hochfahren der neu installierten Systeme zuverlässig.',
      UA: 'Забезпечуємо технічну підтримку під час пусконалагоджувальних робіт, оперативно вирішуючи інженерні завдання при виході установки на робочі параметри.',
    },
    keyPoints: {
      PL: [
        'Próby ciśnieniowe (hydrostatyczne i pneumatyczne) pod nadzorem UDT',
        'Płukanie chemiczne, przedmuchiwanie i pasywacja rurociągów',
        'Nadzór inżynierski podczas rozruchu technologicznego i prób gorących',
        'Asysta techniczna i natychmiastowe korekty montażowe na instalacji',
      ],
      EN: [
        'Hydrostatic and pneumatic pressure testing witnessed by notified bodies',
        'Chemical flushing, blowing, and passivation of process lines',
        'Engineering oversight during technological startup and hot trials',
        'On-site technical troubleshooting and prompt mechanical adjustments',
      ],
      DE: [
        'Hydrostatische und pneumatische Druckprüfungen mit Abnahmebehörden',
        'Chemisches Spülen, Ausblasen und Passivieren von Rohrleitungen',
        'Ingenieuraufsicht beim technologischen Hochfahren und Heißlauf',
        'Technische Assistenz und sofortige Anpassungen vor Ort',
      ],
      UA: [
        'Гідравлічні та пневматичні випробування під наглядом інспекції',
        'Хімічне промивання, продувка та пасивація технологічних ліній',
        'Інженерний нагляд під час технологічного пуску та гарячих випробувань',
        'Оперативний технічний супровід та налаштування на об’єкті',
      ],
    },
    image: siteImages.epcTurnkey,
    imageAlt: {
      PL: 'Uruchomienie instalacji przemysłowej CHEMOROZRUCH',
      EN: 'Plant startup and commissioning support CHEMOROZRUCH',
      DE: 'Inbetriebnahme von Industrieanlagen CHEMOROZRUCH',
      UA: 'Пусконалагодження та запуск установки CHEMOROZRUCH',
    },
    ctaSubject: {
      PL: 'Wsparcie przy rozruchu i próbach ciśnieniowych',
      EN: 'Commissioning and Startup Support',
      DE: 'Inbetriebnahme- und Prüfungsunterstützung',
      UA: 'Підтримка під час пусконалагодження та випробувань',
    },
  },
  {
    id: 'serwis',
    tabLabel: {
      PL: 'Serwis',
      EN: 'Maintenance',
      DE: 'Service',
      UA: 'Сервіс',
    },
    stageBadge: {
      PL: 'SERWIS I WSPARCIE TECHNICZNE',
      EN: 'INDUSTRIAL SERVICE & MAINTENANCE',
      DE: 'WARTUNG & TECHNISCHER SERVICE',
      UA: 'СЕРВІС ТА ТЕХНІЧНЕ ОБСЛУГОВУВАННЯ',
    },
    heading: {
      PL: 'Sprawność również po uruchomieniu.',
      EN: 'Ensuring operational excellence throughout the lifecycle.',
      DE: 'Betriebsbereitschaft und Zuverlässigkeit über den gesamten Lebenszyklus.',
      UA: 'Безперебійна робота обладнання після запуску.',
    },
    description: {
      PL: 'Nasze wsparcie nie musi kończyć się wraz z zakończeniem montażu. Prowadzimy prace serwisowe, remontowe i techniczne związane z eksploatacją instalacji oraz urządzeń przemysłowych.',
      EN: 'Our partnership extends far beyond installation. We carry out routine maintenance, scheduled inspections, emergency technical response, and plant upkeep to safeguard production continuity.',
      DE: 'Unsere Begleitung endet nicht mit der Montage. Wir führen planmäßige Wartungen, technische Revisionen und Instandhaltungsarbeiten für einen dauerhaft sicheren Anlagenbetrieb durch.',
      UA: 'Наша підтримка триває і після завершення монтажу. Ми проводимо сервісне обслуговування, планові огляди та технічний супровід промислового обладнання.',
    },
    keyPoints: {
      PL: [
        'Diagnostyka techniczna, rewizje wewnętrzne aparatów i badania grubości ścianek',
        'Wymiana wiązek rurkowych, uszczelnień i regeneracja armatury odcinającej',
        'Bieżące usuwanie nieszczelności i awarii rurociągów procesowych',
        'Ciągłe umowy serwisowe i stałe wsparcie utrzymania ruchu w zakładach',
      ],
      EN: [
        'Non-destructive testing, vessel internal inspection, and wall thickness measurement',
        'Tube bundle replacement, re-tubing, gasket overhauls, and valve reconditioning',
        'Prompt rectification of piping leaks and process equipment faults',
        'Long-term maintenance frame agreements for industrial plants',
      ],
      DE: [
        'ZfP-Prüfungen, Inneninspektionen von Behältern und Wanddickenmessungen',
        'Austausch von Rohrbündeln, Dichtungswechsel und Armaturenüberholung',
        'Beseitigung von Leckagen und Behebung akuter Rohrleitungsschäden',
        'Wartungsverträge und kontinuierlicher Instandhaltungsservice',
      ],
      UA: [
        'Технічна діагностика, внутрішній огляд апаратів та вимірювання товщини стінок',
        'Заміна трубних пучків, ущільнень та відновлення промислової арматури',
        'Оперативне усунення витоків та ремонт технологічних трубопроводів',
        'Довгострокові сервісні договори на обслуговування підприємств',
      ],
    },
    image: siteImages.armaturaValves,
    imageAlt: {
      PL: 'Serwis i wsparcie techniczne instalacji przemysłowych CHEMOROZRUCH',
      EN: 'Industrial service and plant maintenance CHEMOROZRUCH',
      DE: 'Instandhaltung und Service von Industrieanlagen CHEMOROZRUCH',
      UA: 'Сервіс та технічне обслуговування CHEMOROZRUCH',
    },
    ctaSubject: {
      PL: 'Prace serwisowe i obsługa utrzymania ruchu',
      EN: 'Plant Maintenance and Technical Service',
      DE: 'Wartungsservice und Instandhaltung',
      UA: 'Сервісне обслуговування та технічна підтримка',
    },
  },
  {
    id: 'awarie',
    tabLabel: {
      PL: 'Awarie',
      EN: 'Emergency Repairs',
      DE: 'Havariedienst',
      UA: 'Аварії',
    },
    stageBadge: {
      PL: 'SERWIS AWARYJNY I SZYBKA REAKCJA',
      EN: 'EMERGENCY SERVICE & RAPID RESPONSE',
      DE: 'HAVARIEDIENST & SCHNELLE REAKTION',
      UA: 'АВАРІЙНИЙ СЕРВІС ТА ШВИДКЕ РЕАГУВАННЯ',
    },
    heading: {
      PL: 'Gdy produkcja nie może czekać.',
      EN: 'When production cannot afford to wait.',
      DE: 'Wenn die Produktion nicht warten kann.',
      UA: 'Коли виробництво не може чекати.',
    },
    description: {
      PL: 'W przypadku awarii liczy się czas. Zespół CHEMOROZRUCH może podjąć interwencję bezpośrednio w zakładzie klienta, zdiagnozować problem i przeprowadzić niezbędne prace techniczne, aby możliwie szybko przywrócić sprawność instalacji lub urządzenia i ograniczyć przestój produkcji.',
      EN: 'In the event of a failure, time is critical. The CHEMOROZRUCH technical team can intervene directly at the client’s plant, diagnose the issue, and execute necessary technical works to restore installation functionality as quickly as possible and minimize production downtime.',
      DE: 'Im Havariefall zählt jede Minute. Das Team von CHEMOROZRUCH kann direkt im Kundenbetrieb intervenieren, das Problem diagnostizieren und die erforderlichen technischen Arbeiten durchführen, um die Betriebsbereitschaft der Anlage oder des Geräts schnellstmöglich wiederherzustellen und Stillstandszeiten zu begrenzen.',
      UA: 'У разі аварії час має вирішальне значення. Команда CHEMOROZRUCH може здійснити виїзд безпосередньо на об’єкт замовника, діагностувати проблему та виконати необхідні технічні роботи, щоб якнайшвидше відновити працездатність установки чи обладнання та обмежити простій виробництва.',
    },
    keyPoints: {
      PL: [
        'Szybka reakcja',
        'Wsparcie techniczne na miejscu',
        'Diagnostyka problemu',
        'Prace naprawcze',
      ],
      EN: [
        'Rapid response',
        'On-site technical support',
        'Problem diagnostics',
        'Repair works',
      ],
      DE: [
        'Schnelle Reaktionsbereitschaft',
        'Technischer Vor-Ort-Einsatz',
        'Problem- und Fehlerdiagnose',
        'Reparatur- und Instandsetzungsarbeiten',
      ],
      UA: [
        'Швидке реагування',
        'Технічна підтримка на місці',
        'Діагностика проблеми',
        'Ремонтні роботи',
      ],
    },
    image: siteImages.rurociagiPipes,
    imageAlt: {
      PL: 'Serwis awaryjny i diagnostyka instalacji przemysłowych CHEMOROZRUCH',
      EN: 'Emergency industrial service and diagnostics CHEMOROZRUCH',
      DE: 'Havariedienst und Anlagendiagnose CHEMOROZRUCH',
      UA: 'Аварійний сервіс та діагностика установок CHEMOROZRUCH',
    },
    ctaSubject: {
      PL: 'Pilna interwencja techniczna / awaria instalacji',
      EN: 'Emergency Breakdown Intervention / Rapid Service',
      DE: 'Dringender technischer Einsatz / Havariedienst',
      UA: 'Терміновий виїзд / аварійний ремонт установки',
    },
  },
  {
    id: 'modernizacje',
    tabLabel: {
      PL: 'Modernizacje',
      EN: 'Revamps',
      DE: 'Modernisierung',
      UA: 'Модернізація',
    },
    stageBadge: {
      PL: 'REMONTY I MODERNIZACJE',
      EN: 'REVAMPS & TURNAROUND OVERHAULS',
      DE: 'GENERALREPARATUREN & MODERNISIERUNG',
      UA: 'РЕМОНТИ ТА МОДЕРНІЗАЦІЯ',
    },
    heading: {
      PL: 'Nowe możliwości dla istniejących instalacji.',
      EN: 'Unlocking new performance for existing industrial assets.',
      DE: 'Neue Leistungsfähigkeit für bestehende Industrieanlagen.',
      UA: 'Нові можливості для діючих промислових установок.',
    },
    description: {
      PL: 'Realizujemy specjalistyczne prace remontowe oraz modernizacje instalacji przemysłowych, pomagając dostosowywać istniejącą infrastrukturę do aktualnych potrzeb technicznych i produkcyjnych.',
      EN: 'We perform specialized revamps, retrofits, and scheduled turnaround overhauls, adapting existing chemical, power, and refining infrastructure to higher efficiency and updated emission/safety standards.',
      DE: 'Wir führen spezialisierte Generalreparaturen, Stillstandsüberholungen und Modernisierungen durch, um bestehende Anlagen an neue Umwelt- und Produktionsanforderungen anzupassen.',
      UA: 'Виконуємо комплексні ремонтні та модернізаційні роботи, адаптуючи діючу інфраструктуру до сучасних вимог енергоефективності та продуктивності.',
    },
    keyPoints: {
      PL: [
        'Specjalistyczne prace remontowe podczas planowych postojów technologicznych (Turnaround)',
        'Remont i modernizacja instalacji przemysłowych bez zakłócania pracy sąsiednich jednostek',
        'Modernizacja instalacji przemysłowych pod kątem wydajności i norm środowiskowych',
        'Wymiana wyeksploatowanych węzłów rurociągowych, aparatów i konstrukcji nośnych',
      ],
      EN: [
        'Turnaround management and time-critical maintenance during scheduled shutdowns',
        'Retrofitting and upgrading process units without disrupting adjacent production lines',
        'Revamping industrial installations for increased throughput and environmental standards',
        'Replacing fatigued piping circuits, aged vessels, and structural steel supports',
      ],
      DE: [
        'Planmäßige Stillstandsarbeiten (Turnarounds) mit straffem Terminmanagement',
        'Umbau und Modernisierung ohne Unterbrechung benachbarter Betriebseinheiten',
        'Modernisierung von Industrieanlagen für höhere Leistung und Umweltstandards',
        'Austausch verschlissener Rohrleitungsabschnitte, Apparate und Tragwerke',
      ],
      UA: [
        'Спеціалізовані ремонтні роботи під час планових технологічних зупинок (Turnaround)',
        'Модернізація діючих технологічних ліній без зупинки суміжних виробництв',
        'Оновлення промислових установок для підвищення продуктивності та екологічності',
        'Заміна зношених ділянок трубопроводів, технологічних апаратів та опорних конструкцій',
      ],
    },
    image: siteImages.remontyOverhaul,
    imageAlt: {
      PL: 'Remonty i modernizacja instalacji przemysłowych CHEMOROZRUCH',
      EN: 'Revamps and turnaround overhauls CHEMOROZRUCH',
      DE: 'Generalreparaturen und Anlagenmodernisierung CHEMOROZRUCH',
      UA: 'Ремонти та модернізація промислових установок CHEMOROZRUCH',
    },
    ctaSubject: {
      PL: 'Remont i modernizacja instalacji przemysłowych',
      EN: 'Plant Revamp and Turnaround Modernization',
      DE: 'Modernisierung und Stillstandsreparatur von Anlagen',
      UA: 'Модернізація та капітальний ремонт установок',
    },
  },
];

export const CompetenciesSection: React.FC<CompetenciesSectionProps> = ({
  currentLang,
  onOpenInquiry,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>('projektowanie');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const tabRailRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeTab = COMPETENCE_TABS.find((t) => t.id === activeTabId) || COMPETENCE_TABS[0];

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTabId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTabId(tabId);
      setIsTransitioning(false);
    }, 150);

    // Ensure active tab button scrolls into view horizontally on mobile
    const btn = tabButtonsRef.current[tabId];
    if (btn && tabRailRef.current) {
      const rail = tabRailRef.current;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const railWidth = rail.offsetWidth;
      rail.scrollTo({
        left: btnLeft - railWidth / 2 + btnWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      const nextIndex = (index + 1) % COMPETENCE_TABS.length;
      handleTabChange(COMPETENCE_TABS[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (index - 1 + COMPETENCE_TABS.length) % COMPETENCE_TABS.length;
      handleTabChange(COMPETENCE_TABS[prevIndex].id);
    }
  };

  const sectionIntro = {
    eyebrow: {
      PL: 'KOMPLEKSOWE WSPARCIE PRZEMYSŁU',
      EN: 'COMPREHENSIVE INDUSTRIAL PARTNERSHIP',
      DE: 'GANZHEITLICHE INDUSTRIEUNTERSTÜTZUNG',
      UA: 'КОМПЛЕКСНА ПІДТРИМКА ПРОМИСЛОВОСТІ',
    },
    heading: {
      PL: 'Więcej niż wykonawca.',
      EN: 'More than a contractor.',
      DE: 'Mehr als ein reiner Auftragnehmer.',
      UA: 'Більше, ніж просто підрядник.',
    },
    intro: {
      PL: 'Łączymy kompetencje inżynieryjne, produkcyjne, montażowe i serwisowe. Dzięki temu możemy wspierać klienta na różnych etapach inwestycji — od przygotowania rozwiązania po jego późniejszą eksploatację i modernizację.',
      EN: 'We integrate engineering, fabrication, assembly, and maintenance competencies. This enables us to support industrial clients across all investment phases — from technical solution concept through to operation and modernization.',
      DE: 'Wir bündeln Ingenieurwesen, Vorfertigung, Montage und Service. Dadurch unterstützen wir unsere Kunden über den gesamten Lebenszyklus — von der Lösungskonzeption bis zur Instandhaltung und Modernisierung.',
      UA: 'Ми об’єднуємо інженерні, виробничі, монтажні та сервісні компетенції. Це дозволяє нам підтримувати замовника на всіх етапах інвестицій — від розробки рішення до експлуатації та модернізації.',
    },
    inquireBtn: {
      PL: 'Skonsultuj etap z inżynierem',
      EN: 'Consult this stage with our engineer',
      DE: 'Diesen Schritt mit einem Ingenieur besprechen',
      UA: 'Проконсультуватись з інженером',
    },
    scopeTitle: {
      PL: 'Kluczowy zakres kompetencji:',
      EN: 'Key competency scope:',
      DE: 'Zentrale Leistungsschwerpunkte:',
      UA: 'Ключовий обсяг компетенцій:',
    },
    swipeHint: {
      PL: 'Przesuń, aby zobaczyć kolejne etapy →',
      EN: 'Swipe to view further stages →',
      DE: 'Wischen für weitere Etappen →',
      UA: 'Проведіть, щоб побачити інші етапи →',
    },
  };

  return (
    <section
      id="kompetencje"
      className="relative w-full bg-[#FAF9F5] text-slate-900 py-16 sm:py-24 lg:py-28 overflow-hidden border-t border-slate-200"
    >
      {/* Background Subtle Technical Gridlines */}
      <div className="absolute inset-0 pointer-events-none opacity-25 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-slate-300" />
          <div className="w-px h-full bg-slate-300 hidden md:block" />
          <div className="w-px h-full bg-slate-300 hidden lg:block" />
          <div className="w-px h-full bg-slate-300" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* 1. SECTION INTRODUCTION (Concise, authoritative, no wall of text) */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/70 text-red-700 text-xs font-mono font-bold tracking-widest uppercase mb-3.5">
            <Compass className="w-3.5 h-3.5" />
            <span>{sectionIntro.eyebrow[currentLang]}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.12] font-poppins">
            {sectionIntro.heading[currentLang]}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {sectionIntro.intro[currentLang]}
          </p>
        </div>

        {/* 2. MAIN LARGE TABBED CARD */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
          
          {/* A. EDITORIAL TAB BAR (Clean horizontal rail with active red underline indicator) */}
          <div className="relative border-b border-slate-200 bg-[#FCFBF8]">
            <div
              ref={tabRailRef}
              role="tablist"
              aria-label={sectionIntro.heading[currentLang]}
              className="flex items-center overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 lg:px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {COMPETENCE_TABS.map((tab, idx) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => { tabButtonsRef.current[tab.id] = el; }}
                    role="tab"
                    id={`competence-tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`competence-panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleTabChange(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`relative flex items-center justify-center whitespace-nowrap py-4 sm:py-5 px-4 sm:px-6 min-h-[48px] text-sm sm:text-base font-semibold tracking-tight transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? 'text-slate-950 font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span className="font-poppins flex items-center gap-1.5">
                      {tab.id === 'awarie' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24] inline-block" />
                      )}
                      <span>{tab.tabLabel[currentLang]}</span>
                    </span>

                    {/* Active Tab Accent Line */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E31E24] shadow-[0_-1px_4px_rgba(227,30,36,0.3)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Scroll Indicator Fade */}
            <div className="sm:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FCFBF8] to-transparent pointer-events-none" />
          </div>

          {/* B. TAB CONTENT AREA (LEFT 45% Text | RIGHT 55% Large Photography) */}
          <div
            id={`competence-panel-${activeTab.id}`}
            role="tabpanel"
            aria-labelledby={`competence-tab-${activeTab.id}`}
            className={`p-6 sm:p-8 lg:p-10 transition-all duration-300 ease-out ${
              isTransitioning
                ? 'opacity-0 translate-y-2'
                : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT 45% (5 cols on lg, 6 cols on xl) — Typography & Competencies */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  {/* Stage Number & Badge */}
                  <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase text-red-600 mb-3">
                    {activeTab.stageBadge[currentLang]}
                  </span>

                  {/* Heading */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug font-poppins mb-4">
                    {activeTab.heading[currentLang]}
                  </h3>

                  {/* Suggested Concise Copy */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
                    {activeTab.description[currentLang]}
                  </p>

                  {/* 2-4 Verified Competence Bullet Points */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100 mb-8">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-1">
                      {sectionIntro.scopeTitle[currentLang]}
                    </span>
                    {activeTab.keyPoints[currentLang].map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Trigger */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(activeTab.ctaSubject[currentLang])}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[46px] rounded-xl bg-slate-900 hover:bg-red-600 text-white text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98]"
                  >
                    <span>{sectionIntro.inquireBtn[currentLang]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* RIGHT 55% (7 cols on lg, 6 cols on xl) — Large Industrial Photography */}
              <div className="lg:col-span-7">
                <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs group">
                  <img
                    src={activeTab.image}
                    alt={activeTab.imageAlt[currentLang]}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-2.5 text-xs text-slate-500 font-normal">
                  {activeTab.heading[currentLang]}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* 3. SEO HIDDEN SEMANTIC FALLBACK (Ensures all 6 tabs remain indexable by search crawlers) */}
        <div className="sr-only">
          {COMPETENCE_TABS.map((t) => (
            <article key={`seo-${t.id}`}>
              <h4>{t.stageBadge[currentLang]} - {t.tabLabel[currentLang]}</h4>
              <p>{t.heading[currentLang]}</p>
              <p>{t.description[currentLang]}</p>
              <ul>
                {t.keyPoints[currentLang].map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CompetenciesSection;
