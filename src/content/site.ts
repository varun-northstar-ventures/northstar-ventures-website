import type { StaticImageData } from "next/image";

import revit2027 from "@/assets/videos/revit-2027.png";
import instructorInsights from "@/assets/videos/instructor-insights.png";
import tipsAndTricks from "@/assets/videos/tips-and-tricks.png";
import getStartedAutocad from "@/assets/videos/get-started-autocad.png";
import jaiprakashPandey from "@/assets/people/jaiprakash-pandey.webp";
import rickFeineis from "@/assets/people/rick-feineis.webp";
import partner1 from "@/assets/partners/partner-1.png";
import partner2 from "@/assets/partners/partner-2.png";
import partner3 from "@/assets/partners/partner-3.png";
import partner4 from "@/assets/partners/partner-4.png";
import partner5 from "@/assets/partners/partner-5.png";

/** Canonical site address (no trailing slash). */
export const SITE_URL = "https://northstar-ventures.in";

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
  /** Opens the profile PDF (served from /public) in a new tab. */
  downloadProfile: "/varun-nair-profile.pdf",
  watchMe: "https://www.youtube.com/watch?v=Ja-SGwnIQuo",
  letsTalk: "https://calendly.com/varun399/discoverycall",
  beAMember: "https://forms.gle/H9wCzGMEh78N4e18A",
  /** Autodesk "Celebrating ACIs" story PDF (served from /public). */
  aciSuccessStory: "/aci-success-story-varun-nair.pdf",
  whatsapp: "https://wa.me/919539449909",
};

export const contactLinks = [
  { label: "Phone", href: "tel:+919539449909", title: "+91 95394 49909" },
  { label: "Email", href: "mailto:varun@northstar-ventures.in", title: "varun@northstar-ventures.in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/varun-nair-8971796b/" },
  { label: "Gravatar", href: "https://gravatar.com/varun399" },
  { label: "Credly", href: "https://www.credly.com/users/b-varun-nair/badges" },
] as const;

/** Phone/email links open the dialer or mail app in place; web links open a new tab. */
export const externalLinkProps = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

export const stats = [
  { value: 12, suffix: "+", label: "Years of Experience" },
  { value: 1000, suffix: "+", label: "Professionals Trained" },
  { value: 15, suffix: "+", label: "Countries" },
  { value: 4800, suffix: "+", label: "Hours of Online Trainings Delivered" },
] as const;

export type Course = { title: string; hours: number; href: string };
export type CourseCategory = { title: string; courses: Course[] };

const course = (title: string, hours: number, link?: string): Course => ({
  title,
  hours,
  href: link ?? PLACEHOLDER_URL,
});

export const courseCategories: CourseCategory[] = [
  {
    title: "Autodesk AutoCAD",
    courses: [
      course("AutoCAD Level 1 Essentials", 24, "https://ascent.gilmoreglobal.com/en/product/6966e08e-2df8-4e51-9fb3-abb1e6db092e"),
      course("AutoCAD Level 2: Beyond Basics", 16, "https://ascent.gilmoreglobal.com/en/product/0c5752cb-8ece-47d3-aee9-8c612a2676ad"),
      course("AutoCAD Level 3: Advanced", 24, "https://ascent.gilmoreglobal.com/en/product/17a75a07-c711-4b27-b66c-97c29cac24e9"),
      course("AutoCAD Level 4: 3D Modeling", 24, "https://ascent.gilmoreglobal.com/en/product/c14376ba-bc88-414e-9fe2-f095cb5c43f8"),
      course("AutoCAD for Interior Design", 24, "https://www.sdcpublications.com/Textbooks/AutoCAD-2027-Interior-Designer/ISBN/978-1-63057-815-2/"),
    ],
  },
  {
    title: "Autodesk AutoCAD Electrical",
    courses: [course("AutoCAD Electrical with NFPA Standards", 24, "https://ascent.gilmoreglobal.com/en/product/b4bcb1ab-e69e-4e50-9044-eca09c378d50")],
  },
  {
    title: "Autodesk Revit",
    courses: [
      course("Revit Fundamentals of Architecture", 32, "https://ascent.gilmoreglobal.com/en/product/10eff870-88ba-4a15-a2bd-96f0bda34193"),
      course("Revit Fundamentals of Structure", 32, "https://ascent.gilmoreglobal.com/en/category/5028ea8e-4a54-41a2-8128-7b8cc6d1fc02"),
      course("Revit Fundamentals of MEP HVAC and Mechanical", 24, "https://ascent.gilmoreglobal.com/en/product/5e7f8142-8316-4e80-a0c0-8c59f115de12"),
      course("Revit Fundamentals of MEP Electrical", 24, "https://ascent.gilmoreglobal.com/en/product/5e7f8142-8316-4e80-a0c0-8c59f115de12"),
      course("Revit Fundamentals of MEP Piping and Plumbing", 24, "https://ascent.gilmoreglobal.com/en/product/5e7f8142-8316-4e80-a0c0-8c59f115de12"),
      course("Revit Interior Design", 32, "https://www.sdcpublications.com/Textbooks/Interior-Design-Using-Autodesk-Revit/ISBN/978-1-63057-750-6/"),
    ],
  },
  {
    title: "Autodesk AutoCAD Plant 3D",
    courses: [course("Introduction to Plant Design", 24, "https://ascent.gilmoreglobal.com/en/product/ad0bdfc2-8fcd-4e9d-b7b1-333078abda3c")],
  },
  {
    title: "Autodesk Vault",
    courses: [course("Autodesk Vault for Inventor and AutoCAD Users", 16, "https://ascent.gilmoreglobal.com/en/product/de02849a-0a06-420f-9616-420821fa5619")],
  },
  {
    title: "Autodesk Forma 360",
    courses: [course("Introduction to Autodesk Forma 360", 16, "https://www.autodesk.com/in/products/forma/overview")],
  },
];

