"use client";

import { useEffect, useRef } from "react";
import { SFX_EVENTS } from "../lib/sfx";

type SoundEffectsProviderProps = {
  children: React.ReactNode;
};

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="checkbox"], input[type="radio"], summary';

export default function SoundEffectsProvider({ children }: SoundEffectsProviderProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const loadingIntervalRef = useRef<number | null>(null);
  const lastHoverTargetRef = useRef<Element | null>(null);
  const lastScrollAtRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) {
      return;
    }

    audioContextRef.current = new AudioCtx();

    const context = audioContextRef.current;

    const ensureResumed = () => {
      if (context.state === "suspended") {
        void context.resume();
      }
    };

    const createGain = (value: number) => {
      const gain = context.createGain();
      gain.gain.setValueAtTime(value, context.currentTime);
      gain.connect(context.destination);
      return gain;
    };

    const playTone = (frequency: number, duration: number, type: OscillatorType, volume: number) => {
      ensureResumed();

      const now = context.currentTime;
      const osc = context.createOscillator();
      const gain = createGain(0.0001);

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);

      gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      osc.start(now);
      osc.stop(now + duration + 0.01);
    };

    const playHover = () => {
      playTone(880, 0.06, "triangle", 0.022);
    };

    const playClick = () => {
      ensureResumed();

      const now = context.currentTime;
      const oscA = context.createOscillator();
      const oscB = context.createOscillator();
      const gain = createGain(0.0001);

      oscA.type = "square";
      oscB.type = "triangle";
      oscA.frequency.setValueAtTime(240, now);
      oscB.frequency.setValueAtTime(120, now);

      gain.gain.exponentialRampToValueAtTime(0.03, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      oscA.connect(gain);
      oscB.connect(gain);

      oscA.start(now);
      oscB.start(now);
      oscA.stop(now + 0.1);
      oscB.stop(now + 0.1);
    };

    const playScroll = () => {
      ensureResumed();

      const now = context.currentTime;
      const bufferSize = context.sampleRate * 0.035;
      const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
      const data = buffer.getChannelData(0);

      for (let index = 0; index < bufferSize; index += 1) {
        data[index] = (Math.random() * 2 - 1) * 0.22;
      }

      const source = context.createBufferSource();
      source.buffer = buffer;

      const filter = context.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(0.7, now);

      const gain = createGain(0.0001);
      gain.gain.exponentialRampToValueAtTime(0.008, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      source.connect(filter);
      filter.connect(gain);
      source.start(now);
      source.stop(now + 0.06);
    };

    const playRedirect = () => {
      ensureResumed();

      const now = context.currentTime;
      const gain = createGain(0.0001);
      const osc = context.createOscillator();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(760, now);
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.19);

      gain.gain.exponentialRampToValueAtTime(0.028, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.24);
    };

    const startLoadingLoop = () => {
      if (loadingIntervalRef.current !== null) {
        return;
      }

      ensureResumed();
      playTone(420, 0.14, "sine", 0.015);

      loadingIntervalRef.current = window.setInterval(() => {
        playTone(420, 0.14, "sine", 0.013);
      }, 350);
    };

    const stopLoadingLoop = () => {
      if (loadingIntervalRef.current === null) {
        return;
      }

      window.clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    };

    const onPointerDown = (event: Event) => {
      ensureResumed();

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        playClick();
      }
    };

    const onMouseOver = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const interactive = target.closest(INTERACTIVE_SELECTOR);
      if (!interactive || interactive === lastHoverTargetRef.current) {
        return;
      }

      lastHoverTargetRef.current = interactive;
      playHover();
    };

    const onScroll = () => {
      const now = Date.now();
      if (now - lastScrollAtRef.current < 180) {
        return;
      }

      lastScrollAtRef.current = now;
      playScroll();
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href") ?? "";
      const isExternalHref = href.startsWith("http") || href.startsWith("mailto:");
      const hasExternalTarget = anchor.getAttribute("target") === "_blank";

      if (isExternalHref || hasExternalTarget) {
        playRedirect();
      }
    };

    const onLoadingStart = () => {
      startLoadingLoop();
    };

    const onLoadingStop = () => {
      stopLoadingLoop();
    };

    const onRedirect = () => {
      playRedirect();
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    document.addEventListener("mouseover", onMouseOver, { capture: true });
    document.addEventListener("click", onDocumentClick, { capture: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    window.addEventListener(SFX_EVENTS.loadingStartEvent, onLoadingStart);
    window.addEventListener(SFX_EVENTS.loadingStopEvent, onLoadingStop);
    window.addEventListener(SFX_EVENTS.redirectEvent, onRedirect);

    return () => {
      stopLoadingLoop();

      document.removeEventListener("pointerdown", onPointerDown, { capture: true });
      document.removeEventListener("mouseover", onMouseOver, { capture: true });
      document.removeEventListener("click", onDocumentClick, { capture: true });
      window.removeEventListener("scroll", onScroll);

      window.removeEventListener(SFX_EVENTS.loadingStartEvent, onLoadingStart);
      window.removeEventListener(SFX_EVENTS.loadingStopEvent, onLoadingStop);
      window.removeEventListener(SFX_EVENTS.redirectEvent, onRedirect);

      if (context.state !== "closed") {
        void context.close();
      }
    };
  }, []);

  return <>{children}</>;
}
