import React from 'react';
import { pastorData, churchInfo } from '../../data/churchData';
import { BookOpen, Heart, Mail, Phone, Sparkles, MessageSquare, Quote } from 'lucide-react';

export const PastorSection: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
          Pastoral Leadership & Care
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-3">
          Meet Pastor Carla
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">
          Grounded in empathy, trauma-informed care, and progressive Christian theology.
        </p>
      </div>

      {/* Main Bio Showcase Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden p-6 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Pastor Avatar & Quick Facts (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-5">
            <div className="relative">
              {/* Decorative aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-terracotta-500 via-amber-500 to-pink-500 rounded-3xl blur-md opacity-30" />
              
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden bg-cream-200 dark:bg-slate-700 shadow-xl flex items-center justify-center border-4 border-white dark:border-slate-800">
                {/* Stylized pastoral portrait avatar / placeholder with warm aesthetic */}
                <div className="w-full h-full bg-gradient-to-br from-terracotta-400 via-amber-600 to-twilight-600 flex flex-col items-center justify-center text-white p-6">
                  <BookOpen className="w-16 h-16 mb-2 opacity-90" />
                  <span className="font-serif font-bold text-lg text-center">
                    Rev. Dr. Carla Cheatham
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider opacity-80 mt-1">
                    Pastor & Teacher
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">
                {pastorData.name}
              </h3>
              <p className="text-sm font-semibold text-terracotta-600 dark:text-terracotta-400">
                {pastorData.credentials}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Serving Faith UCC since January 2021
              </p>
            </div>

            {/* Quick Contact Buttons */}
            <div className="pt-2 flex flex-col w-full max-w-xs gap-2">
              <button
                onClick={onOpenContact}
                className="w-full py-2.5 px-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-xl text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Connect with Pastor Carla</span>
              </button>
              <a
                href={`tel:${churchInfo.contact.phone}`}
                className="w-full py-2 px-4 bg-cream-200 dark:bg-slate-700 hover:bg-cream-300 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Call: {churchInfo.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Detailed Narrative & Accolades (Col 6-12) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pastoral Quote Card */}
            <div className="p-6 rounded-2xl bg-cream-50 dark:bg-slate-900/60 border border-cream-200 dark:border-slate-700/80 relative">
              <Quote className="w-8 h-8 text-terracotta-300 dark:text-terracotta-800 absolute top-4 right-4 -z-0 opacity-40" />
              <p className="font-serif italic text-base sm:text-lg text-gray-800 dark:text-slate-200 leading-relaxed relative z-10">
                &ldquo;{pastorData.quote}&rdquo;
              </p>
            </div>

            {/* Biography text */}
            <div className="space-y-4 text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Rev. Dr. Carla Cheatham began serving as Pastor and Teacher for Faith United Church of Christ on January 1, 2021. Bringing a unique blend of theological depth, emotional intelligence, and trauma counseling expertise, Pastor Carla is dedicated to nurturing a sanctuary where questions are honored and every person is treated as sacred.
              </p>
              <p>
                She holds a Master of Divinity (M.Div.) from Southern Methodist University’s Perkins School of Theology, a Ph.D. in Health and Kinesiology from Texas A&M University (specializing in spirituality and wellness), and a Master’s degree in Psychology with certification in trauma therapy.
              </p>
              <p>
                Prior to her call at Faith UCC, Pastor Carla directed an interfaith worker justice non-profit, served for a decade as a hospice chaplain and bereavement coordinator in Austin, and founded a national consulting group training healthcare, palliative, and mental health professionals in resilience and grief support.
              </p>
            </div>

            {/* Published Books & Highlights */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
              <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-slate-400 mb-3">
                Publications & Specializations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-700">
                  <span className="font-bold text-gray-900 dark:text-white block">
                    📖 Hospice Whispers: Stories of Life
                  </span>
                  <span className="text-gray-500 dark:text-slate-400">
                    A bestselling collection of true stories on compassion and living fully.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-700">
                  <span className="font-bold text-gray-900 dark:text-white block">
                    🕊️ Grief & Trauma Ministry
                  </span>
                  <span className="text-gray-500 dark:text-slate-400">
                    Trauma-informed spiritual care and bereavement support circles.
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
