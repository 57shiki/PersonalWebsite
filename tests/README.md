# Test suite

Two layers of automated testing: unit tests for isolated logic and E2E tests for the integrated, in-browser experience. Coverage spans the contact feature, the resume API route, the shared `lib/utils` helpers, the theme toggle, the photo gallery lightbox, and static-page smoke checks.

CI (`.github/workflows/ci.yml`) runs three jobs on every PR to `main`: **Lint & Type Check** (`astro check` + `eslint`), **Unit Tests**, and **E2E Tests**.

Run all tests:

```bash
npm test                # unit + E2E
npm run test:unit       # Vitest only
npm run test:e2e        # Playwright only
```

---

## Unit tests — `unit/contact-form.test.tsx`

Tests the `ContactForm` React component in isolation using jsdom + React Testing Library. `fetch` is stubbed with Vitest; no real network calls are made.

### Section 1 — Client-side validation

| ID | Test |
|----|------|
| 1.1 | Shows "Please fill in all fields." and fires no `fetch` when all fields are empty |
| 1.2 | Shows "Please fill in all fields." and fires no `fetch` when only name is filled |
| 1.3 | Shows "Please fill in all fields." and fires no `fetch` when name + email are filled but message is empty |
| 1.4 | Shows "Please enter a valid email address." for `notanemail` |
| 1.5 | Shows "Please enter a valid email address." for `a@b` (no TLD) |
| 1.6 | Passes validation for `user@domain.com` and fires `fetch` |
| 1.7 | Button text changes to "Sending…" and becomes disabled while the request is in-flight |

### Section 2 — Honeypot

| ID | Test |
|----|------|
| 2.1 | Submits normally and calls `fetch` when the hidden company field is empty |
| 2.2 | Shows success card and does **not** call `fetch` when the honeypot field is filled |

### Section 8 — UI state machine

| ID | Test |
|----|------|
| 8.2 | Renders success card (`role="status"`) and "Thanks" message after a 200 response |
| 8.3 | Renders error alert (`role="alert"`) with the server's message and re-enables the submit button after a 500 response |
| 8.4 | Renders cap card with a `mailto:` link after a 503 `EMAIL_CAP_REACHED` response |
| 8.5 | Renders error alert with the error message on a network failure (fetch throws) |

---

## Unit tests — `unit/contact-api.test.ts`

Tests the `POST /api/contact` Cloudflare Worker handler directly, bypassing the HTTP layer. The handler is a thin proxy, so the upstream `fetch` to the Azure Function is stubbed and the Cloudflare `env` binding is mocked. Input validation, rate limiting, and Resend delivery live in the Azure Function and are covered in that service's own repository.

### Section 3 — Request forwarding

| ID | Test |
|----|------|
| 3.1 | Forwards a `POST` to `AZURE_CONTACT_URL` with `Content-Type: application/json` and the `X-Internal-Secret` header taken from `env` |
| 3.2 | Passes the request body through to Azure unchanged |

### Section 4 — Response pass-through

| ID | Test |
|----|------|
| 4.1 | Returns Azure's 200 status and `{ ok: true }` body |
| 4.2 | Passes through a 400 validation error from Azure |
| 4.3 | Passes through a 429 rate-limit response from Azure |
| 4.4 | Passes through a 503 `{ error: "EMAIL_CAP_REACHED" }` response from Azure |
| 4.5 | Always responds with `Content-Type: application/json`, verified on a 502 upstream failure |

---

## Unit tests — `unit/resume-api.test.ts`

Tests the `GET /api/resume` Cloudflare Worker handler directly. `env.RESUME_BUCKET` is mocked with a minimal R2-bucket-shaped stub so no real R2 access is made.

| Test |
|------|
| Requests `resume.pdf` from the bucket |
| Returns 200 with the object body and the PDF `Content-Type` / `Content-Disposition` / `Cache-Control` headers when the object is present |
| Returns 404 `Not Found` when the object is missing |

---

## Unit tests — `unit/utils.test.ts`

Pure helpers from `src/lib/utils.ts`, tested with no I/O or mocking.

