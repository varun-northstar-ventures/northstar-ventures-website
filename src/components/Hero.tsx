import Image from "next/image";

import heroGlow from "@/assets/hero-glow.png";
import heroPortrait from "@/assets/hero-portrait.png";
import { designations } from "@/content/site";
import { Header } from "./Header";
import { RevealWords } from "./ui/Text";

export function Hero() {
  return (
    <div id="top" className="relative flex h-svh min-h-[600px] flex-col overflow-clip">
      {/* Purple half-ellipse glow (Figma "Ellipse 21", exported with its progressive blur). */}
      <div aria-hidden="true" className="hero-glow absolute left-1/2 -translate-x-1/2">
        <Image src={heroGlow} alt="" fill priority sizes="max(818px, 100vw)" className="object-fill" />
      </div>

      <Header />

      <section aria-labelledby="hero-title" className="relative flex min-h-0 flex-1 flex-col items-center pt-[136px] md:pt-[156px]">
        <div className="flex flex-col items-center gap-5 text-center text-white">
          <h1
            id="hero-title"
            className="trim-cap text-[48px] leading-[48px] font-semibold md:text-[64px] md:leading-[64px]"
            data-reveal="words"
          >
            <RevealWords>
              <span className="font-light md:font-normal">Hi, I’m</span> <br className="md:hidden" />
              Varun Nair
            </RevealWords>
          </h1>

          <p className="text-[min(28px,6.4vw)] leading-none md:text-[40px]" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <span className="sr-only">{designations.join(", ")}</span>
            <span aria-hidden="true" className="relative grid h-[0.7em] place-items-center overflow-visible">
              {designations.map((title, i) => (
                <span
                  key={title}
                  className="rotating-word col-start-1 row-start-1 whitespace-nowrap"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {title}
                </span>
              ))}
            </span>
          </p>
        </div>

        {/* Portrait fills the space left under the title, so the hero always fits the screen exactly. */}
        <div className="relative mt-[84px] flex min-h-0 w-full flex-1 items-end justify-center md:mt-[76px]">
          <Image
            src={heroPortrait}
            alt="Varun Nair, Autodesk Certified Instructor, seated portrait"
            priority
            sizes="(min-width: 768px) 720px, 400px"
            className="h-full max-h-[900px] w-auto max-w-full object-contain object-bottom"
          />
        </div>
      </section>
    </div>
  );
}
