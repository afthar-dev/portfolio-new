'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

/** Time the curtain takes to cover the screen before the route swaps. */
export const CURTAIN_MS = 500;

interface TransitionContextValue {
  isLeaving: boolean;
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLeaving, setIsLeaving] = useState(false);
  const timer = useRef<number | null>(null);

  const navigate = useCallback(
    (href: string) => {
      // Same route: nothing to cover, just let the browser handle the hash.
      if (href === pathname) return;

      setIsLeaving(true);
      if (timer.current) window.clearTimeout(timer.current);

      timer.current = window.setTimeout(() => {
        router.push(href);
        // Lenis keeps its own scroll position, so reset before the new page
        // paints or it lands wherever the previous one was.
        window.scrollTo(0, 0);
        setIsLeaving(false);
      }, CURTAIN_MS);
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ isLeaving, navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error('useTransition must be used within a TransitionProvider');
  return ctx;
}
