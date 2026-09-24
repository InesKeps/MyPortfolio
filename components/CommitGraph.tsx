import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiGitBranch, FiGitMerge } from "react-icons/fi";
import { nodes, type Milestone, type Project } from "@/data/projects";
import Reveal from "@/components/Reveal";
import ProjectCover from "@/components/ProjectCover";

function hashOf(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(6, "0").slice(0, 6);
}

const LINE = "w-px flex-1 bg-gradient-to-b from-lavender/40 to-lavender/10";

export default function CommitGraph() {
  const milestones = nodes.filter((n): n is Milestone => n.kind === "milestone");
  const projects = nodes.filter((n): n is Project => n.kind === "project");

  return (
    <div>
      <h2 className="font-display text-4xl font-bold">Projets</h2>
      <p className="mt-2 font-mono text-sm text-muted">
        git log --graph — de mes premiers commits à mes projets en production
      </p>

      <ol className="mt-12">
        {/* En-tête Partie 1 */}
        <li className="flex gap-4 sm:gap-6">
          <div className="flex w-6 flex-col items-center">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lavender/40 text-lavender">
              <FiGitBranch className="text-xs" />
            </span>
            <span className={LINE} />
          </div>
          <Reveal className="flex-1 pb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-lavender">01 · L'apprentissage</h3>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              De l'intégration de maquettes existantes en pixel-perfect jusqu'aux applications React —
              en passant par le JavaScript et le design d'interface.
            </p>
          </Reveal>
        </li>

        {/* Jalons */}
        {milestones.map((node) => (
          <li key={node.id} className="flex gap-4 sm:gap-6">
            <div className="flex w-6 flex-col items-center">
              <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-accent ring-4 ring-accent/15" />
              <span className={LINE} />
            </div>
            <Reveal className="flex-1 pb-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm">
                <span className="text-muted/70">{hashOf(node.id)}</span>
                <span className="text-ink">{node.commit}</span>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-muted">{node.description}</p>

              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
                {node.techs.map((t) => {
                  const isNew = node.gained?.includes(t);
                  return (
                    <span
                      key={t}
                      className={`rounded-full border px-2 py-0.5 ${
                        isNew ? "border-mint/40 text-mint" : "border-white/10 text-lavender"
                      }`}
                    >
                      {isNew ? `+ ${t}` : t}
                    </span>
                  );
                })}
                {node.repoUrl && (
                  <a href={node.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
                    code <FiArrowUpRight />
                  </a>
                )}
              </div>

              {node.cover && (
                <div className="mt-3 max-w-xs">
                  <ProjectCover src={node.cover} alt={node.title} demoUrl={node.demoUrl} width={480} height={300} />
                </div>
              )}
            </Reveal>
          </li>
        ))}

        {/* Merge : la charnière */}
        <li className="flex gap-4 sm:gap-6">
          <div className="flex w-6 flex-col items-center">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-mint bg-aubergine text-mint">
              <FiGitMerge className="text-xs" />
            </span>
            <span className={LINE} />
          </div>
          <Reveal className="flex-1 pb-8">
            <p className="font-mono text-sm text-mint">merge: de l'apprentissage aux projets réels</p>
          </Reveal>
        </li>

        {/* En-tête Partie 2 */}
        <li className="flex gap-4 sm:gap-6">
          <div className="flex w-6 flex-col items-center">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lavender/40 text-lavender">
              <FiGitBranch className="text-xs" />
            </span>
            <span className={LINE} />
          </div>
          <Reveal className="flex-1 pb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-lavender">02 · En production</h3>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              Mes projets phares : des logiciels réels, codés et livrés.
            </p>
          </Reveal>
        </li>

        {/* Projets phares */}
        {projects.map((node, i) => {
          const isLast = i === projects.length - 1;
          return (
            <li key={node.slug} className="flex gap-4 sm:gap-6">
              <div className="flex w-6 flex-col items-center">
                <span className="mt-1.5 h-4 w-4 shrink-0 rotate-45 border-2 border-mint bg-aubergine" />
                {!isLast && <span className={LINE} />}
              </div>
              <Reveal className={isLast ? "flex-1" : "flex-1 pb-10"}>
                <div className="rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-mint">
                  {node.cover && (
                    <div className="mb-5">
                      <ProjectCover src={node.cover} alt={node.title} demoUrl={node.demoUrl} width={1000} height={560} />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <span className="rounded-full bg-mint/15 px-2 py-0.5 text-mint">{node.tag}</span>
                    <span className="uppercase tracking-widest text-muted">
                      {node.category === "capstone" ? "Projet de fin de formation" : "Projet client"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold">{node.title}</h3>
                  <p className="mt-2 max-w-2xl text-muted">{node.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {node.techs.slice(0, 8).map((t) => (
                      <span key={t} className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-xs text-lavender">
                        {t}
                      </span>
                    ))}
                    {node.techs.length > 8 && (
                      <span className="px-2 py-0.5 font-mono text-xs text-muted">+{node.techs.length - 8}</span>
                    )}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/projets/${node.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 font-medium text-aubergine transition-transform hover:-translate-y-0.5"
                    >
                      Étude de cas <FiArrowRight />
                    </Link>
                    {node.demoUrl && (
                      <a href={node.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-sm text-muted hover:text-ink">
                        Démo <FiArrowUpRight />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}