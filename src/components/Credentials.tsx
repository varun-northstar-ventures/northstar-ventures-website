import Image from "next/image";

import credential1 from "@/assets/credential-1.png";
import credential2 from "@/assets/credential-2.png";
import { SectionTitle } from "./ui/SectionTitle";
import { Dot } from "./ui/Text";

const badges = [
  { src: credential1, alt: "Autodesk Certified Instructor – Gold badge", className: "w-[100px] md:w-[150px]", href: "https://www.credly.com/badges/c6b2c3bb-b33d-4a98-b5f2-dc9f2416dfb5/public_url" },
  { src: credential2, alt: "Autodesk Level Up Partner Onboarding badge", className: "w-[104px] md:w-[156px]", href: "https://www.credly.com/badges/de1f3ee4-2650-4515-8953-a2e60ca74f84/public_url" },
];

export function Credentials() {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="container-page flex flex-col gap-5 py-[100px] lg:flex-row lg:items-start lg:justify-between lg:py-[140px]"
    >
      <div className="flex flex-col gap-5 md:gap-[30px] lg:w-[486px]">
        <SectionTitle eyebrow="Certifications" id="credentials-title">
          Officially Certified<Dot /> Ready To Enable<Dot />
        </SectionTitle>
        <p className="body-copy lg:w-[426px]" data-reveal>
          Recognised by Autodesk for instructional excellence and certified to support partners through the onboarding
          journey.
        </p>
      </div>

      <ul className="grid w-full grid-cols-2 border-t border-l border-line md:w-[599px]" data-reveal="right">
        {badges.map((badge) => (
          <li key={badge.alt} className="border-r border-b border-line bg-white">
            <a
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-square items-center justify-center"
            >
              <Image
                src={badge.src}
                alt={badge.alt}
                sizes="160px"
                className={`h-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${badge.className}`}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
