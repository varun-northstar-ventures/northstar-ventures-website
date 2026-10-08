"use client";

import { useRef } from "react";

import { contactLinks, externalLinkProps, links, navLinks } from "@/content/site";
import { ArrowRight, ArrowUpRight, CloseIcon, MenuIcon } from "./ui/icons";

/** Full-screen purple menu for small screens, built on <dialog> for focus trapping and Esc. */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="flex h-10 w-[42px] cursor-pointer items-center justify-center border border-white text-white md:hidden"
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-brand p-0 text-white opacity-0 transition-opacity duration-300 open:opacity-100 starting:open:opacity-0 md:hidden"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) close();
        }}
      >
        <div className="flex min-h-full flex-col">
          <div className="flex h-20 items-center justify-between px-5">
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny SVG logo */}
            <img src="/logo-light.svg" alt="NorthStar Ventures" width={126} height={40} className="h-10 w-auto" />
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex h-10 w-[42px] cursor-pointer items-center justify-center border border-white"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10 px-5">
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="flex items-center justify-between text-2xl leading-none">
                    <span className="trim-cap block">{link.label}</span>
                    <ArrowRight />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-10 px-5 pb-5">
            <ul className="flex flex-wrap gap-x-5 gap-y-5">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    title={"title" in link ? link.title : undefined}
                    {...externalLinkProps(link.href)}
                    className="flex w-[89px] items-start justify-between border-b border-white pb-2.5 text-sm leading-[14px]"
                  >
                    <span className="trim-cap block">{link.label}</span>
                    <ArrowUpRight strokeWidth={1.2} />
                  </a>
                </li>
              ))}
            </ul>
            <a href={links.letsTalk} target="_blank" rel="noopener noreferrer" className="flex h-[60px] w-fit items-center border border-white px-5 py-2.5 text-base leading-4">
              <span className="flex items-end gap-2.5">
                <span className="trim-cap block">
                  Let’s
                  <br />
                  Talk.
                </span>
                <ArrowUpRight />
              </span>
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
