'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Click-to-copy email, matching the reference footer's interaction. */
type State = 'idle' | 'copied' | 'blocked';

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<State>('idle');

  useEffect(() => {
    if (state !== 'copied') return;
    const timer = window.setTimeout(() => setState('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      // Clipboard denied or unavailable. Show the address so it can be copied
      // by hand rather than hijacking the page with a mailto redirect.
      setState('blocked');
    }
  };

  if (state === 'blocked') {
    return (
      <a
        href={`mailto:${email}`}
        className="inline-flex min-h-11 items-center break-all text-lg transition-colors hover:[color:var(--accent)] sm:min-h-0 sm:text-xl"
      >
        {email}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex min-h-11 items-center gap-2.5 text-left text-xl transition-colors hover:[color:var(--accent)] sm:min-h-0 sm:text-2xl"
      aria-live="polite"
    >
      {state === 'copied' ? 'Email copied' : 'Click to copy'}
      {state === 'copied' ? (
        <Check aria-hidden="true" className="h-5 w-5 [color:var(--accent)]" />
      ) : (
        <Copy
          aria-hidden="true"
          className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </button>
  );
}
