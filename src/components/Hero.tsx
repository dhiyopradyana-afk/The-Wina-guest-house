import React from 'react';
import { ArrowDown, MapPin, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/initialData';

interface HeroProps {
  onExploreRooms: () => void;
  onBookStay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreRooms, onBookStay }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="The Wina Guest House Canggu Bali tropical courtyard and architecture"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient overlay to ensure WCAG AA 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24 pb-16 flex flex-col items-center">
        {/* Quiet Location Kicker - unboxed text per Section 1.A */}
        <div className="flex items-center gap-2 text-xs sm:text-sm tracking-widest uppercase text-[#E8DFD2] mb-6">
          <MapPin className="w-3.5 h-3.5 text-[#C6A66B]" />
          <span>Jl. Pantai Batu Bolong No. 20 D</span>
          <span aria-hidden="true">·</span>
          <span>Canggu, Bali</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white max-w-4xl text-balance leading-tight mb-6">
          Your Private Escape in the Heart of Canggu
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-[#F8F6F1]/90 max-w-2xl font-light leading-relaxed mb-10 text-balance">
          Experience comfort, tranquility, and authentic Balinese hospitality in a thoughtfully designed guest house.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onBookStay}
            className="w-full sm:w-auto font-action px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-white bg-[#C6A66B] hover:bg-[#A9894F] rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-white" />
            Book Your Stay
          </button>
          <button
            onClick={onExploreRooms}
            className="w-full sm:w-auto font-action px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-[#F8F6F1] bg-black/40 hover:bg-black/60 border border-white/30 hover:border-white/60 rounded-sm backdrop-blur-xs transition-all cursor-pointer"
          >
            Explore Rooms
          </button>
        </div>

        {/* Subtle quick feature reassurance */}
        <div className="mt-14 pt-8 border-t border-white/15 w-full max-w-3xl flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#E8DFD2]/80">
          <div>Quiet Residential Laneway</div>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <div>Footsteps to Cafes & Beach</div>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <div>Direct WhatsApp Confirmation</div>
        </div>
      </div>

      {/* Scroll down prompt */}
      <button
        onClick={onExploreRooms}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-1.5 focus:outline-hidden"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] tracking-widest uppercase font-action text-[#E8DFD2]/70">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#C6A66B]" />
      </button>
    </section>
  );
};
