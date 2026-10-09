"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";

import type { Testimonial } from "@/content/site";
import { OPEN_TESTIMONIALS_EVENT } from "../StickyNav";
import { PillButton } from "../ui/PillButton";
import { Eyebrow } from "../ui/Text";
import { TestimonialCard, testimonialsDisplayClass } from "./TestimonialCard";

// The popup (and its carousel library) is only downloaded when "Show All" is clicked.
const TestimonialsModal = dynamic(() => import("./TestimonialsModal"), { ssr: false });

/** Viewport heights of scrolling spent moving from one card to the next. */
const STEP_VH = 60;
/** How far below its resting place (px) the heading starts before drifting up. */
const HEADING_TRAVEL = 80;

type Metrics = {
  offsets: number[];
  heights: number[];
  stageWidth: number;
  stageHeight: number;
  headingHeight: number;
  slotTop: number;
  /** Card's left edge relative to the stage, so the blurred heading copy lines up. */
  cardLeft: number;
  last: number;
};

const initialMetrics: Metrics = {
  offsets: [0],
  heights: [0],
  stageWidth: 0,
  stageHeight: 0,
  headingHeight: 0,
  slotTop: 0,
  cardLeft: 0,
  last: 0,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/*
 * Layout as a function of the card index `a` (0…last). Every function is
 * piecewise-linear with breakpoints on half steps, so sampling them every 0.5
 * gives exact linear keyframes for the native scroll-driven animations.
 */
const listYAt = (a: number, { offsets, slotTop }: Metrics) => {
  const i = Math.min(Math.floor(a), offsets.length - 1);
  const next = offsets[Math.min(i + 1, offsets.length - 1)];
  return slotTop - (offsets[i] + (next - offsets[i]) * (a - i));
};

// Heading starts just below centre and settles with its top at the card's top edge.
const headingYAt = (a: number, { stageHeight, headingHeight, slotTop, last }: Metrics) => {
  const start = Math.max(slotTop, stageHeight / 2 - headingHeight / 2) + HEADING_TRAVEL;
  return lerp(start, slotTop, last === 0 ? 1 : a / last);
};

// Cards away from the active slot (above or below) show their text at 50%.
// The glass itself always stays solid so the heading is never sharp under a card.
const contentOpacityAt = (index: number, a: number) => 1 - Math.min(Math.abs(index - a), 1) * 0.5;

// Where the real heading sits relative to a card (minus the card's 1px border).
const ghostYAt = (index: number, a: number, m: Metrics) => headingYAt(a, m) - listYAt(a, m) - (m.offsets[index] ?? 0) - 1;

/** Eyebrow + "RESULTS SPEAK LOUDER"; `ghost` renders the frosted (blurred) copy seen through the glass cards. */
function HeadingContent({ ghost = false }: { ghost?: boolean }) {
  const Title = ghost ? "p" : "h2";
  return (
    <div
      className={`flex flex-col items-center gap-4 px-5 text-center ${
        ghost ? "text-transparent [text-shadow:0_0_22px_rgba(255,255,255,0.95)] [&_*]:text-transparent" : ""
      }`}
    >
      <Eyebrow label="Testimonials" className="md:leading-[14px]" />
      <Title id={ghost ? undefined : "testimonials-title"} className={testimonialsDisplayClass}>
        Results
        <br />
        Speak
        <br />
        Louder
      </Title>
    </div>
  );
}

type ViewTimelineCtor = new (options: { subject: Element; axis?: "block" | "inline" }) => AnimationTimeline;

/**
 * Drives every moving part from a native ViewTimeline, so the animations run in
 * step with the browser's own (compositor) scrolling instead of a frame behind
 * it — this is what keeps trackpad scrolling free of tiny jumps.
 * Returns a cleanup function, or null when the browser lacks support.
 */
function runNativeTimeline(section: HTMLElement, m: Metrics): (() => void) | null {
  const ViewTimeline = (window as unknown as { ViewTimeline?: ViewTimelineCtor }).ViewTimeline;
  if (!ViewTimeline) return null;

  const timeline = new ViewTimeline({ subject: section, axis: "block" });
  const samples = Array.from({ length: m.last * 2 + 1 }, (_, k) => k / 2);
  const offset = (a: number) => (m.last === 0 ? 0 : a / m.last);
  const options = {
    timeline,
    rangeStart: "contain 0%",
    rangeEnd: "contain 100%",
    fill: "both",
    easing: "linear",
    duration: "auto",
  } as unknown as KeyframeAnimationOptions;

  const animations: Animation[] = [];
  const animate = (el: Element | null, frame: (a: number) => Keyframe) => {
    if (!el) return;
    const keyframes = samples.map((a) => ({ ...frame(a), offset: offset(a) }));
    animations.push(el.animate(m.last === 0 ? [keyframes[0], keyframes[0]] : keyframes, options));
  };

  animate(section.querySelector("[data-testimonials-heading]"), (a) => ({ transform: `translateY(${headingYAt(a, m)}px)` }));
  animate(section.querySelector("[data-testimonials-list]"), (a) => ({ transform: `translateY(${listYAt(a, m)}px)` }));
  section.querySelectorAll("[data-testimonials-list] > li").forEach((li, index) => {
    animate(li.querySelector("[data-card-content]"), (a) => ({ opacity: contentOpacityAt(index, a) }));
    animate(li.querySelector("[data-ghost]"), (a) => ({
      transform: `translate(${-m.cardLeft - 1}px, ${ghostYAt(index, a, m)}px)`,
    }));
  });

  return () => animations.forEach((animation) => animation.cancel());
}

type Props = { featured: Testimonial[]; all: Testimonial[] };

export function Testimonials({ featured, all }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  // Native scroll-driven animations where supported; motion values otherwise (e.g. Firefox).
  const [native, setNative] = useState(false);

  const last = featured.length - 1;
  const metrics = useMotionValue<Metrics>({ ...initialMetrics, last });

  // On larger screens "Show all testimonials" lives in the sticky nav.
  useEffect(() => {
    const open = () => setModalOpen(true);
    window.addEventListener(OPEN_TESTIMONIALS_EVENT, open);
    return () => window.removeEventListener(OPEN_TESTIMONIALS_EVENT, open);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const list = listRef.current;
    const heading = headingRef.current;
    if (!section || !stage || !list || !heading) return;

    let stopNative: (() => void) | null = null;

    const measure = () => {
      const cards = Array.from(list.children) as HTMLElement[];
      const stageHeight = stage.clientHeight;
      const firstHeight = cards[0]?.offsetHeight ?? 0;
      const m: Metrics = {
        offsets: cards.map((card) => card.offsetTop),
        heights: cards.map((card) => card.offsetHeight),
        stageWidth: stage.clientWidth,
        stageHeight,
        headingHeight: heading.offsetHeight,
        // Active card is vertically centred in the viewport.
        slotTop: Math.max(80, stageHeight / 2 - firstHeight / 2),
        cardLeft: (cards[0]?.getBoundingClientRect().left ?? 0) - stage.getBoundingClientRect().left,
        last,
      };
      metrics.set(m);

      stopNative?.();
      stopNative = runNativeTimeline(section, m);
      setNative(stopNative !== null);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(list);
    return () => {
      observer.disconnect();
      stopNative?.();
    };
  }, [metrics, last]);

  // Fallback path: the same layout functions driven by JS scroll tracking.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const active = useTransform(scrollYProgress, [0, 1], [0, last]);
  const listY = useTransform(() => listYAt(active.get(), metrics.get()));
  const headingY = useTransform(() => headingYAt(active.get(), metrics.get()));

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative flex flex-col bg-ink text-white"
      style={{ height: `calc(100lvh + ${last * STEP_VH}svh)` }}
    >
      <div ref={stageRef} className="sticky top-0 h-lvh shrink-0 overflow-hidden">
        <motion.div
          ref={headingRef}
          data-testimonials-heading
          style={native ? undefined : { y: headingY }}
          className="absolute inset-x-0 top-0 will-change-transform"
        >
          <HeadingContent />
        </motion.div>

        <motion.ul
          ref={listRef}
          data-testimonials-list
          style={native ? undefined : { y: listY }}
          className="absolute inset-x-0 top-0 mx-auto flex w-full max-w-[1035px] flex-col gap-[120px] px-5 will-change-transform md:gap-[160px]"
        >
          {featured.map((testimonial, i) => (
            <FadingCard key={testimonial.id} testimonial={testimonial} index={i} active={active} metrics={metrics} native={native} />
          ))}
        </motion.ul>

      </div>

      {/*
        Mobile only (desktop uses the sticky nav). CSS sticky at the end of the section: it
        stays at the bottom of the screen while the section is on screen and scrolls away with
        the section's end, handled natively by the browser (no scroll-driven JS, so no jitter).
      */}
      <div className="sticky bottom-0 z-10 mt-auto flex justify-center pb-[15px] md:hidden">
        <PillButton onClick={() => setModalOpen(true)} aria-haspopup="dialog">
          Show All
        </PillButton>
      </div>

      {modalOpen && <TestimonialsModal testimonials={all} onClose={() => setModalOpen(false)} />}
    </section>
  );
}

type FadingCardProps = {
  testimonial: Testimonial;
  index: number;
  active: MotionValue<number>;
  metrics: MotionValue<Metrics>;
  native: boolean;
};

/**
 * Cards away from the active slot dim their text to 50%. The frosted glass is a
 * pre-blurred copy of the heading clipped inside the card and kept aligned with
 * the real one, so moving cards only shift layers instead of re-blurring every
 * frame.
 */
function FadingCard({ testimonial, index, active, metrics, native }: FadingCardProps) {
  const contentOpacity = useTransform(active, (a) => contentOpacityAt(index, a));
  const ghostY = useTransform(() => ghostYAt(index, active.get(), metrics.get()));
  const ghostX = useTransform(() => -metrics.get().cardLeft - 1);
  const ghostWidth = useTransform(() => metrics.get().stageWidth);

  return (
    <li>
      <TestimonialCard
        testimonial={testimonial}
        contentStyle={native ? undefined : { opacity: contentOpacity }}
        backdrop={
          <motion.div
            data-ghost
            style={native ? { width: ghostWidth } : { x: ghostX, y: ghostY, width: ghostWidth }}
            className="absolute top-0 left-0 will-change-transform"
          >
            <HeadingContent ghost />
          </motion.div>
        }
      />
    </li>
  );
}
