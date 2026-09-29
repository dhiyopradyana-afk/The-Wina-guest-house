import React from 'react';
import { COURTYARD_IMAGE } from '../data/initialData';
import { ShieldCheck, HeartHandshake, Sparkles, Compass } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#F8F6F1] border-b border-[#E8DFD2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
              Welcome to Canggu, Bali
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#242424] leading-tight">
              A Place to Feel at Home
            </h2>

            <p className="text-base sm:text-lg text-[#242424]/85 leading-relaxed font-normal">
              Discover a welcoming stay at The Wina Guest House in Canggu, Bali. Enjoy a comfortable atmosphere, convenient facilities, and a relaxing place to unwind while exploring the vibrant surroundings of Canggu.
            </p>

            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              Situated in a quiet residential alley right off Jalan Pantai Batu Bolong, The Wina Guest House offers an intimate escape from the bustling island energy. Here, minimalist tropical architecture meets genuine Balinese warmth, ensuring every guest feels looked after like family.
            </p>

            {/* Editorial highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white/70 border border-[#E8DFD2] rounded-xs space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#243B32]">
                  <Compass className="w-4 h-4 text-[#C6A66B]" />
                  <span>Prime Batu Bolong</span>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Footsteps to renowned bakeries, surf breaks, and wellness studios without the street noise.
                </p>
              </div>

              <div className="p-4 bg-white/70 border border-[#E8DFD2] rounded-xs space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#243B32]">
                  <HeartHandshake className="w-4 h-4 text-[#C6A66B]" />
                  <span>Balinese Hospitality</span>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Attentive on-site staff dedicated to immaculate daily cleanliness and guest comfort.
                </p>
              </div>

              <div className="p-4 bg-white/70 border border-[#E8DFD2] rounded-xs space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#243B32]">
                  <Sparkles className="w-4 h-4 text-[#C6A66B]" />
                  <span>Tropical Sanctuary</span>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  A serene central courtyard with lush palms, frangipani blossoms, and natural stone paths.
                </p>
              </div>

              <div className="p-4 bg-white/70 border border-[#E8DFD2] rounded-xs space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#243B32]">
                  <ShieldCheck className="w-4 h-4 text-[#C6A66B]" />
                  <span>Secure & Private</span>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Gated private entrance, dedicated scooter parking, and verified peaceful guest environment.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Photo with Editorial Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Subtle architectural border offset */}
              <div className="absolute -inset-3 border border-[#C6A66B]/30 rounded-xs pointer-events-none transform translate-x-2 translate-y-2 hidden sm:block" />

              <div className="relative overflow-hidden rounded-xs bg-[#E8DFD2] shadow-sm">
                <img
                  src={COURTYARD_IMAGE}
                  alt="The Wina Guest House lush tropical courtyard in Canggu Bali"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center hover:scale-102 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <div className="text-xs uppercase tracking-widest text-[#E8DFD2]">The Courtyard Grounds</div>
                  <div className="font-heading text-lg font-normal">A quiet morning haven filled with tropical greenery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
