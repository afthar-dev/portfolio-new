"use client";

import { motion } from "framer-motion";
import PixelTrail from "./pixel-trail";
import { heroLines, type Segment } from "./content";

function renderSegment(segment: Segment, key: number) {
  if (segment.variant === "swash") {
    return (
      <span
        key={key}
        className="font-script inline-block align-baseline text-[1.5em]"
        style={{ lineHeight: 0.7, marginInline: "0.02em" }}
      >
        {segment.text}
      </span>
    );
  }
  if (segment.variant === "capital") {
    return (
      <span
        key={key}
        className="font-display inline-block align-baseline italic text-[1.3em]"
        style={{ lineHeight: 0.8 }}
      >
        {segment.text}
      </span>
    );
  }
  if (segment.variant === "pixel") {
    return (
      <span key={key} className="font-pixel text-[1.2em]">
        {segment.text}
      </span>
    );
  }
  return <span key={key}>{segment.text}</span>;
}

const lineVariants = {
  initial: { opacity: 0, y: 24 },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 + i * 0.08,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <PixelTrail />

      {/* White text + difference blending inverts whatever sits behind it,
          so the copy flips colour as trail blocks pass underneath. */}
      <h1
        className="font-display pointer-events-none relative z-[1] w-[80%] text-center uppercase text-white"
        style={{
          mixBlendMode: "difference",
          fontSize: "clamp(1.25rem, 4.6vw, 3.75rem)",
          lineHeight: 1.3,
        }}
      >
        {heroLines.map((line, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={lineVariants}
            initial="initial"
            animate="enter"
            className={`block ${line.preserveCase ? "normal-case" : ""}`}
            style={line.scale ? { fontSize: `${line.scale}em` } : undefined}
          >
            {line.segments.map(renderSegment)}
          </motion.span>
        ))}
      </h1>
    </section>
  );
}
