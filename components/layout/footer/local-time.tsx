'use client';

import { useEffect, useState } from 'react';
import { timeZone } from './footer-data';

const format = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(date);

/** Live clock in my timezone. Rendered after mount so SSR and client agree. */
export default function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  // Reserve the line until the client clock is known.
  return <span suppressHydrationWarning>{now ?? '··:··'}</span>;
}
