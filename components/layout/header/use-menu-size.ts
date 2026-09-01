'use client';

import { useEffect, useState } from 'react';
import { CLOSED_HEIGHT, CLOSED_WIDTH, type MenuSize } from './anim';

const MAX_WIDTH = 440;
const MAX_HEIGHT = 600;
/* The panel is offset by -12px, so it sits 12px inside the viewport on the
   top/right. Reserve the same gutter on the opposite sides. */
const GUTTER = 24;

const clampToViewport = (): MenuSize => ({
  width: Math.max(
    CLOSED_WIDTH,
    Math.min(MAX_WIDTH, window.innerWidth - GUTTER)
  ),
  height: Math.max(
    CLOSED_HEIGHT,
    Math.min(MAX_HEIGHT, window.innerHeight - GUTTER)
  ),
});

/* Starts at the desktop size so the server and first client render agree. */
export default function useMenuSize(): MenuSize {
  const [size, setSize] = useState<MenuSize>({
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
  });

  useEffect(() => {
    const update = () => setSize(clampToViewport());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}
