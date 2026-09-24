export type ContributionDay = { date: string; count: number; level: number };
export type Repo = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
};
export type GithubData = {
  totalContributions: number;
  weeks: ContributionDay[][];
  repos: Repo[];
};

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
      repositories: {
        nodes: {
          name: string;
          description: string | null;
          url: string;
          stargazerCount: number;
          primaryLanguage: { name: string } | null;
        }[];
      };
    } | null;
  };
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
      repositories(
        first: 6
        privacy: PUBLIC
        isFork: false
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

function levelFor(count: number): number {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

export async function getGithubData(login: string): Promise<GithubData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
    next: { revalidate: 3600 }, // cache 1 h
  });

  if (!res.ok) return null;

  const json = (await res.json()) as GraphQLResponse;
  const user = json.data?.user;
  if (!user) return null;

  const calendar = user.contributionsCollection.contributionCalendar;
  const weeks = calendar.weeks.map((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelFor(day.contributionCount),
    }))
  );

  const repos = user.repositories.nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    stars: repo.stargazerCount,
    language: repo.primaryLanguage?.name ?? null,
  }));

  return { totalContributions: calendar.totalContributions, weeks, repos };
}