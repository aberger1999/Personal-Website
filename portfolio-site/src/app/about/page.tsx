export default function About() {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-24">
        <h1 className="mb-8 text-4xl font-bold">About Me</h1>
        <div className="space-y-6">
          {/* Add your detailed about content here */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Background</h2>
            <p className="text-gray-600">
              [Your detailed background information]
            </p>
          </section>
          
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Skills & Expertise</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Add more detailed skills sections */}
            </div>
          </section>
        </div>
      </div>
    );
  }