import React, { useState, useEffect } from 'react';
import { UCCComma } from '../ui/UCCComma';
import { ViewState } from '../../types';
import { churchInfo } from '../../data/churchData';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Search, 
  Video, 
  Calendar, 
  Heart, 
  ChevronRight,
  ExternalLink,
  MapPin,
  Clock
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenSearch: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenZoom?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  darkMode,
  onToggleDarkMode,
  onOpenZoom
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks: { id: ViewState; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'plan-visit', label: 'Plan a Visit' },
    { id: 'about', label: 'Who We Are' },
    { id: 'pastor', label: 'Pastor & Care' },
    { id: 'ministries', label: 'Ministries & Justice' },
    { id: 'worship', label: 'Worship' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'give', label: 'Give' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (view: ViewState) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const handleZoomClick = (e: React.MouseEvent) => {
    if (onOpenZoom) {
      e.preventDefault();
      onOpenZoom();
    }
  };

  return (
    <>
      {/* Radiant Pride Accent Bar across the top edge */}
      <div className="pride-bar-subtle w-full" aria-hidden="true" />

      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 dark:bg-[#0A111C]/95 backdrop-blur-md shadow-sm py-2 border-b border-sand-200 dark:border-slate-800'
            : 'bg-[#FDFBF7]/85 dark:bg-[#0A111C]/85 backdrop-blur-sm py-3 border-b border-sand-100 dark:border-slate-900'
        }`}
      >
        <div className="fluid-container flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Church Identity */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none group shrink-0"
            aria-label="Faith United Church of Christ Home"
          >
            <UCCComma size={38} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg sm:text-xl text-gray-900 dark:text-white tracking-tight group-hover:text-terracotta-600 transition-colors">
                  Faith UCC
                </span>
                <span className="inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-bold bg-pink-100 text-pink-700 dark:bg-pink-950/70 dark:text-pink-300 border border-pink-200 dark:border-pink-800/50">
                  ONA
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-slate-400 font-medium hidden xs:block">
                New Braunfels, TX
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav 
            className="hidden xl:flex items-center gap-0.5 bg-sand-100/70 dark:bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-sand-200/60 dark:border-slate-800"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-terracotta-500 text-white shadow-xs font-bold'
                      : 'text-gray-700 dark:text-slate-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Quick Live Zoom Pill */}
            <a
              href={churchInfo.service.zoomUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleZoomClick}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold bg-twilight-50 hover:bg-twilight-100 dark:bg-twilight-900/50 dark:hover:bg-twilight-900 text-twilight-800 dark:text-twilight-200 border border-twilight-200/80 dark:border-twilight-700/60 transition-colors"
              title="Join Live Sunday Worship via Zoom (Sundays at 10:00 AM CST)"
              aria-label="Join Sunday Worship on Zoom"
            >
              <Video className="w-3.5 h-3.5 text-twilight-600 dark:text-twilight-300 shrink-0" />
              <span className="hidden sm:inline">Zoom Live</span>
              <span className="sm:hidden font-medium">Zoom</span>
            </a>

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-700 dark:text-slate-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-sand-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center gap-1 text-xs"
              title="Search church resources (Ctrl+K or ⌘K)"
              aria-label="Open search command palette"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline font-mono text-[10px] px-1 py-0.5 bg-sand-200 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded border border-sand-300 dark:border-slate-700">
                ⌘K
              </span>
            </button>

            {/* Theme Toggle Button (Daylight / Dusk) */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-gray-700 dark:text-slate-300 hover:text-amber-500 hover:bg-sand-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              title={darkMode ? 'Switch to Daylight Mode' : 'Switch to Dusk Mode'}
              aria-label={darkMode ? 'Switch to Daylight Mode' : 'Switch to Dusk Mode'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Primary CTA (Desktop): Plan a Visit */}
            <button
              onClick={() => handleLinkClick('plan-visit')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold rounded-full shadow-xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan a Visit</span>
            </button>

            {/* Mobile / Tablet Drawer Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-gray-800 dark:text-slate-200 hover:bg-sand-100 dark:hover:bg-slate-800 rounded-xl transition-colors ml-0.5"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm xl:hidden transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-modal="true"
          role="dialog"
          aria-label="Mobile Navigation Menu"
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#FDFBF7] dark:bg-[#0A111C] shadow-2xl p-5 flex flex-col justify-between overflow-y-auto border-l border-sand-200 dark:border-slate-800 animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-sand-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <UCCComma size={34} />
                  <div>
                    <span className="font-serif font-bold text-base text-gray-900 dark:text-white block">
                      Faith UCC
                    </span>
                    <span className="text-[11px] text-terracotta-600 dark:text-terracotta-400 font-semibold">
                      Open & Affirming
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-sand-100 dark:hover:bg-slate-800"
                  aria-label="Close navigation drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pride Accent Accent Line */}
              <div className="pride-bar-subtle w-full my-3 rounded-full" />

              {/* Quick Zoom Livestream Direct Action */}
              <a
                href={churchInfo.service.zoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleZoomClick}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-twilight-50 dark:bg-twilight-950/70 border border-twilight-200/80 dark:border-twilight-800 text-twilight-900 dark:text-twilight-100 font-semibold text-xs transition-all hover:bg-twilight-100 dark:hover:bg-twilight-900"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-twilight-500 text-white flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-twilight-950 dark:text-white">Sunday Worship on Zoom</p>
                    <p className="text-[11px] text-twilight-700 dark:text-twilight-300">Live Sundays at 10:00 AM CST</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-twilight-600 dark:text-twilight-400" />
              </a>

              {/* Navigation Section Title */}
              <div className="mt-4 mb-1 text-[11px] font-bold uppercase tracking-wider text-terracotta-600 dark:text-terracotta-400">
                Explore the Sanctuary
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = currentView === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-terracotta-500 text-white shadow-xs font-bold'
                          : 'text-gray-800 dark:text-slate-200 hover:bg-sand-100 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="mt-6 pt-4 border-t border-sand-200 dark:border-slate-800 space-y-2.5">
              
              {/* Primary Call to Action */}
              <button
                onClick={() => handleLinkClick('plan-visit')}
                className="w-full py-2.5 px-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-xl text-sm shadow-xs text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan Your First Visit</span>
              </button>

              {/* Giving Action */}
              <button
                onClick={() => handleLinkClick('give')}
                className="w-full py-2.5 px-4 bg-sand-100 dark:bg-slate-800/90 text-gray-800 dark:text-slate-200 hover:bg-sand-200 dark:hover:bg-slate-700 font-bold rounded-xl text-sm text-center flex items-center justify-center gap-2 border border-sand-200 dark:border-slate-700"
              >
                <Heart className="w-4 h-4 text-terracotta-500 fill-terracotta-500" />
                <span>Give via Realm</span>
              </button>

              {/* Theme Toggle within Mobile Drawer */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-sand-50 dark:bg-slate-900/50 border border-sand-200/60 dark:border-slate-800 text-xs">
                <span className="text-gray-600 dark:text-slate-400 font-medium">Appearance</span>
                <button
                  onClick={onToggleDarkMode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sand-200/80 dark:bg-slate-800 text-gray-800 dark:text-slate-200 font-semibold"
                >
                  {darkMode ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Daylight</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-slate-600" />
                      <span>Dusk</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location & Time info footer */}
              <div className="pt-2 text-[11px] text-gray-500 dark:text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-terracotta-500 shrink-0" />
                  <span>Sunday Worship: 10:00 AM CST</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-cedar-500 shrink-0" />
                  <span>970 Loop 337, New Braunfels, TX</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
