"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { contact, creative } = portfolioData;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".contact-shell", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        immediateRender: false,
        opacity: 0,
        y: 44,
        scale: 0.97,
        duration: 0.64,
        ease: "power2.out",
      });

      gsap.from(".contact-action", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
        immediateRender: false,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.45,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto mt-16 mb-16 w-full max-w-7xl px-6 md:mt-24 md:mb-24"
    >
      <div className="contact-shell chamfer-panel px-6 py-8 md:px-8 md:py-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="persona-accent -skew-x-12 border border-unbeatable-white/25 px-4 py-2 text-2xl font-black uppercase tracking-[0.12em] text-zzz-yellow md:text-4xl">
            {creative.contact.title}
          </h2>
          <span className="micro-tag">{creative.contact.channelTag}</span>
        </div>

        <p className="mt-6 max-w-3xl text-sm uppercase tracking-[0.13em] text-unbeatable-white/80 md:text-base">
          {contact.intro}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${contact.email}`} className="contact-action glitch-button text-unbeatable-white">
            {creative.contact.ctas.email}
          </a>
          <a href={contact.github} target="_blank" rel="noreferrer" className="contact-action glitch-button invert text-industrial-black">
            {creative.contact.ctas.github}
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="contact-action glitch-button text-unbeatable-white">
            {creative.contact.ctas.linkedin}
          </a>
        </div>
      </div>
    </section>
  );
}