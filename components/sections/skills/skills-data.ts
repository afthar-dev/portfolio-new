import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiStripe,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiGit,
  SiVercel,
  SiSupabase,
  SiCloudinary,
  SiPostman,
  SiN8N,
} from 'react-icons/si';

export interface Skill {
  name: string;
  Icon: IconType;
  /** Brand colour, used on hover. */
  color: string;
}

/** Split across three marquee rows. */
export const skillRows: Skill[][] = [
  [
    { name: 'React', Icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', Icon: SiNextdotjs, color: '#000000' },
    { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Redux', Icon: SiRedux, color: '#764ABC' },
    { name: 'Framer Motion', Icon: SiFramer, color: '#0055FF' },
  ],
  [
    { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
    { name: 'Express', Icon: SiExpress, color: '#000000' },
    { name: 'Socket.IO', Icon: SiSocketdotio, color: '#010101' },
    { name: 'Stripe', Icon: SiStripe, color: '#635BFF' },
    { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
    { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  ],
  [
    { name: 'Redis', Icon: SiRedis, color: '#FF4438' },
    { name: 'Prisma', Icon: SiPrisma, color: '#2D3748' },
    { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
    { name: 'Git', Icon: SiGit, color: '#F05032' },
    { name: 'Vercel', Icon: SiVercel, color: '#000000' },
    { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
    { name: 'Cloudinary', Icon: SiCloudinary, color: '#3448C5' },
    { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
    { name: 'n8n', Icon: SiN8N, color: '#EA4B71' },
  ],
];
