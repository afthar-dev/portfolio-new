import type { Variants } from 'framer-motion';

export interface MenuSize {
  width: number;
  height: number;
}

export const CLOSED_WIDTH = 96;
export const CLOSED_HEIGHT = 44;

export const menuTransition = {
  duration: 0.75,
  type: 'tween',
  ease: [0.76, 0, 0.24, 1],
} as const;

export const menuClosed = {
  width: CLOSED_WIDTH,
  height: CLOSED_HEIGHT,
  top: 0,
  right: 0,
};

/* The open panel is inset by 12px past the header padding on the top/right. */
export const menuOpen = (size: MenuSize) => ({
  width: size.width,
  height: size.height,
  top: -12,
  right: -12,
});

export const perspective: Variants = {
  initial: { opacity: 0, rotateX: 90, y: 80, x: -20 },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    x: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35, delay: 0.5 + i * 0.1 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: 'tween', ease: 'linear' },
  },
};
