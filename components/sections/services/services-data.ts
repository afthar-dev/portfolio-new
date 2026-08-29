export interface Service {
  name: string;
  /** The outcome a client is buying, in their language not yours. */
  outcome: string;
  /** Concrete deliverables — what actually gets handed over. */
  includes: string[];
  /** Evidence it has been done before. */
  proof: string;
}

export const services: Service[] = [
  {
    name: 'Full Stack Software',
    outcome:
      'Internal tools and platforms your team actually uses — instead of the spreadsheet everyone is quietly afraid of.',
    includes: [
      'REST APIs, auth and role-based access',
      'Database design, schemas and migrations',
      'Deployment, environments and release workflow',
    ],
    proof:
      'Built a role-based HRMS running recruitment, candidate tracking and hiring pipelines end to end.',
  },
  {
    name: 'Web Design & Development',
    outcome:
      'Sites that load fast, rank on Google, and turn visitors into enquiries — not just something pretty to look at.',
    includes: [
      'Responsive design and build from scratch',
      'Server-side rendering and on-page SEO',
      'Booking flows, payments and CMS handover',
    ],
    proof:
      'Shipped Minnies Tours & Travels: a production booking site with SSR and SEO, live and taking real bookings.',
  },
  {
    name: 'AI Automations',
    outcome:
      'The repetitive work handled while you sleep — lead capture, routing, follow-ups and reporting that run themselves.',
    includes: [
      'n8n and Make workflow automation',
      'LLM and Gemini API integrations',
      'CRM, email and webhook wiring',
    ],
    proof:
      'Automated lead capture and routing so enquiries reach the right inbox without anyone touching a spreadsheet.',
  },
];

/** Where each service card sends an interested visitor. */
export const serviceCtaHref = '#contact';
