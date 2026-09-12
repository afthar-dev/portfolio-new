'use client';

import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/creative-buttons';
import Select from '@/components/ui/select';
import { email as fallbackEmail } from './contact-data';

const projectTypes = [
  'Full stack software',
  'Web design & development',
  'AI automations',
  'Something else',
];

const budgets = [
  'Under ₹50,000',
  '₹50,000 to ₹2 lakh',
  '₹2 lakh to ₹5 lakh',
  '₹5 lakh or more',
  'Not sure yet',
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

const fieldClass =
  'w-full border-b border-foreground/20 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-foreground/35 focus:border-accent sm:text-xl';

const labelClass = 'text-xs uppercase tracking-[0.2em] text-foreground/45';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus('sending');
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error ?? 'Something went wrong.');

      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col gap-3 border-t border-foreground/15 pt-10">
        <p className="flex items-center gap-3 font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-tight">
          <Check aria-hidden="true" className="h-7 w-7 shrink-0 text-accent" />
          Message sent.
        </p>
        <p className="text-lg text-foreground/60">
          I&apos;ll get back to you within a day. If it&apos;s urgent, email{' '}
          <a href={`mailto:${fallbackEmail}`} className="underline">
            {fallbackEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 border-t border-foreground/15 pt-10"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>

        <Select name="projectType" label="Project type" options={projectTypes} />

        <Select name="budget" label="Budget" options={budgets} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={4000}
          placeholder="What are you building, and roughly when do you need it?"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <PrimaryButton
          type="submit"
          disabled={status === 'sending'}
          label={status === 'sending' ? 'Sending…' : 'Send message'}
        />

        {status === 'error' && error && (
          <p role="alert" className="text-sm text-foreground/70">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
