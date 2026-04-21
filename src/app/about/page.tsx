import Image from 'next/image';
import { MapPin } from 'lucide-react';

export const metadata = {
  title: 'About',
};

export default function About() {
  const bioSections = [
    "I'm a data scientist and developer who works at the intersection of ML engineering, analytics infrastructure, and BI. I like problems where the modeling, the pipeline, and the end-user interface all have to work together, and I'm comfortable owning the whole stack.",
    "At Cedar Crest College, I lead institutional research analytics. I've built 15+ Power BI dashboards end-to-end, including data ingestion, relational modeling, DAX measures, and publication, serving everyone from academic departments to the board of trustees. I also own IPEDS federal reporting and a course evaluation program covering 200+ courses a semester, where I've automated most of the validation and reporting workflow.",
    'On the contract side, I recently architected a Supabase backend for a client: schema design, RLS policies, and a clean migration off their legacy system. Before that, I built a retail sales forecasting platform on Python, SQL, and Power BI, using a stacked ensemble (Random Forest + ARIMA) that hit around 85% weekly accuracy against live Shopify and Amazon feeds.',
    "Outside of client work, I'm building two products of my own. DataLens is a desktop app I started because I was tired of paying monthly subscriptions for tools that each did one piece of the data workflow. It's a local-first, offline, no-subscription environment that pulls preprocessing, feature engineering, ML, visualization, and report generation into a single app. It's mostly Python with an HTML/CSS frontend, currently at v1.0 with an active roadmap. Quorex is a web app aimed at the other side of my workflow, the planning side. It combines a calendar, notepad, vision board, and reminders into one linked workspace, with an AI assistant that can schedule, remind, and answer quick questions. The idea is to collapse the two or three apps most people juggle for planning into one place where ideas and tasks actually connect. It's built with JavaScript and Python, containerized with Docker, and currently working toward deployment.",
    "My academic background is an M.S. in Data Science from NJIT with a concentration in AI, and a B.S. in Data Science from Eastern University. Along the way I built out a CNN/LSTM image captioning model on COCO, a multilingual NLP classifier deployed on GCP, and a Flask-based property valuation tool pulling from Zillow and Redfin APIs.",
    "Primary stack: Python, SQL, DAX/M, and PostgreSQL, with working knowledge of TypeScript, R, C++, and Julia. I've deployed across Azure, AWS, and GCP, and I'm equally at home writing an ETL pipeline, tuning a model, or shipping the front-end that makes the output legible.",
  ];

  const education = [
    {
      degree: 'Master of Science | Data Science',
      school: 'New Jersey Institute of Technology',
      location: 'Newark, NJ',
      date: 'May 2026',
    },
    {
      degree: 'Bachelor of Science | Data Science',
      school: 'Eastern University',
      location: 'St. Davids, PA',
      date: 'May 2023',
    },
  ];

  const experience = [
    {
      role: 'Data Analyst for Institutional Research',
      organization: 'Cedar Crest College',
      location: 'Allentown, PA',
      dateRange: 'August 2023 - Present',
      bullets: [
        'Designed and developed 15+ interactive Power BI dashboards from the ground up, including end-to-end data collection, processing, table linking, and custom DAX measures, serving cabinet-level and trustee audiences as well as each academic department across the institution.',
        'Administered comprehensive course evaluation survey program serving 1300+ students per semester, implementing strategic outreach strategies that increased response rates from 40% to 60%.',
        'Oversaw federal compliance reporting including IPEDS submissions, maintaining 100% accuracy with Department of Education requirements while implementing automated data validation systems.',
        'Trained and upskilled staff across multiple departments on Power BI usage and coordinated cross-departmental data pipelines to ensure consistent, reliable reporting infrastructure.',
      ],
    },
    {
      role: 'Software & Database Consultant',
      organization: 'Freelance/Contract Work',
      location: '',
      dateRange: 'October 2025 - January 2026',
      bullets: [
        'Diagnosed and resolved software bugs to improve application stability and code quality.',
        'Architected and configured a Supabase database including schema design, security policies, and row-level security (RLS) to ensure proper access control.',
        'Executed data migration from legacy systems into Supabase, ensuring data integrity throughout the transition.',
      ],
    },
    {
      role: 'Retail Sales Forecasting Dashboard',
      organization: 'Freelance/Contract Work',
      location: '',
      dateRange: 'May 2023 - September 2023',
      bullets: [
        'Led the data and ML development for a retail sales forecasting solution, partnering with a small e-commerce team to deliver an end-to-end predictive analytics platform built on Python, Power BI, and SQL.',
        'Engineered a stacked ensemble model to forecast weekly sales with up to 85% accuracy.',
        'Built an automated data pipeline integrating Shopify and Amazon enabling real-time sales performance tracking.',
      ],
    },
  ];

  const skillGroups = [
    {
      category: 'Languages',
      items: 'Python, R, SQL, JavaScript, TypeScript, C++, Julia, DAX/M',
    },
    {
      category: 'Machine Learning & AI',
      items:
        'Supervised/Unsupervised Learning, Neural Networks, NLP, Computer Vision, Time Series Analysis, Ensemble Methods, Hyperparameter Tuning, Model Deployment',
    },
    {
      category: 'Data & Analytics',
      items:
        'Feature Engineering, Statistical Modeling, Predictive Analytics, Exploratory Data Analysis, Model Evaluation & Validation',
    },
    {
      category: 'Visualization & BI',
      items: 'Power BI, Tableau, Excel',
    },
    {
      category: 'Databases & Data Engineering',
      items:
        'PostgreSQL, MySQL, SQL Server, MongoDB, Apache Spark, Hadoop, ETL/ELT, Data Warehousing',
    },
    {
      category: 'Cloud & DevOps',
      items: 'Microsoft Azure, AWS, GCP, Docker, Git, Azure Data Studio',
    },
  ];

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
              <span className="text-gray-300">Hatfield, PA</span>
            </div>
            <div className="mb-8 space-y-4 rounded-2xl border border-gray-700/60 bg-gray-800/40 p-5">
              {bioSections.map((section) => (
                <p key={section} className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {section}
                </p>
              ))}
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                  {education.map((item) => (
                    <div key={item.degree} className="bg-gray-800/50 rounded-xl border border-gray-700/60 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-medium text-blue-400">{item.degree}</h3>
                          <p className="text-gray-300">
                            {item.school} | {item.location}
                          </p>
                        </div>
                        <span className="text-gray-400 text-sm sm:text-right whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Experience</h2>
                <div className="space-y-6">
                  {experience.map((item) => (
                    <div key={`${item.role}-${item.dateRange}`} className="bg-gray-800/50 rounded-xl border border-gray-700/60 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-xl font-medium text-blue-400">{item.role}</h3>
                          <p className="text-gray-300">
                            {item.organization}
                            {item.location ? ` | ${item.location}` : ''}
                          </p>
                        </div>
                        <span className="text-gray-400 text-sm sm:text-right whitespace-nowrap">
                          {item.dateRange}
                        </span>
                      </div>
                      <ul className="list-disc ml-5 space-y-2 text-gray-300">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="bg-gray-800 rounded-xl p-5 hover:bg-gray-700 transition duration-300"
              >
                <h3 className="text-lg font-medium text-blue-400 mb-2">{group.category}</h3>
                <p className="text-gray-300 leading-relaxed">{group.items}</p>
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