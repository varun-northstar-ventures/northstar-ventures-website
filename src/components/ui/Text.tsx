import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/** Pink "." used at the end of headings in the design. */
export function Dot() {
  return <span className="text-brand">.</span>;
}

/** Section label such as "//About", with the "//" in brand pink. */
export function Eyebrow({ label, className = "" }: { label: string; className?: string }) {
  return (
    <p className={`eyebrow ${className}`}>
      <span className="text-brand">{"//"}</span>
      {label}
    </p>
  );
}

type Counter = { n: number };

function word(content: ReactNode, counter: Counter, key: string) {
  return (
    <span key={key} className="reveal-word" style={{ "--w": counter.n++ } as React.CSSProperties}>
      {content}
    </span>
  );
}

function splitList(nodes: ReactNode, counter: Counter, prefix = ""): ReactNode[] {
  const out: ReactNode[] = [];
  Children.toArray(nodes).forEach((node, i) => {
    const key = `${prefix}${i}`;
    if (typeof node === "string") {
      node.split(/(\s+)/).forEach((part, j) => {
        if (part === "") return;
        out.push(part.trim() === "" ? part : word(part, counter, `${key}-${j}`));
      });
      return;
    }
    if (isValidElement(node) && node.type === Dot) {
      // Keep the dot inside the preceding word so it never wraps on its own.
      const last = out[out.length - 1];
      if (isValidElement<{ children?: ReactNode; className?: string }>(last) && last.props.className === "reveal-word") {
        out[out.length - 1] = cloneElement(last, undefined, last.props.children, <Dot key="dot" />);
        return;
      }
      out.push(node);
      return;
    }
    if (isValidElement<{ children?: ReactNode }>(node) && node.props.children !== undefined) {
      const el = node as ReactElement<{ children?: ReactNode }>;
      out.push(cloneElement(el, { key }, splitList(el.props.children, counter, `${key}-`)));
      return;
    }
    out.push(node);
  });
  return out;
}

/** Splits a heading into word spans; also returns the word count (for timing other reveals). */
export function splitWords(children: ReactNode) {
  const counter = { n: 0 };
  const nodes = splitList(children, counter);
  return { nodes, count: counter.n };
}

/** Per-word stagger used by `[data-reveal="words"]` (keep in sync with globals.css). */
export const WORD_STAGGER_MS = 70;

/**
 * Delay for an element (e.g. the "//Eyebrow") that should finish its reveal just
 * after a heading of `wordCount` words has finished revealing.
 */
export const afterWordsDelay = (wordCount: number) => `${Math.max(0, wordCount - 1) * WORD_STAGGER_MS + 300}ms`;

/**
 * Wraps each word of a heading in a span so CSS can blur → sharpen them in turn
 * when the heading scrolls into view (see `[data-reveal="words"]`).
 */
export function RevealWords({ children }: { children: ReactNode }) {
  return <>{splitWords(children).nodes}</>;
}
