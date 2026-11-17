import React, { useState } from 'react';
import { churchInfo } from '../../data/churchData';
import { sermonArchive } from '../../data/sermons';
import { SermonMedia } from '../../types';
import { Modal } from '../ui/Modal';
import { Video, Play, ExternalLink, Download, Sparkles, Clock, Calendar, Search, Youtube, ShieldCheck } from 'lucide-react';

export const WorshipMedia: React.FC<{ onOpenZoom: () => void }> = ({ onOpenZoom }) => {
  const [selectedSermon, setSelectedSermon] = useState<SermonMedia | null>(null);
  const [sermonFilter, setSermonFilter] = useState('');

  const filteredSermons = sermonArchive.filter(s => {
    const q = sermonFilter.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <section id="worship" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
          Sacred Gathering & Word
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-3">
          Worship, Music & Sermons
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">
          Join us in person at 970 Loop 337 in New Braunfels or online every Sunday at 10:00 AM CST.
        </p>
      </div>

      {/* Hero Worship Live Card */}
      <div className="bg-gradient-to-br from-twilight-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-twilight-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-twilight-800 text-twilight-200 text-xs font-bold border border-twilight-600">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Hybrid Sunday Worship Service</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              Sundays at 10:00 AM CST
            </h3>

            <p className="text-slate-300 text-base leading-relaxed">
              Experience inclusive liturgy, inspiring choral music by the Love Choir, open communion, and thoughtful pastoral reflections that bridge ancient wisdom with modern life.
            </p>

            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Communion on 1st Sundays: Everyone is welcome at Christ's table.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-terracotta-400" />
                <span>Sunday School & Book Discussion follows at 11:20 AM.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenZoom}
                className="px-6 py-3 bg-gradient-to-r from-terracotta-500 to-amber-500 hover:from-terracotta-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Video className="w-5 h-5" />
                <span>Join Live Zoom (10:00 AM)</span>
              </button>

              <a
                href={churchInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Youtube className="w-5 h-5 text-red-500" />
                <span>YouTube Livestreams</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Interactive Player Preview Card */}
          <div className="lg:col-span-5 bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                Featured Sermon Reflection
              </span>
              <span className="text-xs text-slate-400">Audio & Video</span>
            </div>

            <div 
              onClick={() => setSelectedSermon(sermonArchive[0])}
              className="relative aspect-video rounded-xl bg-slate-900 border border-slate-700 overflow-hidden group cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-terracotta-950/60 opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-full bg-terracotta-500 group-hover:bg-terracotta-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform mb-2">
                  <Play className="w-6 h-6 ml-0.5 fill-white" />
                </div>
                <span className="text-xs font-semibold text-slate-300">Click to Watch Reflection</span>
              </div>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg text-white">
                {sermonArchive[0].title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {sermonArchive[0].summary}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Sermon Archive Library */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">
              Recent Sermon Archive & Reflections
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 mt-0.5">
              Messages of hope, grace, and justice by Rev. Dr. Carla Cheatham.
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={sermonFilter}
              onChange={(e) => setSermonFilter(e.target.value)}
              placeholder="Search by topic or title..."
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSermons.map((sermon) => (
            <div
              key={sermon.id}
              onClick={() => setSelectedSermon(sermon)}
              className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mb-2">
                  <span className="font-semibold">{sermon.speaker}</span>
                  <span className="px-2 py-0.5 rounded-full bg-cream-100 dark:bg-slate-700 font-mono">
                    {sermon.date}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                  {sermon.title}
                </h4>

                <p className="text-xs font-semibold text-terracotta-600 dark:text-terracotta-400 mt-1 italic">
                  {sermon.scripture}
                </p>

                <p className="text-sm text-gray-600 dark:text-slate-300 mt-3 leading-relaxed line-clamp-3">
                  {sermon.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {sermon.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-cream-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="p-2 rounded-xl bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-terracotta-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sermon Player Modal */}
      {selectedSermon && (
        <Modal
          isOpen={!!selectedSermon}
          onClose={() => setSelectedSermon(null)}
          title={selectedSermon.title}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-5">
            <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center border border-slate-700">
              {/* Responsive Video Frame / Player Placeholder */}
              <div className="flex flex-col items-center justify-center p-6 text-center text-white">
                <Youtube className="w-16 h-16 text-red-500 mb-2" />
                <h4 className="font-serif font-bold text-lg">{selectedSermon.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{selectedSermon.speaker} • {selectedSermon.date}</p>
                <a
                  href={churchInfo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors"
                >
                  <span>Watch on Faith UCC YouTube Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-terracotta-600 dark:text-terracotta-400">
                {selectedSermon.scripture}
              </span>
              <p className="text-sm sm:text-base text-gray-700 dark:text-slate-200 mt-2 leading-relaxed">
                {selectedSermon.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedSermon.tags.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-cream-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-semibold">
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedSermon(null)}
                className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white font-semibold rounded-xl text-xs hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
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
