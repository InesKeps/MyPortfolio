"use client";

import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheck } from "react-icons/fi";

const links = [
  { label: "GitHub", href: "https://github.com/InesKeps", icon: FiGithub, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ines-kepsu-45525a37b", icon: FiLinkedin, external: true },
  { label: "ineskepsu@gmail.com", href: "mailto:ineskepsu@gmail.com", icon: FiMail, external: false },
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div>
        <h2 className="font-display text-4xl font-bold">Travaillons ensemble</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Un projet? une opportunité? ou juste envie d'échanger ? Ecrivez-moi et je vous répondrai dans les plus brefs délais.
        </p>
        <p className="mt-2 font-mono text-sm text-mint">
          Ouverte aux opportunités — emploi comme freelance.
        </p>

        <ul className="mt-8 space-y-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-3 font-mono text-sm text-ink transition-colors hover:text-accent"
                >
                  <Icon className="text-lg text-lavender transition-colors group-hover:text-accent" />
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-muted">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="resize-none rounded-xl border border-white/10 bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-aubergine transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "success" ? (
            <><FiCheck /> Message envoyé</>
          ) : (
            <><FiSend /> {status === "loading" ? "Envoi…" : "Envoyer"}</>
          )}
        </button>

        {status === "error" && (
          <p className="font-mono text-sm text-accent">
            Une erreur est survenue. Réessaie, ou écris-moi directement par email.
          </p>
        )}
        {status === "success" && (
          <p className="font-mono text-sm text-mint">Merci ! Je te réponds au plus vite.</p>
        )}
      </form>
    </div>
  );
}