'use client';

import SectionHeading from '@/components/ui/section-heading';
import { SecondaryButton } from '@/components/ui/creative-buttons';
import { useMediaQuery } from '@/lib/use-media-query';
import ProjectRow from './project-row';
import { featuredProjects, moreProjectsHref } from './projects-data';

export default function Projects() {
  // Hover-to-reveal has no equivalent on touch, so smaller layouts show the
  // images outright rather than hiding them behind an interaction.
  const hoverable = useMediaQuery('(min-width: 768px)');

  return (
    <section
      id="projects"
      className="mx-auto flex w-[94%] max-w-6xl flex-col gap-12 py-28 text-foreground sm:gap-16 sm:py-36"
    >
      <SectionHeading label="Featured Projects" />

      <div className="flex flex-col border-t border-foreground/15">
        {featuredProjects.map((project) => (
          <ProjectRow key={project.title1} {...project} hoverable={hoverable} />
        ))}
      </div>

      <SecondaryButton
        label="View more projects"
        href={moreProjectsHref}
        className="self-start"
      />
    </section>
  );
}
