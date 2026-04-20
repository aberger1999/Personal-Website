import Link from 'next/link';
import { Github } from 'lucide-react';

const GITHUB_URL = 'https://github.com/aberger1999/Data-Mining-with-Apriori-and-Brute-Force-Algorithms---A-Comparison';
const PDF_PATH = '/Data Mining with Apriori and Brute Force Algorithms – A Comparison.pdf';

async function getLastUpdated() {
  try {
    const res = await fetch(
      'https://api.github.com/repos/aberger1999/Data-Mining-with-Apriori-and-Brute-Force-Algorithms---A-Comparison',
      {
        headers: { 'Accept': 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      }
    );
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

export default async function DataMiningAprioriProject() {
  const lastUpdated = await getLastUpdated();
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 mt-20">
      <div className="mb-6">
        <Link href="/projects" className="text-blue-400 hover:underline text-sm">← Back to Projects</Link>
      </div>
      <h1 className="text-4xl font-bold mb-4 mt-8">
        Data Mining with Apriori and Brute Force Algorithms – A Comparison
      </h1>
      <p className="text-lg text-gray-300 mb-4">
        This project compares Apriori and Brute Force algorithms for frequent itemset mining, using SQL-based transaction datasets and Python implementations to evaluate performance and accuracy.
      </p>
      <div className="flex items-center gap-4 mb-6">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition duration-200 flex items-center gap-1 text-sm"
        >
          <Github size={18} />
          <span>View on GitHub</span>
        </a>
        {lastUpdated && (
          <span className="text-xs text-gray-400">Last updated: {lastUpdated}</span>
        )}
      </div>
      <div className="w-full min-h-[80vh] border rounded-lg bg-white overflow-auto">
        <iframe
          src={PDF_PATH}
          title="Data Mining with Apriori and Brute Force Algorithms – A Comparison"
          className="w-full min-h-[80vh] border-none"
        />
      </div>
    </div>
  );
}
