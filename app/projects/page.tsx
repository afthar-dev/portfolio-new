import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/section-heading';
import ProjectsGallery from '@/components/sections/projects/gallery';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Work I have shipped: a booking site taking real payments, a role based HRMS, a realtime voice agent and a chat app.',
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="shell flex flex-col gap-12 py-32 text-foreground sm:gap-16">
        <SectionHeading as="h1" label="Projects" />
        <p className="max-w-[48ch] text-base text-foreground/60">
          Client work and things I built to find out how they work. A few are
          live, the rest run locally.
        </p>
        <ProjectsGallery />
      </section>
    </main>
  );
}
