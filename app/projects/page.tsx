import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/section-heading';

export const metadata: Metadata = {
  title: 'Projects — Afthar N N',
  description:
    'Selected work: full stack software, web design and development, and AI automations.',
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="shell flex min-h-screen flex-col justify-center gap-12 py-32 text-foreground sm:gap-16">
        <SectionHeading label="Projects" />
      </section>
    </main>
  );
}
