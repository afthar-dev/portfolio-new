import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

/**
 * Assistants are how a lot of people now find someone to build things, so the
 * AI crawlers are allowed in on purpose rather than left to the default. They
 * are listed separately from the catch-all because several of them ignore
 * wildcard rules and only read a block addressed to them by name.
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'cohere-ai',
  'Meta-ExternalAgent',
];

export default function robots(): MetadataRoute.Robots {
  // The API route has nothing to index and returns 405 to GET, so crawlers are
  // kept away from it rather than left to find that out.
  const disallow = ['/api/'];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: aiCrawlers, allow: '/', disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