export type Logo = { src: StaticImageData; alt: string; className: string; href: string };

export const partners: Logo[] = [
  { src: partner1, alt: "NetCom Learning", className: "w-[118px] lg:w-[185px]", href: "https://www.netcomlearning.com/our-team" },
  { src: partner2, alt: "SourceCAD", className: "w-[118px] lg:w-[160px]", href: "https://sourcecad.com/team" },
  { src: partner3, alt: "CTO – CAD Training Online", className: "w-[118px] lg:w-[160px]", href: "https://www.cadtrainingonline.com/autodesk-certified-instructors/?srsltid=AU7gw4Wlr_NpZ82IHD-L_crAltGdwwp9CSJG9Iw1sMgQ-OhzBSAx-Mwx" },
  // TODO: EduCADD link not provided yet.
  { src: partner4, alt: "EduCADD", className: "w-[118px] lg:w-[160px]", href: "https://educadd.co.in" },
  { src: partner5, alt: "AECIX", className: "w-[238px] lg:w-[160px]", href: "https://www.aecixlearning.com/about" },
];

export type Video = { title: string; image: StaticImageData; href: string };

export const videos: Video[] = [
  { title: "What's new in Autodesk Revit 2027", image: revit2027, href: "https://www.youtube.com/watch?v=LTk0ouWQTt0" },
  { title: "Instructor Insights May 2025", image: instructorInsights, href: "https://www.youtube.com/watch?v=ciuO1J8C4AQ" },
];

