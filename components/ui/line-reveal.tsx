'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const word: Variants = {
  hidden: { y: '110%' },
  show: (line: number) => ({
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: line * 0.09 },
  }),
};

interface LineRevealProps {
  text: string;
  className?: string;
}

/**
 * Reveals text line by line: each word sits in a clipping box and rises into
 * it, with every word on the same visual line sharing a delay.
 *
 * The in-view trigger sits on the paragraph and drives the words through
 * variants. It cannot sit on the words themselves — they start translated
 * outside their own clip box, so an observer on them would never register them
 * as visible and the animation would never start.
 *
 * Lines are measured after layout rather than hard-coded, so the effect
 * survives reflow at any width.
 */
export default function LineReveal({ text, className }: LineRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lineOf, setLineOf] = useState<number[]>([]);
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const spans = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
      let line = -1;
      let lastTop: number | null = null;

      setLineOf(
        spans.map((span) => {
          // A jump in offsetTop means the word wrapped onto a new line.
          if (lastTop === null || span.offsetTop > lastTop + 2) {
            line += 1;
            lastTop = span.offsetTop;
          }
          return line;
        })
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <motion.p
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          {/* Padding then equal negative margin keeps descenders out of the
              clip without shifting where the line sits. */}
          <span
            data-word
            className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
          >
            <motion.span
              variants={word}
              custom={lineOf[i] ?? 0}
              className="inline-block"
            >
              {w}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </motion.p>
  );
}
