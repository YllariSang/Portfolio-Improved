"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const wheelTicks = Array.from({ length: 48 }, (_, index) => {
  const angle = (index / 48) * Math.PI * 2;
  const outer = 196;
  const inner = index % 4 === 0 ? 172 : 182;

  return {
    x1: 200 + Math.cos(angle) * inner,
    y1: 200 + Math.sin(angle) * inner,
    x2: 200 + Math.cos(angle) * outer,
    y2: 200 + Math.sin(angle) * outer,
    major: index % 4 === 0,
  };
});

export default function CornerScrollWheel() {
  const { scrollYProgress } = useScroll();
  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const rotate = useSpring(rawRotate, {
    stiffness: 400,
    damping: 10,
    mass: 0.18,
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -bottom-[5.5rem] -right-[5.5rem] h-[22rem] w-[22rem] sm:-bottom-[8rem] sm:-right-[8rem] sm:h-[34rem] sm:w-[34rem] md:-bottom-[10rem] md:-right-[10rem] md:h-[44rem] md:w-[44rem]"
        style={{ rotate, opacity: 0.17 }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" role="presentation" aria-hidden>
          <circle cx="200" cy="200" r="196" fill="none" stroke="rgb(244 246 248 / 0.34)" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="170" fill="none" stroke="rgb(244 246 248 / 0.24)" strokeWidth="1.25" />
          <circle cx="200" cy="200" r="144" fill="none" stroke="rgb(121 217 154 / 0.38)" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="118" fill="none" stroke="rgb(244 246 248 / 0.22)" strokeWidth="1.1" />
          <circle cx="200" cy="200" r="92" fill="none" stroke="rgb(121 217 154 / 0.32)" strokeWidth="1" />

          {wheelTicks.map((tick, index) => (
            <line
              key={`wheel-tick-${index}`}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={tick.major ? "rgb(121 217 154 / 0.7)" : "rgb(244 246 248 / 0.36)"}
              strokeWidth={tick.major ? 1.5 : 1}
            />
          ))}

          <path
            d="M 200 28 A 172 172 0 0 1 332 98"
            fill="none"
            stroke="rgb(121 217 154 / 0.75)"
            strokeWidth="2"
          />
          <path
            d="M 80 110 A 144 144 0 0 1 200 56"
            fill="none"
            stroke="rgb(244 246 248 / 0.62)"
            strokeWidth="1.6"
          />
        </svg>
      </motion.div>

    </div>
  );
}
