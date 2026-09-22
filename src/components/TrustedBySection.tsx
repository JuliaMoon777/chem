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
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  // Render only clients that have verified real logo assets and didn't fail loading
  const visibleClients = CLIENTS_DATA.filter(
    (client) => Boolean(client.hasRealLogo) && !failedLogos[client.id]
  );

  // If there are no real logos available yet, hide the entire section completely
  if (visibleClients.length === 0) {
    return null;
  }

  const handleImageError = (id: string) => {
    setFailedLogos((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="zaufali-nam"
      aria-label={title}
      className="relative w-full bg-[#fbfcfd] border-t border-b border-slate-200/60 py-10 sm:py-14 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle section header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8 sm:mb-10"
        >
          <div className="h-px w-8 sm:w-12 bg-slate-300/80" />
          <h2 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase text-center font-sans">
            {title}
          </h2>
          <div className="h-px w-8 sm:w-12 bg-slate-300/80" />
        </motion.div>

        {/* Clean, calm row of real logos - no heavy frames or empty boxes */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {visibleClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center justify-center h-12 sm:h-14 px-2"
            >
              <img
                src={client.logo}
                alt={client.alt}
                loading="lazy"
                onError={() => handleImageError(client.id)}
                className="max-h-9 sm:max-h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain transition-opacity duration-200"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
