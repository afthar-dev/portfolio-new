'use client';

import { useEffect, type ReactNode } from 'react';
import type LocomotiveScroll from 'locomotive-scroll';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    let locomotiveScroll: LocomotiveScroll;

    (async () => {
      const LocomotiveScrollCtor = (await import('locomotive-scroll')).default;
      locomotiveScroll = new LocomotiveScrollCtor();
    })();

    return () => {
      locomotiveScroll?.destroy();
    };
  }, []);

  return <>{children}</>;
}
