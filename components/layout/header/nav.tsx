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
    // Scrolling lives on the outer box and centring on the inner one, so short
    // viewports can reach both ends instead of clipping them.
    <div className="h-full w-full overflow-y-auto">
      <div className="flex min-h-full w-full flex-col justify-center gap-1 px-7 py-10 sm:px-10 sm:py-12">
        {links.map((link, i) => (
          <div
            key={link.title}
            style={{ perspective: '120px', perspectiveOrigin: 'bottom' }}
            className="shrink-0 overflow-hidden"
          >
            <motion.div
              custom={i}
              variants={perspective}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Link
                href={link.href}
                onClick={onNavigate}
                className="font-heading block py-1 text-2xl uppercase text-ink transition-colors hover:text-burgundy sm:text-3xl"
              >
                {link.title}
              </Link>
            </motion.div>
          </div>
        ))}

        <motion.div
          custom={links.length}
          variants={perspective}
          initial="initial"
          animate="enter"
          exit="exit"
          className="mt-6 shrink-0"
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </div>
  );
}
