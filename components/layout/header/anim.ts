import type { Variants } from 'framer-motion';

export const menuSlide: Variants = {
  closed: {
    width: 96,
    height: 44,
    top: 0,
    right: 0,
    transition: { duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    width: 440,
    height: 600,
    top: -12,
    right: -12,
    transition: { duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },
};

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
