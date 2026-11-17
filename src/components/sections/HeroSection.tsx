import React from 'react';
import { churchInfo } from '../../data/churchData';
import { UCCComma } from '../ui/UCCComma';
import { Countdown } from '../ui/Countdown';
import { ViewState } from '../../types';
import { Calendar, Video, ArrowDown, MapPin, Sparkles, Heart } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: ViewState) => void;
  onOpenZoom: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenZoom }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 sm:pt-14 sm:pb-28">
      {/* Decorative ambient blurred blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-200/40 via-terracotta-200/30 to-pink-200/20 dark:from-amber-900/20 dark:via-terracotta-900/20 dark:to-purple-900/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges & Service Countdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200/60 dark:border-slate-700/60 text-xs sm:text-sm font-semibold shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta-500"></span>
            </span>
            <span className="text-gray-700 dark:text-slate-200">
              Open & Affirming (ONA) Congregation
            </span>
            <span className="text-gray-300 dark:text-slate-600">•</span>
            <span className="text-terracotta-600 dark:text-terracotta-400 font-bold">
              New Braunfels, TX
            </span>
          </div>

          <Countdown onJoinWorship={onOpenZoom} />
        </div>

        {/* Hero Central Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 justify-center mb-2">
            <UCCComma size={56} />
            <div className="text-left">
              <p className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400">
                United Church of Christ
              </p>
              <p className="text-sm font-serif italic text-gray-600 dark:text-slate-300">
                &ldquo;Never place a period where God has placed a comma&rdquo;
              </p>
            </div>
          </div>

          <h1 className="font-serif font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
            Where Grace Meets You{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-500 via-amber-600 to-pink-600">
              Just As You Are.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to Faith United Church of Christ. We are an inclusive, progressive Christian community embracing diversity, living out social justice, and celebrating every person's journey.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => { onNavigate('plan-visit'); window.scrollTo(0, 0); }}
              className="px-7 py-3.5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 text-base"
            >
              <Calendar className="w-5 h-5" />
              <span>Plan Your First Visit</span>
            </button>

            <button
              onClick={() => { onNavigate('worship'); window.scrollTo(0, 0); }}
              className="px-7 py-3.5 bg-white dark:bg-slate-800 text-gray-800 dark:text-white font-bold rounded-2xl shadow-md hover:shadow-lg border border-gray-200 dark:border-slate-700 hover:bg-cream-50 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 text-base"
            >
              <Video className="w-5 h-5 text-twilight-500" />
              <span>Watch Online (10 AM)</span>
            </button>

            <button
              onClick={() => { onNavigate('about'); window.scrollTo(0, 0); }}
              className="px-5 py-3.5 text-gray-600 dark:text-slate-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 font-semibold text-base transition-colors flex items-center gap-1.5"
            >
              <span>Our Story & Values</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 text-left">
            <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 w-fit rounded-xl bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-gray-900 dark:text-white text-base">
                Extravagant Welcome
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                Open & Affirming. Every sexual orientation, identity, background, and perspective is loved unconditionally.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 w-fit rounded-xl bg-sage-50 dark:bg-sage-900/30 text-sage-600 dark:text-sage-400 mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-gray-900 dark:text-white text-base">
                Action & Justice
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                Active community witness supporting the SOS Food Bank, civil rights, Love Choir, and environmental care.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 w-fit rounded-xl bg-terracotta-50 dark:bg-terracotta-900/30 text-terracotta-600 dark:text-terracotta-400 mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-gray-900 dark:text-white text-base">
                Texas Hill Country Home
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                970 Loop 337 in New Braunfels. In-person sanctuary and interactive Zoom worship every Sunday at 10 AM.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
