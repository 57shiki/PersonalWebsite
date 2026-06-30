import { GITHUB_URL, LINKEDIN_URL } from "./social";

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  shortName: string;
  bilingualName: string;
  /** Concrete title used in the page <title> and metadata. */
  role: string;
  /** Expansive, multi-faceted label shown as the hero eyebrow. */
  eyebrow: string;
  /** One-line value prop shown in the hero. */
  tagline: string;
  /** Slightly longer intro for the About section. */
  intro: string;
  email: string;
  location: string;
  resumeUrl: string;
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "Shiqi Hu",
  shortName: "Steven",
  bilingualName: "世祺",
  role: "Software Engineer",
  eyebrow: "Engineer · Photographer · Explorer",

  tagline:
    "Algorithms for efficiency. Apertures for aesthetics. Appetites for exploration.",
  intro:
    "I'm Steven — a software engineer who likes building things that are fast, " +
    "reliable, and a little delightful. I care about clean architecture, sensible " +
    "trade-offs, and shipping. When I'm not writing code, I'm usually behind a camera.",
  email: "potters.redox5z@icloud.com",
  location: "",
  resumeUrl: "/api/resume",
  socials: [
    { label: "GitHub", href: GITHUB_URL },
    { label: "LinkedIn", href: LINKEDIN_URL },
  ],
};
