"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const text =
  "Give me wifi and enough caffeine and I'll build systems that elevate your brand, anywhere in the world. Let's connect on your next big idea.";

/**
 * Letters carry a running index across the whole sentence so each one owns an
 * equal slice of the scroll range. Words stay grouped so the paragraph still
 * wraps on word boundaries rather than mid-word.
 */
const totalLetters = text.replace(/\s/g, "").length;

let cursor = 0;
const wordTokens = text.split(" ").map((word) =>
  word.split("").map((char) => ({ char, index: cursor++ }))
);

interface LetterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Letter({ char, progress, range }: LetterProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export default function About() {
  const container = useRef<HTMLParagraphElement>(null);

  // Reveal window: begins as the paragraph sits 85% down the viewport and
  // completes by the time it reaches 40% — letters light up as it rises.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.85", "start 0.4"],
  });

  return (
    <section
      id="about"
      className="shell flex flex-col gap-10 pt-32 pb-24 sm:pt-40"
    >
      <p
        ref={container}
        className="flex flex-wrap text-[clamp(1.5rem,4vw,3.25rem)] font-bold leading-[1.2] tracking-tight text-foreground"
      >
        {wordTokens.map((letters, i) => (
          <span key={i} className="mr-[0.25em] whitespace-nowrap">
            {letters.map(({ char, index }) => (
              <Letter
                key={index}
                char={char}
                progress={scrollYProgress}
                range={[index / totalLetters, (index + 1) / totalLetters]}
              />
            ))}
          </span>
        ))}
      </p>
    </section>
  );
}
