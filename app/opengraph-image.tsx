import { ImageResponse } from 'next/og';
import { siteName } from '@/lib/site';

export const alt =
  'Afthar N N, full stack developer. Websites, web apps, automations, voice agents and CRM tools.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The card that shows up when a link is shared. Drawn here rather than kept as
 * a static file so it stays in step with the palette, and deliberately uses no
 * webfont: ImageResponse would have to fetch one at build, and the system
 * stack renders fine at this size.
 *
 * Every element that holds more than one child sets display explicitly. Satori
 * refuses to lay out a multi child div without it, which fails the build
 * rather than degrading.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0b0b0b',
          color: '#f8f1e7',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: '0.2em',
            color: '#c9fd74',
          }}
        >
          {siteName.toUpperCase()}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 72, lineHeight: 1.15 }}>
            Websites, web apps and
          </div>
          <div style={{ display: 'flex', fontSize: 72, lineHeight: 1.15 }}>
            automations that hold up.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              color: 'rgba(248,241,231,0.65)',
            }}
          >
            Voice agents and CRM tools too. Kerala, India.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: 'rgba(248,241,231,0.5)',
          }}
        >
          Full stack developer
        </div>
      </div>
    ),
    size
  );
}
