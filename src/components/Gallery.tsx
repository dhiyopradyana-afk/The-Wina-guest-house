import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  HERO_IMAGE,
  ROOM_KING_IMAGE,
  ROOM_QUEEN_IMAGE,
  COURTYARD_IMAGE,
  CANGGU_COAST_IMAGE,
} from '../data/initialData';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
}

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'The Wina Guest House Courtyard & Grounds',
      category: 'Courtyard',
      image: COURTYARD_IMAGE,
      aspect: 'col-span-1 md:col-span-2 row-span-2 h-[420px]',
    },
    {
      id: 'g2',
      title: 'Deluxe King Room Bedroom & Natural Woodwork',
      category: 'Rooms',
      image: ROOM_KING_IMAGE,
      aspect: 'col-span-1 h-[240px]',
    },
    {
      id: 'g3',
      title: 'Superior Queen Terrace Room Sanctuary',
      category: 'Rooms',
      image: ROOM_QUEEN_IMAGE,
      aspect: 'col-span-1 h-[240px]',
    },
    {
      id: 'g4',
      title: 'Tropical Guest House Architecture & Limestone',
      category: 'Architecture',
      image: HERO_IMAGE,
      aspect: 'col-span-1 md:col-span-2 h-[260px]',
    },
    {
      id: 'g5',
      title: 'Batu Bolong Beach Sunset Just Moments Away',
      category: 'Surroundings',
      image: CANGGU_COAST_IMAGE,
      aspect: 'col-span-1 h-[260px]',
    },
  ];

  const categories = ['All', 'Rooms', 'Courtyard', 'Architecture', 'Surroundings'];

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(
      activeLightboxIndex === 0 ? filteredItems.length - 1 : activeLightboxIndex - 1
    );
  };

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(
      activeLightboxIndex === filteredItems.length - 1 ? 0 : activeLightboxIndex + 1
    );
  };

  return (
    <section id="gallery" className="py-24 bg-[#E8DFD2]/25 border-b border-[#E8DFD2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
            Visual Journal
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[#242424]">
            An Editorial Glimpse into The Wina
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
            Sunlit mornings, quiet terrazzo spaces, and lush Balinese flora. Experience the subtle serenity awaiting you.
          </p>
        </div>

        {/* Category Filter Tabs - Interactive controls allowed per Section 1.A */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-xs transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#243B32] text-white shadow-xs'
                  : 'bg-white text-[#242424] hover:bg-[#E8DFD2]/60 border border-[#E8DFD2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className={`relative overflow-hidden rounded-xs bg-[#E8DFD2] group cursor-pointer border border-[#E8DFD2] ${item.aspect}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 text-white">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="text-[10px] tracking-widest uppercase text-[#C6A66B]">
                      {item.category}
                    </div>
                    <div className="font-heading text-lg font-medium">{item.title}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xs">
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xs shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white">
              <div className="text-xs uppercase tracking-widest text-[#C6A66B]">
                {filteredItems[activeLightboxIndex].category}
              </div>
              <h4 className="font-heading text-xl font-normal mt-0.5">
                {filteredItems[activeLightboxIndex].title}
              </h4>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
