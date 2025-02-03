// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
        <div className="text-center">
          <h1 className="mb-6 text-6xl font-bold text-white">
            <span className="text-blue-500">Alex Berger</span>
          </h1>
          <p className="mb-8 text-xl text-gray-300">
            Data Scientist | Developer | Researcher
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/projects"
              className="rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-gray-900"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* About Section with Headshot */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
            About Me
          </h2>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            {/* Headshot */}
            <div className="md:w-1/3">
              <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-lg">
                {/* Replace with your headshot image */}
                <Image
                  src="/images/headshot.jpeg"
                  alt="Professional headshot"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            {/* Professional Summary */}
            <div className="md:w-2/3">
              <p className="mb-6 text-lg text-gray-600">
                I&apos;m a passionate developer focused on creating beautiful and functional web applications. 
                With expertise in modern web technologies, I bring ideas to life through code.
              </p>
              <p className="text-lg text-gray-600">
                Currently specializing in full-stack development with a focus on React, Next.js, and modern backend technologies.
                I'm dedicated to creating efficient, scalable solutions that solve real-world problems.
              </p>
              <div className="mt-6">
                <Link 
                  href="/about"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Learn more about my background →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Featured Project */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-gray-600 font-semibold">Latest Projects</h2>
              <p className="mb-4 text-gray-600">View my projects and research</p>
              <Link href="/projects" className="text-blue-500 hover:text-blue-600">
                View Projects →
              </Link>
            </div>

            {/* Skills Overview */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-gray-600 font-semibold">Professional Portfolio</h2>
              <p className="mb-4 text-gray-600">View my background and experience</p>
              <Link href="/about" className="text-blue-500 hover:text-blue-600">
                Learn More →
              </Link>
            </div>

            {/* Contact Preview */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-gray-600 font-semibold">Get in Touch</h2>
              <p className="mb-4 text-gray-600">View my links and contact form</p>
              <Link href="/contact" className="text-blue-500 hover:text-blue-600">
                Contact Me →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}