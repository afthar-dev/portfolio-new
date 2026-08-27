"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const text =
  "Give me wifi and enough caffeine and I'll build systems that elevate your brand — anywhere in the world. Let's connect on your next big idea.";

const words = text.split(" ");

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em]">
      {children}
    </motion.span>
  );
}

export default function About() {
  const container = useRef<HTMLParagraphElement>(null);

  // Reveal window: begins as the paragraph sits 85% down the viewport and
  // completes by the time it reaches 40% — words light up as it rises.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.85", "start 0.4"],
  });

  return (
    <section
      id="about"
      className="mx-auto flex w-[88%] max-w-5xl flex-col gap-10 pt-32 pb-24 sm:pt-40"
    >
      <p
        ref={container}
        className="flex flex-wrap text-[clamp(1.5rem,4vw,3.25rem)] font-bold leading-[1.2] tracking-tight text-foreground"
      >
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            // Each word owns an equal slice of the scroll range.
            range={[i / words.length, (i + 1) / words.length]}
          >
            {word}
          </Word>
        ))}
      </p>
    </section>
  );
}
