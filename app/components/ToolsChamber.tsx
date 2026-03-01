"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";

const tools = portfolioData.tools;
const toolsUi = portfolioData.creative.tools;

const reel = [...tools, ...tools];

export default function ToolsChamber() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".tools-panel", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        opacity: 0,
        y: 42,
        rotate: -1,
        duration: 0.62,
        ease: "power2.out",
      });

      gsap.from(".tool-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 44,
        rotate: (index) => (index % 2 === 0 ? -8 : 8),
        stagger: 0.06,
        duration: 0.7,
        ease: "back.out(1.3)",
      });

      gsap.to(".tool-reel-chip", {
        y: "-=6",
        duration: 1.35,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.035,
          from: "random",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const moveTrack = (direction: "left" | "right") => {
    if (!trackRef.current) {
      return;
    }

    const amount = Math.round(trackRef.current.clientWidth * 0.82);

    trackRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="mx-auto mt-12 w-full max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-24"
    >
      <div className="tools-panel chamfer-panel relative overflow-hidden px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <span className="micro-tag">{toolsUi.moduleTag}</span>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">
          <h2 className="persona-accent -skew-x-12 border border-unbeatable-white/25 px-3 py-2 text-xl font-black uppercase tracking-[0.1em] text-zzz-yellow sm:px-4 sm:text-2xl sm:tracking-[0.12em] md:text-4xl">
            {toolsUi.title}
          </h2>
          <span className="micro-tag">{toolsUi.feedTag}</span>
        </div>

        <div className="logo-marquee-mask mt-7">
          <div className="logo-marquee-track">
            {reel.map((tool, index) => (
              <div key={`${tool.name}-a-${index}`} className="tool-reel-chip logo-chip">
                <span className="logo-chip-mark">{tool.logo}</span>
                <span className="logo-chip-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="logo-marquee-mask mt-3">
          <div className="logo-marquee-track reverse">
            {reel.map((tool, index) => (
              <div key={`${tool.name}-b-${index}`} className="tool-reel-chip logo-chip">
                <span className="logo-chip-mark">{tool.logo}</span>
                <span className="logo-chip-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="revolver-nav-wrap mt-6 sm:mt-7">
          <button type="button" className="revolver-nav" onClick={() => moveTrack("left")} aria-label="Scroll tools left">◀</button>
          <span className="micro-tag">{toolsUi.scrollTag}</span>
          <button type="button" className="revolver-nav" onClick={() => moveTrack("right")} aria-label="Scroll tools right">▶</button>
        </div>

        <div
          ref={trackRef}
          className="revolver-track mt-4 overflow-x-auto pb-2"
          onWheel={(event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
              event.currentTarget.scrollLeft += event.deltaY;
            }
          }}
        >
          {tools.map((tool, index) => (
            <article
              key={tool.name}
              className="tool-card revolver-card shrink-0 border border-unbeatable-white/35 bg-industrial-black px-4 py-5"
              style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              onMouseEnter={(event) => {
                gsap.to(event.currentTarget, {
                  scale: 1.05,
                  y: -6,
                  rotate: 0,
                  duration: 0.25,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(event) => {
                gsap.to(event.currentTarget, {
                  scale: 1,
                  y: 0,
                  rotate: index % 2 === 0 ? -2 : 2,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              <div className="logo-badge">{tool.logo}</div>
              <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.08em] text-zzz-yellow">
                {tool.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-unbeatable-white/75">
                {tool.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}