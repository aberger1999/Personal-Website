import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, Github } from 'lucide-react';
import { getProjectBySlug, projects } from '../projectsData';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPlaceholderPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 mt-20">
      <div className="mb-6">
        <Link href="/projects" className="text-blue-400 hover:underline text-sm">
          ← Back to Projects
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4 mt-8">{project.name}</h1>
      <p className="text-lg text-gray-300 mb-6">{project.description}</p>
      <p className="text-gray-400 mb-8">
        A full write-up for this project is being prepared. Check the repository for implementation
        details in the meantime.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        {project.github ? (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition duration-200 flex items-center gap-1 text-sm"
          >
            <Github size={18} />
            <span>View on GitHub</span>
          </Link>
        ) : (
          <span className="text-gray-400 flex items-center gap-1 text-sm">
            <Github size={18} />
            <span>Repository link coming soon</span>
          </span>
        )}

        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition duration-200 flex items-center gap-1 text-sm"
          >
            <ExternalLink size={18} />
            <span>View Demo</span>
          </Link>
        )}
      </div>
    </div>
  );
}