| Function | Coverage |
|----------|----------|
| `cx` | Joins truthy class names; drops `false`/`null`/`undefined`/empty strings |
| `r2Srcset` | Builds one descriptor per configured width in the requested format |
| `r2DefaultSrc` | Points at the largest variant; defaults to webp, honours explicit avif |
| `wrapOffset` | Shortest circular offset for the carousel: identity, forward/backward distance, wrap-around, and the `(-total/2 … +total/2]` bound |

---

## Unit tests — `unit/theme-toggle.test.tsx`

Tests the `ThemeToggle` React component in jsdom. It seeds its state from the `<html data-theme>` attribute (set before paint by the inline script in `BaseLayout`) and mirrors changes to the DOM and `localStorage`.

| Test |
|------|
| Defaults to light when no `data-theme` is present |
| Seeds dark state from an existing `data-theme="dark"` |
| Mirrors the initial theme to the DOM and `localStorage` on mount |
| Toggles light → dark, updating the label, DOM attribute, and `localStorage` |
| Toggles back dark → light |
| Still applies the theme to the DOM when `localStorage.setItem` throws (private mode) |

---

## E2E tests — `e2e/contact.spec.ts`

Full browser tests using Playwright (Chromium). The Astro dev server is started automatically. `/api/contact` is intercepted by Playwright's `page.route()`, so no real emails are sent. The helper `gotoContactForm` scrolls the contact section into view to trigger Astro's `client:visible` hydration and waits for `form[data-hydrated]` (set by `useEffect` after React mounts) before interacting.

### Section 1 — Client-side validation (browser)

| ID | Test |
|----|------|
| 1.1 | Clicking submit with all fields empty shows `role="alert"` containing "Please fill in all fields." without making a network request |
| 1.4 | Filling an invalid email and submitting shows `role="alert"` containing "Please enter a valid email address." |

### Section 2 — Honeypot (browser)

| ID | Test |
|----|------|
| 2.2 | Setting the hidden `company` input via JS and submitting shows `role="status"` without making a network request |

### Section 8 — UI state machine (browser)

| ID | Test |
|----|------|
| 8.1 | Submit button shows "Sending…" text and is `disabled` while the mocked request is in-flight (400 ms delay) |
| 8.3 | A mocked 500 response shows `role="alert"` containing "Server error" and the submit button is re-enabled |
| 8.4 | A mocked 503 `EMAIL_CAP_REACHED` response shows `role="status"` containing "temporarily unavailable" and a `mailto:` link |

### Section 9 — Happy path (browser)

| ID | Test |
|----|------|
| 9 | A valid submission against a mocked 200 response shows `role="status"` and "Thanks" text |

---

## E2E tests — `e2e/gallery.spec.ts`

Full browser tests for the photo gallery lightbox. The `openGallery` helper disables the strip's infinite CSS marquee animation (so its buttons are stable and clickable, and the track is pinned to photo index 0) then opens the first photo, retrying until Astro's `client:visible` island has hydrated. Photo captions identify which image is in focus after navigating.

| ID | Test |
|----|------|
| G.1 | Clicking a strip photo opens the `role="dialog"` lightbox on that photo |
| G.2 | `ArrowRight` advances to the next photo |
| G.3 | `ArrowLeft` from the first photo wraps around to the last |
| G.4 | The "Next photo" button advances to the following photo |
| G.5 | `Escape` closes the lightbox |
| G.6 | The "Close photo viewer" button dismisses the lightbox |

---

## E2E tests — `e2e/pages.spec.ts`

Smoke tests for the static pages. `collectErrors` records uncaught exceptions and `console.error` calls (filtering out "Failed to load resource" noise from unconfigured static assets) so a page that throws on load fails the test.

| ID | Test |
|----|------|
| P.1 | Home page returns 200, has title `Shiqi Hu (Steven)`, shows a résumé link to `/api/resume`, and logs no client-side errors |
| P.2 | An unknown route returns a 404 status and renders the custom 404 page (title + "wandered off" heading + "Back home" link) |
| P.3 | `/privacy-policy` returns 200 with a `Privacy Policy` title and `PRIVACY POLICY` heading, and logs no client-side errors |
