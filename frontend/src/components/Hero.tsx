import { motion } from 'framer-motion';
import AnimatedGradient from './AnimatedGradient';
import HeroStats from './HeroStats';
import { heroItem } from '../lib/motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto pt-24">
      <AnimatedGradient />
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.p variants={heroItem} className="font-body text-accent mb-4 tracking-wide text-sm uppercase">
          Lagos, Nigeria · Computer Science Student
        </motion.p>
        <motion.h1 variants={heroItem} className="font-display font-bold text-5xl md:text-7xl text-fg leading-tight">
          Learn.
          <br />
          Build.
          <br />
          <span className="text-accent">Impact.</span>
        </motion.h1>
        <motion.p variants={heroItem} className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
          I started with design — 40+ clients, brands, and e-flyers that actually moved product.
          Now I build the tech behind the visuals. React, TypeScript, and FastAPI. Bridging creativity
          and engineering to solve real problems for real people.
        </motion.p>
        <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-accent text-bg px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            View Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="border border-surface text-fg px-6 py-3 rounded-full font-medium hover:border-accent transition-colors"
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="/resume.pdf"
            download="Ifeanyi-Okorie-Resume.pdf"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-fg px-6 py-3 rounded-full font-medium hover:text-accent transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>
      <HeroStats />
    </section>
  );
}
