"use client";

import SectionHeading from "@/components/ui/section-heading";
import { SecondaryButton } from "@/components/ui/creative-buttons";
import { useMediaQuery } from "@/lib/use-media-query";
import ProjectRow from "./project-row";
import { featuredProjects, moreProjectsHref } from "./projects-data";

export default function Projects() {
  // Hover-to-reveal has no equivalent on touch, so smaller layouts show the
  // images outright rather than hiding them behind an interaction.
  const hoverable = useMediaQuery("(min-width: 768px)");

  return (
    <section
      id="projects"
      className="shell flex flex-col gap-12 py-28 text-foreground sm:gap-16 sm:py-36"
    >
      {/* Stacked on phones: side by side there is not enough room for the
          heading and the button without the button crowding the letters. */}
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <SectionHeading label="Featured Projects" />
        <SecondaryButton
          label="View more projects"
          href={moreProjectsHref}
          className="sm:self-start"
        />
      </div>

      <div className="flex flex-col border-t border-foreground/15">
        {featuredProjects.map((project) => (
          <ProjectRow key={project.title1} {...project} hoverable={hoverable} />
        ))}
      </div>
    </section>
  );
}
