import { motion } from 'framer-motion';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { staggerContainer, staggerItem } from '../lib/motion';

const projects = [
  {
    name: 'UniApply NG',
    description: 'Building a bridge between Nigerian students and university admissions. FastAPI backend with JWT auth, eligibility engine, and OCR document processing. Designed to reduce the friction of tertiary education access.',
    tags: ['FastAPI', 'PostgreSQL', 'React', 'Celery'],
    link: '',
    status: 'In Development',
    githubRepo: null,
  },
  {
    name: 'Phishing Email Detector',
    description: 'An NLP-powered school project that fine-tuned DistilBERT on 10,000 labeled emails. Built across four Colab notebooks with a Gradio demo. My entry point into machine learning and model deployment.',
    tags: ['Python', 'DistilBERT', 'Gradio'],
    link: '',
    status: 'Coming Soon',
    githubRepo: null,
  },
  {
    name: 'IKSYLvester & Co Furniture',
    description: 'E-commerce site for a Lagos furniture business. Built a Paystack 75% deposit flow with WhatsApp order confirmation. The client got a working sales channel in under two weeks.',
    tags: ['HTML/CSS/JS', 'Paystack'],
    link: 'https://github.com/fy-creates/IK-sylvester',
    status: 'Live',
    githubRepo: 'fy-creates/IK-sylvester',
  },
  {
    name: 'FY Creative Studio',
    description: 'The digital home of my design work. Custom animated cursor, lightbox gallery, and Formspree contact form. More than a portfolio — it is the brand.',
    tags: ['HTML/CSS', 'Formspree'],
    link: 'https://fy-creates.github.io/FYCREATIVESTUDIO/',
    status: 'Live',
    githubRepo: 'fy-creates/FYCREATIVESTUDIO',
  },
  {
    name: 'Weather App',
    description: 'My first JavaScript project. A simple app pulling live weather data from a public API. Where it all started — from console.log to deployment.',
    tags: ['JavaScript'],
    link: 'https://github.com/fy-creates/WEATHER_app',
    status: 'Live',
    githubRepo: 'fy-creates/WEATHER_app',
  },
];

const repos = projects.map(p => p.githubRepo).filter(Boolean) as string[];

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);

const ForkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M6 9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9"/><path d="M12 15V9"/></svg>
);

export default function Projects() {
  const { data: stats, loading } = useGitHubStats(repos);

  return (
    <section id="projects" className="px-6 max-w-5xl mx-auto py-24">
      <h2 className="font-display font-bold text-accent text-sm tracking-widest uppercase mb-4">
        Software Projects
      </h2>
      <p className="text-muted max-w-xl mb-10">
        A selection of applications, experiments, and production tools built across my journey.
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid md:grid-cols-2 gap-6"
      >
        {projects.map((project) => {
          const isLive = project.status === 'Live';
          const repoStats = project.githubRepo ? stats[project.githubRepo] : null;
          const hasStats = repoStats && !loading;

          return (
            <motion.div
              key={project.name}
              variants={staggerItem}
              className={`flex flex-col bg-surface rounded-2xl p-6 transition-all border border-surface/50 ${
                isLive 
                  ? 'hover:-translate-y-1 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10' 
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-xl text-fg">{project.name}</h3>
                <span className={`text-xs font-medium rounded-full px-2 py-0.5 border ${
                  isLive 
                    ? 'text-accent border-accent/30' 
                    : 'text-muted border-muted/20'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-muted text-sm mb-4 flex-grow leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-accent border border-accent/30 rounded-full px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub Live Stats */}
              {hasStats && (
                <div className="flex items-center gap-4 mb-3 text-xs text-muted">
                  {repoStats.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <StarIcon />
                      <span className="text-fg font-medium">{repoStats.stars}</span>
                      <span>stars</span>
                    </span>
                  )}
                  {repoStats.forks > 0 && (
                    <span className="flex items-center gap-1">
                      <ForkIcon />
                      <span className="text-fg font-medium">{repoStats.forks}</span>
                      <span>forks</span>
                    </span>
                  )}
                  {repoStats.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {repoStats.language}
                    </span>
                  )}
                </div>
              )}

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} project`}
                  className="self-start text-sm font-medium text-accent hover:underline"
                >
                  View Project →
                </a>
              ) : (
                <span className="self-start text-xs font-medium text-muted border border-muted/30 rounded-full px-3 py-1">
                  Coming Soon
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
