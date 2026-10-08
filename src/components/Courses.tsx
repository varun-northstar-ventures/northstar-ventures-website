import { courseCategories } from "@/content/site";
import { CourseAccordion } from "./CourseAccordion";
import { SectionTitle } from "./ui/SectionTitle";
import { Dot } from "./ui/Text";

export function Courses() {
  return (
    <section id="courses" aria-labelledby="courses-title" className="container-page flex flex-col items-center gap-5 pt-[100px] md:gap-[30px] md:py-[140px]">
      <SectionTitle eyebrow="Courses" id="courses-title" align="center">
        Learn With Me<Dot />
      </SectionTitle>
      <p className="body-copy text-center" data-reveal>
        Explore my Autodesk training. Each course can be tailored to your role, experience and project needs.
      </p>
      <CourseAccordion categories={courseCategories} />
    </section>
  );
}
