import { projects } from './projectsData';
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

export default async function Projects() {
  // Fetch last updated dates for all projects with GitHub links
  const lastUpdatedArr = await Promise.all(
    projects.map((project) =>
      project.github ? getLastUpdated(project.github) : Promise.resolve(null)
    )
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-4">My Projects</h1>
        <p className="text-xl text-gray-300 mb-12">
          Here are some of my projects that I have worked on.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300 flex flex-col h-full shadow-lg"
            >
              {/* Title and description at the top */}
              <div className="p-6 flex-1 flex flex-col justify-start">
                <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-4 mt-auto">
                  {project.github && (
                    <Link
                      href={project.github}
                      className="text-blue-400 hover:text-blue-300 transition duration-200 flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </Link>
                  )}
                  {project.demo && (
                    <Link
                      href={project.demo}
                      className="text-blue-400 hover:text-blue-300 transition duration-200 flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={20} />
                      <span>Demo</span>
                    </Link>
                  )}
                  {project.slug && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-blue-400 hover:text-blue-300 transition duration-200 flex items-center gap-1 text-base font-medium"
                    >
                      View Project
                    </Link>
                  )}
                </div>
                {/* Show GitHub last updated info if available */}
                {project.github && lastUpdatedArr[index] && (
                  <div className="text-xs text-gray-400 mt-2">
                    Last updated: <span>{lastUpdatedArr[index]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}