'use client';

import type { ComponentProps, MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { useTransition } from '@/components/providers/transition-provider';

type TransitionLinkProps = ComponentProps<typeof Link> & {
  href: string;
  children: ReactNode;
};

/**
 * Link that plays the curtain before navigating. Falls back to normal Link
 * behaviour for external URLs, mail links, downloads and modified clicks, so
 * middle-click and open-in-new-tab keep working.
 */
export default function TransitionLink({
  href,
  children,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = useTransition();

  const isInternal = href.startsWith('/') && !rest.target && !rest.download;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      !isInternal ||
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
