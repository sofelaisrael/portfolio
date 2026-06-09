import { useQuery } from '@tanstack/react-query';

interface GithubRepo {
  name: string;
  stargazers_count: number;
  fork: boolean;
}

interface GithubUser {
  public_repos: number;
  created_at: string;
}

interface GithubStats {
  projectCount: number;
  totalStars: number;
  yearsExperience: number;
  totalContributions: number;
}

const GITHUB_USERNAME = 'sofelaisrael';

async function countRepoCommits(repo: string): Promise<number> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits?per_page=1&page=1`
    );
    if (!res.ok) return 0;
    const link = res.headers.get('Link');
    if (!link) {
      const body = await res.json();
      return Array.isArray(body) ? body.length : 0;
    }
    const match = link.match(/page=(\d+)>; rel="last"/);
    if (match) return parseInt(match[1], 10);
    const body = await res.json();
    return Array.isArray(body) ? body.length : 0;
  } catch {
    return 0;
  }
}

async function fetchGithubStats(): Promise<GithubStats> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error('Failed to fetch GitHub stats');
  }

  const user: GithubUser = await userRes.json();
  const repos: GithubRepo[] = await reposRes.json();

  const projectCount = user.public_repos;
  const totalStars = repos
    .filter(r => !r.fork)
    .reduce((sum, r) => sum + r.stargazers_count, 0);
  const yearsExperience = Math.max(
    1,
    new Date().getFullYear() - new Date(user.created_at).getFullYear()
  );

  const commitCounts = await Promise.all(
    repos.filter(r => !r.fork).map(r => countRepoCommits(r.name))
  );
  const totalContributions = commitCounts.reduce((sum, c) => sum + c, 0);

  return { projectCount, totalStars, yearsExperience, totalContributions };
}

export function useGithubStats() {
  return useQuery({
    queryKey: ['github-stats', GITHUB_USERNAME],
    queryFn: fetchGithubStats,
    staleTime: 1000 * 60 * 30,
    retry: 2,
  });
}
