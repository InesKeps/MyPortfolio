import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const socials = [
  { label: "GitHub", href: "https://github.com/InesKeps", icon: FiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ines-kepsu-45525a37b", icon: FiLinkedin },
  { label: "Email", href: "mailto:ineskepsu@gmail.com", icon: FiMail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <a href="#accueil" className="font-display text-lg font-bold">
            Ines <span className="text-accent">Keps</span>
          </a>
          <p className="mt-1 font-mono text-xs text-muted">
            © {year} — Construit avec Next.js &amp; Tailwind CSS
          </p>
        </div>

        <ul className="flex gap-5">
          {socials.map((s) => {
            const Icon = s.icon;
            const isExternal = s.href.startsWith("http");
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="text-lavender transition-colors hover:text-accent"
                >
                  <Icon className="text-xl" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}