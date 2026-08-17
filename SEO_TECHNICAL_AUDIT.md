# SODGEM — Technical SEO Audit: Identified Issues

**Project:** `sodgem` (Next.js 16.1.4 — App Router, React 19, Tailwind 4)
**Audited files:** `app/layout.tsx`, `app/page.tsx`, `app/about`, `app/contact`, `app/join`, `app/resources`, `app/components/` (navbar, footer), `app/api/contact/route.ts`, `next.config.ts`, `public/`
**Basis:** static source review + `next build` output + generated pre-rendered HTML + `eslint` report
**Route map (all pre-rendered static):** `/`, `/about`, `/contact`, `/join`, `/resources` (`/api/contact` is dynamic)

> Routes are server-side pre-rendered (SSG) and therefore **crawlable HTML** — that part is a strength. The dominant issues are missing metadata/indexing signals, missing sitemap/robots, image optimisation gaps, invalid HTML, and security/consistency defects.

---

## 1. Website Speed & Core Web Vitals

| # | Severity | Issue | Location |
|---|----------|-------|----------|
| 1.1 | **High** | **LCP (hero) image `/about-spring.jpg` rendered as a plain `<img>` instead of `next/image`** — no auto WebP/AVIF, no responsive `srcset`, no `width`/`height` (causes CLS), no served-size/quality control. | `app/page.tsx:48` |
| 1.2 | Medium | Other images also plain `<img>` (`/rest.jfif`, avatar URLs) → no optimisation, no dimensions → CLS + bandwidth. ESLint `@next/next/no-img-element` warnings on all. | `app/page.tsx:98,113` |
| 1.3 | Medium | **4 external avatar images from `i.pravatar.cc` are `<link rel="preload">`d** and fetched on every load even though their container is `hidden lg:block` (desktop-only) → wasted preload/latency on mobile. | `app/page.tsx:92-105`; confirmed in built `<head>` |
| 1.4 | **High** | `prayer_journal.png` is **1.44 MB PNG (1125×1287)** served via `next/image` at 500×500 with **no `sizes` attribute** — massive bandwidth waste for a small card image. | `app/resources/page.tsx:143`; `public/prayer_journal.png` |
| 1.5 | Medium | No `priority`/`fetchPriority` and no `loading="lazy"` on any image (hero relies only on the Next default `<link rel="preload">`, no explicit eager/lazy strategy for below-fold images). | pages |
| 1.6 | Medium | No `sizes` / authored responsive `srcset` on any `next/image` usage → larger-than-needed files on some viewports. | `app/about/page.tsx:74`, `app/resources/page.tsx` |
| 1.7 | Medium | **Every page is a `"use client"` component** shipping full hydration + `lucide-react`/`react-icons` runtime. 53 unused-import lint warnings indicate bloated imports that ought to be trimmed. | all pages |
| 1.8 | Low | Google fonts correctly self-hosted via `next/font` and preloaded (good); no font loading issue found. | `app/layout.tsx:5-13` |

---

## 2. Mobile Responsiveness

| # | Severity | Issue | Location |
|---|----------|-------|----------|
| 2.1 | Medium | Responsive breakpoints (sm/md/lg) are used throughout and the design is largely mobile-first — *positive*. However the layout relies heavily on **absolute positioned elements with negative offsets** (`-right-10`, `-bottom-10`, `-left-10`, `-top-10`) that can overflow the viewport and cause **horizontal scroll** on narrow screens (only partly mitigated by parent `overflow-hidden`). | `app/page.tsx:119-124`, `app/about/page.tsx` |
| 2.2 | Low | Mobile menu overlay has **no `aria-expanded`/`aria-controls`/`aria-label`** and no focus management/trap → poor accessibility and assistive-tech UX. | `app/components/navbar.tsx:83-120` |
| 2.3 | Low | Buttons with no action ("Give Now", "Support Missions", "View Full Calendar") are dead UI on all sizes; on mobile they are more prominently misleading. | `navbar.tsx:77,115`, `join/page.tsx:77`, `page.tsx:161` |
| 2.4 | Info | No physical-device testing performed; full layout-shift / tap-target validation requires a Lighthouse/real-device pass. The floating stat card is correctly hidden on mobile. | — |

---

## 3. Crawlability & Indexing

