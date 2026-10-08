"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import type { Testimonial } from "@/content/site";
import { ArrowRight, CloseIcon } from "../ui/icons";
import { TestimonialCard } from "./TestimonialCard";

type Props = { testimonials: Testimonial[]; onClose: () => void; title?: string };

const iconButtonClass =
  "flex size-[50px] shrink-0 cursor-pointer items-center justify-center border border-white/20 text-white transition-[opacity,border-color] duration-300 hover:border-brand disabled:cursor-default disabled:opacity-50 disabled:hover:border-white/20";

export default function TestimonialsModal({ testimonials, onClose, title = "Testimonials" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [viewportRef, embla] = useEmblaCarousel({ align: "center" });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    if (!embla) return;
    const sync = () => {
      setSelected(embla.selectedScrollSnap());
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla]);

  const close = () => dialogRef.current?.close();
  const prev = () => embla?.scrollPrev();
  const next = () => embla?.scrollNext();

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-white opacity-100 transition-opacity duration-300 starting:opacity-0"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close testimonials"
        className="absolute top-5 right-5 z-10 cursor-pointer text-white transition-colors duration-300 hover:text-brand md:top-[50px] md:right-[50px]"
      >
        <CloseIcon className="h-[30px] w-[31px]" />
      </button>

      {/* Clicking anywhere outside the card and controls closes the popup. */}
      <div
        className="flex h-full items-center justify-center px-5"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex w-full max-w-[1155px] flex-col items-center gap-5 md:flex-row md:gap-[30px]">
          <button type="button" onClick={prev} disabled={!canPrev} aria-label="Previous testimonial" className={`${iconButtonClass} hidden md:flex`}>
            <ArrowRight className="rotate-180" />
          </button>

          <div className="relative w-full min-w-0 flex-1">
            <div className="overflow-hidden" ref={viewportRef}>
              <ul className="-ml-5 flex touch-pan-y items-center">
                {testimonials.map((testimonial, i) => (
                  <li
                    key={testimonial.id}
                    className="min-w-0 flex-[0_0_100%] pl-5"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${testimonials.length}`}
                    aria-hidden={i !== selected}
                  >
                    <TestimonialCard testimonial={testimonial} scrollable />
                  </li>
                ))}
              </ul>
            </div>
            <p className="sr-only" aria-live="polite">
              Testimonial {selected + 1} of {testimonials.length}
            </p>
          </div>

          <button type="button" onClick={next} disabled={!canNext} aria-label="Next testimonial" className={`${iconButtonClass} hidden md:flex`}>
            <ArrowRight />
          </button>

          {/* Mobile: arrows sit below the card. */}
          <div className="flex gap-4 md:hidden">
            <button type="button" onClick={prev} disabled={!canPrev} aria-label="Previous testimonial" className={iconButtonClass}>
              <ArrowRight className="rotate-180" />
            </button>
            <button type="button" onClick={next} disabled={!canNext} aria-label="Next testimonial" className={iconButtonClass}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
