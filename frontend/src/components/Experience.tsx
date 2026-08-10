import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/motion';

const experiences = [
  {
    role: 'Founder & Lead Designer',
    company: 'FY Creative Studios',
    period: '2022 – Present',
    bullets: [
      'Delivered 40+ brand identity and e-flyer projects for Nigerian businesses',
      'Built client relationships from Instagram outreach to repeat contracts',
      'Designed Comfy Laundry Services brand identity — still in use today',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Self-Directed / Open Source',
    period: '2024 – Present',
    bullets: [
      'Built IKSYLvester Furniture e-commerce with Paystack payment flow',
      'Developing UniApply NG — bridging Nigerian students to university admissions',
      'Learning FastAPI, PostgreSQL, and system design through real projects',
    ],
  },
  {
    role: 'Computer Science Student',
    company: 'VISION UNIVERSITY',
    period: '2023 – 2027',
    bullets: [
      'Studying core CS fundamentals while building production-grade side projects',
      'Built Phishing Email Detector using DistilBERT — first ML project',
      'Active in developer communities and continuous learning',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 max-w-5xl mx-auto py-24">
      <h2 className="font-display font-bold text-accent text-sm tracking-widest uppercase mb-4">
        Career Journey
      </h2>
      <h3 className="font-display font-bold text-3xl md:text-4xl text-fg mb-10 max-w-2xl">
        From Design Gigs to Production Code
      </h3>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="space-y-8"
      >
        {experiences.map((exp, i) => (
          <motion.div key={i} variants={staggerItem} className="relative pl-8 md:pl-0">
            {i !== experiences.length - 1 && (
              <div className="absolute left-[11px] md:left-[calc(25%-11px)] top-8 bottom-[-32px] w-px bg-surface/50 hidden md:block" />
            )}
            
            <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
              <div className="hidden md:block text-right">
                <p className="text-sm text-muted font-medium">{exp.period}</p>
              </div>
              
              <div className="absolute left-0 md:left-[calc(25%-11px)] top-1.5 md:top-2">
                <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-bg" />
              </div>

              <div className="md:col-span-2 bg-surface border border-surface/50 rounded-2xl p-6">
                <p className="text-sm text-muted md:hidden mb-1">{exp.period}</p>
                <h4 className="font-display font-semibold text-fg text-lg">{exp.role}</h4>
                <p className="text-accent text-sm mb-4">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-muted text-sm leading-relaxed flex items-start gap-2">
                      <span className="text-accent mt-1.5 shrink-0">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
