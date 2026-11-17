import React from 'react';
import { onaDeclaration } from '../../data/churchData';
import { UCCComma } from '../ui/UCCComma';
import { Heart, Sparkles, Shield, Users, Sun, Compass } from 'lucide-react';

export const AffirmingSection: React.FC = () => {
  return (
    <section id="affirming" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-20 border-t border-sand-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-pink-600 text-pink-600" />
            <span>Our Defining Heartbeat</span>
          </div>

          <h2 className="section-title text-twilight-600 dark:text-white font-bold">
            Our Open & Affirming Covenant
          </h2>

          <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
            We do not ask you to hide who you are. We celebrate you in the fullness of your God-given identity.
          </p>
        </div>

        {/* Feature Banner */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-sand-200 dark:border-slate-700 shadow-md p-6 sm:p-12 overflow-hidden relative">
          <div className="pride-bar h-2 absolute top-0 inset-x-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Official Rainbow Comma and Philosophy */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 bg-sand-50 dark:bg-slate-900 rounded-3xl border border-sand-200 dark:border-slate-800">
              <UCCComma size={88} />
              
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-twilight-600 dark:text-white mt-4">
                The Still Speaking Comma
              </h3>
              
              <p className="font-serif italic text-sm text-terracotta-600 dark:text-terracotta-400 mt-1">
                &ldquo;Never place a period where God has placed a comma.&rdquo;
              </p>
              
              <p className="text-xs text-gray-600 dark:text-slate-400 mt-4 leading-relaxed">
                A period signals finality. A comma tells us the sentence isn't over yet. We believe God is still speaking, still healing, and still expanding our understanding of divine love.
              </p>
            </div>

            {/* Right: The Covenant Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <h3 className="card-title text-twilight-600 dark:text-white font-bold">
                Our Covenant of Radical Welcome
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                <p>
                  As an <strong>Open and Affirming (ONA)</strong> congregation of the United Church of Christ, Faith UCC explicitly pledges that lesbian, gay, bisexual, transgender, non-binary, queer, questioning, straight, and cisgender persons are welcomed into the full life, sacraments, leadership, and ministries of our church.
                </p>
                <p>
                  We celebrate all couples and all families. For those who have experienced religious rejection, spiritual abuse, or been told that God does not love you as you are—we offer this sanctuary as a place of genuine safety, healing, and rest.
                </p>
                <p className="font-serif italic text-base text-terracotta-600 dark:text-terracotta-400">
                  &ldquo;No matter who you are, or where you are on life’s journey, you are welcome here!&rdquo;
                </p>
              </div>

              {/* Pillars of Affirmation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-gray-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sand-50 dark:bg-slate-900 border border-sand-200 dark:border-slate-800">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500 shrink-0" />
                  <span>Full LGBTQ+ Inclusion & Leadership</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sand-50 dark:bg-slate-900 border border-sand-200 dark:border-slate-800">
                  <Shield className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>A Safe Haven from Spiritual Trauma</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sand-50 dark:bg-slate-900 border border-sand-200 dark:border-slate-800">
                  <Users className="w-4 h-4 text-twilight-500 shrink-0" />
                  <span>Every Family Configuration Cherished</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sand-50 dark:bg-slate-900 border border-sand-200 dark:border-slate-800">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Honest Doubts & Questions Honored</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
