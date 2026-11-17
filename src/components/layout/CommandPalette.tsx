import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../../types';
import { Search, ArrowRight, X, Compass, Heart, Users, Sparkles, BookOpen, Music, ShoppingBag, Clock, MapPin, HandHeart } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewState) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  description: string;
  targetView: ViewState;
  icon: React.ReactNode;
  keywords: string[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchItems: SearchItem[] = [
    {
      id: 'plan-visit',
      title: 'Plan Your First Visit',
      category: 'Newcomers',
      description: 'What to expect, what to wear, children & youth, parking, open communion.',
      targetView: 'plan-visit',
      icon: <Compass className="w-5 h-5 text-terracotta-500" />,
      keywords: ['visit', 'new', 'directions', 'first time', 'communion', 'kids', 'attire', 'parking', 'what to wear']
    },
    {
      id: 'pastor-carla',
      title: 'Rev. Dr. Carla Cheatham (Pastor)',
      category: 'Leadership & Care',
      description: 'Pastor bio, credentials, pastoral care, grief & trauma support, author.',
      targetView: 'pastor',
      icon: <BookOpen className="w-5 h-5 text-twilight-500" />,
      keywords: ['pastor', 'carla', 'cheatham', 'minister', 'grief', 'hospice', 'bio', 'counseling', 'pastoral care']
    },
    {
      id: 'ona-values',
      title: 'Open and Affirming (ONA) Covenant',
      category: 'Beliefs & Identity',
      description: 'Our covenant celebrating LGBTQ+ equality, diverse families, and radical inclusion.',
      targetView: 'about',
      icon: <Heart className="w-5 h-5 text-pink-500" />,
      keywords: ['ona', 'open and affirming', 'lgbtq', 'pride', 'beliefs', 'inclusion', 'welcome', 'still speaking', 'comma']
    },
    {
      id: 'sos-food-bank',
      title: 'SOS Food Bank Ministry',
      category: 'Social Justice',
      description: 'Weekly collections and local New Braunfels food insecurity outreach.',
      targetView: 'ministries',
      icon: <ShoppingBag className="w-5 h-5 text-sage-600" />,
      keywords: ['food', 'food bank', 'sos', 'hunger', 'outreach', 'canned goods', 'donation']
    },
    {
      id: 'love-choir',
      title: 'The Love Choir & Music Ministry',
      category: 'Music & Worship',
      description: 'Inclusive vocal choir, rehearsals, special community witness performances.',
      targetView: 'ministries',
      icon: <Music className="w-5 h-5 text-amber-500" />,
      keywords: ['choir', 'music', 'singing', 'love choir', 'hymns', 'rehearsal']
    },
    {
      id: 'theology-on-tap',
      title: 'Theology on Tap (ToT)',
      category: 'Fellowship',
      description: '3rd Sunday honest conversations about life, faith, and doubts at local spots.',
      targetView: 'calendar',
      icon: <Users className="w-5 h-5 text-terracotta-500" />,
      keywords: ['theology on tap', 'tot', 'beer', 'social', 'pub', 'doubts', 'discussion']
    },
    {
      id: 'game-night',
      title: 'Community Game Night',
      category: 'Fellowship',
      description: 'Last Saturday monthly all-ages board game and fellowship night.',
      targetView: 'calendar',
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      keywords: ['game', 'game night', 'board games', 'saturday', 'family', 'play']
    },
    {
      id: 'worship-livestream',
      title: 'Sunday Worship & Zoom Livestream',
      category: 'Worship',
      description: 'Sundays at 10:00 AM CST in person & virtual via Zoom; sermon video library.',
      targetView: 'worship',
      icon: <Clock className="w-5 h-5 text-twilight-600" />,
      keywords: ['worship', 'sunday', 'zoom', 'livestream', 'youtube', 'sermon', 'time', 'service']
    },
    {
      id: 'realm-giving',
      title: 'Give Online via Realm',
      category: 'Generosity',
      description: 'Support local missions, music, food relief, and sanctuary ministries securely.',
      targetView: 'give',
      icon: <HandHeart className="w-5 h-5 text-emerald-600" />,
      keywords: ['give', 'giving', 'donate', 'realm', 'pledge', 'tithe', 'support', 'offering']
    },
    {
      id: 'contact-prayer',
      title: 'Contact Office & Prayer Requests',
      category: 'Connection',
      description: '970 Loop 337, phone (830) 625-6761, pastoral prayer circle submissions.',
      targetView: 'contact',
      icon: <MapPin className="w-5 h-5 text-terracotta-600" />,
      keywords: ['contact', 'prayer', 'phone', 'email', 'address', 'directions', 'loop 337', 'map']
    }
  ];

  const filteredItems = query.trim() === ''
    ? searchItems.slice(0, 6)
    : searchItems.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some(k => k.includes(q))
        );
      });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }

      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex].targetView);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  const handleSelect = (view: ViewState) => {
    onNavigate(view);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[80vh] animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-gray-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-terracotta-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search anything (e.g., 'visit', 'pastor', 'food bank', 'giving')..."
            className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono bg-gray-100 dark:bg-slate-800 text-gray-500 rounded">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-gray-500 dark:text-slate-400">
              <p className="text-base font-semibold">No direct matches found</p>
              <p className="text-xs mt-1">Try searching for &ldquo;visit&rdquo;, &ldquo;communion&rdquo;, &ldquo;pastor&rdquo;, or &ldquo;give&rdquo;</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.targetView)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-900 dark:text-terracotta-200'
                      : 'hover:bg-gray-50 dark:hover:bg-slate-800/60 text-gray-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-xl ${
                      isSelected 
                        ? 'bg-white dark:bg-slate-800 shadow-sm' 
                        : 'bg-gray-100 dark:bg-slate-800'
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base">{item.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 dark:bg-slate-800 text-gray-600 dark:text-slate-400 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'translate-x-1 text-terracotta-600' : 'text-gray-400'
                  }`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-950/50 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border rounded font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border rounded font-mono">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border rounded font-mono">↵</kbd> to select</span>
          </div>
          <span className="text-terracotta-600 dark:text-terracotta-400 font-semibold">Non-Linear Navigation</span>
        </div>

      </div>
    </div>
  );
};
