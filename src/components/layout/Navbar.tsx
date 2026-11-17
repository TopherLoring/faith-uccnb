import React, { useState, useEffect } from 'react';
import { UCCComma } from '../ui/UCCComma';
import { ViewState } from '../../types';
import { Menu, X, Sun, Moon, Search, Heart, Calendar } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenSearch: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  darkMode,
  onToggleDarkMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-2.5 border-b border-gray-100 dark:border-slate-800'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Church Name */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-label="Faith UCC Home"
          >
            <UCCComma size={42} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xl sm:text-2xl text-gray-900 dark:text-white tracking-tight group-hover:text-terracotta-600 transition-colors">
                  Faith UCC
                </span>
                <span className="hidden sm:inline-block text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 font-bold">
                  ONA
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                New Braunfels, Texas
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-cream-200/50 dark:bg-slate-800/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200/40 dark:border-slate-700/40">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-terracotta-500 text-white shadow-sm'
                      : 'text-gray-700 dark:text-slate-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-gray-600 dark:text-slate-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-cream-200 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center gap-1.5 text-sm"
              title="Search (Ctrl+K)"
              aria-label="Open search command palette"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline font-mono text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-slate-700 rounded text-gray-500 dark:text-slate-400">
                ⌘K
              </span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 text-gray-600 dark:text-slate-300 hover:text-amber-500 hover:bg-cream-200 dark:hover:bg-slate-800 rounded-full transition-colors"
              title={darkMode ? 'Switch to Daylight Mode' : 'Switch to Dusk Mode'}
              aria-label="Toggle visual theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA: Plan Visit (Desktop) */}
            <button
              onClick={() => handleLinkClick('plan-visit')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:from-terracotta-600 hover:to-terracotta-700 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan a Visit</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-gray-700 dark:text-slate-200 hover:bg-cream-200 dark:hover:bg-slate-800 rounded-2xl transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <UCCComma size={36} />
                  <span className="font-serif font-bold text-lg text-gray-900 dark:text-white">
                    Faith UCC
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl"
                  aria-label="Close menu drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-4 py-2 text-xs font-semibold uppercase tracking-wider text-terracotta-600 dark:text-terracotta-400">
                Navigation
              </div>

              <div className="space-y-1 mt-1">
                {navLinks.map((link) => {
                  const isActive = currentView === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        isActive
                          ? 'bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 dark:text-terracotta-300 font-bold'
                          : 'text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span>&rarr;</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-slate-800 space-y-3">
              <button
                onClick={() => handleLinkClick('plan-visit')}
                className="w-full py-3 bg-terracotta-500 text-white font-bold rounded-xl shadow-md text-center"
              >
                Plan Your First Visit
              </button>
              <button
                onClick={() => handleLinkClick('give')}
                className="w-full py-3 bg-cream-200 dark:bg-slate-800 text-gray-900 dark:text-white font-bold rounded-xl text-center flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-terracotta-500 fill-terracotta-500" />
                <span>Give via Realm</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
