import Image from 'next/image';
import { MapPin } from 'lucide-react';

export const metadata = {
  title: 'About',
};

export default function About() {
  const interests = [
    {
      title: "Machine Learning",
      icon: "🤖",
      description: "Building and implementing ML models with a focus on deep learning and neural networks."
    },
    {
      title: "Software Development",
      icon: "💻",
      description: "Creating efficient, scalable applications using modern frameworks and best practices."
    },
    {
      title: "Data Driven Research",
      icon: "📊",
      description: "Conducting thorough analysis to uncover insights and drive strategic decisions."
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start gap-12 mb-16">
          <div className="md:w-1/3">
            <div className="relative w-84 h-84 mx-auto">
              <Image
                src="/images/headshot.jpeg"
                alt="Alex Berger"
                width={460}
                height={460}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <a 
                href="/Alex_Berger_Resume.pdf" 
                target="_blank"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition duration-300"
              >
                <span>View Resume</span>
              </a>
              <a 
                href="/Alex_Berger_Resume.pdf" 
                download
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition duration-300"
              >
                <span>Download</span>
              </a>
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-5xl font-bold mb-4">About Me</h1>
            <div className="w-32 h-1 bg-blue-400 mb-6"></div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-blue-400" />
              <span className="text-gray-300">Collegeville, PA</span>
            </div>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              I am a data scientist with a strong background in data mining, deep learning,
              statistical modeling, and software development. With hands-on experience in predictive analytics, database management, 
              and advanced modeling techniques, I specialize in uncovering actionable insights from all types of data.
              My primary coding language is Python, however I am also proficient in R, SQL, and TypeScript.
              I am passionate about leveraging my skills to solve complex problems and uncover hidden insights from all things I encounter. 
              I enjoy working on new projects that challenge my skills and expand my knowledge.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-blue-400">Master of Science in Data Science</h3>
                    <p className="text-gray-300">New Jersey Institute of Technology | Newark, NJ</p>
                    <p className="text-gray-400">In Progress - Computational Track</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-blue-400">Bachelor of Science in Data Science</h3>
                    <p className="text-gray-300">Eastern University | St. Davids, PA</p>
                    <p className="text-gray-400">Minor in Mathematics</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Experience</h2>
                <div>
                  <h3 className="text-xl font-medium text-blue-400">Data Analyst</h3>
                  <p className="text-gray-300">Institutional Research at Cedar Crest College</p>
                  <p className="text-gray-400 mb-2">Current Position</p>
                  <ul className="list-disc ml-4 space-y-2 text-gray-300">
                    <li>Develop interactive dashboards using Power BI for strategic decision-making</li>
                    <li>Manage comprehensive data collection, analysis, and reporting systems</li>
                    <li>Deliver data-driven insights to senior leadership through detailed reports</li>
                    <li>Create and maintain predictive models for institutional metrics</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Skills & Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Python', 'R', 'SQL', 'TypeScript', 'Google Cloud/AWS', 'Power BI', 'Git', 'Excel'].map((tech) => (
              <div 
                key={tech} 
                className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-700 transition duration-300"
              >
                <span className="text-lg">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-8">Areas of Interest</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {interests.map((interest) => (
              <div 
                key={interest.title} 
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition duration-300"
              >
                <div className="text-4xl mb-4">{interest.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{interest.title}</h3>
                <p className="text-gray-300">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}