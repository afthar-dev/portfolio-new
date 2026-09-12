import type { Metadata } from 'next';
import {
  Special_Gothic_Expanded_One,
  Inter,
  Instrument_Serif,
  Great_Vibes,
} from 'next/font/google';
import './globals.css';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import AppShell from '@/components/layout/app-shell';
import { ThemeProvider, themeInitScript } from '@/components/providers/theme-provider';
import {
  jobTitle,
  siteDescription,
  siteKeywords,
  siteName,
  siteUrl,
  socialProfiles,
} from '@/lib/site';

const specialGothic = Special_Gothic_Expanded_One({
  variable: '--font-special-gothic',
  weight: '400',
  subsets: ['latin'],
  adjustFontFallback: false,
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

// Editorial display serif for the hero body lines.
const instrumentSerif = Instrument_Serif({
  variable: '--font-display',
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

// Calligraphic face for the oversized swash capitals.
const greatVibes = Great_Vibes({
  variable: '--font-script',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  // Makes every relative URL below, and in each page's metadata, resolve
  // against the live origin instead of localhost.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Websites, Web Apps and Automations`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: `${siteName} | Websites, Web Apps and Automations`,
    description: siteDescription,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Websites, Web Apps and Automations`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteName,
      jobTitle,
      description: siteDescription,
      url: siteUrl,
      image: `${siteUrl}/images/me-avatar.png`,
      email: 'mailto:aftharafthar5@gmail.com',
      sameAs: socialProfiles,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      },
      knowsAbout: siteKeywords,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: 'en',
      publisher: { '@id': `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The theme script and Locomotive both add classes to <html> before React
    // hydrates, so its attributes are expected to differ from the server HTML.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${specialGothic.variable} ${inter.variable} ${instrumentSerif.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Structured data. Search engines use it for the knowledge panel and
            sitelinks, and assistants reading the page get the same facts
            without having to infer them from the copy. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
