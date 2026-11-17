import React from 'react';
import { churchInfo, onaDeclaration } from '../../data/churchData';
import { UCCComma } from '../ui/UCCComma';
import { Countdown } from '../ui/Countdown';
import { Calendar, Video, Heart, ArrowDown, MapPin, Sparkles, Leaf, UtensilsCrossed } from 'lucide-react';

interface HeroSectionProps {
  onScrollTo?: (id: string) => void;
  onNavigate?: (view: any) => void;
  onOpenZoom: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollTo, onNavigate, onOpenZoom }) => {
  const handleScroll = (id: string) => {
    if (onScrollTo) {
      onScrollTo(id);
    } else if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full pt-8 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Affirming Identity Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-sand-200 dark:border-slate-700 text-xs sm:text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-twilight-600 dark:text-slate-200">
              Open & Affirming (ONA) Congregation
            </span>
            <span className="text-sand-300 dark:text-slate-600">•</span>
            <span className="text-terracotta-600 dark:text-terracotta-400 font-bold">
              New Braunfels, Texas
            </span>
          </div>

          <Countdown onJoinWorship={onOpenZoom} />
        </div>

        {/* Hero Narrative Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 justify-center">
            <UCCComma size={56} />
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 block">
                United Church of Christ
              </span>
              <span className="font-serif italic text-sm text-gray-600 dark:text-slate-300">
                &ldquo;Never place a period where God has placed a comma.&rdquo;
              </span>
            </div>
          </div>

          <h1 className="hero-title text-twilight-600 dark:text-white font-bold">
            You are Beloved.{' '}
            <span className="block pride-text">
              Exactly as you were created.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to Faith United Church of Christ. We are an openly affirming Christian community in the Texas Hill Country where LGBTQ+ people, seekers with honest questions, and families of every configuration are celebrated as sacred gifts of God.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => handleScroll('visiting')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm sm:text-base hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              <span>Join Us This Sunday at 10 AM</span>
            </button>

            <button
              onClick={onOpenZoom}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white dark:bg-slate-800 text-twilight-600 dark:text-white font-bold rounded-2xl shadow-sm hover:shadow-md border border-sand-200 dark:border-slate-700 hover:bg-sand-50 dark:hover:bg-slate-700 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base hover:-translate-y-0.5"
            >
              <Video className="w-5 h-5 text-twilight-500 dark:text-twilight-400" />
              <span>Watch Online via Zoom</span>
            </button>

            <button
              onClick={() => handleScroll('affirming')}
              className="px-5 py-3.5 text-twilight-600 dark:text-slate-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 font-semibold text-sm sm:text-base transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span>Our Affirming Covenant</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Core Pillars Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 sm:pt-12 text-left">
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-sand-200 dark:border-slate-700 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
              </div>
              <h3 className="font-serif font-bold text-twilight-600 dark:text-white text-base">
                Open & Affirming
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                Full celebration of LGBTQ+ members and leaders. Every soul and love is sacred.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-sand-200 dark:border-slate-700 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center mb-3">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-twilight-600 dark:text-white text-base">
                Christ’s Open Table
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                Communion celebrated 1st Sundays. Absolutely everyone is invited to the table.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-sand-200 dark:border-slate-700 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-twilight-600 dark:text-white text-base">
                Action & Hunger Relief
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                Fighting hunger with the SOS Food Bank, civil rights, and caring for creation.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
