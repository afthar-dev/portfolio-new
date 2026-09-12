export interface Entry {
  kind: 'Work' | 'Education';
  period: string;
  /** Company or institution — the headline of the card. */
  org: string;
  /** Job title or degree. */
  title: string;
  location: string;
}

/** Newest first, reading left to right as the track scrolls. */
export const entries: Entry[] = [
  {
    kind: 'Work',
    period: 'Jun 2026 to Present',
    org: '8 Chili',
    title: 'Full Stack Developer',
    location: 'Bangalore, India',
  },
  {
    kind: 'Work',
    period: 'Nov 2025 to May 2026',
    org: 'MAS Design and Code',
    title: 'Full Stack Developer',
    location: 'Remote',
  },
  {
    kind: 'Work',
    period: 'Feb 2025 to Aug 2025',
    org: 'Talks & Talks',
    title: 'Frontend Developer Intern',
    location: 'Remote',
  },
  {
    kind: 'Education',
    period: '2022 to 2025',
    org: 'Mar Athanasius College of Engineering',
    title: 'BTech, Electronics & Communication',
    location: 'Kothamangalam',
  },
  {
    kind: 'Education',
    period: '2019 to 2022',
    org: 'GPTC Perumbavoor',
    title: 'Diploma, Electronics & Communication',
    location: 'Perumbavoor',
  },
];
