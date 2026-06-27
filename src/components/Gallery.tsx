import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { isR2Photo, type Photo } from "../data/photos";
import { r2DefaultSrc, r2Srcset } from "../lib/utils";

interface Props {
  photos: Photo[];
}

const GRID_SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw";

function PhotoSources({ photo }: { photo: Photo }) {
  if (isR2Photo(photo)) {
    return (
      <>
        <source
          type="image/avif"
          srcSet={r2Srcset(photo, "avif")}
          sizes={GRID_SIZES}
        />
        <source
          type="image/webp"
          srcSet={r2Srcset(photo, "webp")}
          sizes={GRID_SIZES}
        />
      </>
    );
  }
  return null;
}

function photoSrc(photo: Photo): string {
  return isR2Photo(photo) ? r2DefaultSrc(photo) : photo.src;
}

export default function Gallery({ photos }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const show = useCallback(
    (dir: number) =>
      setActive((i) =>
        i === null ? i : (i + dir + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(1);
      else if (e.key === "ArrowLeft") show(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, show]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <li key={photoSrc(photo)}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open photo: ${photo.alt}`}
              className="group border-border bg-surface block w-full overflow-hidden rounded-lg border transition-transform duration-300 hover:-translate-y-1"
            >
              <picture>
                <PhotoSources photo={photo} />
                <img
                  src={photoSrc(photo)}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </picture>
            </button>
          </li>
        ))}
      </ul>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[active].alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={22} aria-hidden />
          </button>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                show(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft size={24} aria-hidden />
            </button>
          )}

          <figure
            className="max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <picture>
              <PhotoSources photo={photos[active]} />
              <img
                src={photoSrc(photos[active])}
                alt={photos[active].alt}
                className="max-h-[80vh] w-auto rounded-lg object-contain"
              />
            </picture>
            {photos[active].caption && (
              <figcaption className="mt-3 text-center font-mono text-sm text-white/80">
                {photos[active].caption}
              </figcaption>
            )}
          </figure>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                show(1);
              }}
              aria-label="Next photo"
              className="absolute right-4 bottom-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:bottom-auto"
            >
              <ChevronRight size={24} aria-hidden />
            </button>
          )}
        </div>
      )}
    </>
  );
}
