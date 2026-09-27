"use client";

import { useRef } from "react";
import { useScroll, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { useMediaQuery } from "@/lib/use-media-query";
import ServiceCard from "./service-card";
import { services } from "./services-data";

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  // One scroll subscription drives every card, rather than one per card.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Sticky stacking eats a lot of scroll and reads poorly on phones, so the
  // cards fall back to a plain list there and under reduced-motion.
  //
  // Height matters as much as width: a phone in landscape clears 768px wide
  // but leaves ~390px of height, and a card pinned at top:96px with a 420px
  // floor then runs off the bottom of the screen with no way to reach it.
  const roomToPin = useMediaQuery(
    "(min-width: 768px) and (min-height: 640px)"
  );
  const reduceMotion = useReducedMotion();
  const animated = roomToPin && !reduceMotion;

  return (
    <section
      id="services"
      className="shell flex flex-col gap-12 py-28 text-foreground sm:gap-16 sm:py-36"
    >
      <SectionHeading label="Services" />

      {/* The pinned cards supply their own spacing from md up; below that the
          stack needs a real gap of its own. */}
      <div ref={container} className="relative flex flex-col gap-6 md:gap-0">
        {services.map((service, i) => (
          <ServiceCard
            key={service.name}
            {...service}
            index={i}
            total={services.length}
            progress={scrollYProgress}
            animated={animated}
          />
        ))}
      </div>
    </section>
  );
}
