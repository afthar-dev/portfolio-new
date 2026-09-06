import Image from "next/image";
import Link from "next/link";
import TransitionLink from "@/components/ui/transition-link";
import { channels, email } from "@/components/sections/contact/contact-data";
import BackToTop from "./back-to-top";
import CopyEmail from "./copy-email";
import LocalTime from "./local-time";
import MarqueeParallax from "./marquee-parallax";
import { technology, typography, version } from "./footer-data";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const socials = channels.filter((c) => c.href.startsWith("http"));

function Column({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs uppercase tracking-[0.25em] text-foreground/45">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <footer className="footer-invert relative z-0 flex flex-col justify-between gap-16 overflow-hidden py-16 md:fixed md:inset-x-0 md:bottom-0 md:h-screen md:gap-0 md:pt-24 md:pb-0">
      <div className="shell grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <Column label="Technology">
          <ul className="flex flex-col gap-1.5 text-lg sm:text-xl">
            {technology.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Column>

        <Column label="Typography">
          <ul className="flex flex-col gap-1.5 text-lg sm:text-xl">
            {typography.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Column>

        <Column label="Socials">
          {/* Rows collapse to no gap on phones because each link now carries a
              44px touch target of its own; the pitch stays about the same. */}
          <ul className="flex flex-col gap-0 sm:gap-1.5">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-lg transition-colors hover:[color:var(--accent)] sm:min-h-0 sm:text-xl"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <div className="flex flex-col gap-10">
          <Column label="Email me">
            <CopyEmail email={email} />
          </Column>

          <Column label="Reach out">
            <TransitionLink
              onClick={() => {
                if (isContactPage) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              href="/contact"
              className="inline-flex min-h-11 items-center text-xl transition-colors hover:[color:var(--accent)] sm:min-h-0 sm:text-2xl"
            >
              Send a message
            </TransitionLink>
          </Column>
        </div>

        <Column label="Version">
          <p className="text-lg sm:text-xl">.v {version}</p>
        </Column>

        <Column label="Local time">
          <p className="text-lg sm:text-xl">
            <LocalTime />
          </p>
        </Column>
      </div>

      <MarqueeParallax>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="animate-marquee flex shrink-0 items-center"
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="flex shrink-0 items-center gap-6 pr-6">
                <span className="font-heading whitespace-nowrap text-[clamp(3rem,10vw,8rem)] uppercase leading-none tracking-tight">
                  Get in touch
                </span>
                <span className="text-[clamp(3rem,10vw,8rem)] leading-none">
                  —
                </span>
                {/* Square headshot cut from me.png. A 1:1 object-cover of the
                    full-body original only trims a quarter of its height, so
                    the face would end up tiny inside the circle. */}
                <Image
                  src="/images/me-avatar.png"
                  alt=""
                  width={360}
                  height={360}
                  sizes="160px"
                  className="h-[clamp(3.5rem,10vw,8rem)] w-[clamp(3.5rem,10vw,8rem)] shrink-0 rounded-full object-cover"
                />
              </span>
            ))}
          </div>
        ))}
      </MarqueeParallax>

      <div className="shell flex items-end justify-between gap-6 md:pb-8">
        <p className="text-xs text-foreground/45">
          Copyright ©{new Date().getFullYear()} Afthar N N
          <br />
          All rights reserved
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
