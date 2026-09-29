import React from 'react';
import { MapPin, Instagram, Mail, MessageCircle, FileCode, Lock, ArrowUp } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (view: string, articleSlug?: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
  onOpenSitemap,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (anchor: string) => {
    if (anchor === 'blog') {
      onNavigate('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer id="contact" className="bg-[#192A23] text-[#F8F6F1] border-t border-[#243B32]">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Address Column */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="font-heading text-3xl font-semibold tracking-tight text-[#F8F6F1]">
              {settings.brandName}
            </h3>

            <p className="text-xs sm:text-sm text-[#E8DFD2]/80 leading-relaxed max-w-md font-light">
              A luxury boutique guest house celebrating tropical minimalism and authentic Balinese hospitality. Nestled in a quiet residential laneway on Jalan Pantai Batu Bolong, Canggu.
            </p>

            <div className="space-y-2.5 text-xs text-[#E8DFD2]/90 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#C6A66B] shrink-0" />
                <a
                  href={`https://instagram.com/${settings.instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C6A66B] transition-colors"
                >
                  @{settings.instagramHandle}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#C6A66B] shrink-0" />
                <span>WhatsApp: {settings.whatsappNumber}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A66B] shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
              Quick Navigation
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E8DFD2]/80">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  About The Wina
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('rooms')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Rooms & Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('facilities')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Guest Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('gallery')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('location')}
                  className="hover:text-[#C6A66B] transition-colors cursor-pointer"
                >
                  Location & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Journal Topics Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
              The Wina Journal (SEO Blog)
            </div>
            <p className="text-xs text-[#E8DFD2]/80 leading-relaxed font-light">
              Explore insightful Canggu accommodation guides, surfing tips, and local dining advice curated by our team.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('blog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-action inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-[#243B32] hover:bg-[#2e4c40] border border-[#C6A66B]/40 rounded-xs transition-colors cursor-pointer"
              >
                Read Journal Articles
              </button>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="font-action px-4 py-2 text-xs font-bold tracking-wider uppercase text-[#242424] bg-[#C6A66B] hover:bg-[#A9894F] rounded-xs transition-colors cursor-pointer shadow-xs"
              >
                Book via WhatsApp
              </button>
              <button
                onClick={onOpenSitemap}
                className="p-2 text-[#E8DFD2]/70 hover:text-white border border-white/20 rounded-xs transition-colors cursor-pointer"
                title="View XML Sitemap & Robots.txt"
              >
                <FileCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DFD2]/60">
          <div>
            © {new Date().getFullYear()} {settings.brandName}. All rights reserved. Jl. Pantai Batu Bolong No. 20 D, Canggu, Bali.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSitemap}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>XML Sitemap</span>
            </button>

            <span aria-hidden="true">·</span>

            <button
              onClick={onOpenAdmin}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>Admin Portal</span>
            </button>

            <span aria-hidden="true">·</span>

            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#C6A66B]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