export const moreVideos: Video[] = [
  {
    title: "Tips and Tricks to Optimize Your AutoCAD Experience",
    image: tipsAndTricks,
    href: "https://www.youtube.com/watch?v=OuDpC3MOYDM",
  },
  {
    title: "Get started with New AutoCAD 2022 in 30 minutes",
    image: getStartedAutocad,
    href: "https://www.youtube.com/watch?v=XphA1rjv3rk",
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
  /** Headshot of the person giving the testimonial. */
  photo?: StaticImageData;
  /** Where the company logo links to (same page as in the Partners section). */
  companyHref?: string;
};

/** Student testimonials. The first four appear in the scrolling section; all show in "Show All Testimonials". */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Brian C Eberhart",
    course: "AutoCAD 3D Drawing and Modeling",
    industry: "Government",
    location: "United States",
    quote: "I could not think of anything that would need changing. This course was very well ran and provided ample time to complete the task. The instructor, Varun, was very informative and pleasant to work with",
  },
  {
    id: 2,
    name: "David Choi",
    course: "AutoCAD Electrical: Fundamentals with NFPA Standards",
    industry: "Manufacturing",
    location: "United States",
    quote: "Great Course, Varun was very in-depth and technical about my needs. A great teacher and a great experience overall.",
  },
  {
    id: 3,
    name: "Sarah Schotte",
    course: "AutoCAD for Interior Design",
    industry: "Architecture, Engineering & Construction",
    location: "United States",
    quote: "I enjoyed this course with Varun. I learned a lot. I appreciated how patient Varun was and never made me feel silly if I didn't understand something.",
  },
  {
    id: 4,
    name: "Ambola Colette",
    course: "AutoCAD Fundamentals",
    industry: "Education",
    location: "United States",
    quote: "The course with Varun was very important as it gives me the basics of AutoCAD that I need to get going. Hoping to take more advanced courses so that I can keep improving and supporting my school and students.",
  },
  {
    id: 5,
    name: "Kurt Thomasson",
    course: "AutoCAD Fundamentals",
    industry: "Architecture, Engineering & Construction",
    location: "United States",
    quote: "Before taking the class with Varun, the program was overwhelming. After I feel I can confidently use AutoCad to complete task for my job",
  },
  {
    id: 6,
    name: "Nicole Ducar",
    course: "Autodesk Revit: Fundamentals for Architecture",
    industry: "Architecture, Engineering & Construction",
    location: "United States",
    quote: "Varun is amazing and very patient. He was a joy to work with",
  },
  {
    id: 7,
    name: "Jahmal Boykin",
    course: "Autodesk Revit Fundamentals for MEP",
    industry: "Architecture, Engineering & Construction",
    location: "United States",
    quote: "Was very satisfied with the Varun's patience and diligence. I am well pleased with the course!!!",
  },
  {
    id: 8,
    name: "Vruddhi Kothari",
    course: "Autodesk Revit Fundamentals for Structure",
    industry: "Architecture, Engineering & Construction",
    location: "United States",
    quote: "It is great to learn Revit 2026 with Varun for my professional structural engineering projects.",
  },
  {
    id: 9,
    name: "Akula Kranti Kumar",
    course: "Masters in BIM",
    industry: "Architecture, Engineering & Construction",
    location: "India",
    quote: "It's a best course I have ever had. I am happy to learn Autodesk softwares. Thank you Varun for helping us to building world.",
  },
  {
    id: 10,
    name: "Jeanne Mercer Ballard",
    course: "Revit for Interior Design",
    industry: "Education/University",
    location: "United States",
    quote: "Varun was a great instructor.",
  },
  {
    id: 11,
    name: "Gianfranco Patio",
    course: "Revit MEP Electrical",
    industry: "Architecture, Engineering & Construction",
    location: "United States",
    quote: "Varun was very professional and knowledgeable. Loved the experience and I am already recommending it to my nephew.",
  },
  {
    id: 12,
    name: "Brian Kendall",
    course: "Revit MEP HVAC, Electrical AND Plumbing",
    industry: "Architecture, Engineering & Construction",
    location: "United States",
    quote: "The instructor, Varun Nair, was great. He was able to answer all of my questions and explain how to perform many tasks that I did not understand at first. His instruction was clear and concise and he took the time to ensure I had a firm grasp on the lessons before moving on. I would recommend him as an instructor to my colleagues and for future courses for myself.",
  },
];

export const partnerTestimonials: Testimonial[] = [
  {
    id: 101,
    name: "Rick Feineis",
    photo: rickFeineis,
    designation: "Founder, Autodesk Certified  Instructor (ACI) Platinum, CompTIA Certified Technical Trainer (CTT+),  Autodesk Certified Examiner (ACE)",
    company: "CAD Training Online",
    logo: partner3,
    companyHref: partners[2].href,
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
    companyHref: partners[4].href,
    quote:
      "Varun is highly committed to every responsibility he undertakes and consistently demonstrates dedication in delivering quality work. He is also a positive-minded and approachable individual, making him easy to collaborate with and a valued member of any team. His willingness to support others and maintain a constructive attitude contributes to a productive and pleasant work environment.",
  },
  {
    id: 103,
    name: "Jaiprakash Pandey",
    photo: jaiprakashPandey,
    designation: "Author and Creator",
    company: "SourceCAD Learning",
    logo: partner2,
    companyHref: partners[1].href,
    quote: [
      "Varun has delivered several training programs for SourceCAD, and each one has been a pleasure to watch. He has that rare mix of deep technical knowledge and genuine patience. He never rushes a learner, and he can explain the same concept three different ways until it clicks.",
      "What stands out most is how much participants trust him. After one of his sessions, I received messages from attendees asking specifically whether Varun would be teaching the next batch. In another program, a group of learners from very different experience levels joined the same session. Varun adjusted on the fly, kept the beginners comfortable while giving the experienced professionals real depth, and the feedback forms from that batch were some of the best we have received.",
      "Beyond the classroom, Varun is dependable. He prepares thoroughly, shows up on time, follows through on every commitment, and handles learner questions long after the session ends with the same care he shows during it. The feedback we consistently receive on his trainings is excellent, and he has played a real part in the experience our learners have with SourceCAD.",
      "I would recommend Varun without hesitation to any organization looking for a skilled, reliable, and engaging trainer.",
    ],
  },
];
