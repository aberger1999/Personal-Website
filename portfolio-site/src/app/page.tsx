// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex items-center justify-center">
        {/* Background dots/lines effect - we can add this later */}
        <div className="text-center space-y-8 z-10">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Alex Berger
          </h1>
          <p className="text-xl text-gray-400 tracking-wide">
            Data Scientist | Developer | Researcher
          </p>
          
          {/* Social links */}
          <div className="flex justify-center space-x-6 my-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              {/* Add GitHub icon */}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              {/* Add LinkedIn icon */}
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center space-x-4">
            <Link 
              href="/projects"
              className="px-8 py-3 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-gray-900 transition-all"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}