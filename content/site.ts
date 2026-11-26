import type { Site } from "../lib/types.ts";

export const githubProfile = { login: "RohinCodes15", href: "https://github.com/RohinCodes15" } as const;

export const site: Site = {
  name: "Rohin Pidathala",
  roleLine: "Software Developer · AI Engineer · Quantitative Researcher",
  intro: "I build software and explore how AI systems and quantitative methods can answer practical questions.",
  readout: "Programming since age 10",
  interests: [
    { title: "Software development", description: "Accessible interfaces and reliable software systems." },
    { title: "AI engineering", description: "Building with models and evaluating how they behave." },
    { title: "Quantitative research", description: "Using data and reproducible experiments to investigate questions." },
  ],
  links: [
    { label: "GitHub", href: githubProfile.href },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rohin-pidathala-53002842b/" },
  ],
  email: "rohinpidathala15@gmail.com",
};
