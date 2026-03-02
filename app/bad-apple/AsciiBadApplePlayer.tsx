"use client";

import { decompressFromBase64 } from "lz-string";
import { useEffect, useRef, useState } from "react";

type AsciiFramesPayload = {
  fps: number;
  frames: string[];
};

type CompressedFramesData = string[];

const fallbackFrame = `
████████████████████████████████████████
█████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█████
█████░░ BAD APPLE ASCII FEED LOADING ░██
█████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█████
████████████████████████████████████████
`;

export default function AsciiBadApplePlayer() {
  const [payload, setPayload] = useState<AsciiFramesPayload>({ fps: 30, frames: [fallbackFrame] });
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSizePx, setFontSizePx] = useState(7.5);
  const [displayHeightPx, setDisplayHeightPx] = useState(420);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch("/bad-apple/framesData.lz")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Compressed frame payload missing");
        }
        return response.text();
      })
      .then((compressedText) => {
        const decompressed = decompressFromBase64(compressedText.trim());

        if (!decompressed) {
          throw new Error("Frame payload decompression failed");
        }

        const decodedFrames = JSON.parse(decompressed) as CompressedFramesData;

        if (!mounted || !Array.isArray(decodedFrames) || decodedFrames.length === 0) {
          return;
        }

        setPayload({ fps: 30, frames: decodedFrames });
        setFrameIndex(0);
      })
      .catch(() => {
        setPayload({ fps: 30, frames: [fallbackFrame] });
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const adjustDisplaySize = () => {
      const host = containerRef.current;
      if (!host) {
        return;
      }

      const aspectRatio = 4 / 3;
      const hostWidth = host.clientWidth;
      const maxHeight = window.innerHeight * 0.72;

      let displayWidth = hostWidth;
      let displayHeight = displayWidth / aspectRatio;

      if (displayHeight > maxHeight) {
        displayHeight = maxHeight;
        displayWidth = displayHeight * aspectRatio;
      }

      const nextFontSize = Math.max(4.6, displayWidth / 62);

      setDisplayHeightPx(displayHeight);
      setFontSizePx(nextFontSize);
    };

    adjustDisplaySize();

    const resizeObserver = new ResizeObserver(() => {
      adjustDisplaySize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", adjustDisplaySize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", adjustDisplaySize);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || payload.frames.length < 2) {
      return;
    }

    const frameDuration = 1000 / Math.max(1, payload.fps);
    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = now - startTime;
      const expectedFrame = Math.floor(elapsed / frameDuration);

      if (expectedFrame < payload.frames.length) {
        setFrameIndex(expectedFrame);
        rafRef.current = window.requestAnimationFrame(renderFrame);
        return;
      }

      setFrameIndex(payload.frames.length - 1);
      setIsPlaying(false);
    };

    rafRef.current = window.requestAnimationFrame(renderFrame);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying, payload.fps, payload.frames]);

  const onPlay = () => {
    setFrameIndex(0);
    setIsPlaying(true);
  };

  const currentFrame = payload.frames[frameIndex]?.replace(/\\n/g, "\n") ?? "";

  return (
    <section ref={containerRef} className="mt-6 border border-unbeatable-white/30 bg-industrial-black/88 p-4 md:p-6">
      <div className="flex items-center justify-between gap-2">
        <span className="micro-tag">[FRAME_SYNC]</span>
        <span className="micro-tag">[SILENT_MODE]</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="micro-tag">[FPS:{payload.fps}]</span>
        <button type="button" className="glitch-button" onClick={onPlay} disabled={isPlaying}>
          {isPlaying ? "PLAYING" : "PLAY / REPLAY"}
        </button>
      </div>

      <pre
        className="mt-4 overflow-hidden border border-unbeatable-white/25 bg-industrial-black/92 p-3 text-unbeatable-white/86"
        style={{
          height: `${displayHeightPx}px`,
          fontSize: `${fontSizePx}px`,
          lineHeight: 1.1,
          whiteSpace: "pre",
        }}
      >
        {currentFrame}
      </pre>
    </section>
  );
}
