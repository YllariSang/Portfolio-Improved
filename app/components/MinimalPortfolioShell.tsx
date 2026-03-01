"use client";

import { type KeyboardEvent, useEffect, useState } from "react";
import { portfolioData } from "../data/portfolioData";
import LeavingSiteModal from "./LeavingSiteModal";

const EXTERNAL_CONFIRM_KEY = "portfolio_skip_external_confirm";

type MinimalPortfolioShellProps = {
  onReturnToSelector: () => void;
};

export default function MinimalPortfolioShell({ onReturnToSelector }: MinimalPortfolioShellProps) {
  const [loading, setLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingWorkUrl, setPendingWorkUrl] = useState<string | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { profile, tools, projects, contact, professional } = portfolioData;
  const skills = tools.map((tool) => tool.name);
  const visibleProjects = professional.projects.layoutMode === "expand" && !showAllProjects
    ? projects.slice(0, professional.projects.initialVisibleCount)
    : projects;
  const canToggleProjects =
    professional.projects.layoutMode === "expand" &&
    projects.length > professional.projects.initialVisibleCount;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(EXTERNAL_CONFIRM_KEY) === "1";
    setDontShowAgain(savedPreference);
  }, []);

  const openExternalProject = (url: string) => {
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
    const railElement = event.currentTarget;
    const scrollStep = Math.round(railElement.clientWidth * 0.8);

    if (event.key === "ArrowRight") {
      event.preventDefault();
      railElement.scrollBy({ left: scrollStep, behavior: "smooth" });
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      railElement.scrollBy({ left: -scrollStep, behavior: "smooth" });
    }

    if (event.key === "Home") {
      event.preventDefault();
      railElement.scrollTo({ left: 0, behavior: "smooth" });
    }

    if (event.key === "End") {
      event.preventDefault();
      railElement.scrollTo({ left: railElement.scrollWidth, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="pointer-events-none fixed inset-0 z-0 bg-black" />
        <div className="relative z-10 flex items-center gap-3 border border-white/30 bg-black px-6 py-4">
          <span className="h-2 w-2 animate-pulse bg-white" />
          <span className="h-2 w-2 animate-pulse bg-white [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-pulse bg-white [animation-delay:300ms]" />
          <p className="ml-2 text-sm font-medium tracking-[0.06em]">{professional.loadingText}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-black px-6 py-10 text-white md:px-10">
      <div className="pointer-events-none fixed inset-0 z-0 bg-black" />

      <button
        type="button"
        onClick={onReturnToSelector}
        className="fixed right-4 top-4 z-50 inline-flex items-center justify-center border border-white bg-black px-4 py-2 text-xs font-medium tracking-[0.08em] text-white transition-colors duration-150 hover:bg-white hover:text-black md:right-8 md:top-6"
      >
        {professional.backToSelectorCta}
      </button>

      <div className="relative z-10 mx-auto w-full max-w-5xl space-y-6">
        <section className="border border-white/25 bg-black p-6 md:p-8">
          <h1 className="text-3xl font-semibold tracking-[0.01em] text-white md:text-5xl">
            {profile.displayName} Portfolio
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/78 md:text-base">
            {profile.professionalSummary}
          </p>
        </section>

        <section className="border border-white/25 bg-black p-6 md:p-8">
          <h2 className="text-lg font-semibold tracking-[0.01em] text-white">{professional.sections.skillsTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="border border-white/20 bg-black px-3 py-2 text-xs tracking-[0.08em] text-white/86"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section className="border border-white/25 bg-black p-6 md:p-8">
          <h2 className="text-lg font-semibold tracking-[0.01em] text-white">{professional.sections.projectsTitle}</h2>
          {professional.projects.layoutMode === "rail" ? (
            <div
              tabIndex={0}
              onKeyDown={handleRailKeyDown}
              className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 outline-none"
              aria-label="Professional projects horizontal rail"
            >
              {projects.map((project, idx) => (
                <article
                  key={`${project.title}-${idx}`}
                  className="min-w-[300px] shrink-0 snap-start border border-white/20 bg-black p-4"
                  style={{
                    clipPath:
                      "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                  }}
                >
                  <h3 className="text-lg font-semibold tracking-[0.01em] text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-white/60">{project.stack}</p>
                  <p className="mt-2 text-sm text-white/72">{project.summary}</p>
                  <div className="mt-3 border border-white/20 bg-black/60 px-2 py-1.5">
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.12em] text-white/58">[DESTINATION_LINK]</p>
                    <p className="mt-1 break-all text-[0.68rem] text-white/80">{project.workUrl}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleOpenRequest(project.workUrl)}
                      className="inline-flex items-center justify-center border border-white bg-black px-3 py-2 text-xs font-medium tracking-[0.08em] text-white transition-colors duration-150 hover:bg-white hover:text-black"
                      aria-label={`Open ${project.title} on external site`}
                    >
                      {professional.projects.openCaseCta}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {visibleProjects.map((project, idx) => (
                <article
                  key={`${project.title}-${idx}`}
                  className="border border-white/20 bg-black p-4"
                  style={{
                    clipPath:
                      "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                  }}
                >
                  <h3 className="text-lg font-semibold tracking-[0.01em] text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-white/60">{project.stack}</p>
                  <p className="mt-2 text-sm text-white/72">{project.summary}</p>
                  <div className="mt-3 border border-white/20 bg-black/60 px-2 py-1.5">
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.12em] text-white/58">[DESTINATION_LINK]</p>
                    <p className="mt-1 break-all text-[0.68rem] text-white/80">{project.workUrl}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleOpenRequest(project.workUrl)}
                      className="inline-flex items-center justify-center border border-white bg-black px-3 py-2 text-xs font-medium tracking-[0.08em] text-white transition-colors duration-150 hover:bg-white hover:text-black"
                      aria-label={`Open ${project.title} on external site`}
                    >
                      {professional.projects.openCaseCta}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {canToggleProjects ? (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowAllProjects((prev) => !prev)}
                className="inline-flex items-center justify-center border border-white bg-black px-4 py-2 text-xs font-medium tracking-[0.08em] text-white transition-colors duration-150 hover:bg-white hover:text-black"
              >
                {showAllProjects
                  ? professional.projects.collapseCta
                  : professional.projects.expandCta}
              </button>
            </div>
          ) : null}

          <p className="mt-4 border border-white/25 bg-black px-3 py-2 text-xs uppercase tracking-[0.08em] text-white/72">
            {professional.projects.externalNotice}
          </p>
        </section>

        <section className="border border-white/25 bg-black p-6 md:p-8">
          <h2 className="text-lg font-semibold tracking-[0.01em] text-white">{professional.sections.contactTitle}</h2>
          <p className="mt-3 text-sm text-white/78 md:text-base">
            {contact.intro}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center border border-white bg-white px-4 py-2 text-xs font-medium tracking-[0.08em] text-black transition-colors duration-150 hover:bg-black hover:text-white"
            >
              {professional.ctas.email}
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-white bg-black px-4 py-2 text-xs font-medium tracking-[0.08em] text-white transition-colors duration-150 hover:bg-white hover:text-black"
              aria-label="Open GitHub profile"
            >
              {professional.ctas.github}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-white bg-black px-4 py-2 text-xs font-medium tracking-[0.08em] text-white transition-colors duration-150 hover:bg-white hover:text-black"
              aria-label="Open LinkedIn profile"
            >
              {professional.ctas.linkedin}
            </a>
          </div>
        </section>
      </div>

      <LeavingSiteModal
        isOpen={isConfirmOpen}
        pendingUrl={pendingWorkUrl}
        dontShowAgain={dontShowAgain}
        onToggleDontShowAgain={handleToggleDontShowAgain}
        onCancel={handleCancelOpen}
        onConfirm={handleConfirmOpen}
      />
    </main>
  );
}