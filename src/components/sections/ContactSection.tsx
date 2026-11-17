import React, { useState } from 'react';
import { churchInfo } from '../../data/churchData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Heart, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formType, setFormType] = useState<'general' | 'prayer'>('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    isConfidential: true
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-900/40 px-3 py-1 rounded-full">
          Get In Touch & Share a Prayer
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-3">
          We Are Here With You
        </h2>
        <p className="text-gray-600 dark:text-slate-300 mt-3 text-base sm:text-lg leading-relaxed">
          Whether you have a question about visiting, need a listening ear, or want to submit a prayer request, reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info & Directions Card (Col 1-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
            <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">
              Church Office & Campus
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Physical Location:</span>
                  <p className="text-gray-600 dark:text-slate-300">{churchInfo.address.full}</p>
                  <a
                    href={churchInfo.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-terracotta-600 dark:text-terracotta-400 hover:underline mt-1"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-sage-50 dark:bg-sage-900/40 text-sage-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Telephone:</span>
                  <a href={`tel:${churchInfo.contact.phone}`} className="text-gray-600 dark:text-slate-300 hover:text-terracotta-600">
                    {churchInfo.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-twilight-50 dark:bg-twilight-900/40 text-twilight-500 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Email Address:</span>
                  <a href={`mailto:${churchInfo.contact.email}`} className="text-gray-600 dark:text-slate-300 hover:text-terracotta-600 break-all">
                    {churchInfo.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Office Hours:</span>
                  <p className="text-gray-600 dark:text-slate-300">{churchInfo.contact.officeHours}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
              <span className="text-xs uppercase font-bold text-gray-400 dark:text-slate-500 block mb-2">
                Sunday Schedule
              </span>
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">
                10:00 AM – 11:20 AM: Worship & Livestream
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">
                11:20 AM – 12:20 PM: Sunday School & Fellowship
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Form Panel (Col 6-12) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-slate-700 shadow-xl">
          
          {/* Toggle Type */}
          <div className="flex p-1 bg-cream-100 dark:bg-slate-700/60 rounded-2xl mb-8">
            <button
              onClick={() => { setFormType('general'); setSubmitted(false); }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                formType === 'general'
                  ? 'bg-white dark:bg-slate-800 text-terracotta-600 dark:text-terracotta-400 shadow-sm'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>General Message</span>
            </button>
            <button
              onClick={() => { setFormType('prayer'); setSubmitted(false); }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                formType === 'prayer'
                  ? 'bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 shadow-sm'
                  : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'
              }`}
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span>Prayer Request</span>
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">
                Message Received with Care
              </h3>
              <p className="text-sm text-gray-600 dark:text-slate-300 max-w-md mx-auto">
                Thank you for reaching out to Faith UCC. {formType === 'prayer' ? 'Our pastoral care circle and Pastor Carla will hold your prayer in sacred confidence.' : 'Our church office will respond to you warmly and promptly.'}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', message: '', isConfidential: true });
                }}
                className="mt-4 px-6 py-2.5 bg-terracotta-500 text-white font-bold rounded-xl text-sm hover:bg-terracotta-600 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-cream-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 bg-cream-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(830) 555-0123"
                  className="w-full px-4 py-3 bg-cream-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5">
                  {formType === 'prayer' ? 'Your Prayer Request *' : 'Your Message / Question *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={formType === 'prayer' ? 'Please hold my family in prayer...' : 'I would like to learn more about...'}
                  className="w-full px-4 py-3 bg-cream-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-gray-900 dark:text-white resize-y"
                />
              </div>

              {formType === 'prayer' && (
                <div className="flex items-center gap-2 pt-1 text-xs text-gray-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    id="confidential"
                    checked={formData.isConfidential}
                    onChange={(e) => setFormData({ ...formData, isConfidential: e.target.checked })}
                    className="w-4 h-4 rounded text-terracotta-500 focus:ring-terracotta-500 border-gray-300 dark:border-slate-700"
                  />
                  <label htmlFor="confidential" className="font-medium cursor-pointer">
                    Keep this prayer confidential with Pastor Carla only
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{formType === 'prayer' ? 'Submit Prayer Request' : 'Send Message'}</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </section>
  );
};
