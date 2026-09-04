'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before starting, for staggering siblings by hand. */
  delay?: number;
  className?: string;
}

/**
 * A slow fade and short rise as the element comes into view. Deliberately
 * unhurried — long duration, small travel, soft ease — so it reads as settling
 * rather than sliding. Runs once, and not at all under reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
