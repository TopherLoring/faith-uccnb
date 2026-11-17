import React, { useState } from 'react';
import { churchInfo } from '../../data/churchData';
import { MapPin, Users, Heart, ShieldCheck, Coffee, Video, ExternalLink, ChevronDown } from 'lucide-react';

export const VisitingSection: React.FC<{ onOpenZoom: () => void }> = ({ onOpenZoom }) => {
  const visitorCards = [
    {
      title: "Where We Gather",
      subtitle: "970 Loop 337 in New Braunfels",
      icon: <MapPin className="w-6 h-6 text-terracotta-500" />,
      description: "Our sanctuary is located right on Loop 337 with ample on-site parking directly in front of the building. Accessible parking and step-free entrances are clearly marked.",
      detail: "Greeters at the front doors will warmly welcome you, offer a printed bulletin, and show you into the sanctuary."
    },
    {
      title: "What to Wear",
      subtitle: "Come exactly as you feel comfortable",
      icon: <Users className="w-6 h-6 text-sage-600" />,
      description: "You will see boots, blue jeans, sundresses, work attire, and casual shirts. There is zero dress code here—God looks upon the heart, never your clothing.",
      detail: "Whether casual or dressed up, you will feel completely at home."
    },
    {
      title: "Your Children are Cherished",
      subtitle: "All generations worship together",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      description: "Children of all ages are always welcome in our sanctuary! We celebrate the sounds and presence of young people. Sunday School gathers right after service from 11:20 AM – 12:20 PM.",
      detail: "Activity bags with crayons and soft toys are in the narthex. Youth and family socials take place on the first Sunday of each month."
    },
    {
      title: "Christ’s Table is Open",
      subtitle: "Communion on the 1st Sunday of every month",
      icon: <ShieldCheck className="w-6 h-6 text-twilight-500" />,
      description: "In the United Church of Christ, Christ is the host and everyone is invited. You do not need to be a church member or have your theology figured out.",
      detail: "Gluten-free and non-alcoholic options are always provided. Participation is entirely your choice."
    },
    {
      title: "Stay for Coffee & Connection",
      subtitle: "Fellowship hour after worship",
      icon: <Coffee className="w-6 h-6 text-amber-500" />,
      description: "Following worship at 11:20 AM, our fellowship hall opens for coffee, tea, and refreshments. It is a relaxed, unhurried time to chat, meet Pastor Carla, or simply enjoy a quiet snack.",
      detail: "No pressure to socialize—take whatever time feels right for your morning."
    },
    {
      title: "Join Us on Zoom",
      subtitle: "Hybrid worship for friends near and far",
      icon: <Video className="w-6 h-6 text-twilight-500" />,
      description: "Cannot join us in person? Our Sunday worship is fully broadcast live via Zoom at 10:00 AM CST with interactive prayer and community fellowship.",
      detail: "Room opens at 9:50 AM each Sunday. Cameras can be on or off based on your comfort."
    }
  ];

  const faqs = [
    {
      q: "What does it mean that you are 'Open and Affirming'?",
      a: "It means our congregation has formally covenanted to celebrate LGBTQ+ individuals, couples, and families in every area of church life, membership, and leadership. We believe all love and all gender expressions are sacred reflections of God."
    },
    {
      q: "Will I be singled out as a visitor?",
      a: "Never. We do not ask visitors to stand up, wear special tags, or speak on a microphone. You are free to sit quietly, soak in the music and message, and participate at your own pace."
    },
    {
      q: "What is your music like?",
      a: "A thoughtful blend of traditional hymns, contemporary songs of justice, and joyful choral anthems led by our vocal choir, the Love Choir."
    },
    {
      q: "How can I speak with Pastor Carla?",
      a: "Pastor Carla is in the narthex after every Sunday worship to meet newcomers. You can also call the church office at (830) 625-6761 or send a note through our contact form."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="visiting" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 xl:px-20 border-t border-sand-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
            Visiting Faith UCC
          </span>
          <h2 className="section-title text-twilight-600 dark:text-white font-bold">
            What Sunday Morning Feels Like
          </h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
            Walking through church doors can feel intimidating. Here is what you can expect when you visit with us.
          </p>
        </div>

        {/* Responsive Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visitorCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-sand-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 w-fit rounded-2xl bg-sand-50 dark:bg-slate-900 border border-sand-200 dark:border-slate-800">
                  {card.icon}
                </div>
                <h3 className="card-title text-twilight-600 dark:text-white font-bold">
                  {card.title}
                </h3>
                <p className="text-xs font-semibold text-terracotta-600 dark:text-terracotta-400">
                  {card.subtitle}
                </p>
                <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-sand-100 dark:border-slate-700/60 text-xs text-gray-600 dark:text-slate-400">
                {card.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="bg-sand-50 dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-sand-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-lg text-twilight-600 dark:text-white">
              Directions to 970 Loop 337
            </h4>
            <p className="text-xs text-gray-600 dark:text-slate-400">
              New Braunfels, TX 78130 • Sanctuary entrance right off Loop 337
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href={churchInfo.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Google Maps Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onOpenZoom}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-white dark:bg-slate-800 text-twilight-600 dark:text-white border border-sand-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold hover:bg-sand-100 transition-colors flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4 text-twilight-500" />
              <span>Zoom Details</span>
            </button>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="pt-8 space-y-4 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="card-title text-twilight-600 dark:text-white font-bold">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-600 dark:text-slate-400">
              Honest answers to common questions about Faith UCC.
            </p>
          </div>

          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-sand-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-twilight-600 dark:text-white hover:text-terracotta-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-terracotta-500' : 'text-gray-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed border-t border-sand-100 dark:border-slate-700/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
