# MOROCCO SAHARA TREKKING

An authentic, ultra-fast trekking guide website focused on Sahara desert expeditions in Morocco (Merzouga, Zagora, Ouarzazate, M'hamid, Erg Chegaga).

## 🚀 100% Free Stack (No Database, No CMS, No Paid Cloud)
- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS with custom Moroccan desert color palette
- **Content Engine:** MDX files with frontmatter parsed via `gray-matter` & `next-mdx-remote`
- **Hosting & Deployment:** Static Export (`output: 'export'`) with `trailingSlash: true` tailored for cPanel (`public_html`) or any static hosting (GitHub Pages, Netlify, Cloudflare Pages, Vercel)
- **Booking Engine:** Formspree free tier for instant booking requests

---

## 📁 Project Structure

```text
MOROCCO SAHARA TREKKING/
├── app/
│   ├── layout.tsx                  # Global layout with SEO metadata, Navbar & Footer
│   ├── globals.css                 # Desert theme styling & typography
│   ├── page.tsx                    # Landing page with hero, stats, featured treks, regions & guides
│   └── treks/
│       ├── page.tsx                # Trek catalog page with search, filters & sorting
│       ├── TrekListClient.tsx      # Client-side filtering component
│       └── [slug]/
│           └── page.tsx            # Static trek detail page (generateStaticParams + MDX + Formspree)
├── components/
│   ├── Navbar.tsx                  # Responsive navigation bar
│   ├── Footer.tsx                  # Sahara expedition footer
│   ├── TrekCard.tsx                # Reusable trek card with badges, duration & pricing
│   ├── MDXContent.tsx              # MDX renderer with custom styling
│   └── BookingForm.tsx             # Interactive booking form integrated with Formspree
├── content/
│   ├── treks/                      # Trek MDX files
│   │   ├── 3-day-merzouga-camel-trek.mdx
│   │   ├── 4-day-erg-chegaga-wild-desert-trek.mdx
│   │   └── 2-day-zagora-desert-sunset-trek.mdx
│   ├── regions/                    # Region MDX files
│   │   ├── merzouga-erg-chebbi.mdx
│   │   └── erg-chegaga-mhamid.mdx
│   └── guides/                     # Guide profile MDX files
│       └── brahim-ait-omar.mdx
├── lib/
│   └── mdx.ts                      # MDX parser utilities (getAllTreks, getTrekBySlug, etc.)
├── public/
│   └── images/
│       ├── treks/                  # Trek photography
│       ├── regions/                # Region landscapes
│       └── guides/                 # Guide portraits
├── types/
│   └── index.ts                    # TypeScript definitions for Trek, Region, Guide
├── next.config.js                  # Static export configuration
├── tailwind.config.ts              # Custom Sahara color definitions
└── package.json
```

---

## 🏜️ Adding New Content

### 1. Adding a New Trek
Simply create a new `.mdx` file in `/content/treks/<your-slug>.mdx`:

```mdx
---
title: "3-Day Merzouga Camel Trek"
slug: "3-day-merzouga-camel-trek"
description: "Short description for cards and SEO."
difficulty: "Moderate"        # Easy | Moderate | Hard
duration: 3                    # days
price: 250                     # EUR
region: "Merzouga"
category: "Camel Trek"
images:
  - "/images/treks/merzouga-1.jpg"
  - "/images/treks/merzouga-2.jpg"
coordinates:
  lat: 31.0996
  lng: -4.0125
meetingPoint: "Merzouga village center"
included:
  - "Camel ride"
  - "Night in desert camp"
  - "Dinner and breakfast"
notIncluded:
  - "Flights"
  - "Travel insurance"
featured: true
---

## Overview
Content here...

## Itinerary
### Day 1
...

## Meeting Point
...
```

The site will automatically detect the new file, generate static pages, and include it in search and filter menus upon build!

---

## 🛠️ Development & Deployment

### Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### Static Export Build for cPanel
```bash
npm run build
```
This generates a static production build in the `/out` directory.

### Deploying to cPanel
1. Run `npm run build`
2. Compress the contents of the `/out` directory into a `.zip` file.
3. Open your cPanel **File Manager**.
4. Navigate to `public_html` (or your domain's document root).
5. Upload the `.zip` file and extract it.
6. Your website is now live! Because `output: 'export'` and `trailingSlash: true` are configured, every page is rendered as static HTML and works out-of-the-box on Apache / LiteSpeed cPanel servers with no Node.js hosting daemon needed.

---

## 📬 Formspree Setup (Free Booking Form)
1. Sign up for free at [Formspree.io](https://formspree.io).
2. Create a new form (e.g. "Sahara Trek Inquiries") and copy the Form ID (e.g. `xvoeplzn`).
3. Create `.env.local` in the project root:
   ```env
   NEXT_PUBLIC_FORMSPREE_ID=xvoeplzn
   ```
4. Submissions will be sent directly to your email inbox and WhatsApp notifications can be linked.
