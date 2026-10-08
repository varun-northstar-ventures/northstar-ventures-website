import type { StaticImageData } from "next/image";

import revit2027 from "@/assets/videos/revit-2027.png";
import instructorInsights from "@/assets/videos/instructor-insights.png";
import tipsAndTricks from "@/assets/videos/tips-and-tricks.png";
import getStartedAutocad from "@/assets/videos/get-started-autocad.png";
import partner1 from "@/assets/partners/partner-1.png";
import partner2 from "@/assets/partners/partner-2.png";
import partner3 from "@/assets/partners/partner-3.png";
import partner4 from "@/assets/partners/partner-4.png";
import partner5 from "@/assets/partners/partner-5.png";

/** Placeholder until real URLs are provided. */
export const PLACEHOLDER_URL = "https://example.com";

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Partners", href: "#partners" },
  { label: "Credentials", href: "#credentials" },
] as const;

export const designations = [
  "Founder",
  "Autodesk Certified Instructor",
  "Autodesk Partner Onboarding",
  "Global Trainer",
] as const;

export const links = {
  downloadProfile: PLACEHOLDER_URL,
  watchMe: PLACEHOLDER_URL,
  beAMember: PLACEHOLDER_URL,
  aciSuccessStory: PLACEHOLDER_URL,
  whatsapp: PLACEHOLDER_URL,
};

export const contactLinks = [
  { label: "Phone", href: PLACEHOLDER_URL },
  { label: "Email", href: PLACEHOLDER_URL },
  { label: "LinkedIn", href: PLACEHOLDER_URL },
  { label: "Gravatar", href: PLACEHOLDER_URL },
  { label: "Credly", href: PLACEHOLDER_URL },
] as const;

export const stats = [
  { value: 12, suffix: "+", label: "Years of Experience" },
  { value: 1000, suffix: "+", label: "Professionals Trained" },
  { value: 15, suffix: "+", label: "Countries" },
  { value: 4800, suffix: "+", label: "Hours of Online Trainings Delivered" },
] as const;

export type Course = { title: string; hours: number; href: string };
export type CourseCategory = { title: string; courses: Course[] };

const course = (title: string, hours: number): Course => ({
  title,
  hours,
  href: PLACEHOLDER_URL,
});

export const courseCategories: CourseCategory[] = [
  {
    title: "Autodesk AutoCAD",
    courses: [
      course("AutoCAD Level 1 Essentials", 24),
      course("AutoCAD Level 2: Beyond Basics", 16),
      course("AutoCAD Level 3: Advanced", 24),
      course("AutoCAD Level 4: 3D Modeling", 24),
      course("AutoCAD for Interior Design", 24),
    ],
  },
  {
    title: "Autodesk AutoCAD Electrical",
    courses: [course("AutoCAD Electrical with NFPA Standards", 24)],
  },
  {
    title: "Autodesk Revit",
    courses: [
      course("Revit Fundamentals of Architecture", 32),
      course("Revit Fundamentals of Structure", 32),
      course("Revit Fundamentals of MEP HVAC and Mechanical", 24),
      course("Revit Fundamentals of MEP Electrical", 24),
      course("Revit Fundamentals of MEP Piping and Plumbing", 24),
      course("Revit Interior Design", 32),
    ],
  },
  {
    title: "Autodesk AutoCAD Plant 3D",
    courses: [course("Introduction to Plant Design", 24)],
  },
  {
    title: "Autodesk Vault",
    courses: [course("Autodesk Vault for Inventor and AutoCAD Users", 16)],
  },
  {
    title: "Autodesk Forma 360",
    courses: [course("Introduction to Autodesk Forma 360", 16)],
  },
];

export type Logo = { src: StaticImageData; alt: string; className: string; href: string };

export const partners: Logo[] = [
  { src: partner1, alt: "NetCom Learning", className: "w-[118px] lg:w-[185px]", href: PLACEHOLDER_URL },
  { src: partner2, alt: "SourceCAD", className: "w-[118px] lg:w-[160px]", href: PLACEHOLDER_URL },
  { src: partner3, alt: "CTO – CAD Training Online", className: "w-[118px] lg:w-[160px]", href: PLACEHOLDER_URL },
  { src: partner4, alt: "EduCADD", className: "w-[118px] lg:w-[160px]", href: PLACEHOLDER_URL },
  { src: partner5, alt: "AECIX", className: "w-[238px] lg:w-[160px]", href: PLACEHOLDER_URL },
];

export type Video = { title: string; image: StaticImageData; href: string };

export const videos: Video[] = [
  { title: "What's new in Autodesk Revit 2027", image: revit2027, href: PLACEHOLDER_URL },
  { title: "Instructor Insights May 2025", image: instructorInsights, href: PLACEHOLDER_URL },
];

export const moreVideos: Video[] = [
  {
    title: "Tips and Tricks to Optimize Your AutoCAD Experience",
    image: tipsAndTricks,
    href: PLACEHOLDER_URL,
  },
  {
    title: "Get started with New AutoCAD 2022 in 30 minutes",
    image: getStartedAutocad,
    href: PLACEHOLDER_URL,
  },
];

export type Testimonial = {
  id: number;
  name: string;
  /** One string per paragraph, or a single string. */
  quote: string | string[];
  /** Training testimonials show Course / Industry / Location under the quote. */
  course?: string;
  industry?: string;
  location?: string;
  /** Partner testimonials show the company logo and the person's designation instead. */
  designation?: string;
  company?: string;
  logo?: StaticImageData;
};

const sampleTestimonial = {
  name: "Brian C Eberhart",
  quote:
    "I could not think of anything that would need changing. This course was very well ran and provided ample time to complete the task. The instructor, Varun, was very informative and pleasant to work with",
  course: "AutoCAD 3D Drawing and Modeling",
  industry: "Government",
  location: "United States",
};

// TODO: replace with real testimonials. All ten repeat the one testimonial in the design.
export const testimonials: Testimonial[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  ...sampleTestimonial,
}));

export const partnerTestimonials: Testimonial[] = [
  {
    id: 101,
    name: "Rick Feineis",
    designation: "CTT, ACE",
    company: "CAD Training Online",
    logo: partner3,
    quote: [
      "Varun Nair has taught for CAD Training Online, an Autodesk Authorized Training Center, since 2024, and he is one of the instructors I rely on most. He teaches a wide range of Autodesk software for us, including Revit Architecture, Revit MEP, Revit Structure, Revit Interior Design, AutoCAD, AutoCAD Electrical, and Fusion 360, in live online classes for working professionals, career changers, and students.",
      "Varun's lessons are well organized and build skills one step at a time, so each new skill rests on the one before it. He keeps students doing the work themselves instead of watching, and he gives them time to finish each exercise before moving on. He ties the software to how it is used on real projects, and when a client needs something specific, he designs the training around it.",
      "Varun is dependable and professional. He regularly carries a full teaching schedule, at times running two courses at once, and he is always looking to add new software to what he teaches. I recommend him without hesitation to any organization that needs a knowledgeable, patient, and committed Autodesk instructor.",
    ],
  },
  {
    id: 102,
    name: "Haripriya",
    designation: "Chief Executive Officer",
    company: "AECIX Learning",
    logo: partner5,
    quote:
      "Varun is highly committed to every responsibility he undertakes and consistently demonstrates dedication in delivering quality work. He is also a positive-minded and approachable individual, making him easy to collaborate with and a valued member of any team. His willingness to support others and maintain a constructive attitude contributes to a productive and pleasant work environment.",
  },
];
