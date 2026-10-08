import trainerFamily from "@/assets/trainer-family.png";
import { links } from "@/content/site";
import { ParallaxImage } from "./ParallaxImage";
import { PillLink } from "./ui/PillButton";
import { afterWordsDelay, Dot, Eyebrow, RevealWords } from "./ui/Text";

export function TrainerFamily() {
  return (
    <section aria-labelledby="network-title" className="bg-ink text-white">
      {/* Larger screens: 70% of the viewport, so the dark panel below shows in the bottom 30%. */}
      <ParallaxImage
        src={trainerFamily}
        alt="Online Autodesk training session with a group of trainers on a video call"
        className="aspect-[2880/2050] md:aspect-auto md:h-[70svh]"
      />

      <div className="relative z-10 bg-ink">
        <div className="container-page flex flex-col gap-5 py-[100px] lg:flex-row lg:justify-between lg:gap-4 lg:py-[140px]">
          <div className="flex flex-col gap-4">
            <div data-reveal style={{ "--reveal-delay": afterWordsDelay(4) } as React.CSSProperties}>
              <Eyebrow label="Instructor Network" />
            </div>
            <h2 id="network-title" className="heading" data-reveal="words">
              <RevealWords>
                Join The
                <br />
                Trainer Family<Dot />
              </RevealWords>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-5 md:gap-4 lg:w-[426px]" data-reveal="right">
            <p className="body-copy">
              Connect with a trusted trainer community. When relevant training opportunities come up, I can channelize
              them to the right experts in our network.
            </p>
            <PillLink href={links.beAMember} target="_blank" rel="noopener noreferrer">
              Be A Member
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
