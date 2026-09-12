import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { GalleryProject } from './projects-data';

interface ProjectCellProps {
  project: GalleryProject;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * One gallery tile. The pair drives `--cell-width` on this wrapper as the
 * cursor moves, but that variable is only read from `md` up: below that the
 * cell is full width no matter what JavaScript last wrote.
 */
export default function ProjectCell({
  project,
  className = 'w-full md:w-[var(--cell-width,50%)]',
  ref,
}: ProjectCellProps) {
  const { name, description, year, image, href } = project;

  const body = (
    <>
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-foreground/5">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <h3 className="font-heading flex items-center gap-2 text-lg uppercase tracking-tight text-foreground sm:text-xl">
          {name}
          {href && (
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          )}
        </h3>
        <p className="max-w-[42ch] text-sm text-foreground/60">{description}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">
          {year}
        </p>
      </div>
    </>
  );

  return (
    <div ref={ref} className={className}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {body}
        </a>
      ) : (
        <div className="group">{body}</div>
      )}
    </div>
  );
}
