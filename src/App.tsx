import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { churchInfo } from './data/churchData';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingDock } from './components/layout/FloatingDock';
import { CommandPalette } from './components/layout/CommandPalette';

// Section Components
import { HeroSection } from './components/sections/HeroSection';
import { JourneyHub } from './components/sections/JourneyHub';
import { PlanYourVisit } from './components/sections/PlanYourVisit';
import { AboutSection } from './components/sections/AboutSection';
import { PastorSection } from './components/sections/PastorSection';
import { MinistriesGrid } from './components/sections/MinistriesGrid';
import { WorshipMedia } from './components/sections/WorshipMedia';
import { CalendarSection } from './components/sections/CalendarSection';
import { GivingSection } from './components/sections/GivingSection';
import { ContactSection } from './components/sections/ContactSection';

// UI Dialogs
import { Modal } from './components/ui/Modal';
import { Video, ExternalLink, Calendar, Heart, ArrowLeft } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('faith-ucc-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('faith-ucc-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('faith-ucc-theme', 'light');
    }
  }, [darkMode]);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg text-gray-800 dark:text-slate-100 selection:bg-terracotta-200 dark:selection:bg-terracotta-900 transition-colors duration-300">
      
      {/* Top Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setCommandPaletteOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onOpenZoom={() => setZoomModalOpen(true)}
            />
            <JourneyHub onNavigate={handleNavigate} />
            
            {/* Quick Preview Sections for continuous scroll */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* Pastor & Sanctuary Snapshot */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <span className="text-xs uppercase tracking-wider font-bold text-terracotta-600 dark:text-terracotta-400">
                    A Note From Our Pastor
                  </span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">
                    Rev. Dr. Carla Cheatham
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed italic">
                    &ldquo;Faith is not about having all the answers wrapped in a bow. It is about daring to bring our whole, authentic selves—with our questions, hopes, grief, and joy—into sacred community.&rdquo;
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => handleNavigate('pastor')}
                    className="px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-2xl shadow-md transition-colors text-sm text-center"
                  >
                    Meet Pastor Carla
                  </button>
                  <button
                    onClick={() => handleNavigate('plan-visit')}
                    className="px-6 py-3 bg-cream-200 dark:bg-slate-700 text-gray-800 dark:text-white font-bold rounded-2xl hover:bg-cream-300 dark:hover:bg-slate-600 transition-colors text-sm text-center"
                  >
                    Visitor Guide
                  </button>
                </div>
              </div>

            </div>
          </>
        )}

        {/* Dedicated Deep Dive Views */}
        {currentView !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            {/* Breadcrumb / Back Navigation */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <button
                onClick={() => handleNavigate('home')}
                className="inline-flex items-center gap-1.5 text-gray-500 dark:text-slate-400 hover:text-terracotta-600 dark:hover:text-terracotta-400 font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
              <span className="text-gray-300 dark:text-slate-600">/</span>
              <span className="text-terracotta-600 dark:text-terracotta-400 font-bold capitalize">
                {currentView.replace('-', ' ')}
              </span>
            </div>

            {currentView === 'plan-visit' && (
              <PlanYourVisit
                onOpenContact={() => handleNavigate('contact')}
                onOpenZoom={() => setZoomModalOpen(true)}
              />
            )}
            {currentView === 'about' && <AboutSection />}
            {currentView === 'pastor' && (
              <PastorSection onOpenContact={() => handleNavigate('contact')} />
            )}
            {currentView === 'ministries' && (
              <MinistriesGrid onOpenContact={() => handleNavigate('contact')} />
            )}
            {currentView === 'worship' && (
              <WorshipMedia onOpenZoom={() => setZoomModalOpen(true)} />
            )}
            {currentView === 'calendar' && <CalendarSection />}
            {currentView === 'give' && <GivingSection />}
            {currentView === 'contact' && <ContactSection />}
          </div>
        )}
      </main>

      {/* Global Persistent Bottom Action Dock */}
      <FloatingDock
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setCommandPaletteOpen(true)}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Command Palette / Search Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Sunday Zoom Livestream Modal */}
      <Modal
        isOpen={zoomModalOpen}
        onClose={() => setZoomModalOpen(false)}
        title="Sunday Worship Zoom Livestream"
      >
        <div className="space-y-4 text-center py-4">
          <div className="w-16 h-16 rounded-full bg-twilight-100 dark:bg-twilight-900/40 text-twilight-600 dark:text-twilight-300 flex items-center justify-center mx-auto">
            <Video className="w-8 h-8" />
          </div>

          <h4 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">
            Join Sunday Worship Virtually
          </h4>

          <p className="text-sm text-gray-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            Our virtual sanctuary welcomes worshippers from across the country every Sunday morning at 10:00 AM CST.
          </p>

          <div className="p-4 rounded-2xl bg-cream-100 dark:bg-slate-700/50 text-xs text-gray-700 dark:text-slate-300 space-y-1">
            <p><strong>Service Time:</strong> Sundays at 10:00 AM CST (Room opens at 9:50 AM)</p>
            <p><strong>Passcode / Details:</strong> Open to all without registration required.</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={churchInfo.service.zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-twilight-500 hover:bg-twilight-600 text-white font-bold rounded-xl text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Launch Zoom Service</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => setZoomModalOpen(false)}
              className="px-4 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white font-bold rounded-xl text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
