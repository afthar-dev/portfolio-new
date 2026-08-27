'use client';

import { Download } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/creative-buttons';
import SectionHeading from '@/components/ui/section-heading';
import { skillRows, type Skill } from './skills-data';

function Pill({ name, Icon, color }: Skill) {
  return (
    <span className="group flex w-fit shrink-0 items-center gap-5 rounded-full border-2 border-foreground/70 px-7 py-2.5 sm:gap-8 sm:px-8">
      <span className="whitespace-nowrap text-xl font-light italic leading-none sm:text-2xl">
        {name}
      </span>
      <Icon
        aria-hidden="true"
        className="h-6 w-6 shrink-0 text-foreground transition-colors duration-300 group-hover:[color:var(--brand)] sm:h-7 sm:w-7"
        style={{ '--brand': color } as React.CSSProperties}
      />
    </span>
  );
}

function Row({ skills, reverse }: { skills: Skill[]; reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden">
      {/* Two identical tracks sit side by side; shifting each by its own width
          lands the copy where the original began, so the loop has no seam. */}
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={`flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          {skills.map((skill) => (
            <Pill key={skill.name} {...skill} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 text-foreground sm:py-36">
      <div className="mx-auto flex w-[88%] max-w-6xl flex-col gap-12 sm:gap-16">
        <SectionHeading label="Skills" />

        {/* Two blocks side by side under the heading; stacked on small screens. */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
          <div className="flex shrink-0 flex-col items-start gap-6 md:w-[34%]">
            <p className="text-lg text-foreground/70 sm:text-xl">
              The same story, in a format recruiters prefer.
            </p>

            <PrimaryButton
              label="Download CV"
              href="/afthar-resume.pdf"
              download="Afthar-N-N-Resume.pdf"
              icon={<Download size={16} strokeWidth={2} aria-hidden="true" />}
            />
          </div>

          {/* min-w-0 lets the marquee overflow inside this column rather than
              stretching it to the width of its content. */}
          <div className="flex min-w-0 flex-1 flex-col gap-5 sm:gap-6">
            {skillRows.map((skills, i) => (
              <Row key={i} skills={skills} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
