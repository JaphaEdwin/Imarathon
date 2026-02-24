# Independence Marathon — Official Website

**Version 1.0 | CI v4.0 Compliant | February 2026**

## Architecture

A single-page application (SPA) using hash-based routing — same architecture as the JEM (Jinja Explorer Marathon) site. No build step required. Open `index.html` in any browser.

| File | Purpose |
|---|---|
| `index.html` | Shell: header, footer, mobile nav, structured data |
| `styles.css` | CI v4.0 design system: black dominant, crimson accent, gold prestige |
| `config.js` | All editable content: fees, categories, FAQs, results, sponsors, etc. |
| `app.js` | 12 page renderers, routing, forms, countdown, scroll reveal |

## Pages (12)

1. **Home** — Hero with countdown, stats bar, four pillars, race essentials, race day teaser, testimonials, sponsors, FAQ preview, newsletter
2. **About** — Story, four pillars detail, CSR & community impact
3. **Register** — Fees table, start times, how-to steps, full registration form with validation
4. **Course** — GPX downloads per category, course markers, aid stations table
5. **Runner Hub** — Login portal, dashboard features, training plan downloads
6. **Community** — Clubs, volunteer sign-up form, schools, ambassadors
7. **Sponsors** — Tiered packages, sponsor enquiry form
8. **Results** — Search, prize money table, 2025 podium results, certificate download
9. **Race Day** — Live tracker search, 6 feature cards, schedule, emergency info
10. **Media** — Video highlight, photo gallery, press kit downloads
11. **Contact** — Contact info, message form, full FAQs (15 Q&As)

## CI v4.0 Compliance

- **Colour**: Black 65%, White 25%, Deep Crimson (#B11226) 7%, Victory Gold (#D4AF37) 3%
- **Typography**: Oswald (display/headlines), Montserrat (body)
- **Layout**: 12-column grid, alternating black/white sections, sharp edges, cinematic
- **Accent**: One accent per section (crimson line or gold highlight)

## Features Benchmarked From

| Source | Features Adapted |
|---|---|
| **TCS NYC Marathon** | Live runner tracking, spectator guide, digital cheer cards, live leaderboard, wave tracker |
| **Std Chartered Nairobi** | Registration form with payment gateway, runner portal, finisher certificate, training plans, results archive, FAQs |
| **Fort Portal City Marathon** | GPX downloads per category, interactive route map, countdown timer, photography gallery |

## How to Edit Content

All content lives in `config.js`. Update fees, FAQs, results, sponsors, and more without touching any other file.

## Deployment

Static files — deploy to any hosting: Netlify, Cloudflare Pages, AWS S3, or traditional hosting. No build step required.
