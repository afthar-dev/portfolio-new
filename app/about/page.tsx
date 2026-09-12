import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/section-heading';
import { PrimaryButton } from '@/components/ui/creative-buttons';
import Reveal from '@/components/ui/reveal';
import LineReveal from '@/components/ui/line-reveal';
import Portrait from './portrait';

export const metadata: Metadata = {
  title: 'About',
  description:
    'I am a full stack developer from Kerala, working in Bangalore. I studied electronics and now build websites and internal tools.',
};

const lead =
  'I started out with circuit boards. Now I build things for the web.';

const paragraphs = [
  "I'm Afthar. I'm from Kerala, and I work in Bangalore. For the last year and a half I've been building websites and the kind of internal tools people open every morning without thinking about them.",
  'I studied electronics, not software. That turned out to be useful. You learn to take a thing apart, work out why it is misbehaving, and stay calm while you do it.',
  "Most days I'm somewhere between the database and the screen. I like being close to the whole of it, talking to the people who will use the thing, building it, then watching it go live.",
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
          <SectionHeading as="h1" label="About" />

          {/* Indented from the heading so the statement reads as a pull quote
              rather than another line of the same block. */}
          <LineReveal
            text={lead}
            className="max-w-[18ch] font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] tracking-tight md:ml-[8%]"
          />
        </div>

        {/* Asymmetric: the text holds a narrow measure on the left while the
            portrait starts inside the same track and lifts above the baseline,
            so it breaks the grid instead of sitting neatly beside it. */}
        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
          <div className="order-2 flex max-w-md flex-col gap-7 md:col-span-6 md:col-start-1 md:row-start-1 md:pt-16">
            {paragraphs.map((text, i) => (
              <Reveal key={text} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-foreground/70 sm:text-xl">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Shares row 1 with the text and starts inside its track, so the
              two overlap instead of sitting in tidy columns. */}
          {/* Leads on phones so a face arrives right after the statement. On
              md+ it shares row 1 with the text and starts inside its track, so
              the two overlap instead of sitting in tidy columns. */}
          <div className="order-1 md:col-span-6 md:col-start-6 md:row-start-1 md:-mt-24 md:-mr-[4%]">
            <Portrait />
          </div>
        </div>

        {/* Wide strip: three columns on a single rule, the counterweight to the
            narrow text above it. */}
        <Reveal>
          <dl className="grid grid-cols-1 border-t border-foreground/15 sm:grid-cols-3">
            {details.map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col gap-2 border-b border-foreground/15 py-6 sm:border-b-0 sm:pr-8"
              >
                <dt className="text-xs uppercase tracking-[0.2em] text-foreground/45">
                  {label}
                </dt>
                <dd className="text-base sm:text-lg">{value}</dd>
              </div>
            ))}
          </dl>
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