| # | Severity | Issue | Location |
|---|----------|-------|----------|
| 3.1 | **High** | **No unique page titles / meta descriptions.** All pre-rendered pages emit the identical `<title>SODGEM</title>` and the identical homepage description (verified in built HTML). Subpages (`/about`, `/contact`, `/join`, `/resources`) are effectively indistinguishable to search engines → duplicate-title issues, weak indexing. | built `.next/server/app/*.html` |
| 3.2 | **High** | Because every page is `"use client"`, **no page can export `metadata`/`generateMetadata`** — the sole metadata source is the root layout. This makes unique on-page SEO metadata structurally impossible today. | all pages |
| 3.3 | Medium | No `<meta name="robots">` / `X-Robots-Tag` configured anywhere (defaults allow indexing, but no explicit control, no `max-image-preview`, `nositelinkssearchbox`, etc.). | all pages |
| 3.4 | Medium | **`/resources` is thin, client-only "mock" content** (3 hard-coded products, simulated payments, `alert()` UX) → high risk of being flagged "Crawled – currently not indexed" / low-quality. | `app/resources/page.tsx` |
| 3.5 | Info | All routes are pre-rendered static HTML (good); no client-only rendering blocking crawlers. Single-language site — hreflang not required. | build output |

---

## 4. XML Sitemaps & robots.txt

| # | Severity | Issue |
|---|----------|-------|
| 4.1 | **High** | **No XML sitemap** — no `app/sitemap.ts` and no `public/sitemap.xml`. Search engines must discover pages purely via internal links. |
| 4.2 | **High** | **No `robots.txt`** — no `app/robots.ts` and no `public/robots.txt`. No explicit crawl directives and **no sitemap URL declared** in robots. |
| 4.3 | Info | To implement, the production domain (www vs non-www, http vs https) must be known; currently no evidence of the canonical host in the repo. |

---

## 5. Broken Links & 404 Errors

| # | Severity | Issue | Location |
|---|----------|-------|----------|
| 5.1 | **High** | **Footer contains many dead `href="#"` links** — `Our Story, Ministries, Giving, Resources, Locations` and `Grace Cell Groups, Volunteer, Missions, Youth Ministry, Events` and `Privacy, Terms, Staff Login`. Notably the footer "Resources" item does **not** link to `/resources`. | `app/components/footer.tsx:52-88` |
| 5.2 | Medium | **No custom 404 page** — no `app/not-found.tsx`, so visitors hitting any missing URL get the generic Next.js default 404 (thin, unstyled, poor for GSC "404" handling). | — |
| 5.3 | Medium | **Leftover/stale template content** in the contact flow: success/error messages reference `smartGreen`/`smartenv`/`support@smartenv.com`; the API route says "SmartEnv Website" and sends to hard-coded `rolandmario2@gmail.com`, while the site/emails tell users to contact `info@springsofdivinegrace.com`. Risk that the recipient address is wrong/stale. | `app/contact/page.tsx:118-125`, `app/api/contact/route.ts:28-43` |
| 5.4 | Low | External avatar service `i.pravatar.cc` is a third-party dependency that can fail/404 independently of the site. | `app/page.tsx:98` |


---

## 6. Redirects

| # | Severity | Issue |
|---|----------|-------|
| 6.1 | Info/Medium | **No redirect configuration exists** (no `next.config.ts` `redirects`, no `vercel.json`, no middleware). Not yet harmful for a pre-launch site, but there is **no handling for canonical-host enforcement**: www↔non-www, trailing-slash normalisation, and (if the domain was previously live) any legacy URL → 301 mapping. Decide the canonical host and add redirects + enforce https. |

---

## 7. URL Structure

| # | Severity | Issue |
|---|----------|-------|
| 7.1 | Positive | Clean, flat, lowercase kebab-case URLs: `/`, `/about`, `/contact`, `/join`, `/resources`. Keep this. |
| 7.2 | Low | `/join` is labelled "Get Involved" in nav and reached from a "Join Us This Sunday" hero CTA — naming mismatch but not a structural problem. |
| 7.3 | Medium | **Resources have no individually indexable URLs** — all products live in a single client-side array, so each book/journal/hymnal cannot be ranked independently. |
| 7.4 | Low | No canonicalisation of trailing slashes (depends on host defaults). |

---

## 8. Canonical Tags & Indexing Directives

| # | Severity | Issue |
|---|----------|-------|
| 8.1 | **High** | **No canonical tags on any page** (verified 0 occurrences in all built pages). No self-referencing canonicals, no duplicate-URL consolidation. |
| 8.2 | Medium | **No `robots` meta / X-Robots-Tag** anywhere — indexing/archiving/snippet directives (index, follow, max-snippet, noarchive) are not controlled. |
| 8.3 | Medium | **Near-duplicate page signals** (identical title+description on all pages) with no canonical → engines may treat them as duplicate content. Canonical host not enforced (see 6.1). |
| 8.4 | Info | No hreflang needed (single language, currently). |


