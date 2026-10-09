"use client";

import { useEffect, useRef, useState } from "react";

import { links, navLinks } from "@/content/site";
import { ArrowUpRight, PlayOutline } from "./ui/icons";

/** Fired by the nav's "Show All Testimonials" item; the testimonials section opens its popup. */
export const OPEN_TESTIMONIALS_EVENT = "open-testimonials";

/** Sections that add a pink action to the nav while they're on screen. */
type Context = "about" | "testimonials";
const CONTEXT_SECTIONS: Context[] = ["about", "testimonials"];
/** How far (px) the bar may run past a section's end before its action is hidden. */
const OVERRUN_PX = 100;

const actionClass =
  "flex h-[39px] cursor-pointer items-center gap-4 rounded-full bg-brand px-5 text-base leading-4 whitespace-nowrap text-white transition-colors duration-300 hover:bg-[#b000e0]";

/**
 * Glass pill nav pinned to the bottom of the viewport on larger screens (mobile
 * uses the menu). It grows a fifth, pink item for the section on screen:
 * "Watch Me" in About, "Show All Testimonials" in Testimonials.
 */
export function StickyNav() {
  const [context, setContext] = useState<Context | null>(null);

  const navRef = useRef<HTMLElement>(null);

  // The action shows only while the bar itself is over the section, allowing it to run
  // at most OVERRUN_PX past the section's end before it disappears.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = navRef.current?.getBoundingClientRect();
      if (!nav || nav.height === 0) return setContext(null);
      const match = CONTEXT_SECTIONS.find((id) => {
        const section = document.getElementById(id)?.getBoundingClientRect();
        return !!section && section.top <= nav.top && section.bottom + OVERRUN_PX >= nav.bottom;
      });
      setContext(match ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Keep the last action rendered while it collapses, so it doesn't vanish mid-animation.
  const [shown, setShown] = useState<Context>("testimonials");
  if (context && context !== shown) setShown(context);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={`nav-rise fixed inset-x-0 bottom-[39px] z-40 mx-auto hidden w-fit items-center rounded-full border border-white bg-white/70 py-5 pl-[30px] text-ink backdrop-blur-[8px] transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${
        // With the pink pill showing, its right gap matches its top/bottom gap (nested-pill inset).
        context ? "pr-[6px]" : "pr-[30px]"
      }`}
    >
      <ul className="flex items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-base leading-none transition-colors duration-300 hover:text-brand">
              <span className="trim-cap block">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div
        inert={!context}
        className={`-my-[14px] overflow-hidden transition-[max-width,margin,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          context ? "ml-[30px] max-w-[260px] opacity-100" : "ml-0 max-w-0 opacity-0"
        }`}
      >
        {shown === "about" ? (
          <a href={links.watchMe} target="_blank" rel="noopener noreferrer" className={actionClass}>
            <span className="trim-cap block">Watch Me</span>
            <PlayOutline className="text-white" />
          </a>
        ) : (
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => window.dispatchEvent(new Event(OPEN_TESTIMONIALS_EVENT))}
            className={actionClass}
          >
            <span className="trim-cap block">Show All Testimonials</span>
            <ArrowUpRight />
          </button>
        )}
      </div>
    </nav>
  );
}
