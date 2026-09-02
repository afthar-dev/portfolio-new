export interface Project {
  /** Title is split so the image can slide open between the two halves. */
  title1: string;
  title2: string;
  /** Short description of the work / stack. */
  discipline: string;
  year: string;
  href?: string;
  image: string;
}

export const featuredProjects: Project[] = [
  {
    title1: 'Realtime',
    title2: 'Voice Agent',
    discipline: 'AI, Realtime audio',
    year: '2026',
    // Stock image, unlike the other two which are screenshots of the real work.
    image: '/images/voice-agent.jpg',
  },
  {
    title1: 'Minnies',
    title2: 'Tours & Travels',
    discipline: 'Next.js, PostgreSQL, Prisma',
    year: '2026',
    href: 'https://minniestoursandtravels.com',
    image: '/images/minnies.png',
  },
  {
    title1: 'Sandhesham',
    title2: 'Chat App',
    discipline: 'Socket.IO, Node.js',
    year: '2025',
    href: 'https://chat-app-uz18.onrender.com/',
    image: '/images/chat-app.png',
  },
];

/** Where the "view more" action points. */
export const moreProjectsHref = '/projects';

export interface GalleryProject {
  name: string;
  /** One plain sentence about what it does. No stack jargon here. */
  description: string;
  year: string;
  image: string;
  href?: string;
}

/** Everything, for the /projects gallery. Ordered newest first. */
export const allProjects: GalleryProject[] = [
  {
    name: 'HRMS',
    description:
      'Hiring tool with three levels of access. Post jobs, track candidates, shortlist.',
    year: '2026',
    image: '/images/hrms.jpg',
  },
  {
    name: 'Minnies Tours & Travels',
    description:
      'Travel booking site with an admin panel for packages, destinations and cabs.',
    year: '2026',
    href: 'https://minniestoursandtravels.com',
    image: '/images/minnies.png',
  },
  {
    name: 'Voice Agent',
    description:
      'Speak to it, it speaks back. You can cut in halfway and it keeps up.',
    year: '2026',
    image: '/images/voice-agent.jpg',
  },
  {
    name: 'WhatsApp Booking',
    description:
      'Books, moves and cancels appointments over chat. Checks a sheet for free slots.',
    year: '2026',
    image: '/images/whatsapp-booking.jpg',
  },
  {
    name: 'Sandhesham',
    description: 'Chat app. Messages arrive live, and replies come suggested.',
    year: '2025',
    href: 'https://chat-app-uz18.onrender.com/',
    image: '/images/chat-app.png',
  },
  {
    name: 'Store',
    description:
      'Shop with card payments and an admin area for products and orders.',
    year: '2025',
    href: 'https://ecommerce-store-pnkp.onrender.com',
    image: '/images/store.jpg',
  },
  {
    name: 'Travel Buddy',
    description: 'Plan a trip, map the route, keep it saved.',
    year: '2025',
    href: 'https://travel-buddy-iota-seven.vercel.app',
    image: '/images/travel-buddy.jpg',
  },
  {
    name: 'Napkin Dispenser',
    description:
      'A board I designed, with a card reader and a screen. Pay by UPI, it dispenses.',
    year: '2025',
    image: '/images/dispenser.jpg',
  },
];
