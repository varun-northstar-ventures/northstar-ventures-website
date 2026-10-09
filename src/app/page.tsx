import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Courses } from "@/components/Courses";
import { Credentials } from "@/components/Credentials";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { StickyNav } from "@/components/StickyNav";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { TrainerFamily } from "@/components/TrainerFamily";
import { WatchAndRead } from "@/components/WatchAndRead";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { testimonials } from "@/content/site";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Credentials />
        <About />
        <Courses />
        <TrainerFamily />
        <Partners />
        <WatchAndRead />
        <Testimonials featured={testimonials.slice(0, 4)} all={testimonials} />
      </main>
      <Contact />
      <StickyNav />
      <WhatsAppButton />
    </>
  );
}
