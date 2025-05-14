"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils"; // or use clsx or manually join classNames

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const previous = scrollYProgress.getPrevious();
    if (latest < 0.05) {
      setVisible(true);
    } else {
      const direction = latest - previous!;
      setVisible(direction < 0); // Show when scrolling up
    }
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed top-4 inset-x-0 z-50 mx-auto max-w-max rounded-full shadow-lg px-4 py-2 flex items-center space-x-4 transition-all",
            "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500", // Gradient background from dark blue to purple to pink
            "text-white", // Text color for a minimalist light theme
            "sm:px-6 sm:py-3 sm:space-x-6", // Larger spacing for tablets
            "text-sm sm:text-base", // Text size adapts
            className
          )}
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center space-x-1 hover:text-yellow-400 transition-colors"
            >
              <span className="sm:hidden">{item.icon}</span>
              <span className="hidden sm:inline">{item.name}</span>
            </a>
          ))}
          <a
            href="#contact"
            className="px-3 py-1 border border-gray-200 dark:border-white/20 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10"
          >
            Contact
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
