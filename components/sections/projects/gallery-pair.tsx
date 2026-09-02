'use client';

import type { MouseEvent } from 'react';
import { useEffect, useRef } from 'react';
import ProjectCell from './project-cell';
import type { GalleryProject } from './projects-data';

/** The pair always splits between these two widths, never past them. */
const NARROW = 33.33;
const WIDE = 66.66;
/** Share of the remaining distance covered each frame. Lower drags more. */
const SPEED = 0.15;
/** Below this the easing has arrived and the loop can stop. */
const SETTLED = 0.05;

interface GalleryPairProps {
  projects: [GalleryProject, GalleryProject];
  /** Starts the wide image on the right instead of the left. */
  reversed?: boolean;
  /** False on touch and reduced-motion: the pair stacks and the cursor is ignored. */
  interactive: boolean;
}

export default function GalleryPair({
  projects,
  reversed = false,
  interactive,
}: GalleryPairProps) {
  const firstCell = useRef<HTMLDivElement>(null);
  const secondCell = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  // Refs, not plain variables: these have to survive re-renders so the easing
  // continues from where the last frame left off instead of snapping back.
  const target = useRef(reversed ? 100 : 0);
  const current = useRef(reversed ? 100 : 0);

  useEffect(() => {
    const applyWidths = (percent: number) => {
      if (!firstCell.current || !secondCell.current) return;
      firstCell.current.style.setProperty(
        '--cell-width',
        `${WIDE - percent * 0.33}%`
      );
      secondCell.current.style.setProperty(
        '--cell-width',
        `${NARROW + percent * 0.33}%`
      );
    };

    const stop = () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };

    if (interactive) {
      // Seed the lopsided split so the pair is not sitting at an even 50/50
      // until the cursor first crosses it.
      applyWidths(current.current);
    } else {
      // The stacked layout ignores the variable anyway, but clear it so a
      // return to the wide layout starts from the even split rather than
      // whatever the cursor last left behind.
      stop();
      for (const cell of [firstCell, secondCell]) {
        if (cell.current) cell.current.style.removeProperty('--cell-width');
      }
    }

    return stop;
  }, [interactive]);

  const animate = () => {
    const delta = target.current - current.current;
    current.current += delta * SPEED;

    if (firstCell.current && secondCell.current) {
      firstCell.current.style.setProperty(
        '--cell-width',
        `${WIDE - current.current * 0.33}%`
      );
      secondCell.current.style.setProperty(
        '--cell-width',
        `${NARROW + current.current * 0.33}%`
      );
    }

    if (Math.abs(delta) < SETTLED) {
      frame.current = null;
      return;
    }

    frame.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;

    target.current = (event.clientX / window.innerWidth) * 100;

    if (frame.current === null) {
      frame.current = requestAnimationFrame(animate);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="flex flex-col gap-10 md:flex-row md:items-start md:gap-6"
    >
      <ProjectCell ref={firstCell} project={projects[0]} />
      <ProjectCell ref={secondCell} project={projects[1]} />
    </div>
  );
}
