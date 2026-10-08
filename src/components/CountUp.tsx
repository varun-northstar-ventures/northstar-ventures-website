"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1400;
const TICK = 55;

/**
 * Renders the final value on the server; each time it scrolls into view it
 * shuffles random digits, settling left → right onto the real number.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const target = String(value);
  const [display, setDisplay] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    let running = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Re-arm once the number has fully left the viewport.
        if (!entry.isIntersecting) {
          running = false;
          return;
        }
        if (entry.intersectionRatio < 0.6) return;
        if (running) return;
        running = true;
        window.clearInterval(timer);
        const start = performance.now();
        timer = window.setInterval(() => {
          const progress = (performance.now() - start) / DURATION;
          if (progress >= 1) {
            window.clearInterval(timer);
            setDisplay(target);
            return;
          }
          const settled = Math.floor(progress * target.length);
          setDisplay(
            target
              .split("")
              .map((digit, i) => (i < settled ? digit : String(Math.floor(Math.random() * 10))))
              .join(""),
          );
        }, TICK);
      },
      { threshold: [0, 0.6] },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {target}
        {suffix}
      </span>
    </span>
  );
}
