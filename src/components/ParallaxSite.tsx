import React, { useState } from 'react';
import { Language } from '../types';
import { IndustrialHeader } from './IndustrialHeader';
import { IndustrialHeroParallax } from './IndustrialHeroParallax';
import { AnimatedNumbersSection } from './AnimatedNumbersSection';
import { InteractiveDiscoverySection } from './InteractiveDiscoverySection';
import { CompetenciesSection } from './CompetenciesSection';
import { TechFacilitiesSection } from './TechFacilitiesSection';
import { ProjectProcessSection } from './ProjectProcessSection';
import { RealizationsSection } from './RealizationsSection';
import { CertificatesSection } from './CertificatesSection';
import { LocationsSection } from './LocationsSection';
import { ContactCTASection } from './ContactCTASection';
import { IndustrialFooter } from './IndustrialFooter';
import { FloatingGlobalNav } from './FloatingGlobalNav';
import { ContactModal } from './ContactModal';

export const ParallaxSite: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('PL');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (subject?: string) => {
    setInquirySubject(subject);
    setIsInquiryOpen(true);
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
        onLanguageChange={setCurrentLang}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* 2. HERO / FIRST SCREEN (Aerial plant from above, moving clouds, staggered parallax) */}
      <IndustrialHeroParallax
        currentLang={currentLang}
        onOpenInquiry={() => handleOpenInquiry()}
        onExploreClick={handleExploreScroll}
      />

      {/* 3. FIRST PART — ANIMATED COMPANY NUMBERS (Verified facts, smooth counter reveal & engineering lines) */}
      <AnimatedNumbersSection currentLang={currentLang} />

      {/* 4. SECOND PART — INTERACTIVE COMPANY DISCOVERY (Editorial accordion & dynamic single image) */}
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

      {/* 7. FIFTH PART — OD PROJEKTU DO URUCHOMIENIA (Continuous architectural process line, 6 stages, scroll drawing & click reveal) */}
      <ProjectProcessSection currentLang={currentLang} />

      {/* 8. SIXTH PART — REALIZACJE (Cinematic project showcase, one dominant project at a time, scroll transitions & minimal info) */}
      <RealizationsSection currentLang={currentLang} />

      {/* 9. SEVENTH PART — CERTYFIKATY / JAKOŚĆ (Editorial standards index, calm rhythm, animated dividers & expand details) */}
      <CertificatesSection currentLang={currentLang} />

      {/* 10. EIGHTH PART — ODDZIAŁY / LOKALIZACJE (Minimal Poland map, synchronized markers & city list, expand contacts) */}
      <LocationsSection currentLang={currentLang} />

      {/* 11. NINTH PART — KONTAKT / FINAL CTA (Large premium industrial scene, editorial headline, minimal underline form reveal & direct contacts) */}
      <ContactCTASection currentLang={currentLang} />

      {/* 12. FINAL PART — FOOTER (Editorial light ending, brand identity, language switcher, 3 columns, large subtle watermark & back to top) */}
      <IndustrialFooter
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* 13. GLOBAL FLOATING NAVIGATION CAPSULE (Translucent organic dock on desktop / pill & sheet on mobile) */}
      <FloatingGlobalNav currentLang={currentLang} />

      {/* 14. INQUIRY MODAL */}
      <ContactModal
        isOpen={isInquiryOpen}
        onClose={() => {
          setIsInquiryOpen(false);
          setInquirySubject(undefined);
        }}
        currentLang={currentLang}
        initialSubject={inquirySubject}
      />
    </div>
  );
};

export default ParallaxSite;

