"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";

/** How deep the arc bows at full reveal. */
const MAX_DEPTH = 250;

export default function CurvedReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // 0 when the content bottom meets the viewport bottom (footer starts to
  // show), 1 once the content has scrolled fully past the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useReducedMotion();
  const active = isDesktop && !reduceMotion;

  const depth = useTransform(scrollYProgress, [0.4, 0.8], [0, MAX_DEPTH], {
    clamp: true,
  });
  // Two-value radius: half the width across, animated depth down.
  const radius = useMotionTemplate`60% ${depth}px`;

  return (
    <motion.div
      ref={ref}
      style={
        active
          ? { borderBottomLeftRadius: radius, borderBottomRightRadius: radius }
          : undefined
      }
      // Padding keeps the last section clear of the arc, which paints over
      // background only and does not clip children.
      className="relative z-10 bg-background md:pb-28"
    >
      {children}
    </motion.div>
  );
}
