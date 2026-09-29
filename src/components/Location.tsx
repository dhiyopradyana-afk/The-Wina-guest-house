import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../types';

interface LocationProps {
  settings: SiteSettings;
}

export const Location: React.FC<LocationProps> = ({ settings }) => {
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.3310052327706!2d115.1302!3d-8.6539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd238804689c1f5%3A0x6a56b68e987b22!2sJl.%20Pantai%20Batu%20Bolong%2C%20Canggu%2C%20Kec.%20Kuta%20Utara%2C%20Kabupaten%20Badung%2C%20Bali!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid';

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings.address
  )}`;

  return (
    <section id="location" className="py-24 bg-[#F8F6F1] border-b border-[#E8DFD2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
              Prime Canggu Address
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#242424] leading-tight">
              Stay Close to Everything
            </h2>

            <div className="p-4 bg-white border border-[#E8DFD2] rounded-xs space-y-2">
              <div className="flex items-start gap-2.5 text-sm font-semibold text-[#243B32]">
                <MapPin className="w-5 h-5 text-[#C6A66B] shrink-0 mt-0.5" />
                <span>Verified Address</span>
              </div>
              <p className="text-xs sm:text-sm text-[#242424] leading-relaxed pl-7">
                {settings.address}
              </p>
              <div className="pl-7 pt-1">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#243B32] hover:text-[#C6A66B] transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              The Wina Guest House is nestled on Jalan Pantai Batu Bolong, putting you in close proximity to Canggu's famous beaches, celebrated bakeries, specialty coffee shops, yoga studios, and local warungs.
            </p>

            {/* Neighborhood Orientation */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Navigation className="w-4 h-4 text-[#C6A66B] shrink-0 mt-1" />
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-[#242424]">Batu Bolong Beach & Surf Break:</span>{' '}
                  <span className="text-[#6B7280]">
                    Direct access down the main street towards the ocean and surf rentals.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Compass className="w-4 h-4 text-[#C6A66B] shrink-0 mt-1" />
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-[#242424]">Dining & Convenience:</span>{' '}
                  <span className="text-[#6B7280]">
                    Footsteps to convenience stores, pharmacies, laundry services, and organic cafes.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C6A66B] shrink-0 mt-1" />
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-[#242424]">Echo Beach & Pererenan:</span>{' '}
                  <span className="text-[#6B7280]">
                    Easily accessible via quick scooter ride or low-tide coastal stroll.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Frame Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xs overflow-hidden border border-[#E8DFD2] shadow-sm bg-[#E8DFD2] h-[380px] sm:h-[460px]">
              <iframe
                title="The Wina Guest House Canggu Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-90"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-xs border border-[#E8DFD2] shadow-xs text-xs text-[#242424]">
                <div className="font-semibold text-[#243B32]">{settings.brandName}</div>
                <div className="text-[#6B7280] text-[11px]">Jl. Pantai Batu Bolong No. 20 D</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
