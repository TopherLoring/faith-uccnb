import React, { useState } from 'react';
import { churchInfo } from '../../data/churchData';
import { MapPin, Clock, Users, Heart, Coffee, ShieldCheck, Video, HelpCircle, ExternalLink, ChevronRight, ChevronDown } from 'lucide-react';

export const PlanYourVisit: React.FC<{ onOpenContact: () => void; onOpenZoom: () => void }> = ({
  onOpenContact,
  onOpenZoom
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'arrival',
      title: 'Arriving & Parking',
      icon: <MapPin className="w-5 h-5 text-terracotta-500" />,
      tag: 'Sanctuary & Campus',
      content: {
        heading: 'Easy Access Right on Loop 337',
        body: 'We are located at 970 Loop 337 in New Braunfels. Our campus features ample on-site parking directly in front of the main sanctuary. Accessible parking spaces and step-free entrances are clearly marked.',
        tips: [
          'Arrive 10–15 minutes early to grab a cup of coffee and settle in.',
          'Friendly greeters at the front doors will welcome you and hand you a bulletin.',
          'Wheelchair accessible seating and assistive listening support available.'
        ]
      }
    },
    {
      id: 'attire',
      title: 'What to Wear',
      icon: <Users className="w-5 h-5 text-sage-600" />,
      tag: 'Come As You Are',
      content: {
        heading: 'From Boots and Jeans to Sunday Best',
        body: 'You will see everything on Sunday morning: Texas Hill Country casual, jeans and sandals, work boots, vibrant colors, or traditional Sunday attire. God looks upon the heart, not your wardrobe.',
        tips: [
          'Dress in whatever makes you feel authentic, comfortable, and peaceful.',
          'No expectations, no judgment, and no dress codes.'
        ]
      }
    },
    {
      id: 'kids',
      title: 'Kids & Families',
      icon: <Heart className="w-5 h-5 text-pink-500" />,
      tag: 'Nurturing the Next Generation',
      content: {
        heading: 'Children are Cherished Here',
        body: 'Kids of all ages are always welcome in the sanctuary! We love the wiggles and giggles of young worshippers. Sunday School gathers immediately following the worship service from 11:20 AM – 12:20 PM.',
        tips: [
          'Activity bags with crayons and quiet toys are available in the narthex.',
          'First Sunday Youth and Family Socials feature crafts, shared lunch, and games.',
          'All teachers and leaders follow safe sanctuary and affirming practices.'
        ]
      }
    },
    {
      id: 'communion',
      title: 'Open Communion',
      icon: <ShieldCheck className="w-5 h-5 text-twilight-500" />,
      tag: 'All are Welcome at Christ’s Table',
      content: {
        heading: 'No Barriers, No Checkpoints',
        body: 'We celebrate Communion on the first Sunday of every month. In the United Church of Christ, Christ is the host and everyone is invited. You do not need to be a member of this church, a member of the UCC, or have your spiritual life completely figured out.',
        tips: [
          'Gluten-free and non-alcoholic options are always provided.',
          'Participation is entirely your choice—you are welcome to take communion or simply observe.'
        ]
      }
    },
    {
      id: 'fellowship',
      title: 'Coffee & After Service',
      icon: <Coffee className="w-5 h-5 text-amber-500" />,
      tag: 'Community Life',
      content: {
        heading: 'Linger for Conversation & Refreshments',
        body: 'Following worship at 11:20 AM, our fellowship hall hosts coffee hour. It is a relaxed opportunity to meet Pastor Carla, chat with longtime members, or simply enjoy a quiet refreshment before heading home or joining the Book Discussion group.',
        tips: [
          'Grab a warm drink and fresh snacks in the fellowship hall.',
          'Pastor Carla is always available in the narthex to introduce herself and answer questions.'
        ]
      }
    },
    {
      id: 'virtual',
      title: 'Joining on Zoom',
      icon: <Video className="w-5 h-5 text-twilight-600" />,
      tag: 'Hybrid Sanctuary',
      content: {
        heading: 'Participate from Anywhere in the World',
        body: 'Can’t join us in person this week? Our Sunday worship is fully hybrid! Virtual attendees join via Zoom, where you can see the sanctuary, hear the Love Choir, participate in shared prayers, and chat with fellow online worshippers.',
        tips: [
          'Zoom opens at 9:50 AM on Sunday mornings.',
          'You may keep your camera on or off according to your comfort.'
        ]
      }
    }
  ];

  const faqs = [
    {
      q: "What does 'Open and Affirming' (ONA) mean?",
      a: "It is the UCC denomination's official designation for congregations that have explicitly covenanted to celebrate and affirm people of all sexual orientations, gender identities, and gender expressions in every area of church life, fellowship, and leadership."
    },
    {
      q: "Do I have to participate or will I be singled out?",
      a: "Never. We will not ask you to stand up or introduce yourself on microphone. You are welcome to sit quietly, soak in the music and message, and take everything at your own pace."
    },
    {
      q: "What kind of music do you sing?",
      a: "A thoughtful mix of traditional hymns, contemporary songs of justice, and uplifting anthems led by our vocal choir, the Love Choir."
    },
    {
      q: "How can I schedule a chat with Pastor Carla?",
      a: "Pastor Carla loves connecting with newcomers! You can speak with her right after Sunday worship, call our church office at (830) 625-6761, or send an email through our contact page."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
          First-Time Visitor Guide
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mt-3">
          What to Expect When You Visit
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">
          Visiting a new church can sometimes feel intimidating. Here is everything you need to know so you can feel completely at ease.
        </p>
      </div>

      {/* Interactive Step Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Step Selector List (Col 1-5) */}
        <div className="lg:col-span-5 space-y-2">
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 border-terracotta-500 shadow-md ring-1 ring-terracotta-500'
                    : 'bg-white/60 dark:bg-slate-800/60 border-gray-100 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl ${
                    isSelected ? 'bg-terracotta-50 dark:bg-terracotta-900/40' : 'bg-gray-100 dark:bg-slate-700'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                      Step {idx + 1}
                    </span>
                    <h3 className={`text-base font-bold ${
                      isSelected ? 'text-terracotta-600 dark:text-terracotta-400' : 'text-gray-800 dark:text-slate-200'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${
                  isSelected ? 'text-terracotta-500 translate-x-1' : 'text-gray-400'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Panel (Col 6-12) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cream-200 dark:bg-slate-700 text-terracotta-700 dark:text-terracotta-300 mb-3">
            {steps[activeStep].tag}
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            {steps[activeStep].content.heading}
          </h3>

          <p className="text-gray-600 dark:text-slate-300 text-base leading-relaxed mb-6">
            {steps[activeStep].content.body}
          </p>

          <div className="space-y-3 bg-cream-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-gray-100 dark:border-slate-700">
            <h4 className="text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-slate-400">
              Helpful Details for Sunday
            </h4>
            <ul className="space-y-2">
              {steps[activeStep].content.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 mt-2 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={churchInfo.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <button
                onClick={onOpenZoom}
                className="inline-flex items-center gap-2 px-4 py-2 bg-cream-200 dark:bg-slate-700 text-gray-800 dark:text-white rounded-xl text-sm font-semibold hover:bg-cream-300 dark:hover:bg-slate-600 transition-colors"
              >
                <Video className="w-4 h-4 text-twilight-500" />
                <span>Join on Zoom</span>
              </button>
            </div>

            <button
              onClick={onOpenContact}
              className="text-sm font-semibold text-terracotta-600 dark:text-terracotta-400 hover:underline"
            >
              Ask a question &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* Visitor FAQ Accordion */}
      <div className="mt-16 sm:mt-24 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
            Common questions from seekers, families, and first-time guests.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 dark:text-white hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors"
                >
                  <span className="text-base sm:text-lg font-serif">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-terracotta-500' : 'text-gray-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-gray-600 dark:text-slate-300 border-t border-gray-50 dark:border-slate-700/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
