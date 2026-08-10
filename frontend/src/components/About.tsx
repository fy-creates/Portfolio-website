import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/motion';

const RocketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default function About() {
  return (
    <section id="about" className="px-6 max-w-5xl mx-auto py-24">
      <h2 className="font-display font-bold text-accent text-sm tracking-widest uppercase mb-4">
        About Me
      </h2>
      <h3 className="font-display font-bold text-3xl md:text-4xl text-fg mb-6 max-w-2xl">
        From Pixels to Production-Grade Code
      </h3>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            My journey started in design — not in a classroom, but in the
            market. I learned that a great e-flyer isn't just pretty; it sells. That
            mindset carried over when I picked up code two years ago. I don't
            just build features. I build <strong className="text-fg">solutions that work</strong>.
          </p>
          <p>
            At <strong className="text-fg">FY Creative Studios</strong>, I've delivered 40+ design projects — from nightwear brands
            to beauty care menus. When a close friend needed branding for <strong className="text-fg">Comfy Laundry Services</strong>,
            I didn't just design a logo. I built an identity she still uses today.
          </p>
          <p>
            Now I'm deep in the stack — React, TypeScript, FastAPI, PostgreSQL. I built
            <strong className="text-fg"> IKSYLvester Furniture</strong>'s e-commerce flow with real Paystack payments.
            I'm building <strong className="text-fg">UniApply NG</strong> to bridge the gap between Nigerian students
            and university admissions. Same problem-solving instinct. Different tools.
          </p>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-6"
        >
          <motion.div variants={staggerItem} className="bg-surface border border-surface/50 rounded-2xl p-6 flex items-start gap-4">
            <motion.div whileHover={{ scale: 1.1, rotate: -6 }} className="p-2.5 rounded-full bg-accent/10 text-accent shrink-0">
              <RocketIcon />
            </motion.div>
            <div>
              <p className="text-sm text-muted mb-1">Currently exploring</p>
              <p className="text-fg font-medium">Full-stack development · AI/ML integration · Scalable system design</p>
            </div>
          </motion.div>
          <motion.div variants={staggerItem} className="bg-surface border border-surface/50 rounded-2xl p-6 flex items-start gap-4">
            <motion.div whileHover={{ scale: 1.1, rotate: -6 }} className="p-2.5 rounded-full bg-accent/10 text-accent shrink-0">
              <MapPinIcon />
            </motion.div>
            <div>
              <p className="text-sm text-muted mb-1">Based in</p>
              <p className="text-fg font-medium">Lagos, Nigeria · Open to remote roles worldwide</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
