import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { staggerContainer, staggerItem } from '../lib/motion';

const designs = [
  {
    id: 1,
    title: 'Shari Night Wears',
    category: 'E-Flyer / Product',
    image: '/designs/shari-nightwear.png',
    description: 'Promotional e-flyer for a nightwear brand — comfort, style, and confidence every night.',
  },
  {
    id: 2,
    title: 'Enny Beauty Care',
    category: 'E-Flyer / Service',
    image: '/designs/enny-beauty.png',
    description: 'Service menu e-flyer for a beauty and wellness brand — because you deserve to shine.',
  },
];

export default function DesignWork() {
  return (
    <section id="design" className="px-6 max-w-5xl mx-auto py-24">
      <h2 className="font-display font-bold text-accent text-sm tracking-widest uppercase mb-4">Design Work</h2>
      <p className="text-muted max-w-xl mb-10">Brand identity, logos, e-flyers, and photo editing from FY Creative Studio.</p>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid md:grid-cols-2 gap-6"
      >
        {designs.map((d) => (
          <motion.div
            key={d.id}
            variants={staggerItem}
            className="group overflow-hidden rounded-2xl bg-surface border border-surface hover:border-accent transition-colors shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <picture>
                <source srcSet={d.image.replace('.png', '.webp')} type="image/webp" />
                <img
                  src={d.image}
                  alt={d.title}
                  loading="lazy"
                  width={736}
                  height={920}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </picture>
            </div>
            <div className="p-5">
              <p className="text-xs font-medium text-accent uppercase tracking-wider">
                {d.category}
              </p>
              <h3 className="mt-1 font-display font-semibold text-fg">
                {d.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {d.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="https://lowkeyfy.github.io/FYCREATIVESTUDIO/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-bg bg-accent rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          Show More Designs
          <ExternalLink size={16} />
        </a>
        <a href="https://instagram.com/FY_CREATIVE_STUDIOS" target="_blank" rel="noopener noreferrer" className="text-sm text-fg border border-surface rounded-full px-4 py-2 hover:border-accent transition-colors">More on Instagram →</a>
        <a href="https://github.com/LowkeyFY" target="_blank" rel="noopener noreferrer" className="text-sm text-fg border border-surface rounded-full px-4 py-2 hover:border-accent transition-colors">More on GitHub →</a>
      </div>
    </section>
  );
}
