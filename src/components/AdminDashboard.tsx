import React, { useState } from 'react';
import {
  Lock,
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  Eye,
  Download,
  Upload,
  Globe,
  Tag,
  Key,
} from 'lucide-react';
import { Article, ArticleCategory, ArticleStatus, SiteSettings } from '../types';

interface AdminDashboardProps {
  articles: Article[];
  settings: SiteSettings;
  onSaveArticles: (articles: Article[]) => void;
  onSaveSettings: (settings: SiteSettings) => void;
  onClose: () => void;
  onPreviewArticle: (slug: string) => void;
}

const CATEGORIES: ArticleCategory[] = [
  'Canggu Travel Guide',
  'Bali Travel Tips',
  'Accommodation Guide',
  'Things to Do in Canggu',
  'Local Experiences',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  articles,
  settings,
  onSaveArticles,
  onSaveSettings,
  onClose,
  onPreviewArticle,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'articles' | 'editor' | 'settings'>('articles');

  // Editor State
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState<Partial<Article>>({
    title: '',
    slug: '',
    category: 'Canggu Travel Guide',
    excerpt: '',
    content: '',
    featuredImage: '/src/assets/images/hero_wina_guesthouse_1790656768678.jpg',
    imageAlt: '',
    seoTitle: '',
    metaDescription: '',
    primaryKeyword: '',
    author: 'The Wina Editorial Team',
    status: 'published',
    readingTimeMinutes: 5,
    views: 0,
    internalLinks: [{ label: 'Explore Our Rooms', href: '/rooms' }],
    tags: ['Canggu', 'Bali'],
  });

  // Settings State
  const [siteForm, setSiteForm] = useState<SiteSettings>(settings);
  const [notification, setNotification] = useState<string>('');

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === settings.adminPin || enteredPin === 'wina2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Admin PIN. (Default: wina2026)');
    }
  };

  const handleCreateNew = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      slug: '',
      category: 'Canggu Travel Guide',
      excerpt: '',
      content: '## New Section Heading\n\nWrite your engaging article content here...\n\n- Highlight point 1\n- Highlight point 2',
      featuredImage: '/src/assets/images/hero_wina_guesthouse_1790656768678.jpg',
      imageAlt: '',
      seoTitle: '',
      metaDescription: '',
      primaryKeyword: '',
      author: 'The Wina Editorial Team',
      status: 'draft',
      readingTimeMinutes: 4,
      views: 0,
      internalLinks: [{ label: 'Explore Our Rooms', href: '/rooms' }],
      tags: ['Canggu', 'Bali'],
    });
    setActiveTab('editor');
  };

  const handleEdit = (art: Article) => {
    setEditingArticleId(art.id);
    setArticleForm({ ...art });
    setActiveTab('editor');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const updated = articles.filter((a) => a.id !== id);
      onSaveArticles(updated);
      triggerNotification('Article deleted successfully.');
    }
  };

  const handleSaveArticle = (statusOverride?: ArticleStatus) => {
    if (!articleForm.title || !articleForm.slug) {
      alert('Please provide both Title and URL Slug.');
      return;
    }

    const finalStatus = statusOverride || (articleForm.status as ArticleStatus) || 'published';
    const now = new Date().toISOString().split('T')[0];

    if (editingArticleId) {
      // Update existing
      const updated = articles.map((a) => {
        if (a.id === editingArticleId) {
          return {
            ...a,
            ...articleForm,
            status: finalStatus,
            dateUpdated: now,
          } as Article;
        }
        return a;
      });
      onSaveArticles(updated);
      triggerNotification('Article updated successfully!');
    } else {
      // Create new
      const newArticle: Article = {
        id: `article-${Date.now()}`,
        slug: articleForm.slug || `article-${Date.now()}`,
        title: articleForm.title || 'Untitled Article',
        seoTitle: articleForm.seoTitle || articleForm.title || '',
        metaDescription: articleForm.metaDescription || articleForm.excerpt || '',
        primaryKeyword: articleForm.primaryKeyword || '',
        category: (articleForm.category as ArticleCategory) || 'Canggu Travel Guide',
        excerpt: articleForm.excerpt || '',
        content: articleForm.content || '',
        featuredImage: articleForm.featuredImage || '/src/assets/images/hero_wina_guesthouse_1790656768678.jpg',
        imageAlt: articleForm.imageAlt || articleForm.title || '',
        author: articleForm.author || 'The Wina Editorial Team',
        datePublished: now,
        dateUpdated: now,
        status: finalStatus,
        views: 1,
        readingTimeMinutes: articleForm.readingTimeMinutes || 5,
        internalLinks: articleForm.internalLinks || [{ label: 'Explore Rooms', href: '/rooms' }],
        tags: articleForm.tags || ['Canggu', 'Bali'],
      };
      onSaveArticles([newArticle, ...articles]);
      triggerNotification('New article published successfully!');
    }

    setActiveTab('articles');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(siteForm);
    triggerNotification('Website settings saved successfully!');
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `the_wina_articles_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onSaveArticles(parsed);
          triggerNotification(`Imported ${parsed.length} articles successfully!`);
        } else {
          alert('Invalid JSON file format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Helper to generate slug from title
  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
        <div className="w-full max-w-md bg-[#F8F6F1] rounded-xs border border-[#E8DFD2] p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#243B32] text-[#C6A66B] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-normal text-[#242424]">
              The Wina Management Portal
            </h3>
            <p className="text-xs text-[#6B7280]">
              Enter your administration security PIN to manage blog articles and reservation configurations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#242424]">
                Admin PIN
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter PIN (Default: wina2026)"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
              />
              {authError && <p className="text-xs text-rose-600 mt-1">{authError}</p>}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 text-xs font-medium text-[#242424] hover:bg-[#E8DFD2]/50 border border-[#E8DFD2] rounded-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 font-action py-2.5 px-4 text-xs font-bold tracking-widest uppercase text-white bg-[#243B32] hover:bg-[#192A23] rounded-xs cursor-pointer shadow-xs"
              >
                Enter Portal
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#F8F6F1] overflow-y-auto flex flex-col">
      {/* Top Admin Navigation */}
      <div className="bg-[#243B32] text-white px-6 py-4 flex items-center justify-between border-b border-[#C6A66B]/30 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C6A66B] text-[#242424] flex items-center justify-center font-heading text-sm font-bold">
            W
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-[#F8F6F1]">
              The Wina Admin CMS
            </h2>
            <span className="text-[11px] text-[#E8DFD2]/70">
              Content & Booking Settings
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'articles'
                ? 'bg-[#C6A66B] text-[#242424]'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Articles ({articles.length})
          </button>
          <button
            onClick={handleCreateNew}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'editor'
                ? 'bg-[#C6A66B] text-[#242424]'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            New Article
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-[#C6A66B] text-[#242424]'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            Settings
          </button>
          <button
            onClick={onClose}
            className="ml-4 px-3.5 py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit Admin
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-[#243B32] text-white px-5 py-3 rounded-xs border border-[#C6A66B] shadow-lg flex items-center gap-2 text-xs">
          <CheckCircle className="w-4 h-4 text-[#C6A66B]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-8">
        {/* Tab 1: Articles List */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#242424]">
                  Manage Journal Articles
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Create, edit, publish, and optimize SEO metadata for all articles.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportData}
                  className="px-3 py-1.5 text-xs font-medium text-[#242424] bg-white border border-[#E8DFD2] rounded-xs hover:bg-[#E8DFD2]/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#6B7280]" />
                  Backup JSON
                </button>
                <label className="px-3 py-1.5 text-xs font-medium text-[#242424] bg-white border border-[#E8DFD2] rounded-xs hover:bg-[#E8DFD2]/40 flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-[#6B7280]" />
                  Import JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={handleCreateNew}
                  className="font-action px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-white bg-[#243B32] hover:bg-[#192A23] rounded-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C6A66B]" />
                  Add Article
                </button>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white border border-[#E8DFD2] rounded-xs overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F6F1] border-b border-[#E8DFD2] text-[#243B32] font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Title & Slug</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Primary Keyword</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Published</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFD2]/60 text-[#242424]">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-[#F8F6F1]/50 transition-colors">
                        <td className="py-3.5 px-4 font-medium max-w-xs">
                          <div className="font-heading text-sm font-semibold truncate text-[#242424]">
                            {art.title}
                          </div>
                          <div className="text-[11px] text-[#6B7280] truncate font-mono">
                            /{art.slug}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#6B7280]">{art.category}</td>
                        <td className="py-3.5 px-4 text-[#243B32] font-mono text-[11px]">
                          {art.primaryKeyword}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xs uppercase tracking-wider ${
                              art.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : art.status === 'scheduled'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {art.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#6B7280] whitespace-nowrap">
                          {art.datePublished}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onPreviewArticle(art.slug)}
                              title="Preview Article"
                              className="p-1.5 text-[#6B7280] hover:text-[#243B32] hover:bg-[#E8DFD2]/50 rounded-xs transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(art)}
                              title="Edit Article"
                              className="p-1.5 text-[#243B32] hover:text-[#C6A66B] hover:bg-[#E8DFD2]/50 rounded-xs transition-colors cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(art.id)}
                              title="Delete Article"
                              className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xs transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Article Editor */}
        {activeTab === 'editor' && (
          <div className="bg-white border border-[#E8DFD2] rounded-xs p-6 sm:p-8 space-y-6 max-w-4xl mx-auto shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8DFD2] pb-4">
              <div>
                <h3 className="font-heading text-2xl font-semibold text-[#242424]">
                  {editingArticleId ? 'Edit Journal Article' : 'Compose New Article'}
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Configure title, category, full markdown text, SEO metadata, and publication status.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  className="px-3.5 py-2 text-xs font-medium text-[#242424] hover:bg-[#E8DFD2]/50 border border-[#E8DFD2] rounded-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveArticle('draft')}
                  className="px-4 py-2 text-xs font-semibold text-[#242424] bg-[#E8DFD2]/60 hover:bg-[#E8DFD2] rounded-xs cursor-pointer"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveArticle('published')}
                  className="font-action px-5 py-2 text-xs font-bold tracking-wider uppercase text-white bg-[#243B32] hover:bg-[#192A23] rounded-xs cursor-pointer shadow-xs"
                >
                  Publish Article
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-[#242424]">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setArticleForm((prev) => ({
                        ...prev,
                        title: newTitle,
                        slug: prev.slug || generateSlug(newTitle),
                        seoTitle: prev.seoTitle || `${newTitle} | The Wina`,
                      }));
                    }}
                    placeholder="e.g. Best Beach Clubs in Canggu"
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-[#242424]">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={articleForm.slug}
                    onChange={(e) =>
                      setArticleForm((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))
                    }
                    placeholder="e.g. best-beach-clubs-canggu"
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] font-mono focus:outline-hidden focus:border-[#C6A66B]"
                  />
                </div>
              </div>

              {/* Category & Primary Keyword */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-[#242424]">
                    Category *
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) =>
                      setArticleForm((prev) => ({
                        ...prev,
                        category: e.target.value as ArticleCategory,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-[#242424]">
                    Primary SEO Target Keyword *
                  </label>
                  <input
                    type="text"
                    value={articleForm.primaryKeyword}
                    onChange={(e) =>
                      setArticleForm((prev) => ({ ...prev, primaryKeyword: e.target.value }))
                    }
                    placeholder="e.g. Where to stay in Canggu"
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
                  />
                </div>
              </div>

              {/* Featured Image & Image Alt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-[#242424]">
                    Featured Image URL *
                  </label>
                  <input
                    type="text"
                    value={articleForm.featuredImage}
                    onChange={(e) =>
                      setArticleForm((prev) => ({ ...prev, featuredImage: e.target.value }))
                    }
                    placeholder="/src/assets/images/hero_wina_guesthouse_1790656768678.jpg"
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] font-mono text-xs focus:outline-hidden focus:border-[#C6A66B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-[#242424]">
                    Image Alt Text (SEO) *
                  </label>
                  <input
                    type="text"
                    value={articleForm.imageAlt}
                    onChange={(e) =>
                      setArticleForm((prev) => ({ ...prev, imageAlt: e.target.value }))
                    }
                    placeholder="Descriptive alt text for image"
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-[#242424]">
                  Short Excerpt / Teaser
                </label>
                <textarea
                  rows={2}
                  value={articleForm.excerpt}
                  onChange={(e) =>
                    setArticleForm((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="A concise summary for article cards and social previews..."
                  className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
                />
              </div>

              {/* Content Markdown */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-[#242424]">
                  Article Markdown Body (Headings ##, ###, bullet points, links)
                </label>
                <textarea
                  rows={14}
                  value={articleForm.content}
                  onChange={(e) =>
                    setArticleForm((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="## Section Title\n\nParagraph text...\n\n- Point 1\n- Point 2"
                  className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] font-mono leading-relaxed focus:outline-hidden focus:border-[#C6A66B]"
                />
              </div>

              {/* SEO Meta Box */}
              <div className="p-5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#243B32]">
                  <Globe className="w-4 h-4 text-[#C6A66B]" />
                  <span>On-Page SEO Configurations</span>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#242424]">
                      Custom SEO Title Tag (50-60 chars)
                    </label>
                    <input
                      type="text"
                      value={articleForm.seoTitle}
                      onChange={(e) =>
                        setArticleForm((prev) => ({ ...prev, seoTitle: e.target.value }))
                      }
                      placeholder="e.g. Where to Stay in Canggu, Bali | The Wina"
                      className="w-full px-3 py-2 bg-white border border-[#E8DFD2] rounded-xs text-xs text-[#242424]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#242424]">
                      Meta Description (120-160 chars)
                    </label>
                    <textarea
                      rows={2}
                      value={articleForm.metaDescription}
                      onChange={(e) =>
                        setArticleForm((prev) => ({ ...prev, metaDescription: e.target.value }))
                      }
                      placeholder="Brief search snippet description..."
                      className="w-full px-3 py-2 bg-white border border-[#E8DFD2] rounded-xs text-xs text-[#242424]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Website Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[#E8DFD2] rounded-xs p-6 sm:p-8 space-y-6 max-w-2xl mx-auto shadow-xs">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-[#242424]">
                Website & Integration Settings
              </h3>
              <p className="text-xs text-[#6B7280]">
                Update your live WhatsApp reservation destination, Instagram, Google Analytics, and Search Console tags.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-[#242424]">
                  WhatsApp Reservation Number *
                </label>
                <input
                  type="text"
                  required
                  value={siteForm.whatsappNumber}
                  onChange={(e) =>
                    setSiteForm({ ...siteForm, whatsappNumber: e.target.value })
                  }
                  placeholder="+62 812 3456 7890"
                  className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
                />
                <p className="text-[11px] text-[#6B7280]">
                  All direct booking inquiries generated from buttons and reservation modals will be routed here.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-[#242424]">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={siteForm.instagramHandle}
                  onChange={(e) =>
                    setSiteForm({ ...siteForm, instagramHandle: e.target.value })
                  }
                  placeholder="the_wina_guesthouse"
                  className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-[#242424]">
                  Verified Street Address
                </label>
                <input
                  type="text"
                  value={siteForm.address}
                  onChange={(e) =>
                    setSiteForm({ ...siteForm, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] focus:outline-hidden focus:border-[#C6A66B]"
                />
              </div>

              {/* GA4 and Search Console */}
              <div className="p-4 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#243B32]">
                  Analytics & Google Verification
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#242424]">
                    Google Analytics 4 Measurement ID
                  </label>
                  <input
                    type="text"
                    value={siteForm.googleAnalyticsId}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, googleAnalyticsId: e.target.value })
                    }
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-3 py-2 bg-white border border-[#E8DFD2] rounded-xs text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#242424]">
                    Google Search Console Verification Tag / Content
                  </label>
                  <input
                    type="text"
                    value={siteForm.googleSearchConsoleTag}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, googleSearchConsoleTag: e.target.value })
                    }
                    placeholder="e.g. google-site-verification code"
                    className="w-full px-3 py-2 bg-white border border-[#E8DFD2] rounded-xs text-xs font-mono"
                  />
                </div>
              </div>

              {/* Admin Security PIN */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase text-[#242424] flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Admin Security PIN</span>
                </label>
                <input
                  type="text"
                  required
                  value={siteForm.adminPin}
                  onChange={(e) => setSiteForm({ ...siteForm, adminPin: e.target.value })}
                  placeholder="wina2026"
                  className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E8DFD2] rounded-xs text-sm text-[#242424] font-mono focus:outline-hidden focus:border-[#C6A66B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full font-action py-3 px-6 text-xs font-bold tracking-widest uppercase text-white bg-[#243B32] hover:bg-[#192A23] rounded-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#C6A66B]" />
                  Save Website Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
