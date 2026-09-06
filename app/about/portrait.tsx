'use client';

import Image from 'next/image';
import { useRef, useState, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fraction of the cursor's offset from centre that the frame follows. */
const STRENGTH = 0.12;
/** Hard ceiling on the pull, so a wide frame does not swing far. */
const MAX = 14;

const clamp = (n: number) => Math.max(-MAX, Math.min(MAX, n));

/**
 * Portrait that drifts toward the cursor and springs back on leave — the
 * magnetic pattern, sized down so it reads as a nudge rather than a toy.
 * Touch devices never fire the mouse events, and reduced motion opts out.
 */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const [pull, setPull] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    setPull({
      x: clamp((event.clientX - (left + width / 2)) * STRENGTH),
      y: clamp((event.clientY - (top + height / 2)) * STRENGTH),
    });
  };

  const reset = () => setPull({ x: 0, y: 0 });

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        animate={pull}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-foreground/5"
      >
        <Image
          src="/images/me.png"
          alt="Afthar N N, sitting on a low concrete wall against an open sky"
          fill
          sizes="(min-width: 768px) 42vw, 100vw"
          className="object-cover object-center"
        />
      </motion.div>
    </motion.div>
  );
}
