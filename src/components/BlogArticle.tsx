import React, { useMemo, useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Bookmark,
  MessageCircle,
  ChevronRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { Article, SiteSettings } from '../types';
import { updatePageSEO, injectArticleSchema, removeArticleSchema } from '../utils/seo';

interface BlogArticleProps {
  article: Article;
  allArticles: Article[];
  onBackToBlog: () => void;
  onSelectArticle: (slug: string) => void;
  onOpenBooking: () => void;
  onNavigateInternal: (path: string) => void;
  settings: SiteSettings;
}

export const BlogArticle: React.FC<BlogArticleProps> = ({
  article,
  allArticles,
  onBackToBlog,
  onSelectArticle,
  onOpenBooking,
  onNavigateInternal,
  settings,
}) => {
  const [copied, setCopied] = useState(false);

  // Update SEO Title, Meta tags, and Schema on article view
  useEffect(() => {
    updatePageSEO(article.seoTitle || article.title, article.metaDescription, `/blog/${article.slug}`);
    injectArticleSchema(article, settings);

    return () => {
      removeArticleSchema();
    };
  }, [article, settings]);

  // Extract H2 headings for Table of Contents
  const headings = useMemo(() => {
    const regex = /^##\s+(.+)$/gm;
    const matches: Array<{ title: string; id: string }> = [];
    let match;
    while ((match = regex.exec(article.content)) !== null) {
      const cleanTitle = match[1].trim();
      const id = cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      matches.push({ title: cleanTitle, id });
    }
    return matches;
  }, [article.content]);

  // Related articles (same category or latest, excluding current)
  const relatedArticles = useMemo(() => {
    return allArticles
      .filter((a) => a.id !== article.id && a.status === 'published')
      .slice(0, 3);
  }, [allArticles, article.id]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnWhatsApp = () => {
    const text = `${article.title} - Read more: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = `${article.title}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
        window.location.href
      )}`,
      '_blank'
    );
  };

  // Helper to render markdown content with headings, lists, links
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith('# ')) {
        // H1 is already rendered above, render subtitle if needed
        return;
      }

      if (trimmed.startsWith('## ')) {
        const title = trimmed.replace('## ', '');
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        elements.push(
          <h2
            key={idx}
            id={id}
            className="font-heading text-2xl sm:text-3xl font-semibold text-[#242424] mt-10 mb-4 pt-4 border-t border-[#E8DFD2]/60 scroll-mt-28"
          >
            {title}
          </h2>
        );
        return;
      }

      if (trimmed.startsWith('### ')) {
        const title = trimmed.replace('### ', '');
        elements.push(
          <h3
            key={idx}
            className="font-heading text-xl sm:text-2xl font-medium text-[#243B32] mt-6 mb-3"
          >
            {title}
          </h3>
        );
        return;
      }

      if (trimmed.startsWith('---')) {
        elements.push(<hr key={idx} className="my-8 border-[#E8DFD2]" />);
        return;
      }

      if (trimmed.startsWith('- ')) {
        const text = trimmed.replace('- ', '');
        elements.push(
          <li key={idx} className="ml-5 list-disc text-sm sm:text-base text-[#242424]/90 mb-2 leading-relaxed">
            {renderInlineMarkdown(text)}
          </li>
        );
        return;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const text = trimmed.replace(/^\d+\.\s+/, '');
        elements.push(
          <li key={idx} className="ml-5 list-decimal text-sm sm:text-base text-[#242424]/90 mb-2 leading-relaxed">
            {renderInlineMarkdown(text)}
          </li>
        );
        return;
      }

      // Standard paragraph
      elements.push(
        <p key={idx} className="text-sm sm:text-base text-[#242424]/90 leading-relaxed mb-4">
          {renderInlineMarkdown(trimmed)}
        </p>
      );
    });

    return elements;
  };

  // Helper for inline bold, links, etc.
  const renderInlineMarkdown = (text: string) => {
    // Replace markdown links [label](href)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderBold(text.substring(lastIndex, match.index)));
      }
      const label = match[1];
      const href = match[2];

      parts.push(
        <button
          key={match.index}
          onClick={() => onNavigateInternal(href)}
          className="text-[#243B32] underline decoration-[#C6A66B] font-semibold hover:text-[#C6A66B] transition-colors cursor-pointer inline-block mx-0.5"
        >
          {label}
        </button>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(renderBold(text.substring(lastIndex)));
    }

    return parts;
  };

  const renderBold = (str: string) => {
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const segments: React.ReactNode[] = [];
    let lastIdx = 0;
    let bMatch;

    while ((bMatch = boldRegex.exec(str)) !== null) {
      if (bMatch.index > lastIdx) {
        segments.push(str.substring(lastIdx, bMatch.index));
      }
      segments.push(
        <strong key={bMatch.index} className="font-semibold text-[#242424]">
          {bMatch[1]}
        </strong>
      );
      lastIdx = boldRegex.lastIndex;
    }

    if (lastIdx < str.length) {
      segments.push(str.substring(lastIdx));
    }

    return segments;
  };

  return (
    <article className="pt-24 pb-20 bg-[#F8F6F1] min-h-screen">
      {/* Breadcrumb Navigation per On-Page SEO Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-[#6B7280] overflow-x-auto whitespace-nowrap"
        >
          <button
            onClick={() => onNavigateInternal('home')}
            className="hover:text-[#243B32] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#E8DFD2]" />
          <button
            onClick={onBackToBlog}
            className="hover:text-[#243B32] transition-colors"
          >
            The Wina Journal
          </button>
          <ChevronRight className="w-3 h-3 text-[#E8DFD2]" />
          <span className="text-[#243B32] font-medium truncate max-w-xs sm:max-w-sm">
            {article.category}
          </span>
        </nav>
      </div>

      {/* Article Header Container */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 space-y-6">
        <button
          onClick={onBackToBlog}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#243B32] hover:text-[#C6A66B] transition-colors mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </button>

        {/* Clean unboxed metadata separator */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7280]">
          <span className="font-semibold text-[#243B32]">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>Target: {article.primaryKeyword}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#C6A66B]" />
            {article.readingTimeMinutes} min read
          </span>
        </div>

        {/* SEO Article H1 */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-normal text-[#242424] leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-base sm:text-lg text-[#6B7280] font-light leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author & Date Bar */}
        <div className="py-4 border-y border-[#E8DFD2] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#243B32] text-white flex items-center justify-center font-heading text-sm font-semibold">
              W
            </div>
            <div>
              <div className="font-medium text-[#242424]">{article.author}</div>
              <div>
                Published: {article.datePublished} · Updated: {article.dateUpdated}
              </div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={shareOnWhatsApp}
              className="p-2 bg-white hover:bg-emerald-50 text-emerald-700 border border-[#E8DFD2] rounded-xs transition-colors cursor-pointer"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={shareOnTwitter}
              className="p-2 bg-white hover:bg-sky-50 text-sky-700 border border-[#E8DFD2] rounded-xs transition-colors cursor-pointer"
              title="Share on X"
              aria-label="Share on X"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 bg-white hover:bg-[#E8DFD2]/60 text-[#242424] border border-[#E8DFD2] rounded-xs transition-colors cursor-pointer flex items-center gap-1"
              title="Copy Link"
              aria-label="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="overflow-hidden rounded-xs bg-[#E8DFD2] border border-[#E8DFD2] shadow-sm max-h-[500px]">
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="mt-2 text-center text-xs text-[#6B7280] italic">
          {article.imageAlt}
        </div>
      </div>

      {/* Article Content & Table of Contents Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Automatic Table of Contents */}
          {headings.length > 0 && (
            <div className="lg:col-span-12">
              <div className="p-5 bg-white border border-[#E8DFD2] rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#243B32]">
                  <BookOpen className="w-4 h-4 text-[#C6A66B]" />
                  <span>Table of Contents</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {headings.map((h, i) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="text-[#6B7280] hover:text-[#243B32] transition-colors truncate"
                    >
                      {i + 1}. {h.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Body Prose */}
          <div className="lg:col-span-12 font-sans text-base leading-relaxed text-[#242424]">
            {renderFormattedContent(article.content)}
          </div>
        </div>

        {/* Internal Link Quick Reassurance */}
        {article.internalLinks && article.internalLinks.length > 0 && (
          <div className="mt-12 p-6 bg-white border border-[#E8DFD2] rounded-xs space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#243B32]">
              Explore The Wina Guest House:
            </h4>
            <div className="flex flex-wrap gap-3">
              {article.internalLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigateInternal(link.href)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-[#242424] bg-[#F8F6F1] hover:bg-[#E8DFD2] border border-[#E8DFD2] rounded-xs transition-colors cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-3 h-3 text-[#C6A66B]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mandatory Article Reservation CTA per prompt Section 3 */}
        <div className="mt-14 p-8 bg-[#243B32] text-white rounded-xs text-center space-y-4 shadow-md">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-[#C6A66B]">
            Planning Your Stay in Canggu?
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-normal text-[#F8F6F1]">
            Experience The Wina Guest House
          </h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Discover the comfort of The Wina Guest House and contact us directly for room availability.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="font-action inline-flex items-center gap-2 px-8 py-3 text-xs font-bold tracking-widest uppercase text-[#242424] bg-[#C6A66B] hover:bg-[#A9894F] rounded-xs transition-colors cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              Book Your Stay
            </button>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#E8DFD2] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#242424]">
                Related Stories from Canggu
              </h3>
              <button
                onClick={onBackToBlog}
                className="text-xs font-semibold uppercase text-[#243B32] hover:text-[#C6A66B] transition-colors"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectArticle(rel.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E8DFD2] rounded-xs overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="h-40 overflow-hidden bg-[#E8DFD2]">
                    <img
                      src={rel.featuredImage}
                      alt={rel.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div className="text-[11px] text-[#243B32] font-semibold">{rel.category}</div>
                    <h4 className="font-heading text-lg font-semibold text-[#242424] group-hover:text-[#243B32] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <div className="text-xs text-[#6B7280] pt-2 border-t border-[#E8DFD2]/60">
                      {rel.readingTimeMinutes} min read
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
