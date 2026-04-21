export type ProjectCategory = 'my-apps' | 'personal-projects' | 'academic-projects';

export interface Project {
  name: string;
  description: string;
  /** URL slug used for /projects/[slug] routes */
  slug: string;
  github?: string;
  demo?: string;
  category: ProjectCategory;
}

export const projectSections: Array<{
  id: ProjectCategory;
  title: string;
  subtitle: string;
}> = [
  {
    id: 'my-apps',
    title: 'My Apps',
    subtitle: 'Products I am actively building.',
  },
  {
    id: 'personal-projects',
    title: 'Personal Projects',
    subtitle: 'Hands-on builds, experiments, and practical tools.',
  },
  {
    id: 'academic-projects',
    title: 'Academic Projects',
    subtitle: 'Coursework and research-focused development.',
  },
];

export const projects: Project[] = [
  {
    name: 'DataLens',
    description:
      'A local-first desktop app that combines preprocessing, feature engineering, machine learning, visualization, and report generation in one no-subscription workflow.',
    slug: 'datalens',
    github: 'https://github.com/aberger1999/Data-Analysis-Application',
    category: 'my-apps',
  },
  {
    name: 'Quorex',
    description:
      'A planning workspace that combines calendar, notes, vision board, reminders, and an AI assistant to keep plans and tasks connected.',
    slug: 'quorex',
    category: 'my-apps',
  },
  {
    name: 'Discord Bot',
    description: 'A custom Discord bot with automation and utility commands.',
    slug: 'discord-bot',
    github: 'https://github.com/aberger1999/Discord-Bot',
    category: 'personal-projects',
  },
  {
    name: 'Finance App',
    description: 'A finance management application for tracking and organizing personal finances.',
    slug: 'finance-app',
    category: 'personal-projects',
  },
  {
    name: 'Personal Dashboard',
    description: 'A personal dashboard that aggregates and displays scraped news sources.',
    slug: 'personal-dashboard',
    category: 'personal-projects',
  },
  {
    name: 'Real Estate App',
    description:
      'A housing price prediction model and web interface for real estate valuation workflows.',
    slug: 'real-estate-app',
    github: 'https://github.com/aberger1999/Housing-Price-Prediction',
    category: 'personal-projects',
  },
  {
    name: 'Language Detection Model',
    description:
      'A multilingual NLP classification project focused on model performance and deployment workflows.',
    slug: 'language-detection-model',
    category: 'academic-projects',
  },
  {
    name: 'Simulated Hospital Network',
    description:
      'A simulated healthcare data environment for hospital operations and database management.',
    slug: 'simulated-hospital-network',
    category: 'academic-projects',
  },
  {
    name: 'Apple Quality',
    description: 'Determine the quality of an apple using machine learning and notebook-driven analysis.',
    slug: 'apple-quality',
    github: 'https://github.com/aberger1999/Apple-Quality',
    category: 'academic-projects',
  },
  {
    name: 'Data Mining with Apriori and Brute Force Algorithms',
    description:
      'A comparison of Apriori and Brute Force algorithms for frequent itemset mining using SQL transaction data and Python implementations.',
    slug: 'data-mining-apriori-brute-force',
    github:
      'https://github.com/aberger1999/Data-Mining-with-Apriori-and-Brute-Force-Algorithms---A-Comparison',
    category: 'academic-projects',
  },
  {
    name: 'Data Mining with Algorithms - Random Forest and SVM',
    description:
      'Data mining using Random Forest and Support Vector Machine models on loan approval, user behavior, and weather classification datasets.',
    slug: 'data-mining-rf-svm',
    github:
      'https://github.com/aberger1999/Data-Mining-with-Algorithms---Random-Forest-and-Support-Vector-Machine',
    category: 'academic-projects',
  },
];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
