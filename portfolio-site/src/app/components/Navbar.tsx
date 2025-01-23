'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-500' : 'text-gray-300 hover:text-white';
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-900/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Alex Berger
          </Link>

          <div className="flex space-x-8">
            <Link href="/" className={`text-sm font-medium ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/about" className={`text-sm font-medium ${isActive('/about')}`}>
              About Me
            </Link>
            <Link href="/projects" className={`text-sm font-medium ${isActive('/projects')}`}>
              Projects
            </Link>
            <Link href="/contact" className={`text-sm font-medium ${isActive('/contact')}`}>
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}