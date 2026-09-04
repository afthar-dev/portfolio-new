import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/section-heading';
import { PrimaryButton } from '@/components/ui/creative-buttons';
import Reveal from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'About — Afthar N N',
  description:
    'Afthar N N — developer from Kerala, working in Bangalore. Websites and internal tools.',
};

const paragraphs = [
  "I'm Afthar. I'm from Kerala, and I work in Bangalore. For the last year and a half I've been building websites and the kind of internal tools people open every morning without thinking about them.",
  'I studied electronics, not software. That turned out to be useful. You learn to take a thing apart, work out why it is misbehaving, and stay calm while you do it.',
  "Most days I'm somewhere between the database and the screen. I like being close to the whole of it — talking to the people who will use the thing, building it, then watching it go live.",
  "If something is slow, confusing, or breaks quietly, I'd rather fix that than add anything new on top of it.",
];

const details = [
  ['From', 'Kerala, India'],
  ['Based in', 'Bangalore'],
  ['Speaks', 'Malayalam, English, Hindi'],
];

export default function AboutPage() {
  return (
    <main>
      <section className="shell flex flex-col gap-20 py-28 text-foreground sm:gap-28 sm:py-36">
        <div className="flex flex-col gap-8">
          <SectionHeading label="About" />

          <Reveal delay={0.15}>
            <p className="max-w-3xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.15] tracking-tight">
              I started out with circuit boards. Now I build things for the web.
            </p>
          </Reveal>
        </div>

        <div className="flex max-w-2xl flex-col gap-7">
          {paragraphs.map((text, i) => (
            // Staggered by hand so the paragraphs settle one after another
            // rather than all at once.
            <Reveal key={text} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl">
                {text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <ul className="flex max-w-2xl flex-col">
            {details.map(([label, value]) => (
              <li
                key={label}
                className="flex flex-wrap items-baseline justify-between gap-4 border-t border-foreground/15 py-5"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-foreground/45">
                  {label}
                </span>
                <span className="text-base sm:text-lg">{value}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="flex flex-col items-start gap-8">
            <p className="max-w-2xl font-display text-[clamp(1.35rem,3vw,2.25rem)] leading-tight">
              Working on something? I&apos;d like to hear about it.
            </p>

            <PrimaryButton label="Get in touch" href="/contact" />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
