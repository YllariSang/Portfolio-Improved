"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import SoundEffectsProvider from "./components/SoundEffectsProvider";
import { portfolioData } from "./data/portfolioData";

const PortfolioShell = dynamic(() => import("./components/PortfolioShell"), {
  ssr: false,
  loading: () => null,
});

const MinimalPortfolioShell = dynamic(() => import("./components/MinimalPortfolioShell"), {
  ssr: false,
  loading: () => null,
});

type PortfolioMode = "minimal" | "neo";

function ModeSelector({ onSelect }: { onSelect: (mode: PortfolioMode) => void }) {
  const { selector } = portfolioData;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-16 text-white md:px-10">
      <div className="pointer-events-none fixed inset-0 z-0 bg-black" />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="border border-white/30 bg-black px-6 py-8 md:px-10 md:py-10">
          <h1 className="text-3xl font-semibold tracking-[0.02em] text-white md:text-5xl">
            {selector.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-white/75 md:text-base">
            {selector.subtitle}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="border border-white/25 bg-black p-5">
              <h2 className="text-2xl font-semibold tracking-[0.01em] text-white">
                {selector.modes.minimal.title}
              </h2>
              <p className="mt-2 text-sm text-white/78">
                {selector.modes.minimal.description}
              </p>
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center border border-white bg-white px-4 py-2 text-sm font-medium text-black transition-colors duration-150 hover:bg-black hover:text-white"
                onClick={() => onSelect("minimal")}
              >
                {selector.modes.minimal.cta}
              </button>
            </article>

            <article className="border border-white/25 bg-black p-5">
              <h2 className="text-2xl font-semibold tracking-[0.01em] text-white">
                {selector.modes.neo.title}
              </h2>
              <p className="mt-2 text-sm text-white/78">
                {selector.modes.neo.description}
              </p>
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center border border-white bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-white hover:text-black"
                onClick={() => onSelect("neo")}
              >
                {selector.modes.neo.cta}
              </button>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<PortfolioMode | null>(null);

  const handleReturnToSelector = () => {
    setMode(null);
    router.replace("/");
  };

  useEffect(() => {
    if (mode !== null) {
      return;
    }

    const modeParam = searchParams.get("mode");
    if (modeParam === "neo" || modeParam === "minimal") {
      setMode(modeParam);
    }
  }, [mode, searchParams]);

  if (!mode) {
    return <ModeSelector onSelect={setMode} />;
  }

  if (mode === "minimal") {
    return <MinimalPortfolioShell onReturnToSelector={handleReturnToSelector} />;
  }

  return (
    <SoundEffectsProvider>
      <PortfolioShell onReturnToSelector={handleReturnToSelector} />
    </SoundEffectsProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}