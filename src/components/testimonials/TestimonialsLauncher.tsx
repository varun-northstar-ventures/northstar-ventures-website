"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import type { Testimonial } from "@/content/site";
import { PillButton } from "../ui/PillButton";

// The popup (and its carousel library) is only downloaded when the button is clicked.
const TestimonialsModal = dynamic(() => import("./TestimonialsModal"), { ssr: false });

type Props = { label: string; title: string; testimonials: Testimonial[]; className?: string };

/** Pink pill button that opens the testimonials popup with the given items. */
export function TestimonialsLauncher({ label, title, testimonials, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PillButton onClick={() => setOpen(true)} aria-haspopup="dialog" className={className}>
        {label}
      </PillButton>
      {open && <TestimonialsModal title={title} testimonials={testimonials} onClose={() => setOpen(false)} />}
    </>
  );
}
