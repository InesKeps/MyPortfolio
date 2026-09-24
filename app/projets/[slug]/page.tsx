import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projet introuvable — Ines Keps" };
  return {
    title: `${project.title} — Ines Keps`,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = [
    { label: "Contexte", content: project.context },
    { label: "Problème", content: project.problem },
    { label: "Approche", content: project.approach },
    { label: "Résultat", content: project.result },
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 py-32">
      <Link
        href="/#projets"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-ink"
      >
        <FiArrowLeft /> Retour aux projets
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
        <span className="rounded-full bg-mint/15 px-2 py-0.5 text-mint">{project.tag}</span>
        <span className="uppercase tracking-widest text-muted">
          {project.category === "capstone" ? "Projet de fin de formation" : "Projet client"}
        </span>
        <span className="text-muted/60"></span>
      </div>

      <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{project.title}</h1>
      <p className="mt-4 text-lg text-muted">{project.description}</p>
      <p className="mt-4 font-mono text-sm text-muted">
        <span className="text-lavender">Rôle : </span>
        {project.role}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techs.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-lavender"
          >
            {t}
          </span>
        ))}
      </div>

      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 font-medium text-aubergine transition-transform hover:-translate-y-0.5"
        >
          Voir la démo <FiArrowUpRight />
        </a>
      )}

      {project.images && project.images.length > 0 && (
        <div className="mt-12 space-y-6">
          {project.images.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={src}
                alt={`${project.title} — capture ${i + 1}`}
                width={1200}
                height={750}
                className="w-full"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 space-y-10">
        {sections.map((section) => (
          <section key={section.label}>
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
              {section.label}
            </h2>
            <p className="mt-3 leading-relaxed text-ink/90">{section.content}</p>
          </section>
        ))}
      </div>
            {project.highlights && project.highlights.length > 0 && (
        <div className="mt-14 rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            Points techniques clés
          </h2>
          <ul className="mt-4 space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}