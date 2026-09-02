'use client';

import { useMediaQuery } from '@/lib/use-media-query';
import GalleryPair from './gallery-pair';
import ProjectCell from './project-cell';
import { allProjects, type GalleryProject } from './projects-data';

type Pair = [GalleryProject, GalleryProject];

/** Two per row, which is what the cursor split works against. */
function toPairs(projects: GalleryProject[]): Pair[] {
  const pairs: Pair[] = [];

  for (let i = 0; i + 1 < projects.length; i += 2) {
    pairs.push([projects[i], projects[i + 1]]);
  }

  return pairs;
}

export default function ProjectsGallery() {
  // Hover is the whole interaction, so touch layouts get the stacked version.
  const canHover = useMediaQuery('(min-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const interactive = canHover && !prefersReducedMotion;

  const pairs = toPairs(allProjects);
  // An odd count would leave the last project unpaired; it gets a row alone
  // rather than being dropped.
  const unpaired =
    allProjects.length % 2 === 1 ? allProjects[allProjects.length - 1] : null;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {pairs.map((pair, i) => (
        <GalleryPair
          key={pair[0].name}
          projects={pair}
          reversed={i % 2 === 1}
          interactive={interactive}
        />
      ))}

      {unpaired && (
        <ProjectCell project={unpaired} className="w-full md:w-[66.66%]" />
      )}
    </div>
  );
}
