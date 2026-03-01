"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { memo } from "react";
import type { CSSProperties } from "react";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  x: 4 + (index * 13) % 92,
  y: 8 + (index * 9) % 84,
  size: 2 + (index % 3),
  duration: 9 + (index % 5) * 1.4,
  delay: (index % 6) * 0.6,
}));

const particleStyles: CSSProperties[] = particles.map((particle) => ({
  left: `${particle.x}%`,
  top: `${particle.y}%`,
  width: `${particle.size}px`,
  height: `${particle.size}px`,
  animationDuration: `${particle.duration}s`,
  animationDelay: `${particle.delay}s`,
}));

function AsciiBackground() {
  const { scrollYProgress } = useScroll();
  const driftOne = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const driftTwo = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <div className="ambient-bg" aria-hidden>
      <motion.div className="ambient-layer ambient-layer-one" style={{ y: driftOne }} />
      <motion.div className="ambient-layer ambient-layer-two" style={{ y: driftTwo }} />
      <motion.div className="ambient-mesh" style={{ rotate: glowRotate }} />

      <div className="ambient-particles">
        {particles.map((particle, index) => (
          <span
            key={particle.id}
            className="ambient-particle"
            style={particleStyles[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(AsciiBackground);
