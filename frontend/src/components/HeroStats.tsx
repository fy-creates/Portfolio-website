import { motion } from 'framer-motion';
import CountUp from './CountUp';
import { staggerContainer, staggerItem } from '../lib/motion';

export default function HeroStats() {
  const stats = [
    { value: '2+', label: 'Years Coding' },
    { value: '40+', label: 'Design Clients' },
    { value: '10+', label: 'Projects Shipped' },
    { value: '∞', label: 'Lines of Code' },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-surface/50 pt-8"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={staggerItem} className="text-center md:text-left">
          <p className="font-display font-bold text-3xl md:text-4xl text-accent">
            <CountUp value={stat.value} />
          </p>
          <p className="text-muted text-sm mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
