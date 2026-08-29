'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a media query. Uses useSyncExternalStore so the value stays
 * consistent through hydration without an extra render pass.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false // Server render: assume the smaller layout.
  );
}
