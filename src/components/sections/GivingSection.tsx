import React, { useState } from 'react';
import { churchInfo } from '../../data/churchData';
import { Heart, ShieldCheck, ShoppingBag, Music, Sparkles, Globe, ExternalLink, ArrowRight } from 'lucide-react';

export const GivingSection: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<number>(50);

  const impactTiers = [
    {
      amount: 25,
      title: 'Nourishing Neighbors',
      icon: <ShoppingBag className="w-5 h-5 text-sage-600" />,
      impact: 'Provides shelf-stable emergency meals, fresh pantry staples, and hygiene kits for New Braunfels families via the SOS Food Bank.'
    },
    {
      amount: 50,
      title: 'The Sound of Grace',
      icon: <Music className="w-5 h-5 text-amber-500" />,
      impact: 'Supplies choral arrangements, sheet music, and guest instrumentalists for the Love Choir’s Sunday worship and community witness.'
    },
    {
      amount: 100,
      title: 'Youth & Family Belonging',
      icon: <Sparkles className="w-5 h-5 text-pink-500" />,
      impact: 'Funds Sunday School materials, affirming crafts, shared meals, and youth service outings where all kids feel valued and safe.'
    },
    {
      amount: 250,
      title: 'Sanctuary & Community Justice',
      icon: <Globe className="w-5 h-5 text-twilight-500" />,
      impact: 'Empowers our MLK civil rights alliance, Pride community events, creation care landscaping, and hybrid Zoom sanctuary operations.'
    }
  ];

  return (
    <section id="give" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
          Generosity & Stewardship
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-3">
          Giving to Fuel God's Love in Action
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">
          Your gifts keep our doors wide open, feed our hungry neighbors, amplify songs of justice, and provide an extravagant welcome to all.
        </p>
      </div>

      {/* Primary Giving CTA Card */}
      <div className="bg-gradient-to-br from-terracotta-500 via-terracotta-600 to-amber-600 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Secure 256-Bit Encrypted Giving via Realm®</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
            Make an Offering, Tithe, or Pledge
          </h3>

          <p className="text-white/90 text-base leading-relaxed">
            Whether giving a one-time donation or setting up an automated recurring gift, Realm makes giving simple, transparent, and secure.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={churchInfo.realmGiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-terracotta-700 hover:bg-cream-100 font-bold rounded-2xl shadow-xl transition-all duration-200 flex items-center gap-2 text-base hover:-translate-y-0.5"
            >
              <Heart className="w-5 h-5 text-pink-600 fill-pink-600" />
              <span>Give Online Now on Realm</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>

            <span className="text-xs text-white/80">
              Tax-deductible 501(c)(3) religious non-profit
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Impact Explorer */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-slate-700 shadow-md space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
            See the Tangible Impact of Your Gift
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
            Click an amount below to see how your generosity transforms lives in our congregation and across Comal County.
          </p>
        </div>

        {/* Tier buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {impactTiers.map((tier) => (
            <button
              key={tier.amount}
              onClick={() => setSelectedTier(tier.amount)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all ${
                selectedTier === tier.amount
                  ? 'bg-terracotta-500 text-white shadow-lg scale-105'
                  : 'bg-cream-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:bg-cream-200 dark:hover:bg-slate-600'
              }`}
            >
              ${tier.amount}
            </button>
          ))}
        </div>

        {/* Display selected tier impact */}
        {(() => {
          const current = impactTiers.find(t => t.amount === selectedTier) || impactTiers[1];
          return (
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-cream-50 dark:bg-slate-900/60 border border-cream-200 dark:border-slate-700 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm shrink-0">
                {current.icon}
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-terracotta-600 dark:text-terracotta-400">
                  Impact Tier: ${current.amount}
                </span>
                <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white">
                  {current.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed pt-1">
                  {current.impact}
                </p>
              </div>
            </div>
          );
        })()}

        {/* Other Ways to Give */}
        <div className="pt-8 border-t border-gray-100 dark:border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-slate-300">
          <div className="space-y-1">
            <h4 className="font-bold text-gray-900 dark:text-white">Giving by Mail</h4>
            <p className="text-xs">
              Make checks payable to <strong>Faith United Church of Christ</strong> and mail to:
              <br />
              970 Loop 337, New Braunfels, TX 78130
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-gray-900 dark:text-white">Sunday In-Person Offering</h4>
            <p className="text-xs">
              Offering plates are passed during Sunday morning worship at 10:00 AM, with special designated mission collections throughout the year.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-gray-900 dark:text-white">Annual Pledging</h4>
            <p className="text-xs">
              Pledging helps our Church Council budget faithfully for staff, facility maintenance, music, and community outreach.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
