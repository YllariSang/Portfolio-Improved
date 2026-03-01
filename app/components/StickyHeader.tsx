"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "../data/portfolioData";

const links = [
  { href: "#hero", label: "HOME" },
  { href: "#tools", label: "TOOLS" },
  { href: "#projects", label: "WORKS" },
  { href: "#contacts", label: "CONTACT" },
];

export default function StickyHeader() {
  const { scrollYProgress } = useScroll();
  const { profile } = portfolioData;
  const progress = useSpring(scrollYProgress, { stiffness: 400, damping: 20, mass: 0.2 });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -4]);

  return (
    <motion.header className="site-header" style={{ scale, y }}>
      <div className="site-header-inner">
        <div className="site-brand-block">
          <span className="micro-tag">[PROXY_NODE]</span>
          <a href="#hero" className="site-wordmark" aria-label="Jump to hero section">
            {profile.displayName}
          </a>
        </div>

        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="site-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-status">
          <span className="micro-tag">[SITE_MAP: ONLINE]</span>
          <a href="/anemo-vault" className="secret-link micro-tag" aria-label="Open hidden Venti tribute page">
            [FREEDOM]
          </a>
          <motion.span className="site-progress" style={{ scaleX: progress }} />
        </div>
      </div>
    </motion.header>
  );
}
