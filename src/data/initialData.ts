import { Article, Facility, Room, SiteSettings } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_wina_guesthouse_1790656768678.jpg';
export const ROOM_KING_IMAGE = '/src/assets/images/room_deluxe_king_1790656783015.jpg';
export const ROOM_QUEEN_IMAGE = '/src/assets/images/room_superior_queen_1790656794847.jpg';
export const COURTYARD_IMAGE = '/src/assets/images/guesthouse_courtyard_1790656806654.jpg';
export const CANGGU_COAST_IMAGE = '/src/assets/images/canggu_batu_bolong_1790656817707.jpg';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: 'The Wina Guest House',
  whatsappNumber: '+6281234567890',
  instagramHandle: 'the_wina_guesthouse',
  address: 'Jl. Pantai Batu Bolong No. 20 D, Canggu, Kuta Utara, Badung, Bali, Indonesia',
  city: 'Canggu, Bali',
  country: 'Indonesia',
  email: 'stay@thewinaguesthouse.com',
  googleAnalyticsId: '',
  googleSearchConsoleTag: '',
  adminPin: 'wina2026',
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'deluxe-king-balcony',
    name: 'Deluxe King Room with Balcony',
    tagline: 'Expansive private sanctuary with breezy garden views',
    description:
      'A thoughtfully crafted bedroom featuring a plush king-size bed, natural oak wood furnishings, and private balcony overlooking lush frangipani greenery. Ideal for couples and digital nomads seeking peaceful seclusion after a day in Canggu.',
    bedType: '1 King Bed',
    maxGuests: 2,
    sizeM2: 28,
    image: ROOM_KING_IMAGE,
    priceEstimate: 'IDR 450,000 – 650,000 / night',
    amenities: [
      'Individually controlled Air Conditioning',
      'Private ensuite with Hot & Cold Rain Shower',
      'High-Speed Fiber Wi-Fi (up to 100 Mbps)',
      'Private Balcony with Outdoor Seating',
      'Daily Room Housekeeping Service',
      'Access to Shared Kitchen & Refrigerator',
      'Dedicated Work Desk & Ergonomic Chair',
      'Free Parking for Car & Scooter',
    ],
    features: ['Balcony View', 'King Bed', 'Rain Shower', 'Work Desk'],
  },
  {
    id: 'superior-queen-terrace',
    name: 'Superior Queen Room with Garden Terrace',
    tagline: 'Quiet ground-floor comfort opening to tropical flora',
    description:
      'Seamlessly blending modern minimalism with warm Balinese touches, this room features direct access to our tranquil courtyard patio. Enjoy serene mornings with fresh coastal breeze, cool terrazzo floors, and ambient warm lighting.',
    bedType: '1 Queen Bed',
    maxGuests: 2,
    sizeM2: 24,
    image: ROOM_QUEEN_IMAGE,
    priceEstimate: 'IDR 380,000 – 550,000 / night',
    amenities: [
      'Whisper-quiet Air Conditioning',
      'Private Ensuite Bathroom with Hot Shower',
      'High-Speed Fiber Wi-Fi',
      'Courtyard Terrace Seating',
      'Daily Room Cleaning',
      'Shared Kitchen with Cooking Utensils',
      'Wardrobe & Clothes Rack',
      'Secure On-Site Parking',
    ],
    features: ['Terrace Access', 'Queen Bed', 'Quiet Courtyard', 'Garden View'],
  },
  {
    id: 'deluxe-twin-room',
    name: 'Deluxe Twin Room',
    tagline: 'Flexible twin arrangement perfect for friends or travel partners',
    description:
      'Designed with spacious dual single beds, premium high-thread-count cotton linen, and ample storage space. A functional, calming retreat located steps from Batu Bolong’s vibrant cafe scene.',
    bedType: '2 Single Beds',
    maxGuests: 2,
    sizeM2: 26,
    image: COURTYARD_IMAGE,
    priceEstimate: 'IDR 400,000 – 580,000 / night',
    amenities: [
      'High-Efficiency Air Conditioning',
      'Ensuite Bathroom with Hot & Cold Water',
      'Fast Wi-Fi Connection',
      'Shared Kitchen Facilities',
      'Daily Cleaning & Fresh Towels',
      'Secure Motorcycle & Car Parking',
      'Bedside Reading Lamps & Outlets',
      'Complimentary Filtered Mineral Water',
    ],
    features: ['Twin Beds', 'High-Speed Wi-Fi', 'Hot Shower', 'Clean Terrazzo'],
  },
];

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'ac',
    name: 'Air Conditioning',
    description: 'Modern, quiet split air-conditioning in every room for crisp, restful sleep after sunny days in Bali.',
    iconName: 'Wind',
  },
  {
    id: 'shower',
    name: 'Hot & Cold Shower',
    description: 'Refreshing water pressure with dedicated water heaters for revitalizing morning and evening showers.',
    iconName: 'Droplets',
  },
  {
    id: 'wifi',
    name: 'High-Speed Wi-Fi',
    description: 'Reliable fiber optic connection throughout rooms and common areas, ideal for remote work and streaming.',
    iconName: 'Wifi',
  },
  {
    id: 'parking',
    name: 'Car & Motorcycle Parking',
    description: 'Secure, gated on-premises parking space for your scooter or car right off Jalan Pantai Batu Bolong.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'kitchen',
    name: 'Shared Kitchen',
    description: 'Equipped with a refrigerator, stovetop, cookware, and complimentary drinking water for quick home meals.',
    iconName: 'UtensilsCrossed',
  },
  {
    id: 'cleaning',
    name: 'Room Cleaning Service',
    description: 'Regular professional housekeeping ensuring clean linens, fresh towels, and spotless living spaces.',
    iconName: 'Sparkles',
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'article-1',
    slug: 'where-to-stay-in-canggu-bali-complete-accommodation-guide',
    title: 'Where to Stay in Canggu, Bali: A Complete Accommodation Guide',
    seoTitle: 'Where to Stay in Canggu, Bali: 2026 Accommodation Guide | The Wina',
    metaDescription:
      'Wondering where to stay in Canggu? Compare Batu Bolong, Echo Beach, and Berawa to find the ideal boutique guest house or villa for your Bali vacation.',
    primaryKeyword: 'Where to stay in Canggu',
    category: 'Accommodation Guide',
    excerpt:
      'From the vibrant surf strip of Batu Bolong to the relaxed cafe enclave of Pererenan, here is your definitive guide to choosing the best neighborhood and guest house in Canggu, Bali.',
    content: `
# Where to Stay in Canggu, Bali: A Complete Accommodation Guide

Canggu has rapidly evolved from a sleepy coastal surfing village into Bali's premier hub for international travelers, digital nomads, and holidaymakers. With world-class surf breaks, an unparalleled culinary landscape, and boutique retreats, selecting **where to stay in Canggu** sets the tone for your entire island holiday.

In this comprehensive guide, we unpack Canggu's key neighborhoods, compare guest house versus villa living, and explain why staying along Jalan Pantai Batu Bolong puts you in the sweet spot of convenience, tranquility, and authentic Balinese hospitality.

---

## 1. Understanding Canggu's Main Neighborhoods

Canggu is not a single street, but a collective coastal district anchored by several distinct avenues running down to the Indian Ocean. Understanding their unique rhythms will help you decide where to stay in Canggu.

### Batu Bolong: The Beating Heart of Canggu
Jalan Pantai Batu Bolong is Canggu's most iconic artery. Stretching from the main intersection straight down to Old Man's and Batu Bolong Beach, it balances energetic cafes, artisan bakeries, and yoga studios with peaceful side alleys.
- **Vibe:** Vibrant yet laid-back; walkable to both sunrise surf and sunset dinners.
- **Best For:** First-time Bali visitors, solo adventurers, and couples who want immediate access to dining and beach access without relying constantly on transport.
- **Recommended Base:** Staying in a quiet laneway off Batu Bolong—such as [The Wina Guest House](/rooms)—gives you total tranquility while keeping the ocean and best cafes within effortless reach.

### Berawa: Trendy, Social, and Beach Club Enclaves
Located to the east of Batu Bolong, Berawa is famous for sprawling lifestyle clubs like Atlas and Finns, as well as an incredible density of specialty coffee roasteries.
- **Vibe:** Cosmopolitan, buzzing, with slightly heavier vehicular traffic.
- **Best For:** Nightlife enthusiasts and travelers keen on luxury beach clubs.

### Echo Beach & Pererenan: Surf Breaks and Scenic Padi Fields
Situated just west of Batu Bolong, Echo Beach is revered by intermediate to advanced surfers for its reef breaks, while neighboring Pererenan retains charming glimpses of traditional rice fields.
- **Vibe:** Relaxed coastal bohemian, surf-centric, and slightly more residential.

---

## 2. Guest House vs. Resort: Why Travelers Choose Boutique Stays

While mega-resorts and secluded luxury villas have their place, the modern boutique guest house has become the preferred choice for discerning travelers. Here is why:

1. **Authentic Hospitality:** Unlike impersonal 300-room hotel chains, boutique guest houses like The Wina provide genuine, attentive Balinese care.
2. **Superior Value:** You enjoy modern amenities—whisper-quiet air conditioning, hot rainfall showers, high-speed fiber Wi-Fi—without paying inflated resort service charges.
3. **Peaceful Community:** A boutique guest house offers private personal sanctuary alongside shared amenities like a shared kitchen, allowing you to connect with fellow global travelers at your own pace.

---

## 3. What to Look for When Choosing Your Accommodation

When evaluating where to stay in Canggu, prioritize these core factors:
- **Location Accessibility:** Ensure your stay is located on or immediately adjacent to a paved access road with dedicated parking for scooters and cars.
- **Verified Wi-Fi Speeds:** If you work remotely or stream video, verify that fiber optic internet is provided across all rooms.
- **Sound Insulation & Peace:** Canggu is lively; staying slightly set back from the main thoroughfare guarantees restful night sleep.
- **Transparent Booking:** Book directly through dedicated communication channels like WhatsApp to confirm room type and availability instantly.

---

## Conclusion: Plan Your Canggu Stay with Confidence

Finding the right accommodation makes all the difference in your Bali journey. By basing yourself near Jalan Pantai Batu Bolong, you enjoy Canggu's best surf, dining, and coastal sunsets at your doorstep.

Take a look at our [available rooms](/rooms) at The Wina Guest House, or explore our [verified location](/location) to start planning your island retreat today.
    `,
    featuredImage: HERO_IMAGE,
    imageAlt: 'Where to stay in Canggu Bali boutique guest house exterior',
    author: 'The Wina Editorial Team',
    datePublished: '2026-03-15',
    dateUpdated: '2026-03-20',
    status: 'published',
    views: 1240,
    readingTimeMinutes: 6,
    internalLinks: [
      { label: 'Explore Our Rooms', href: '/rooms' },
      { label: 'Our Batu Bolong Location', href: '/location' },
      { label: 'About The Wina', href: '/about' },
    ],
    tags: ['Canggu Accommodation', 'Where to Stay', 'Batu Bolong', 'Bali Travel'],
  },
  {
    id: 'article-2',
    slug: '10-things-to-do-in-canggu-bali',
    title: '10 Things to Do in Canggu, Bali',
    seoTitle: '10 Things to Do in Canggu, Bali: Beaches, Surfing & Cafes | The Wina',
    metaDescription:
      'Discover the top 10 things to do in Canggu, Bali. From catching waves at Batu Bolong Beach to exploring artisan markets, yoga studios, and sunset viewpoints.',
    primaryKeyword: 'Things to do in Canggu',
    category: 'Things to Do in Canggu',
    excerpt:
      'Whether you are an avid surfer, wellness enthusiast, or foodie, Canggu offers endless experiences. Here are the top 10 activities you cannot miss on your trip.',
    content: `
# 10 Things to Do in Canggu, Bali

Canggu has captured the imagination of travelers across the globe for good reason. It seamlessly pairs raw surf culture with refined culinary experiences, tropical wellness retreats, and breathtaking Indian Ocean sunsets. 

If you are putting together your Bali itinerary, here are **10 essential things to do in Canggu** that capture the true spirit of this coastal haven.

---

## 1. Catch Your First Wave at Batu Bolong Beach
Batu Bolong Beach is one of Southeast Asia's friendliest surf spots for beginners and longboarders. Gentle rolling waves, soft sandy seafloor sections, and friendly local instructors make it the ideal place to hire a board or book your introductory surf lesson.

## 2. Indulge in Canggu's World-Renowned Cafe Culture
Canggu is an international gastronomic playground. Start your morning with specialty single-origin espresso and organic dragon fruit smoothie bowls at beloved local spots along Jalan Pantai Batu Bolong.

## 3. Experience Sunset Rituals by the Shore
At 5:30 PM, locals, travelers, and expats gather on the volcanic sands of Canggu to watch the sun melt into the ocean. Grab a fresh young coconut or a cold beverage and soak in the golden hour hues.

## 4. Rebalance with Yoga and Holistic Wellness
Canggu hosts renowned yoga shalas offering daily classes in Vinyasa, Yin, sound baths, and breathwork. The open-air wooden architecture surrounded by tropical greenery will leave you renewed.

## 5. Explore Artisan Weekend Markets
Discover handmade jewelry, organic linen apparel, ceramic tableware, and local Balinese crafts at Canggu's weekend markets like Samadi and Love Anchor.

## 6. Rent a Scooter and Explore Pererenan & Tanah Lot
Take a leisurely ride through the quieter lanes of Pererenan towards the sacred sea temple of Pura Tanah Lot, perched dramatically on an offshore rock formation.

## 7. Sample Authentic Balinese Warung Fare
Beyond international fusion dining, savor authentic Indonesian flavors. Order *Nasi Campur* (steamed rice with an assortment of spicy chicken, tempeh, vegetable urap, and sambal matah) at a clean, authentic local warung.

## 8. Unwind in a Peaceful Boutique Guest House
Balance the energetic buzz of Canggu with calm relaxation. Returning to a serene home base like [The Wina Guest House](/about) allows you to recharge in an airy room with air conditioning, quiet courtyard surroundings, and hot showers.

## 9. Stroll Along the Coastal Boardwalks
Walk from Batu Bolong to Echo Beach during low tide. The coastal path offers panoramic seascape views and easy access to oceanfront seafood barbecues.

## 10. Connect with the Creative Nomad Community
Whether working from a local cafe or sharing stories in a guest house shared kitchen, Canggu is celebrated for its warm, open-minded international community.

---

## Make the Most of Your Canggu Stay

Planning your trip? Make sure your home base is centrally located so you spend less time in traffic and more time enjoying the island. [Check availability at The Wina Guest House](/rooms) on Jalan Pantai Batu Bolong.
    `,
    featuredImage: CANGGU_COAST_IMAGE,
    imageAlt: '10 things to do in Canggu Bali surf and beach scenery',
    author: 'The Wina Editorial Team',
    datePublished: '2026-03-10',
    dateUpdated: '2026-03-18',
    status: 'published',
    views: 980,
    readingTimeMinutes: 5,
    internalLinks: [
      { label: 'View Our Guest House Rooms', href: '/rooms' },
      { label: 'Where We Are Located', href: '/location' },
    ],
    tags: ['Things to Do', 'Canggu Guide', 'Batu Bolong', 'Surfing Bali'],
  },
  {
    id: 'article-3',
    slug: 'complete-travel-guide-to-canggu-bali',
    title: 'A Complete Travel Guide to Canggu, Bali',
    seoTitle: 'A Complete Travel Guide to Canggu, Bali (2026 Edition) | The Wina',
    metaDescription:
      'Everything you need to know about traveling to Canggu, Bali: airport transfers, transportation, best areas, dining, safety tips, and boutique accommodations.',
    primaryKeyword: 'Canggu travel guide',
    category: 'Canggu Travel Guide',
    excerpt:
      'Your definitive travel guide to Canggu, Bali. Learn how to get around, what to pack, where to eat, and how to enjoy a safe, memorable stay on the island.',
    content: `
# A Complete Travel Guide to Canggu, Bali

Planning your journey to Bali? Canggu stands out as the island's most dynamic destination—a place where traditional Balinese temple offerings harmonize with contemporary cafe culture, surf breaks, and serene tropical gardens.

This **Canggu travel guide** provides clear, verified advice on transport, weather, neighborhood orientation, and practical tips for an unforgettable holiday.

---

## Getting to Canggu from Ngurah Rai International Airport (DPS)

Canggu is located approximately 18 to 22 kilometers northwest of Bali’s international airport in Denpasar. 
- **Travel Time:** Between 45 to 80 minutes depending on the time of arrival and island traffic.
- **Airport Transfer Tip:** Arrange a direct private driver or airport taxi before arrival. Having your accommodation address written down (e.g., *The Wina Guest House, Jl. Pantai Batu Bolong No. 20 D, Canggu*) ensures a smooth arrival straight to your door.

---

## Transportation in Canggu: How to Get Around

Getting around Canggu is straightforward once you know your options:
1. **Walking:** If you choose accommodation along Jalan Pantai Batu Bolong, dozens of cafes, convenience stores, laundry facilities, and the beach are within easy walking distance.
2. **Scooter Rental:** Scooters are the most popular mode of transport. Always wear a helmet, hold an international driving permit, and drive cautiously.
3. **Ride-Hailing Apps:** Grab and Gojek operate efficiently throughout Canggu for food delivery and car rides.

---

## Weather and When to Visit

Bali enjoys a warm tropical climate year-round with temperatures averaging 27°C to 31°C:
- **Dry Season (April to October):** Sunny skies, lower humidity, and optimal offshore surf winds make this peak season.
- **Wet Season (November to March):** Characterized by warm tropical afternoon downpours that refresh the island, fewer crowds, and lush green landscapes.

---

## Local Etiquette and Cultural Respect

While Canggu is relaxed and international, it remains deeply rooted in Balinese Hindu traditions:
- Step carefully around *Canang Sari* (daily woven palm leaf offerings placed on footpaths and entryways).
- Dress respectfully when visiting temples or administrative village offices.
- Greet locals with a warm smile; Balinese hospitality is world-renowned for its sincerity.

---

## Where to Stay: Your Sanctuary in Canggu

Having a restful, clean, and peaceful base is essential after full days of exploring. [The Wina Guest House](/about) offers boutique accommodations on Jalan Pantai Batu Bolong, complete with air conditioning, hot showers, high-speed Wi-Fi, and a tranquil courtyard.

[Reserve your stay directly via WhatsApp](/rooms) for transparent rates and personal service.
    `,
    featuredImage: COURTYARD_IMAGE,
    imageAlt: 'Complete travel guide to Canggu Bali tropical street and guest house',
    author: 'The Wina Editorial Team',
    datePublished: '2026-03-05',
    dateUpdated: '2026-03-12',
    status: 'published',
    views: 870,
    readingTimeMinutes: 6,
    internalLinks: [
      { label: 'Explore Rooms & Rates', href: '/rooms' },
      { label: 'Location Map & Directions', href: '/location' },
      { label: 'Our Facilities', href: '/facilities' },
    ],
    tags: ['Canggu Travel Guide', 'Bali Essentials', 'Airport Transfer', 'Batu Bolong'],
  },
  {
    id: 'article-4',
    slug: 'how-to-find-affordable-accommodation-in-canggu',
    title: 'How to Find Affordable Accommodation in Canggu',
    seoTitle: 'How to Find Affordable Accommodation in Canggu, Bali | The Wina',
    metaDescription:
      'Learn how to find clean, comfortable, and affordable accommodation in Canggu without compromising on location, air conditioning, Wi-Fi, or safety.',
    primaryKeyword: 'Affordable accommodation in Canggu',
    category: 'Accommodation Guide',
    excerpt:
      'Traveling on a budget doesn’t mean sacrificing comfort. Here is how savvy travelers discover affordable, high-quality guest houses in prime Canggu locations.',
    content: `
# How to Find Affordable Accommodation in Canggu

Canggu has gained a reputation for luxury villas and upscale beach clubs, but it remains one of the best destinations in Bali for cost-conscious travelers who appreciate quality, cleanliness, and thoughtful design.

If you are searching for **affordable accommodation in Canggu**, here are practical insider tips to get the best value without cutting corners on comfort.

---

## 1. Book Directly with Boutique Guest Houses
Online booking platforms often charge high commissions that get passed onto travelers. Booking directly with reputable guest houses via WhatsApp or official websites allows hosts to offer you direct, transparent pricing, flexible terms, and immediate personal communication.

## 2. Check the Non-Negotiable Essentials
Never compromise on your core rest requirements. When evaluating budget and mid-range stays in Canggu, make sure your accommodation includes:
- **Individual Air Conditioning:** Essential for a deep night's sleep in Bali’s tropical climate.
- **Private Ensuite with Hot & Cold Water:** A refreshing hot shower is vital after hours of surfing.
- **High-Speed Fiber Wi-Fi:** Unreliable internet can disrupt remote work and travel planning.
- **Shared Kitchen Access:** Having access to a shared refrigerator and stovetop allows you to store fresh tropical fruit, brew your morning tea, and save on daily expenses.

At [The Wina Guest House](/facilities), all of these essential amenities are standard across every room type.

---

## 3. Location Matters: Calculate Transport Savings
A room that looks slightly cheaper on the map might be located kilometers away down congested shortcut roads, forcing you to spend money on multiple daily taxi rides.

Choosing a guest house on **Jalan Pantai Batu Bolong** means you can walk to convenience stores, pharmacies, local warungs, and the beach—saving you both transport costs and precious holiday time.

---

## 4. Consider Weekly or Extended Stays
If you plan to stay in Canggu for more than a few days, ask about weekly availability. Many boutique guest houses are happy to accommodate extended stays with convenient housekeeping schedules and laundry service nearby.

---

## Ready to Book Your Affordable Canggu Getaway?

Experience the perfect balance of budget-friendly pricing and luxury tropical minimalism at The Wina Guest House. [Explore our rooms](/rooms) and message us directly for current availability.
    `,
    featuredImage: ROOM_QUEEN_IMAGE,
    imageAlt: 'Affordable accommodation in Canggu Bali clean queen bedroom',
    author: 'The Wina Editorial Team',
    datePublished: '2026-02-28',
    dateUpdated: '2026-03-08',
    status: 'published',
    views: 1105,
    readingTimeMinutes: 4,
    internalLinks: [
      { label: 'View Our Room Rates', href: '/rooms' },
      { label: 'Guest House Facilities', href: '/facilities' },
    ],
    tags: ['Affordable Canggu', 'Budget Travel Bali', 'Guest House', 'Batu Bolong'],
  },
  {
    id: 'article-5',
    slug: 'batu-bolong-canggu-everything-you-need-to-know',
    title: 'Batu Bolong, Canggu: Everything You Need to Know',
    seoTitle: 'Batu Bolong, Canggu: Everything You Need to Know | The Wina',
    metaDescription:
      'Your insider guide to Jalan Pantai Batu Bolong in Canggu, Bali. Discover beaches, cafes, shopping, and why staying here offers the ultimate Bali experience.',
    primaryKeyword: 'Batu Bolong Canggu',
    category: 'Canggu Travel Guide',
    excerpt:
      'Jalan Pantai Batu Bolong is the cultural and lifestyle center of Canggu. Here is your complete guide to its beaches, dining spots, atmosphere, and accommodation.',
    content: `
# Batu Bolong, Canggu: Everything You Need to Know

If Canggu is the jewel of southern Bali's coastal lifestyle, **Batu Bolong** is its beating pulse. Named after the historic offshore hollow rock formation (*Batu Bolong* translates literally to 'rock with a hole'), this street has become one of the most celebrated avenues in Southeast Asia.

Whether you are visiting for 48 hours or settling in for a month, here is everything you need to know about the neighborhood.

---

## The Geography of Jalan Pantai Batu Bolong

Jalan Pantai Batu Bolong runs south from the arterial main road directly into the beach. Along its length, you will find:
- **Artisan Cafes & Bakeries:** Renowned pastry chefs and specialty coffee roasters serving organic breakfasts.
- **Boutique Shopping:** Sustainable swimwear, linen fashion, surf gear, and local handicrafts.
- **Wellness & Fitness:** Pilates studios, yoga spaces, and Muay Thai training facilities.
- **Tranquil Residential Enclaves:** Tucked away in quiet side streets just off the main road are peaceful guest houses like **The Wina Guest House** (located at No. 20 D).

---

## Batu Bolong Beach: The Epicenter of Canggu Surf

Batu Bolong Beach features dark volcanic sand, panoramic ocean horizons, and gentle peeling rights and lefts. Unlike steep reef waves elsewhere on the Bukit Peninsula, Batu Bolong offers a forgiving, long-rolling wave that has made it famous among longboard enthusiasts from every continent.

Even if you don't surf, sitting on the beach with a fresh coconut at 5:30 PM as the sky turns brilliant shades of gold and violet is an unforgettable daily ritual.

---

## Dining on Batu Bolong

The culinary spectrum along Batu Bolong is extraordinary:
- **Local Balinese Warungs:** Enjoy freshly cooked *tempe manis*, spicy shredded chicken, and wok-tossed greens for just a few dollars.
- **International Bistros:** Woodfired sourdough pizzas, fresh Mediterranean mezze, and authentic Japanese ramen are all within footsteps.
- **Healthy Plant-Based Options:** Vegan smoothie bowls, cold-pressed juices, and gluten-free pastries are widely available.

---

## Why Stay on Batu Bolong?

Staying in Batu Bolong eliminates the daily stress of navigating island traffic. You can wake up, take an easy morning stroll for coffee, enjoy a midday surf, and return to your peaceful air-conditioned room within minutes.

[The Wina Guest House](/location) provides an authentic, serene sanctuary right in the heart of Batu Bolong. [Contact us on WhatsApp](/rooms) to book your stay.
    `,
    featuredImage: CANGGU_COAST_IMAGE,
    imageAlt: 'Batu Bolong Canggu beach sunset and coastline',
    author: 'The Wina Editorial Team',
    datePublished: '2026-02-20',
    dateUpdated: '2026-03-02',
    status: 'published',
    views: 1450,
    readingTimeMinutes: 5,
    internalLinks: [
      { label: 'Check The Wina Location', href: '/location' },
      { label: 'View Our Accommodations', href: '/rooms' },
      { label: 'About Us', href: '/about' },
    ],
    tags: ['Batu Bolong', 'Canggu Beach', 'Bali Surf', 'Where to Stay'],
  },
  {
    id: 'article-6',
    slug: 'how-to-plan-a-budget-friendly-trip-to-bali',
    title: 'How to Plan a Budget-Friendly Trip to Bali',
    seoTitle: 'How to Plan a Budget-Friendly Trip to Bali in 2026 | The Wina',
    metaDescription:
      'Smart, practical strategies to travel Bali on a budget without sacrificing cleanliness, safety, delicious food, or memorable island experiences.',
    primaryKeyword: 'Budget-friendly Bali trip',
    category: 'Bali Travel Tips',
    excerpt:
      'Planning a trip to Bali on a budget? Here are tested strategies on flights, accommodations, dining, and daily expenses to maximize your travel budget.',
    content: `
# How to Plan a Budget-Friendly Trip to Bali

Bali remains one of the world's most alluring travel destinations because it offers luxury lifestyle experiences at accessible price points. Whether you are a solo backpacker, remote worker, or holidaymaker, crafting a **budget-friendly Bali trip** is completely achievable with mindful planning.

Here is our step-by-step guide to stretching your rupiah further while enjoying maximum comfort.

---

## 1. Choose Value-Driven Boutique Accommodations
Accommodation is typically your largest single expenditure. While private pool villas can run hundreds of dollars per night, modern boutique guest houses offer hotel-grade cleanliness, air conditioning, and quiet courtyards at a fraction of the cost.

At [The Wina Guest House](/rooms), you get verified amenities:
- Air conditioning and hot showers
- High-speed fiber Wi-Fi
- Access to a shared kitchen to store groceries and prepare light meals
- Free, secure motorcycle and car parking

## 2. Dine Like a Local at Authentic Warungs
Bali's local warungs are legendary. A generous plate of *Nasi Campur* (rice accompanied by fragrant spiced meats, crispy tempeh, and fresh vegetables) typically costs between IDR 25,000 and 45,000 ($1.70 - $3.00 USD). Alternating between Western cafes and traditional warungs cuts food expenses in half while providing an authentic taste of Indonesia.

## 3. Opt for Direct WhatsApp Bookings
Avoid paying third-party booking commissions by connecting directly with guest houses. Direct booking often unlocks the best rates and personalized service.

## 4. Rent a Scooter or Share Transport
Renting a standard scooter costs approximately IDR 70,000 to 100,000 per day ($4.50 - $6.50 USD), providing complete freedom to explore Bali's beaches and waterfalls on your own schedule.

---

## Begin Your Bali Adventure

Experience affordable luxury in Canggu at The Wina Guest House. [Check our available rooms](/rooms) and start your Bali journey with confidence.
    `,
    featuredImage: ROOM_KING_IMAGE,
    imageAlt: 'Budget friendly Bali trip guest house bedroom with natural light',
    author: 'The Wina Editorial Team',
    datePublished: '2026-02-14',
    dateUpdated: '2026-02-25',
    status: 'published',
    views: 760,
    readingTimeMinutes: 5,
    internalLinks: [
      { label: 'Explore Rooms', href: '/rooms' },
      { label: 'Guest House Facilities', href: '/facilities' },
    ],
    tags: ['Budget Bali', 'Travel Tips', 'Guest House Bali', 'Canggu Savings'],
  },
  {
    id: 'article-7',
    slug: 'best-time-to-visit-canggu-bali',
    title: 'Best Time to Visit Canggu, Bali',
    seoTitle: 'Best Time to Visit Canggu, Bali: Month-by-Month Guide | The Wina',
    metaDescription:
      'Wondering when to visit Canggu? Learn about dry season, wet season, surf conditions, rainfall, and crowd levels to pick the best month for your trip.',
    primaryKeyword: 'Best time to visit Canggu',
    category: 'Bali Travel Tips',
    excerpt:
      'A month-by-month breakdown of weather, surf conditions, and seasonal crowds in Canggu, Bali to help you decide the ideal time for your island vacation.',
    content: `
# Best Time to Visit Canggu, Bali

Planning your trip to Canggu? Bali sits approximately 8 degrees south of the equator, blessing it with warm tropical weather throughout the entire year. However, understanding the shift between the **dry season** and the **wet season** will help you choose the **best time to visit Canggu** based on your travel preferences.

---

## Dry Season: May to September (Peak Surf & Sun)
- **Weather:** Clear blue skies, lower humidity, and daytime temperatures around 28°C to 30°C. Evenings bring a pleasant coastal breeze.
- **Surf Conditions:** Optimal offshore trade winds create clean, consistent waves at Batu Bolong and Echo Beach.
- **Atmosphere:** Lively and social. Popular cafes and beach spots are bustling with visitors from around the world.
- **Tip:** Book your accommodation well in advance, especially during July and August.

---

## Shoulder Season: April and October (The Hidden Sweet Spot)
Many experienced travelers consider April and October the best months to visit Canggu:
- Excellent weather with predominantly dry days.
- Noticeably fewer crowds on the roads and beaches.
- Great availability at boutique guest houses like [The Wina Guest House](/rooms).

---

## Wet Season: November to March (Lush & Relaxed)
- **Weather:** Warm tropical rains usually fall in short, heavy bursts during late afternoons or overnight, leaving the mornings clear and sunny.
- **Atmosphere:** Slower, more introspective pace. The surrounding rice fields and tropical gardens are at their most vibrant green.
- **Best For:** Travelers seeking tranquil cafe mornings, yoga retreats, and unhurried exploration.

---

## Ready to Book Your Dates?

Regardless of the month you choose, The Wina Guest House offers year-round comfort with air-conditioned rooms, hot showers, and peaceful courtyard surroundings on Jalan Pantai Batu Bolong.

[Reserve your room directly via WhatsApp](/rooms) today.
    `,
    featuredImage: HERO_IMAGE,
    imageAlt: 'Best time to visit Canggu Bali sunny tropical garden',
    author: 'The Wina Editorial Team',
    datePublished: '2026-02-05',
    dateUpdated: '2026-02-18',
    status: 'published',
    views: 890,
    readingTimeMinutes: 5,
    internalLinks: [
      { label: 'View Our Guest House Rooms', href: '/rooms' },
      { label: 'About The Wina', href: '/about' },
    ],
    tags: ['Best Time to Visit', 'Canggu Weather', 'Bali Seasons', 'Surf Forecast'],
  },
  {
    id: 'article-8',
    slug: 'guide-to-cafes-and-restaurants-in-canggu',
    title: 'A Guide to Cafes and Restaurants in Canggu',
    seoTitle: 'A Guide to Cafes and Restaurants in Canggu, Bali | The Wina',
    metaDescription:
      'Explore Canggu’s world-class dining scene. From artisan coffee and organic brunch bowls to beachfront dining and authentic local Balinese warungs.',
    primaryKeyword: 'Cafes and restaurants in Canggu',
    category: 'Things to Do in Canggu',
    excerpt:
      'Canggu is widely regarded as Bali’s culinary capital. Here is our curated guide to the best cafes, bakeries, and dinner spots along Batu Bolong and beyond.',
    content: `
# A Guide to Cafes and Restaurants in Canggu

Few places in the world rival Canggu's sheer density of innovative, high-caliber culinary spots. From early-morning specialty coffee to candlelit tropical courtyards serving handmade pasta, the food culture here is a central highlight of any Bali stay.

Here is our curated **guide to cafes and restaurants in Canggu**, centered around the iconic Jalan Pantai Batu Bolong area.

---

## 1. Morning Coffee & Artisan Breakfasts
Start your day with specialty coffee made from Indonesian beans (Aceh Gayo, Kintamani) alongside sourdough toast and avocado tartines:
- **Artisan Bakeries:** Freshly laminated croissants and artisanal breads baked daily at dawn.
- **Tropical Smoothie Bowls:** Dragon fruit, mango, spirulina, and homemade granola bowls designed to fuel your morning surf.

## 2. Authentic Balinese Flavors
No visit to Canggu is complete without experiencing genuine Indonesian culinary heritage:
- **Nasi Campur Warungs:** Point and choose your favorite sides—crispy spiced tempeh, shredded chicken betutu, corn fritters, and aromatic sambal matah.
- **Sate Lilit:** Minced fish or chicken spiced with lemongrass and galangal, grilled over coconut husks.

## 3. Casual Sunset & Dinner Dining
As evening approaches, Canggu transitions into a relaxed dining scene:
- **Wood-Fired Pizzerias:** Traditional Neapolitan pizzas with buffalo mozzarella and San Marzano tomatoes.
- **Fresh Seafood by the Ocean:** Grilled red snapper and tiger prawns seasoned with Balinese sea salt and lime.

---

## Stay Footsteps from Canggu’s Best Flavors

When you stay at [The Wina Guest House](/rooms) on Jalan Pantai Batu Bolong No. 20 D, you are situated within easy walking distance of dozens of Canggu's most celebrated dining spots.

Plus, our **shared kitchen** gives you the flexibility to store leftovers, keep refreshing tropical drinks cold, and make your own light meals whenever you wish.

[Explore our rooms and check availability](/rooms) via WhatsApp today.
    `,
    featuredImage: CANGGU_COAST_IMAGE,
    imageAlt: 'Cafes and restaurants in Canggu Bali dining atmosphere',
    author: 'The Wina Editorial Team',
    datePublished: '2026-01-28',
    dateUpdated: '2026-02-10',
    status: 'published',
    views: 1320,
    readingTimeMinutes: 5,
    internalLinks: [
      { label: 'Check Our Location on Batu Bolong', href: '/location' },
      { label: 'Shared Kitchen Facility', href: '/facilities' },
    ],
    tags: ['Canggu Cafes', 'Bali Food Guide', 'Restaurants Batu Bolong', 'Warung Bali'],
  },
  {
    id: 'article-9',
    slug: 'what-to-look-for-when-booking-a-guest-house-in-bali',
    title: 'What to Look for When Booking a Guest House in Bali',
    seoTitle: 'What to Look for When Booking a Guest House in Bali | The Wina',
    metaDescription:
      'Avoid common booking mistakes in Bali. Here are the 6 crucial factors to check before reserving a guest house in Canggu or southern Bali.',
    primaryKeyword: 'Guest house in Bali',
    category: 'Accommodation Guide',
    excerpt:
      'Not all guest houses are created equal. Discover what amenities, location details, and service standards ensure a restful, memorable stay in Bali.',
    content: `
# What to Look for When Booking a Guest House in Bali

Choosing a **guest house in Bali** offers an intimate, authentic, and cost-effective alternative to massive resort hotels. However, the quality of accommodation across the island can vary dramatically.

To ensure your Bali holiday is relaxing, refreshing, and hassle-free, here is a practical checklist of what to verify before making your reservation.

---

## 1. Verified Air Conditioning & Cleanliness Standards
Bali’s tropical climate requires efficient, well-maintained air conditioning. Before booking, check that rooms feature modern split-system A/C and regular housekeeping to keep linens fresh and spaces immaculate.

## 2. Dedicated Hot Water Heaters
Tropical rains and early-morning surf sessions call for warm, revitalizing showers. Confirm that the ensuite bathroom has a dedicated hot and cold water system with strong water pressure.

## 3. High-Speed, Fiber-Optic Wi-Fi
Whether you need to attend video meetings, back up travel photos, or stream entertainment, verified high-speed Wi-Fi across all private rooms is an essential modern requirement.

## 4. Secure On-Site Parking
Renting a scooter or car is standard in Canggu. Make sure your guest house provides safe, dedicated parking so your vehicle is off the main road and protected overnight.

## 5. Peaceful Courtyard Atmosphere
Canggu is vibrant and energetic. A well-designed guest house should serve as a calming oasis where you can retreat from the noise, surrounded by tropical gardens and quiet shared spaces.

---

## Experience The Wina Difference

At The Wina Guest House in Canggu, we have thoughtfully incorporated every detail needed for a restorative stay:
- Whisper-quiet air conditioning
- Refreshing hot and cold showers
- High-speed fiber internet
- Free car and motorcycle parking
- Shared kitchen access
- Attentive, authentic Balinese hospitality

[View our rooms and book directly via WhatsApp](/rooms) today.
    `,
    featuredImage: ROOM_KING_IMAGE,
    imageAlt: 'What to look for when booking a guest house in Bali clean interior',
    author: 'The Wina Editorial Team',
    datePublished: '2026-01-20',
    dateUpdated: '2026-02-01',
    status: 'published',
    views: 640,
    readingTimeMinutes: 5,
    internalLinks: [
      { label: 'View Our Facilities', href: '/facilities' },
      { label: 'Our Rooms and Suites', href: '/rooms' },
    ],
    tags: ['Guest House in Bali', 'Booking Tips', 'Canggu Accommodation', 'Bali Hospitality'],
  },
  {
    id: 'article-10',
    slug: 'why-canggu-is-a-popular-destination-for-travelers',
    title: 'Why Canggu Is a Popular Destination for Travelers',
    seoTitle: 'Why Canggu Is a Popular Destination for Travelers | The Wina',
    metaDescription:
      'Explore why Canggu has become Bali’s most popular coastal destination for international tourists, surfers, wellness seekers, and remote professionals.',
    primaryKeyword: 'Canggu Bali travel',
    category: 'Local Experiences',
    excerpt:
      'From beginner-friendly surf and world-class cafes to a welcoming international community, discover why travelers return to Canggu year after year.',
    content: `
# Why Canggu Is a Popular Destination for Travelers

Over the past decade, Canggu has transformed from a quiet coastal hamlet into one of the most vibrant, sought-after travel hubs in the world. Yet beneath its trendy exterior, it retains a magnetic charm that keeps travelers extending their trips month after month.

Here are the core reasons why **Canggu Bali travel** continues to captivate visitors from across the globe.

---

## 1. World-Class Yet Approachable Surf Breaks
Unlike steep, intimidating reef breaks found in other parts of the world, Canggu’s beaches—particularly Batu Bolong—offer accessible waves with gentle takeoffs. Longboarders, beginners, and seasoned surfers share the lineup in a friendly, supportive atmosphere.

## 2. A Global Melting Pot of Ideas and Creativity
Canggu attracts entrepreneurs, creatives, artists, and digital nomads from every corner of the world. Striking up conversations at a local coffee shop or while waiting for sunset often leads to lifelong friendships and new collaborations.

## 3. Holistic Wellness and Tropical Living
From oceanfront morning runs to sunset yoga classes, Canggu celebrates physical vitality and mindfulness. Organic markets, cold-pressed juice bars, and holistic wellness spas abound.

## 4. Authentic Balinese Culture within Arm’s Reach
Despite its cosmopolitan vibe, Canggu remains an authentic Balinese village. Traditional temple ceremonies, the aroma of frangipani incense, and warm Balinese hospitality provide an enduring spiritual foundation.

---

## Make Canggu Your Next Destination

Discover comfort, simplicity, and authentic hospitality at **The Wina Guest House**, situated right on Jalan Pantai Batu Bolong No. 20 D. 

[Explore our boutique rooms](/rooms) and message us directly on WhatsApp to plan your Canggu escape.
    `,
    featuredImage: COURTYARD_IMAGE,
    imageAlt: 'Why Canggu is a popular destination for travelers tropical courtyard and palms',
    author: 'The Wina Editorial Team',
    datePublished: '2026-01-12',
    dateUpdated: '2026-01-25',
    status: 'published',
    views: 1180,
    readingTimeMinutes: 4,
    internalLinks: [
      { label: 'Our Story & About Us', href: '/about' },
      { label: 'Explore Rooms', href: '/rooms' },
      { label: 'Location Map', href: '/location' },
    ],
    tags: ['Canggu Bali Travel', 'Batu Bolong', 'Digital Nomads Bali', 'Island Life'],
  },
];
