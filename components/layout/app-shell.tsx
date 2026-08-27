'use client';

import { useState, type ReactNode } from 'react';
import Header from './header';
import Loader from './loader';
import SmoothScroll from './smooth-scroll';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Header />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
