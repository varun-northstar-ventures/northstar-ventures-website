import type { ReactNode } from "react";

import { afterWordsDelay, Eyebrow, splitWords } from "./Text";

type Props = {
  eyebrow: string;
  id?: string;
  align?: "left" | "center";
  children: ReactNode;
  className?: string;
};

/** "//Eyebrow" label followed by the section's H2, 16px apart as in the design. */
export function SectionTitle({ eyebrow, id, align = "left", children, className = "" }: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";
  const words = splitWords(children);
  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {/* The eyebrow finishes just after the heading's words have all come in. */}
      <div data-reveal style={{ "--reveal-delay": afterWordsDelay(words.count) } as React.CSSProperties}>
        <Eyebrow label={eyebrow} />
      </div>
      <h2 id={id} className="heading" data-reveal="words">
        {words.nodes}
      </h2>
    </div>
  );
}
