import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** 10×10 up-right arrow used on buttons and links. */
export function ArrowUpRight({ strokeWidth = 1, ...props }: IconProps & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" fill="none" aria-hidden="true" overflow="visible" {...props}>
      <path d="M0 0H10V10M10 0L0 10" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

/** 20×20 right arrow (testimonial carousel, mobile menu). */
export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true" overflow="visible" {...props}>
      <path d="M0 10H20M9.8 0L20 10L9.8 20" stroke="currentColor" />
    </svg>
  );
}

/** Plus that rotates into a close "×" when the accordion opens. */
export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 30 30" fill="none" aria-hidden="true" overflow="visible" {...props}>
      <path d="M15 0V30M0 15H30" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 31 30" fill="none" aria-hidden="true" overflow="visible" {...props}>
      <path d="M31 0L0.5 30M0 0L30.5 30" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** Rounded outline play icon from the "Watch Me" button. */
export function PlayOutline(props: IconProps) {
  return (
    <svg viewBox="0 0 13.24 14.37" width="13.24" height="14.37" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.5 0.402L11.75 4.592C12.675 5.129 13.245 6.117 13.245 7.187C13.245 8.257 12.675 9.245 11.75 9.782L4.5 13.972C3.572 14.508 2.427 14.508 1.499 13.971C0.571 13.435 -0.001 12.444 0 11.372L0 3.002C-0.001 1.93 0.571 0.939 1.499 0.402C2.427 -0.134 3.572 -0.134 4.5 0.402ZM3.6 12.412L10.85 8.232C11.223 8.019 11.452 7.621 11.45 7.192C11.454 6.759 11.225 6.358 10.85 6.142L3.6 1.962C3.419 1.853 3.212 1.794 3 1.792C2.332 1.792 1.79 2.334 1.79 3.002L1.79 11.372C1.79 11.693 1.917 12.001 2.144 12.228C2.371 12.454 2.679 12.582 3 12.582C3.212 12.58 3.419 12.521 3.6 12.412Z" />
    </svg>
  );
}

/** Solid triangle play mark (rotated polygon in the design). */
export function PlayTriangle(props: IconProps) {
  return (
    <svg viewBox="0 0 24.25 28" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24.25 14L0 28V0Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 16" width="20" height="16" fill="none" aria-hidden="true" overflow="visible" {...props}>
      <path d="M0 0.5H20M0 8H20M0 15.5H20" stroke="currentColor" />
    </svg>
  );
}
