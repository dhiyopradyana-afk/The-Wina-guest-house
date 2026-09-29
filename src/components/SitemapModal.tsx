import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, CheckCircle } from 'lucide-react';
import { Article } from '../types';

interface SitemapModalProps {
  isOpen: boolean;
  articles: Article[];
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, articles, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots'>('sitemap');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://thewinaguesthouse.com';
  const today = new Date().toISOString().split('T')[0];

  // Generate XML Sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Landing Pages -->
  <url>
    <loc>${origin}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/#rooms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${origin}/#about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/#facilities</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/#location</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Published SEO Journal Articles -->
${articles
  .filter((a) => a.status === 'published')
  .map(
    (a) => `  <url>
    <loc>${origin}/blog/${a.slug}</loc>
    <lastmod>${a.dateUpdated || a.datePublished}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /
Allow: /blog
Allow: /blog/*

# Sitemaps
Sitemap: ${origin}/sitemap.xml
`;

  const currentContent = activeTab === 'sitemap' ? sitemapXml : robotsTxt;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const filename = activeTab === 'sitemap' ? 'sitemap.xml' : 'robots.txt';
    const blob = new Blob([currentContent], {
      type: activeTab === 'sitemap' ? 'application/xml' : 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-[#F8F6F1] rounded-xs shadow-2xl border border-[#E8DFD2] overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#243B32] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#C6A66B]" />
            <h3 className="font-heading text-xl font-normal text-[#F8F6F1]">
              Search Engine Indexing Files
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 border-b border-[#E8DFD2] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('sitemap')}
              className={`px-4 py-2 text-xs font-semibold rounded-t-xs border-b-2 transition-colors cursor-pointer ${
                activeTab === 'sitemap'
                  ? 'border-[#243B32] text-[#243B32] bg-[#F8F6F1]'
                  : 'border-transparent text-[#6B7280] hover:text-[#242424]'
              }`}
            >
              sitemap.xml ({articles.filter((a) => a.status === 'published').length + 6} URLs)
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`px-4 py-2 text-xs font-semibold rounded-t-xs border-b-2 transition-colors cursor-pointer ${
                activeTab === 'robots'
                  ? 'border-[#243B32] text-[#243B32] bg-[#F8F6F1]'
                  : 'border-transparent text-[#6B7280] hover:text-[#242424]'
              }`}
            >
              robots.txt
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs text-[#242424] bg-white hover:bg-[#E8DFD2]/50 border border-[#E8DFD2] rounded-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#6B7280]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#243B32] hover:bg-[#192A23] rounded-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Content Box */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#242424] text-[#E8DFD2] font-mono text-xs leading-relaxed select-all">
          <pre>{currentContent}</pre>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-white border-t border-[#E8DFD2] text-xs text-[#6B7280] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Ready for Google Search Console submission</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-[#242424] border border-[#E8DFD2] rounded-xs hover:bg-[#E8DFD2]/40"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
