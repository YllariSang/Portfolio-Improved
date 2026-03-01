"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollFx() {
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!progressRef.current) {
      return;
    }

    const element = progressRef.current;
    let rafId = 0;
    gsap.set(element, { scaleX: 0, transformOrigin: "0% 50%" });
    const setProgress = gsap.quickTo(element, "scaleX", {
      duration: 0.22,
      ease: "power2.out",
    });

    const updateProgress = () => {
      const root = document.documentElement;
      const maxScroll = root.scrollHeight - root.clientHeight;
      const current = window.scrollY;
      const ratio = maxScroll > 0 ? current / maxScroll : 0;
      setProgress(Math.max(0, Math.min(1, ratio)));
    };

    const scheduleUpdate = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" />
    </>
  );
}
