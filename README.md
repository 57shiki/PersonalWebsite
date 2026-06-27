# shiqihu.com — Personal Portfolio

A fast, static-first personal portfolio for **Shiqi (Steven) Hu**, Full Stack Engineer.
Built with Astro and React islands, deployed on Azure Static Web Apps with a serverless
contact API and a Cloudflare R2 image pipeline.

🔗 **Live:** https://shiqihu.com

## Tech stack

| Layer | Technology | Why (engineering rationale) |
| --- | --- | --- |
| Framework | **Astro 5** | Static-first, ships zero JavaScript by default; renders the page as HTML/CSS for fast loads and strong SEO. |
| Interactivity | **React 19 islands** | Interactive pieces (theme toggle, gallery lightbox, contact form) hydrate independently via Astro islands, so JS is scoped to where it's needed. |
| Language | **TypeScript (strict)** | End-to-end type safety across UI, data, and the serverless API. |
| Styling | **Tailwind CSS v4** | Utility-first styling with a single design-token source of truth (CSS variables) driving light/dark themes. |
| Animation | **Motion** | Subtle, accessible entrance and hover motion; respects `prefers-reduced-motion`. |
| Icons | **lucide-react** | Tree-shakeable SVG icon set. |
| Hosting & CI/CD | **Azure Static Web Apps** | Integrated GitHub Actions pipeline, global CDN, free SSL, and a managed serverless API under one deployment. |
| API | **Azure Functions (Node 20, TS)** | The `/api/contact` endpoint validates input, applies a honeypot + rate limit, and sends email. |
| Media | **Cloudflare R2** | S3-compatible object storage serving a responsive AVIF/WebP image pipeline for the photography gallery. |
| Quality | **ESLint + Prettier + `astro check`** | Consistent, type-checked, lint-clean codebase. |

## Architecture

```
            ┌──────────────────────────────┐
 Visitor ──▶│  Azure Static Web Apps (CDN) │  ← Astro static build (dist/)
            │                              │
            │   /api/*  ──▶ Azure Functions│  ← POST /api/contact → email
            └──────────────┬───────────────┘
                           │ <img srcset>
                           ▼
                   Cloudflare R2 (AVIF/WebP photo variants)
```

- **App + API** ship together from this repo to Azure SWA (`output_location: dist`,
  `api_location: api`) via GitHub Actions.
- **Photography** images are optimized locally and served from Cloudflare R2 as responsive
  `<img srcset>` — no runtime image service.

## Project structure

```
src/
  components/   UI components (Astro) + React islands (.tsx)
  sections/     Page sections (Hero, About, Experience, Projects, Skills, Photography, Contact)
  layouts/      BaseLayout.astro (meta / OG / SEO, no-flash theme)
  data/         Content as typed data (profile, experience, projects, skills, photos)
  lib/          Helpers (responsive-image srcset, nav config)
  styles/       globals.css (Tailwind + design tokens)
  pages/        index.astro, 404.astro
api/            Azure Functions (contact endpoint)
scripts/        optimize-and-upload-photos.ts (sharp → AVIF/WebP → R2)
```

## Local development

```bash
npm install
npm run dev        # start the dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run check      # astro + TypeScript checks
npm run lint       # ESLint + Prettier
```

## Editing content

Content lives as typed data in `src/data/` — no component edits needed for routine updates.

- **Profile / tagline / socials:** `src/data/profile.ts`
- **Experience:** `src/data/experience.ts`
- **Projects:** `src/data/projects.ts`
- **Skills:** `src/data/skills.ts`
- **Résumé:** drop the PDF at `public/resume.pdf`; the "Résumé" buttons link to it automatically.
- **Photography:**
  1. Put web-sized source images in a local `photos/` folder (git-ignored).
  2. Run `npm run photos` to generate AVIF/WebP variants and upload them to Cloudflare R2.
  3. Add an entry (base URL, dimensions, alt, caption) to `src/data/photos.ts`.

## Configuration

Runtime configuration is provided through environment variables (see `.env.example` for the
variable names). Values are supplied via local `.env` for scripts and as Azure SWA
application settings in production.

## License

See [LICENSE](LICENSE).
