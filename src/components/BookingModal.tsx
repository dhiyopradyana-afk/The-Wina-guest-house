import React, { useState, useEffect } from 'react';
import { X, Send, Copy, Check, MessageSquare, AlertCircle } from 'lucide-react';
import { BookingFormData, Room, SiteSettings } from '../types';
import { buildWhatsAppReservationUrl } from '../utils/seo';

interface BookingModalProps {
  isOpen: boolean;
  initialRoomType?: string;
  rooms: Room[];
  settings: SiteSettings;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  initialRoomType,
  rooms,
  settings,
  onClose,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    guestName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: initialRoomType || (rooms[0] ? rooms[0].name : 'Deluxe King Room with Balcony'),
    guestsCount: 2,
    specialRequests: '',
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialRoomType) {
      setFormData((prev) => ({ ...prev, roomType: initialRoomType }));
    }
  }, [initialRoomType]);

  // Set default dates: check-in tomorrow, checkout in 3 days
  useEffect(() => {
    if (!formData.checkInDate) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const checkout = new Date(today);
      checkout.setDate(checkout.getDate() + 4);

      setFormData((prev) => ({
        ...prev,
        checkInDate: tomorrow.toISOString().split('T')[0],
        checkOutDate: checkout.toISOString().split('T')[0],
      }));
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppReservationUrl(formData, settings);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const rawMessage = [
      `*RESERVATION INQUIRY – THE WINA GUEST HOUSE*`,
      `Hello The Wina Guest House team, I would like to inquire about room availability.`,
      ``,
      `• Guest Name: ${formData.guestName || 'Not specified'}`,
      `• Contact: ${formData.phone || formData.email || 'Direct WhatsApp contact'}`,
      `• Room Type: ${formData.roomType}`,
      `• Check-in Date: ${formData.checkInDate}`,
      `• Check-out Date: ${formData.checkOutDate}`,
      `• Number of Guests: ${formData.guestsCount} Guest(s)`,
      formData.specialRequests ? `• Special Requests: ${formData.specialRequests}` : '',
      ``,
      `Could you please confirm current availability and nightly rates for these dates? Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#F8F6F1] rounded-xs shadow-2xl border border-[#E8DFD2] overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#243B32] p-6 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold tracking-widest uppercase text-[#C6A66B]">
              Direct WhatsApp Reservation
            </div>
            <h3 className="font-heading text-2xl font-normal text-[#F8F6F1]">
              Reserve at The Wina Guest House
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close Booking Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Important Notice per prompt */}
          <div className="flex items-start gap-2.5 p-3.5 bg-[#E8DFD2]/40 border border-[#E8DFD2] rounded-xs text-xs text-[#242424]/90">
            <AlertCircle className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#243B32]">Booking Notice: </span>
              Inquiries are sent directly to our front desk via WhatsApp. Room reservations are subject to confirmation based on real-time availability.
            </div>
          </div>

          {/* Guest Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#242424]">
                Guest Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#242424]">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="e.g. +61 400 123 456"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
              />
            </div>
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#242424]">
                Check-in Date *
              </label>
              <input
                type="date"
                required
                value={formData.checkInDate}
                onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#242424]">
                Check-out Date *
              </label>
              <input
                type="date"
                required
                value={formData.checkOutDate}
                onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
              />
            </div>
          </div>

          {/* Room Type & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#242424]">
                Room Type *
              </label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#242424]">
                Number of Guests
              </label>
              <select
                value={formData.guestsCount}
                onChange={(e) =>
                  setFormData({ ...formData, guestsCount: parseInt(e.target.value, 10) })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
              >
                <option value={1}>1 Guest (Solo Traveler)</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#242424]">
              Special Requests or Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Late check-in around 19:00, airport pickup inquiry, scooter parking space needed..."
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
            />
          </div>

          {/* WhatsApp Destination Info */}
          <div className="text-xs text-[#6B7280]">
            Sending to The Wina WhatsApp: <span className="font-semibold text-[#243B32]">{settings.whatsappNumber}</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full sm:flex-1 font-action py-3.5 px-6 text-xs font-bold tracking-widest uppercase text-white bg-[#243B32] hover:bg-[#192A23] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <Send className="w-4 h-4 text-[#C6A66B]" />
              Send to WhatsApp
            </button>
            <button
              type="button"
              onClick={handleCopyMessage}
              className="w-full sm:w-auto py-3.5 px-4 text-xs font-medium text-[#242424] hover:bg-[#E8DFD2]/60 border border-[#E8DFD2] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#6B7280]" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
