import { Language } from '../types';
import siteImages from '../assets/images';

export interface ServicePageData {
  slug: string;
  canonicalUrl: string;
  meta: Record<Language, {
    title: string;
    description: string;
    keywords: string;
    h1: string;
    subtitle: string;
  }>;
  heroImage: string;
  targetKeywords: string[];
  breadcrumbs: Record<Language, { home: string; section: string; current: string }>;
  overview: Record<Language, {
    lead: string;
    paragraphs: string[];
  }>;
  scopeOfWork: Record<Language, {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      details: string[];
    }>;
  }>;
  technicalCapabilities: Record<Language, {
    title: string;
    specs: Array<{ label: string; value: string }>;
    certifications: string[];
  }>;
  materialsAndNorms: Record<Language, {
    title: string;
    materials: string[];
    standards: string[];
  }>;
  relatedRealizations: Record<Language, {
    title: string;
    projects: Array<{
      title: string;
      clientSector: string;
      scope: string;
    }>;
  }>;
  cta: Record<Language, {
    title: string;
    description: string;
    btnText: string;
    contactPerson: string;
    email: string;
    phone: string;
  }>;
}

export const SERVICE_PAGES_DATA: Record<string, ServicePageData> = {
  'konstrukcje-stalowe': {
    slug: 'konstrukcje-stalowe',
    canonicalUrl: 'https://chemorozruch.pl/konstrukcje-stalowe/',
    heroImage: siteImages.stalStructures,
    targetKeywords: [
      'konstrukcje stalowe',
      'montaż konstrukcji stalowych',
      'prefabrykacja konstrukcji stalowych',
      'estakady rurociągowe',
      'konstrukcje wsporcze aparatów',
      'EN 1090-2 EXC3',
      'ISO 3834-2',
    ],
    meta: {
      PL: {
        title: 'Konstrukcje stalowe – Prefabrykacja i montaż konstrukcji stalowych | CHEMOROZRUCH',
        description: 'CHEMOROZRUCH oferuje kompleksową prefabrykację oraz montaż konstrukcji stalowych dla przemysłu chemicznego, energetyki i hutnictwa. Certyfikat EN 1090-2 EXC3 i ISO 3834-2.',
        keywords: 'konstrukcje stalowe, montaż konstrukcji stalowych, prefabrykacja konstrukcji stalowych, estakady rurociągowe, konstrukcje wsporcze aparatów, firma montażowa',
        h1: 'Konstrukcje stalowe – Prefabrykacja i profesjonalny montaż konstrukcji stalowych',
        subtitle: 'Kompleksowe wykonawstwo konstrukcji nośnych, estakad przemysłowych oraz wież technologicznych z pełną certyfikacją EN 1090-2 (klasa EXC3).',
      },
      EN: {
        title: 'Structural Steelwork & Industrial Steel Assembly | CHEMOROZRUCH',
        description: 'CHEMOROZRUCH delivers turnkey fabrication and erection of industrial structural steel for chemical plants, refineries, and power generation. Certified EN 1090-2 EXC3.',
        keywords: 'structural steelwork, steel structure erection, pipe rack fabrication, industrial steel mounting, EN 1090-2 EXC3, ISO 3834-2',
        h1: 'Industrial Structural Steelwork & Certified Assembly',
        subtitle: 'Turnkey fabrication, heavy steel erection, pipe racks, and technical support structures with full European certification.',
      },
      DE: {
        title: 'Stahlbau & Industriemontage von Stahlkonstruktionen | CHEMOROZRUCH',
        description: 'CHEMOROZRUCH fertigt und montiert schwere Industriestahlbauten, Rohrbrücken und Trägerkonstruktionen nach EN 1090-2 EXC3 und ISO 3834-2.',
        keywords: 'Stahlbau Industrie, Montage Stahlkonstruktionen, Rohrbrücken Vorfertigung, EN 1090-2 EXC3, ISO 3834-2',
        h1: 'Industrieller Stahlbau & Montage von Stahlkonstruktionen',
        subtitle: 'Komplette Vorfertigung und Montage von Rohrbrücken, Apparatetraggerüsten und Industriehallen nach europäischen Normen.',
      },
      UA: {
        title: 'Металоконструкції – Виготовлення та монтаж сталевих конструкцій | CHEMOROZRUCH',
        description: 'CHEMOROZRUCH здійснює виготовлення та монтаж металоконструкцій для хімічної, нафтогазової та енергетичної промисловості. Сертифікація EN 1090-2 EXC3.',
        keywords: 'металоконструкції, монтаж сталевих конструкцій, виготовлення металоконструкцій, трубні естакади, опорні конструкції, EN 1090-2 EXC3',
        h1: 'Металоконструкції – Префабрикація та промисловий монтаж',
        subtitle: 'Комплексне виготовлення та монтаж несучих металоконструкцій, трубних естакад та технологічних опор із європейською сертифікацією.',
      },
    },
    breadcrumbs: {
      PL: { home: 'Strona Główna', section: 'Oferta', current: 'Konstrukcje stalowe' },
      EN: { home: 'Home', section: 'Offer', current: 'Structural Steelwork' },
      DE: { home: 'Startseite', section: 'Angebot', current: 'Stahlbau' },
      UA: { home: 'Головна', section: 'Послуги', current: 'Металоконструкції' },
    },
    overview: {
      PL: {
        lead: 'CHEMOROZRUCH posiada ponad 50 lat udokumentowanego doświadczenia w wytwarzaniu oraz montażu konstrukcji stalowych pracujących w najbardziej wymagających warunkach przemysłu chemicznego, petrochemicznego i energetycznego.',
        paragraphs: [
          'Dysponujemy własnymi halami produkcyjnymi w Oświęcimiu wyposażonymi w suwnice do 16 ton, zaawansowane 3D wycinarki plazmowo-tlenowe, komory śrutownicze oraz malarnię hydrodynamiczną. Pozwala to na realizację skomplikowanych obiektów inżynieryjnych od etapu weryfikacji dokumentacji warsztatowej aż po ostateczny montaż na obiekcie.',
          'Wszystkie nasze procesy spawalnicze i wytwórcze podlegają rygorystycznej kontroli wg normy PN-EN 1090-2 (klasa wykonania EXC3) oraz PN-EN ISO 3834-2, nadzorowanej przez własny personel badań nieniszczących NDT (VT, PT, MT, UT).',
        ],
      },
      EN: {
        lead: 'CHEMOROZRUCH brings over 50 years of certified engineering excellence in heavy industrial structural steel fabrication and erection for chemical, petrochemical, and power generation plants.',
        paragraphs: [
          'Our manufacturing facilities in Oświęcim are equipped with 16t overhead cranes, 3D CNC plasma/oxyfuel cutting tables, shot-blasting chambers, and climate-controlled coating shops, ensuring full in-house control over fabrication cycles.',
          'Every fabrication batch complies strictly with EN 1090-2 Execution Class EXC3 and ISO 3834-2 quality criteria, backed by internal Level II NDT inspectors.',
        ],
      },
      DE: {
        lead: 'CHEMOROZRUCH verfügt über mehr als 50 Jahre Erfahrung in der Fertigung und Montage von anspruchsvollen Industriestahlbauten für Chemie, Petrochemie und Kraftwerke.',
        paragraphs: [
          'Unsere Werkhallen in Oświęcim verfügen über Hallenkrane bis 16t Traglast, 3D-CNC-Plasmaschneidanlagen, automatisierte Strahlkammern und Beschichtungsanlagen.',
          'Alle Schweiß- und Fertigungsprozesse erfüllen die strengen Anforderungen nach DIN EN 1090-2 (Ausführungsklasse EXC3) und DIN EN ISO 3834-2.',
        ],
      },
      UA: {
        lead: 'CHEMOROZRUCH має понад 50 років досвіду у виготовленні та монтажі важких металоконструкцій для хімічної, нафтохімічної та енергетичної галузей.',
        paragraphs: [
          'Наші виробничі потужності в Освенцимі оснащені мостовими кранами до 16 тонн, 3D-плазмовими порталами, дробоструминними та фарбувальними камерами.',
          'Виробництво повністю відповідає стандарту EN 1090-2 (клас виконання EXC3) та ISO 3834-2.',
        ],
      },
    },
    scopeOfWork: {
      PL: {
        title: 'Zakres usług w obszarze konstrukcji stalowych',
        subtitle: 'Od projektu wykonawczego po precyzyjny montaż wielkotonażowy na czynnych instalacjach',
        items: [
          {
            title: 'Estakady rurociągowe i mosty technologiczne',
            description: 'Projektowanie wykonawcze, prefabrykacja modułowa i montaż estakad wielopoziomowych na instalacjach przemysłowych i w korytarzach międzyoddziałowych.',
            details: ['Przęsła o dużych rozpiętościach', 'Zabezpieczenia antykorozyjne C4/C5-M', 'Wbudowane systemy podwieszeń i tras kablowych'],
          },
          {
            title: 'Konstrukcje wsporcze aparatów i reaktorów',
            description: 'Ciężkie konstrukcje nośne dla kolumn destylacyjnych, cyklonów, zbiorników pionowych i poziomych oraz pieców technologicznych.',
            details: ['Stale o podwyższonej wytrzymałości', 'Tolerancje montażowe zgodnie z EN 1090-2', 'Montaż dźwigami samojezdnymi do 500t'],
          },
          {
            title: 'Szkielety hal przemysłowych i wiat technologicznych',
            description: 'Kompleksowe konstrukcje budynków technologicznych, wiat magazynowych, pompowni i kotłowni przemysłowych.',
            details: ['Rygle, płatwie i stężenia wiatrowe', 'Systemy obudowy z płyt warstwowych', 'Podtorza suwnicowe z rektyfikacją szyn'],
          },
          {
            title: 'Platformy obsługowe, klatki schodowe i pomosty',
            description: 'Bezpieczne ciągi komunikacyjne, galerie technologiczne, podesty rewizyjne i drabiny ewakuacyjne.',
            details: ['Kraty pomostowe zgrzewane i prasowane', 'Balustrady ochronne z krawężnikami', 'Ocynk ogniowy wg PN-EN ISO 1461'],
          },
        ],
      },
      EN: {
        title: 'Key Structural Steelwork Solutions',
        subtitle: 'From workshop drawing verification to heavy on-site crane erection',
        items: [
          {
            title: 'Industrial Pipe Racks & Utility Bridges',
            description: 'Modular prefabrication and site erection of multi-tier pipe racks crossing process units and inter-plant corridors.',
            details: ['Long-span truss sections', 'Heavy-duty C4/C5-M coating systems', 'Integrated spring hanger supports'],
          },
          {
            title: 'Apparatus Support Structures & Tower Framing',
            description: 'Heavy structural frames for distillation columns, reactors, furnaces, and pressurized process vessels.',
            details: ['High-yield structural steels', 'Sub-millimeter assembly tolerances', 'Heavy crane lifts up to 500t'],
          },
          {
            title: 'Industrial Plant Buildings & Canopy Frameworks',
            description: 'Structural framing for compressor halls, pump stations, boiler rooms, and chemical warehouses.',
            details: ['Columns, trusses, and purlins', 'Crane gantry runways and rails', 'Sandwich panel cladding integration'],
          },
          {
            title: 'Access Platforms, Walkways & Stair Towers',
            description: 'Safe access walkways, grating galleries, maintenance landings, and industrial safety stairs.',
            details: ['Hot-dip galvanized gratings ISO 1461', 'Industrial guardrail assemblies', 'Compliance with EN ISO 14122'],
          },
        ],
      },
      DE: {
        title: 'Leistungsspektrum im Bereich Stahlbau',
        subtitle: 'Von der Werkstattzeichnung bis zur Schwerlastmontage',
        items: [
          {
            title: 'Rohrbrücken & Industrielle Traversen',
            description: 'Modulare Fertigung und Vor-Ort-Montage mehrstöckiger Rohrleitungsbrücken.',
            details: ['Großspannweiten-Fachwerke', 'Korrosionsschutz C4/C5-M', 'Integrierte Rohrhalterungen'],
          },
          {
            title: 'Tragwerke für Reaktoren & Kolonnen',
            description: 'Schwere Traggerüste für Kolonnen, Reaktoren und Industrieöfen.',
            details: ['Hochfeste Baustähle', 'TÜV-überwachte Fertigung', 'Kranmontagen bis 500t'],
          },
          {
            title: 'Industriehallen & Maschinengebäude',
            description: 'Tragwerke für Kompressorenhallen, Pumpenstationen und Kesselhäuser.',
            details: ['Kranbahnträger mit Schienenjustierung', 'Dach- und Wandriegel', 'Sandwichpaneel-Hüllen'],
          },
          {
            title: 'Bühnen, Treppentürme & Laufstege',
            description: 'Wartungsbühnen, Gitterrostpodeste und Fluchttreppentürme nach EN ISO 14122.',
            details: ['Feuerverzinkung DIN EN ISO 1461', 'Industriegeländer', 'Gitterroste nach Maß'],
          },
        ],
      },
      UA: {
        title: 'Напрямки робіт у сфері металоконструкцій',
        subtitle: 'Від розробки КМД до монтажу на діючих підприємствах',
        items: [
          {
            title: 'Трубні естакади та міжцехові мости',
            description: 'Модульне виготовлення та монтаж багатоярусних естакад технологічних трубопроводів.',
            details: ['Великопрогонові ферми', 'Антикорозійний захист C4/C5-M', 'Вбудовані системи підвісок'],
          },
          {
            title: 'Опорні конструкції колон і реакторів',
            description: 'Несучі металоконструкції для ректифікаційних колон, реакторів та теплообмінників.',
            details: ['Високоміцні сталі', 'Монтаж автокранами до 500т', 'Контроль геометрії EN 1090-2'],
          },
          {
            title: 'Каркаси промислових будівель та цехів',
            description: 'Виготовлення та монтаж каркасів насосних станцій, компресорних та складів.',
            details: ['Підкранові колії з юстуванням', 'Прогони та в’язеві ферми', 'Монтаж сендвіч-панелей'],
          },
          {
            title: 'Технологічні майданчики та сходи',
            description: 'Обслуговуючі майданчики, перехідні містки та евакуаційні сходові клітки.',
            details: ['Гаряче цинкування ISO 1461', 'Решітковий настил', 'Огородження за ISO 14122'],
          },
        ],
      },
    },
    technicalCapabilities: {
      PL: {
        title: 'Możliwości produkcyjne i certyfikacja',
        specs: [
          { label: 'Zdolność produkcyjna', value: 'do 250 ton konstrukcji miesięcznie' },
          { label: 'Klasa wykonania wg EN 1090-2', value: 'EXC1, EXC2, EXC3' },
          { label: 'Maksymalny udźwig suwnic', value: '16 000 kg w pojedynczym elemencie' },
          { label: 'Cięcie termiczne CNC', value: 'Plazma HD i tlen do grubości 150 mm' },
          { label: 'Zabezpieczenie antykorozyjne', value: 'Śrutowanie Sa 2.5, natrysk hydrodynamiczny, ocynk' },
        ],
        certifications: [
          'Certyfikat EN 1090-2 (ZKP do klasy EXC3)',
          'Certyfikat jakości spawania ISO 3834-2',
          'Uprawnienia Urzędu Dozoru Technicznego (UDT)',
          'Certyfikat TÜV Rheinland',
        ],
      },
      EN: {
        title: 'Fabrication Capacity & Quality Certificates',
        specs: [
          { label: 'Monthly Capacity', value: 'Up to 250 tonnes structural steel / month' },
          { label: 'Execution Class EN 1090-2', value: 'EXC1, EXC2, EXC3' },
          { label: 'Max Crane Single Lift', value: '16,000 kg' },
          { label: 'CNC Thermal Cutting', value: 'HD Plasma & Oxyfuel up to 150 mm' },
          { label: 'Corrosion Protection', value: 'Sa 2.5 shot-blasting, airless spraying, HDG' },
        ],
        certifications: [
          'EN 1090-2 Execution Class EXC3 Factory Production Control',
          'EN ISO 3834-2 Comprehensive Welding Quality',
          'Polish Office of Technical Inspection (UDT) Certification',
          'TÜV Rheinland Quality Approval',
        ],
      },
      DE: {
        title: 'Fertigungskapazitäten und Qualitätszertifikate',
        specs: [
          { label: 'Monatliche Kapazität', value: 'bis zu 250 t Stahlkonstruktionen / Monat' },
          { label: 'Ausführungsklasse EN 1090-2', value: 'EXC1, EXC2, EXC3' },
          { label: 'Kran-Einzellast', value: '16.000 kg' },
          { label: 'CNC-Schneiden', value: 'HD-Plasma & Autogen bis 150 mm Blechdicke' },
          { label: 'Korrosionsschutz', value: 'Strahlen Sa 2.5, Airless-Beschichtung, Verzinkung' },
        ],
        certifications: [
          'Zertifikat EN 1090-2 bis Klasse EXC3 (WPK)',
          'Schweißqualitätszertifikat ISO 3834-2',
          'Zulassung UDT (Technisches Überwachungsamt)',
          'Zertifizierung TÜV Rheinland',
        ],
      },
      UA: {
        title: 'Виробничі потужності та сертифікати',
        specs: [
          { label: 'Виробнича потужність', value: 'до 250 тонн металоконструкцій щомісяця' },
          { label: 'Клас виконання EN 1090-2', value: 'EXC1, EXC2, EXC3' },
          { label: 'Вантажопідйомність кранів', value: '16 000 кг (один елемент)' },
          { label: 'ЧПК розкрій металу', value: 'HD плазма та кисневе різання до 150 мм' },
          { label: 'Антикорозійний захист', value: 'Дробоструминна обробка Sa 2.5, фарбування' },
        ],
        certifications: [
          'Сертифікат EN 1090-2 (клас EXC3)',
          'Сертифікат якості зварювання ISO 3834-2',
          'Дозволи Управління технічного нагляду (UDT)',
          'Сертифікат TÜV Rheinland',
        ],
      },
    },
    materialsAndNorms: {
      PL: {
        title: 'Materiały konstrukcyjne i normy wykonawcze',
        materials: [
          'Stale konstrukcyjne niestopowe: S235JR/J2, S355JR/J2/K2 (+N / +M)',
          'Stale drobnoziarniste o wysokiej granicy plastyczności: S460ML, S690QL',
          'Stale odporne na korozję atmosferyczną: S355J2W (Corten)',
          'Stale austenityczne i kwasoodporne: 1.4301 (304), 1.4404 (316L), 1.4541 (321)',
          'Stale Duplex i Super Duplex: 1.4462 (2205), 1.4410 (2507)',
        ],
        standards: [
          'PN-EN 1090-2: Wykonanie konstrukcji stalowych',
          'PN-EN ISO 3834-2: Wymagania jakości dotyczące spawania',
          'PN-EN ISO 12944: Ochrona konstrukcji przed korozją',
          'Eurokod 3 (PN-EN 1993): Projektowanie konstrukcji stalowych',
        ],
      },
      EN: {
        title: 'Structural Steels & Engineering Standards',
        materials: [
          'Non-alloy structural steels: S235JR/J2, S355JR/J2/K2 (+N / +M)',
          'Fine-grained high-yield steels: S460ML, S690QL',
          'Weathering steels: S355J2W (Corten)',
          'Stainless & acid-resistant grades: 1.4301 (304), 1.4404 (316L), 1.4541 (321)',
          'Duplex and Super Duplex alloys: 1.4462 (2205), 1.4410 (2507)',
        ],
        standards: [
          'EN 1090-2: Execution of steel structures',
          'EN ISO 3834-2: Comprehensive quality requirements for welding',
          'EN ISO 12944: Paints and varnishes — Corrosion protection',
          'Eurocode 3 (EN 1993): Design of steel structures',
        ],
      },
      DE: {
        title: 'Werkstoffe und Ausführungsnormen',
        materials: [
          'Unlegierte Baustähle: S235JR/J2, S355JR/J2/K2 (+N / +M)',
          'Feinkornbaustähle: S460ML, S690QL',
          'Wetterfeste Baustähle: S355J2W (Corten)',
          'Edelstähle & säurebeständige Stähle: 1.4301 (304), 1.4404 (316L), 1.4541 (321)',
          'Duplex- und Superduplex-Stähle: 1.4462 (2205), 1.4410 (2507)',
        ],
        standards: [
          'DIN EN 1090-2: Ausführung von Stahltragwerken',
          'DIN EN ISO 3834-2: Schweißtechnische Qualitätsanforderungen',
          'DIN EN ISO 12944: Korrosionsschutz von Stahlbauten',
          'Eurocode 3 (DIN EN 1993): Bemessung von Stahlbauten',
        ],
      },
      UA: {
        title: 'Конструкційні матеріали та стандарти',
        materials: [
          'Вуглецеві сталі: S235JR/J2, S355JR/J2/K2 (+N / +M)',
          'Дрібнозернисті високоміцні сталі: S460ML, S690QL',
          'Атмосферостійкі сталі: S355J2W (Corten)',
          'Нержавіючі та кислотостійкі сталі: 1.4301 (304), 1.4404 (316L), 1.4541 (321)',
          'Дуплексні сталі: 1.4462 (2205), 1.4410 (2507)',
        ],
        standards: [
          'EN 1090-2: Виготовлення та монтаж сталевих конструкцій',
          'EN ISO 3834-2: Вимоги до якості зварювання',
          'EN ISO 12944: Захист від корозії лакофарбовими системами',
          'Eurocode 3 (EN 1993): Проєктування сталевих конструкцій',
        ],
      },
    },
    relatedRealizations: {
      PL: {
        title: 'Wybrane realizacje konstrukcji stalowych',
        projects: [
          {
            title: 'Montaż estakad rurowych i wież technologicznych',
            clientSector: 'Sektor Petrochemiczny / Rafineryjny',
            scope: 'Wykonanie, cynkowanie ogniowe i montaż 450 ton konstrukcji wsporczych rurociągów oraz klatek schodowych na czynnej instalacji hydrokrakingu.',
          },
          {
            title: 'Konstrukcja nośna instalacji syntezy',
            clientSector: 'Przemysł Chemiczny i Nawozowy',
            scope: 'Prefabrykacja i montaż 320 ton konstrukcji aparatowych oraz podestów obsługowych reaktora katalitycznego.',
          },
          {
            title: 'Hala pompowni i kompresorowni przemysłowej',
            clientSector: 'Energetyka Zawodowa',
            scope: 'Kompleksowy montaż konstrukcji szkieletowej hali z podtorzem suwnicy 20t oraz obudową ścienną i dachową.',
          },
        ],
      },
      EN: {
        title: 'Featured Structural Steel Projects',
        projects: [
          {
            title: 'Pipe Racks and Process Towers Erection',
            clientSector: 'Petrochemical & Refining Sector',
            scope: 'Fabrication, hot-dip galvanizing, and heavy crane erection of 450 tonnes of pipe racks and stair towers on an active hydrocracker unit.',
          },
          {
            title: 'Synthesis Unit Heavy Support Structure',
            clientSector: 'Chemical & Fertilizer Industry',
            scope: 'Turnkey fabrication and erection of 320 tonnes of reactor frames and maintenance galleries.',
          },
          {
            title: 'Compressor and Pump Station Hall',
            clientSector: 'Power Generation',
            scope: 'Full structural frame erection with 20t overhead crane gantry rails and thermal sandwich envelope.',
          },
        ],
      },
      DE: {
        title: 'Ausgewählte Referenzen im Stahlbau',
        projects: [
          {
            title: 'Montage von Rohrbrücken & Prozesstürmen',
            clientSector: 'Petrochemische Industrie / Raffinerien',
            scope: 'Fertigung, Feuerverzinkung und Montage von 450 Tonnen Rohrträgern und Treppentürmen auf einer laufenden Anlage.',
          },
          {
            title: 'Traggerüst für Synthesereaktor',
            clientSector: 'Chemische Industrie & Düngemittel',
            scope: 'Vorfertigung und Montage von 320 Tonnen Reaktor-Traggerüsten und Bedienbühnen.',
          },
          {
            title: 'Industriehalle für Pumpen und Verdichter',
            clientSector: 'Energiewirtschaft',
            scope: 'Stahltragwerk mit 20t-Kranbahn und Sandwichpaneel-Wandverkleidung.',
          },
        ],
      },
      UA: {
        title: 'Вибрані реалізації металоконструкцій',
        projects: [
          {
            title: 'Монтаж трубних естакад та технологічних веж',
            clientSector: 'Нафтопереробний сектор',
            scope: 'Виготовлення, гаряче цинкування та монтаж 450 тонн опорних металоконструкцій на діючій установці гідрокрекінгу.',
          },
          {
            title: 'Несучі конструкції установки синтезу',
            clientSector: 'Хімічна промисловість',
            scope: 'Префабрикація та монтаж 320 тонн каркасів реакторів і обслуговуючих майданчиків.',
          },
          {
            title: 'Цех компресорної та насосної станції',
            clientSector: 'Енергетика',
            scope: 'Монтаж металевого каркаса цеху з підкрановою колією 20т та огороджувальними конструкціями.',
          },
        ],
      },
    },
    cta: {
      PL: {
        title: 'Planujesz realizację konstrukcji stalowej?',
        description: 'Skontaktuj się z naszym Działem Ofertowania. Przygotujemy profesjonalną wycenę, zweryfikujemy dokumentację warsztatową i zaplanujemy optymalny harmonogram montażu.',
        btnText: 'Wyślij zapytanie ofertowe',
        contactPerson: 'Dział Ofertowania i Przygotowania Produkcji',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      EN: {
        title: 'Planning a structural steel project?',
        description: 'Get in touch with our Tendering Department. We will review your fabrication drawings, provide a competitive quotation, and schedule on-site crane assembly.',
        btnText: 'Request a Quote',
        contactPerson: 'Tendering & Technical Estimation Dept.',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      DE: {
        title: 'Planen Sie ein Stahlbauprojekt?',
        description: 'Kontaktieren Sie unsere Angebotsabteilung. Wir prüfen Ihre Ausführungspläne und erstellen ein detailliertes Angebot.',
        btnText: 'Angebot anfordern',
        contactPerson: 'Angebots- und Kalkulationsabteilung',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      UA: {
        title: 'Плануєте виготовлення металоконструкцій?',
        description: 'Зв’яжіться з нашим тендерним відділом для розрахунку вартості, аналізу креслень КМД та погодження термінів монтажу.',
        btnText: 'Надіслати запит',
        contactPerson: 'Відділ тендерів та оцінки проектів',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
    },
  },

  'remonty-modernizacje-instalacji-przemyslowych': {
    slug: 'remonty-modernizacje-instalacji-przemyslowych',
    canonicalUrl: 'https://chemorozruch.pl/remonty-modernizacje-instalacji-przemyslowych/',
    heroImage: siteImages.remontyOverhaul,
    targetKeywords: [
      'specjalistyczne prace remontowe',
      'remont i modernizacja instalacji przemysłowych',
      'modernizacja instalacji przemysłowych',
      'remonty instalacji chemicznych',
      'postoje remontowe',
      'wymiana rurociągów przemysłowych',
      'rewitalizacja aparatury procesowej',
    ],
    meta: {
      PL: {
        title: 'Remont i modernizacja instalacji przemysłowych – Specjalistyczne prace remontowe | CHEMOROZRUCH',
        description: 'Specjalistyczne prace remontowe i modernizacja instalacji przemysłowych, rurociągów oraz aparatury. Remonty planowane, postoje technologiczne i serwis awaryjny.',
        keywords: 'remont i modernizacja instalacji przemysłowych, specjalistyczne prace remontowe, modernizacja instalacji przemysłowych, postoje technologiczne, remonty rurociągów, modernizacje pieców',
        h1: 'Remont i modernizacja instalacji przemysłowych – Specjalistyczne prace remontowe',
        subtitle: 'Kompleksowe zarządzanie postojami technologicznymi, wymiana węzłów procesowych i odtwarzanie sprawności instalacji w trybie 24/7.',
      },
      EN: {
        title: 'Industrial Plant Overhauls & Modernization Services | CHEMOROZRUCH',
        description: 'Specialized overhaul and revamp services for industrial process plants, piping networks, and pressure vessels. Planned turnarounds and emergency response.',
        keywords: 'industrial modernization, specialized overhaul works, plant revamps, turnaround management, piping replacement, reactor revamping',
        h1: 'Industrial Plant Revamps, Overhauls & Modernization',
        subtitle: 'Turnkey shutdown management, critical equipment replacement, and continuous plant lifecycle extensions.',
      },
      DE: {
        title: 'Generalreparaturen & Modernisierung von Industrieanlagen | CHEMOROZRUCH',
        description: 'Spezialisierte Reparaturarbeiten, Modernisierung von Chemie- und Energieanlagen, Stillstandsmanagement und kurzfristige Notreparaturen.',
        keywords: 'Modernisierung Industrieanlagen, spezialisierte Reparaturarbeiten, Generalreparatur, Stillstandsmanagement, Rohrleitungssanierung',
        h1: 'Modernisierung und Reparatur von Industrieanlagen',
        subtitle: 'Turnaround-Management, Austausch von Prozesskomponenten und Lebensdauerverlängerung Ihrer Industrieanlagen.',
      },
      UA: {
        title: 'Ремонт та модернізація промислових установок – CHEMOROZRUCH',
        description: 'Спеціалізовані ремонтні роботи та модернізація технологічних установок, трубопроводів та апаратів. Планові зупинки та аварійний сервіс.',
        keywords: 'ремонт та модернізація промислових установок, спеціалізовані ремонтні роботи, модернізація технологічних ліній, ремонт трубопроводів, капітальний ремонт',
        h1: 'Ремонт та модернізація промислових установок',
        subtitle: 'Управління технологічними зупинками, заміна критичних вузлів та підвищення надійності обладнання.',
      },
    },
    breadcrumbs: {
      PL: { home: 'Strona Główna', section: 'Oferta', current: 'Remonty i modernizacje' },
      EN: { home: 'Home', section: 'Offer', current: 'Overhauls & Revamps' },
      DE: { home: 'Startseite', section: 'Angebot', current: 'Modernisierung & Reparaturen' },
      UA: { home: 'Головна', section: 'Послуги', current: 'Ремонти та модернізація' },
    },
    overview: {
      PL: {
        lead: 'CHEMOROZRUCH to zaufany partner przemysłu w realizacji złożonych remontów planowych (turnarounds), modernizacji węzłów technologicznych oraz natychmiastowych interwencji awaryjnych.',
        paragraphs: [
          'Rozumiemy krytyczne znaczenie czasu przestoju w zakładach ciągłego procesu produkcyjnego. Nasze zespoły inżynierskie i monterskie posiadają bogate doświadczenie w pracy w reżimach podwyższonego ryzyka (strefy zagrożenia wybuchem EX, instalacje z mediami agresywnymi i toksycznymi).',
          'Przeprowadzamy kompleksową diagnostykę, inwentaryzację 3D metodą skaningu laserowego, prefabrykację elementów zamiennych w naszych warsztatach, aż po sprawny demontaż i montaż nowych podzespołów z odbiorami dozorowymi UDT i TDT.',
        ],
      },
      EN: {
        lead: 'CHEMOROZRUCH is an established European partner for heavy industrial turnarounds, capacity revamps, and urgent maintenance interventions across continuous-production sites.',
        paragraphs: [
          'We understand that every hour of unexpected downtime carries immense financial impact. Our qualified multi-discipline teams operate with strict adherence to safety standards in hazardous explosive (ATEX) and toxic media environments.',
          'From 3D laser scanning and isometric pre-fabrication in our workshops to accelerated on-site mechanical replacements, pressure testing, and UDT regulatory approvals.',
        ],
      },
      DE: {
        lead: 'CHEMOROZRUCH ist Ihr erfahrener Partner für geplante Generalstillstände (Turnarounds), Kapazitätserweiterungen und schnelle Notfalleinsätze.',
        paragraphs: [
          'Wir minimieren Stillstandszeiten durch detaillierte Arbeitsvorbereitung, 3D-Laserscanning und werkstattseitige Vorfertigung aller Ersatzrohrleitungen und Bauteile.',
          'Unsere Teams arbeiten routiniert unter anspruchsvollen Bedingungen in Ex-Zonen und mit aggressiven Medien unter Einhaltung höchster HSE-Standards.',
        ],
      },
      UA: {
        lead: 'CHEMOROZRUCH є надійним партнером у проведенні планових капітальних ремонтів (Turnarounds), модернізації та аварійних відновлювальних робіт.',
        paragraphs: [
          'Ми мінімізуємо час зупинки виробництва завдяки точній інженерній підготовці, 3D-лазерному скануванню та попередній префабрикації вузлів у наших цехах.',
          'Наші бригади мають високу кваліфікацію для роботи у вибухонебезпечних зонах (ATEX) та з агресивними технологічними середовищами.',
        ],
      },
    },
    scopeOfWork: {
      PL: {
        title: 'Główne kierunki prac remontowo-modernizacyjnych',
        subtitle: 'Od wymiany rurociągów wysokociśnieniowych po modernizację reaktorów i kolumn',
        items: [
          {
            title: 'Kompleksowe postoje remontowe (Turnarounds)',
            description: 'Zarządzanie całością prac mechanicznych w trakcie planowanych postojów technologicznych rafinerii, elektrociepłowni i zakładów chemicznych.',
            details: ['Praca wielozmianowa 24/7', 'Koordynacja do 150 specjalistów na obiekcie', 'Ścisła kontrola harmonogramu CPM'],
          },
          {
            title: 'Wymiana i modernizacja rurociągów przemysłowych',
            description: 'Demontaż zużytych ciągów rurowych pary świeżej, kwasów, zasad, wodoru i gazu ziemnego oraz montaż nowych rurociągów ze stopów P91, P92, 1.4404 i tytanu.',
            details: ['Spawanie TIG / Orbitalne', 'Obróbka cieplna PWHT spoin', 'Próby ciśnieniowe do 600 bar'],
          },
          {
            title: 'Remonty aparatury procesowej i wymienników ciepła',
            description: 'Wymiana wiązek rurkowych wymienników, regeneracja uszczelnień, wymiana wkładów kolumn rektyfikacyjnych oraz rewizje wewnętrzne reaktorów.',
            details: ['Ekstrakcja i wciąganie wiązek', 'Szlifowanie i napawanie powierzchni', 'Odbiory UDT i TDT'],
          },
          {
            title: 'Szybkie interwencje awaryjne i usuwanie nieszczelności',
            description: 'Mobilne brygady serwisowe reagujące na awarie rurociągów, uszkodzenia armatury odcinającej oraz rozszczelnienia układów ciśnieniowych.',
            details: ['Mobilne zaplecze obróbki skrawaniem', 'Certyfikowane procedury naprawcze', 'Minimalizacja przestoju produkcyjnego'],
          },
        ],
      },
      EN: {
        title: 'Turnaround & Revamp Work Scope',
        subtitle: 'From critical high-pressure steam line replacements to reactor internals revamps',
        items: [
          {
            title: 'Turnaround & Shutdown Management',
            description: 'Complete mechanical management during scheduled refinery, chemical complex, and power station turnarounds.',
            details: ['Multi-shift round-the-clock execution', 'Mobilization of up to 150 site technicians', 'Strict CPM schedule tracking'],
          },
          {
            title: 'High-Pressure Piping Replacement & Rerouting',
            description: 'Dismantling degraded live steam, hydrogen, syngas, and acid lines and installing new alloy piping (P91, P92, 1.4404, Duplex).',
            details: ['TIG / Orbital certified welding', 'Controlled on-site PWHT heat treatment', 'Hydrostatic pressure testing up to 600 bar'],
          },
          {
            title: 'Vessel, Reactor & Heat Exchanger Overhauls',
            description: 'Tube bundle retubing, column tray replacements, reactor internal repairs, and nozzle upgrades.',
            details: ['Bundle extraction & re-tubing', 'Flange facing & weld overlay cladding', 'UDT and TÜV statutory sign-offs'],
          },
          {
            title: 'Emergency Response & Leak Mitigation',
            description: 'Mobile rapid-response teams dispatched for sudden pipe ruptures, valve failures, and pressure line containment.',
            details: ['Mobile machining and pipe beveling', 'Pre-qualified welding repair WPS', 'Immediate operational recovery'],
          },
        ],
      },
      DE: {
        title: 'Leistungsbereiche der Instandsetzung & Modernisierung',
        subtitle: 'Vollständige Stillstandsabwicklung und mechanische Instandhaltung',
        items: [
          {
            title: 'Turnaround- und Stillstandsmanagement',
            description: 'Vollständige Abwicklung aller mechanischen Gewerke bei geplanten Generalstillständen.',
            details: ['24/7-Schichtbetrieb', 'Bis zu 150 Fachkräfte vor Ort', 'Minutengenaue Terminverfolgung'],
          },
          {
            title: 'Rohrleitungserneuerung & Umverlegung',
            description: 'Demontage und Neuverlegung von Hochdruck-Dampf-, Säure- und Wasserstoffleitungen (P91, 1.4404, Duplex).',
            details: ['WIG- und Orbitalschweißen', 'Geregelte PWHT-Wärmebehandlung', 'Druckprüfungen bis 600 bar'],
          },
          {
            title: 'Wärmetauscher- und Behälterinstandsetzung',
            description: 'Rohrbündeltausch, Erneuerung von Kolonnenböden, Reaktorinspektionen und Stutzenreparaturen.',
            details: ['Bündelziehen und Retubing', 'Vor-Ort-Flanschbearbeitung', 'UDT- und TÜV-Abnahmen'],
          },
          {
            title: 'Havariedienst & Notfallreparaturen',
            description: 'Schnell einsatzbereite Mobilteams bei unvorhergesehenen Rohrbrüchen und Leckagen.',
            details: ['Mobile Zerspanungswerkzeuge', 'Sofortige Schadenbehebung', 'Minimierung von Produktionsausfall'],
          },
        ],
      },
      UA: {
        title: 'Основні напрямки ремонтів та модернізації',
        subtitle: 'Від заміни паропроводів високого тиску до ремонту внутрішніх пристроїв реакторів',
        items: [
          {
            title: 'Управління капітальними зупинками (Turnarounds)',
            description: 'Виконання комплексу механічних робіт під час планових зупинок нафтохімічних та енергетичних підприємств.',
            details: ['Цілодобовий змінний графік', 'Мобілізація до 150 фахівців', 'Суворий контроль критичного шляху'],
          },
          {
            title: 'Заміна та модернізація технологічних трубопроводів',
            description: 'Демонтаж зношених ліній пари, кислот, водню та монтаж нових трубопроводів зі сталей P91, 1.4404, Duplex.',
            details: ['TIG / орбітальне зварювання', 'Термообробка зварних швів PWHT', 'Гідравлічні випробування до 600 бар'],
          },
          {
            title: 'Ремонт теплообмінників, реакторів та колон',
            description: 'Заміна трубних пучків, тарілок ректифікаційних колон, відновлення герметичності фланцевих з’єднань.',
            details: ['Витягування та монтаж пучків', 'Проточка фланців на місці', 'Здача інспекції UDT / TDT'],
          },
          {
            title: 'Аварійні виїзди та усунення пошкоджень',
            description: 'Мобільні ремонтні бригади для оперативної ліквідації розгерметизацій та поривів трубопроводів.',
            details: ['Мобільне металообробне обладнання', 'Атестовані технології ремонту', 'Швидке відновлення працездатності'],
          },
        ],
      },
    },
    technicalCapabilities: {
      PL: {
        title: 'Zaplecze techniczne remontów i uprawnienia',
        specs: [
          { label: 'Doświadczenie w postojach', value: 'Ponad 120 zrealizowanych turnarounds w Europie' },
          { label: 'Mobilna obróbka skrawaniem', value: 'Planowanie kołnierzy do DN 2500, ukosowanie rurociągów na obiekcie' },
          { label: 'Obróbka cieplna spoin (PWHT)', value: 'Mobilne wyżarzarki rezystancyjne wielokanałowe' },
          { label: 'Próby ciśnieniowe i szczelności', value: 'Agregaty wysokociśnieniowe z cyfrową rejestracją parametrów' },
        ],
        certifications: [
          'Uprawnienia UDT do naprawy i modernizacji rurociągów pary i cieczy',
          'Uprawnienia UDT do naprawy zbiorników ciśnieniowych i bezciśnieniowych',
          'Certyfikat SCC** / VCA na prace na obiektach petrochemicznych',
          'Uprawnienia TDT na instalacje transportowe i zbiorniki',
        ],
      },
      EN: {
        title: 'Technical Resources & Maintenance Credentials',
        specs: [
          { label: 'Turnaround Track Record', value: '120+ successful plant turnarounds executed across Europe' },
          { label: 'On-Site Field Machining', value: 'Flange facing up to DN 2500, portable pipe cutting & beveling' },
          { label: 'Post-Weld Heat Treatment', value: 'Multi-channel mobile resistance heating consoles' },
          { label: 'Pressure Testing Equipment', value: 'High-pressure test units with certified digital data logging' },
        ],
        certifications: [
          'UDT statutory authority for pressure piping repairs & revamping',
          'UDT approval for pressure vessel repair and alterations',
          'SCC** / VCA industrial safety certification for refinery sites',
          'Transportation Technical Supervision (TDT) certificates',
        ],
      },
      DE: {
        title: 'Technische Ressourcen und Zulassungen',
        specs: [
          { label: 'Stillstandserfahrung', value: 'Über 120 erfolgreich durchgeführte Turnarounds' },
          { label: 'Vor-Ort-Bearbeitung', value: 'Mobiles Flanschendrehen bis DN 2500, Rohranfasen' },
          { label: 'Wärmebehandlung (PWHT)', value: 'Mehrkanalige mobile Glühanlagen' },
          { label: 'Druckprüfung', value: 'Hochdruck-Prüfaggregate mit digitaler Aufzeichnung' },
        ],
        certifications: [
          'UDT-Zulassung für Reparatur & Umbau von Rohrleitungen und Kesseln',
          'UDT-Zulassung für Druckbehälterinstandsetzung',
          'Sicherheitszertifikat SCC** / VCA',
          'Zulassung TDT für Gefahrguttransportsysteme',
        ],
      },
      UA: {
        title: 'Технічні можливості та дозвільна документація',
        specs: [
          { label: 'Досвід капітальних зупинок', value: 'Понад 120 успішних зупинок на заводах Європи' },
          { label: 'Мобільна механічна обробка', value: 'Проточка фланців до DN 2500 безпосередньо на об’єкті' },
          { label: 'Термообробка зварних швів', value: 'Багатоканальні мобільні установки для відпалу' },
          { label: 'Випробувальне обладнання', value: 'Насосні станції високого тиску з цифровими датчиками' },
        ],
        certifications: [
          'Дозволи UDT на ремонт і модернізацію паропроводів і резервуарів',
          'Сертифікація безпеки праці SCC** / VCA',
          'Дозволи TDT на транспортні резервуари та наливні системи',
        ],
      },
    },
    materialsAndNorms: {
      PL: {
        title: 'Zgodność z przepisami i standardy bezpieczeństwa',
        materials: [
          'Stale żarowytrzymałe i kotłowe: 16Mo3, 13CrMo4-5, 10CrMo9-10, X10CrMoVNb9-1 (P91), P92',
          'Stale niskotemperaturowe: A333 Gr. 6, P355NL1',
          'Stopy niklu: Inconel 625, Hastelloy C-276, Monel 400',
          'Stale kwasoodporne wysokostopowe: 1.4539 (904L), 1.4571 (316Ti)',
        ],
        standards: [
          'Dyrektywa Ciśnieniowa PED 2014/68/UE: Modernizacje i przebudowy',
          'Ustawa o Dozorze Technicznym (UDT/WUDT)',
          'PN-EN 13480: Rurociągi przemysłowe metalowe',
          'Standardy bezpieczeństwa chemicznego SEVESO III',
        ],
      },
      EN: {
        title: 'Material Expertise & Regulatory Compliance',
        materials: [
          'Creep-resistant boiler steels: 16Mo3, 13CrMo4-5, 10CrMo9-10, P91, P92',
          'Low-temperature carbon steels: ASTM A333 Gr. 6, EN P355NL1',
          'High nickel alloys: Inconel 625, Hastelloy C-276, Monel 400',
          'High-alloy austenitic stainless: 1.4539 (904L), 1.4571 (316Ti)',
        ],
        standards: [
          'Pressure Equipment Directive 2014/68/EU (PED)',
          'UDT Polish National Statutory Pressure Regulations',
          'EN 13480: Metallic Industrial Piping Standards',
          'SEVESO III Major Accident Prevention Regulations',
        ],
      },
      DE: {
        title: 'Werkstoffe und Sicherheitsstandards',
        materials: [
          'Warmfeste Kesselbaustähle: 16Mo3, 13CrMo4-5, 10CrMo9-10, P91, P92',
          'Kaltzähe Stähle: A333 Gr. 6, P355NL1',
          'Nickelbasislegierungen: Inconel 625, Hastelloy C-276, Monel 400',
          'Hochlegierte Edelstähle: 1.4539 (904L), 1.4571 (316Ti)',
        ],
        standards: [
          'Druckgeräterichtlinie 2014/68/EU (DGRL)',
          'Technische Prüfvorschriften UDT/WUDT',
          'DIN EN 13480: Metallische industrielle Rohrleitungen',
          'Störfallverordnung SEVESO III',
        ],
      },
      UA: {
        title: 'Матеріали та нормативна база',
        materials: [
          'Жароміцні та котлові сталі: 16Mo3, 13CrMo4-5, 10CrMo9-10, P91, P92',
          'Кріогенні та низькотемпературні сталі: A333 Gr. 6, P355NL1',
          'Нікелеві сплави: Inconel 625, Hastelloy C-276, Monel 400',
          'Високолеговані нержавіючі сталі: 1.4539 (904L), 1.4571 (316Ti)',
        ],
        standards: [
          'Директива ЄС щодо обладнання під тиском PED 2014/68/EU',
          'Правила безпеки Управління технічного нагляду (UDT)',
          'EN 13480: Промислові металеві трубопроводи',
          'Норми промислової безпеки SEVESO III',
        ],
      },
    },
    relatedRealizations: {
      PL: {
        title: 'Wybrane realizacje remontowo-modernizacyjne',
        projects: [
          {
            title: 'Generalny postój remontowy instalacji reformingu',
            clientSector: 'Koncern Naftowy / Petrochemiczny',
            scope: 'Wymiana 1800 m rurociągów stopowych P91 i 1.4404, rewizja 14 wymienników ciepła i montaż nowej armatury wysokociśnieniowej w reżimie 28 dni.',
          },
          {
            title: 'Modernizacja instalacji kwasu azotowego i nawozów',
            clientSector: 'Przemysł Chemiczny',
            scope: 'Wymiana wieży absorpcyjnej i rurociągów kwasu ze stali 1.4541, próby ciśnieniowe i bezusterkowy rozruch technologiczny.',
          },
          {
            title: 'Remont kapitalny rurociągów pary świeżej bloku 200 MW',
            clientSector: 'Elektrociepłownia Zawodowa',
            scope: 'Wymiana rurociągów pary świeżej i wtórnej, montaż nowych zawieszeń sprężynowych, badania NDT 100% spoin i odbiór UDT.',
          },
        ],
      },
      EN: {
        title: 'Turnaround Case Studies',
        projects: [
          {
            title: 'Catalytic Reforming Unit Turnaround Overhaul',
            clientSector: 'Major Oil & Gas Refining Complex',
            scope: 'Replacement of 1,800m P91 & 316L alloy piping, overhaul of 14 heat exchangers, and new valve installs within a strict 28-day shutdown.',
          },
          {
            title: 'Nitric Acid and Fertilizer Unit Revamp',
            clientSector: 'Chemical Manufacturing Plant',
            scope: 'Absorption column section replacement, 1.4541 acid line installation, hydrostatic testing, and zero-defect startup.',
          },
          {
            title: '200 MW Power Unit Steam Lines Overhaul',
            clientSector: 'Combined Heat & Power Station',
            scope: 'Replacement of high-temperature steam lines, installation of constant load spring supports, 100% NDT inspection, and UDT acceptance.',
          },
        ],
      },
      DE: {
        title: 'Referenzprojekte Instandhaltung & Stillstände',
        projects: [
          {
            title: 'Generalstillstand der Reformeranlage',
            clientSector: 'Erdölraffinerie',
            scope: 'Austausch von 1.800 m P91- und 1.4404-Rohrleitungen, Revision von 14 Wärmetauschern innerhalb von 28 Tagen.',
          },
          {
            title: 'Modernisierung der Salpetersäureanlage',
            clientSector: 'Chemische Industrie',
            scope: 'Austausch von Kolonnensegmenten, Verlegung von Säureleitungen aus 1.4541 und Druckprüfung.',
          },
          {
            title: 'Generalüberholung der Frischdampfleitungen im 200-MW-Block',
            clientSector: 'Kraftwerk',
            scope: 'Erneuerung der Hochtemperaturdampfleitungen, Konstanthängerjustierung und 100% ZfP-Prüfung.',
          },
        ],
      },
      UA: {
        title: 'Вибрані проекти ремонтів та модернізації',
        projects: [
          {
            title: 'Капітальний ремонт установки риформінгу',
            clientSector: 'Нафтопереробний завод',
            scope: 'Заміна 1800 м трубопроводів P91 та 1.4404, ревізія 14 теплообмінників за 28 днів зупинки.',
          },
          {
            title: 'Модернізація виробництва азотної кислоти',
            clientSector: 'Хімічний комбінат',
            scope: 'Заміна сегментів абсорбційної колони та кислотопроводів зі сталі 1.4541 з прийомкою UDT.',
          },
          {
            title: 'Ремонт паропроводів енергоблоку 200 МВт',
            clientSector: 'Теплоелектроцентраль',
            scope: 'Заміна високотемпературних паропроводів, регулювання пружинних підвісок та 100% NDT контроль.',
          },
        ],
      },
    },
    cta: {
      PL: {
        title: 'Planujesz postój remontowy lub modernizację instalacji?',
        description: 'Nasi inżynierowie przygotują plan organizacyjny, oszacują czas realizacji i zapewnią pełne wsparcie techniczne przed i w trakcie prac.',
        btnText: 'Skonsultuj zakres remontu',
        contactPerson: 'Dział Realizacji i Serwisu Przemysłowego',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      EN: {
        title: 'Planning a plant turnaround or modernization?',
        description: 'Our engineering management team will formulate an execution plan, estimate shutdown critical paths, and ensure full regulatory compliance.',
        btnText: 'Consult Turnaround Scope',
        contactPerson: 'Industrial Projects & Maintenance Dept.',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      DE: {
        title: 'Planen Sie einen Stillstand oder Anlagenumbau?',
        description: 'Unsere Fachingenieure erstellen ein detailliertes Montagekonzept und sichern die termingerechte Wiederinbetriebnahme.',
        btnText: 'Stillstand anfragen',
        contactPerson: 'Abteilung Industrieinstandhaltung & Service',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      UA: {
        title: 'Плануєте ремонт або зупинку підприємства?',
        description: 'Наші інженери складуть детальний графік робіт, оцінять ресурси та забезпечать вчасний пуск установки.',
        btnText: 'Замовити консультацію',
        contactPerson: 'Відділ реалізації та промислового сервісу',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
    },
  },

  'aparaty-cisnieniowe': {
    slug: 'aparaty-cisnieniowe',
    canonicalUrl: 'https://chemorozruch.pl/aparaty-cisnieniowe/',
    heroImage: siteImages.aparatyApparatus,
    targetKeywords: [
      'aparaty ciśnieniowe',
      'zbiorniki ciśnieniowe',
      'wymienniki przemysłowe',
      'reaktory chemiczne',
      'kolumny destylacyjne',
      'dyrektywa ciśnieniowa PED 2014/68/UE',
      'uprawnienia UDT',
    ],
    meta: {
      PL: {
        title: 'Aparaty ciśnieniowe, zbiorniki ciśnieniowe i wymienniki przemysłowe | CHEMOROZRUCH',
        description: 'Wytwarzanie, montaż i modernizacja aparatów ciśnieniowych, zbiorników magazynowych i wymienników ciepła zgodnie z dyrektywą PED 2014/68/UE oraz UDT.',
        keywords: 'aparaty ciśnieniowe, zbiorniki ciśnieniowe, wymienniki przemysłowe, reaktory chemiczne, kolumny rektyfikacyjne, dyrektywa PED 2014/68/UE, UDT',
        h1: 'Aparaty ciśnieniowe, zbiorniki ciśnieniowe i wymienniki przemysłowe',
        subtitle: 'Certyfikowane wytwarzanie, mechaniczny montaż i rewizje techniczne aparatury procesowej dla przemysłu chemicznego i energetyki.',
      },
      EN: {
        title: 'Pressure Vessels, Process Apparatus & Industrial Heat Exchangers | CHEMOROZRUCH',
        description: 'Certified fabrication, erection, and revamping of pressure vessels, distillation columns, reactors, and industrial heat exchangers under PED 2014/68/EU and UDT.',
        keywords: 'pressure vessels, process apparatus, industrial heat exchangers, chemical reactors, distillation columns, PED 2014/68/EU, UDT certification',
        h1: 'Industrial Pressure Vessels, Apparatus & Heat Exchangers',
        subtitle: 'Certified fabrication, heavy rigging, and statutory commissioning of process equipment for high-pressure chemical applications.',
      },
      DE: {
        title: 'Druckbehälter, Industrieapparate & Wärmetauscher | CHEMOROZRUCH',
        description: 'Herstellung, Montage und Wartung von Druckbehältern, Reaktoren, Destillationskolonnen und Wärmetauschern nach DGRL 2014/68/EU und UDT.',
        keywords: 'Druckbehälter, Prozessapparate, industrielle Wärmetauscher, Chemiereaktoren, Kolonnen, DGRL 2014/68/EU, UDT Zulassung',
        h1: 'Industrielle Druckbehälter, Apparate & Wärmetauscher',
        subtitle: 'Zertifizierte Fertigung, Schwerlastmontage und Instandhaltung verfahrenstechnischer Apparate nach europäischen Vorschriften.',
      },
      UA: {
        title: 'Ємності під тиском, апарати та промислові теплообмінники | CHEMOROZRUCH',
        description: 'Виготовлення, монтаж та модернізація апаратів високого тиску, ємностей, ректифікаційних колон та теплообмінників згідно з PED 2014/68/EU та UDT.',
        keywords: 'апарати під тиском, ємності під тиском, промислові теплообмінники, хімічні реактори, колони ректифікації, PED 2014/68/EU, сертифікат UDT',
        h1: 'Апарати високого тиску, ємності та теплообмінники',
        subtitle: 'Сертифіковане виготовлення, монтаж та технічне обслуговування технологічного обладнання для нафтохімії та енергетики.',
      },
    },
    breadcrumbs: {
      PL: { home: 'Strona Główna', section: 'Oferta', current: 'Aparaty ciśnieniowe' },
      EN: { home: 'Home', section: 'Offer', current: 'Pressure Apparatus' },
      DE: { home: 'Startseite', section: 'Angebot', current: 'Druckapparate' },
      UA: { home: 'Головна', section: 'Послуги', current: 'Апарати під тиском' },
    },
    overview: {
      PL: {
        lead: 'CHEMOROZRUCH realizuje kompleksowe zadania w obszarze wytwarzania, prefabrykacji, montażu na fundamencie oraz modernizacji aparatury procesowej i zbiorników pracujących pod ciśnieniem.',
        paragraphs: [
          'Posiadamy pełen pakiet uprawnień Urzędu Dozoru Technicznego (UDT) do wytwarzania, modernizacji i naprawy urządzeń ciśnieniowych zgodnie z europejską Dyrektywą 2014/68/UE (PED) oraz modułami oceny zgodności G i H/H1.',
          'Nasz park maszynowy w Oświęcimiu umożliwia zwijanie blach o grubościach do 40 mm, automatyczne spawanie łukiem krytym (SAW) płaszczy i dennic, precyzyjną obróbkę gniazd króćców oraz kompleksowe badania nieniszczące (RT, UT, MT, PT, VT).',
        ],
      },
      EN: {
        lead: 'CHEMOROZRUCH delivers end-to-end engineering, workshop fabrication, heavy on-site installation, and regulatory testing of high-pressure process vessels and storage units.',
        paragraphs: [
          'We hold comprehensive statutory authorizations from the Office of Technical Inspection (UDT) in accordance with the European Pressure Equipment Directive 2014/68/EU (PED Modules G & H/H1).',
          'Our facilities feature 4-roll CNC plate bending rolls capable of rolling up to 40mm thick shells, submerged arc welding (SAW) columns, flange facing machinery, and complete in-house NDT inspection laboratories.',
        ],
      },
      DE: {
        lead: 'CHEMOROZRUCH fertigt, liefert und montiert schwere verfahrenstechnische Druckapparate und Wärmetauscher für anspruchsvolle Prozessbedingungen.',
        paragraphs: [
          'Wir verfügen über alle erforderlichen Zulassungen des Technischen Überwachungsamtes (UDT) gemäß der europäischen Druckgeräterichtlinie 2014/68/EU (DGRL).',
          'Unsere Werkhallen ermöglichen das 4-Walzen-Rundbiegen von Blechen bis 40 mm Wandstärke, UP-Schweißen (SAW) von Längs- und Rundnähten sowie lückenlose ZfP-Prüfungen.',
        ],
      },
      UA: {
        lead: 'CHEMOROZRUCH виготовляє, постачає та монтує технологічні апарати високого тиску та теплообмінне обладнання для агресивних середовищ.',
        paragraphs: [
          'Підприємство володіє повним комплектом дозволів UDT на проектування, виготовлення та ремонт обладнання під тиском відповідно до Директиви PED 2014/68/EU.',
          'Наш виробничий парк включає 4-валкові вальці для гнуття листів товщиною до 40 мм, автоматичне зварювання під флюсом (SAW) та повний комплекс NDT контролю.',
        ],
      },
    },
    scopeOfWork: {
      PL: {
        title: 'Zakres produkcji i montażu aparatury',
        subtitle: 'Od zbiorników magazynowych po reaktory wysokociśnieniowe i wymienniki płaszczowo-rurowe',
        items: [
          {
            title: 'Aparaty ciśnieniowe i reaktory chemiczne',
            description: 'Wytwarzanie i montaż pionowych i poziomych reaktorów katalitycznych, mieszalników, autoklawów oraz separatorów faz.',
            details: ['Praca przy ciśnieniach do 250 bar', 'Wbudowane wężownice i mieszadła', 'Płaszcze grzejno-chłodzące'],
          },
          {
            title: 'Zbiorniki ciśnieniowe i magazynowe',
            description: 'Zbiorniki magazynowe sprężonych gazów, ciekłych chemikaliów, kondensatu, powietrza i mediów agresywnych.',
            details: ['Zbiorniki cylindryczne pionowe i poziome', 'Dennice elipsoidalne i koszykowe', 'Zgodność z normami PN-EN 13445'],
          },
          {
            title: 'Przemysłowe wymienniki ciepła',
            description: 'Wytwarzanie, regeneracja i montaż wymienników płaszczowo-rurowych, skraplaczy, podgrzewaczy i chłodnic technologicznych.',
            details: ['Rozwalcowywanie i spawanie rurek w dnach sitowych', 'Wykonanie ze stali Duplex i stopów niklu', 'Próby ciśnieniowe i helowe szczelności'],
          },
          {
            title: 'Kolumny destylacyjne i rektyfikacyjne',
            description: 'Prefabrykacja sekcyjna, scalanie na budowie i montaż pionowy kolumn rafineryjnych i petrochemicznych wraz z osprzętem wewnętrznym.',
            details: ['Montaż półek i wypełnień strukturalnych', 'Dźwigi wielkotonażowe do montażu pionowego', 'Poziomowanie laserowe kołnierzy'],
          },
        ],
      },
      EN: {
        title: 'Apparatus & Vessel Portfolio',
        subtitle: 'From industrial storage tanks to high-pressure chemical reactors and tubular heat exchangers',
        items: [
          {
            title: 'High-Pressure Chemical Reactors & Autoclaves',
            description: 'Design verification, fabrication, and erection of catalytic reactors, autoclaves, and phase separators.',
            details: ['Design pressures up to 250 bar', 'Internal heating coils and agitator integration', 'Limpet coil and half-pipe jackets'],
          },
          {
            title: 'Pressure Storage Vessels & Buffer Tanks',
            description: 'Pressurized storage vessels for compressed gases, liquid chemicals, condensate, and aggressive fluids.',
            details: ['Vertical and horizontal cylindrical tanks', 'Ellipsoidal and torispherical heads', 'Compliance with EN 13445 & ASME'],
          },
          {
            title: 'Industrial Shell & Tube Heat Exchangers',
            description: 'Fabrication, re-tubing, and installation of shell-and-tube exchangers, reboilers, condensers, and coolers.',
            details: ['Precision tube-to-tubesheet expanding and orbital welding', 'Duplex, Super Duplex, and Nickel alloy builds', 'Helium leak testing'],
          },
          {
            title: 'Distillation & Rectification Columns',
            description: 'Sectional fabrication, site assembly, and tandem crane lifting of heavy distillation columns and strippers.',
            details: ['Internal tray and structured packing fitting', 'Heavy dual-crane vertical up-ending', 'Precision optical flange leveling'],
          },
        ],
      },
      DE: {
        title: 'Produktportfolio Apparatebau',
        subtitle: 'Vom Lagerbehälter bis zum Hochdruck-Reaktor und Rohrbündelwärmetauscher',
        items: [
          {
            title: 'Druckapparate und Chemiereaktoren',
            description: 'Herstellung und Montage von katalytischen Reaktoren, Rührwerksbehältern und Phasentrennern.',
            details: ['Drücke bis 250 bar', 'Integrierte Heizschlangen & Rührwerke', 'Halbrohrschlangen-Mäntel'],
          },
          {
            title: 'Druckbehälter und Lagertanks',
            description: 'Druckbehälter für Gase, Flüssigchemikalien, Kondensat und Druckluft.',
            details: ['Vertikale und horizontale Ausführungen', 'Klöpper- und Korbbogendurchmesser', 'Nach DIN EN 13445'],
          },
          {
            title: 'Rohrbündelwärmetauscher',
            description: 'Fertigung und Montage von Wärmetauschern, Kondensatoren und Industriekühlern.',
            details: ['Rohr-in-Rohrbodeneinwalzen und -schweißen', 'Ausführung in Duplex und Sonderwerkstoffen', 'Helium-Dichtheitsprüfungen'],
          },
          {
            title: 'Destillations- und Rektifikationskolonnen',
            description: 'Segmentfertigung, Baustellenmontage und Schwerlastaufrichtung von Kolonnen.',
            details: ['Einbau von Glockenböden und Packungen', 'Tandem-Kranzüge bis 500t', 'Laserjustierung'],
          },
        ],
      },
      UA: {
        title: 'Номенклатура апаратів та посудин',
        subtitle: 'Від технологічних ємностей до реакторів високого тиску та теплообмінників',
        items: [
          {
            title: 'Апарати високого тиску та хімічні реактори',
            description: 'Виготовлення та монтаж каталітичних реакторів, автоклавів та сепараторів.',
            details: ['Робочий тиск до 250 бар', 'Вбудовані змійовики та сорочки охолодження', 'Високолеговані сталі'],
          },
          {
            title: 'Ємності під тиском та резервуари',
            description: 'Ємнісне обладнання для зріджених газів, конденсату та хімічних реагентів.',
            details: ['Вертикальне та горизонтальне виконання', 'Еліптичні та торосферичні днища', 'Стандарт EN 13445'],
          },
          {
            title: 'Промислові кожухотрубні теплообмінники',
            description: 'Виготовлення та заміна трубних пучків теплообмінників, конденсаторів та холодильників.',
            details: ['Розпоясовка та орбітальне обварювання трубок', 'Матеріали: нержавіючі сталі та Duplex', 'Гелієвий контроль герметичності'],
          },
          {
            title: 'Ректифікаційні та дистиляційні колони',
            description: 'Секційне виготовлення, збирання на майданчику та вертикальний підйом колон.',
            details: ['Монтаж тарілок та насадок', 'Парний підйом важкими кранами', 'Лазерне нівелювання'],
          },
        ],
      },
    },
    technicalCapabilities: {
      PL: {
        title: 'Zdolności warsztatowe i park maszynowy',
        specs: [
          { label: 'Zwijanie blach na zimno', value: 'Grubość do 40 mm, szerokość zwijania do 3000 mm' },
          { label: 'Średnice wytwarzanych aparatów', value: 'Od DN 500 do DN 4500 w całości w warsztacie' },
          { label: 'Spawanie automatyczne (SAW)', value: 'Słupowysięgniki spawalnicze do spoin wzdłużnych i obwodowych' },
          { label: 'Obróbka dennic i kołnierzy', value: 'Wytaczarki i tokarki karuzelowe wielkogabarytowe' },
        ],
        certifications: [
          'Dyrektywa PED 2014/68/UE Moduł G i H/H1',
          'Uprawnienia UDT do wytwarzania aparatów ciśnieniowych',
          'ISO 3834-2 Jakość w spawalnictwie',
          'Certyfikat AD 2000-Merkblatt HP0 / HP100R',
        ],
      },
      EN: {
        title: 'Workshop Capabilities & Machine Infrastructure',
        specs: [
          { label: 'Cold Plate Rolling', value: 'Thickness up to 40 mm, width up to 3,000 mm' },
          { label: 'Vessel Diameters', value: 'From DN 500 up to DN 4500 fully workshop assembled' },
          { label: 'Submerged Arc Welding (SAW)', value: 'Automated welding booms for longitudinal and circumferential seams' },
          { label: 'Heavy Flange Machining', value: 'Large vertical boring mills and facing heads' },
        ],
        certifications: [
          'Pressure Equipment Directive PED 2014/68/EU Module G & H/H1',
          'UDT Manufacturing Authorization for Pressure Equipment',
          'ISO 3834-2 Comprehensive Quality Requirements',
          'AD 2000-Merkblatt HP0 / HP100R Certification',
        ],
      },
      DE: {
        title: 'Fertigungskapazitäten & Maschinenpark',
        specs: [
          { label: 'Kaltrundwalzen', value: 'Blechdicke bis 40 mm, Walzenbreite bis 3.000 mm' },
          { label: 'Behälterdurchmesser', value: 'Von DN 500 bis DN 4500 komplett im Werk vorfertigbar' },
          { label: 'UP-Schweißautomaten', value: 'Schweißmasten für Längs- und Rundnähte' },
          { label: 'Zerspanung von Großflanschen', value: 'Große Karusseldrehmaschinen und Bohrwerke' },
        ],
        certifications: [
          'Druckgeräterichtlinie DGRL 2014/68/EU Modul G & H/H1',
          'UDT-Herstellerzulassung für Druckgeräte',
          'ISO 3834-2 Schweißzertifikat',
          'AD 2000-Merkblatt HP0 / HP100R Zulassung',
        ],
      },
      UA: {
        title: 'Виробничі потужності цеху апаратів',
        specs: [
          { label: 'Холодне вальцювання', value: 'Товщина до 40 мм, ширина листа до 3000 мм' },
          { label: 'Діаметр апаратів', value: 'Від DN 500 до DN 4500 (повне заводське складання)' },
          { label: 'Автоматичне зварювання (SAW)', value: 'Зварювальні колони для поздовжніх та кільцевих швів' },
          { label: 'Механічна обробка', value: 'Великогабаритні карусельні та розточувальні верстати' },
        ],
        certifications: [
          'Директива PED 2014/68/EU Модулі G та H/H1',
          'Дозвіл UDT на виготовлення посудин під тиском',
          'ISO 3834-2 Вимоги до якості зварювання',
          'Сертифікат AD 2000-Merkblatt HP0',
        ],
      },
    },
    materialsAndNorms: {
      PL: {
        title: 'Materiały i normy konstrukcyjne',
        materials: [
          'Stale kotłowe i ciśnieniowe: P235GH, P265GH, P295GH, P355GH, 16Mo3, 13CrMo4-5',
          'Stale kwasoodporne: 1.4301 (304), 1.4404 (316L), 1.4541 (321), 1.4571 (316Ti)',
          'Stale Duplex i Super Duplex: 1.4462 (2205), 1.4410 (2507)',
          'Stopy tytanu i niklu: Gr. 2, Inconel 625, Hastelloy C-276',
        ],
        standards: [
          'PN-EN 13445: Nienarażane na płomień zbiorniki ciśnieniowe',
          'PN-EN 13480: Rurociągi przemysłowe metalowe',
          'AD 2000-Merkblätter: Niemiecki standard budowy zbiorników',
          'ASME Boiler and Pressure Vessel Code (Section VIII Div. 1)',
        ],
      },
      EN: {
        title: 'Material Grades & Design Standards',
        materials: [
          'Boiler & pressure carbon steels: P235GH, P265GH, P295GH, P355GH, 16Mo3, 13CrMo4-5',
          'Austenitic stainless steels: 1.4301 (304), 1.4404 (316L), 1.4541 (321), 1.4571 (316Ti)',
          'Duplex and Super Duplex: 1.4462 (2205), 1.4410 (2507)',
          'Titanium and Nickel alloys: Titanium Gr. 2, Inconel 625, Hastelloy C-276',
        ],
        standards: [
          'EN 13445: Unfired pressure vessels',
          'EN 13480: Metallic industrial piping',
          'AD 2000-Merkblätter: German pressure vessel technical code',
          'ASME Boiler and Pressure Vessel Code (Section VIII Div. 1)',
        ],
      },
      DE: {
        title: 'Werkstoffe & Berechnungsnormen',
        materials: [
          'Druckbehälterstähle: P235GH, P265GH, P295GH, P355GH, 16Mo3, 13CrMo4-5',
          'Austenitische Edelstähle: 1.4301 (304), 1.4404 (316L), 1.4541 (321), 1.4571 (316Ti)',
          'Duplex-Stähle: 1.4462 (2205), 1.4410 (2507)',
          'Sonderlegierungen: Titan Gr. 2, Inconel 625, Hastelloy C-276',
        ],
        standards: [
          'DIN EN 13445: Unbefeuerte Druckbehälter',
          'DIN EN 13480: Metallische industrielle Rohrleitungen',
          'AD 2000-Regelwerk',
          'ASME Code Section VIII Div. 1',
        ],
      },
      UA: {
        title: 'Матеріали та нормативні стандарти',
        materials: [
          'Котлові сталі: P235GH, P265GH, P295GH, P355GH, 16Mo3, 13CrMo4-5',
          'Кислотостійкі нержавіючі сталі: 1.4301 (304), 1.4404 (316L), 1.4541 (321)',
          'Дуплексні сталі: 1.4462 (2205), 1.4410 (2507)',
          'Титанові та нікелеві сплави: Titan Gr. 2, Inconel 625, Hastelloy C-276',
        ],
        standards: [
          'EN 13445: Посудини під тиском, що не підлягають вогневому нагріву',
          'EN 13480: Металеві промислові трубопроводи',
          'AD 2000-Merkblatt',
          'ASME Section VIII Div. 1',
        ],
      },
    },
    relatedRealizations: {
      PL: {
        title: 'Wybrane realizacje w obszarze aparatury ciśnieniowej',
        projects: [
          {
            title: 'Wytworzenie i montaż kolumny destylacyjnej DN 2800',
            clientSector: 'Sektor Rafineryjny',
            scope: 'Wykonanie ze stali kwasoodpornej 1.4404, transport gabarytowy, montaż pionowy dwoma dźwigami i odbiór UDT.',
          },
          {
            title: 'Bateria wymienników płaszczowo-rurowych wysokiego ciśnienia',
            clientSector: 'Przemysł Nawozowy i Chemiczny',
            scope: 'Wytworzenie 4 wymienników ze stali Duplex 1.4462 pracujących pod ciśnieniem 120 bar z próbami helowymi.',
          },
          {
            title: 'Reaktor syntezy ze stali kwasoodpornej z płaszczem grzejnym',
            clientSector: 'Chemia Specjalistyczna',
            scope: 'Prefabrykacja, montaż układu mieszadła, próby ciśnieniowe i rozruch technologiczny w strefie Ex.',
          },
        ],
      },
      EN: {
        title: 'Featured Pressure Vessel Projects',
        projects: [
          {
            title: 'DN 2800 Distillation Column Fabrication & Rigging',
            clientSector: 'Oil Refinery Complex',
            scope: 'Fabricated from 316L stainless steel, heavy transport, tandem crane vertical lifting, and statutory UDT acceptance.',
          },
          {
            title: 'High-Pressure Shell & Tube Exchanger Battery',
            clientSector: 'Fertilizer & Chemical Plant',
            scope: 'Manufacture of 4 Duplex 2205 exchangers operating at 120 bar with certified helium leak detection.',
          },
          {
            title: 'Jacketed Chemical Synthesis Reactor',
            clientSector: 'Specialty Chemical Processing',
            scope: 'Workshop fabrication, agitator shaft installation, hydrostatic testing, and ATEX commissioning.',
          },
        ],
      },
      DE: {
        title: 'Referenzen im Druckapparatebau',
        projects: [
          {
            title: 'Fertigung und Aufrichtung einer Destillationskolonne DN 2800',
            clientSector: 'Raffinerieindustrie',
            scope: 'Herstellung aus Edelstahl 1.4404, Schwertransport, Tandem-Kranaufrichtung und UDT-Abnahme.',
          },
          {
            title: 'Batterie von Hochdruck-Rohrbündelwärmetauschern',
            clientSector: 'Düngemittel- und Chemieindustrie',
            scope: 'Fertigung von 4 Wärmetauschern aus Duplex 1.4462 für 120 bar Betriebsdruck.',
          },
          {
            title: 'Beheizter Synthesereaktor aus Edelstahl',
            clientSector: 'Spezialchemie',
            scope: 'Vorfertigung, Rührwerksmontage, Druckprüfungen und Inbetriebnahme in der Ex-Zone.',
          },
        ],
      },
      UA: {
        title: 'Реалізовані проекти апаратів високого тиску',
        projects: [
          {
            title: 'Виготовлення та монтаж колони DN 2800',
            clientSector: 'Нафтопереробний сектор',
            scope: 'Виготовлення зі сталі 1.4404, негабаритне перевезення, підйом двома кранами та прийомка UDT.',
          },
          {
            title: 'Батарея кожухотрубних теплообмінників високого тиску',
            clientSector: 'Виробництво мінеральних добрив',
            scope: 'Виготовлення 4 теплообмінників зі сталі Duplex 1.4462 на робочий тиск 120 бар.',
          },
          {
            title: 'Хімічний реактор з сорочкою обігріву',
            clientSector: 'Спеціальна хімія',
            scope: 'Виготовлення в цеху, монтаж перемішуючого пристрою, гідровипробування та пусконалагодження.',
          },
        ],
      },
    },
    cta: {
      PL: {
        title: 'Potrzebujesz aparatu ciśnieniowego lub wymiennika?',
        description: 'Prześlij nam specyfikację lub kartę aparatu. Nasz zespół techniczny przygotuje optymalne rozwiązanie materiałowe i konstrukcyjne.',
        btnText: 'Zapytaj o wycenę aparatu',
        contactPerson: 'Dział Ofertowania Aparatury i Zbiorników',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      EN: {
        title: 'Need a custom pressure vessel or heat exchanger?',
        description: 'Send us your equipment datasheet. Our technical engineering team will review your specifications and deliver an optimized proposal.',
        btnText: 'Request Equipment Quote',
        contactPerson: 'Pressure Equipment Tendering Dept.',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      DE: {
        title: 'Benötigen Sie einen Druckbehälter oder Wärmetauscher?',
        description: 'Senden Sie uns Ihr Apparate-Datenblatt. Wir erstellen ein maßgeschneidertes technisches und kaufmännisches Angebot.',
        btnText: 'Apparateangebot anfordern',
        contactPerson: 'Angebotsabteilung Druckapparate & Wärmetauscher',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      UA: {
        title: 'Потрібен апарат під тиском чи теплообмінник?',
        description: 'Надішліть опитувальний лист або креслення. Наші фахівці підготують оптимальний розрахунок та графік виготовлення.',
        btnText: 'Отримати розрахунок',
        contactPerson: 'Відділ апаратів та ємнісного обладнання',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
    },
  },

  'montaz-urzadzen-przemyslowych': {
    slug: 'montaz-urzadzen-przemyslowych',
    canonicalUrl: 'https://chemorozruch.pl/montaz-urzadzen-przemyslowych/',
    heroImage: siteImages.epcTurnkey,
    targetKeywords: [
      'montaż urządzeń przemysłowych',
      'firma montażowa',
      'montaż mechaniczny urządzeń',
      'montaż pompowni przemysłowych',
      'montaż kompresorów i turbin',
      'osiowanie laserowe maszyn',
      'rozruchy mechaniczne i technologiczne',
    ],
    meta: {
      PL: {
        title: 'Montaż urządzeń przemysłowych – Doświadczona firma montażowa | CHEMOROZRUCH',
        description: 'CHEMOROZRUCH to sprawdzona firma montażowa realizująca mechaniczny montaż urządzeń przemysłowych, pompowni, kompresorów, turbozespołów i linii technologicznych.',
        keywords: 'montaż urządzeń przemysłowych, firma montażowa, montaż maszyn przemysłowych, instalacja pompowni, montaż turbin, osiowanie laserowe, rozruchy technologiczne',
        h1: 'Montaż urządzeń przemysłowych – Doświadczona firma montażowa',
        subtitle: 'Precyzyjny montaż maszyn wirnikowych, pompowni, kompresorowni, pieców i kompletnych ciągów technologicznych z osiowaniem laserowym.',
      },
      EN: {
        title: 'Industrial Equipment Installation & Mechanical Assembly Contractor | CHEMOROZRUCH',
        description: 'CHEMOROZRUCH is a premier mechanical assembly contractor delivering turnkey installation of industrial equipment, rotating machinery, compressors, pumps, and process lines.',
        keywords: 'industrial equipment installation, mechanical assembly contractor, machinery erection, pump station installation, laser alignment, process line commissioning',
        h1: 'Industrial Equipment Installation & Mechanical Assembly Contractor',
        subtitle: 'High-precision mechanical installation of rotating machinery, pump skids, compressors, furnaces, and complete technological systems.',
      },
      DE: {
        title: 'Industriemontage & Maschinenmontage – Fachunternehmen | CHEMOROZRUCH',
        description: 'CHEMOROZRUCH ist Ihr Generalunternehmer für Industriemontagen: Fachgerechte Montage von Maschinen, Pumpenstationen, Turbinen, Verdichtern und Fertigungslinien.',
        keywords: 'Industriemontage, Maschinenmontage, Montage von Industrieanlagen, Pumpenmontage, Turbinenmontage, Laseroptische Ausrichtung',
        h1: 'Industriemontage & Montage von Industrieanlagen',
        subtitle: 'Präzisionsmontage von rotierenden Maschinen, Verdichtern, Pumpenanlagen und Industrieöfen mit laseroptischer Ausrichtung.',
      },
      UA: {
        title: 'Монтаж промислового обладнання – Монтажна компанія CHEMOROZRUCH',
        description: 'CHEMOROZRUCH – професійна монтажна компанія, що здійснює механічний монтаж промислового обладнання, насосних станцій, компресорів та технологічних ліній.',
        keywords: 'монтаж промислового обладнання, монтажна компанія, монтаж машин та агрегатів, монтаж насосних, лазерне центрування, пусконалагоджувальні роботи',
        h1: 'Монтаж промислового обладнання та технологічних ліній',
        subtitle: 'Високоточний монтаж динамічного обладнання, насосів, компресорів та технологічних вузлів з лазерним центруванням.',
      },
    },
    breadcrumbs: {
      PL: { home: 'Strona Główna', section: 'Oferta', current: 'Montaż urządzeń' },
      EN: { home: 'Home', section: 'Offer', current: 'Equipment Assembly' },
      DE: { home: 'Startseite', section: 'Angebot', current: 'Industriemontage' },
      UA: { home: 'Головна', section: 'Послуги', current: 'Монтаж обладнання' },
    },
    overview: {
      PL: {
        lead: 'Jako doświadczona firma montażowa CHEMOROZRUCH specjalizuje się w kompleksowym mechanicznym montażu maszyn i urządzeń technologicznych dla przemysłu ciężkiego, chemicznego i energetycznego.',
        paragraphs: [
          'Realizujemy zadania w systemie Generalnego Wykonawstwa oraz pakietów montażowych, zapewniając pełen łańcuch wykonawczy: od rozładunku i transportu wewnątrzzakładowego, przez posadowienie na fundamentach, kotwienie i zalewanie masami bezskurczowymi, aż po laserowe osiowanie wałów i próby ruchowe na sucho i pod obciążeniem.',
          'Nasz zespół monterów maszynowych i inżynierów rozruchowych dysponuje certyfikowanym sprzętem pomiarowym, zapewniając dokładności pozycjonowania rzędu setnych części milimetra, co gwarantuje długą i bezawaryjną pracę układów napędowych.',
        ],
      },
      EN: {
        lead: 'As an established industrial mechanical contractor, CHEMOROZRUCH specializes in the turnkey installation of heavy rotating machinery, static process equipment, and integrated production lines.',
        paragraphs: [
          'We manage complete on-site assembly workflows: heavy offloading, intra-plant rigging, foundation setting, precision leveling, non-shrink epoxy grouting, optical and laser shaft alignment, and full commissioning support.',
          'Our mechanical specialists utilize state-of-the-art laser alignment tools and vibration analyzers, securing tolerances down to hundredths of a millimeter for maximum drivetrain longevity and reliability.',
        ],
      },
      DE: {
        lead: 'Als qualifiziertes Industriemontage-Unternehmen führt CHEMOROZRUCH die mechanische Montage von schweren Maschinen und verfahrenstechnischen Anlagen durch.',
        paragraphs: [
          'Wir übernehmen das gesamte Montagemanagement: Schwerlastabladung, innerbetrieblichen Transport, Fundamentsetzung, Verguss mit quellenden Spezialmörteln, Laserausrichtung und Inbetriebsetzungsbegleitung.',
          'Unsere Maschinenschlosser und Inbetriebsetzer garantieren höchste Präzision im Hundertstelmillimeterbereich für lange Standzeiten Ihrer Antriebe und Aggregate.',
        ],
      },
      UA: {
        lead: 'Як досвідчена монтажна компанія, CHEMOROZRUCH виконує механічний монтаж важкого технологічного обладнання, динамічних машин та комплексних ліній.',
        paragraphs: [
          'Ми забезпечуємо повний цикл робіт: розвантаження, внутрішній такелаж, встановлення на фундаменти, підливку безусадковими сумішами, лазерне центрування валів та комплексні пускові випробування.',
          'Наші фахівці використовують сучасні лазерні системи вивірки з точністю до сотих часток міліметра, що гарантує безвідмовну експлуатацію агрегатів.',
        ],
      },
    },
    scopeOfWork: {
      PL: {
        title: 'Zakres montażu mechanicznego urządzeń',
        subtitle: 'Od maszyn wirnikowych po kompletne linie technologiczne i rozruchy',
        items: [
          {
            title: 'Montaż maszyn wirnikowych i układów napędowych',
            description: 'Instalacja agregatów pompowych, kompresorów wielostopniowych, dmuchaw, wentylatorów przemysłowych, turbin parowych i generatorów.',
            details: ['Osiowanie laserowe wałów (tolerancja < 0,03 mm)', 'Pomiary drgań i wibracji', 'Wypoziomowanie i zalewanie masami epoksydowymi'],
          },
          {
            title: 'Montaż pompowni i stacji sprężania gazów',
            description: 'Kompletne orurowanie, montaż kolektorów ssawnych i tłocznych, montaż armatury zwrotnej i odcinającej oraz integracja z automatyką AKPiA.',
            details: ['Próby ciśnieniowe kolektorów', 'Montaż układów chłodzenia i smarowania', 'Eliminacja naprężeń na króćcach maszyn'],
          },
          {
            title: 'Montaż urządzeń technologicznych i filtracyjnych',
            description: 'Instalacja elektrofiltrów, filtrów workowych, cyklonów, pieców obrotowych, młynów kulowych, mieszalników i suszarni.',
            details: ['Montaż wielkogabarytowych segmentów', 'Wywrotki i montaż wewnątrz hal', 'Spawanie szczelne kanałów spalin i powietrza'],
          },
          {
            title: 'Rozruchy technologiczne i nadzór rozruchowy',
            description: 'Kompleksowe próby mechaniczne na sucho („cold commissioning”), płukanie olejowe układów smarowania, testy funkcjonalne i rozruch z medium procesowym.',
            details: ['Protokoły odbiorowe maszynowe', 'Pomiary temperatur łożysk i drgań', 'Przekazanie do ciągłej eksploatacji'],
          },
        ],
      },
      EN: {
        title: 'Mechanical Assembly Service Spectrum',
        subtitle: 'From high-speed rotating equipment to industrial plants and commissioning',
        items: [
          {
            title: 'Rotating Machinery & Drivetrain Assembly',
            description: 'Installation of high-capacity centrifugal pumps, multistage compressors, industrial blowers, steam turbines, and gearboxes.',
            details: ['Laser shaft alignment (tolerance < 0.03 mm)', 'Baseline vibration measurement', 'Precision epoxy and cementitious grouting'],
          },
          {
            title: 'Pump Stations & Gas Compression Packages',
            description: 'Turnkey skid installation, suction/discharge manifold piping, check/isolation valve mounting, and instrumentation tie-ins.',
            details: ['Hydrostatic manifold testing', 'Lube oil flushing & cooling circuit hookup', 'Nozzle load stress elimination'],
          },
          {
            title: 'Static Process, Separation & Filtration Equipment',
            description: 'Assembly of electrostatic precipitators, baghouses, cyclones, rotary kilns, ball mills, and industrial drying systems.',
            details: ['Heavy sectional rigging in confined halls', 'Tight-tolerance ducting & flanging', 'Seal welding of flue gas systems'],
          },
          {
            title: 'Cold & Hot Commissioning Support',
            description: 'Comprehensive dry-run mechanical testing, high-velocity lube oil flushing, vibration testing, and live-media process startup.',
            details: ['Certified machine test protocols', 'Thermal bearing monitoring', 'Handover to commercial operation'],
          },
        ],
      },
      DE: {
        title: 'Leistungsportfolio Maschinen- und Industriemontage',
        subtitle: 'Von rotierenden Maschinen bis zu kompletten Prozesslinien und Inbetriebnahmen',
        items: [
          {
            title: 'Montage von Rotationsmaschinen & Antrieben',
            description: 'Aufstellung von Industriepumpen, mehrstufigen Kompressoren, Dampfturbinen, Gebläsen und Großgetrieben.',
            details: ['Laseroptische Wellenausrichtung (< 0,03 mm)', 'Schwingungs- und Vibrationsmessung', 'Epoxidharz- und Zementverguss'],
          },
          {
            title: 'Pumpstationen & Gasverdichteranlagen',
            description: 'Komplette Verrohrung, Montage von Saug- und Drucksammlern, Armatureneinbau und EMSR-Anbindung.',
            details: ['Druckprüfungen der Rohrleitungen', 'Spülung der Schmierölsysteme', 'Kräftefreie Stutzenanbindung'],
          },
          {
            title: 'Filtrations- und Umwelttechnik',
            description: 'Montage von Elektrofiltern, Schlauchfiltern, Zyklonen, Drehrohröfen und Industrie-Mühlen.',
            details: ['Schwerlast-Montage in engen Hallen', 'Gasdichtes Verschweißen von Kanälen', 'Statische Ausrichtung'],
          },
          {
            title: 'Inbetriebsetzung & Probebetrieb',
            description: 'Mechanischer Trockenlauf, Schmieröl-Hochgeschwindigkeitsspülung, Funktionsprüfungen und Warm-Inbetriebnahme.',
            details: ['Vollständige Messprotokolle', 'Lager- und Schwingungsüberwachung', 'Übergabe an den Betreiber'],
          },
        ],
      },
      UA: {
        title: 'Послуги з монтажу обладнання',
        subtitle: 'Від роторних агрегатів до технологічних ліній та пусконалагодження',
        items: [
          {
            title: 'Монтаж динамічного обладнання та приводів',
            description: 'Встановлення насосних агрегатів, компресорів, вентиляторів, парових турбін та редукторів.',
            details: ['Лазерне центрування валів (< 0,03 мм)', 'Вібраційний аналіз', 'Підливка епоксидними компаундами'],
          },
          {
            title: 'Монтаж насосних станцій та компресорних',
            description: 'Обв’язка трубопроводами, встановлення запірно-регулюючої арматури та підключення систем КВПіА.',
            details: ['Гідравлічні випробування', 'Промивка систем мастила', 'Зняття механічних напружень з патрубків'],
          },
          {
            title: 'Монтаж фільтраційного та технологічного обладнання',
            description: 'Монтаж електрофільтрів, рукавних фільтрів, циклонів, млинів та сушильних барабанів.',
            details: ['Монтаж великогабаритних секцій', 'Такелажні роботи в діючих цехах', 'Герметичне зварювання газоходів'],
          },
          {
            title: 'Пусконалагоджувальні роботи та введення в експлуатацію',
            description: 'Холодна прокрутка, маслопромивка, випробування під навантаженням та вихід на робочі параметри.',
            details: ['Оформлення актів випробувань', 'Тепловізійний контроль підшипників', 'Здача в промислову експлуатацію'],
          },
        ],
      },
    },
    technicalCapabilities: {
      PL: {
        title: 'Wyposażenie montażowe i precyzja wykonania',
        specs: [
          { label: 'Osiowanie laserowe', value: 'Systemy laserowe Prüftechnik / Easy-Laser do osiowania wałów i geometrii' },
          { label: 'Pomiary wibracji i drgań', value: 'Wibrometry i analizatory widma FFT do diagnostyki dynamicznej' },
          { label: 'Hydraulika siłowa i naciąg', value: 'Klucze hydrauliczne dynamometryczne, naciągacze śrub do M100' },
          { label: 'Sprzęt dźwigowy i rolkowy', value: 'Zestawy rolek transportowych do 100t, siłowniki hydrauliczne synchronizowane' },
        ],
        certifications: [
          'Uprawnienia UDT do montażu i konserwacji urządzeń ciśnieniowych',
          'Certyfikat ISO 9001 / ISO 3834-2',
          'Uprawnienia SEP (G1, G2, G3) w zakresie dozoru i eksploatacji',
          'Certyfikacja personelu montażowego SCC** / VCA',
        ],
      },
      EN: {
        title: 'Rigging Equipment & Precision Tooling',
        specs: [
          { label: 'Laser Optical Alignment', value: 'Prüftechnik / Easy-Laser multi-axis shaft and geometric alignment systems' },
          { label: 'Vibration Diagnostics', value: 'FFT spectrum vibration analyzers for dynamic rotational verification' },
          { label: 'Hydraulic Bolt Tensioning', value: 'Calibrated hydraulic torque wrenches and bolt tensioners up to M100' },
          { label: 'Heavy Rigging Skates', value: 'Synchronized hydraulic jacking systems and heavy skates up to 100 tonnes' },
        ],
        certifications: [
          'UDT Authorization for Industrial Mechanical Assembly',
          'ISO 9001 Quality Management & ISO 3834-2 Welding Quality',
          'SEP Power & Thermal Engineering Operating Authorizations',
          'SCC** / VCA Certified Rigging and Assembly Crews',
        ],
      },
      DE: {
        title: 'Montageausrüstung und Präzisionswerkzeuge',
        specs: [
          { label: 'Laser-Wellenausrichtung', value: 'Prüftechnik / Easy-Laser Lasermesssysteme für Wellen und Flansche' },
          { label: 'Schwingungsdiagnose', value: 'FFT-Schwingungsanalysatoren für Abnahmemessungen' },
          { label: 'Hydraulische Verschraubung', value: 'Drehmomentschrauber und hydraulische Schraubenspanner bis M100' },
          { label: 'Schwerlast-Transportmittel', value: 'Hydraulische Hebegeräte und Schwerlast-Transportrollen bis 100 t' },
        ],
        certifications: [
          'UDT-Montagezulassung für Industrieanlagen',
          'Zertifizierung ISO 9001 / ISO 3834-2',
          'SEP-Berechtigungen für elektromechanische Antriebe',
          'SCC** / VCA Sicherheitszertifikat für Montagen',
        ],
      },
      UA: {
        title: 'Монтажне оснащення та точний інструмент',
        specs: [
          { label: 'Лазерне центрування', value: 'Лазерні системи Prüftechnik / Easy-Laser для вивірки валів' },
          { label: 'Вікбродіагностика', value: 'Аналізатори спектру FFT для динамічних випробувань' },
          { label: 'Гідравлічний затяг', value: 'Гідравлічні динамометричні ключі та тензорні домкрати до М100' },
          { label: 'Такелажне обладнання', value: 'Синхронізовані гідравлічні домкрати та котки до 100 тонн' },
        ],
        certifications: [
          'Дозволи UDT на монтаж промислового обладнання',
          'Сертифікат якості ISO 9001 та ISO 3834-2',
          'Допуски SEP на обслуговування електроустановок',
          'Сертифікація безпеки монтажного персоналу SCC** / VCA',
        ],
      },
    },
    materialsAndNorms: {
      PL: {
        title: 'Standardy montażowe i procedury odbiorowe',
        materials: [
          'Masy zalewowe: Podlewki bezskurczowe cementowe (C60/75) i epoksydowe wysokowytrzymałe',
          'Elementy złączne: Śruby sprężające klasy 8.8, 10.9, 12.9, kotwy chemiczne i wklejane Hilti/Fischer',
          'Uszczelnienia przemysłowe: Uszczelki spiralne, wielokrawędziowe Kammprofile, grafit zbrojony, PTFE',
          'Rurociągi technologiczne: Stale austenityczne, węglowe, stopy specjalne',
        ],
        standards: [
          'PN-EN ISO 10816: Drgania mechaniczne — Ocena drgań maszyn',
          'PN-EN ISO 1940: Wymagania dotyczące jakości wyważenia wirników',
          'Wytyczne producentów maszyn (OEM) i standardy API 686',
          'Warunki Techniczne Wykonania i Odbioru Robót Budowlano-Montażowych',
        ],
      },
      EN: {
        title: 'Installation Standards & Acceptance Norms',
        materials: [
          'Grouting compounds: High-strength non-shrink cementitious (C60/75) and structural epoxy grouts',
          'Fasteners & Anchoring: High-tensile bolts Gr. 8.8, 10.9, 12.9, heavy chemical anchor systems',
          'Industrial Gasketing: Spiral wound gaskets, Kammprofile, reinforced expanded graphite, PTFE',
          'Process interconnecting lines: Stainless, carbon steel, and specialty alloys',
        ],
        standards: [
          'ISO 10816: Mechanical vibration — Evaluation of machine vibration',
          'ISO 1940: Balance quality requirements for rotors',
          'API 686: Recommended Practice for Machinery Installation and Installation Design',
          'OEM Manufacturer Installation and Commissioning Specifications',
        ],
      },
      DE: {
        title: 'Montagestandards und Richtlinien',
        materials: [
          'Vergussmörtel: Quellfähiger Spezialzementmörtel (C60/75) und Epoxidharz-Vergussmassen',
          'Verbindungselemente: Hochfeste Schrauben 8.8, 10.9, 12.9, Schwerlast-Verbundanker',
          'Dichtungstechnik: Spiraldichtungen, Kammprofildichtungen, Reingrafit, PTFE',
          'Anschlussleitungen: Edelstahl, Kesselbaustahl, Sonderwerkstoffe',
        ],
        standards: [
          'DIN ISO 10816: Mechanische Schwingungen von Maschinen',
          'DIN ISO 1940: Anforderungen an die Auswuchtgüte',
          'API 686 Industriestandard für Maschineninstallation',
          'OEM-Herstellervorschriften und Werksnormen',
        ],
      },
      UA: {
        title: 'Монтажні стандарти та регламенти',
        materials: [
          'Підливні суміші: Високоміцні безусадкові цементні (C60/75) та епоксидні розчини',
          'Кріпильні вироби: Високоміцне кріплення класів 8.8, 10.9, 12.9, хімічні анкери',
          'Ущільнення: Спірально-навиті прокладки, гребінчасті (Kammprofile), терморозширений графіт',
          'Трубопровідна обв’язка: Нержавіючі та вуглецеві сталі',
        ],
        standards: [
          'ISO 10816: Вібрація механічна — Оцінка вібрації машин',
          'ISO 1940: Вимоги до якості балансування роторів',
          'API 686: Регламент монтажу роторного обладнання',
          'Інструкції заводів-виробників (OEM)',
        ],
      },
    },
    relatedRealizations: {
      PL: {
        title: 'Wybrane realizacje montażu urządzeń',
        projects: [
          {
            title: 'Montaż pompowni technologicznej i rurociągów przesyłowych',
            clientSector: 'Przemysł Petrochemiczny',
            scope: 'Posadowienie i laserowe osiowanie 8 agregatów pompowych dużej wydajności, montaż kolektorów DN 600 ze stali kwasoodpornej i rozruch technologiczny.',
          },
          {
            title: 'Montaż turbozespołu i kompresora procesowego gazu',
            clientSector: 'Zakład Syntezy Chemicznej',
            scope: 'Precyzyjny montaż kompresora odśrodkowego na fundamencie żelbetowym, zalanie masą epoksydową, osiowanie z dokładnością do 0,02 mm i próby 72h.',
          },
          {
            title: 'Montaż linii filtracji spalin z elektrofiltrem i wentylatorami ciągu',
            clientSector: 'Energetyka Przemysłowa',
            scope: 'Montaż konstrukcji nośnej, elektrofiltru 3-polowego, wentylatorów spalin z silnikami 630 kW oraz kanałów spalin.',
          },
        ],
      },
      EN: {
        title: 'Industrial Assembly Highlights',
        projects: [
          {
            title: 'Process Pump Station & Transmission Manifolds',
            clientSector: 'Petrochemical Industry',
            scope: 'Foundation setting and laser alignment of 8 high-capacity pump skids, installation of DN 600 stainless manifolds, and wet commissioning.',
          },
          {
            title: 'Process Gas Turbocompressor Train Erection',
            clientSector: 'Chemical Synthesis Complex',
            scope: 'High-precision mounting of centrifugal compressor train, epoxy grouting, alignment to 0.02 mm tolerance, and 72-hour continuous test run.',
          },
          {
            title: 'Flue Gas Treatment Line with Electrostatic Precipitator',
            clientSector: 'Industrial Power Sector',
            scope: 'Structural erection, 3-field electrostatic precipitator assembly, 630 kW induced draft fan sets, and complete ductwork tie-in.',
          },
        ],
      },
      DE: {
        title: 'Ausgewählte Industriemontage-Referenzen',
        projects: [
          {
            title: 'Montage einer Prozess-Pumpstation und Verteilerleitungen',
            clientSector: 'Petrochemische Industrie',
            scope: 'Aufstellung und Laserausrichtung von 8 Großpumpen-Aggregaten, Montage von DN-600-Edelstahlsammlern und Probebetrieb.',
          },
          {
            title: 'Montage eines Prozessgas-Turbokompressorstrangs',
            clientSector: 'Chemische Industrie',
            scope: 'Präzisionsmontage des Zentrifugalkompressors, Epoxidverguss, Ausrichtung mit 0,02 mm Toleranz und 72-Stunden-Dauerlauf.',
          },
          {
            title: 'Rauchgasreinigungsanlage mit Elektrofilter und Saugzuggebläsen',
            clientSector: 'Industriekraftwerk',
            scope: 'Montage von Stahlgerüst, 3-Feld-Elektrofilter, 630-kW-Saugzuggebläsen und gasdichten Rauchgaskanälen.',
          },
        ],
      },
      UA: {
        title: 'Реалізовані проекти монтажу обладнання',
        projects: [
          {
            title: 'Монтаж технологічної насосної станції та колекторів',
            clientSector: 'Нафтохімічний комплекс',
            scope: 'Встановлення та лазерне центрування 8 насосних агрегатів, монтаж колекторів DN 600 з нержавіючої сталі та пусконалагодження.',
          },
          {
            title: 'Монтаж турбокомпресора технологічного газу',
            clientSector: 'Хімічний завод',
            scope: 'Монтаж відцентрового компресора, епоксидна підливка, центрування з точністю до 0,02 мм та 72-годинні комплексні випробування.',
          },
          {
            title: 'Монтаж лінії газоочистки з електрофільтром та димососами',
            clientSector: 'Промислова енергетика',
            scope: 'Монтаж металоконструкцій, 3-пільного електрофільтра, димососів з двигунами 630 кВт та газоходів.',
          },
        ],
      },
    },
    cta: {
      PL: {
        title: 'Szukasz doświadczonej firmy montażowej?',
        description: 'Skontaktuj się z naszym Działem Realizacji. Zapewniamy kompletne ekipy monterskie, certyfikowany sprzęt dźwigowy i nadzór inżynierski.',
        btnText: 'Zapytaj o montaż urządzeń',
        contactPerson: 'Dział Przygotowania i Realizacji Montaży',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      EN: {
        title: 'Looking for a reliable mechanical installation contractor?',
        description: 'Contact our Projects & Assembly Team. We provide qualified mechanical crews, precision alignment tooling, and full engineering supervision.',
        btnText: 'Inquire About Installation',
        contactPerson: 'Mechanical Projects & Assembly Dept.',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      DE: {
        title: 'Suchen Sie ein erfahrenes Industriemontage-Unternehmen?',
        description: 'Kontaktieren Sie unsere Montageabteilung. Wir stellen qualifizierte Fachkräfte, Präzisionswerkzeuge und Bauleitung.',
        btnText: 'Industriemontage anfragen',
        contactPerson: 'Abteilung Industriemontage & Großprojekte',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
      UA: {
        title: 'Шукаєте надійну монтажну компанію?',
        description: 'Зв’яжіться з нашим відділом реалізації проектів для погодження монтажних бригад, техніки та графіків виконання робіт.',
        btnText: 'Замовити монтаж обладнання',
        contactPerson: 'Відділ підготовки та реалізації монтажів',
        email: 'oferty@chemorozruch.pl',
        phone: '+48 33 844 14 00',
      },
    },
  },
};
