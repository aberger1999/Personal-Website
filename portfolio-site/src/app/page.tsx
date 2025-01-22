import Image from "next/image";

// app/page.tsx
export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
        <div className="text-center">
          <h1 className="mb-6 text-6xl font-bold text-white">
            Hello, I'm <span className="text-blue-500">Alex Berger</span>
          </h1>
          <p className="mb-8 text-xl text-gray-300">
            Data Scientist | Developer | Researcher
          </p>
          <button className="rounded-lg bg-blue-500 px-8 py-3 text-white transition-all hover:bg-blue-600">
            View My Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
            About Me
          </h2>
          <div className="text-lg text-gray-600">
            <p className="mb-6">
            I am a seasoned professional with a strong background in business development 
            and strategic partnerships. With over a decade of experience in the technology sector, 
            I have led cross-functional teams to drive innovation and growth. My expertise in market analysis 
            and client relations has consistently resulted in expanded market share and increased revenue streams. 
            I am passionate about leveraging emerging technologies to create sustainable and impactful business solutions.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">Frontend</h3>
                <p>React, Next.js, Tailwind CSS</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">Languages</h3>
                <p>Python, R, C++, Node.js, JavaScript, SQL</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">Tools</h3>
                <p>Git, Docker, AWS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Project Card 1 */}
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">Project Name</h3>
                <p className="mb-4 text-gray-600">
                  Brief description of the project and the technologies used.
                </p>
                <div className="flex gap-2">
                  <button className="rounded bg-blue-500 px-4 py-2 text-sm text-white">
                    View Project
                  </button>
                  <button className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700">
                    Code
                  </button>
                </div>
              </div>
            </div>
            {/* Add more project cards as needed */}
          </div>
        </div>
      </section>
    </main>
  );
}
