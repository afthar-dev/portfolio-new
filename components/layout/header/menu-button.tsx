'use client';

import { motion } from 'framer-motion';

interface MenuButtonProps {
  isActive: boolean;
  toggleMenu: () => void;
}

export default function MenuButton({ isActive, toggleMenu }: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={toggleMenu}
      aria-expanded={isActive}
      aria-label={isActive ? 'Close menu' : 'Open menu'}
      className="relative z-10 block h-11 w-24 cursor-pointer overflow-hidden rounded-3xl"
    >
      <motion.div
        animate={{ y: isActive ? '-100%' : '0%' }}
        transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
        className="h-full w-full"
      >
        <div className="flex h-11 w-24 items-center justify-center bg-lime">
          <span className="text-sm font-medium uppercase tracking-wide text-ink">
            Menu
          </span>
        </div>
        <div className="flex h-11 w-24 items-center justify-center bg-ink">
          <span className="text-sm font-medium uppercase tracking-wide text-lime">
            Close
          </span>
        </div>
      </motion.div>
    </button>
  );
}
