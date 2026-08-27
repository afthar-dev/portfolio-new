"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MenuButton from "./menu-button";
import Nav from "./nav";
import { menuSlide } from "./anim";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[500] flex items-start justify-between px-6 py-6">
      <Link
        href="#hero"
        className="group flex items-center gap-3 text-foreground"
        aria-label="Back to top"
      >
        <Image
          src="/logo.png"
          alt=""
          width={80}
          height={80}
          priority
          className="h-10 w-10 rounded-full object-contain"
        />
        <span className="font-heading text-sm uppercase tracking-wide transition-opacity group-hover:opacity-60 sm:text-base">
          Afthar
        </span>
      </Link>

      {/* Anchors the expanding panel to the top-right corner. */}
      <div className="relative">
        <motion.div
          variants={menuSlide}
          initial="closed"
          animate={isActive ? "open" : "closed"}
          className="absolute overflow-hidden rounded-3xl bg-lime text-ink shadow-xl"
        >
          <AnimatePresence>
            {isActive && <Nav onNavigate={() => setIsActive(false)} />}
          </AnimatePresence>
        </motion.div>

        <MenuButton
          isActive={isActive}
          toggleMenu={() => setIsActive((v) => !v)}
        />
      </div>
    </header>
  );
}
