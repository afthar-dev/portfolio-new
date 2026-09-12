/**
 * One source of truth for anything that shows up in search results, the
 * sitemap, the manifest or structured data.
 *
 * NEXT_PUBLIC_SITE_URL must be the live origin with no trailing slash. It is
 * what canonical URLs, Open Graph tags and the sitemap are built from, so a
 * wrong value here quietly points search engines at the wrong place.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://afthar.site';

export const siteName = 'Afthar N N';

export const jobTitle = 'Full Stack Developer';

export const siteDescription =
  'I build websites, web apps, automations, voice agents and CRM tools. Full stack developer in Kerala, India, working with clients anywhere.';

/**
 * Terms people actually type when they need this kind of work. Search engines
 * largely ignore the keywords tag now, but assistants that read the page still
 * pick it up, and it costs nothing to be explicit.
 */
export const siteKeywords = [
  'full stack developer',
  'web developer Kerala',
  'web developer Bangalore',
  'freelance web developer India',
  'website development',
  'web app development',
  'Next.js developer',
  'React developer',
  'business automation',
  'workflow automation',
  'n8n automation',
  'Make automation',
  'AI voice agent development',
  'realtime voice agent',
  'custom CRM development',
  'HRMS development',
  'internal tools',
  'booking website',
  'Afthar N N',
];

export const socialProfiles = [
  'https://github.com/afthar-dev',
  'https://linkedin.com/in/afthar-dev',
  'https://www.instagram.com/_a_f_t_h_a_r_17/',
];

/** Routes that should appear in the sitemap, most important first. */
export const routes = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/projects', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
] as const;
