import React from 'react';

interface ChemorozruchLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const ChemorozruchLogo: React.FC<ChemorozruchLogoProps> = ({
  className = 'w-9 h-9',
  iconOnly = true,
}) => {
  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="chemoGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E31E24" />
            <stop offset="60%" stopColor="#EA3826" />
            <stop offset="100%" stopColor="#F96332" />
          </linearGradient>
          <filter id="iconShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#E31E24" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#iconShadow)">
          {/* Outer thick circular C */}
          <path
            d="M 120,15 
               C 178,15 224,61 227,118 
               L 177,118 
               C 174,88 150,65 120,65 
               C 86,65 58,93 58,127 
               C 58,161 86,189 120,189 
               C 150,189 174,166 177,136 
               L 227,136 
               C 224,193 178,239 120,239 
               C 58,239 8,189 8,127 
               C 8,65 58,15 120,15 Z"
            fill="url(#chemoGradIcon)"
          />

          {/* Left vertical of H */}
          <rect x="85" y="72" width="28" height="110" rx="3" fill="url(#chemoGradIcon)" />
          {/* Horizontal crossbar of H */}
          <rect x="85" y="113" width="60" height="28" fill="url(#chemoGradIcon)" />
          {/* Right vertical of H / Top of R */}
          <rect x="145" y="72" width="28" height="69" rx="3" fill="url(#chemoGradIcon)" />
          {/* Top loop of R */}
          <rect x="173" y="72" width="44" height="42" rx="4" fill="url(#chemoGradIcon)" />
          <rect x="183" y="83" width="22" height="20" rx="2" fill="#ffffff" />
          {/* Diagonal leg of R */}
          <polygon
            points="145,141 173,141 216,192 186,192"
            fill="url(#chemoGradIcon)"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1100 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="chemoGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E31E24" />
          <stop offset="60%" stopColor="#EA3826" />
          <stop offset="100%" stopColor="#F96332" />
        </linearGradient>
      </defs>

      <g>
        <g transform="translate(10, 0)">
          {/* Outer thick C-circle */}
          <path
            d="M 110,10 
               C 170,10 215,55 218,110 
               L 168,110 
               C 165,80 142,58 110,58 
               C 76,58 48,86 48,120 
               C 48,154 76,182 110,182 
               C 142,182 165,160 168,130 
               L 218,130 
               C 215,185 170,230 110,230 
               C 49,230 0,181 0,120 
               C 0,59 49,10 110,10 Z"
            fill="url(#chemoGradFull)"
          />

          <rect x="75" y="65" width="28" height="110" rx="3" fill="url(#chemoGradFull)" />
          <rect x="75" y="106" width="60" height="28" fill="url(#chemoGradFull)" />
          <rect x="135" y="65" width="28" height="69" rx="3" fill="url(#chemoGradFull)" />
          <rect x="163" y="65" width="46" height="42" rx="4" fill="url(#chemoGradFull)" />
          <rect x="175" y="77" width="22" height="18" rx="2" fill="#ffffff" />
          <polygon
            points="135,134 163,134 208,185 178,185"
            fill="url(#chemoGradFull)"
          />
        </g>

        <text
          x="300"
          y="162"
          fill="#18181b"
          style={{
            fontFamily: "system-ui, -apple-system, 'Inter', 'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: '118px',
            letterSpacing: '-0.02em',
          }}
        >
          CHEMOROZRUCH
        </text>

        <g transform="translate(1045, 82)">
          <circle cx="16" cy="16" r="15" stroke="#E31E24" strokeWidth="3" fill="none" />
          <text
            x="16"
            y="22"
            textAnchor="middle"
            fill="#E31E24"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 800,
              fontSize: '18px',
            }}
          >
            R
          </text>
        </g>
      </g>
    </svg>
  );
};
