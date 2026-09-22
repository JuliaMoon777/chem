import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { CLIENTS_DATA } from '../data/clientsData';

interface TrustedBySectionProps {
  currentLang?: Language;
}

const SECTION_TITLES: Record<Language, string> = {
  PL: 'Zaufali nam',
  EN: 'Trusted by',
  DE: 'Sie vertrauen uns',
  UA: 'Нам довіряють',
};

export const TrustedBySection: React.FC<TrustedBySectionProps> = ({ currentLang = 'PL' }) => {
  const title = SECTION_TITLES[currentLang] || 'Zaufali nam';
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="zaufali-nam"
      aria-label={title}
      className="relative w-full bg-[#fbfcfd] border-t border-b border-slate-200/70 py-12 sm:py-16 lg:py-18 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8 sm:mb-12"
        >
          <div className="h-px w-8 sm:w-12 bg-slate-300/80" />
          <h2 className="text-xs sm:text-sm font-mono font-bold tracking-[0.22em] text-slate-500 uppercase text-center">
            {title}
          </h2>
          <div className="h-px w-8 sm:w-12 bg-slate-300/80" />
        </motion.div>

        {/* 4 Logos grid: 4 cols on desktop, 2x2 on tablet/mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {CLIENTS_DATA.map((client, index) => {
            const hasError = imageErrors[client.id];

            return (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex items-center justify-center p-4 sm:p-6 bg-white/80 hover:bg-white border border-slate-200/80 hover:border-slate-300 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 min-h-[84px] sm:min-h-[100px]"
              >
                {!hasError ? (
                  <img
                    src={client.logo}
                    alt={client.alt}
                    loading="lazy"
                    onError={() => handleImageError(client.id)}
                    className="max-h-8 sm:max-h-10 w-auto max-w-[85%] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-slate-800 text-center px-2">
                    {client.name}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
