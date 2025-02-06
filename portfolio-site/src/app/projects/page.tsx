export const metadata = {
  title: 'Projects',
};

import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Project Name",
    description: "A brief description of the project",
    image: "/images/project1.jpg",
    tags: ["React", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/yourusername/project",
    liveUrl: "https://project-demo.com",
    featured: true
  },
  // Add more projects here
];

export default function Projects() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-4">My Projects</h1>
        <p className="text-xl text-gray-300 mb-12">
          Here are some of the projects I've worked on. Each one taught me something new.
        </p>

        {/* Featured Project */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Featured Project</h2>
          <div className="bg-gray-800 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-64 md:h-full">
                <Image
                  src="/images/featured-project.jpg"
                  alt="Featured Project"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Featured Project Title</h3>
                <p className="text-gray-300 mb-6">
                  description of featured project.
                </p>
                <div className="flex gap-4 mb-6">
                  {["React", "Node.js", "MongoDB"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition duration-200"
                  >
                    <Github size={20} />
                    <span>View Code</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition duration-200"
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">Other Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href={project.githubUrl}
                      className="text-blue-400 hover:text-blue-300 transition duration-200"
                    >
                      <Github size={20} />
                    </Link>
                    <Link
                      href={project.liveUrl}
                      className="text-blue-400 hover:text-blue-300 transition duration-200"
                    >
                      <ExternalLink size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}