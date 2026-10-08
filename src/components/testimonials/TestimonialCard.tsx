"use client";

import Image from "next/image";
import { motion, type MotionStyle } from "motion/react";
import type { ReactNode } from "react";

import type { Testimonial } from "@/content/site";

type Props = {
  testimonial: Testimonial;
  className?: string;
  /** Opacity etc. for the glass background layer. */
  glassStyle?: MotionStyle;
  /** Opacity etc. for the text. */
  contentStyle?: MotionStyle;
  /**
   * Pre-blurred copy of what sits behind the card. When given, the card is drawn
   * opaque with this inside it instead of using a live `backdrop-filter`, which
   * is far cheaper while the card moves on scroll.
   */
  backdrop?: ReactNode;
  /** Cap the card's height and scroll long reviews inside it (used in the popup). */
  scrollable?: boolean;
};

/**
 * Frosted-glass finish: a faint white sheen across the pane, a thin bright edge
 * and a soft top highlight, over a blurred view of what's behind.
 */
const glassFinish =
  "border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.02)_45%,rgba(255,255,255,0.06)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_1px_0_0_rgba(255,255,255,0.08),0_10px_40px_rgba(0,0,0,0.35)]";

const paragraphs = (quote: Testimonial["quote"]) => (Array.isArray(quote) ? quote : [quote]);

/**
 * Glass testimonial card. Training testimonials show Course / Industry / Location
 * under the quote; partner testimonials show the company logo and designation.
 * Background and text are separate layers that fade with their own opacity.
 */
export function TestimonialCard({ testimonial, className = "", glassStyle, contentStyle, backdrop, scrollable }: Props) {
  const { name, quote, logo, company, designation, course, industry, location } = testimonial;

  return (
    <div
      className={`relative flex flex-col p-[30px] text-white ${
        scrollable ? "max-h-[calc(100svh-240px)] md:max-h-[calc(100svh-180px)] md:px-[42px] md:py-10" : ""
      } ${className}`}
    >
      {backdrop ? (
        <motion.div aria-hidden="true" data-card-glass style={glassStyle} className="absolute inset-0 overflow-hidden bg-ink">
          {backdrop}
          <div className={`absolute inset-0 bg-ink/60 ${glassFinish}`} />
        </motion.div>
      ) : (
        <motion.div
          aria-hidden="true"
          data-card-glass
          style={glassStyle}
          className={`absolute inset-0 bg-ink/70 backdrop-blur-[12px] ${glassFinish}`}
        />
      )}

      <motion.figure
        data-card-content
        style={contentStyle}
        className={`relative flex min-h-0 flex-col gap-[30px] ${
          scrollable ? "-mr-3 overflow-y-auto overscroll-contain pr-3 [scrollbar-color:rgba(255,255,255,0.3)_transparent] [scrollbar-width:thin]" : ""
        }`}
      >
        <figcaption className={logo ? "flex flex-col gap-5 md:flex-row md:items-center md:gap-[30px]" : ""}>
          {logo && <Image src={logo} alt={company ?? ""} sizes="230px" className="h-10 w-auto self-start md:h-[60px] md:self-center" />}
          <div className="flex flex-col gap-2.5">
            <cite className="text-lg leading-[1.5] not-italic md:text-2xl md:leading-[1.5]">
              <span className="text-brand">{"//"}</span>
              {name}
            </cite>
            {designation && <p className="text-sm leading-[1.5] text-white/90 md:text-base md:leading-[1.5]">{designation}</p>}
          </div>
        </figcaption>

        <blockquote className="flex flex-col gap-5 text-sm leading-6 md:text-base md:leading-[30px]">
          {paragraphs(quote).map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </blockquote>

        {course && (
          <dl className="flex flex-col gap-1.5 text-xs leading-[1.5] md:flex-row md:justify-between md:text-sm md:leading-[1.5]">
            <div>
              <dt className="inline text-brand">Course: </dt>
              <dd className="inline">{course}</dd>
            </div>
            {industry && (
              <div>
                <dt className="inline text-brand">Industry: </dt>
                <dd className="inline">{industry}</dd>
              </div>
            )}
            {location && (
              <div>
                <dt className="inline text-brand">Location: </dt>
                <dd className="inline">{location}</dd>
              </div>
            )}
          </dl>
        )}
      </motion.figure>
    </div>
  );
}

/** "RESULTS SPEAK LOUDER" display type. */
export const testimonialsDisplayClass =
  "trim-cap text-[72px] leading-[62px] font-medium uppercase md:text-[120px] md:leading-[100px]";
