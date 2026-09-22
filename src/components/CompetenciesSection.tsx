import React, { useState, useRef } from 'react';
import { ArrowRight, CheckCircle2, Compass } from 'lucide-react';
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
    id: 'aparaty-zbiorniki',
    tabLabel: {
      PL: 'Aparaty i zbiorniki',
      EN: 'Process Vessels & Tanks',
      DE: 'Apparate & Behälter',
      UA: 'Апарати та ємності',
    },
    stageBadge: {
      PL: 'PRODUKCJA APARATURY PROCESOWEJ',
      EN: 'PROCESS EQUIPMENT MANUFACTURING',
      DE: 'FERTIGUNG VON PROZESSAPPARATEN',
      UA: 'ВИРОБНИЦТВО ПРОЦЕСНИХ АПАРАТІВ',
    },
    heading: {
      PL: 'Wytwarzanie aparatów i zbiorników procesowych',
      EN: 'Fabrication of Process Vessels and Industrial Tanks',
      DE: 'Fertigung von verfahrenstechnischen Apparaten und Behältern',
      UA: 'Виготовлення технологічних апаратів та ємностей',
    },
    description: {
      PL: 'W oparciu o zaplecze warsztatowe w Oświęcimiu oraz sprawdzonych partnerów projektowych realizujemy produkcję urządzeń ciśnieniowych i bezciśnieniowych – zarówno z dokumentacji własnej, jak i powierzonej przez Inwestora.',
      EN: 'Leveraging our manufacturing facility in Oświęcim and trusted engineering partners, we produce pressurized and atmospheric vessels from both internal and client-supplied technical documentation.',
      DE: 'Auf Basis unseres Fertigungswerks in Oświęcim und bewährter Projektierungspartner fertigen wir Druck- und drucklose Geräte sowohl nach eigener als auch nach vom Auftraggeber beigestellter Dokumentation.',
      UA: 'На базі виробничого цеху в Освенцимі та перевірених проєктних партнерів виготовляємо ємнісне та технологічне обладнання за власною або наданою замовником документацією.',
    },
    keyPoints: {
      PL: [
        'Aparaty procesowe i ciśnieniowe: reaktory, kolumny, wymienniki ciepła, filtry, mieszalniki.',
        'Zbiorniki przemysłowe: zbiorniki magazynowe, buforowe, procesowe oraz technologiczne.',
        'Certyfikacja i odbiory: pełne wykonawstwo pod nadzorem jednostek notyfikowanych wraz z wydaniem kompletnej deklaracji zgodności.',
      ],
      EN: [
        'Process and pressure equipment: reactors, distillation columns, heat exchangers, filters, and mixers.',
        'Industrial tanks: storage, buffer, process, and utility tanks.',
        'Certification and inspection: full execution under notified body surveillance with a comprehensive declaration of conformity.',
      ],
      DE: [
        'Verfahrens- und Druckapparate: Reaktoren, Kolonnen, Wärmetauscher, Filter und Mischer.',
        'Industriebehälter: Lager-, Puffer-, Prozess- und Technologiebehälter.',
        'Zertifizierung und Abnahmen: vollständige Fertigung unter Aufsicht benannter Stellen inklusive Konformitätserklärung.',
      ],
      UA: [
        'Процесні та напірні апарати: реактори, колони, теплообмінники, фільтри, змішувачі.',
        'Промислові резервуари: ємності для зберігання, буферні, процесні та технологічні резервуари.',
        'Сертифікація та приймання: повне виготовлення під наглядом нотифікованих органів з видачею декларації відповідності.',
      ],
    },
    image: siteImages.ofertaAparatyZbiorniki,
    imageAlt: {
      PL: 'CHEMOROZRUCH – Wytwarzanie aparatów i zbiorników procesowych',
      EN: 'CHEMOROZRUCH – Fabrication of Process Vessels and Industrial Tanks',
      DE: 'CHEMOROZRUCH – Fertigung von verfahrenstechnischen Apparaten und Behältern',
      UA: 'CHEMOROZRUCH – Виготовлення технологічних апаратів та ємностей',
    },
    ctaSubject: {
      PL: 'Wytwarzanie aparatów i zbiorników procesowych',
      EN: 'Process Vessels and Industrial Tanks Fabrication',
      DE: 'Fertigung von Apparaten und Prozessbehältern',
      UA: 'Виготовлення технологічних апаратів та ємностей',
    },
  },
  {
    id: 'montaz-remonty-rozruchy',
    tabLabel: {
      PL: 'Montaż, remonty i rozruchy',
      EN: 'Assembly, Overhauls & Start-up',
      DE: 'Montage, Instandhaltung & Inbetriebnahme',
      UA: 'Монтаж, ремонти та пусконалагодження',
    },
    stageBadge: {
      PL: 'KOMPLEKSOWA OBSŁUGA OBIEKTOWA',
      EN: 'FIELD SERVICES & MECHANICAL ASSEMBLY',
      DE: 'INDUSTRIEMONTAGE & ANLAGENSERVICE',
      UA: 'КОМПЛЕКСНЕ ОБСЛУГОВУВАННЯ ОБ’ЄКТІВ',
    },
    heading: {
      PL: 'Kompleksowy montaż, prace remontowe i rozruchy',
      EN: 'Comprehensive Assembly, Maintenance Overhauls and Commissioning',
      DE: 'Komplexe Industriemontage, Instandhaltung und Inbetriebnahme',
      UA: 'Комплексний монтаж, ремонтні роботи та пусконалагодження',
    },
    description: {
      PL: 'Zapewniamy pełną obsługę wykonawczą na obiektach przemysłowych – od montażu z prefabrykatów, przez prace modernizacyjne, po uruchomienie instalacji.',
      EN: 'We provide end-to-end site execution across industrial facilities — from prefabricated assembly and modernization revamps to full plant commissioning.',
      DE: 'Wir bieten ganzheitliche Baudienstleistungen auf Industrieanlagen – von der Vormontage über Modernisierungsmaßnahmen bis zur Inbetriebnahme.',
      UA: 'Забезпечуємо повне виконання робіт на промислових об’єктах — від монтажу префабрикованих вузлів до модернізації та запуску в роботу.',
    },
    keyPoints: {
      PL: [
        'Montaż obiektowy: instalacja zbiorników, aparatów procesowych, rurociągów oraz ciężkich konstrukcji stalowych.',
        'Rurociągi przemysłowe: prefabrykacja i montaż rurociągów parowych, technologicznych i przesyłowych ze stali węglowych i kwasoodpornych.',
        'Rozruchy i asysta techniczna: udział w rozruchach mechanicznych i technologicznych instalacji oraz przeprowadzanie prób ciśnieniowych i funkcjonalnych.',
        'Postoje i remonty: prace remontowe i modernizacyjne podczas planowanych wyłączeń zakładów.',
        'Armatura przemysłowa: montaż, przeglądy oraz regeneracja i serwis armatury.',
      ],
      EN: [
        'Field installation: erection of tanks, process vessels, piping, and heavy structural steelwork.',
        'Industrial piping: shop prefabrication and on-site assembly of steam, process, and transfer pipelines in carbon and stainless steels.',
        'Commissioning & technical support: active involvement in mechanical and process startups, conducting pressure and functional testing.',
        'Turnarounds & plant shutdowns: overhaul and revamp works during planned industrial turnaround windows.',
        'Industrial valves: installation, inspection, reconditioning, and maintenance service.',
      ],
      DE: [
        'Baustellenmontage: Aufstellung von Behältern, Prozessapparaten, Rohrleitungen und schweren Stahlbauten.',
        'Industrierohrleitungen: Vorfertigung und Montage von Dampf-, Prozess- und Förderleitungen aus Kohlenstoff- und Edelstahl.',
        'Inbetriebnahme & Begleitung: Mitwirkung an mechanischen und verfahrenstechnischen Inbetriebnahmen sowie Druckprüfungen.',
        'Stillstände & Revisionen: Instandsetzungs- und Modernisierungsarbeiten bei geplanten Werksstillständen.',
        'Industriearmaturen: Montage, Überholung, Regeneration und Service von Armaturen.',
      ],
      UA: [
        'Об’єктний монтаж: встановлення ємностей, процесних апаратів, трубопроводів та важких металоконструкцій.',
        'Промислові трубопроводи: префабрикація та монтаж парових, технологічних і магістральних трубопроводів.',
        'Пусконалагодження та техпідтримка: участь у механічних та технологічних пусках, гідровипробування.',
        'Зупиночні ремонти: виконання ремонтних та модернізаційних робіт під час планових зупинок заводів.',
        'Промислова арматура: монтаж, ревізія, регенерація та сервісне обслуговування.',
      ],
    },
    image: siteImages.ofertaMontazRemonty,
    imageAlt: {
      PL: 'CHEMOROZRUCH – Kompleksowy montaż, prace remontowe i rozruchy',
      EN: 'CHEMOROZRUCH – Comprehensive Assembly, Maintenance Overhauls and Commissioning',
      DE: 'CHEMOROZRUCH – Komplexe Industriemontage, Instandhaltung und Inbetriebnahme',
      UA: 'CHEMOROZRUCH – Комплексний монтаж, ремонтні роботи та пусконалагодження',
    },
    ctaSubject: {
      PL: 'Kompleksowy montaż, prace remontowe i rozruchy',
      EN: 'Mechanical Assembly, Overhauls and Plant Commissioning',
      DE: 'Industriemontage, Instandhaltung und Inbetriebnahme',
      UA: 'Монтаж, ремонтні роботи та пусконалагодження',
    },
  },
  {
    id: 'konstrukcje-stalowe',
    tabLabel: {
      PL: 'Konstrukcje stalowe',
      EN: 'Structural Steel',
      DE: 'Stahlkonstruktionen',
      UA: 'Сталеві конструкції',
    },
    stageBadge: {
      PL: 'KONSTRUKCJE PRZEMYSŁOWE I BUDOWLANE',
      EN: 'INDUSTRIAL & STRUCTURAL STEEL',
      DE: 'INDUSTRIELLER & BAULICHER STAHLBAU',
      UA: 'ПРОМИСЛОВІ ТА БУДІВЕЛЬНІ КОНСТРУКЦІЇ',
    },
    heading: {
      PL: 'Wytwarzanie i montaż konstrukcji stalowych',
      EN: 'Fabrication and Erection of Structural Steel',
      DE: 'Herstellung und Montage von Stahlkonstruktionen',
      UA: 'Виготовлення та монтаж сталевих конструкцій',
    },
    description: {
      PL: 'Realizujemy szeroki wachlarz konstrukcji przemysłowych oraz budowlanych, dopasowanych do infrastruktury Zakładu.',
      EN: 'We manufacture and erect a wide variety of industrial and structural steel frameworks tailored to plant operating conditions.',
      DE: 'Wir fertigen und montieren ein breites Spektrum an Industrie- und Gewerbestahlbauten, abgestimmt auf die Werkstruktur.',
      UA: 'Виготовляємо та монтуємо широкий спектр промислових та будівельних металоконструкцій під інфраструктуру підприємства.',
    },
    keyPoints: {
      PL: [
        'Hale i obiekty przemysłowe: wytwarzanie i montaż konstrukcji hal produkcyjnych, magazynowych i wiat technologicznych.',
        'Konstrukcje inżynieryjne: estakady rurociągowe, wieże, pomosty robocze, ciągi komunikacyjne oraz podparcia pod aparaty.',
        'Montaż i scalanie: sprawny montaż obiektowy z wykorzystaniem własnego nadzoru i sprzętu.',
      ],
      EN: [
        'Halls & industrial facilities: fabrication and assembly of production halls, warehouses, and process shelters.',
        'Civil & engineering steelwork: pipe bridges, towers, operating platforms, walkways, and vessel supports.',
        'Field assembly & splicing: efficient site erection utilizing certified in-house supervision and rigging equipment.',
      ],
      DE: [
        'Industriehallen & Bauten: Fertigung und Errichtung von Produktionshallen, Lagerhallen und Technologieüberdachungen.',
        'Ingenieurbauwerke: Rohrbrücken, Kolonnentürme, Bedienbühnen, Laufstege und Apparatelagerungen.',
        'Baustellenmontage: zügige Vor-Ort-Montage mit eigener Bauleitung und Hebezeugen.',
      ],
      UA: [
        'Промислові цехи та будівлі: виготовлення та монтаж каркасів виробничих цехів, складів та технологічних навісів.',
        'Інженерні конструкції: трубопровідні естакади, технологічні вежі, робочі майданчики, перехідні містки та опори під апарати.',
        'Монтаж та укрупнення: оперативне збирання на об’єкті із залученням власного нагляду та спецобладнання.',
      ],
    },
    image: siteImages.ofertaKonstrukcjeStalowe,
    imageAlt: {
      PL: 'CHEMOROZRUCH – Wytwarzanie i montaż konstrukcji stalowych',
      EN: 'CHEMOROZRUCH – Fabrication and Erection of Structural Steel',
      DE: 'CHEMOROZRUCH – Herstellung und Montage von Stahlkonstruktionen',
      UA: 'CHEMOROZRUCH – Виготовлення та монтаж сталевих конструкцій',
    },
    ctaSubject: {
      PL: 'Wytwarzanie i montaż konstrukcji stalowych',
      EN: 'Structural Steel Fabrication and Erection',
      DE: 'Stahlbau und Industriemontage',
      UA: 'Виготовлення та монтаж сталевих конструкцій',
    },
  },
  {
    id: 'obrobka-prefabrykacja',
    tabLabel: {
      PL: 'Obróbka i prefabrykacja',
      EN: 'Machining & Prefabrication',
      DE: 'Bearbeitung & Vorfertigung',
      UA: 'Обробка та префабрикація',
    },
    stageBadge: {
      PL: 'OBRÓBKA MECHANICZNA I FORMOWANIE STALI',
      EN: 'STEEL MACHINING & PLATE FORMING',
      DE: 'MECHANISCHE BEARBEITUNG & FORMUNG',
      UA: 'МЕХАНІЧНА ОБРОБКА ТА ФОРМУВАННЯ СТАЛІ',
    },
    heading: {
      PL: 'Usługi obróbki i prefabrykacji',
      EN: 'Steel Machining and Prefabrication Services',
      DE: 'Mechanische Bearbeitung und Vorfertigungsdienstleistungen',
      UA: 'Послуги з механічної обробки та префабрикації',
    },
    description: {
      PL: 'Wykorzystujemy własny park maszynowy w Oświęcimiu do świadczenia specjalistycznych usług obróbczych dla stali.',
      EN: 'We leverage our extensive machinery park in Oświęcim to deliver specialized steel machining and plate processing services.',
      DE: 'Wir nutzen unseren modernen Maschinenpark in Oświęcim zur Erbringung spezialisierter Stahl- und Blechbearbeitungsdienstleistungen.',
      UA: 'Використовуємо власний верстатний парк в Освенцимі для надання спеціалізованих послуг з механічної обробки та формування сталі.',
    },
    keyPoints: {
      PL: [
        'Walcowanie i zwijanie blach: gięcie i kształtowanie elementów walcowych i stożkowych na własnych walcach.',
        'Cięcie i obróbka ubytkowa: precyzyjne cięcie plazmowe oraz obróbka na wiertarko-frezarkach i giętarkach.',
        'Przygotowanie krawędzi: obróbka elementów pod procesy spawalnicze.',
      ],
      EN: [
        'Plate rolling & forming: bending and curving cylindrical and conical shell sections on in-house roll machines.',
        'Cutting & subtractive machining: high-precision plasma cutting, CNC milling, drilling, and press brake bending.',
        'Edge preparation: precision beveling and weld seam preparation for high-integrity joints.',
      ],
      DE: [
        'Blecheinrollung & Walzen: Runden und Formen zylindrischer und konischer Schüsse auf eigenen Walzmaschinen.',
        'Schneiden & Zerspanung: präziser Plasmazuschnitt sowie Bearbeitung auf Bohr-Fräswerken und Abkantpressen.',
        'Schweißkantenbearbeitung: gezielte Kantenanarbeitung für anspruchsvolle Schweißverbindungen.',
      ],
      UA: [
        'Вальцювання та згинання листів: гнуття циліндричних та конічних обичайок на власних вальцях.',
        'Порізка та механічна обробка: високоточний плазмовий розкрій, обробка на свердлильно-фрезерних верстатах та листогибах.',
        'Підготовка кромок: зняття фасок та обробка деталей під зварювальні процеси.',
      ],
    },
    image: siteImages.ofertaObrobkaPrefabrykacja,
    imageAlt: {
      PL: 'CHEMOROZRUCH – Usługi obróbki i prefabrykacji',
      EN: 'CHEMOROZRUCH – Steel Machining and Prefabrication Services',
      DE: 'CHEMOROZRUCH – Mechanische Bearbeitung und Vorfertigungsdienstleistungen',
      UA: 'CHEMOROZRUCH – Послуги з механічної обробки та префабрикації',
    },
    ctaSubject: {
      PL: 'Usługi obróbki i prefabrykacji stali',
      EN: 'Steel Machining and Prefabrication Services',
      DE: 'Mechanische Bearbeitung und Stahlvorfertigung',
      UA: 'Послуги з обробки та префабрикації сталі',
    },
  },
  {
    id: 'zabezpieczenia-antykorozyjne',
    tabLabel: {
      PL: 'Zabezpieczenia antykorozyjne',
      EN: 'Corrosion Protection',
      DE: 'Korrosionsschutz',
      UA: 'Антикорозійний захист',
    },
    stageBadge: {
      PL: 'ŚRUTOWANIE I MALOWANIE PRZEMYSŁOWE',
      EN: 'SHOT-BLASTING & INDUSTRIAL COATING',
      DE: 'STRAHLENTROSTUNG & INDUSTRIELACKIERUNG',
      UA: 'ДРОБОСТРУМИННА ОБРОБКА ТА ФАРБУВАННЯ',
    },
    heading: {
      PL: 'Zabezpieczenia antykorozyjne (Śrutowanie i Malowanie)',
      EN: 'Corrosion Protection (Shot-Blasting & Industrial Coating)',
      DE: 'Korrosionsschutz (Sandstrahlen & Industrielackierung)',
      UA: 'Антикорозійний захист (Дробоструминна обробка та фарбування)',
    },
    description: {
      PL: 'Posiadamy własną, wydzieloną infrastrukturę pozwalającą na nakładanie profesjonalnych powłok ochronnych w kontrolowanych warunkach.',
      EN: 'We operate dedicated climate-controlled facilities enabling the application of certified multi-layer industrial protective coatings.',
      DE: 'Wir verfügen über eine eigene, abgetrennte Infrastruktur für den professionellen Schutzschichtauftrag unter kontrollierten Umgebungsbedingungen.',
      UA: 'Маємо власну виділену інфраструктуру для нанесення професійних захисних покриттів у контрольованих виробничих умовах.',
    },
    keyPoints: {
      PL: [
        'Obróbka strumieniowo-ścierna: czyszczenie powierzchni stalowych do wymaganych stopni czystości we własnej komorze śrutowniczej.',
        'Malowanie przemysłowe: aplikacja powłok malarskich (zestawów epoksydowych, poliuretanowych, żaroodpornych i specjalistycznych) w dedykowanej malarni.',
        'Zabezpieczenia transportowe: przygotowanie gotowych elementów i konstrukcji do bezpiecznego transportu i magazynowania.',
      ],
      EN: [
        'Abrasive blasting: surface preparation to specified cleanliness grades (Sa 2.5 / Sa 3) inside our dedicated blast chamber.',
        'Industrial coating: spray application of epoxy, polyurethane, heat-resistant, and heavy-duty paint systems.',
        'Transport preservation: protective packaging and surface preservation for safe transit and prolonged jobsite storage.',
      ],
      DE: [
        'Druckluftstrahlen: Oberflächenreinigung bis zu den Reinheitsgraden Sa 2,5 / Sa 3 in der firmeneigenen Strahlkammer.',
        'Industriebeschichtung: Applikation von Epoxid-, Polyurethan-, hitzebeständigen und chemieresistenten Farbsystemen in der Lackiererei.',
        'Transportschutz: Vorbereitung fertiger Bauteile und Konstruktionen für sicheren Transport und Baustellenlagerung.',
      ],
      UA: [
        'Абразивоструминне очищення: очищення сталевих поверхонь до ступенів Sa 2.5 / Sa 3 у власній дробоструминній камері.',
        'Промислове фарбування: нанесення епоксидних, поліуретанових, термостійких та хімічно стійких захисних систем у малярній камері.',
        'Транспортне консервування: підготовка готових вузлів та конструкцій до безпечного транспортування і складування.',
      ],
    },
    image: siteImages.ofertaZabezpieczeniaAntykorozyjne,
    imageAlt: {
      PL: 'CHEMOROZRUCH – Zabezpieczenia antykorozyjne (Śrutowanie i Malowanie)',
      EN: 'CHEMOROZRUCH – Corrosion Protection (Shot-Blasting and Industrial Coating)',
      DE: 'CHEMOROZRUCH – Korrosionsschutz (Sandstrahlen und Industrielackierung)',
      UA: 'CHEMOROZRUCH – Антикорозійний захист (Дробоструминна обробка та фарбування)',
    },
    ctaSubject: {
      PL: 'Zabezpieczenia antykorozyjne, śrutowanie i malowanie',
      EN: 'Corrosion Protection and Industrial Painting',
      DE: 'Korrosionsschutz und Industrielackierung',
      UA: 'Антикорозійний захист та фарбування',
    },
  },
  {
    id: 'kontrola-jakosci-qaqc',
    tabLabel: {
      PL: 'Standard jakości (QA/QC)',
      EN: 'Quality Standards (QA/QC)',
      DE: 'Qualitätsstandards (QA/QC)',
      UA: 'Стандарти якості (QA/QC)',
    },
    stageBadge: {
      PL: 'NADZÓR INŻYNIERYJNY I PROCEDURY DOZOROWE',
      EN: 'ENGINEERING SUPERVISION & NOTIFIED INSPECTIONS',
      DE: 'INGENIEURÜBERWACHUNG & PRÜFVERFAHREN',
      UA: 'ІНЖЕНЕРНИЙ НАГЛЯД ТА ПРОЦЕДУРИ ДОЗОРУ',
    },
    heading: {
      PL: 'Standard jakości i procedury dozorowe (QA/QC)',
      EN: 'Quality Standards and Inspection Procedures (QA/QC)',
      DE: 'Qualitätsstandards und Überwachungsverfahren (QA/QC)',
      UA: 'Стандарти якості та наглядові процедури (QA/QC)',
    },
    description: {
      PL: 'Każdy realizowany przez nas projekt jest objęty bezkompromisowym nadzorem inżynieryjnym, stanowiącym gwarancję bezpiecznego odbioru przez jednostki dozorowe.',
      EN: 'Every project we execute is governed by rigorous engineering oversight, ensuring seamless inspection approval by notified statutory bodies.',
      DE: 'Jedes von uns durchgeführte Projekt unterliegt einer kompromisslosen ingenieurtechnischen Überwachung zur garantierten Abnahme durch Prüforganisationen.',
      UA: 'Кожен реалізований нами проєкт перебуває під суворим інженерним контролем, що гарантує успішне прийняття органами технічного нагляду.',
    },
    keyPoints: {
      PL: [
        'Nadzór spawalniczy: bezpośrednia kontrola procesów przez Głównego Spawalnika (IWE/EWE).',
        'Badania nieniszczące (NDT): pełna weryfikacja spoin (VT, PT, MT, UT, RT) w ramach realizowanych zleceń.',
        'Kompletacja dokumentacji: opracowanie pełnej dokumentacji jakościowej (Inspection Book) ze spójną historią materiałową (Świadectwa odbioru 3.1) i kwalifikacjami technologii spawania (WPS/WPQR).',
      ],
      EN: [
        'Welding supervision: direct process control by an in-house International/European Welding Engineer (IWE/EWE).',
        'Non-destructive testing (NDT): comprehensive joint inspection (VT, PT, MT, UT, RT) across all project workflows.',
        'Documentation compilation: complete quality dossier (Inspection Book) with 3.1 material certificates and qualified WPS/WPQR procedures.',
      ],
      DE: [
        'Schweißaufsicht: direkte Prozessüberwachung durch den verantwortlichen Schweißfachingenieur (IWE/EWE).',
        'Zerstörungsfreie Prüfungen (ZfP): vollständige Nahtprüfung (VT, PT, MT, UT, RT) im Rahmen der Auftragsabwicklung.',
        'Dokumentationserstellung: vollständiges Übergabedossier (Inspection Book) mit 3.1-Zeugnissen und qualifizierten WPS/WPQR-Verfahren.',
      ],
      UA: [
        'Зварювальний нагляд: безпосередній контроль процесів головним зварником (IWE/EWE).',
        'Неруйнівний контроль (NDT): повна верифікація швів методами VT, PT, MT, UT, RT у рамках замовлень.',
        'Комплектація документації: оформлення повного паспорта якості (Inspection Book) із сертифікатами 3.1 та кваліфікаціями WPS/WPQR.',
      ],
    },
    image: siteImages.ofertaKontrolaJakosciQaqc,
    imageAlt: {
      PL: 'CHEMOROZRUCH – Standard jakości i procedury dozorowe (QA/QC)',
      EN: 'CHEMOROZRUCH – Quality Standards and Inspection Procedures (QA/QC)',
      DE: 'CHEMOROZRUCH – Qualitätsstandards und Überwachungsverfahren (QA/QC)',
      UA: 'CHEMOROZRUCH – Стандарти якості та наглядові процедури (QA/QC)',
    },
    ctaSubject: {
      PL: 'Standard jakości i procedury dozorowe (QA/QC)',
      EN: 'Quality Standards and QA/QC Procedures',
      DE: 'Qualitätsstandards und Prüfverfahren QA/QC',
      UA: 'Стандарти якості та наглядові процедури',
    },
  },
];

