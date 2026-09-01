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
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useReducedMotion();
  const animated = isDesktop && !reduceMotion;

  return (
    <section
      id="services"
      className="shell flex flex-col gap-12 py-28 text-foreground sm:gap-16 sm:py-36"
    >
      <SectionHeading label="Services" />

      <div ref={container} className="relative flex flex-col">
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
