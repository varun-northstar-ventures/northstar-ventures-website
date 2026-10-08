import Image from "next/image";

import heroGlow from "@/assets/hero-glow.png";
import heroPortrait from "@/assets/hero-portrait.png";
import { designations } from "@/content/site";
import { Header } from "./Header";
import { RevealWords } from "./ui/Text";

export function Hero() {
  return (
    <div id="top" className="relative overflow-x-clip">
      {/* Purple half-ellipse glow (Figma "Ellipse 21", exported with its progressive blur). */}
      <div aria-hidden="true" className="hero-glow absolute left-1/2 -translate-x-1/2">
        <Image src={heroGlow} alt="" fill priority sizes="max(818px, 100vw)" className="object-fill" />
      </div>

      <Header />

      <section aria-labelledby="hero-title" className="relative flex flex-col items-center pt-[136px] md:pt-[156px]">
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

        {/* Portrait shrinks so the whole hero fits the viewport (design size is the maximum). */}
        <div className="relative mt-[84px] h-[clamp(260px,calc(100svh-342px),458px)] md:mt-[76px] md:h-[clamp(320px,calc(100svh-325px),700px)]">
          <Image
            src={heroPortrait}
            alt="Varun Nair, Autodesk Certified Instructor, seated portrait"
            priority
            sizes="(min-width: 768px) 549px, 360px"
            className="h-full w-auto max-w-none"
          />
        </div>
      </section>
    </div>
  );
}
