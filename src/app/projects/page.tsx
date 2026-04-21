import { getProjectsByCategory, projectSections, projects } from './projectsData';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

async function getLastUpdated(githubUrl: string): Promise<string | null> {
  try {
    // Extract owner and repo from the URL
    const match = githubUrl.match(/github.com\/(.+?)\/(.+?)(?:$|\/|\?)/);
    if (!match) return null;
    const owner = match[1];
    const repo = match[2];
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        // Optionally add Authorization header for higher rate limits
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.updated_at ? new Date(data.updated_at).toLocaleDateString() : null;
  } catch {
    return null;
  }
}

export const metadata = {
  title: 'Projects',
};

const FEATURED_PRODUCT_SLUGS = new Set(['datalens', 'quorex']);

export default async function Projects() {
  // Fetch last updated dates for all projects with GitHub links
  const lastUpdatedEntries = await Promise.all(
    projects.map(async (project) => {
      const lastUpdated = project.github ? await getLastUpdated(project.github) : null;
      return [project.slug, lastUpdated] as const;
    })
  );
  const lastUpdatedBySlug = new Map(lastUpdatedEntries);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-3">Projects</h1>
        <p className="text-lg text-gray-300 mb-10 max-w-3xl">
          A categorized view of my apps, personal builds, and academic work.
        </p>

        <div className="space-y-10">
          {projectSections.map((section) => {
            const sectionProjects = getProjectsByCategory(section.id);
            if (sectionProjects.length === 0) return null;

            return (
              <section key={section.id} className="space-y-4">
                <h2 className="text-3xl font-bold">{section.title}</h2>
                <p className="text-sm text-gray-400">{section.subtitle}</p>

                <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
                  {sectionProjects.map((project) => {
                    const isFeaturedProduct = FEATURED_PRODUCT_SLUGS.has(project.slug);

                    return (
                      <article
                        key={project.slug}
                        className={`rounded-xl overflow-hidden transition duration-300 flex flex-col h-full shadow-lg p-6 ${
                          isFeaturedProduct
                            ? 'bg-gradient-to-br from-slate-800 via-blue-900/80 to-indigo-900/80 border border-blue-400/40 ring-1 ring-blue-300/30 hover:scale-[1.02] hover:shadow-blue-500/20'
                            : 'bg-gray-800 hover:transform hover:scale-105'
                        }`}
                      >
                        <h3 className={`font-bold mb-2 text-white ${isFeaturedProduct ? 'text-2xl' : 'text-xl'}`}>
                          {project.name}
                        </h3>
                        <p className={`mb-4 ${isFeaturedProduct ? 'text-gray-100' : 'text-gray-300'}`}>
                          {project.description}
                        </p>

                        <div className="mt-auto flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-4">
                            {project.github ? (
                              <Link
                                href={project.github}
                                className={`transition duration-200 flex items-center gap-1 ${
                                  isFeaturedProduct
                                    ? 'text-blue-100 hover:text-white'
                                    : 'text-blue-400 hover:text-blue-300'
                                }`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${project.name} repository`}
                              >
                                <Github size={18} />
                                <span>Code</span>
                              </Link>
                            ) : (
                              <span
                                className={`flex items-center gap-1 ${
                                  isFeaturedProduct ? 'text-gray-200' : 'text-gray-400'
                                }`}
                              >
                                <Github size={18} />
                                <span>Repo Pending</span>
                              </span>
                            )}

                            {project.demo && (
                              <Link
                                href={project.demo}
                                className={`transition duration-200 flex items-center gap-1 ${
                                  isFeaturedProduct
                                    ? 'text-blue-100 hover:text-white'
                                    : 'text-blue-400 hover:text-blue-300'
                                }`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink size={18} />
                                <span>Demo</span>
                              </Link>
                            )}
                          </div>

                          <Link
                            href={`/projects/${project.slug}`}
                            className={`transition duration-200 flex items-center gap-1 text-base font-medium ${
                              isFeaturedProduct
                                ? 'rounded-md bg-white px-3 py-1 text-black hover:bg-gray-200'
                                : 'text-blue-400 hover:text-blue-300'
                            }`}
                          >
                            View Project
                          </Link>
                        </div>

                        {project.github && lastUpdatedBySlug.get(project.slug) && (
                          <p className={`mt-3 text-xs ${isFeaturedProduct ? 'text-gray-200' : 'text-gray-300'}`}>
                            Last updated: {lastUpdatedBySlug.get(project.slug)}
                          </p>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}