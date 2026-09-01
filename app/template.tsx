'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * template.tsx remounts on every navigation, which is what makes an entrance
 * animation possible in the App Router. The matching exit sweep is handled by
 * PageCurtain, since there is no built-in exit hook.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
