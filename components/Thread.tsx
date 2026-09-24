"use client";

import { useEffect, useState } from "react";

export default function Thread() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? scrollTop / height : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-6 z-0 hidden w-px md:block"
    >
      {/* Ligne de base, discrète */}
      <div className="h-full w-px bg-linear-to-b from-accent/40 via-lavender/30 to-accent/10" />

      {/* Lueur qui suit le défilement */}
      <div
        className="absolute left-1/2 h-24 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-accent to-transparent shadow-[0_0_12px_2px_var(--color-accent)]"
        style={{ top: `calc(${progress * 100}% - 3rem)` }}
      />
    </div>
  );
}