'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from './projects-data';

const slide = {
  closed: { width: 0 },
  open: { width: 'auto' },
};

interface ProjectRowProps extends Project {
  /** False on touch layouts, where hover never fires: keep the image open. */
  hoverable: boolean;
}

export default function ProjectRow({
  title1,
  title2,
  discipline,
  year,
  href,
  image,
  hoverable,
}: ProjectRowProps) {
  const [isActive, setIsActive] = useState(false);
  const external = href?.startsWith('http');
  const isOpen = hoverable ? isActive : true;

  const content = (
    <>
      <div className="flex flex-wrap items-center justify-center gap-x-1">
        <span>{title1}</span>

        {/* Only the image moves; the two title halves stay put around it. */}
        <motion.span
          variants={slide}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="inline-block h-[0.85em] overflow-hidden align-middle"
        >
          <Image
            src={image}
            alt=""
            width={320}
            height={200}
            sizes="320px"
            className="mx-3 h-full w-auto max-w-none rounded-lg object-cover"
          />
        </motion.span>

        <span className="flex items-center gap-3">
          {title2}
          {external && (
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-lime transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-7 sm:w-7"
            />
          )}
        </span>
      </div>

      <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/50 sm:text-sm">
        <span>{discipline}</span>
        <span aria-hidden="true">·</span>
        <span>{year}</span>
      </div>
    </>
  );

  const rowClass =
    'group flex flex-col items-center gap-3 border-b border-foreground/15 py-8 text-center font-display text-[clamp(1.75rem,6vw,4.5rem)] leading-[1.1] tracking-tight transition-colors duration-300 hover:text-foreground/90 sm:py-10';

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {href ? (
        <Link
          href={href}
          className={rowClass}
          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {content}
        </Link>
      ) : (
        <div className={rowClass}>{content}</div>
      )}
    </div>
  );
}
