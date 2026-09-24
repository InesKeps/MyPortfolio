import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTailwindcss,
  SiPostgresql, SiMongodb, SiHtml5, SiCss, SiJavascript, SiRedux, SiShadcnui,
  SiFormik, SiSocketdotio, SiJsonwebtokens, SiZod, SiMysql, SiPrisma, SiGit,
  SiGithub, SiPostman, SiFigma, SiJest, SiDocker, SiVercel,
} from "react-icons/si";

type Tech = { name: string; icon: IconType; color: string };
type Explore = { name: string; icon?: IconType };

const highlights: Tech[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
];

const marquee: Tech[] = [
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#663399" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
  { name: "shadcn/ui", icon: SiShadcnui, color: "#FFFFFF" },
  { name: "Formik", icon: SiFormik, color: "#2563EB" },
  { name: "Socket.IO", icon: SiSocketdotio, color: "#FFFFFF" },
  { name: "JWT", icon: SiJsonwebtokens, color: "#FFFFFF" },
  { name: "Zod", icon: SiZod, color: "#4B7FE0" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Prisma", icon: SiPrisma, color: "#FFFFFF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

const exploring: Explore[] = [
  { name: "Jest", icon: SiJest },
  { name: "Docker", icon: SiDocker },
  { name: "CI/CD" },
];

const extras = ["API REST", "Multer", "Nodemailer", "Yup", "VS Code", "Adobe XD"];

export default function SkillsGrid() {
  return (
    <div>
      <h2 className="font-display text-4xl font-bold">Compétences</h2>

      {/* Technos phares */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {highlights.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              style={{ "--brand": t.color } as CSSProperties}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-(--brand)"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                <Icon className="text-2xl text-lavender transition-colors group-hover:text-(--brand)" />
              </span>
              <span className="font-mono text-sm text-ink">{t.name}</span>
            </div>
          );
        })}
      </div>

      {/* Bandeau défilant : les autres technos */}
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-aubergine to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-aubergine to-transparent" />

        <ul aria-hidden className="animate-marquee flex w-max">
          {[...marquee, ...marquee].map((t, i) => {
            const Icon = t.icon;
            return (
              <li
                key={i}
                className="mr-3 flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-2 font-mono text-sm text-muted"
              >
                <Icon className="text-base text-lavender" />
                {t.name}
              </li>
            );
          })}
        </ul>
      </div>

      {/* J'explore en ce moment */}
      <div className="mt-8">
        <h3 className="font-mono text-sm uppercase tracking-widest text-muted">
          J'explore en ce moment
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {exploring.map((t) => {
            const Icon = t.icon;
            return (
              <li
                key={t.name}
                className="flex items-center gap-2 rounded-full border border-mint/30 px-3 py-1.5 font-mono text-sm text-mint"
              >
                {Icon && <Icon className="text-base" />}
                {t.name}
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-6 font-mono text-xs text-muted">Également : {extras.join(" · ")}</p>

      {/* Liste complète pour lecteurs d'écran / SEO */}
      <ul className="sr-only">
        {[...highlights, ...marquee].map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
        {exploring.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
        {extras.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}