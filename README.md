# Varun Nair / Northstar Ventures — portfolio site

Single-page site built from `North star ventures final.fig` with Next.js, TypeScript and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

Next.js telemetry is disabled in the npm scripts (`NEXT_TELEMETRY_DISABLED=1`).

## Where to edit

- `src/content/site.ts`: all copy that changes: courses, videos, stats, contact links and testimonials.
  Every link currently points to `PLACEHOLDER_URL` (`https://example.com`). Replace them there.
- `src/assets/`: images (optimised by `next/image` at build/runtime).
- `public/logo-*.svg`, `public/whatsapp.svg`: logos.

## Structure

Sections are server components. Only the interactive parts ship JavaScript:

| Client component | Purpose |
| --- | --- |
| `RevealObserver` | One IntersectionObserver for all `[data-reveal]` fade/slide-ins |
| `CountUp` | Random-digit number animation for the About stats |
| `CourseAccordion` | Expand/collapse course categories |
| `ShowMore` | Watch & Read "Show More / Show Less" |
| `testimonials/Testimonials` | Sticky scroll through cards (`motion`) |
| `testimonials/TestimonialsModal` | "Show All" popup carousel (`embla-carousel-react`), loaded on demand |
| `MobileMenu` | Full-screen mobile navigation |

The marquee and hero title rotator are pure CSS.
