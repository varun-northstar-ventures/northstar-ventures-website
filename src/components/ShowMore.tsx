"use client";

import { useId, useState, type ReactNode } from "react";

import { PillButton } from "./ui/PillButton";

type Props = {
  /** Server-rendered extra items, revealed below `children`. */
  extra: ReactNode;
  /** Content between the extra items and the toggle button. */
  after?: ReactNode;
  children: ReactNode;
};

export function ShowMore({ extra, after, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      {children}
      <div
        id={panelId}
        inert={!open}
        className={`-mt-5 grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:-mt-[30px] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-5 md:pt-[30px]">{extra}</div>
        </div>
      </div>
      {after}
      <PillButton
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        icon="arrow"
        className="self-center"
      >
        {open ? "Show Less" : "Show More"}
      </PillButton>
    </>
  );
}
