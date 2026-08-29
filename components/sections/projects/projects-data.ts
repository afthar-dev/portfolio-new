export interface Project {
  /** Title is split so the image can slide open between the two halves. */
  title1: string;
  title2: string;
  /** Short description of the work / stack. */
  discipline: string;
  year: string;
  href?: string;
  image: string;
  /** Set when the image is stock rather than a shot of the real project. */
  stock?: boolean;
}

export const featuredProjects: Project[] = [
  {
    title1: 'Realtime',
    title2: 'Voice Agent',
    discipline: 'AI, Realtime audio',
    year: '2026',
    image: '/images/voice-agent.jpg',
    stock: true,
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
export const moreProjectsHref = 'https://github.com/afthar-dev';
