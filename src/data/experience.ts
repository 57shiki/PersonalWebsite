export interface ExperienceEntry {
  role: string;
  company: string;
  /** Free-form date range, e.g. "Jan 2023 – Present". */
  period: string;
  location?: string;
  highlights: string[];
  tech: string[];
}

// PLACEHOLDER — populated from Steven's resume once uploaded.
export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack Engineer",
    company: "Company Name",
    period: "2023 – Present",
    location: "Remote",
    highlights: [
      "Placeholder achievement — swap in real bullets from the resume.",
      "Built and shipped features across the stack with measurable impact.",
    ],
    tech: ["TypeScript", "React", "Node.js", "Azure"],
  },
];
