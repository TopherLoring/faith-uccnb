import React, { useState } from 'react';

interface UCCCommaProps {
  className?: string;
  size?: number;
  showCaption?: boolean;
  interactive?: boolean;
}

export const UCCComma: React.FC<UCCCommaProps> = ({ 
  className = '', 
  size = 48,
  showCaption = false,
  interactive = false
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div 
        className="relative flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{ width: size, height: size }}
        title="Faith Church is an Open and Affirming (ONA) Congregation — God is Still Speaking"
      >
        {!imageError ? (
          <img
            src="https://www.faithuccnb.org/wp-content/uploads/2021/02/rainbow-comma-logo.png"
            alt="Faith UCC Rainbow Comma Logo"
            className="w-full h-full object-contain drop-shadow-sm select-none"
            onError={() => setImageError(true)}
            loading="eager"
          />
        ) : (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm"
          >
            <defs>
              <linearGradient id="prideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="20%" stopColor="#EA580C" />
                <stop offset="40%" stopColor="#EAB308" />
                <stop offset="60%" stopColor="#16A34A" />
                <stop offset="80%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="36" r="18" fill="url(#prideGrad)" />
            <path d="M 50 36 C 50 56, 32 76, 24 82 C 38 78, 54 68, 54 36 Z" fill="url(#prideGrad)" />
          </svg>
        )}
      </div>

      {showCaption && (
        <div className="text-left">
          <p className="font-serif font-bold text-base sm:text-lg text-twilight-500 dark:text-white leading-tight">
            Faith UCC
          </p>
          <p className="text-xs text-terracotta-600 dark:text-terracotta-400 font-semibold">
            Open & Affirming • New Braunfels, TX
          </p>
        </div>
      )}
    </div>
  );
};
