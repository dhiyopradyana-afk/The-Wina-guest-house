import React from 'react';
import { Wind, Droplets, Wifi, ShieldCheck, UtensilsCrossed, Sparkles } from 'lucide-react';
import { Facility } from '../types';

interface FacilitiesProps {
  facilities: Facility[];
}

export const Facilities: React.FC<FacilitiesProps> = ({ facilities }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind':
        return <Wind className="w-6 h-6 text-[#C6A66B]" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-[#C6A66B]" />;
      case 'Wifi':
        return <Wifi className="w-6 h-6 text-[#C6A66B]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#C6A66B]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-[#C6A66B]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#C6A66B]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#C6A66B]" />;
    }
  };

  return (
    <section id="facilities" className="py-24 bg-[#F8F6F1] border-b border-[#E8DFD2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
            Thoughtful Amenities
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#242424]">
            Everything You Need for a Restful Stay
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
            From whisper-quiet air conditioning to dependable fiber internet and shared cooking spaces, every facility is maintained with care.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="p-8 bg-white border border-[#E8DFD2] rounded-xs space-y-4 transition-all duration-300 hover:border-[#C6A66B]/60 hover:shadow-md group"
            >
              <div className="w-12 h-12 rounded-xs bg-[#F8F6F1] border border-[#E8DFD2] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {getIcon(fac.iconName)}
              </div>

              <h3 className="font-heading text-2xl font-semibold text-[#242424] group-hover:text-[#243B32] transition-colors">
                {fac.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {fac.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-16 p-6 sm:p-8 bg-[#243B32] text-white rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-heading text-xl sm:text-2xl font-normal text-[#E8DFD2]">
              Need Additional Assistance or Inquiries?
            </h4>
            <p className="text-xs sm:text-sm text-white/80">
              Our on-site staff can assist with scooter rentals, local laundry services, and surf lesson recommendations.
            </p>
          </div>
          <div className="text-xs font-semibold tracking-widest uppercase text-[#C6A66B] px-5 py-2.5 border border-[#C6A66B]/60 rounded-xs">
            On-Site Support Daily
          </div>
        </div>
      </div>
    </section>
  );
};
