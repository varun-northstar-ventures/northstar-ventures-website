import Image from "next/image";

import contactPortrait from "@/assets/contact-portrait.png";
import { contactLinks, credits, externalLinkProps } from "@/content/site";
import { ArrowUpRight } from "./ui/icons";
import { SectionTitle } from "./ui/SectionTitle";
import { Dot } from "./ui/Text";

function FooterNote({ className = "" }: { className?: string }) {
  return (
    <div className={`text-xs leading-3 whitespace-nowrap ${className}`}>
      <p>© 2026 Northstar Ventures</p>
      <p className="flex flex-col gap-2.5 lg:flex-row lg:gap-6">
        <span>
          <span className="text-ink/50">Designed By</span>{" "}
          <a href={credits.designer.href} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-brand hover:underline">
            {credits.designer.name}
          </a>
        </span>
        <span>
          <span className="text-ink/50">Developed By</span>{" "}
          <a href={credits.developer.href} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-brand hover:underline">
            {credits.developer.name}
          </a>
        </span>
      </p>
    </div>
  );
}

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-title">
      <div className="container-page flex flex-col gap-0 pt-[100px] lg:flex-row lg:items-end lg:justify-between lg:gap-[43px] lg:pt-0">
        <div className="flex flex-col gap-5 md:gap-[30px] lg:w-[534px] lg:self-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny SVG logo */}
          <img src="/logo-dark.svg" alt="Northstar Ventures" width={190} height={60} className="h-[50px] w-auto self-start md:h-[60px]" data-reveal />
          <SectionTitle eyebrow="Get In Touch" id="contact-title">
            Let&apos;s Build <br className="hidden md:block" />
            Something <br className="hidden md:block" />
            Useful<Dot />
          </SectionTitle>
          <p className="body-copy max-w-[426px]" data-reveal>
            Have a training requirement or want to explore a partnership? I&apos;d be glad to hear from you.
          </p>
          <ul className="hidden flex-wrap gap-[30px] lg:flex" data-reveal>
            <ContactLinks />
          </ul>
        </div>

        <div className="flex items-stretch justify-between gap-[30px] lg:contents">
          <div className="flex w-[89px] shrink-0 flex-col justify-between pt-[30px] pb-5 lg:hidden">
            <ul className="flex flex-col gap-5">
              <ContactLinks />
            </ul>
            <FooterNote className="flex flex-col gap-2.5" />
          </div>
          <Image
            src={contactPortrait}
            alt="Varun Nair standing, photographed from above"
            sizes="(min-width: 1024px) 400px, 190px"
            className="mt-5 h-auto w-[190px] shrink-0 lg:mt-[125px] lg:w-[400px]"
          />
        </div>
      </div>

      <div className="container-page hidden h-[50px] lg:block">
        <FooterNote className="flex h-full items-center justify-between" />
      </div>

    </footer>
  );
}

function ContactLinks() {
  return contactLinks.map((link) => (
    <li key={link.label}>
      <a
        href={link.href}
        title={"title" in link ? link.title : undefined}
        {...externalLinkProps(link.href)}
        className="flex w-[89px] items-start justify-between gap-4 border-b border-brand pb-2.5 text-sm leading-[14px] text-brand transition-opacity duration-300 hover:opacity-70 lg:w-auto lg:text-base lg:leading-4"
      >
        <span className="trim-cap block">{link.label}</span>
        <ArrowUpRight strokeWidth={1.2} />
      </a>
    </li>
  ));
}
