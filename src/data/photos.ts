interface PhotoBase {
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

/** A single static image (committed asset or any direct URL). */
export interface StaticPhoto extends PhotoBase {
  src: string;
}

/**
 * An R2-hosted photo. `base` is the URL/key without size suffix, e.g.
 * "https://img.shiqihu.com/sunset". `npm run photos` uploads
 * <base>-480.avif/.webp, <base>-960.*, <base>-1600.* and the gallery
 * builds a responsive <img srcset> from it.
 */
export interface R2Photo extends PhotoBase {
  base: string;
}

export type Photo = StaticPhoto | R2Photo;

export const PHOTO_WIDTHS = [480, 960, 1600] as const;

export function isR2Photo(photo: Photo): photo is R2Photo {
  return "base" in photo;
}

export const photos: Photo[] = [
  {
    base: "https://img.shiqihu.com/iceland-black-sand-beach",
    width: 666,
    height: 1182,
    alt: "Black sand beach in Iceland with crashing waves.",
    caption: "Iceland · black sand beach",
  },
  {
    base: "https://img.shiqihu.com/iceland-glacier",
    width: 1328,
    height: 2364,
    alt: "Glacier in Iceland under an overcast sky.",
    caption: "Iceland · glacier",
  },
  {
    base: "https://img.shiqihu.com/iceland-mountain",
    width: 5910,
    height: 3324,
    alt: "Mountain range in Iceland.",
    caption: "Iceland · mountains",
  },
  {
    base: "https://img.shiqihu.com/iceland-tundra",
    width: 5712,
    height: 3213,
    alt: "Open tundra landscape in Iceland.",
    caption: "Iceland · tundra",
  },
  {
    base: "https://img.shiqihu.com/tampa-bridge",
    width: 8064,
    height: 4536,
    alt: "Bridge over the bay in Tampa.",
    caption: "Tampa · bridge",
  },
];

/** Personal shots for the contact section's photo stack — separate bucket from the gallery above. */
export const mePhotos: Photo[] = [
  {
    base: "https://img-me.shiqihu.com/me-1",
    width: 803,
    height: 1427,
    alt: "Standing on the shore at Montauk as the sun sets over the water.",
  },
  {
    base: "https://img-me.shiqihu.com/me-2",
    width: 1600,
    height: 2844,
    alt: "Showing off my undying love for a bottle of Coca-Cola.",
  },
  {
    base: "https://img-me.shiqihu.com/me-3",
    width: 608,
    height: 1080,
    alt: "Hiking a trail in Acadia National Park.",
  },
];
