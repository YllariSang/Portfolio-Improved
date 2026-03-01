"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import ToolsChamber from "./ToolsChamber";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import ScrollFx from "./ScrollFx";
import SectionDivider from "./SectionDivider";
import SiteBootIntro from "./SiteBootIntro";
import AsciiBackground from "./AsciiBackground";
import StickyHeader from "./StickyHeader";
import CornerScrollWheel from "./CornerScrollWheel";

type VisualMode = "tactical" | "glitch";

type PortfolioShellProps = {
  onReturnToSelector?: () => void;
};

export default function PortfolioShell({ onReturnToSelector }: PortfolioShellProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [visualMode, setVisualMode] = useState<VisualMode>("tactical");

  useEffect(() => {
    if (!showIntro) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 2900);

    return () => window.clearTimeout(timer);
  }, [showIntro]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;

    if (showIntro) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
    };
  }, [showIntro]);

  useLayoutEffect(() => {
    if (showIntro) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>(".layout-stage");
      const railLinks = gsap.utils.toArray<HTMLAnchorElement>(".layout-rail-link");

      const setActiveStage = (stageId: string) => {
        stages.forEach((item) => {
          item.classList.toggle("is-active", item.id === stageId);
        });

        railLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${stageId}`;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      };

      if (stages[0]) {
        setActiveStage(stages[0].id);
      }

      stages.forEach((stage, index) => {
        const stageBody = stage.querySelector<HTMLElement>(".stage-body");
        const stageIndex = stage.querySelector<HTMLElement>(".stage-index");
        const stageId = stage.id;

        if (!stageBody) {
          return;
        }

        gsap.set(stageBody, {
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        });

        gsap.fromTo(
          stageBody,
          {
            y: 46,
            z: -48,
            rotateX: 3,
            rotateY: index % 2 === 0 ? 2.2 : -2.2,
            opacity: 0.94,
          },
          {
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: stage,
              start: "top 86%",
              end: "top 42%",
              scrub: 1,
            },
          }
        );

        gsap.to(stageBody, {
          y: -14,
          z: -20,
          rotateX: -1.4,
          rotateY: index % 2 === 0 ? -1 : 1,
          opacity: 0.96,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "bottom 62%",
            end: "bottom 18%",
            scrub: 1,
          },
        });

        if (stageIndex) {
          gsap.fromTo(
            stageIndex,
            { yPercent: 0, opacity: 0.6 },
            {
              yPercent: -48,
              opacity: 0.28,
              ease: "none",
              scrollTrigger: {
                trigger: stage,
                start: "top 75%",
                end: "bottom 25%",
                scrub: 1,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: stage,
          start: "top center",
          end: "bottom center",
          invalidateOnRefresh: true,
          onEnter: () => setActiveStage(stageId),
          onEnterBack: () => setActiveStage(stageId),
        });
      });

      gsap.to(".layout-rail", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [showIntro]);

  return (
    <main ref={rootRef} className={`visual-mode-${visualMode} relative min-h-screen overflow-x-clip pb-10`}>
      {onReturnToSelector ? (
        <button
          type="button"
          onClick={onReturnToSelector}
          className="glitch-button fixed right-4 top-4 z-[90] md:right-8 md:top-6"
        >
          BACK TO SELECTOR
        </button>
      ) : null}

      <AsciiBackground />
      <ScrollFx />
      <CornerScrollWheel />
      <StickyHeader />
      <div className="scanline-overlay" />
      <div className="grain-overlay" />

      <aside className="layout-rail" aria-label="Section index">
        <a href="#hero" className="layout-rail-link">01</a>
        <a href="#tools" className="layout-rail-link">02</a>
        <a href="#projects" className="layout-rail-link">03</a>
        <a href="#contacts" className="layout-rail-link">04</a>
      </aside>

      <section id="hero" className="layout-stage layout-stage-hero">
        <div className="stage-header">
          <span className="stage-index">[01]</span>
          <span className="micro-tag">[ENTRY_BLOCK: PRIME]</span>
        </div>
        <div className="stage-body">
          <Hero />
        </div>
      </section>

      <SectionDivider label="LOADOUT_STREAM" />

      <section id="tools" className="layout-stage">
        <div className="stage-header">
          <span className="stage-index">[02]</span>
          <span className="micro-tag">[THIS_TREASURE_I_SUMMON]</span>
        </div>
        <div className="stage-body">
          <ToolsChamber />
        </div>
      </section>

      <SectionDivider label="PROJECT_ARCHIVE" />

      <section id="projects" className="layout-stage">
        <div className="stage-header">
          <span className="stage-index">[03]</span>
          <span className="micro-tag">[OPERATION_LOG]</span>
        </div>
        <div className="stage-body">
          <ProjectsSection />
        </div>
      </section>

      <SectionDivider label="OPEN_CHANNEL" />

      <section id="contacts" className="layout-stage">
        <div className="stage-header">
          <span className="stage-index">[04]</span>
          <span className="micro-tag">[COMMS_GATEWAY]</span>
        </div>
        <div className="stage-body">
          <ContactSection />
        </div>
      </section>

      <SiteBootIntro active={showIntro} onComplete={() => setShowIntro(false)} />
    </main>
  );
}
