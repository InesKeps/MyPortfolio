import { getGithubData } from "@/lib/github";

const LEVEL_COLORS = [
  "rgba(255,255,255,0.06)",
  "rgba(111,231,196,0.3)",
  "rgba(111,231,196,0.5)",
  "rgba(111,231,196,0.75)",
  "rgba(111,231,196,1)",
];

export default async function GithubActivity() {
  const data = await getGithubData("InesKeps");

  if (!data) {
    return (
      <div>
        <h2 className="font-display text-4xl font-bold">Activité GitHub</h2>
        <p className="mt-4 text-muted">Activité indisponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-4xl font-bold">Activité GitHub</h2>
      <p className="mt-3 max-w-2xl text-muted">
        Mes dépôts publics récents. L'essentiel de mon travail récent — mes projets
        clients en production — se trouvent dans des repo privés.
      </p>

      {/* Repos récents : en premier */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-white/10 bg-surface p-5 transition-colors hover:border-mint"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate font-mono text-sm text-ink transition-colors group-hover:text-mint">
                {repo.name}
              </h3>
              {repo.stars > 0 && (
                <span className="shrink-0 font-mono text-xs text-muted">★ {repo.stars}</span>
              )}
            </div>
            {repo.description && (
              <p className="mt-2 line-clamp-2 text-sm text-muted">{repo.description}</p>
            )}
            {repo.language && (
              <span className="mt-auto pt-3 font-mono text-xs text-lavender">{repo.language}</span>
            )}
          </a>
        ))}
      </div>

      {/* Heatmap : secondaire, discrète */}
      <div className="mt-12">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
          Contributions publiques · {data.totalContributions} sur l'année
        </h3>
        <div className="mt-4 overflow-x-auto pb-2">
          <div className="flex gap-0.75">
            {data.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.75">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.count} contribution(s) — ${day.date}`}
                    className="h-2.5 w-2.5 rounded-xs"
                    style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}