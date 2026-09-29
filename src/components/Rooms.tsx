import React, { useState } from 'react';
import { Users, Bed, Maximize, Check, CalendarCheck, Info } from 'lucide-react';
import { Room } from '../types';
import { RoomModal } from './RoomModal';

interface RoomsProps {
  rooms: Room[];
  onOpenBooking: (roomType?: string) => void;
}

export const Rooms: React.FC<RoomsProps> = ({ rooms, onOpenBooking }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <section id="rooms" className="py-24 bg-[#E8DFD2]/25 border-b border-[#E8DFD2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
            Accommodations
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#242424]">
            Comfort Meets Simplicity
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
            Thoughtfully appointed private rooms tailored for peaceful rest, cool comfort, and effortless island living in Canggu.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white border border-[#E8DFD2] rounded-xs overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300"
            >
              {/* Room Image */}
              <div className="relative h-64 overflow-hidden bg-[#E8DFD2]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                {room.priceEstimate && (
                  <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-xs">
                    {room.priceEstimate}
                  </div>
                )}
              </div>

              {/* Room Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  {/* Clean unboxed metadata separator per Section 1.A */}
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#C6A66B]" /> {room.maxGuests} Guests
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-[#C6A66B]" /> {room.bedType}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5 text-[#C6A66B]" /> {room.sizeM2} m²
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-semibold text-[#242424] group-hover:text-[#243B32] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-3 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-[#E8DFD2]/60 space-y-1.5">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#242424]">
                        <Check className="w-3.5 h-3.5 text-[#C6A66B] shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#E8DFD2]/60 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="flex-1 py-2.5 px-3 text-xs font-medium text-[#242424] hover:bg-[#E8DFD2]/40 border border-[#E8DFD2] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-[#6B7280]" />
                    Details
                  </button>
                  <button
                    onClick={() => onOpenBooking(room.name)}
                    className="flex-1 font-action py-2.5 px-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#243B32] hover:bg-[#192A23] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#C6A66B]" />
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing & Policy Note */}
        <div className="mt-12 text-center text-xs text-[#6B7280] max-w-xl mx-auto">
          Rates vary by season and length of stay. All reservations are confirmed directly with our team on WhatsApp for guaranteed availability.
        </div>
      </div>

      {/* Detail Modal */}
      <RoomModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onBook={(room) => onOpenBooking(room.name)}
      />
    </section>
  );
};
