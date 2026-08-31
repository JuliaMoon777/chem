import React, { useState } from 'react';
import { Language } from '../types';
import { IndustrialHeader } from './IndustrialHeader';
import { IndustrialHeroParallax } from './IndustrialHeroParallax';
import { AnimatedNumbersSection } from './AnimatedNumbersSection';
import { InteractiveDiscoverySection } from './InteractiveDiscoverySection';
import { CompetenciesSection } from './CompetenciesSection';
import { TechFacilitiesSection } from './TechFacilitiesSection';
import { RealizationsSection } from './RealizationsSection';
import { CertificatesSection } from './CertificatesSection';
import { LocationsSection } from './LocationsSection';
import { ContactCTASection } from './ContactCTASection';
import { IndustrialFooter } from './IndustrialFooter';
import { FloatingGlobalNav } from './FloatingGlobalNav';
import { LegalModal, LegalDocType } from './LegalModal';

interface ParallaxSiteProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  onNavigateService?: (slug: string) => void;
  onOpenLegal?: (doc: LegalDocType) => void;
}

export const ParallaxSite: React.FC<ParallaxSiteProps> = ({
  currentLang: externalLang,
  onLanguageChange: externalOnLanguageChange,
  onNavigateService,
  onOpenLegal: externalOnOpenLegal,
}) => {
  const [internalLang, setInternalLang] = useState<Language>('PL');
  const [internalLegalDoc, setInternalLegalDoc] = useState<LegalDocType>(null);

  const currentLang = externalLang || internalLang;
  const handleLanguageChange = (lang: Language) => {
    if (externalOnLanguageChange) {
      externalOnLanguageChange(lang);
    } else {
      setInternalLang(lang);
    }
  };

  const handleOpenLegalDoc = (doc: LegalDocType) => {
    if (externalOnOpenLegal) {
      externalOnOpenLegal(doc);
    } else {
      setInternalLegalDoc(doc);
    }
  };

  const handleOpenInquiry = (subject?: string) => {
    const target = document.getElementById('kontakt-cta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      const email = 'oferty@chemorozruch.pl';
      const mailtoUrl = subject
        ? `mailto:${email}?subject=${encodeURIComponent(`Zapytanie ofertowe: ${subject}`)}`
        : `mailto:${email}?subject=${encodeURIComponent('Zapytanie ofertowe — CHEMOROZRUCH')}`;
      window.location.href = mailtoUrl;
    }
  };

  const handleExploreScroll = () => {
    const target = document.getElementById('company-numbers-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fbfcfd] text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* 1. HEADER (Minimal, light, elegant, transparent over hero) */}
      <IndustrialHeader
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* 2. HERO / FIRST SCREEN (Aerial plant from above, pure white fluffy moving clouds, staggered parallax) */}
      <IndustrialHeroParallax
        currentLang={currentLang}
        onOpenInquiry={() => handleOpenInquiry()}
        onExploreClick={handleExploreScroll}
      />

      {/* 3. FIRST PART — ANIMATED COMPANY NUMBERS (Verified facts, smooth counter reveal & engineering lines) */}
      <AnimatedNumbersSection currentLang={currentLang} />

      {/* 4. SECOND PART — INTERACTIVE COMPANY DISCOVERY / O FIRMIE (Editorial accordion & dynamic single image) */}
      <InteractiveDiscoverySection
        currentLang={currentLang}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* 5. THIRD PART — NASZE KOMPETENCJE / OFERTA (Asymmetric visual storytelling & sticky image synchronization) */}
      <CompetenciesSection
        currentLang={currentLang}
        onOpenInquiry={(subj) => handleOpenInquiry(subj)}
      />

      {/* 6. FOURTH PART — ZAPLECZE TECHNOLOGICZNE (Editorial composition, dominant image, supporting equipment & click reveals) */}
      <TechFacilitiesSection currentLang={currentLang} />

      {/* 7. FIFTH PART — REALIZACJE (Cinematic project showcase, one dominant project at a time, scroll transitions & minimal info) */}
      <RealizationsSection currentLang={currentLang} />

      {/* 8. SIXTH PART — CERTYFIKATY / JAKOŚĆ (Editorial standards index, calm rhythm, animated dividers & expand details) */}
      <CertificatesSection currentLang={currentLang} />

      {/* 9. SEVENTH PART — LOKALIZACJE / ODDZIAŁY (Interactive Google Maps, Oświęcim HQ & Płock branch) */}
      <LocationsSection currentLang={currentLang} />

      {/* 10. EIGHTH PART — KONTAKT (Editorial department-based direct contacts & company information) */}
      <ContactCTASection
        currentLang={currentLang}
        onOpenLegal={(doc) => handleOpenLegalDoc(doc)}
      />

      {/* 11. FINAL PART — FOOTER (Editorial light ending, brand identity, language switcher, 4 columns, legal triggers) */}
      <IndustrialFooter
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenLegal={(doc) => handleOpenLegalDoc(doc)}
      />

      {/* 12. GLOBAL FLOATING NAVIGATION CAPSULE (Translucent organic dock on desktop / pill & sheet on mobile) */}
      <FloatingGlobalNav currentLang={currentLang} />

      {/* 13. OFFICIAL LEGAL MODAL (When rendered standalone without App.tsx wrapper) */}
      {!externalOnOpenLegal && (
        <LegalModal
          isOpen={internalLegalDoc !== null}
          docType={internalLegalDoc}
          onClose={() => setInternalLegalDoc(null)}
        />
      )}
    </div>
  );
};

export default ParallaxSite;
