import React, { useState } from 'react';
import { upcomingEvents } from '../../data/events';
import { ChurchEvent } from '../../types';
import { Calendar, Clock, MapPin, ExternalLink, Filter, Sparkles } from 'lucide-react';

export const CalendarSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'worship', label: 'Worship' },
    { id: 'fellowship', label: 'Fellowship' },
    { id: 'social', label: 'Social & Youth' },
    { id: 'service', label: 'Outreach & Service' }
  ];

  const filteredEvents = filterCategory === 'all'
    ? upcomingEvents
    : upcomingEvents.filter(e => e.category === filterCategory);

  const generateGoogleCalendarUrl = (event: ChurchEvent) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nFaith United Church of Christ, New Braunfels`);
    const location = encodeURIComponent(event.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="calendar" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
          Gatherings & Fellowship
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-3">
          Community Calendar
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">
          From casual pub chats at Theology on Tap to all-ages board game nights and Sunday worship, find where you belong.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filterCategory === cat.id
                  ? 'bg-terracotta-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-cream-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Timeline / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cream-200 dark:bg-slate-700 text-terracotta-700 dark:text-terracotta-300">
                  {event.category}
                </span>
                {event.isRecurring && (
                  <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                    Recurring
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white">
                {event.title}
              </h3>

              <div className="mt-3 space-y-2 text-xs font-semibold text-gray-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-terracotta-500 shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-twilight-500 shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sage-600 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-slate-300 mt-4 leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
              <a
                href={generateGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-terracotta-600 dark:text-terracotta-400 hover:text-terracotta-700 flex items-center gap-1.5 transition-colors"
                title="Add to Google Calendar"
              >
                <span>Add to Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <span className="text-xs text-gray-400 font-mono">
                {event.recurrenceRule || 'Gathering'}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
