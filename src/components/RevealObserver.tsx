"use client";

import { useEffect } from "react";

/**
 * Single observer for every `[data-reveal]` element on the page, so sections
 * can stay server components. Elements animate in each time they enter the
 * viewport and reset once fully out of it, so the effect replays on every
 * visit. They are only hidden once `.js` is set on <html> (inline script in
 * the layout), so content is never lost without JS.
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle("is-visible", entry.isIntersecting);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const observe = (root: ParentNode) => root.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    observe(document);

    // Pick up content that mounts later (e.g. "Show More" items).
    const mutations = new MutationObserver((records) => {
      for (const record of records)
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]")) observer.observe(node);
          observe(node);
        });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
