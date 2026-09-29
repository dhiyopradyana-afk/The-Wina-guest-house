import React, { useState, useEffect } from 'react';
import { Article, Room, SiteSettings } from './types';
import { INITIAL_FACILITIES, INITIAL_ROOMS } from './data/initialData';
import { getStoredArticles, getStoredSettings, saveStoredArticles, saveStoredSettings } from './utils/storage';
import { updatePageSEO, injectLodgingSchema } from './utils/seo';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Rooms } from './components/Rooms';
import { Facilities } from './components/Facilities';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { BookingCTA } from './components/BookingCTA';
import { BookingModal } from './components/BookingModal';
import { BlogHome } from './components/BlogHome';
import { BlogArticle } from './components/BlogArticle';
import { AdminDashboard } from './components/AdminDashboard';
import { SitemapModal } from './components/SitemapModal';
import { Footer } from './components/Footer';

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(getStoredSettings());
  const [currentView, setCurrentView] = useState<'home' | 'blog' | 'blog-article'>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  // Modals
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<string | undefined>(undefined);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);

  // Load articles from storage on mount
  useEffect(() => {
    const loaded = getStoredArticles();
    setArticles(loaded);
    const loadedSettings = getStoredSettings();
    setSettings(loadedSettings);

    // Inject LodgingBusiness JSON-LD schema
    injectLodgingSchema(loadedSettings);

    // Check URL path on initial load (e.g. /blog or /blog/slug)
    const pathname = window.location.pathname;
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
      if (slug) {
        setSelectedArticleSlug(slug);
        setCurrentView('blog-article');
      } else {
        setCurrentView('blog');
      }
    } else if (pathname === '/blog') {
      setCurrentView('blog');
    }
  }, []);

  // Sync browser history & SEO metadata when view changes
  useEffect(() => {
    if (currentView === 'home') {
      updatePageSEO(
        'The Wina Guest House – Luxury Boutique Accommodation in Canggu, Bali',
        'Luxury boutique accommodation in Canggu, Bali with direct WhatsApp reservations, rooms, facilities, and Canggu SEO travel guides.',
        '/'
      );
      if (window.location.pathname.startsWith('/blog')) {
        window.history.pushState({}, '', '/');
      }
    } else if (currentView === 'blog') {
      updatePageSEO(
        'The Wina Journal – Canggu Travel Guide & Bali Accommodation Tips',
        'Discover Canggu, explore Bali, and find your perfect guest house stay. Expert travel advice, cafe guides, surf spots, and accommodation tips.',
        '/blog'
      );
      if (window.location.pathname !== '/blog') {
        window.history.pushState({}, '', '/blog');
      }
    } else if (currentView === 'blog-article' && selectedArticleSlug) {
      const art = articles.find((a) => a.slug === selectedArticleSlug);
      if (art) {
        updatePageSEO(
          art.seoTitle || art.title,
          art.metaDescription,
          `/blog/${art.slug}`
        );
        if (window.location.pathname !== `/blog/${art.slug}`) {
          window.history.pushState({}, '', `/blog/${art.slug}`);
        }
      }
    }
  }, [currentView, selectedArticleSlug, articles]);

  // Handle popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '');
        setSelectedArticleSlug(slug);
        setCurrentView('blog-article');
      } else if (path === '/blog') {
        setCurrentView('blog');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: string, articleSlug?: string) => {
    if (view === 'blog') {
      setCurrentView('blog');
      setSelectedArticleSlug(null);
    } else if (view === 'blog-article' && articleSlug) {
      setSelectedArticleSlug(articleSlug);
      setCurrentView('blog-article');
    } else {
      setCurrentView('home');
    }
  };

  const handleSelectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setCurrentView('blog-article');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Increment article view count silently
    setArticles((prev) => {
      const updated = prev.map((a) => (a.slug === slug ? { ...a, views: a.views + 1 } : a));
      saveStoredArticles(updated);
      return updated;
    });
  };

  const handleNavigateInternal = (href: string) => {
    if (href.startsWith('/rooms') || href === '#rooms') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('rooms');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (href.startsWith('/location') || href === '#location') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('location');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (href.startsWith('/about') || href === '#about') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (href.startsWith('/facilities') || href === '#facilities') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('facilities');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (href.startsWith('/blog/')) {
      const slug = href.replace('/blog/', '');
      handleSelectArticle(slug);
    } else if (href === '/blog') {
      setCurrentView('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (roomType?: string) => {
    setSelectedRoomForBooking(roomType);
    setBookingModalOpen(true);
  };

  const handleSaveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    saveStoredArticles(newArticles);
  };

  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
    injectLodgingSchema(newSettings);
  };

  const currentArticle = articles.find((a) => a.slug === selectedArticleSlug);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#242424]">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setAdminModalOpen(true)}
        settings={settings}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onExploreRooms={() => {
                const el = document.getElementById('rooms');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onBookStay={() => handleOpenBooking()}
            />
            <About />
            <Rooms rooms={INITIAL_ROOMS} onOpenBooking={handleOpenBooking} />
            <Facilities facilities={INITIAL_FACILITIES} />
            <Gallery />
            <Location settings={settings} />
            <BookingCTA onOpenBooking={() => handleOpenBooking()} settings={settings} />
          </>
        )}

        {currentView === 'blog' && (
          <BlogHome
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onOpenBooking={() => handleOpenBooking()}
            settings={settings}
          />
        )}

        {currentView === 'blog-article' && currentArticle && (
          <BlogArticle
            article={currentArticle}
            allArticles={articles}
            onBackToBlog={() => {
              setCurrentView('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectArticle={handleSelectArticle}
            onOpenBooking={() => handleOpenBooking()}
            onNavigateInternal={handleNavigateInternal}
            settings={settings}
          />
        )}

        {currentView === 'blog-article' && !currentArticle && (
          <div className="pt-32 pb-24 text-center px-4 max-w-md mx-auto space-y-4">
            <h2 className="font-heading text-3xl font-semibold">Article Not Found</h2>
            <p className="text-sm text-[#6B7280]">
              The requested article may have been moved or is currently in draft status.
            </p>
            <button
              onClick={() => setCurrentView('blog')}
              className="px-6 py-2.5 text-xs font-semibold uppercase text-white bg-[#243B32] rounded-xs"
            >
              Return to Journal
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenSitemap={() => setSitemapModalOpen(true)}
      />

      {/* Direct WhatsApp Reservation Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        initialRoomType={selectedRoomForBooking}
        rooms={INITIAL_ROOMS}
        settings={settings}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Admin CMS Portal */}
      {adminModalOpen && (
        <AdminDashboard
          articles={articles}
          settings={settings}
          onSaveArticles={handleSaveArticles}
          onSaveSettings={handleSaveSettings}
          onClose={() => setAdminModalOpen(false)}
          onPreviewArticle={(slug) => {
            setAdminModalOpen(false);
            handleSelectArticle(slug);
          }}
        />
      )}

      {/* XML Sitemap & Robots.txt Modal */}
      <SitemapModal
        isOpen={sitemapModalOpen}
        articles={articles}
        onClose={() => setSitemapModalOpen(false)}
      />
    </div>
  );
}
