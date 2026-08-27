'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';

const spin = { duration: 0.45, ease: [0.76, 0, 0.24, 1] } as const;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative flex h-11 w-11 items-center justify-center self-start overflow-hidden rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/60"
    >
      {/* Both icons stay mounted and cross-animate, so there is no empty frame. */}
      <motion.span
        className="absolute flex items-center justify-center"
        animate={{
          opacity: isDark ? 0 : 1,
          rotate: isDark ? -90 : 0,
          scale: isDark ? 0.4 : 1,
        }}
        transition={spin}
      >
        <Sun size={18} strokeWidth={2} aria-hidden="true" />
      </motion.span>

      <motion.span
        className="absolute flex items-center justify-center"
        animate={{
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
          scale: isDark ? 1 : 0.4,
        }}
        transition={spin}
      >
        <Moon size={18} strokeWidth={2} aria-hidden="true" />
      </motion.span>
    </button>
  );
}
