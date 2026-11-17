import React from 'react';

interface UCCCommaProps {
  className?: string;
  size?: number;
  interactive?: boolean;
  animate?: boolean;
}

export const UCCComma: React.FC<UCCCommaProps> = ({ 
  className = '', 
  size = 48,
  interactive = true,
  animate = true
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ${
        interactive ? 'hover:scale-110 cursor-pointer group' : ''
      } ${className}`}
      title="God is Still Speaking — 'Never place a period where God has placed a comma.'"
      role="img"
      aria-label="United Church of Christ Still Speaking Comma Logo"
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`transform transition-all duration-500 group-hover:rotate-6 drop-shadow-md ${
          animate ? 'animate-pulse-subtle' : ''
        }`}
      >
        <defs>
          <linearGradient id="uccRainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C25E34" />
            <stop offset="30%" stopColor="#D97706" />
            <stop offset="60%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C25E34" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Comma Head */}
        <circle 
          cx="52" 
          cy="36" 
          r="19" 
          fill="url(#uccRainbowGrad)" 
          filter="url(#glowEffect)"
          className="transition-all duration-300 group-hover:fill-opacity-95"
        />
        
        {/* Comma Sweeping Tail */}
        <path 
          d="M 52 36 C 52 58, 30 78, 22 84 C 36 80, 56 68, 56 36 Z" 
          fill="url(#uccRainbowGrad)"
          className="transition-all duration-300 group-hover:fill-opacity-95"
        />
      </svg>
    </div>
  );
};
