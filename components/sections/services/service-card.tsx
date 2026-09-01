"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, useTransform, type MotionValue } from "framer-motion";
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
      className="flex h-[78vh] items-center justify-center md:sticky"
      style={{ top: animated ? `calc(6rem + ${index * 14}px)` : undefined }}
    >
      <motion.div
        style={animated ? { scale, rotate } : undefined}
        className="h-[62vh] min-h-[420px] w-full origin-top"
      >
        <div className="group relative flex h-full w-full flex-col gap-6 overflow-hidden rounded-3xl border-2 border-foreground/15 bg-background p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:border-lime sm:gap-8 sm:p-10">
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
              className="flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-wide text-foreground transition-colors hover:text-lime sm:min-h-0"
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