export const CompetenciesSection: React.FC<CompetenciesSectionProps> = ({
  currentLang,
  onOpenInquiry,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(COMPETENCE_TABS[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabRailRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const activeTab = COMPETENCE_TABS.find((tab) => tab.id === activeTabId) || COMPETENCE_TABS[0];

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
      PL: 'ZAKRES USŁUG I MOŻLIWOŚCI',
      EN: 'SERVICES & TECHNICAL SCOPE',
      DE: 'LEISTUNGSSPEKTRUM & KAPAZITÄTEN',
      UA: 'ОБСЯГ ПОСЛУГ ТА МОЖЛИВОСТІ',
    },
    heading: {
      PL: 'Oferta',
      EN: 'Offer',
      DE: 'Angebot',
      UA: 'Послуги',
    },
    intro: {
      PL: 'Kompleksowa realizacja inwestycji przemysłowych – od wytwarzania aparatury i konstrukcji, przez montaż obiektowy i modernizacje, po specjalistyczne usługi warsztatowe i procedury odbiorowe.',
      EN: 'Comprehensive execution of industrial projects — from equipment fabrication and steel structures to on-site assembly, workshop processing, and regulatory inspection procedures.',
      DE: 'Ganzheitliche Realisierung industrieller Investitionen – von Apparate- und Stahlbau über Montage und Instandhaltung bis hin zu Fertigungsdienstleistungen und Abnahmeverfahren.',
      UA: 'Комплексна реалізація промислових проєктів — від виготовлення апаратів та конструкцій до монтажу, ремонту, механічної обробки та процедур нагляду.',
    },
    inquireBtn: {
      PL: 'Skonsultuj zakres z inżynierem',
      EN: 'Consult scope with our engineer',
      DE: 'Diesen Leistungsumfang anfragen',
      UA: 'Проконсультуватись з інженером',
    },
    scopeTitle: {
      PL: 'Zakres usług:',
      EN: 'Scope of services:',
      DE: 'Leistungsumfang:',
      UA: 'Обсяг послуг:',
    },
  };

  return (
    <section
      id="competencies-section"
      className="relative w-full bg-[#FAF9F5] text-slate-900 py-16 sm:py-24 lg:py-28 overflow-hidden border-t border-slate-200"
    >
      {/* Target anchor points for legacy or direct URL hash routing */}
      <div id="oferta" className="relative -top-24 pointer-events-none" />
      <div id="kompetencje" className="relative -top-24 pointer-events-none" />

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
        
        {/* 1. SECTION INTRODUCTION (Concise, authoritative, semantic H2 title: Oferta) */}
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
              className="flex items-center overflow-x-auto no-scrollbar scroll-smooth px-3 sm:px-6 lg:px-8"
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
                    className={`relative flex items-center justify-center whitespace-nowrap py-4 sm:py-5 px-3 sm:px-5 min-h-[48px] text-xs sm:text-sm lg:text-base font-semibold tracking-tight transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? 'text-slate-950 font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span className="font-poppins">
                      {tab.tabLabel[currentLang]}
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

          {/* B. TAB CONTENT AREA (LEFT 50% Text | RIGHT 50% Large Photography) */}
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
              
              {/* LEFT COLUMN (6 cols on lg) — Typography & Competencies */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Stage Number & Badge */}
                  <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase text-red-600 mb-3">
                    {activeTab.stageBadge[currentLang]}
                  </span>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug font-poppins mb-4 whitespace-pre-line">
                    {activeTab.heading[currentLang]}
                  </h3>

                  {/* Concise Copy */}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-6">
                    {activeTab.description[currentLang]}
                  </p>

                  {/* Scope of Services */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 mb-8">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-1.5">
                      {sectionIntro.scopeTitle[currentLang]}
                    </span>
                    {activeTab.keyPoints[currentLang].map((point, pIdx) => {
                      const colonIndex = point.indexOf(':');
                      const hasColon = colonIndex !== -1;
                      const titlePart = hasColon ? point.slice(0, colonIndex + 1) : '';
                      const descPart = hasColon ? point.slice(colonIndex + 1) : point;

                      return (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            {hasColon ? (
                              <>
                                <span className="font-semibold text-slate-950">{titlePart}</span>
                                <span className="text-slate-700">{descPart}</span>
                              </>
                            ) : (
                              <span className="text-slate-700">{point}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
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

              {/* RIGHT COLUMN (6 cols on lg) — Industrial Photography */}
              <div className="lg:col-span-6">
                <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs group">
                  <img
                    src={activeTab.image}
                    alt={activeTab.imageAlt[currentLang]}
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-2.5 text-xs text-slate-500 font-normal">
                  {activeTab.heading[currentLang].replace('\n', ' ')}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* 3. SEO SEMANTIC FALLBACK (Ensures all 6 services remain 100% crawlable & indexable by search bots) */}
        <div className="sr-only">
          {COMPETENCE_TABS.map((t) => (
            <article key={`seo-${t.id}`}>
              <h3>{t.heading[currentLang]}</h3>
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
