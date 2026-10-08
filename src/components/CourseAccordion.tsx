"use client";

import { useState } from "react";

import type { CourseCategory } from "@/content/site";
import { PlusIcon } from "./ui/icons";

export function CourseAccordion({ categories }: { categories: CourseCategory[] }) {
  // One category open at a time; the first one starts open, as in the design.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => setOpenIndex((current) => (current === index ? null : index));

  return (
    <ul className="w-full">
      {categories.map((category, index) => {
        const open = openIndex === index;
        const panelId = `course-panel-${index}`;
        const number = String(index + 1).padStart(2, "0");

        return (
          <li key={category.title} className="border-t border-black/20 last:border-b" data-reveal>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full cursor-pointer items-start justify-between gap-4 py-10 text-left md:items-center md:py-[60px]"
              >
                <span className="flex items-start gap-4 md:items-center md:gap-[30px]">
                  <span className="trim-cap block w-[30px] shrink-0 text-2xl leading-[30px] font-light text-black/20 md:w-[60px] md:text-[40px] md:leading-[54px]">
                    {number}
                  </span>
                  <span
                    className={`trim-cap block text-[32px] leading-8 transition-colors duration-300 md:text-[40px] md:leading-[54px] ${
                      open ? "text-brand" : "text-ink group-hover:text-brand"
                    }`}
                  >
                    {category.title}
                  </span>
                </span>
                <PlusIcon
                  className={`size-5 shrink-0 text-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:size-[30px] ${
                    open ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-label={category.title}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <ul className="flex flex-col gap-2.5 pb-10 md:flex-row md:flex-wrap md:pb-[60px]">
                  {category.courses.map((course, i) => (
                    <li
                      key={course.title}
                      style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
                      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                      }`}
                    >
                      <a
                        href={course.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 cursor-pointer items-center justify-between gap-4 border border-line bg-white px-2.5 text-sm leading-4 transition-colors duration-300 hover:border-brand md:justify-start md:gap-[30px] md:px-4 md:text-base"
                      >
                        <span className="trim-cap block">{course.title}</span>
                        <span className="trim-cap block shrink-0 text-brand">{course.hours} Hrs</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
