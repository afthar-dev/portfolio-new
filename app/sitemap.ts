import type { MetadataRoute } from 'next';
import { routes, siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
