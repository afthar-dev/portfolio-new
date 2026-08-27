'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  className?: string;
}

const letter = {
  initial: { opacity: 0, y: '0.6em', rotateX: -60 },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.055,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
};

/** Big section heading; letters stagger in the first time it enters view. */
export default function SectionHeading({
  label,
  className = '',
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-heading flex flex-wrap uppercase leading-[0.95] tracking-tight text-foreground text-4xl sm:text-5xl md:text-6xl ${className}`}
    >
      {/* Readable label for assistive tech; the split letters are decorative. */}
      <span className="sr-only">{label}</span>

      <span aria-hidden="true" style={{ perspective: '400px' }} className="flex">
        {label.split('').map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letter}
            initial="initial"
            whileInView="enter"
            viewport={{ once: true, amount: 0.5 }}
            className="inline-block origin-bottom"
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </span>
    </h2>
  );
}
