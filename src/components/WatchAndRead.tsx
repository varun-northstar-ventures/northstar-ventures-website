import Image from "next/image";

import aciSuccessStory from "@/assets/aci-success-story.png";
import { links, moreVideos, videos, type Video } from "@/content/site";
import { ShowMore } from "./ShowMore";
import { PillLink } from "./ui/PillButton";
import { SectionTitle } from "./ui/SectionTitle";
import { Dot } from "./ui/Text";

function VideoCard({ video }: { video: Video }) {
  return (
    <li data-reveal>
      <a
        href={video.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col gap-2.5 border border-black/20 p-4 transition-colors duration-300 hover:border-brand md:gap-4 md:p-5"
      >
        <span className="block overflow-hidden">
          <Image
            src={video.image}
            alt=""
            sizes="(min-width: 1024px) 543px, (min-width: 768px) 45vw, 90vw"
            className="aspect-[543/305] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </span>
        <h3 className="text-lg leading-[1.5] md:text-2xl md:leading-[1.5]">{video.title}</h3>
      </a>
    </li>
  );
}

function VideoGrid({ items }: { items: Video[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 md:gap-[30px]">
      {items.map((video) => (
        <VideoCard key={video.title} video={video} />
      ))}
    </ul>
  );
}

function SuccessStoryBanner() {
  return (
    <div
      className="flex flex-col items-start gap-5 bg-[radial-gradient(294px_314px_at_50%_100%,#c800ff_0%,#161718_100%)] px-5 py-[30px] text-white lg:flex-row lg:items-center lg:justify-between lg:bg-[radial-gradient(749px_749px_at_100%_100%,#c800ff_0%,#161718_100%)] lg:p-[30px]"
      data-reveal
    >
      <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:gap-[30px]">
        <Image src={aciSuccessStory} alt="ACI success story cover" sizes="178px" className="h-20 w-auto lg:h-[100px]" />
        <h3 className="border-t border-white/20 pt-5 text-lg leading-[1.5] font-medium lg:flex lg:h-[100px] lg:items-center lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[30px] lg:text-2xl lg:leading-[1.5]">
          ACI Success Story
          <br />B Varun Nair, ACI Gold
        </h3>
      </div>
      <PillLink href={links.aciSuccessStory} target="_blank" rel="noopener noreferrer" variant="light" icon="download">
        Download
      </PillLink>
    </div>
  );
}

export function WatchAndRead() {
  return (
    <section
      aria-labelledby="watch-title"
      className="container-page flex flex-col gap-5 pb-[100px] md:gap-[30px] md:pb-[140px]"
    >
      <SectionTitle eyebrow="Watch And Read" id="watch-title" align="center">
        Autodesk Training And <br className="hidden md:block" />
        Success Stories<Dot />
      </SectionTitle>
      <p className="body-copy text-center" data-reveal>
        A closer look at my Autodesk training sessions and the stories behind them.
      </p>

      <ShowMore extra={<VideoGrid items={moreVideos} />} after={<SuccessStoryBanner />}>
        <VideoGrid items={videos} />
      </ShowMore>
    </section>
  );
}
