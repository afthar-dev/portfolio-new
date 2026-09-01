export interface NavLink {
  title: string;
  href: string;
}

/**
 * Section links are root-relative (`/#about`) rather than bare hashes so they
 * still resolve when the visitor is on another route, such as /contact.
 */
export const links: NavLink[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Skills', href: '/#skills' },
  { title: 'Projects', href: '/projects' },
  { title: 'Experience', href: '/#experience' },
  { title: 'Services', href: '/#services' },
  { title: 'Contact', href: '/contact' },
];
