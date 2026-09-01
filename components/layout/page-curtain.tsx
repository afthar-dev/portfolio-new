'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTransition, CURTAIN_MS } from '@/components/providers/transition-provider';

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Full-screen panel that sweeps up to cover the page before a route change.
 * The matching sweep-away lives in app/template.tsx, which remounts on every
 * navigation — App Router gives no exit hook, so the two halves are separate.
 */
export default function PageCurtain() {
  const { isLeaving } = useTransition();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {isLeaving && (
        <motion.div
          aria-hidden="true"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: CURTAIN_MS / 1000, ease: EASE }}
          className="pointer-events-none fixed inset-0 z-[900] bg-ink"
        />
      )}
    </AnimatePresence>
  );
}
