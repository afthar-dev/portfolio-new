'use client';

import { useState, type ReactNode } from 'react';
import { TransitionProvider } from '@/components/providers/transition-provider';
import CurvedReveal from './curved-reveal';
import Footer from './footer';
import Header from './header';
import Loader from './loader';
import PageCurtain from './page-curtain';
import SmoothScroll from './smooth-scroll';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [loading, setLoading] = useState(true);

  return (
    <TransitionProvider>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <PageCurtain />
      <Header />

      <SmoothScroll>
        {/* Opaque and above the footer, so it slides over it while scrolling.
            Its bottom edge bows as the footer is uncovered. */}
        <CurvedReveal>{children}</CurvedReveal>
        {/* Travel to uncover the pinned footer. Only needed where the footer
            is actually pinned — below md it sits in normal flow. */}
        <div aria-hidden="true" className="hidden h-screen md:block" />
        <Footer />
      </SmoothScroll>
    </TransitionProvider>
  );
}
