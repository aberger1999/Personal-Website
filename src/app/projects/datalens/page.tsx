import Link from 'next/link';
import { Github } from 'lucide-react';

const REPO_URL = 'https://github.com/aberger1999/Data-Analysis-Application';

async function getLastUpdated() {
  try {
    const res = await fetch('https://api.github.com/repos/aberger1999/Data-Analysis-Application', {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.updated_at
      ? new Date(data.updated_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null;
  } catch {
    return null;
  }
}

export default async function DataLensProjectPage() {
  const lastUpdated = await getLastUpdated();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 mt-20">
      <div className="mb-6">
        <Link href="/projects" className="text-blue-400 hover:underline text-sm">
          ← Back to Projects
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4 mt-8">DataLens</h1>
      <p className="text-lg text-gray-300 mb-4">
        DataLens is a local-first desktop app designed to unify the full data workflow in one
        place: preprocessing, feature engineering, model training, visualization, and report
        generation. The goal is to provide an offline, no-subscription workflow for practical data
        science.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition duration-200 flex items-center gap-1 text-sm"
        >
          <Github size={18} />
          <span>View on GitHub</span>
        </a>
        {lastUpdated && <span className="text-xs text-gray-400">Last updated: {lastUpdated}</span>}
      </div>

      <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-gray-300 space-y-3">
        <p>
          <span className="font-semibold text-white">Current status:</span> v1.0 with active roadmap
          updates.
        </p>
        <p>
          <span className="font-semibold text-white">Stack:</span> Python core with HTML/CSS UI
          components.
        </p>
        <p>
          <span className="font-semibold text-white">Focus:</span> fast local execution, clean user
          flow, and integrated tooling for end-to-end analysis.
        </p>
      </div>
    </div>
  );
}
