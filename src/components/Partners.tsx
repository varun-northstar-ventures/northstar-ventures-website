import Image from "next/image";

import { partnerTestimonials, partners } from "@/content/site";
import { SectionTitle } from "./ui/SectionTitle";
import { TestimonialsLauncher } from "./testimonials/TestimonialsLauncher";
import { Dot } from "./ui/Text";

export function Partners() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-title"
      className="container-page flex flex-col gap-5 pt-[100px] pb-20 md:gap-[60px] md:pt-0 md:pb-[140px]"
    >
      <div className="flex flex-col gap-[30px] lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle eyebrow="Partners" id="partners-title" className="max-w-[340px] md:max-w-[427px]">
          Good Work Is Better Together<Dot />
        </SectionTitle>
        <p className="body-copy lg:w-[426px]" data-reveal="right">
          I collaborate with training partners to bring Autodesk learning to more professionals.
        </p>
      </div>

      <ul className="grid grid-cols-2 border-t border-l border-line lg:grid-cols-5" data-reveal>
        {partners.map((partner, i) => (
          <li
            key={i}
            className={`border-r border-b border-line ${i === partners.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
          >
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-[120px] items-center justify-center px-5 lg:px-10"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                sizes="240px"
                className={`h-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${partner.className}`}
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="flex justify-center" data-reveal>
        <TestimonialsLauncher label="Show partners testimonials" title="Partner testimonials" testimonials={partnerTestimonials} />
      </div>
    </section>
  );
}
