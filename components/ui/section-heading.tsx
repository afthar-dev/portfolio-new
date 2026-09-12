'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  className?: string;
  /**
   * Heading level. Sections on a page default to h2; a page whose only
   * heading is this one should pass "h1" so the document has a top level.
   */
  as?: 'h1' | 'h2';
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
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const words = label.split(' ');
  // Runs across the whole label so the stagger does not restart each word.
  let index = 0;

  return (
    <Tag
      className={`font-heading flex flex-wrap uppercase leading-[0.95] tracking-tight text-foreground text-[clamp(1.75rem,8vw,2.25rem)] sm:text-5xl md:text-6xl ${className}`}
    >
      {/* Readable label for assistive tech; the split letters are decorative. */}
      <span className="sr-only">{label}</span>

      {/* Grouped by word so a long label wraps between words rather than
          overflowing the viewport. Letters within a word stay on one line. */}
      <span
        aria-hidden="true"
        style={{ perspective: '400px' }}
        className="flex flex-wrap gap-x-[0.25em]"
      >
        {words.map((word, w) => (
          <span key={w} className="flex">
            {word.split('').map((char) => (
              <motion.span
                key={index}
                custom={index++}
                variants={letter}
                initial="initial"
                whileInView="enter"
                viewport={{ once: true, amount: 0.5 }}
                className="inline-block origin-bottom"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
