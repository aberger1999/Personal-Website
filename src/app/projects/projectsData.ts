export interface Project {
  name: string;
  description: string;
  image?: string; // Path to image in public/ or external URL
  github?: string;
  demo?: string;
  internal: boolean;
}

export const projects: Project[] = [
  {
    name: "Apple Quality project",
    description: "Determine the quality of an apple (Jupyter Notebook)",
    github: "https://github.com/aberger1999/Apple-Quality",
    internal: false,
  },
  {
    name: "Data Analysis Application",
    description: "A computer program to help analyze data.",
    github: "https://github.com/aberger1999/Data-Analysis-Application",
    internal: false,
  },
  {
    name: "Simulated Hospital Database",
    description: "A simulated database for hospital data management.",
    internal: false,
  },
  {
    name: "Housing Price Prediction model/website",
    description: "A model and website for predicting housing prices.",
    github: "https://github.com/aberger1999/Housing-Price-Prediction",
    internal: false,
  },
  {
    name: "Data Mining Project",
    description: "A project focused on data mining techniques.",
    internal: false,
  },
  {
    name: "Personal Dashboard (news scrapper)",
    description: "A personal dashboard that scrapes news.",
    internal: false,
  },
  {
    name: "Discord Bot",
    description: "A custom Discord bot.",
    github: "https://github.com/aberger1999/Discord-Bot",
    internal: false,
  },
  {
    name: "Another Data mining project with algorithms",
    description: "A second data mining project with various algorithms.",
    internal: false,
  },
  {
    name: "Finance app",
    description: "A finance management application.",
    internal: false,
  },
]; 