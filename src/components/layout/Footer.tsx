import React from 'react';
import { churchInfo } from '../../data/churchData';
import { UCCComma } from '../ui/UCCComma';
import { ViewState } from '../../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart, 
  Youtube, 
  Facebook, 
  ExternalLink,
  Video,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavigate = (view: ViewState) => {
    onNavigate(view);
  };

  return (
    <footer className="mt-auto bg-[#0A111C] text-slate-300 relative border-t border-slate-800">
      
      {/* Radiant Pride Accent Bar across the top edge of footer */}
      <div className="pride-bar-subtle w-full" aria-hidden="true" />

      <div className="fluid-container pt-14 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Col 1: Identity & Open & Affirming Covenant */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <UCCComma size={42} />
              <div>
                <h4 className="font-serif font-bold text-xl text-white tracking-tight">Faith UCC</h4>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  New Braunfels, Texas
                </p>
              </div>
            </div>

            <p className="text-sm text-sand-200 italic leading-relaxed font-serif">
              &ldquo;Never place a period where God has placed a comma.&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              We are an Open and Affirming (ONA) congregation of the United Church of Christ. We celebrate LGBTQ+ belonging, diverse families, and God&rsquo;s extravagant grace in the Texas Hill Country.
            </p>

            {/* Social & Livestream Links */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={churchInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-red-600 hover:text-white text-slate-300 rounded-xl transition-colors border border-slate-800"
                title="Faith UCC YouTube Channel (Sermons & Worship)"
                aria-label="Faith UCC YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-300 rounded-xl transition-colors border border-slate-800"
                title="Faith UCC Facebook Page (Community Updates)"
                aria-label="Faith UCC Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.service.zoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-twilight-600 hover:text-white text-twilight-300 rounded-xl transition-colors border border-slate-800 flex items-center gap-1.5 text-xs font-semibold"
                title="Join Sunday Worship via Zoom"
                aria-label="Join Sunday Worship on Zoom"
              >
                <Video className="w-4 h-4 text-twilight-400" />
                <span className="hidden xs:inline">Zoom</span>
              </a>
              <a
                href={churchInfo.realmGiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-terracotta-500 hover:text-white text-sand-100 rounded-xl transition-colors border border-slate-800 flex items-center gap-1.5 text-xs font-semibold"
                title="Online Giving via Realm"
                aria-label="Online Giving via Realm"
              >
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>Give</span>
              </a>
            </div>
          </div>

          {/* Col 2: Service Times & Hill Country Sanctuary Location */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-white">Worship & Gathering</h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-terracotta-400 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Sundays at 10:00 AM CST</p>
                  <p className="text-xs text-slate-400">In-Person in Sanctuary & Live on Zoom</p>
                  <p className="text-xs text-amber-300/80 mt-1">Sunday School: 11:20 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cedar-400 shrink-0 mt-1" />
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
                    <span>Directions & Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Open communion table celebrated 1st Sunday of each month. All are welcome, no exceptions.
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Community & Ministry Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-white">Explore Faith Church</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => handleNavigate('plan-visit')}
                  className="hover:text-terracotta-400 transition-colors text-left"
                >
                  Plan Your First Visit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('about')}
                  className="hover:text-terracotta-400 transition-colors text-left"
                >
                  Who We Are & ONA Covenant
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('pastor')}
                  className="hover:text-terracotta-400 transition-colors text-left"
                >
                  Pastor Rev. Dr. Carla Cheatham
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('ministries')}
                  className="hover:text-terracotta-400 transition-colors text-left"
                >
                  SOS Food Bank & The Love Choir
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('worship')}
                  className="hover:text-terracotta-400 transition-colors text-left"
                >
                  Worship Music & Sermon Videos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('calendar')}
                  className="hover:text-terracotta-400 transition-colors text-left"
                >
                  Theology on Tap & Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('give')}
                  className="hover:text-terracotta-400 transition-colors text-left"
                >
                  Online Giving & Stewardship
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office Support */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-white">Contact & Pastoral Care</h4>
            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-terracotta-400 shrink-0" />
                <a href={`tel:${churchInfo.contact.phone}`} className="hover:text-white transition-colors">
                  {churchInfo.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-terracotta-400 shrink-0" />
                <a href={`mailto:${churchInfo.contact.email}`} className="hover:text-white transition-colors truncate">
                  {churchInfo.contact.email}
                </a>
              </div>
              <p className="text-xs text-slate-400 pt-1">
                <strong className="text-slate-300">Office Hours:</strong> {churchInfo.contact.officeHours}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleNavigate('contact')}
                className="w-full py-2.5 px-4 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                Send a Prayer Request
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & UCC Affiliation */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Faith United Church of Christ New Braunfels. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
            <span className="text-pink-400 font-semibold">Open and Affirming (ONA)</span>
            <span>•</span>
            <span className="text-sand-200">God Is Still Speaking</span>
            <span>•</span>
            <span>United Church of Christ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
