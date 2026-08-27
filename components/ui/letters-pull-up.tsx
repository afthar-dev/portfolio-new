'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const pullUp = {
  initial: { y: 10, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.05 },
  }),
};

interface LettersPullUpProps {
  text: string;
  className?: string;
}

/** Splits text and lifts each letter in once the block enters view. */
export function LettersPullUp({ text, className = '' }: LettersPullUpProps) {
  // One ref on the container: attaching it to every letter meant only the last
  // one actually held it, so visibility was measured from a single glyph.
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex justify-center">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={pullUp}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          className={cn(
            'inline-block text-center text-xl font-bold tracking-tighter sm:text-4xl md:text-6xl md:leading-[4rem]',
            className
          )}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </div>
  );
}
