import type { Metadata } from 'next';
import Contact from '@/components/sections/contact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell me what you are building and roughly when you need it. Websites, web apps, automations, voice agents and CRM tools.',
};

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}
