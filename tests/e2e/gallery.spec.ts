import { test, expect, type Page } from "@playwright/test";

// ── Helpers ────────────────────────────────────────────────────────────────

// Captions rendered by the lightbox for the current photo, in gallery order.
// Used to assert which photo is in focus after navigating.
const CAPTIONS = {
  blackSand: /black sand beach/i,
  glacier: /glacier/i,
  tampaBridge: /Tampa · bridge/i,
};

function dialog(page: Page) {
  return page.getByRole("dialog", { name: /photo viewer/i });
}

// The strip is a client:visible island with no SSR-only fallback for its click
// handler, and there is no data-hydrated marker like the contact form has.
// Retry the open action until React has hydrated and the lightbox appears.
async function openGallery(page: Page) {
  await page.goto("/");
  // The strip runs an infinite CSS marquee animation, so Playwright never sees
  // its buttons as "stable" and clicks time out. Disable it, which also pins
  // the track at its start position so the first button is photo index 0.
  await page.addStyleTag({
    content: '[style*="gallery-scroll"] { animation: none !important; }',
  });
  await page.locator("#photography").scrollIntoViewIfNeeded();

  const firstPhoto = page
    .getByRole("button", { name: /Black sand beach in Iceland/i })
    .first();

  await expect(firstPhoto).toBeVisible({ timeout: 15_000 });
  await expect(async () => {
    await firstPhoto.click();
    await expect(dialog(page)).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 25_000 });
}

// ── Tests ──────────────────────────────────────────────────────────────────

test.describe("Photo gallery lightbox E2E", () => {
  // G.1: Clicking a strip photo opens the cinema lightbox on that photo.
  test("G.1 – opening a strip photo shows the lightbox for that photo", async ({
    page,
  }) => {
    await openGallery(page);
    await expect(dialog(page).getByText(CAPTIONS.blackSand)).toBeVisible();
  });

  // G.2: ArrowRight advances to the next photo.
  test("G.2 – ArrowRight advances to the next photo", async ({ page }) => {
    await openGallery(page);
    await page.keyboard.press("ArrowRight");
    await expect(dialog(page).getByText(CAPTIONS.glacier)).toBeVisible();
  });

  // G.3: ArrowLeft from the first photo wraps around to the last photo.
  test("G.3 – ArrowLeft from the first photo wraps to the last", async ({
    page,
  }) => {
    await openGallery(page);
    await page.keyboard.press("ArrowLeft");
    await expect(dialog(page).getByText(CAPTIONS.tampaBridge)).toBeVisible();
  });

  // G.4: The Next button navigates forward (non-keyboard path).
  test("G.4 – Next button advances to the following photo", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: /next photo/i }).click();
    await expect(dialog(page).getByText(CAPTIONS.glacier)).toBeVisible();
  });

  // G.5: Escape closes the lightbox.
  test("G.5 – Escape closes the lightbox", async ({ page }) => {
    await openGallery(page);
    await page.keyboard.press("Escape");
    await expect(dialog(page)).toBeHidden();
  });

  // G.6: The close button dismisses the lightbox.
  test("G.6 – close button dismisses the lightbox", async ({ page }) => {
    await openGallery(page);
    await page.getByRole("button", { name: /close photo viewer/i }).click();
    await expect(dialog(page)).toBeHidden();
  });
});
