import { test, expect, type Page } from "@playwright/test";

// ── Helpers ────────────────────────────────────────────────────────────────

// Collects meaningful client-side failures: uncaught exceptions (pageerror)
// and console.error calls. Missing static assets (e.g. an unconfigured
// og-image) surface as "Failed to load resource" console errors that are not
// page defects, so those are filtered out.
function collectErrors(page: Page): { errors: string[] } {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (/Failed to load resource/i.test(text)) return;
    errors.push(`console: ${text}`);
  });
  return { errors };
}

// ── Tests ──────────────────────────────────────────────────────────────────

test.describe("Static pages smoke", () => {
  // P.1: Home page loads with the right document title, a working résumé link,
  // and no client-side errors.
  test("P.1 – home page renders with title, résumé link, and no errors", async ({
    page,
  }) => {
    const { errors } = collectErrors(page);

    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle("Shiqi Hu (Steven)");

    // The résumé link points at the R2-backed API route.
    await expect(
      page.locator('a[href="/api/resume"]').first(),
    ).toBeVisible();

    // Let late hydration/console output settle before asserting.
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  // P.2: An unknown route serves the custom 404 page with a 404 status.
  test("P.2 – unknown route serves the custom 404 page", async ({ page }) => {
    const res = await page.goto("/this-route-does-not-exist-xyz");
    expect(res?.status()).toBe(404);
    await expect(page).toHaveTitle(/404/);
    await expect(
      page.getByRole("heading", { name: /wandered off/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /back home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  // P.3: The privacy policy page loads with its heading and title.
  test("P.3 – privacy policy page renders", async ({ page }) => {
    const { errors } = collectErrors(page);

    const res = await page.goto("/privacy-policy");
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Privacy Policy/);
    await expect(
      page.getByRole("heading", { name: /^privacy policy$/i, level: 1 }),
    ).toBeVisible();

    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});
