"use client";

import { useEffect, useState } from "react";

import { navLinks } from "@/content/site";
import { ArrowUpRight } from "./ui/icons";

/** Fired by the nav's "Show all testimonials" item; the testimonials section opens its popup. */
export const OPEN_TESTIMONIALS_EVENT = "open-testimonials";

/**
 * Glass pill nav pinned to the bottom of the viewport on larger screens (mobile
 * uses the menu). While the testimonials section is on screen it grows a fifth,
 * pink "Show all testimonials" item.
 */
export function StickyNav() {
  const [testimonialsInView, setTestimonialsInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById("testimonials");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setTestimonialsInView(entry.isIntersecting), {
      rootMargin: "-40% 0px -40% 0px",
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="nav-rise fixed inset-x-0 bottom-[39px] z-40 mx-auto hidden w-fit items-center rounded-full border border-white bg-white/70 px-[30px] py-5 text-ink backdrop-blur-[8px] md:flex"
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
        inert={!testimonialsInView}
        className={`-my-[14px] -mr-[21px] overflow-hidden transition-[max-width,margin,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          testimonialsInView ? "ml-10 max-w-[260px] opacity-100" : "ml-0 max-w-0 opacity-0"
        }`}
      >
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => window.dispatchEvent(new Event(OPEN_TESTIMONIALS_EVENT))}
          className="flex h-[39px] cursor-pointer items-center gap-4 rounded-full bg-brand px-5 text-base leading-4 whitespace-nowrap text-white transition-colors duration-300 hover:bg-[#b000e0]"
        >
          <span className="trim-cap block">Show all testimonials</span>
          <ArrowUpRight />
        </button>
      </div>
    </nav>
  );
}
