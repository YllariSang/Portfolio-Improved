"use client";

import Image from "next/image";
import { type KeyboardEvent, useEffect, useState } from "react";

type TributeFrame = {
  src: string;
  alt: string;
  tag: string;
  artist: string;
  sourceUrl: string;
};

type AnemoImageCarouselProps = {
  frames: TributeFrame[];
};

export default function AnemoImageCarousel({ frames }: AnemoImageCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [viewportMode, setViewportMode] = useState<"mobile" | "tablet" | "desktop">("desktop");

  if (frames.length === 0) {
    return null;
  }

  useEffect(() => {
    const updateViewportMode = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setViewportMode("mobile");
        return;
      }

      if (window.matchMedia("(max-width: 1024px)").matches) {
        setViewportMode("tablet");
        return;
      }

      setViewportMode("desktop");
    };

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);

    return () => {
      window.removeEventListener("resize", updateViewportMode);
    };
  }, []);

  const baseCount = viewportMode === "mobile" ? 1 : viewportMode === "tablet" ? 2 : 3;
  const visibleCount = Math.min(baseCount, frames.length);
  const step = visibleCount;
  const showControls = frames.length > visibleCount;

  const visibleFrames = Array.from({ length: visibleCount }, (_, offset) => {
    const index = (startIndex + offset) % frames.length;
    return {
      frame: frames[index],
      index,
    };
  });

  const handlePrev = () => {
    setStartIndex((previous) => (previous - step + frames.length) % frames.length);
  };

  const handleNext = () => {
    setStartIndex((previous) => (previous + step) % frames.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }
  };

  return (
    <section className="mt-8" aria-label="Venti tribute image carousel">
      <div
        className="relative border border-unbeatable-white/30 bg-industrial-black/88 p-3"
        style={{
          clipPath:
            "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
        }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
          }}
        >
          {visibleFrames.map(({ frame, index }) => (
            <figure key={`${frame.src}-${index}`} className="min-w-0">
              <div className="relative aspect-[3/4] overflow-hidden border border-unbeatable-white/25 bg-black/70">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes={viewportMode === "mobile"
                    ? "(max-width: 640px) 100vw, 100vw"
                    : viewportMode === "tablet"
                      ? "(max-width: 1024px) 50vw, 50vw"
                      : "(max-width: 1536px) 33vw, 320px"}
                  className="object-cover"
                />
              </div>

              <figcaption className="mt-3 border border-unbeatable-white/25 bg-industrial-black/70 px-2 py-2">
                <p className="micro-tag text-unbeatable-white/75">{frame.tag}</p>
                <p className="mt-1 text-[0.64rem] uppercase tracking-[0.12em] text-unbeatable-white/70">
                  [ARTIST_CREDIT] {frame.artist}
                </p>
                <a
                  href={frame.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block break-all text-[0.64rem] uppercase tracking-[0.1em] text-unbeatable-white/82 hover:text-zzz-yellow"
                  aria-label={`Open source for ${frame.alt}`}
                >
                  {frame.sourceUrl}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {showControls ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={handlePrev} className="glitch-button w-[calc(50%-0.375rem)] justify-center sm:w-auto">
            PREV
          </button>
          <button type="button" onClick={handleNext} className="glitch-button w-[calc(50%-0.375rem)] justify-center sm:order-3 sm:w-auto">
            NEXT
          </button>
          <p className="micro-tag order-3 w-full border border-unbeatable-white/25 bg-industrial-black/70 px-3 py-2 text-center text-unbeatable-white/78 sm:order-2 sm:w-auto">
            [SHOWING_{String(startIndex + 1).padStart(2, "0")}-{String(
              ((startIndex + visibleCount - 1) % frames.length) + 1,
            ).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}]
          </p>
        </div>
      ) : null}
    </section>
  );
}
