'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-center">
          <div className="space-x-8 text-sm uppercase tracking-widest">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}