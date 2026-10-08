import { links } from "@/content/site";

/**
 * Floating WhatsApp shortcut, pinned bottom-right on every screen and lined up
 * with the sticky nav on larger screens. Its green glow softly pulses.
 */
export function WhatsAppButton() {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-40 block size-10 rounded-full transition-transform duration-300 hover:scale-105 md:right-[50px] md:bottom-[41px] md:size-[50px]"
    >
      <span aria-hidden="true" className="whatsapp-glow absolute inset-0 rounded-full" />
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG icon */}
      <img src="/whatsapp-icon.svg" alt="" width={50} height={50} className="relative size-full" />
    </a>
  );
}
