"use client";

import { memo, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { useMediaQuery } from "@/lib/use-media-query";
import { entries, type Entry } from "./experience-data";

/** Lime reads well on ink but nearly vanishes on cream, so the accent flips. */
const ACCENT = "text-burgundy dark:text-lime";
const ACCENT_BG = "bg-burgundy dark:bg-lime";

const Card = memo(function Card({ entry }: { entry: Entry }) {
  return (
    <article className="relative flex w-[78vw] shrink-0 flex-col gap-3 pt-12 sm:w-[52vw] lg:w-[30vw]">
      {/* Node sitting on the rail that runs behind the row. */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-[-0.3125rem] h-2.5 w-2.5 rounded-full ${ACCENT_BG}`}
      />

      <span className="text-xs uppercase tracking-[0.2em] text-foreground/40">
        {entry.kind}
      </span>

      <span
        className={`text-xs uppercase tracking-[0.2em] tabular-nums ${ACCENT}`}
      >
        {entry.period}
      </span>

      <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight">
        {entry.org}
      </h3>

      <p className="text-base text-foreground/70 sm:text-lg">{entry.title}</p>

      <p className="text-sm uppercase tracking-[0.12em] text-foreground/45">
        {entry.location}
      </p>
    </article>
  );
});

/** Cards only. The rail is a sibling so it can outlive the row's transform. */
const Track = memo(function Track() {
  return (
    <div className="flex gap-12 sm:gap-16 lg:gap-20">
      {entries.map((entry) => (
        <Card key={entry.org} entry={entry} />
      ))}
    </div>
  );
});

/**
 * The hairline the nodes sit on. With `progress` it fills left to right as the
 * section scrolls; without, it is a plain accent line for the swipeable row.
 */
function Rail({ progress }: { progress?: MotionValue<number> }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-foreground/15"
    >
      {progress ? (
        <motion.span
          style={{ scaleX: progress }}
          className={`block h-full w-full origin-left ${ACCENT_BG}`}
        />
      ) : (
        <span className={`block h-full w-full opacity-40 ${ACCENT_BG}`} />
      )}
    </span>
  );
}

export default function Experience() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [viewportH, setViewportH] = useState(0);

  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // Pinning fights touch scrolling on phones, so small screens just scroll the
  // row by hand. Reduced motion opts out of the pin too.
  const pinned = isDesktop && !reduceMotion;

  // How far the row must travel for its right edge to reach the viewport's.
  useEffect(() => {
    if (!pinned) return;

    // Measured synchronously on purpose. requestAnimationFrame never fires
    // while the tab is hidden, which would leave the section stuck at zero
    // travel for anyone who loads the page in a background tab.
    const measure = () => {
      const el = track.current;
      if (!el) return;
      // clientWidth excludes the scrollbar; innerWidth does not, and the
      // difference would leave the last card short of the edge.
      setDistance(Math.max(0, el.scrollWidth - document.documentElement.clientWidth));
      setViewportH(window.innerHeight);
    };

    measure();

    // Observing the row catches font swaps and content reflow, which a plain
    // resize listener would miss. Its callbacks are already frame-batched.
    const observer = new ResizeObserver(measure);
    observer.observe(track.current!);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      id="experience"
      className={
        pinned
          ? "text-foreground"
          : "flex flex-col gap-12 py-28 text-foreground sm:gap-16 sm:py-36"
      }
    >
      {!pinned && (
        <div className="shell">
          <SectionHeading label="Experience" />
        </div>
      )}

      {/* Mounted in both layouts. useScroll resolves its target during the
          first (mobile-assumed) render, so a container that only existed in
          the pinned branch left the ref empty and threw "target ref is defined
          but not hydrated". When pinned, this element's height is the scroll
          budget for the sideways travel, and min-h-screen holds that space
          until the first measurement lands so the page below never jumps. */}
      <div
        ref={container}
        style={
          pinned && distance
            ? { height: `${distance + viewportH}px` }
            : undefined
        }
        className={pinned ? "relative min-h-screen" : undefined}
      >
        {pinned ? (
          <div className="sticky top-0 flex h-screen flex-col justify-center gap-16 overflow-hidden">
            <div className="shell">
              <SectionHeading label="Experience" />
            </div>

            {/* The rail sits outside the moving row so it spans the viewport
                and stays put while the cards travel across it. */}
            <div className="relative">
              <Rail progress={scrollYProgress} />

              <motion.div
                ref={track}
                style={{ x }}
                className="relative flex w-max pl-16 pr-[20vw] will-change-transform"
              >
                <Track />
              </motion.div>
            </div>
          </div>
        ) : (
          /* Swipeable row. overscroll-x-contain stops the swipe turning into a
             browser back gesture once the row hits its end. */
          <div className="overflow-x-auto overscroll-x-contain px-5 pb-4 sm:px-10">
            <div className="relative w-max pr-5">
              <Rail />
              <Track />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
