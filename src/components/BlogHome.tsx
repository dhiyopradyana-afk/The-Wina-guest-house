import React, { useState, useMemo } from 'react';
import { Search, Clock, Calendar, ArrowRight, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { Article, ArticleCategory, SiteSettings } from '../types';

interface BlogHomeProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  onOpenBooking: () => void;
  settings: SiteSettings;
}

const CATEGORIES: ArticleCategory[] = [
  'Canggu Travel Guide',
  'Bali Travel Tips',
  'Accommodation Guide',
  'Things to Do in Canggu',
  'Local Experiences',
];

export const BlogHome: React.FC<BlogHomeProps> = ({
  articles,
  onSelectArticle,
  onOpenBooking,
  settings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Filter only published articles for public view
  const publishedArticles = useMemo(() => {
    return articles.filter((a) => a.status === 'published');
  }, [articles]);

  // Featured article is the first published article
  const featuredArticle = publishedArticles[0];

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [publishedArticles, selectedCategory, searchQuery]);

  // Popular articles (sorted by views)
  const popularArticles = useMemo(() => {
    return [...publishedArticles].sort((a, b) => b.views - a.views).slice(0, 4);
  }, [publishedArticles]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F1] min-h-screen">
      {/* Blog Magazine Header */}
      <section className="border-b border-[#E8DFD2] py-14 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C6A66B]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial Travel Journal</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-[#242424] tracking-tight">
            The Wina Journal
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto font-light leading-relaxed">
            Discover Canggu, Explore Bali, and Find Your Perfect Stay.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search articles by keyword or topic..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#242424]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Filter Tabs - Interactive controls per Section 1.A */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-[#E8DFD2]">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#243B32] text-white shadow-xs'
                : 'bg-white text-[#242424] hover:bg-[#E8DFD2]/60 border border-[#E8DFD2]'
            }`}
          >
            All Stories ({publishedArticles.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#243B32] text-white shadow-xs'
                  : 'bg-white text-[#242424] hover:bg-[#E8DFD2]/60 border border-[#E8DFD2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article Hero (Shown on page 1 when no search active) */}
        {!searchQuery && selectedCategory === 'All' && currentPage === 1 && featuredArticle && (
          <div className="my-10">
            <div
              onClick={() => onSelectArticle(featuredArticle.slug)}
              className="bg-white border border-[#E8DFD2] rounded-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer group hover:shadow-lg transition-all duration-300"
            >
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#E8DFD2]">
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#243B32] text-white text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-xs flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Featured Journal</span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Clean unboxed metadata separator */}
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <span className="font-semibold text-[#243B32]">
                      {featuredArticle.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C6A66B]" />
                      {featuredArticle.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#242424] group-hover:text-[#243B32] transition-colors leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DFD2] flex items-center justify-between">
                  <div className="text-xs text-[#6B7280]">
                    By {featuredArticle.author} · {featuredArticle.datePublished}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#243B32] group-hover:text-[#C6A66B] transition-colors">
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Layout: Articles Grid + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          {/* Main Articles List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl font-semibold text-[#242424]">
                {selectedCategory === 'All' ? 'Latest Publications' : selectedCategory}
              </h3>
              <span className="text-xs text-[#6B7280]">
                Showing {filteredArticles.length} article(s)
              </span>
            </div>

            {paginatedArticles.length === 0 ? (
              <div className="p-12 text-center bg-white border border-[#E8DFD2] rounded-xs space-y-3">
                <p className="text-base text-[#242424] font-medium">No articles found</p>
                <p className="text-xs text-[#6B7280]">
                  Try adjusting your search query or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold uppercase text-white bg-[#243B32] rounded-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {paginatedArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => onSelectArticle(article.slug)}
                    className="bg-white border border-[#E8DFD2] rounded-xs overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#E8DFD2]">
                      <img
                        src={article.featuredImage}
                        alt={article.imageAlt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Clean unboxed metadata separator */}
                        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                          <span className="font-medium text-[#243B32]">{article.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{article.readingTimeMinutes} min</span>
                        </div>

                        <h4 className="font-heading text-xl font-semibold text-[#242424] group-hover:text-[#243B32] transition-colors line-clamp-2">
                          {article.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E8DFD2]/60 flex items-center justify-between text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#C6A66B]" />
                          {article.datePublished}
                        </span>
                        <span className="font-semibold text-[#243B32] group-hover:text-[#C6A66B] flex items-center gap-1">
                          Read More <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 text-xs font-semibold border border-[#E8DFD2] rounded-xs disabled:opacity-40 bg-white hover:bg-[#E8DFD2]/40 cursor-pointer"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentPage(idx + 1);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                      currentPage === idx + 1
                        ? 'bg-[#243B32] text-white shadow-xs'
                        : 'bg-white text-[#242424] border border-[#E8DFD2] hover:bg-[#E8DFD2]/40'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 text-xs font-semibold border border-[#E8DFD2] rounded-xs disabled:opacity-40 bg-white hover:bg-[#E8DFD2]/40 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Direct Reservation Widget */}
            <div className="p-6 bg-[#243B32] text-white rounded-xs space-y-4">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#C6A66B]">
                Canggu Boutique Stay
              </div>
              <h4 className="font-heading text-2xl font-normal text-[#F8F6F1]">
                Stay with Us on Batu Bolong
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Enjoy air-conditioned comfort, tranquil garden courtyards, and warm Balinese hospitality right in the heart of Canggu.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full font-action py-3 text-xs font-bold tracking-widest uppercase text-[#242424] bg-[#C6A66B] hover:bg-[#A9894F] rounded-xs transition-colors cursor-pointer shadow-xs"
              >
                Inquire on WhatsApp
              </button>
            </div>

            {/* Popular Articles List */}
            <div className="p-6 bg-white border border-[#E8DFD2] rounded-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#243B32] border-b border-[#E8DFD2] pb-3">
                <TrendingUp className="w-4 h-4 text-[#C6A66B]" />
                <span>Most Read Stories</span>
              </div>

              <div className="space-y-4 divide-y divide-[#E8DFD2]/60">
                {popularArticles.map((pop, idx) => (
                  <div
                    key={pop.id}
                    onClick={() => onSelectArticle(pop.slug)}
                    className="pt-3 first:pt-0 cursor-pointer group"
                  >
                    <div className="text-[11px] text-[#6B7280]">0{idx + 1}. {pop.category}</div>
                    <h5 className="font-heading text-base font-semibold text-[#242424] group-hover:text-[#243B32] transition-colors leading-snug">
                      {pop.title}
                    </h5>
                    <div className="text-[11px] text-[#6B7280] mt-1">
                      {pop.readingTimeMinutes} min read · {pop.views} reads
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Topics */}
            <div className="p-6 bg-white border border-[#E8DFD2] rounded-xs space-y-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-[#243B32]">
                Explore Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Batu Bolong',
                  'Canggu Surfing',
                  'Guest House Bali',
                  'Affordable Stays',
                  'Bali Cafes',
                  'Budget Travel',
                  'Dry Season Bali',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      setCurrentPage(1);
                    }}
                    className="px-2.5 py-1 text-xs text-[#242424] bg-[#F8F6F1] hover:bg-[#E8DFD2] border border-[#E8DFD2] rounded-xs transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
