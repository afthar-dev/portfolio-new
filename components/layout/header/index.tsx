"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TransitionLink from "@/components/ui/transition-link";
import MenuButton from "./menu-button";
import Nav from "./nav";
import { menuClosed, menuOpen, menuTransition } from "./anim";
import useMenuSize from "./use-menu-size";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const menuSize = useMenuSize();

  return (
    // Gutters match the .shell padding so the logo lines up with section content.
    <header className="fixed inset-x-0 top-0 z-[500] flex items-start justify-between px-5 py-6 sm:px-10 lg:px-16">
      <TransitionLink
        href="/"
        className="group flex min-h-11 items-center gap-3 text-foreground"
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
      </TransitionLink>

      {/* Anchors the expanding panel to the top-right corner. */}
      <div className="relative">
        <motion.div
          initial={menuClosed}
          animate={isActive ? menuOpen(menuSize) : menuClosed}
          transition={menuTransition}
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
