import React from 'react';
import { churchInfo } from '../../data/churchData';
import { UCCComma } from '../ui/UCCComma';
import { ViewState } from '../../types';
import { MapPin, Phone, Mail, Clock, Heart, Youtube, Facebook, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity & Comma Theology */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <UCCComma size={44} interactive={true} />
              <div>
                <h4 className="font-serif font-bold text-xl text-white">Faith UCC</h4>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  New Braunfels, Texas
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 italic leading-relaxed">
              &ldquo;Never place a period where God has placed a comma.&rdquo;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We are an Open and Affirming (ONA) congregation of the United Church of Christ, celebrating every soul in the fullness of God's love.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={churchInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-red-600 hover:text-white rounded-xl transition-colors"
                title="Faith UCC YouTube Channel"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={churchInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl transition-colors"
                title="Faith UCC Facebook Page"
                aria-label="Facebook Page"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={churchInfo.realmGiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-terracotta-500 hover:text-white rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold"
                title="Realm Online Giving"
                aria-label="Online Giving"
              >
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>Give</span>
              </a>
            </div>
          </div>

          {/* Col 2: Service Times & Location */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-white">Worship & Location</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Sundays at 10:00 AM CST</p>
                  <p className="text-xs text-slate-400">In-Person & Virtual via Zoom</p>
                  <p className="text-xs text-slate-400 mt-1">Sunday School: 11:20 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-sage-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{churchInfo.address.street}</p>
                  <p className="text-xs text-slate-400">
                    {churchInfo.address.city}, {churchInfo.address.state} {churchInfo.address.zip}
                  </p>
                  <a
                    href={churchInfo.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-terracotta-400 hover:text-terracotta-300 font-semibold mt-1"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-white">Explore Faith UCC</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('plan-visit'); window.scrollTo(0, 0); }}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  Plan Your First Visit
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo(0, 0); }}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  Our Story & ONA Covenant
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('pastor'); window.scrollTo(0, 0); }}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  Rev. Dr. Carla Cheatham
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('ministries'); window.scrollTo(0, 0); }}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  SOS Food Bank & Love Choir
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('calendar'); window.scrollTo(0, 0); }}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  Events & Fellowship Nights
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('give'); window.scrollTo(0, 0); }}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  Online Giving & Pledging
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-white">Contact Us</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-terracotta-400" />
                <a href={`tel:${churchInfo.contact.phone}`} className="hover:text-white transition-colors">
                  {churchInfo.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-terracotta-400" />
                <a href={`mailto:${churchInfo.contact.email}`} className="hover:text-white transition-colors truncate">
                  {churchInfo.contact.email}
                </a>
              </div>
              <p className="text-xs pt-2">
                {churchInfo.contact.officeHours}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => { onNavigate('contact'); window.scrollTo(0, 0); }}
                className="w-full py-2.5 px-4 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Send a Prayer Request
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Faith United Church of Christ New Braunfels. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Open and Affirming (ONA)</span>
            <span>•</span>
            <span>God Is Still Speaking</span>
            <span>•</span>
            <span className="text-slate-400">Redesigned with Love & Gratitude</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
