"use client";

import dynamic from "next/dynamic";

const TopologySphere = dynamic(() => import("./TopologySphere"), {
  ssr: false,
});

export default function HudLottie() {
  return (
    <div className="hud-lottie-wrap" aria-hidden>
      <div className="mb-1 flex items-center justify-between">
        <span className="micro-tag hud-lottie-label">[SIGNAL_CORE]</span>
        <span className="micro-tag">[DATA_LOAD: TOPOLOGY]</span>
      </div>
      <TopologySphere />
    </div>
  );
}
