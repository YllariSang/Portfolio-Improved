"use client";

import { type KeyboardEvent, useEffect, useState } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";
import LeavingSiteModal from "./LeavingSiteModal";
import { emitRedirectSound } from "../lib/sfx";

const projects = portfolioData.projects;
const projectsUi = portfolioData.creative.projects;
const EXTERNAL_CONFIRM_KEY = "portfolio_skip_external_confirm";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingWorkUrl, setPendingWorkUrl] = useState<string | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const visibleProjects = projectsUi.layoutMode === "expand" && !showAllProjects
    ? projects.slice(0, projectsUi.initialVisibleCount)
    : projects;
  const canToggleProjects =
    projectsUi.layoutMode === "expand" &&
    projects.length > projectsUi.initialVisibleCount;

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(EXTERNAL_CONFIRM_KEY) === "1";
    setDontShowAgain(savedPreference);
  }, []);

  const openExternalProject = (url: string) => {
    emitRedirectSound();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOpenRequest = (url: string) => {
    if (dontShowAgain) {
      openExternalProject(url);
      return;
    }

    setPendingWorkUrl(url);
    setIsConfirmOpen(true);
  };

  const handleConfirmOpen = () => {
    if (pendingWorkUrl) {
      openExternalProject(pendingWorkUrl);
    }
    setPendingWorkUrl(null);
    setIsConfirmOpen(false);
  };

  const handleCancelOpen = () => {
    setPendingWorkUrl(null);
    setIsConfirmOpen(false);
  };

  const handleToggleDontShowAgain = (checked: boolean) => {
    setDontShowAgain(checked);
    window.localStorage.setItem(EXTERNAL_CONFIRM_KEY, checked ? "1" : "0");
  };

  const handleRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!railRef.current) {
      return;
    }

    const scrollStep = Math.round(railRef.current.clientWidth * 0.8);

    if (event.key === "ArrowRight") {
      event.preventDefault();
      railRef.current.scrollBy({ left: scrollStep, behavior: "smooth" });
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      railRef.current.scrollBy({ left: -scrollStep, behavior: "smooth" });
    }

    if (event.key === "Home") {
      event.preventDefault();
      railRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }

    if (event.key === "End") {
      event.preventDefault();
      railRef.current.scrollTo({ left: railRef.current.scrollWidth, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
        },
        opacity: 0,
        y: 30,
        duration: 0.55,
        ease: "power2.out",
      });

      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
        opacity: 0,
        y: 58,
        rotate: (index) => (index % 2 === 0 ? -5 : 5),
        stagger: 0.12,
        duration: 0.84,
        ease: "back.out(1.25)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto mt-12 w-full max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-24"
    >
      <div className="chamfer-panel px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <div className="projects-heading flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
          <h2 className="persona-accent -skew-x-12 border border-unbeatable-white/25 px-3 py-2 text-xl font-black uppercase tracking-[0.1em] text-zzz-yellow sm:px-4 sm:text-2xl sm:tracking-[0.12em] md:text-4xl">
            {projectsUi.title}
          </h2>
          <span className="micro-tag">{projectsUi.archiveTag}</span>
        </div>

        {projectsUi.layoutMode === "rail" ? (
          <div
            ref={railRef}
            tabIndex={0}
            onKeyDown={handleRailKeyDown}
            className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 outline-none"
            aria-label="Projects horizontal rail"
          >
            {projects.map((project, idx) => (
              <article
                key={`${project.title}-${idx}`}
                className="project-card relative min-w-[84vw] max-w-[84vw] shrink-0 snap-start overflow-hidden border border-unbeatable-white/30 bg-industrial-black/90 p-4 sm:min-w-[300px] sm:max-w-none sm:p-5 md:min-w-[340px]"
                style={{
                  clipPath:
                    "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                  transform: `rotate(${idx % 2 === 0 ? -1.2 : 1.2}deg)`,
                }}
                onMouseEnter={(event) => {
                  gsap.to(event.currentTarget, {
                    y: -10,
                    rotate: 0,
                    duration: 0.28,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(event) => {
                  gsap.to(event.currentTarget, {
                    y: 0,
                    rotate: idx % 2 === 0 ? -1.2 : 1.2,
                    duration: 0.34,
                    ease: "power2.out",
                  });
                }}
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-unbeatable-white/70">
                  [WORK_{String(idx + 1).padStart(2, "0")}]
                </p>
                <h3 className="mt-2 text-lg font-extrabold uppercase tracking-[0.09em] text-zzz-yellow">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-unbeatable-white/70">
                  {project.stack}
                </p>
                <p className="mt-4 text-sm text-unbeatable-white/85">{project.summary}</p>
                <div className="mt-3 border border-unbeatable-white/20 bg-industrial-black/60 px-2 py-1.5">
                  <p className="micro-tag text-unbeatable-white/60">[DESTINATION_LINK]</p>
                  <p className="mt-1 break-all text-[0.68rem] text-unbeatable-white/82">{project.workUrl}</p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="glitch-button w-full sm:w-auto"
                    onClick={() => handleOpenRequest(project.workUrl)}
                    aria-label={`Open ${project.title} on external site`}
                  >
                    {projectsUi.openCaseCta}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {visibleProjects.map((project, idx) => (
              <article
                key={`${project.title}-${idx}`}
                className="project-card relative overflow-hidden border border-unbeatable-white/30 bg-industrial-black/90 p-5"
                style={{
                  clipPath:
                    "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                  transform: `rotate(${idx % 2 === 0 ? -1.2 : 1.2}deg)`,
                }}
                onMouseEnter={(event) => {
                  gsap.to(event.currentTarget, {
                    y: -10,
                    rotate: 0,
                    duration: 0.28,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(event) => {
                  gsap.to(event.currentTarget, {
                    y: 0,
                    rotate: idx % 2 === 0 ? -1.2 : 1.2,
                    duration: 0.34,
                    ease: "power2.out",
                  });
                }}
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-unbeatable-white/70">
                  [WORK_{String(idx + 1).padStart(2, "0")}]
                </p>
                <h3 className="mt-2 text-lg font-extrabold uppercase tracking-[0.09em] text-zzz-yellow">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-unbeatable-white/70">
                  {project.stack}
                </p>
                <p className="mt-4 text-sm text-unbeatable-white/85">{project.summary}</p>
                <div className="mt-3 border border-unbeatable-white/20 bg-industrial-black/60 px-2 py-1.5">
                  <p className="micro-tag text-unbeatable-white/60">[DESTINATION_LINK]</p>
                  <p className="mt-1 break-all text-[0.68rem] text-unbeatable-white/82">{project.workUrl}</p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="glitch-button w-full sm:w-auto"
                    onClick={() => handleOpenRequest(project.workUrl)}
                    aria-label={`Open ${project.title} on external site`}
                  >
                    {projectsUi.openCaseCta}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {canToggleProjects ? (
          <div className="mt-6 flex w-full sm:w-auto">
            <button
              type="button"
              className="glitch-button w-full sm:w-auto"
              onClick={() => setShowAllProjects((prev) => !prev)}
            >
              {showAllProjects ? projectsUi.collapseCta : projectsUi.expandCta}
            </button>
          </div>
        ) : null}

        <p className="micro-tag mt-6 border border-unbeatable-white/25 bg-industrial-black/70 px-3 py-2 text-unbeatable-white/80">
          {projectsUi.externalNotice}
        </p>
      </div>

      <LeavingSiteModal
        isOpen={isConfirmOpen}
        pendingUrl={pendingWorkUrl}
        dontShowAgain={dontShowAgain}
        onToggleDontShowAgain={handleToggleDontShowAgain}
        onCancel={handleCancelOpen}
        onConfirm={handleConfirmOpen}
      />
    </section>
  );
}