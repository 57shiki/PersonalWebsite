import { PHOTO_WIDTHS, type R2Photo } from "../data/photos";

/** Join class names, dropping falsy values. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Build a responsive srcset for a given R2 photo + image format. */
export function r2Srcset(photo: R2Photo, format: "avif" | "webp"): string {
  return PHOTO_WIDTHS.map((w) => `${photo.base}-${w}.${format} ${w}w`).join(
    ", ",
  );
}

/** Default `src` (largest variant) used as the <img> fallback. */
export function r2DefaultSrc(
  photo: R2Photo,
  format: "webp" | "avif" = "webp",
): string {
  const largest = PHOTO_WIDTHS[PHOTO_WIDTHS.length - 1];
  return `${photo.base}-${largest}.${format}`;
}

/**
 * Shortest circular offset from `active` to index `i` in a ring of `total`
 * items, normalised to the range (-total/2 … +total/2]. Used by the gallery
 * carousel to lay out photos around the current one along the shortest path.
 */
export function wrapOffset(i: number, active: number, total: number): number {
  let d = (((i - active) % total) + total) % total;
  if (d > total / 2) d -= total;
  return d;
}

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "photography", label: "Photography" },
  { id: "contact", label: "Contact" },
] as const;
