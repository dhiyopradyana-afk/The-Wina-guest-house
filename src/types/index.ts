export interface Room {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bedType: string;
  maxGuests: number;
  sizeM2: number;
  image: string;
  priceEstimate?: string;
  amenities: string[];
  features: string[];
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export type ArticleStatus = 'published' | 'draft' | 'scheduled';

export type ArticleCategory =
  | 'Canggu Travel Guide'
  | 'Bali Travel Tips'
  | 'Accommodation Guide'
  | 'Things to Do in Canggu'
  | 'Local Experiences';

export interface Article {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  category: ArticleCategory;
  excerpt: string;
  content: string; // Markdown or rich HTML-friendly text
  featuredImage: string;
  imageAlt: string;
  author: string;
  datePublished: string;
  dateUpdated: string;
  status: ArticleStatus;
  scheduledDate?: string;
  views: number;
  readingTimeMinutes: number;
  internalLinks: Array<{ label: string; href: string }>;
  tags: string[];
}

export interface SiteSettings {
  brandName: string;
  whatsappNumber: string;
  instagramHandle: string;
  address: string;
  city: string;
  country: string;
  email: string;
  googleAnalyticsId: string;
  googleSearchConsoleTag: string;
  adminPin: string;
}

export interface BookingFormData {
  guestName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  guestsCount: number;
  specialRequests: string;
}
