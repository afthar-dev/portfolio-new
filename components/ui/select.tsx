'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1] as const;

interface SelectProps {
  name: string;
  label: string;
  options: string[];
  placeholder?: string;
}

/**
 * Animated listbox standing in for a native <select>, which cannot be styled.
 * A hidden input carries the value so FormData still picks it up, and the
 * keyboard contract (arrows, Enter, Escape, Home/End) is kept intact.
 */
export default function Select({
  name,
  label,
  options,
  placeholder = 'Select one',
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const labelId = useId();

  // Close when focus or a click leaves the component.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const choose = (option: string) => {
    setValue(option);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (!open && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      event.preventDefault();
      setOpen(true);
      return;
    }

    if (!open) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose(options[activeIndex]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className="text-xs uppercase tracking-[0.2em] text-foreground/45">
        {label}
      </span>

      <div ref={rootRef} className="relative">
        <input type="hidden" name={name} value={value} />

        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onKeyDown}
          className="flex w-full items-center justify-between gap-3 border-b border-foreground/20 py-3 text-left text-lg outline-none transition-colors focus-visible:border-accent sm:text-xl"
        >
          <span className={value ? '' : 'text-foreground/35'}>
            {value || placeholder}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="shrink-0"
          >
            <ChevronDown aria-hidden="true" className="h-5 w-5" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              id={listId}
              role="listbox"
              aria-labelledby={labelId}
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute left-0 right-0 top-full z-30 mt-2 origin-top overflow-hidden rounded-2xl border border-foreground/15 bg-background p-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
            >
              {options.map((option, i) => {
                const selected = option === value;
                return (
                  <motion.li
                    key={option}
                    role="option"
                    aria-selected={selected}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.035, ease: EASE }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => choose(option)}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-base transition-colors sm:text-lg ${
                      i === activeIndex
                        ? 'bg-foreground/10'
                        : 'bg-transparent'
                    }`}
                  >
                    {option}
                    {selected && (
                      <Check aria-hidden="true" className="h-4 w-4 text-accent" />
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
