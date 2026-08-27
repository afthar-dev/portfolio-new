'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './creative-buttons.module.css';

interface ButtonProps {
  label: string;
  href?: string;
  className?: string;
  /** Filename to save as; turns the link into a download. */
  download?: string;
  /** Icon rendered in the slide-in slot. Defaults to an arrow. */
  icon?: ReactNode;
}

/** Expanding-dot button: the dot scales up to flood the pill on hover. */
export function PrimaryButton({
  label,
  href = '#',
  className = '',
  download,
  icon,
}: ButtonProps) {
  return (
    <Link
      href={href}
      download={download}
      className={`${styles.primaryBtn} ${className}`}
    >
      <div className={styles.round} />
      <p className={styles.title}>{label}</p>
      <div className={styles.arrow}>
        {icon ?? <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
      </div>
    </Link>
  );
}

/** Slide-up reveal: label rises away while a blob expands into a filled pill. */
export function SecondaryButton({ label, href = '#', className = '' }: ButtonProps) {
  return (
    <Link href={href} className={`${styles.secondaryBtn} ${className}`}>
      <p className={styles.primaryLabel}>{label}</p>
      <div className={styles.secondaryLabel}>
        <p>{label}</p>
        <div className={styles.blob} />
      </div>
    </Link>
  );
}

/** Marquee button: scrolling text swaps for a staggered per-letter reveal. */
export function ContactButton({
  label = 'Get in touch',
  marquee = 'Let us work together',
  href = '#contact',
  className = '',
}: ButtonProps & { marquee?: string }) {
  return (
    <Link href={href} className={`${styles.contactBtn} ${className}`}>
      <div className={styles.mask}>
        <div className={styles.slider}>
          <p>{marquee}</p>
          <p>{marquee}</p>
        </div>
      </div>
      <p className={styles.letters}>
        {label.split('').map((char, i) => (
          <span key={i} style={{ transitionDelay: `${i * 0.02}s` }}>
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </p>
    </Link>
  );
}
