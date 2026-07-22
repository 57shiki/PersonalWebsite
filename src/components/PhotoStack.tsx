import { useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { photos, isR2Photo, type Photo } from "../data/photos";
import { r2DefaultSrc, r2Srcset } from "../lib/utils";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SIZES = "(min-width: 768px) 20vw, 40vw";

type Side = "left" | "right";
type SlotName = Side | "center";

// Flex-grow ratios drive width (and, via the 9:16 aspect-ratio, height) —
// every card fills the row's available width, so sizing scales continuously
// with whatever space the wrapping container has, no fixed breakpoints.
//
// `z` makes the center card lead: during a swap the incoming (side → center)
// card inherits the high z the instant it becomes `center`, so it slides in
// FRONT of the outgoing card as the two cross paths — the expanding photo is
// the hero, the shrinking one recedes behind it. Flex items honour z-index
// without needing positioning.
const SLOT_STYLE: Record<
  SlotName,
  { grow: number; opacity: number; z: number }
> = {
  left: { grow: 1, opacity: 0.55, z: 10 },
  center: { grow: 1.5, opacity: 1, z: 20 },
  right: { grow: 1, opacity: 0.55, z: 10 },
};

function photoKey(photo: Photo): string {
  return isR2Photo(photo) ? photo.base : photo.src;
}

function photoSrc(photo: Photo): string {
  return isR2Photo(photo) ? r2DefaultSrc(photo) : photo.src;
}

function PhotoFace({ photo }: { photo: Photo }) {
  return (
    <picture>
      {isR2Photo(photo) && (
        <>
          <source
            type="image/avif"
            srcSet={r2Srcset(photo, "avif")}
            sizes={SIZES}
          />
          <source
            type="image/webp"
            srcSet={r2Srcset(photo, "webp")}
            sizes={SIZES}
          />
        </>
      )}
      <img
        src={photoSrc(photo)}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </picture>
  );
}

export default function PhotoStack() {
  const [slots, setSlots] = useState<Record<SlotName, Photo>>({
    left: photos[0],
    center: photos[1],
    right: photos[2],
  });

  function promote(side: Side) {
    setSlots((s) => ({ ...s, center: s[side], [side]: s.center }));
  }

  // Render all three from a single keyed array (same element type and DOM
  // order throughout) so React recognizes a photo moving between a side and
  // the center as the *same* persisting element, not a remount — that's what
  // lets Motion's `layout` prop smoothly animate its new width/height/opacity
  // across the swap instead of snapping.
  const rendered = (["left", "center", "right"] as const).map((name) => ({
    name,
    photo: slots[name],
  }));

  return (
    <MotionConfig reducedMotion="user">
      <div className="photo-stack flex aspect-4/3 w-full items-center gap-2 md:aspect-auto md:min-h-48 md:flex-1">
        <span aria-live="polite" className="sr-only">
          Now showing: {slots.center.alt}
        </span>

        {rendered.map(({ name, photo }) => {
          const style = SLOT_STYLE[name];
          const interactive = name !== "center";
          return (
            <motion.button
              key={photoKey(photo)}
              layout
              type="button"
              tabIndex={interactive ? 0 : -1}
              onClick={interactive ? () => promote(name as Side) : undefined}
              aria-label={
                interactive ? `Show ${photo.alt} in the center` : undefined
              }
              aria-hidden={interactive ? undefined : true}
              className={`border-border bg-surface m-0 aspect-9/16 min-w-0 overflow-hidden rounded-xl border p-0 ${
                interactive
                  ? "hover:border-accent-strong focus-visible:border-accent-strong cursor-pointer appearance-none bg-transparent"
                  : "cursor-default appearance-none bg-transparent"
              }`}
              style={{
                flexGrow: style.grow,
                flexShrink: 1,
                flexBasis: 0,
                zIndex: style.z,
                pointerEvents: interactive ? "auto" : "none",
              }}
              animate={{ opacity: style.opacity }}
              whileHover={interactive ? { opacity: 0.8 } : undefined}
              whileFocus={interactive ? { opacity: 0.8 } : undefined}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
            >
              <PhotoFace photo={photo} />
            </motion.button>
          );
        })}
      </div>
    </MotionConfig>
  );
}
