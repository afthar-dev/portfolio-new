'use client';

import { useEffect, useRef, useState } from 'react';

const COLUMNS = 20;
const CLEAR_DELAY = 300;

/**
 * Grid of square blocks that light up as the pointer passes over them.
 * Blocks are painted by direct style writes rather than React state — with
 * several hundred cells, re-rendering on every mousemove would drop frames.
 */
export default function PixelTrail() {
  const [rows, setRows] = useState(0);
  const timeouts = useRef(new Map<HTMLDivElement, number>());

  useEffect(() => {
    const measure = () => {
      const blockSize = window.innerWidth / COLUMNS;
      setRows(Math.ceil(window.innerHeight / blockSize));
    };

    measure();
    window.addEventListener('resize', measure);

    const pending = timeouts.current;
    return () => {
      window.removeEventListener('resize', measure);
      pending.forEach((id) => window.clearTimeout(id));
      pending.clear();
    };
  }, []);

  const paint = (el: HTMLDivElement) => {
    const existing = timeouts.current.get(el);
    if (existing) window.clearTimeout(existing);

    // Snap on with no transition, then fade out once the timer expires.
    el.style.transition = 'none';
    el.style.backgroundColor = 'var(--foreground)';

    const id = window.setTimeout(() => {
      el.style.transition = 'background-color 0.6s ease-out';
      el.style.backgroundColor = 'transparent';
      timeouts.current.delete(el);
    }, CLEAR_DELAY);

    timeouts.current.set(el, id);
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex h-full w-full overflow-hidden"
    >
      {Array.from({ length: COLUMNS }).map((_, col) => (
        <div key={col} className="h-full" style={{ width: `${100 / COLUMNS}vw` }}>
          {Array.from({ length: rows }).map((_, row) => (
            <div
              key={row}
              onMouseEnter={(e) => paint(e.currentTarget)}
              style={{ width: `${100 / COLUMNS}vw`, height: `${100 / COLUMNS}vw` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
