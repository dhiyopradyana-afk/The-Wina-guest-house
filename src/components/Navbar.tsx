import React, { useState, useEffect } from 'react';
import { Menu, X, CalendarCheck, Lock } from 'lucide-react';
import { SiteSettings } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, articleSlug?: string) => void;
  onOpenBooking: (roomType?: string) => void;
  onOpenAdmin: () => void;
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
  settings,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentView === 'home';
  const navBgClass =
    isScrolled || !isHome
      ? 'bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#E8DFD2] shadow-xs text-[#242424]'
      : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent text-white';

  const linkHoverClass =
    isScrolled || !isHome
      ? 'text-[#242424]/80 hover:text-[#243B32]'
      : 'text-white/90 hover:text-white';

  const handleLinkClick = (anchor: string) => {
    setMobileMenuOpen(false);
    if (anchor === 'blog') {
      onNavigate('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (anchor === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left group cursor-pointer focus:outline-hidden"
          aria-label="The Wina Guest House Home"
        >
          <span className="font-heading text-2xl sm:text-3xl tracking-tight font-semibold block transition-colors group-hover:text-[#C6A66B]">
            {settings.brandName}
          </span>
        </button>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => handleLinkClick('home')}
            className={`transition-colors cursor-pointer ${linkHoverClass}`}
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick('about')}
            className={`transition-colors cursor-pointer ${linkHoverClass}`}
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick('rooms')}
            className={`transition-colors cursor-pointer ${linkHoverClass}`}
          >
            Rooms
          </button>
          <button
            onClick={() => handleLinkClick('facilities')}
            className={`transition-colors cursor-pointer ${linkHoverClass}`}
          >
            Facilities
          </button>
          <button
            onClick={() => handleLinkClick('gallery')}
            className={`transition-colors cursor-pointer ${linkHoverClass}`}
          >
            Gallery
          </button>
          <button
            onClick={() => handleLinkClick('blog')}
            className={`transition-colors cursor-pointer ${linkHoverClass} ${
              currentView === 'blog' || currentView === 'blog-article'
                ? 'font-semibold text-[#C6A66B]'
                : ''
            }`}
          >
            The Wina Journal
          </button>
          <button
            onClick={() => handleLinkClick('location')}
            className={`transition-colors cursor-pointer ${linkHoverClass}`}
          >
            Location
          </button>
          <button
            onClick={() => handleLinkClick('contact')}
            className={`transition-colors cursor-pointer ${linkHoverClass}`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenBooking()}
            className="font-action inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#243B32] hover:bg-[#192A23] rounded-sm transition-colors shadow-xs cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#C6A66B]" />
            Book Now
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 text-xs font-semibold uppercase text-white bg-[#243B32] rounded-sm"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F8F6F1] border-b border-[#E8DFD2] px-6 py-6 text-[#242424] space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left py-2 border-b border-[#E8DFD2]/60"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-left py-2 border-b border-[#E8DFD2]/60"
            >
              About
            </button>
            <button
              onClick={() => handleLinkClick('rooms')}
              className="text-left py-2 border-b border-[#E8DFD2]/60"
            >
              Rooms
            </button>
            <button
              onClick={() => handleLinkClick('facilities')}
              className="text-left py-2 border-b border-[#E8DFD2]/60"
            >
              Facilities
            </button>
            <button
              onClick={() => handleLinkClick('gallery')}
              className="text-left py-2 border-b border-[#E8DFD2]/60"
            >
              Gallery
            </button>
            <button
              onClick={() => handleLinkClick('blog')}
              className="text-left py-2 border-b border-[#E8DFD2]/60 text-[#243B32] font-semibold"
            >
              The Wina Journal (Blog)
            </button>
            <button
              onClick={() => handleLinkClick('location')}
              className="text-left py-2 border-b border-[#E8DFD2]/60"
            >
              Location
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left py-2 border-b border-[#E8DFD2]/60"
            >
              Contact
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full font-action flex items-center justify-center gap-2 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#243B32] rounded-sm"
            >
              <CalendarCheck className="w-4 h-4 text-[#C6A66B]" />
              Book via WhatsApp
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-[#6B7280] hover:text-[#242424]"
            >
              <Lock className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
