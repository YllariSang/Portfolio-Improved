"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HudLottie from "./HudLottie";
import { portfolioData } from "../data/portfolioData";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { profile, creative } = portfolioData;
  const labels = creative.hero.labels;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(".hero-shell", { y: 72, opacity: 0, rotate: -2, duration: 0.85 })
        .from(".hero-frame", { y: 36, opacity: 0, duration: 0.55 }, "-=0.42")
        .from(".hero-label", { opacity: 0, y: -10, stagger: 0.08, duration: 0.28 }, "-=0.2")
        .from(".hero-title", { opacity: 0, scale: 0.94, duration: 0.45 }, "-=0.15")
        .from(".hero-copy", { opacity: 0, y: 18, duration: 0.4 }, "-=0.1")
        .from(".hud-lottie-wrap", { opacity: 0, y: 14, duration: 0.3 }, "-=0.22")
        .from(".hero-cta", { opacity: 0, y: 18, stagger: 0.1, duration: 0.38 }, "-=0.18");

      gsap.to(".hero-sheen", {
        xPercent: 120,
        duration: 2.2,
        ease: "none",
        repeat: -1,
        repeatDelay: 1.1,
      });

      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        opacity: 0,
        y: 32,
        duration: 0.55,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto mt-4 w-full max-w-7xl px-6 md:mt-8"
      aria-label="Hero section"
    >
      <div
        className="hero-shell relative overflow-hidden border border-unbeatable-white/35 bg-industrial-black/90 px-6 py-14 md:px-10 md:py-20"
        style={{
          clipPath:
            "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
        }}
      >
        <div className="hero-sheen pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_0%,rgba(240,240,240,0.08)_38%,transparent_45%)]" />

        <span className="hero-label micro-label absolute left-5 top-5">{labels[0]}</span>
        <span className="hero-label micro-label absolute right-5 top-5">{labels[1]}</span>
        <span className="hero-label micro-label absolute bottom-5 left-5">{labels[2]}</span>
        <span className="hero-label micro-label absolute bottom-5 right-5">{labels[3]}</span>
        <HudLottie />

        <div className="hero-frame relative z-10 mx-auto flex max-w-6xl flex-col gap-8 border border-unbeatable-white/30 bg-industrial-black px-6 py-8 md:px-10 md:py-12">
          <div className="hero-title -skew-x-12 border border-unbeatable-white/20 px-3 py-4 md:px-5 md:py-6">
            <h1
              className="glitch-heading persona-accent relative text-center text-5xl font-black uppercase tracking-[0.12em] text-zzz-yellow sm:text-6xl md:text-8xl"
              data-text={profile.displayName}
            >
              {profile.displayName}
            </h1>
          </div>

          <p className="hero-copy mx-auto max-w-3xl text-center text-sm uppercase tracking-[0.18em] text-unbeatable-white/85 md:text-base">
            {profile.heroSummary}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#projects" className="hero-cta glitch-button">
              {creative.hero.ctas.works}
            </a>
            <a href="#contacts" className="hero-cta glitch-button invert">
              {creative.hero.ctas.comms}
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .micro-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 0.65rem;
          line-height: 1;
          letter-spacing: 0.15em;
          font-variant: all-small-caps;
          color: rgba(240, 240, 240, 0.86);
          text-shadow: 1px 0 #f4ff33;
        }

        .glitch-heading::before,
        .glitch-heading::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .glitch-heading::before {
          transform: translate(-2px, 0);
          color: rgba(240, 240, 240, 0.8);
          clip-path: polygon(0 0, 100% 0, 100% 46%, 0 40%);
          animation: glitch-shift-a 680ms steps(2, end) infinite;
        }

        .glitch-heading::after {
          transform: translate(2px, 0);
          color: rgba(244, 255, 51, 0.85);
          clip-path: polygon(0 55%, 100% 45%, 100% 100%, 0 100%);
          animation: glitch-shift-b 720ms steps(2, end) infinite;
        }

        @keyframes glitch-shift-a {
          0%,
          100% {
            transform: translate(-2px, 0);
          }
          30% {
            transform: translate(-4px, -1px);
          }
          60% {
            transform: translate(0, 1px);
          }
        }

        @keyframes glitch-shift-b {
          0%,
          100% {
            transform: translate(2px, 0);
          }
          35% {
            transform: translate(4px, 1px);
          }
          70% {
            transform: translate(0, -1px);
          }
        }
      `}</style>
    </section>
  );
}