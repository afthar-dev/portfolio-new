'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { entries, type Entry } from './experience-data';

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = 'text-accent';
const ACCENT_BG = 'bg-accent';

function Item({ entry, index }: { entry: Entry; index: number }) {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.6, delay: index * 0.06, ease: EASE },
      };

  return (
    <motion.li {...reveal} className="relative pl-9">
      {/* Node. Pops in just behind its card so the rail reads as filling up
          rather than the dots appearing all at once. */}
      <motion.span
        aria-hidden="true"
        initial={reduceMotion ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.45,
          delay: index * 0.06 + 0.12,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className={`absolute left-[3px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background ${ACCENT_BG}`}
      />

      {/* whileTap is the only pointer feedback available here: these cards are
          not links, and a phone has no hover to lean on. */}
      <motion.div
        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="flex flex-col gap-1.5 pb-10"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-foreground/40">
          {entry.kind}
        </span>

        <span
          className={`text-xs uppercase tracking-[0.18em] tabular-nums ${ACCENT}`}
        >
          {entry.period}
        </span>

        <h3 className="font-display text-2xl leading-tight">{entry.org}</h3>

        <p className="text-base text-foreground/70">{entry.title}</p>

        <p className="text-xs uppercase tracking-[0.12em] text-foreground/45">
          {entry.location}
        </p>
      </motion.div>
    </motion.li>
  );
}

/**
 * Phone layout for the timeline. The pinned horizontal track needs a wide
 * viewport and a scroll budget it cannot get on a phone, so small screens read
 * the same entries top to bottom instead, with a rail that fills as you go.
 */
export default function MobileTimeline() {
  const list = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: list,
    offset: ['start 0.9', 'end 0.65'],
  });

  // Softened so the fill trails the finger rather than tracking it exactly.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <ol ref={list} className="relative flex flex-col">
      {/* Base rail plus the fill that follows the scroll. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[7px] top-1.5 w-px bg-foreground/15"
      >
        {reduceMotion ? (
          <span className={`block h-full w-full opacity-40 ${ACCENT_BG}`} />
        ) : (
          <motion.span
            style={{ scaleY: progress }}
            className={`block h-full w-full origin-top ${ACCENT_BG}`}
          />
        )}
      </span>

      {entries.map((entry, i) => (
        <Item key={entry.org} entry={entry} index={i} />
      ))}
    </ol>
  );
}
