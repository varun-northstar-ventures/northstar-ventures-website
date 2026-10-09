import Image from "next/image";

import aboutThumb from "@/assets/about-thumb.jpg";
import { links, stats } from "@/content/site";
import { CountUp } from "./CountUp";
import { Marquee } from "./Marquee";
import { PlayOutline, PlayTriangle } from "./ui/icons";
import { PillLink } from "./ui/PillButton";
import { afterWordsDelay, Dot, Eyebrow } from "./ui/Text";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-0 bg-ink text-white">
      <Marquee />

      <div className="container-page flex flex-col gap-5 pb-[100px] lg:flex-row lg:justify-between lg:gap-[90px] lg:pb-[140px]">
        <div className="flex flex-col items-start gap-4 lg:w-[387px] lg:shrink-0">
          <div data-reveal style={{ "--reveal-delay": afterWordsDelay(4) } as React.CSSProperties}>
            <Eyebrow label="About" />
          </div>
          <h2
            id="about-title"
            className="flex flex-col gap-4 text-[40px] leading-[40px] md:text-[54px] md:leading-[54px]"
            data-reveal="words"
          >
            <span className="trim-cap block">
              <span className="reveal-word" style={{ "--w": 0 } as React.CSSProperties}>A</span>{" "}
              <span className="reveal-word" style={{ "--w": 1 } as React.CSSProperties}>Little</span>{" "}
              <span className="reveal-word" style={{ "--w": 2 } as React.CSSProperties}>About</span>
            </span>
            <span className="flex items-center gap-4">
              <a
                href={links.watchMe}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch Varun’s introduction video"
                className="group relative flex h-[60px] w-[105px] items-center justify-center overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.3)] md:h-20 md:w-[140px]"
              >
                <Image src={aboutThumb} alt="" fill sizes="140px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-black/20" />
                <PlayTriangle className="relative h-7 w-[24.25px] text-brand" />
              </a>
              <span className="trim-cap block">
                <span className="reveal-word" style={{ "--w": 3 } as React.CSSProperties}>
                  Me<Dot />
                </span>
              </span>
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-5 md:gap-[30px] lg:max-w-[700px] lg:flex-1">
          <div className="body-copy flex flex-col gap-2.5" data-reveal>
            <p>
              I’m Varun Nair, an Autodesk Certified Instructor with 12 years of experience in AutoCAD, Revit, and
              professional software training. I work with individuals, professionals, and organisations worldwide,
              delivering practical, industry-focused training and helping professionals work towards Autodesk
              certification.
            </p>
            <p>
              I’m also the Founder of Northstar Ventures, where I collaborate with training partners to expand their
              Autodesk training capabilities. We support Autodesk Learning Partner onboarding, training centre setup,
              course development, and updated training programmes.
            </p>
            <p>
              Through consultation and practical guidance, I help training partners build effective training
              programmes and grow their capabilities.
            </p>
          </div>

          <dl className="grid gap-5 md:grid-cols-2 md:gap-[30px]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col gap-5 border border-white/20 p-5 md:p-[30px]"
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 100}ms` } as React.CSSProperties}
              >
                <dt className="order-2 text-sm leading-[1.5] md:text-base md:leading-[1.5] xl:whitespace-nowrap">{stat.label}</dt>
                <dd className="trim-cap order-1 text-[48px] leading-[48px] font-light md:text-[64px] md:leading-[64px]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col items-start gap-5 md:flex-row md:gap-[30px]" data-reveal>
            <PillLink href={links.downloadProfile} target="_blank" rel="noopener noreferrer" icon="download" className="w-[204px] md:w-auto">
              Download Profile
            </PillLink>
            <PillLink
              href={links.watchMe}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              icon={<PlayOutline className="text-brand" />}
              className="w-[204px] justify-between md:hidden"
            >
              Watch Me
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
