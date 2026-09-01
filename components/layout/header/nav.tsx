'use client';

import { motion } from 'framer-motion';
import TransitionLink from '@/components/ui/transition-link';
import { links } from './links';
import { perspective } from './anim';
import ThemeToggle from './theme-toggle';

interface NavProps {
  onNavigate?: () => void;
}

export default function Nav({ onNavigate }: NavProps) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-1 px-10 py-12">
      {links.map((link, i) => (
        <div
          key={link.title}
          style={{ perspective: '120px', perspectiveOrigin: 'bottom' }}
          className="overflow-hidden"
        >
          <motion.div
            custom={i}
            variants={perspective}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <TransitionLink
              href={link.href}
              onClick={onNavigate}
              className="font-heading block py-1 text-3xl uppercase text-ink transition-colors hover:text-burgundy"
            >
              {link.title}
            </TransitionLink>
          </motion.div>
        </div>
      ))}

      <motion.div
        custom={links.length}
        variants={perspective}
        initial="initial"
        animate="enter"
        exit="exit"
        className="mt-6"
      >
        <ThemeToggle />
      </motion.div>
    </div>
  );
}
