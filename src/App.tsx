import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { churchInfo } from './data/churchData';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';

// Section Components
import { HeroSection } from './components/sections/HeroSection';
import { AffirmingSection } from './components/sections/AffirmingSection';
import { JourneyHub } from './components/sections/JourneyHub';
import { VisitingSection } from './components/sections/VisitingSection';
import { PastorSection } from './components/sections/PastorSection';
import { AboutSection } from './components/sections/AboutSection';
import { MinistriesGrid } from './components/sections/MinistriesGrid';
import { WorshipMedia } from './components/sections/WorshipMedia';
import { CalendarSection } from './components/sections/CalendarSection';
import { GivingSection } from './components/sections/GivingSection';
import { ContactSection } from './components/sections/ContactSection';

// UI Dialogs
import { Modal } from './components/ui/Modal';
import { Video, ExternalLink } from 'lucide-react';

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

  // Smooth scroll to any section anchor with sticky header offset
  const handleScrollTo = (id: string) => {
    const sectionMap: Record<string, string> = {
      'home': 'hero',
      'plan-visit': 'visiting',
      'visiting': 'visiting',
      'about': 'about',
      'affirming': 'affirming',
      'ona': 'affirming',
      'pastor': 'pastor',
      'ministries': 'ministries',
      'worship': 'worship',
      'calendar': 'calendar',
      'give': 'give',
      'contact': 'contact'
    };

    const targetId = sectionMap[id] || id;
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentView('home');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });

      const validViews: ViewState[] = ['home', 'plan-visit', 'about', 'pastor', 'ministries', 'worship', 'calendar', 'give', 'contact'];
      if (validViews.includes(id as ViewState)) {
        setCurrentView(id as ViewState);
      }
    }
  };

  // Scrollspy via IntersectionObserver to update active navbar link
  useEffect(() => {
    const sectionIds: { id: string; view: ViewState }[] = [
      { id: 'hero', view: 'home' },
      { id: 'affirming', view: 'about' },
      { id: 'visiting', view: 'plan-visit' },
      { id: 'pastor', view: 'pastor' },
      { id: 'about', view: 'about' },
      { id: 'ministries', view: 'ministries' },
      { id: 'worship', view: 'worship' },
      { id: 'calendar', view: 'calendar' },
      { id: 'give', view: 'give' },
      { id: 'contact', view: 'contact' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sectionIds.find((s) => s.id === entry.target.id);
            if (match) {
              setCurrentView(match.view);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -65% 0px'
      }
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col mesh-gradient-bg text-gray-800 dark:text-slate-100 selection:bg-terracotta-200 dark:selection:bg-terracotta-900 transition-colors duration-300">
      
      {/* Top Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleScrollTo}
        onOpenSearch={() => setCommandPaletteOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Continuous Editorial Flow */}
      <main className="flex-1 pb-16">
        {/* 1. Hero Section with countdown, UCC comma, and Sunday details */}
        <HeroSection
          onScrollTo={handleScrollTo}
          onNavigate={handleScrollTo}
          onOpenZoom={() => setZoomModalOpen(true)}
        />

        {/* 2. Open & Affirming Covenant - Prominently featured right after Hero */}
        <AffirmingSection />

        {/* 3. Community Connection Hub - Quick Topic Navigation */}
        <JourneyHub onNavigate={handleScrollTo} />

        {/* 4. What Sunday Morning Feels Like - Practical Visitor Guide & FAQ */}
        <VisitingSection onOpenZoom={() => setZoomModalOpen(true)} />

        {/* 5. Meet Pastor Carla - Pastoral Care, Hospice Whispers, & Counseling */}
        <PastorSection onOpenContact={() => handleScrollTo('contact')} />

        {/* 6. Who We Are & What We Believe - Living Comma, Pillars, & 5-Decade Timeline */}
        <AboutSection />

        {/* 7. Community in Action - SOS Food Bank, Love Choir, Theology on Tap, MLK Alliance */}
        <MinistriesGrid onOpenContact={() => handleScrollTo('contact')} />

        {/* 8. Worship, Music & Sermons - Hybrid Live Worship & Reflection Archive */}
        <WorshipMedia onOpenZoom={() => setZoomModalOpen(true)} />

        {/* 9. Gatherings & Fellowship - Community Calendar & Add to Google Calendar */}
        <CalendarSection />

        {/* 10. Generosity & Stewardship - Secure Giving & Community Impact */}
        <GivingSection />

        {/* 11. We Are Here With You - Map, Directions, Contact & Prayer Form */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleScrollTo} />

      {/* Global Command Palette / Search Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleScrollTo}
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
