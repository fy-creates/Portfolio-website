import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

function easeOutQuad(t: number) {
  return t * (2 - t);
}

// Animates "40+" as 0 -> 40 then appends the "+". Non-numeric values (like "∞")
// just render as-is, no counting.
export default function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const [display, setDisplay] = useState(target !== null ? '0' : value);
  const started = useRef(false);

  const start = () => {
    if (started.current || target === null) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.round(easeOutQuad(progress) * target).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.span onViewportEnter={start} viewport={{ once: true, margin: '-50px' }}>
      {display}
      {suffix}
    </motion.span>
  );
}
