export interface ExperienceEntry {
  role: string;
  company: string;
  /** Free-form date range, e.g. "Jan 2023 – Present". */
  period: string;
  location?: string;
  highlights: string[];
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack Engineer",
    company: "Choctaw Nation of Oklahoma",
    period: "Feb 2023 – Present",
    highlights: [
      "Owned end-to-end development of 6 core member-services single-page applications (SPAs) built with ASP.NET Core, C#, and Blazor within an Agile environment, serving both tribal citizens and internal administrative platforms",
      "Designed and implemented a serverless notification platform serving 400k+ users using a REST API layer across Azure App Service, Azure API Management (APIM), and serverless Azure Functions",
      "Migrated a legacy application to Blazor, reducing report generation latency from 20 seconds to 5 seconds while improving overall API response times through EF Core query optimization",
      "Led the development of a stateful, multi-step onboarding workflow using reusable UI components; implemented frontend validation and backend sanitization that reduced invalid form submissions by 90% and improved application processing efficiency by 20%",
      "Optimized cross-system data integration by constructing automated SQL Server data-processing pipelines, shrinking data ingestion cycles by 15%",
      "Developed a rules-based recommendation engine processing user profiles and eligibility matrices to surface personalized suggestions, yielding a 10% lift in active program click-through rates and submissions",
    ],
    tech: ["ASP.NET Core", "C#", "Blazor", "Entity Framework Core", "REST API", "Telerik", "Azure App Service", "Azure Functions", "SQL Server", "xUnit", "Moq", "Playwright", "JavaScript", "Bootstrap"],
  },
  {
    role: "Software Engineer Intern",
    company: "Bank of China (Hong Kong)",
    period: "Jul 2021 – Aug 2021",
    highlights: [
      "Overhauled a legacy Excel reporting infrastructure by migrating relational data to SQL Server, reducing report generation time by 90% for the corporate banking team",
      "Built optimized analytical queries over 800k+ transaction records and client history logs, generating analytics that informed campaigns contributing to a 10% conversion increase on financial products",
    ],
    tech: ["SQL Server", "VBA", "Excel", "Data Migration", "Query Optimization"],
  },
  {
    role: "Software Engineer Intern",
    company: "Megvii",
    period: "Dec 2020 – Apr 2021",
    highlights: [
      "Constructed production SQL ETL pipelines to automate data transformations, shortening weekly report generation times by 20% to support a loyalty application scaling to 800k active users",
      "Designed performance-tuned BI dashboards that enabled business teams to respond to retail trends 10% faster during high-traffic retail windows",
    ],
    tech: ["Alibaba Cloud", "SQL", "ETL", "Query Optimization", "Data Analysis", "BI Dashboards"],
  },
];
