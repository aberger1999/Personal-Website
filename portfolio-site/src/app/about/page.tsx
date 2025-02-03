import Image from 'next/image';

export const metadata = {
  title: 'About',
};

export default function About() {
  const interests = [
    {
      title: "Software Development",
      icon: "💻",
      description: "Full-stack development with modern technologies like React, Node.js, and TypeScript."
    },
    {
      title: "Cloud Architecture",
      icon: "☁️",
      description: "Designing and implementing scalable cloud solutions using AWS and modern DevOps practices."
    },
    {
      title: "Machine Learning",
      icon: "🤖",
      description: "Exploring AI/ML applications and keeping up with the latest developments in the field."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Photo */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
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
          </div>
          <div className="md:w-2/3 pt-5">
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-xl text-gray-300 mb-6">
              I am a data analyst with a strong background in data mining, 
              deep learning, and machine learning. With hands-on experience in predictive analytics, 
              database management, and advanced modeling techniques, I specialize in uncovering actionable 
              insights to drive key business decisions. My expertise includes working with SQL, Python, TensorFlow, 
              and Azure Data Studio, alongside a solid foundation in data visualization and algorithm development. I am passionate 
              about leveraging data-driven solutions to solve complex problems and continuously enhance performance metrics. 
              Currently, I am expanding my knowledge in deep learning and developing projects that showcase my technical skills, 
              including image captioning models and interactive web applications.
            </p>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Background</h2>
              <p className="text-gray-300">
              I hold a Bachelor of Science in Data Science with a minor in Mathematics from Eastern University, where I built a strong foundation 
              in linear algebra, calculus, statistics, and artificial intelligence. Currently, I am pursuing a Master of Science in Data Science 
              at the New Jersey Institute of Technology, focusing on machine learning and applied statistics. Professionally, 
              I work as a Data Analyst for Institutional Research at Cedar Crest College. In this role, I manage data collection, analysis, and reporting 
              to support strategic decision-making. I develop interactive dashboards using Power BI and deliver data-driven insights to senior leadership, 
              ensuring data accuracy and clarity. My projects reflect a diverse skill set, from developing custom image classifiers and neural 
              network chatbots to predictive analytics for sports performance and real estate price forecasting. I have also created comprehensive SQL 
              databases for movie trivia and conducted in-depth statistical analyses without relying solely on machine learning models.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Skills & Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Python', 'R', 'SQL', 'TypeScript', 'Google Cloud/AWS', 'PowerBI', 'Git', 'Excel'].map((tech) => (
              <div 
                key={tech} 
                className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-700 transition duration-300"
              >
                <span className="text-lg">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas of Interest */}
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