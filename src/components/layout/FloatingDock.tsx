import React from 'react';
import { ViewState } from '../../types';
import { Compass, Video, Heart, MessageSquare, Search } from 'lucide-react';

interface FloatingDockProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenSearch: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  currentView,
  onNavigate,
  onOpenSearch
}) => {
  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <div className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-200/80 dark:border-slate-700/80 shadow-2xl rounded-full p-2 flex items-center gap-1 sm:gap-2">
        
        {/* Plan Visit */}
        <button
          onClick={() => { onNavigate('plan-visit'); window.scrollTo(0, 0); }}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            currentView === 'plan-visit'
              ? 'bg-terracotta-500 text-white shadow-md'
              : 'text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
          title="Plan Your First Visit"
        >
          <Compass className="w-4 h-4 text-terracotta-500 group-hover:text-white" />
          <span className="hidden xs:inline">Visit</span>
        </button>

        {/* Watch Live */}
        <button
          onClick={() => { onNavigate('worship'); window.scrollTo(0, 0); }}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            currentView === 'worship'
              ? 'bg-twilight-500 text-white shadow-md'
              : 'text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
          title="Worship & Livestream"
        >
          <Video className="w-4 h-4 text-twilight-500 group-hover:text-white" />
          <span className="hidden xs:inline">Watch</span>
        </button>

        {/* Give */}
        <button
          onClick={() => { onNavigate('give'); window.scrollTo(0, 0); }}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            currentView === 'give'
              ? 'bg-pink-600 text-white shadow-md'
              : 'text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
          title="Online Giving via Realm"
        >
          <Heart className="w-4 h-4 text-pink-500 group-hover:text-white" />
          <span className="hidden xs:inline">Give</span>
        </button>

        {/* Prayer / Connect */}
        <button
          onClick={() => { onNavigate('contact'); window.scrollTo(0, 0); }}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            currentView === 'contact'
              ? 'bg-sage-600 text-white shadow-md'
              : 'text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
          title="Prayer Request & Contact"
        >
          <MessageSquare className="w-4 h-4 text-sage-600 group-hover:text-white" />
          <span className="hidden xs:inline">Prayer</span>
        </button>

        <div className="h-5 w-px bg-gray-200 dark:bg-slate-700 mx-1" />

        {/* Search / Command Jump */}
        <button
          onClick={onOpenSearch}
          className="p-2 sm:px-3 text-gray-600 dark:text-slate-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-medium"
          title="Search / Quick Jump (Ctrl+K)"
          aria-label="Open search command palette"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </button>

      </div>
    </div>
  );
};
