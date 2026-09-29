import React from 'react';
import { X, Check, Users, Maximize, Bed, CalendarCheck, ShieldCheck } from 'lucide-react';
import { Room } from '../types';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: (room: Room) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onBook }) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#F8F6F1] rounded-xs shadow-2xl border border-[#E8DFD2] overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
          aria-label="Close Room Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Room Image Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#E8DFD2]">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C6A66B] font-semibold mb-1">
                Room Details
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold">
                {room.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Specs Row */}
          <div className="flex flex-wrap items-center gap-6 py-3 border-y border-[#E8DFD2] text-xs sm:text-sm text-[#243B32]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C6A66B]" />
              <span>Up to {room.maxGuests} Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#C6A66B]" />
              <span>{room.bedType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4 text-[#C6A66B]" />
              <span>{room.sizeM2} m² Space</span>
            </div>
            {room.priceEstimate && (
              <div className="ml-auto text-xs font-semibold text-[#242424] bg-[#E8DFD2]/60 px-3 py-1 rounded-xs">
                {room.priceEstimate}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#243B32] mb-2">
              Overview
            </h4>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Full Amenities */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#243B32] mb-3">
              Included Amenities & Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#242424]">
                  <Check className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stay Policies */}
          <div className="p-4 bg-white/70 border border-[#E8DFD2] rounded-xs space-y-1.5 text-xs text-[#6B7280]">
            <div className="flex items-center gap-2 font-semibold text-[#243B32]">
              <ShieldCheck className="w-4 h-4 text-[#C6A66B]" />
              <span>Guest House Policies</span>
            </div>
            <p>
              • Check-in: 14:00 onwards · Check-out: by 12:00 PM (noon).
            </p>
            <p>
              • Non-smoking rooms (outdoor smoking areas available in garden).
            </p>
            <p>
              • Quiet hours from 22:00 to 07:00 to ensure peaceful rest for all guests.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8DFD2]">
            <div className="text-xs text-[#6B7280] text-center sm:text-left">
              Direct booking via WhatsApp · Instant availability check
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-[#242424] hover:bg-[#E8DFD2]/50 border border-[#E8DFD2] rounded-xs cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBook(room);
                }}
                className="w-full sm:w-auto font-action inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#243B32] hover:bg-[#192A23] rounded-xs cursor-pointer shadow-xs"
              >
                <CalendarCheck className="w-4 h-4 text-[#C6A66B]" />
                Reserve This Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
