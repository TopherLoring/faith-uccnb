import React, { useState } from 'react';
import { ministriesData } from '../../data/ministries';
import { Ministry } from '../../types';
import { Modal } from '../ui/Modal';
import { Tabs } from '../ui/Tabs';
import { ShoppingBag, Music, Beer, Sparkles, Gamepad2, Users, Globe, Leaf, Clock, HeartHandshake, ArrowRight } from 'lucide-react';

export const MinistriesGrid: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-terracotta-500" />;
      case 'Music': return <Music className="w-6 h-6 text-amber-500" />;
      case 'Beer': return <Beer className="w-6 h-6 text-amber-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-pink-500" />;
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-purple-500" />;
      case 'Users': return <Users className="w-6 h-6 text-twilight-500" />;
      case 'Globe': return <Globe className="w-6 h-6 text-emerald-500" />;
      case 'Leaf': return <Leaf className="w-6 h-6 text-sage-600" />;
      default: return <HeartHandshake className="w-6 h-6 text-terracotta-500" />;
    }
  };

  const tabs = [
    { id: 'all', label: 'All Ministries' },
    { id: 'justice', label: 'Social Justice & Outreach' },
    { id: 'fellowship', label: 'Fellowship & Community' },
    { id: 'music', label: 'Music & Love Choir' },
    { id: 'youth', label: 'Youth & Family' },
  ];

  const filtered = activeCategory === 'all'
    ? ministriesData
    : ministriesData.filter(m => m.category === activeCategory);

  return (
    <section id="ministries" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
          Hands & Feet of Love
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-3">
          Community in Action
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">
          At Faith UCC, faith isn’t confined to an hour on Sunday morning. We are actively engaged in our city, singing songs of justice, feeding hungry neighbors, and building deep community.
        </p>

        {/* Category Tabs */}
        <div className="mt-8 flex justify-center">
          <Tabs
            tabs={tabs}
            activeTab={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMinistry(item)}
            className="group bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-cream-100 dark:bg-slate-700/60 group-hover:scale-110 transition-transform">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cream-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                  {item.category}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mt-5 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                {item.shortDesc}
              </p>

              {item.meetingTime && (
                <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-gray-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                  <span className="truncate">{item.meetingTime}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-terracotta-600 dark:text-terracotta-400 group-hover:translate-x-1 transition-transform">
              <span>Learn More & Get Involved</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Ministry Detail Modal */}
      {selectedMinistry && (
        <Modal
          isOpen={!!selectedMinistry}
          onClose={() => setSelectedMinistry(null)}
          title={selectedMinistry.title}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cream-100 dark:bg-slate-700">
                {getIcon(selectedMinistry.iconName)}
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-terracotta-100 dark:bg-terracotta-900/60 text-terracotta-700 dark:text-terracotta-300">
                  {selectedMinistry.category}
                </span>
                {selectedMinistry.meetingTime && (
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>{selectedMinistry.meetingTime}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="text-base text-gray-700 dark:text-slate-200 leading-relaxed">
              <p>{selectedMinistry.fullDesc}</p>
            </div>

            {selectedMinistry.impactHighlight && (
              <div className="p-4 rounded-2xl bg-sage-50 dark:bg-sage-900/30 border border-sage-200 dark:border-sage-800 text-sm text-sage-900 dark:sage-200">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-sage-900 dark:text-sage-200">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Community Impact</span>
                </div>
                <span>{selectedMinistry.impactHighlight}</span>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  setSelectedMinistry(null);
                  onOpenContact();
                }}
                className="px-6 py-2.5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-xl text-sm transition-colors shadow-md"
              >
                Inquire or Join this Ministry
              </button>
              <button
                onClick={() => setSelectedMinistry(null)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-white text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

    </section>
  );
};
