import type { ComponentProps, ReactNode } from "react";

import { ArrowUpRight } from "./icons";

type Variant = "brand" | "light";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-white hover:bg-[#b000e0]",
  light: "bg-white text-ink hover:bg-[#f1f1f1]",
};

export const pillClass = (variant: Variant = "brand", extra = "") =>
  `inline-flex h-[50px] shrink-0 cursor-pointer items-center gap-4 rounded-full px-5 text-base leading-4 transition-colors duration-300 ${variants[variant]} ${extra}`;

type Icon = "arrow" | "download" | ReactNode;

function PillIcon({ icon }: { icon: Icon }) {
  if (icon === "arrow") return <ArrowUpRight />;
  if (icon === "download") return <ArrowUpRight className="rotate-135" />;
  return <>{icon}</>;
}

type LinkProps = ComponentProps<"a"> & { variant?: Variant; icon?: Icon };

export function PillLink({ variant, icon = "arrow", className = "", children, ...props }: LinkProps) {
  return (
    <a className={pillClass(variant, className)} {...props}>
      <span className="trim-cap block">{children}</span>
      <PillIcon icon={icon} />
    </a>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; icon?: Icon };

export function PillButton({ variant, icon = "arrow", className = "", children, ...props }: ButtonProps) {
  return (
    <button type="button" className={pillClass(variant, className)} {...props}>
      <span className="trim-cap block">{children}</span>
      <PillIcon icon={icon} />
    </button>
  );
}
