"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";

const tools = portfolioData.tools;
const skillGroups = portfolioData.skills.groups;
const toolsUi = portfolioData.creative.tools;

const reel = [...tools, ...tools];

export default function ToolsChamber() {
  const sectionRef = useRef<HTMLElement>(null);

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

      gsap.from(".skill-group-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 44,
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.category}
              className="skill-group-card revolver-card border border-unbeatable-white/35 bg-industrial-black px-4 py-5"
              onMouseEnter={(event) => {
                gsap.to(event.currentTarget, {
                  scale: 1.03,
                  y: -6,
                  duration: 0.25,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(event) => {
                gsap.to(event.currentTarget, {
                  scale: 1,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              <div className="logo-badge">SKL</div>
              <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.08em] text-zzz-yellow">
                {group.category}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 border border-unbeatable-white/25 bg-black/40 px-2 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-unbeatable-white/90"
                  >
                    <span className="text-zzz-yellow">{item.logo}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}