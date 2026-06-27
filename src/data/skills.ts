export interface SkillGroup {
  category: string;
  items: string[];
}

// Adjust to match the resume. Grouped for scannability.
export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Astro",
      "Tailwind CSS",
      "HTML/CSS",
      "Accessibility",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "REST APIs",
      "Serverless / Azure Functions",
      "SQL",
      "Auth",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: ["Azure", "Cloudflare", "GitHub Actions", "CI/CD", "Docker"],
  },
  {
    category: "Tools",
    items: ["Git", "Vite", "ESLint / Prettier", "Vitest", "Figma"],
  },
];
