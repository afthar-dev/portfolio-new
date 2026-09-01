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
  title: 'Afthar N N — Full Stack Developer',
  description:
    'Full stack developer building web applications with React, Next.js, Node and Postgres. Based in Kerala, India.',
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
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
