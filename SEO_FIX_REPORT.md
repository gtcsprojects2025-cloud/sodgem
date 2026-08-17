# SODGEM — SEO Technical Fix Report

**Project:** `sodgem` (Next.js 16.1.4 — App Router, React 19, Tailwind 4)
**Date of fix:** 2026-08-13
**Companion document:** `SEO_TECHNICAL_AUDIT.md` (the original issues report this fixes)
**Validation performed:** `npm run lint` → **0 problems** (was 60); `npm run build` → **compiles, 12/12 routes static**, incl. generated `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`; generated HTML inspected per route.

> **Caveat on performance numbers:** the production domain is not yet deployed in this repo, so no live Lighthouse/field data could be captured. "Before/after performance indicators" are based on **measured asset sizes** (`sharp` re-encode) and **generated HTML/build output**, not CrUX field data. A post-deploy Lighthouse + Search Console pass is still recommended (see "Remaining technical risks").

---

## 1. Issues Resolved

| # | Category | Fix applied | Files |
|---|----------|-------------|-------|
| 1 | Metadata / titles | Unique `<title>` + `<meta description>` + canonical per route (all 5 pages verified in built HTML); title template `%s \| SODGEM` | `app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/join/page.tsx`, `app/contact/layout.tsx`, `app/resources/layout.tsx` |
| 2 | Indexing directives | Site-wide `robots: index, follow` (+ GoogleBot max-image-preview/snippet); 404 page set to `noindex, nofollow` | `app/layout.tsx`, `app/not-found.tsx` |
| 3 | Open Graph / Twitter | `og:*` and `twitter:card` tags with absolute image URL, `metadataBase` set | `app/layout.tsx` |
| 4 | Structured data | JSON-LD added: **Organization + WebSite** (all pages), **BreadcrumbList** (about/contact), **Church + Event** (join), **ItemList/Book** (resources) — verified per route | layouts + pages |
| 5 | Sitemap | New `app/sitemap.ts` → `/sitemap.xml` (5 URLs, lastmod/priority) | `app/sitemap.ts` |
| 6 | robots.txt | New `app/robots.ts` → `/robots.txt` with sitemap reference + host | `app/robots.ts` |
| 7 | PWA/favicon | `app/manifest.ts`, SVG favicon, 180×180 apple-touch-icon, 1200×630 OG image | `app/manifest.ts`, `public/icon.svg`, `public/apple-icon.png`, `public/og-image.jpg` |
| 8 | LCP/CWV images | Hero + about header converted to `next/image` (`fill`, `priority`, `sizes`); mission image swapped from 275×183 `.jfif` to 600×401 `restoration2.jpg`; resource images get `fill` + `sizes` + descriptive `alt` | `app/page.tsx`, `app/about/page.tsx`, `app/resources/page.tsx` |
| 9 | Third-party waste | Removed 4 `i.pravatar.cc` avatar `<img>`s (preloaded on every load incl. mobile) → decorative initials | `app/page.tsx` |
| 10 | Format support | `images.formats: ["image/avif", "image/webp"]` enabled (sharp present) | `next.config.ts` |
| 11 | Client JS footprint | Home/About/Join converted from `"use client"` to server components (only form pages remain client) | 3 pages |
| 12 | Broken/dead links | Footer `href="#"` dead links replaced with real routes; "Give Now" (desktop+mobile), "Support Missions", "View Full Calendar" are now real links | `footer.tsx`, `navbar.tsx`, `join`, `page.tsx` |
| 13 | Invalid HTML | `<button>`-wrapping-`<a>` hero CTAs replaced with valid `<Link>`/`<a>` | `app/page.tsx` |
| 14 | 404 experience | Custom `app/not-found.tsx` (branded, noindex, links home) | `app/not-found.tsx` |
| 15 | Nav performance | Navbar `<a href>` → Next `<Link>` (client-side transitions), ARIA on mobile menu | `navbar.tsx` |
| 16 | Stale template content | Removed all `SmartEnv`/`smartGreen`/`rolandmario2@gmail.com` leftovers; correct SODGEM branding + recipient | `app/contact/page.tsx`, `app/api/contact/route.ts` |
| 17 | Contact API security | Input escaping (HTML injection), email format + length validation, honeypot field, in-memory per-IP rate limiting (429), `CONTACT_RECIPIENT` env, `EMAIL_APP_PASSWORD` support | `app/api/contact/route.ts`, `app/contact/page.tsx` |
| 18 | Security headers | HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` via `headers()` | `next.config.ts` |
| 19 | `rel="noopener noreferrer"` | Added to all external `target="_blank"` social links | `footer.tsx`, `contact/page.tsx` |
| 20 | Cleanup | Unused imports (53 warnings), 7 unescaped-entity errors, 4 unused images + 5 template SVGs removed | all pages, `public/` |
| 21 | CSS | Missing `animate-fade-in` keyframes added (class was unused/broken) | `app/globals.css` |
---

## 2. Before-and-After Performance Indicators

Indicators below are **measured** (asset sizes via `sharp` re-encode at Next defaults: AVIF q50 / WebP q75) or **structural** (build/lint output). "Client transfer" = what a visitor downloads.

### Hero / LCP image (`/about-spring.jpg`, 1348×500)
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Markup | raw `<img>`, no width/height, no priority | `next/image` `fill` + `priority` + `sizes="100vw"` + `<link rel="preload">` + responsive `srcset` | LCP-optimised |
| Format on wire | JPEG only (99.5 KB) | AVIF/WebP (per client support) | modern format |
| Mobile transfer (750 w) | ~99 KB JPEG | ~32 KB AVIF q50 | **≈ 67% smaller** |
| Full-res transfer (1920 w) | ~99 KB JPEG | ~87 KB AVIF q50 | smaller at full-res |
| CLS risk | High (no dimensions) | None (dimensioned/fill) | eliminated |

### Resource image (`/prayer_journal.png`, 1125×1287)
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| On-disk source | 1,447,537 B (1.44 MB PNG) | same file, but served via `next/image` | — |
| Client transfer (500 w) | ~1.4 MB PNG | ~15 KB AVIF q50 (WebP ~22 KB) | **≈ 99% smaller** |
| `sizes` attr | none (fixed 500×500 `next/image`) | `fill` + `sizes="…50vw,33vw"` | fully responsive |

### External requests
| Metric | Before | After |
|--------|--------|-------|
| Avatar requests | 4× `i.pravatar.cc` + `<link rel="preload">` on every load (incl. mobile where hidden) | 0 (decorative initials) |
| Third-party latency/failure surface | present | removed |

### JavaScript / hydration
| | Before | After |
|--|--------|-------|
| `"use client"` pages | Home, About, Join, Contact, Resources (5) | Contact, Resources (2 — both have interactive forms) |
| ESLint diagnostics | **60** (7 errors, 53 unused-import warnings) | **0** |

### Fonts
Unchanged — already self-hosted via `next/font` + preloaded (no regression).

---

## 3. Core Web Vitals Status

| Metric | Status after fix | Notes |
|--------|------------------|-------|
| **LCP** Visual | **Improved** | Hero served through `next/image` with `priority` + preload + AVIF/WebP + responsive `srcset`; ~67% smaller payload on mobile |
| **LCP** (html) | **Improved** | `<link rel="preload" as="image">` now carries explicit `imageSrcSet`/`sizes` |
| **CLS** | **Mitigated** | No plain `<img>` without dimensions remain; all images dimensioned/`fill` with reserved space |
| **INP** | **Improved** | Nav now uses `next/link` (no full page reload); 3 routes no longer hydrated as client components |
| **TBT / JS** | **Improved** | Less hydration work on Home/About/Join; dead imports removed |
| Field validation | **Pending** | Requires production URL + Lighthouse/CrUX after deploy |

---

## 4. Mobile Performance Status

| Issue | Status |
|-------|--------|
| Desktop-only avatar images preloaded on mobile | **Fixed** — removed external avatars entirely (no mobile waste) |
| Unresized full-width JPEG hero on phones | **Fixed** — responsive `srcset`/`sizes` serve ~32 KB AVIF to small screens |
| 1.44 MB journal PNG on resource cards | **Fixed at serve time** — ~15 KB AVIF delivered |
| Layout shift from images on small viewports | **Fixed** — dimensioned images preserve space |
| Mobile menu accessibility (ARIA) + client nav | **Improved** |
| Fonts | Already optimised (self-hosted) — no mobile regression |
| Horizontal-overflow (absolute negative-offset cards) | **Not changed** — design used `overflow-hidden` guards; flagged for a device pass (see risks) |
---

## 5. Indexing & Crawlability Status

All verified against the generated pre-rendered HTML:

| Page | `<title>` | robots | canonical | Structured data |
|------|-----------|--------|-----------|-----------------|
| `/` | SODGEM — Spring of Divine Grace Evangelical Mission | index, follow | `<canonical>` to base | Organization, WebSite |
| `/about` | About Us — Our Story, Vision & Mission | SODGEM | index, follow | `<canonical>`/about | BreadcrumbList |
| `/contact` | Contact Us | SODGEM | index, follow | `<canonical>`/contact | BreadcrumbList |
| `/join` | Get Involved — Service Times & Locations | SODGEM | index, follow | `<canonical>`/join | Church, Event |
| `/resources` | Digital Resources — Books, Journals & Hymnals | SODGEM | index, follow | `<canonical>`/resources | ItemList, Book, MusicComposition |
| 404 | Page Not Found | **noindex, nofollow** | — | — |

- **Duplicate-title issue eliminated** — every route now has a distinct title/description (previously all 5 emitted `SODGEM`).
- **Crawlability**: all content routes are pre-rendered **static HTML** (SSG) — 12/12 routes static in the build graph; no client-only rendering blocking crawlers.
- **No `noindex` risk** on real pages; only the 404 is excluded.
- Open Graph/Twitter present site-wide.

---

## 6. Sitemap / robots.txt Status

| Asset | Exists? | Verified output |
|-------|---------|-----------------|
| `/sitemap.xml` | ✅ new (`app/sitemap.ts`) | `<urlset>` with 5 URLs (`/`, about, contact, join, resources), lastmod + priority |
| `/robots.txt` | ✅ new (`app/robots.ts`) | `User-Agent: *` / `Allow: /` / `Disallow: /api/, /_next/static/`; `Host:`; points to `/sitemap.xml` |
| `/manifest.webmanifest` | ✅ new (`app/manifest.ts`) | name, theme color, icons |
| favicon / OG assets | ✅ new | `icon.svg`, `apple-icon.png` (180²), `favicon.ico`, `og-image.jpg` (1200×630) |

> Prior state: none of these existed — sitemap/robots were the highest-severity crawlability gaps.

---

## 7. Broken Links & Technical Errors Resolved

| Issue | Resolution |
|-------|-----------|
| Footer dead `href="#"` links (Our Story, Ministries, Giving, Resources, Locations; Grace Cell Groups, Volunteer, Missions, Youth Ministry, Events; Privacy, Terms, Staff Login) | Replaced with real routes: `/about`, `/contact`, `/join`, `/resources` |
| Footer "Resources" not linking to the resources page | Now links to `/resources` |
| Dead buttons: "Give Now" (desktop+mobile), "Support Missions", "View Full Calendar" | Now functional `<Link>`s |
| Invalid `<button>` wrapping `<a>` in hero CTAs | Replaced with valid `<Link>`/`<a>` |
| No custom 404 | Added branded `app/not-found.tsx` (noindex, links home) |
| Leftover `SmartEnv` / `smartGreen` / `rolandmario2@gmail.com` | Removed; correct SODGEM branding + `info@springsofdivinegrace.com` |
| Missing `rel="noopener noreferrer"` on `target="_blank"` social links | Added (reverse-tabnabbing closed) |
| 7 unescaped-entity JSX errors, 53 unused-import warnings | All fixed → lint **0 problems** |
| Contact API unescaped/injection-prone email + wrong recipient | Escaped, validated, env-configurable recipient |
| Unused/broken images & template SVGs | Removed 9 unused assets from `public/` |

---

## 8. Remaining Technical Risks

1. **Canonical domain assumption.** No production domain was defined in the repo, so `https://www.springsofdivinegrace.com` (derived from the site's own contact email/branding) is used for `siteConfig.url`, canonical, sitemap, robots and HSTS `preload`. **Confirm/change this before/after deploying** in `lib/site.ts`.
2. **Live field-data validation pending.** LCP/CLS/INP thresholds must be confirmed with Lighthouse/CrUX on the real domain (indicators here are measured asset sizes + build output, not field metrics).
3. **Asset placeholders.** `og-image.jpg` and `apple-icon.png` were derived from the existing hero photo (via `sips`) — replace with properly branded design assets when available.
4. **Source file not re-compressed on disk.** `prayer_journal.png` remains 1.44 MB on disk; it's compressed at serve time by `next/image`, but re-exporting the master as WebP would shrink the repo/build.
5. **Rate limiting is in-memory.** The per-IP limiter works per process, but is not shared across serverless instances — for scale, move to Redis/Upstash or a provider-side WAF.
6. **No Content-Security-Policy header.** Deliberately deferred to avoid breaking Next.js inline scripts; add a tuned CSP when ready.
7. **Contact deliverability.** Email still uses GMail SMTP (now via `EMAIL_APP_PASSWORD` + `CONTACT_RECIPIENT` env). A transactional provider (Resend/SendGrid) improves deliverability/spam.
8. **`/resources` is a simulated store** — payment is still a manual `alert()` banking flow, not a real gateway. Not an SEO/CWV blocker, but a conversion + trust risk for indexing quality.
9. **Search Console verification** is a console-side action (not code) — complete domain verification and submit the sitemap after deploy, then re-audit.
10. **Mobile horizontal-overflow design review** — absolute negative-offset cards are guarded by `overflow-hidden`, but a real-device sweep is wise (Covered in section 4).