---

## 9. Website Structure & HTML Implementation

| # | Severity | Issue | Location |
|---|----------|-------|----------|
| 9.1 | **High** | **Invalid HTML: an interactive `<button>` wraps an `<a>`** in both hero CTAs. Interactive-inside-interactive is invalid; browsers may re-parent/relocate the anchor, breaking navigation and accessibility. | `app/page.tsx:76-87` |
| 9.2 | Medium | **Dead/buttonless controls** — "Give Now" (navbar), "Support Missions", "View Full Calendar" are buttons with no action → misleading, non-functional. | navbar, join, page |
| 9.3 | Medium | Homepage lacks a semantic `<main>` wrapper (it is a `<div>`), whereas other pages use `<main>` — minor structural inconsistency. | `app/page.tsx:41` |
| 9.4 | Medium | Navbar navigation items use plain `<a href>` instead of Next `<Link>` → full page reloads on every nav (slower perceived navigation and worse route-change LCP/INP), plus no preloaded route chunks. | `app/components/navbar.tsx:69,105` |
| 9.5 | Low/Med | **7 ESLint errors** for unescaped apostrophes/quotes (`react/no-unescaped-entities`) — can yield malformed markup in produced HTML; fix with `&apos;`/`&quot;`. | `page.tsx:72,129`, `about:65,69`, `join:74` |
| 9.6 | Low | Accessibility gaps: mobile menu button lacks ARIA; images have generic/duplicate alt ("Impact", "Community", "Member", "Picture of the author" repeated 3×). | navbar, about, resources |
| 9.7 | Low | Only a 48×48 `favicon.ico` exists — no `apple-touch-icon`, no larger PNG, no `manifest.webmanifest`, no `theme-color`. | `app/favicon.ico` |
| 9.8 | Info | `lang="en"` is set on `<html>` (good). Favicon is auto-served. |

---

## 10. Structured Data / Schema

| # | Severity | Issue |
|---|----------|-------|
| 10.1 | **High** | **No structured data (JSON-LD) anywhere** — no `Organization`, `WebSite` (+`SearchAction`), `LocalBusiness`/`Church`, `Event`, `BreadcrumbList`, or `FAQPage`. A church site has strong schema opportunities it is currently missing. |
| 10.2 | Info | Great candidates present in content: physical locations/addresses (Sagamu, Ogun State) on `/join`, weekly service times (Event), the org name/description. |
| 10.3 | Info | **No Open Graph / Twitter card tags** on any page → poor/uncontrolled social-share previews (OG lives under metadata, currently absent — confirmed 0 `og:` in all pages). |


---

## 11. Image Optimisation (Technical)

| # | Severity | Issue | Location |
|---|----------|-------|----------|
| 11.1 | **High** | Hero + several images use **raw `<img>`** instead of `next/image` → no modern formats, no compression, **no `width`/`height` (CLS)**. | `app/page.tsx:48,98,113` |
| 11.2 | **High** | **1.44 MB PNG** (`prayer_journal.png`) rendered at 500×500 without `sizes` → huge bandwidth; should be a compressed JPEG/WebP/AVIF at realistic dimensions. | `public/prayer_journal.png`, `resources/page.tsx:143` |
| 11.3 | Medium | **JFIF extension used for photos** (`/rest.jfif`) — non-standard naming, tiny source (275×183) stretched on the homepage → poor quality. Photos should be standard **JPG/WebP/AVIF**. | `public/rest.jfif` |
| 11.4 | Medium | No `sizes`/`srcset` anywhere; no `loading="lazy"` for below-fold content; no `priority` strategy beyond Next's default hero preload. | resources, about |
| 11.5 | Low | **Unused/duplicate images** in `public/` add repo weight: `hymnal.jpeg`, `prayer_journal.jpeg`, `restoration.jfif`, `restoration2.jpg` are not referenced in any page. | `public/` |
| 11.6 | Low | Non-descriptive filenames & generic/duplicative `alt` text (`Picture of the author` ×3) hurt image SEO. | resources |
| 11.7 | Info | No `next.config` `images.remotePatterns` configured; if migrating to `next/image` for the `i.pravatar.cc` avatars (or removing them), this must be added. | `next.config.ts` |

