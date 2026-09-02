import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/section-heading';
import ProjectsGallery from '@/components/sections/projects/gallery';

export const metadata: Metadata = {
  title: 'Projects — Afthar N N',
  description:
    'Selected work: full stack software, web design and development, and AI automations.',
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="shell flex flex-col gap-12 py-32 text-foreground sm:gap-16">
        <SectionHeading label="Projects" />
        <p className="max-w-[48ch] text-base text-foreground/60">
          Client work and things I built to find out how they work. A few are
          live, the rest run locally.
        </p>
        <ProjectsGallery />
      </section>
    </main>
  );
}
