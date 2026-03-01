"use client";

import { AnimatePresence, motion } from "framer-motion";

type SiteBootIntroProps = {
  active: boolean;
  onComplete: () => void;
};

const bootLines = [
  "[BOOT] SIGNAL LINK ESTABLISHED",
  "[SYS] LOADING INTERFACE MODULES",
  "[GPU] RENDER PIPELINE CALIBRATED",
  "[AUTH] USER PROFILE VERIFIED",
];

export default function SiteBootIntro({ active, onComplete }: SiteBootIntroProps) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="boot-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          onAnimationComplete={(definition) => {
            if (definition === "exit") {
              onComplete();
            }
          }}
        >
          <motion.div
            className="boot-tv"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="boot-tv-frame" />
            <motion.div
              className="boot-flash"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            <div className="boot-content">
              <p className="boot-title">PORTFOLIO TRANSMISSION</p>
              <p className="boot-sub">[TV_FEED: INITIALIZING]</p>

              <div className="boot-log">
                {bootLines.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + index * 0.25, duration: 0.3 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.div
                className="boot-progress"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.1, ease: "easeInOut" }}
              />

              <motion.button
                type="button"
                className="glitch-button mt-6"
                onClick={onComplete}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.25 }}
              >
                ENTER SITE
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
