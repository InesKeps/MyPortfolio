"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#accueil", id: "accueil", label: "Accueil" },
  { href: "/#a-propos", id: "a-propos", label: "À propos" },
  { href: "/#projets", id: "projets", label: "Projets" },
  { href: "/#activite", id: "activite", label: "Activité" },
  { href: "/#competences", id: "competences", label: "Compétences" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export default function Nav() {
  const [activeId, setActiveId] = useState("accueil");

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return; // sous-page : aucune section à observer

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-aubergine/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/#accueil" className="font-display text-lg font-bold">
          Ines <span className="text-accent">Keps</span>
        </Link>
        <ul className="hidden gap-6 md:flex">
          {links.map((link) => {
            const isActive = link.id === activeId;
            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className={`font-mono text-sm transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}