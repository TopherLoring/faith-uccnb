import React, { useState } from 'react';
import { ViewState } from '../../types';
import { Compass, Heart, Users, Sparkles, BookOpen, HandHeart, Music, Calendar } from 'lucide-react';

interface JourneyItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tag: string;
  badge: string;
  actionText: string;
  targetView: ViewState;
}

export const JourneyHub: React.FC<{ onNavigate: (viewId: ViewState) => void }> = ({ onNavigate }) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const journeys: JourneyItem[] = [
    {
      id: 'visit',
      title: "I'm Exploring / Visiting for the First Time",
      subtitle: "Find out what to expect, what to wear, our open communion table, parking, and children's programs.",
      icon: <Compass className="w-6 h-6 text-terracotta-500" />,
      tag: 'new',
      badge: 'First Steps',
      actionText: "Plan Your First Visit",
      targetView: 'plan-visit'
    },
    {
      id: 'ona',
      title: "Seeking Radical Welcome & Affirmation",
      subtitle: "Explore our Open and Affirming (ONA) covenant where LGBTQ+ people, diverse families, and all seekers are celebrated.",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      tag: 'belonging',
      badge: 'Open & Affirming',
      actionText: "Read Our ONA Covenant",
      targetView: 'about'
    },
    {
      id: 'justice',
      title: "Living Out Justice & Community Action",
      subtitle: "Join hands with the SOS Food Bank, Love Choir, MLK New Braunfels Association, and Creation Care initiatives.",
      icon: <HandHeart className="w-6 h-6 text-sage-600" />,
      tag: 'action',
      badge: 'Social Impact',
      actionText: "Explore Justice Ministries",
      targetView: 'ministries'
    },
    {
      id: 'fellowship',
      title: "Connecting with Warm Friends & Community",
      subtitle: "Pull up a chair at Theology on Tap, all-ages Monthly Game Nights, Family Socials, or the Sunday Book Group.",
      icon: <Users className="w-6 h-6 text-amber-500" />,
      tag: 'community',
      badge: 'Fellowship',
      actionText: "View Fellowship Gatherings",
      targetView: 'calendar'
    },
    {
      id: 'worship',
      title: "Worship, Music & Spiritual Nourishment",
      subtitle: "Sundays at 10 AM in our sanctuary and via Zoom. Enjoy the Love Choir, sermons, and open communion.",
      icon: <Sparkles className="w-6 h-6 text-twilight-500" />,
      tag: 'worship',
      badge: 'Sundays at 10 AM',
      actionText: "Watch Online & Explore Sermons",
      targetView: 'worship'
    },
    {
      id: 'pastor',
      title: "Needing Prayer, Pastoral Care or Healing",
      subtitle: "Connect with Rev. Dr. Carla Cheatham and our prayer circle for grief, life transitions, and spiritual support.",
      icon: <BookOpen className="w-6 h-6 text-terracotta-600" />,
      tag: 'support',
      badge: 'Pastoral Care',
      actionText: "Meet Pastor Carla & Request Prayer",
      targetView: 'pastor'
    }
  ];

  const filterTags = [
    { id: 'all', label: 'All Pathways' },
    { id: 'new', label: 'New Here' },
    { id: 'belonging', label: 'Inclusion & ONA' },
    { id: 'action', label: 'Social Action' },
    { id: 'community', label: 'Fellowship' },
    { id: 'worship', label: 'Worship' },
    { id: 'support', label: 'Care & Prayer' },
  ];

  const filtered = selectedTag === 'all' 
    ? journeys 
    : journeys.filter(j => j.tag === selectedTag);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
          Non-Linear Discovery
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mt-3">
          How Can We Walk Beside You?
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">
          We believe spiritual journeys aren't one-size-fits-all. Choose the intention that speaks directly to where your heart is today.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {filterTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedTag === tag.id
                  ? 'bg-terracotta-500 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-slate-800/80 text-gray-600 dark:text-slate-300 hover:bg-cream-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => { onNavigate(item.targetView); window.scrollTo(0, 0); }}
            className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-gray-100 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-cream-100 dark:bg-slate-700 group-hover:bg-terracotta-50 dark:group-hover:bg-terracotta-900/40 transition-colors">
                  {item.icon}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cream-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mt-5 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                {item.subtitle}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between text-sm font-bold text-terracotta-600 dark:text-terracotta-400 group-hover:translate-x-1 transition-transform">
              <span>{item.actionText}</span>
              <span>&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
