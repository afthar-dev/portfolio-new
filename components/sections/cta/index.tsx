"use client";

import { useCallback, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MessagesSquare } from "lucide-react";
import { ContactButton } from "@/components/ui/creative-buttons";
import ScratchOverlay from "./scratch-overlay";
import styles from "./ticket.module.css";

/** Time-of-day greeting, resolved on the client so it matches the visitor. */
function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** Where the stub is torn, as a percentage of the ticket width. */
const TEAR_AT = "26%";

export default function Cta() {
  const reduceMotion = useReducedMotion();
  // Under reduced-motion the overlay never mounts, so start already revealed.
  const [revealed, setRevealed] = useState(Boolean(reduceMotion));

  const handleRevealed = useCallback(() => setRevealed(true), []);

  return (
    <section
      id="cta"
      className="shell py-28 text-foreground sm:py-36"
      // Captured here so the ticket's punched holes can still reference the
      // page colour after the ticket pins its own tokens.
      style={{ "--page-bg": "var(--background)" } as React.CSSProperties}
    >
      {/* Capped below the shell width: a full-bleed ticket reads as a banner
          rather than a coupon. */}
      <div className={`${styles.ticket} relative mx-auto max-w-4xl`}>
        {/* Content is always in the DOM; only the scratch layer hides it.
            `isolate` traps inner z-indexes so nothing paints over the overlay,
            and text-foreground re-resolves against the ticket's pinned tokens —
            without it children inherit the page's already-computed colour. */}
        <div className="isolate flex min-h-[380px] text-foreground sm:min-h-[420px]">
          <div
            className="flex shrink-0 items-center justify-center py-8"
            style={{ width: TEAR_AT }}
          >
            <span
              className={`${styles.stubText} font-heading text-xs uppercase tracking-[0.35em] text-foreground/50 sm:text-sm`}
            >
              Your move
            </span>
          </div>

          {/* Tear line, with a punched hole at each end. */}
          <div className={`${styles.perforation} relative`}>
            <span className={`${styles.notch} ${styles.notchTop}`} />
            <span className={`${styles.notch} ${styles.notchBottom}`} />
          </div>

          <div className="flex flex-1 items-center gap-6 px-6 py-10 sm:gap-10 sm:px-10">
            <MessagesSquare
              aria-hidden="true"
              className="hidden h-16 w-16 shrink-0 text-foreground/70 md:block"
              strokeWidth={1.25}
            />

            <span
              aria-hidden="true"
              className="hidden w-px self-stretch bg-foreground/15 md:block"
            />

            <div className="flex flex-1 flex-col items-center gap-4 text-center sm:gap-5">
              {/* 12px floor: 0.65rem fell below the readable minimum, and the
                  tracking eases off to buy back the width that costs. */}
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/50 sm:tracking-[0.3em]">
                {greeting()}
              </p>

              <h2 className="font-heading text-[clamp(1.5rem,4.5vw,2.75rem)] font-bold uppercase leading-[1.1] tracking-tight">
                1 Free
                <br />
                Consultation
              </h2>

              <p className="max-w-xs text-sm text-foreground/60 sm:text-base">
                Tell me what you&apos;re building.
              </p>

              <ContactButton
                label="Redeem it"
                marquee="Let's work together"
                href="/contact"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {!reduceMotion && (
          <ScratchOverlay revealed={revealed} onRevealed={handleRevealed} />
        )}
      </div>
    </section>
  );
}
