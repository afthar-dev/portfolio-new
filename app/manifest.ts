import type { MetadataRoute } from 'next';
import { siteDescription, siteName } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName}, Full Stack Developer`,
    short_name: siteName,
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    // Matches the site's own light theme rather than the generator's white.
    background_color: '#f8f1e7',
    theme_color: '#f8f1e7',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
