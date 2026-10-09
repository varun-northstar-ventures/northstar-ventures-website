import { links } from "@/content/site";
import { ArrowUpRight } from "./ui/icons";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="container-page flex h-20 items-center justify-between md:h-auto md:pt-5">
        <a href="#top" aria-label="Northstar Ventures – home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny SVG logo, no optimisation needed */}
          <img src="/logo-light.svg" alt="Northstar Ventures" width={190} height={60} className="h-10 w-auto md:h-[60px]" />
        </a>

        <a
          href={links.letsTalk}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-[60px] items-center border border-white px-5 py-2.5 text-base leading-4 text-white transition-colors duration-300 hover:bg-white hover:text-brand md:flex"
        >
          <span className="flex items-end gap-2.5">
            <span className="trim-cap block">
              Let’s
              <br />
              Talk.
            </span>
            <ArrowUpRight />
          </span>
        </a>

        <MobileMenu />
      </div>
    </header>
  );
}
