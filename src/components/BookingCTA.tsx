import React from 'react';
import { MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';

interface BookingCTAProps {
  onOpenBooking: () => void;
  settings: SiteSettings;
}

export const BookingCTA: React.FC<BookingCTAProps> = ({ onOpenBooking, settings }) => {
  return (
    <section className="relative py-24 bg-[#243B32] text-white overflow-hidden">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A66B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Reservation</span>
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-white max-w-3xl mx-auto leading-tight">
          Your Bali Getaway Starts Here
        </h2>

        <p className="text-base sm:text-lg text-[#E8DFD2]/90 max-w-2xl mx-auto leading-relaxed font-light">
          Connect directly with our team on WhatsApp for guaranteed availability, transparent rates, and personalized assistance for your Canggu holiday.
        </p>

        {/* Benefits checklist */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#E8DFD2]/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C6A66B]" />
            <span>Zero Booking Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C6A66B]" />
            <span>Instant Availability Check</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C6A66B]" />
            <span>Personal Balinese Care</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto font-action px-10 py-4 text-xs font-bold tracking-widest uppercase text-[#242424] bg-[#C6A66B] hover:bg-[#A9894F] rounded-xs transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            RESERVE YOUR STAY
          </button>
        </div>

        <div className="text-[11px] text-[#E8DFD2]/60 pt-2">
          Direct WhatsApp inquiries are responded to daily by The Wina management.
        </div>
      </div>
    </section>
  );
};
