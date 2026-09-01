"use client";

import type { ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/** Extra pixels of drift per pixel scrolled. Small on purpose. */
const FACTOR = 0.25;

/**
 * Nudges the marquee along with the scroll so it runs slightly ahead while the
 * page moves, and eases back when it stops. The CSS marquee keeps running on
 * the tracks inside; this only offsets the whole row.
 */
export default function MarqueeParallax({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  const x = useTransform(scrollY, (value) => -(value * FACTOR));

  if (reduceMotion)
    return <div className="flex overflow-hidden">{children}</div>;

  return (
    <div className="overflow-hidden">
      <motion.div style={{ x }} className="flex">
        {children}
      </motion.div>
    </div>
  );
}
