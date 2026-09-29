import { Article, BookingFormData, SiteSettings } from '../types';

export function updatePageSEO(title: string, description: string, canonicalPath: string = '') {
  document.title = title;

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Open Graph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  // Open Graph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  // Twitter Title
  let twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);

  // Twitter Description
  let twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://thewinaguesthouse.com';
    canonical.setAttribute('href', `${origin}${canonicalPath}`);
  }
}

export function injectLodgingSchema(settings: SiteSettings) {
  const schemaId = 'schema-lodging-business';
  let existingScript = document.getElementById(schemaId);
  if (!existingScript) {
    existingScript = document.createElement('script');
    existingScript.id = schemaId;
    existingScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(existingScript);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: settings.brandName,
    description:
      'Luxury boutique guest house in Canggu, Bali. Located on Jalan Pantai Batu Bolong, offering air-conditioned rooms, hot showers, high-speed Wi-Fi, shared kitchen, and serene courtyard gardens.',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://thewinaguesthouse.com',
    telephone: settings.whatsappNumber,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Pantai Batu Bolong No. 20 D',
      addressLocality: 'Canggu, Kuta Utara',
      addressRegion: 'Badung, Bali',
      postalCode: '80361',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -8.6539,
      longitude: 115.1302,
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Hot & Cold Shower', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'High-Speed Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Car & Motorcycle Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Shared Kitchen', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Room Cleaning Service', value: true },
    ],
    priceRange: '$$',
    image: ['/src/assets/images/hero_wina_guesthouse_1790656768678.jpg'],
  };

  existingScript.textContent = JSON.stringify(structuredData);
}

export function injectArticleSchema(article: Article, settings: SiteSettings) {
  const schemaId = 'schema-article-structured-data';
  let existingScript = document.getElementById(schemaId);
  if (!existingScript) {
    existingScript = document.createElement('script');
    existingScript.id = schemaId;
    existingScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(existingScript);
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://thewinaguesthouse.com';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.seoTitle || article.title,
    description: article.metaDescription,
    image: [article.featuredImage.startsWith('http') ? article.featuredImage : `${origin}${article.featuredImage}`],
    datePublished: article.datePublished,
    dateModified: article.dateUpdated || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || settings.brandName,
      url: origin,
    },
    publisher: {
      '@type': 'Organization',
      name: settings.brandName,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/src/assets/images/hero_wina_guesthouse_1790656768678.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${origin}/blog/${article.slug}`,
    },
  };

  existingScript.textContent = JSON.stringify(structuredData);
}

export function removeArticleSchema() {
  const existingScript = document.getElementById('schema-article-structured-data');
  if (existingScript) {
    existingScript.remove();
  }
}

export function buildWhatsAppReservationUrl(booking: BookingFormData, settings: SiteSettings): string {
  // Clean phone number (strip spaces, dashes, plus)
  let cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '62' + cleanNumber.substring(1);
  }

  const message = [
    `*RESERVATION INQUIRY – THE WINA GUEST HOUSE*`,
    `Hello The Wina Guest House team, I would like to inquire about room availability.`,
    ``,
    `*Guest Details:*`,
    `• Name: ${booking.guestName || 'Not specified'}`,
    `• Phone / Email: ${booking.phone || booking.email || 'Direct WhatsApp contact'}`,
    `• Room Type: ${booking.roomType}`,
    `• Check-in Date: ${booking.checkInDate}`,
    `• Check-out Date: ${booking.checkOutDate}`,
    `• Number of Guests: ${booking.guestsCount} Guest(s)`,
    booking.specialRequests ? `• Special Requests / Notes: ${booking.specialRequests}` : '',
    ``,
    `Could you please confirm current availability and nightly rates for these dates? Thank you!`,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
