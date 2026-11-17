import React from 'react';
import { sanctuaryMilestones, onaDeclaration } from '../../data/churchData';
import { UCCComma } from '../ui/UCCComma';
import { Heart, Sparkles, BookOpen, Compass, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
          Who We Are & What We Believe
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-3 leading-tight">
          A Community Rooted in Love, Reaching for Justice.
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mt-4 text-base sm:text-lg leading-relaxed">
          Faith United Church of Christ in New Braunfels is a spiritual home for people who crave honest questions, authentic community, and a Christian faith that takes the Bible too seriously to take it literally.
        </p>
      </div>

      {/* The Living Comma & Open and Affirming Covenant Banner */}
      <div className="bg-gradient-to-br from-terracotta-50 via-cream-100 to-amber-50 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-900 rounded-3xl p-8 sm:p-12 border border-terracotta-200/60 dark:border-slate-700 shadow-lg relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <UCCComma size={80} interactive={true} />
            <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mt-4">
              The Still Speaking Comma
            </h3>
            <p className="text-xs font-serif italic text-terracotta-600 dark:text-terracotta-400 mt-1">
              &ldquo;Never place a period where God has placed a comma.&rdquo;
            </p>
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-3 leading-relaxed">
              Inspired by Gracie Allen’s quote, our comma is an emblem of hope. A period signals an end; a comma signals that God is not finished yet. God has more light, truth, and love yet to break forth.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>Official Open and Affirming (ONA) Covenant</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
              An Extravagant Welcome for Every Soul
            </h3>

            <p className="text-gray-700 dark:text-slate-200 text-base leading-relaxed">
              {onaDeclaration.covenantText}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-gray-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-gray-100 dark:border-slate-700">
                <Heart className="w-3.5 h-3.5 text-pink-500" />
                <span>LGBTQ+ Affirming</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-gray-100 dark:border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Doubts & Questions Welcome</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-gray-100 dark:border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
                <span>Anti-Racist & Inclusive</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-gray-100 dark:border-slate-700">
                <Compass className="w-3.5 h-3.5 text-twilight-500" />
                <span>Creation Care & Justice</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Core Values 3-Column Grid */}
      <div>
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
            Our Guiding Pillars
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
            How we translate theology into living reality every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-3 w-fit rounded-2xl bg-terracotta-50 dark:bg-terracotta-900/30 text-terracotta-600 mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-2">
              Faith as a Quest
            </h4>
            <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              We do not believe faith means checking your brain at the sanctuary door. We encourage rigorous thinking, honest inquiry, and listening for God's voice in contemporary scholarship and science.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-3 w-fit rounded-2xl bg-sage-50 dark:bg-sage-900/30 text-sage-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-2">
              Love as an Action
            </h4>
            <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              Love is more than sentiment. We demonstrate our love through hands-on service: feeding families via the SOS Food Bank, marching with the MLK Association, and advocating for civil rights and bodily autonomy.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow">
            <div className="p-3 w-fit rounded-2xl bg-twilight-50 dark:bg-twilight-900/30 text-twilight-500 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-2">
              Radical Community
            </h4>
            <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              In a polarized culture, we cultivate a sacred space where generations, backgrounds, and political identities sit together at Christ’s table, bound not by dogma, but by love.
            </p>
          </div>
        </div>
      </div>

      {/* 1975–Present Milestone Interactive Timeline */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-slate-700 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400">
            Heritage & Roots
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-1">
            Over Five Decades of Faith in New Braunfels
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
            From humble beginnings in a partially completed hall to a beacon of extravagant love along Loop 337.
          </p>
        </div>

        <div className="relative border-l-2 border-terracotta-200 dark:border-slate-700 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
          {sanctuaryMilestones.map((milestone: { year: string; title: string; detail: string }, idx: number) => (
            <div key={idx} className="relative group">
              {/* Dot on timeline */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-4 border-terracotta-500 group-hover:scale-125 transition-transform" />
              
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 dark:text-terracotta-300 mb-1">
                  {milestone.year}
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-bold text-gray-900 dark:text-white">
                  {milestone.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 mt-1 leading-relaxed max-w-3xl">
                  {milestone.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
