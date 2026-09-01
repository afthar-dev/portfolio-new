import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/section-heading';

export const metadata: Metadata = {
  title: 'About — Afthar N N',
  description:
    'Full stack developer building web products and AI automations, from Kerala, India.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="shell flex min-h-screen flex-col justify-center gap-12 py-32 text-foreground sm:gap-16">
        <SectionHeading label="About" />
      </section>
    </main>
  );
}
