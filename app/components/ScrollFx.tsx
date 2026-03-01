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

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" />
    </>
  );
}
