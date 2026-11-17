import React from 'react';
import { pastorData, churchInfo } from '../../data/churchData';
import { BookOpen, Quote, Mail, Phone, Heart, ShieldCheck } from 'lucide-react';

export const PastorSection: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  return (
    <section id="pastor" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-20 border-t border-sand-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
            Pastoral Care & Presence
          </span>
          <h2 className="section-title text-twilight-600 dark:text-white font-bold">
            Meet Pastor Carla
          </h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
            Leading with compassionate accompaniment, emotional intelligence, and trauma-informed spiritual care.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-sand-200 dark:border-slate-700 shadow-md p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Avatar & Identity */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden bg-sand-100 dark:bg-slate-700 border-4 border-sand-200 dark:border-slate-600 shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-terracotta-500 via-amber-600 to-twilight-600 flex flex-col items-center justify-center text-white p-6">
                  <BookOpen className="w-14 h-14 mb-2 opacity-90" />
                  <span className="font-serif font-bold text-lg leading-tight">
                    Rev. Dr. Carla Cheatham
                  </span>
                  <span className="text-xs uppercase tracking-wider opacity-85 mt-1 font-mono">
                    Pastor & Teacher
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-twilight-600 dark:text-white">
                  {pastorData.name}
                </h3>
                <p className="text-xs font-semibold text-terracotta-600 dark:text-terracotta-400 mt-0.5">
                  {pastorData.credentials}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Serving Faith UCC since January 2021
                </p>
              </div>

              <div className="w-full max-w-xs space-y-2 pt-2">
                <button
                  onClick={onOpenContact}
                  className="w-full py-2.5 px-4 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send a Pastoral Note or Prayer</span>
                </button>
                <a
                  href={`tel:${churchInfo.contact.phone}`}
                  className="w-full py-2 px-4 bg-sand-100 dark:bg-slate-700 text-twilight-600 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-sand-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                  <span>(830) 625-6761</span>
                </a>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Pastoral Quote */}
              <div className="p-5 sm:p-6 rounded-2xl bg-sand-50 dark:bg-slate-900 border border-sand-200 dark:border-slate-800 relative">
                <Quote className="w-7 h-7 text-sand-300 dark:text-slate-700 absolute top-4 right-4" />
                <p className="font-serif italic text-base sm:text-lg text-twilight-600 dark:text-slate-200 leading-relaxed">
                  &ldquo;{pastorData.quote}&rdquo;
                </p>
              </div>

              <div className="space-y-3.5 text-sm sm:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                <p>
                  Rev. Dr. Carla Cheatham has served as Pastor and Teacher of Faith UCC since January 1, 2021. Bringing a unique blend of pastoral theology, emotional intelligence, and trauma counseling expertise, Pastor Carla is dedicated to nurturing a sanctuary where questions are honored and every person is treated as sacred.
                </p>
                <p>
                  She holds a Master of Divinity from Perkins School of Theology at Southern Methodist University, a Ph.D. in Health & Kinesiology from Texas A&M University (specializing in spirituality and health), and a Master’s degree in Psychology with certification in trauma therapy.
                </p>
                <p>
                  Prior to her call to Faith UCC, Pastor Carla directed an interfaith worker justice coalition, served ten years as a hospice chaplain and bereavement coordinator in Austin, and founded a national consulting group training healthcare professionals in resilience, grief, and healthy boundaries. She is the author of <em>Hospice Whispers: Stories of Life</em> and <em>Sharing Our Stories: An Interactive Grief Journal</em>.
                </p>
              </div>

              {/* Specializations Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-sand-50 dark:bg-slate-900 border border-sand-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 font-bold text-twilight-600 dark:text-white mb-0.5">
                    <BookOpen className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                    <span>Hospice Whispers</span>
                  </div>
                  <span className="text-gray-600 dark:text-slate-400">
                    Bestselling author exploring compassionate presence and living life fully.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-sand-50 dark:bg-slate-900 border border-sand-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 font-bold text-twilight-600 dark:text-white mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                    <span>Trauma-Informed Pastoral Care</span>
                  </div>
                  <span className="text-gray-600 dark:text-slate-400">
                    Safe, confidential accompaniment for grief, life transitions, and healing.
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
