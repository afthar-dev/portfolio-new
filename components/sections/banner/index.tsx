'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Asterisk } from 'lucide-react';

/** Rows drift this many px across the full scroll pass. */
const DRIFT = 220;

const rows = [
  { text: 'Full stack developer', direction: 1 },
  { text: 'React · Next.js · Node', direction: -1 },
];

interface RowProps {
  progress: MotionValue<number>;
  text: string;
  direction: number;
}

function Row({ progress, text, direction }: RowProps) {
  const x = useTransform(
    progress,
    [0, 1],
    [DRIFT * direction, -DRIFT * direction]
  );

  return (
    <motion.div style={{ x }} className="flex w-max flex-nowrap">
      {/* Repeated so the row stays wider than the viewport at either
          end of its travel and never reveals an edge. */}
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="font-heading whitespace-nowrap text-[clamp(2rem,7vw,5.5rem)] uppercase leading-none text-foreground">
            {text}
          </span>
          <Asterisk
            aria-hidden="true"
            className="mx-6 h-[clamp(1.75rem,4vw,3rem)] w-[clamp(1.75rem,4vw,3rem)] shrink-0 text-accent sm:mx-10"
            strokeWidth={2.5}
          />
        </span>
      ))}
    </motion.div>
  );
}

export default function Banner() {
  const container = useRef<HTMLElement>(null);

  // Track the section across its whole pass through the viewport.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={container}
      aria-label="Skills banner"
      className="relative flex flex-col justify-center gap-3 overflow-hidden py-24 sm:gap-5 sm:py-32"
    >
      {rows.map((row) => (
        <Row
          key={row.text}
          progress={scrollYProgress}
          text={row.text}
          direction={row.direction}
        />
      ))}
    </section>
  );
}
