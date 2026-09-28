"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { serviceCtaHref, type Service } from "./services-data";

/** How far each card shrinks and tilts once the cards above it stack up. */
const SCALE_STEP = 0.05;
const ROTATE_STEP = 2;

interface ServiceCardProps extends Service {
  index: number;
  total: number;
  progress: MotionValue<number>;
  /** False on small screens and under reduced-motion: render a plain stack. */
  animated: boolean;
}

export default function ServiceCard({
  name,
  outcome,
  includes,
  proof,
  index,
  total,
  progress,
  animated,
}: ServiceCardProps) {
  const reduceMotion = useReducedMotion();

  // Cards behind the top of the pile settle smaller and slightly tilted; the
  // last card has no one stacking over it, so it stays at rest.
  const remaining = total - 1 - index;
  const targetScale = 1 - remaining * SCALE_STEP;

  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const rotate = useTransform(
    progress,
    [index / total, 1],
    [0, -ROTATE_STEP * remaining],
  );

  return (
    <div
      // Each card pins in turn; the offset leaves the edge of the card
      // beneath visible so the pile reads as depth rather than one swap.
      //
      // Sizing follows `animated` rather than a width-only breakpoint, so it
      // agrees with the JS gate. When the cards do not pin, a 78vh shell around
      // a 62vh card padded every card with a third of a screen of nothing, and
      // the 420px floor overflowed short landscape viewports outright.
      className={`flex items-center justify-center ${
        animated ? 'sticky h-[78vh]' : ''
      }`}
      style={{ top: animated ? `calc(6rem + ${index * 14}px)` : undefined }}
    >
      {/* Every card reveals the same way on every screen. The reveal must not
          be gated on `animated`: that comes from a media query which reads
          false during SSR and hydration, so the cards mounted with the hidden
          initial state and then, once it flipped true on desktop, lost the
          whileInView target that would have brought them back. They stayed
          at opacity 0 for good. whileInView is therefore unconditional, so
          whatever initial state a card mounts with, something always resolves
          it to visible. The scroll-driven scale and rotate still compose on
          top via `style`. */}
      <motion.div
        style={animated ? { scale, rotate } : undefined}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        // Tap feedback only where scale is not already driven by scroll.
        whileTap={animated || reduceMotion ? undefined : { scale: 0.99 }}
        className={`w-full origin-top ${
          animated ? 'h-[62vh] min-h-[420px]' : ''
        }`}
      >
        <div className="group relative flex h-full w-full flex-col gap-6 overflow-hidden rounded-3xl border-2 border-foreground/15 bg-background p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:border-accent sm:gap-8 sm:p-10">
          <span className="text-xs uppercase tracking-[0.2em] text-foreground/40">
            Service
          </span>

          <div className="flex flex-1 flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-12">
            <div className="flex flex-col gap-3 md:max-w-md">
              <h3 className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight">
                {name}
              </h3>
              <p className="text-base text-foreground/70 sm:text-lg">
                {outcome}
              </p>
            </div>

            <ul className="flex flex-col gap-2.5 md:pt-3">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm sm:text-base"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-foreground"
                    strokeWidth={3}
                  />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 border-t border-foreground/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-foreground/50">{proof}</p>

            <Link
              href={serviceCtaHref}
              // min-h-11 gives the inline link a 44px touch target on phones;
              // from sm up it sits in a row where the height is already set.
              className="flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-wide text-foreground transition-colors hover:text-accent sm:min-h-0"
            >
              Start a project
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
