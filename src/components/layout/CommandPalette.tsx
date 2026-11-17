import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../../types';
import { 
  Search, 
  ArrowRight, 
  X, 
  Compass, 
  Heart, 
  Users, 
  BookOpen, 
  Music, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  HandHeart,
  Flag
} from 'lucide-react';

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
      category: 'Visitors',
      description: 'What to expect on Sunday, open communion, kids & nursery care, parking, casual attire.',
      targetView: 'plan-visit',
      icon: <Compass className="w-5 h-5 text-terracotta-500" />,
      keywords: ['visit', 'new', 'directions', 'first time', 'communion', 'children', 'kids', 'attire', 'parking', 'what to wear', 'welcome']
    },
    {
      id: 'pastor-carla',
      title: 'Rev. Dr. Carla Cheatham (Pastor & Teacher)',
      category: 'Pastoral Care',
      description: 'M.Div., Ph.D., hospice & trauma counseling specialist, author of Hospice Whispers.',
      targetView: 'pastor',
      icon: <BookOpen className="w-5 h-5 text-twilight-500 dark:text-twilight-300" />,
      keywords: ['pastor', 'carla', 'cheatham', 'minister', 'grief', 'hospice', 'whispers', 'counseling', 'pastoral care', 'bio']
    },
    {
      id: 'ona-covenant',
      title: 'Open and Affirming (ONA) Covenant',
      category: 'Who We Are',
      description: 'Celebrating LGBTQ+ inclusion, diverse families, and the UCC Still Speaking rainbow comma.',
      targetView: 'about',
      icon: <Heart className="w-5 h-5 text-pink-500" />,
      keywords: ['ona', 'open and affirming', 'lgbtq', 'pride', 'covenant', 'inclusion', 'welcome', 'still speaking', 'comma', 'beliefs']
    },
    {
      id: 'sos-food-bank',
      title: 'SOS Food Bank Ministry',
      category: 'Missions & Justice',
      description: 'Weekly non-perishable collections and grassroots hunger relief across New Braunfels.',
      targetView: 'ministries',
      icon: <ShoppingBag className="w-5 h-5 text-cedar-600 dark:text-cedar-400" />,
      keywords: ['food', 'food bank', 'sos', 'hunger', 'outreach', 'canned goods', 'service', 'donation', 'justice']
    },
    {
      id: 'love-choir',
      title: 'The Love Choir & Music Ministry',
      category: 'Music & Worship',
      description: 'Joyful vocal choir sharing transcendent hymns and community music witness. All voices welcome.',
      targetView: 'ministries',
      icon: <Music className="w-5 h-5 text-amber-500" />,
      keywords: ['choir', 'music', 'singing', 'love choir', 'hymns', 'rehearsal', 'worship']
    },
    {
      id: 'theology-on-tap',
      title: 'Theology on Tap (ToT)',
      category: 'Community Fellowship',
      description: 'Third Sunday evenings: honest, relaxed discussions about life, faith, and doubts at local spots.',
      targetView: 'calendar',
      icon: <Users className="w-5 h-5 text-terracotta-500" />,
      keywords: ['theology on tap', 'tot', 'discussion', 'fellowship', 'doubts', 'conversation', 'social']
    },
    {
      id: 'mlk-march',
      title: 'MLK March & Justice Action',
      category: 'Community Action',
      description: 'Annual New Braunfels MLK March participation and ongoing civil rights advocacy.',
      targetView: 'ministries',
      icon: <Flag className="w-5 h-5 text-blue-500" />,
      keywords: ['mlk', 'martin luther king', 'march', 'justice', 'advocacy', 'peace', 'civil rights']
    },
    {
      id: 'worship-service',
      title: 'Sunday Worship & Zoom Livestream',
      category: 'Worship',
      description: 'Sundays at 10:00 AM CST in sanctuary and live on Zoom; Sunday School at 11:20 AM.',
      targetView: 'worship',
      icon: <Clock className="w-5 h-5 text-twilight-600 dark:text-twilight-300" />,
      keywords: ['worship', 'sunday', 'zoom', 'livestream', 'youtube', 'sermon', 'time', 'service', 'sunday school']
    },
    {
      id: 'realm-giving',
      title: 'Give Online via Realm',
      category: 'Stewardship',
      description: 'Secure giving supporting our ministries, music, hunger relief, and Hill Country sanctuary.',
      targetView: 'give',
      icon: <HandHeart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      keywords: ['give', 'giving', 'donate', 'realm', 'pledge', 'tithe', 'support', 'offering', 'generosity']
    },
    {
      id: 'contact-prayer',
      title: 'Contact Office & Prayer Requests',
      category: 'Pastoral Care',
      description: '970 Loop 337, phone (830) 625-6761, pastoral prayer circle submissions.',
      targetView: 'contact',
      icon: <MapPin className="w-5 h-5 text-terracotta-600" />,
      keywords: ['contact', 'prayer', 'phone', 'email', 'address', 'directions', 'loop 337', 'map', 'hours']
    }
  ];

  const filteredItems = query.trim() === ''
    ? searchItems.slice(0, 7)
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
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Faith UCC"
    >
      <div 
        className="w-full max-w-2xl bg-[#FDFBF7] dark:bg-[#0E1622] rounded-3xl shadow-2xl border border-sand-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[82vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Pride top accent bar */}
        <div className="pride-bar-subtle w-full" aria-hidden="true" />

        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-5 py-3.5 border-b border-sand-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-terracotta-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search ministries, pastor, worship, visits, or giving..."
            className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none"
            aria-label="Search query"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-mono bg-sand-200 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded border border-sand-300 dark:border-slate-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 sm:p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-gray-500 dark:text-slate-400">
              <p className="text-sm font-semibold">No direct matches found</p>
              <p className="text-xs mt-1 text-gray-400 dark:text-slate-500">
                Try searching for &ldquo;visit&rdquo;, &ldquo;pastor&rdquo;, &ldquo;zoom&rdquo;, &ldquo;food bank&rdquo;, or &ldquo;communion&rdquo;
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.targetView)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-900 dark:text-terracotta-200 ring-1 ring-terracotta-300/40'
                      : 'hover:bg-sand-100/70 dark:hover:bg-slate-800/60 text-gray-800 dark:text-slate-200'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isSelected 
                        ? 'bg-white dark:bg-slate-800 shadow-xs' 
                        : 'bg-sand-100 dark:bg-slate-800'
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm">{item.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-sand-200 dark:bg-slate-800 text-gray-600 dark:text-slate-400 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'translate-x-1 text-terracotta-600 dark:text-terracotta-400' : 'text-gray-400'
                  }`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 sm:px-5 py-2.5 border-t border-sand-200 dark:border-slate-800 bg-sand-50/60 dark:bg-slate-950/60 flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
          <div className="flex items-center gap-2 sm:gap-3">
            <span>Use <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-sand-300 dark:border-slate-700 rounded font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-sand-300 dark:border-slate-700 rounded font-mono">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-sand-300 dark:border-slate-700 rounded font-mono">↵</kbd> to select</span>
          </div>
          <span className="text-terracotta-600 dark:text-terracotta-400 font-semibold">Faith UCC Sanctuary</span>
        </div>

      </div>
    </div>
  );
};
