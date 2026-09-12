import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { channels, email } from './contact-data';
import ContactForm from './contact-form';

export default function Contact() {
  return (
    <section
      id="contact"
      className="shell flex min-h-screen flex-col justify-center gap-12 py-32 text-foreground sm:gap-16"
    >
      <div className="flex flex-col gap-5">
        <SectionHeading label="Contact" />
        <p className="max-w-2xl text-lg text-foreground/60 sm:text-xl">
          Tell me what you are building and roughly when you need it. I reply to
          everything, usually within a day.
        </p>
      </div>

      {/* Kept alongside the form: some people would rather just mail you. */}
      <Link
        href={`mailto:${email}`}
        className="group flex flex-wrap items-center gap-3 font-display text-[clamp(1.75rem,6vw,4.5rem)] leading-[1.05] tracking-tight transition-colors duration-300 hover:text-accent"
      >
        {email}
        <ArrowUpRight
          aria-hidden="true"
          className="h-8 w-8 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-12 sm:w-12"
        />
      </Link>

      <ContactForm />

      <ul className="flex flex-col border-t border-foreground/15">
        {channels.map(({ label, value, href }) => {
          const external = href.startsWith('http');
          return (
            <li key={label}>
              <Link
                href={href}
                className="group flex items-center justify-between gap-6 border-b border-foreground/15 py-5 transition-colors duration-300 hover:text-accent"
                {...(external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">
                  {label}
                </span>
                <span className="flex items-center gap-2 text-base sm:text-lg">
                  {value}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
