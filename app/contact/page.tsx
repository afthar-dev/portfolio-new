import type { Metadata } from 'next';
import Contact from '@/components/sections/contact';

export const metadata: Metadata = {
  title: 'Contact — Afthar N N',
  description:
    'Get in touch about full stack software, web development or AI automation work.',
};

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}
