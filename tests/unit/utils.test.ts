import { describe, it, expect } from "vitest";
import { cx, r2Srcset, r2DefaultSrc, wrapOffset } from "../../src/lib/utils";
import { PHOTO_WIDTHS, type R2Photo } from "../../src/data/photos";

const photo: R2Photo = {
  base: "https://img.example.com/sunset",
  width: 1600,
  height: 900,
  alt: "A sunset.",
};

// The pure helpers in lib/utils have no I/O — these tests lock their string
// output and the circular-offset math the gallery carousel relies on.
describe("lib/utils", () => {
  // ── cx ──────────────────────────────────────────────────────────────────
  describe("cx", () => {
    it("joins truthy class names with a single space", () => {
      expect(cx("a", "b", "c")).toBe("a b c");
    });

    it("drops false, null and undefined values", () => {
      expect(cx("a", false, null, undefined, "b")).toBe("a b");
    });

    it("drops empty strings", () => {
      expect(cx("", "a", "")).toBe("a");
    });

    it("returns an empty string when given nothing truthy", () => {
      expect(cx(false, null, undefined)).toBe("");
    });
  });

  // ── r2Srcset ────────────────────────────────────────────────────────────
  describe("r2Srcset", () => {
    it("builds a srcset for every configured width in avif", () => {
      expect(r2Srcset(photo, "avif")).toBe(
        PHOTO_WIDTHS.map((w) => `${photo.base}-${w}.avif ${w}w`).join(", "),
      );
    });

    it("uses the requested format in each entry", () => {
      const out = r2Srcset(photo, "webp");
      expect(out).toContain(".webp ");
      expect(out).not.toContain(".avif");
    });

    it("emits one descriptor per configured width", () => {
      expect(r2Srcset(photo, "webp").split(",")).toHaveLength(
        PHOTO_WIDTHS.length,
      );
    });
  });

  // ── r2DefaultSrc ──────────────────────────────────────────────────────────
  describe("r2DefaultSrc", () => {
    const largest = PHOTO_WIDTHS[PHOTO_WIDTHS.length - 1];

    it("points at the largest variant and defaults to webp", () => {
      expect(r2DefaultSrc(photo)).toBe(`${photo.base}-${largest}.webp`);
    });

    it("honours an explicit avif format", () => {
      expect(r2DefaultSrc(photo, "avif")).toBe(`${photo.base}-${largest}.avif`);
    });
  });

  // ── wrapOffset ────────────────────────────────────────────────────────────
  describe("wrapOffset", () => {
    it("is 0 when the index is the active one", () => {
      expect(wrapOffset(2, 2, 5)).toBe(0);
    });

    it("returns the forward distance for a nearby index", () => {
      expect(wrapOffset(3, 2, 5)).toBe(1);
      expect(wrapOffset(4, 2, 5)).toBe(2);
    });

    it("wraps backwards for the shorter path around the ring", () => {
      // In a ring of 5, index 0 is 2 steps back from active 3, not 3 forward.
      expect(wrapOffset(0, 3, 5)).toBe(2);
      expect(wrapOffset(1, 4, 5)).toBe(2);
    });

    it("returns a negative offset for indices just behind active", () => {
      expect(wrapOffset(1, 2, 5)).toBe(-1);
      expect(wrapOffset(4, 0, 5)).toBe(-1);
    });

    it("is symmetric around the ring", () => {
      // Wrapping the last element relative to the first, and vice versa.
      expect(wrapOffset(0, 4, 5)).toBe(1);
      expect(wrapOffset(4, 0, 5)).toBe(-1);
    });

    it("keeps every offset within (-total/2 … +total/2]", () => {
      const total = 5;
      for (let active = 0; active < total; active++) {
        for (let i = 0; i < total; i++) {
          const d = wrapOffset(i, active, total);
          expect(d).toBeGreaterThan(-total / 2);
          expect(d).toBeLessThanOrEqual(total / 2);
        }
      }
    });
  });
});
