'use client';

import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  return (
    <button
      type="button"
      // Lenis hijacks scrolling, so ask it to animate when it is present and
      // fall back to the native scroll otherwise.
      onClick={() => {
        const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } })
          .lenis;
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="group flex min-h-11 items-center gap-2 text-lg transition-colors hover:[color:var(--accent)] sm:min-h-0 sm:text-xl"
    >
      Back to top
      <ArrowUp
        aria-hidden="true"
        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1"
      />
    </button>
  );
}