---

## 12. HTTPS & Security

| # | Severity | Issue | Location |
|---|----------|-------|----------|
| 12.1 | Medium | **No security headers configured** — `next.config.ts` has no `headers()` for HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, or CSP. (Host, if Vercel, supplies basic https redirect by default, but headers/CSP should be explicit.) | `next.config.ts` |
| 12.2 | **High** | **Contact email route is unsafe/leaky:** user-supplied `name`, `email`, `subject`, and `message` are interpolated directly into the HTML email with **no escaping** (HTML/header-injection & XSS-in-email risk), all sent via GMail SMTP with a plain password (`EMAIL_PASS`), and delivered to a **hard-coded `rolandmario2@gmail.com`**. No OAuth2/app-password/auth-layer, no allow-listed recipient. | `app/api/contact/route.ts:7-48` |
| 12.3 | Medium | **No rate limiting / spam protection / CAPTCHA / honeypot** on `/api/contact` → the endpoint is open to abuse and mail bombing. | `app/api/contact/route.ts` |
| 12.4 | Medium | **External social links use `target="_blank"` without `rel="noopener noreferrer"`** (reverse-tabnabbing); only the homepage YouTube link is protected. | `footer.tsx:42`, `contact/page.tsx:71` |
| 12.5 | Info | Env secrets correctly git-ignored (`.gitignore` excludes `.env*`) — good; but note the route also reveals a "SmartEnv" fallback brand (stale template). No HTTPS-enforcement config in-app (assume host). | `.gitignore`, route |


---

## 13. Google Search Console (GSC) — Expected Technical Issues

| # | Severity | Likely GSC finding | Cause in code |
|---|----------|--------------------|---------------|
| 13.1 | **High** | **"Duplicate title tags"** for all pages | All 5 pages emit identical `<title>SODGEM</title>` (3.1) |
| 13.2 | **High** | **"Sitemap could not be fetched / no sitemap detected"** | No `sitemap.ts` / `robots.txt` (4.1, 4.2) |
| 13.3 | **High** | **"Duplicate without user-selected canonical"** | No canonical tags (8.1) |
| 13.4 | Medium | **"404 (Not found)"** crawl errors / poor 404 experience | No custom `not-found.tsx`; dead `href="#"` links (5.1, 5.2) |
| 13.5 | Medium | **"Crawled – currently not indexed"** | Thin `/resources` client-only mock store (3.4) |
| 13.6 | Medium | **Image not indexed / low image quality** | Generic & duplicate `alt`, non-optimised raw `<img>` (11.x) |
| 13.7 | Medium | **Missing/incorrect Open Graph & Schema** (rich-result eligibility) | No `og:`/JSON-LD (10.x) |
| 13.8 | Info | **Page-experience / Core Web Vitals Lab** below threshold | CLS from no image dimensions, heavy 1.44 MB PNG, external avatar requests (1.x) |
| 13.9 | Info | Search Console **verification** not present as a meta tag/file; if meta verification is preferred, it belongs in the root layout head (currently absent). | `app/layout.tsx` |

---

## Recommended Priority Fix Order

1. **Metadata & indexing (highest ranking impact):** convert pages to allow `generateMetadata`/`metadata` per route; add unique `<title>` + `<meta description>` per page; add canonical, robots meta, Open Graph, and Twitter tags in layout/metadata.
2. **Sitemap + robots:** add `app/sitemap.ts` and `app/robots.ts` once the production domain is fixed; declare the sitemap in robots.
3. **Core Web Vitals:** use `next/image` for the hero/other images with `width`/`height` + `priority`/`lazy` + `sizes`; remove/optimise the 1.44 MB PNG to WebP/AVIF; drop the external `i.pravatar.cc` preloads.
4. **Structured data:** add JSON-LD `Organization`, `WebSite`, `LocalBusiness`/`Church`, `Event` (service times), `BreadcrumbList`.
5. **404 + links:** add `app/not-found.tsx`; replace dead `href="#"` footer links with real routes or remove; fix `<button>`-wrapping-`<a>` invalid nesting.
6. **HTTPS/security:** fix escaping + recipient in `/api/contact`, use OAuth/app-password SMTP or an email provider, add rate limiting/spam protection, add `rel="noopener noreferrer"` to social links, and add security headers in `next.config.ts`.
7. **Cleanup:** remove unused images/imports, fix ESLint unescaped-entity errors, add favicon variants/manifest, set canonical host + redirects.

