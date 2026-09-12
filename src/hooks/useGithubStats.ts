import { useQuery } from '@tanstack/react-query';

interface GithubRepo {
  name: string;
  stargazers_count: number;
  fork: boolean;
  size: number;
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
  const nonForkRepos = repos.filter(r => !r.fork);
  const totalStars = nonForkRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const yearsExperience = Math.max(
    1,
    new Date().getFullYear() - new Date(user.created_at).getFullYear()
  );

  // Estimate contributions from repo metadata instead of per-repo commit API calls
  // This avoids the N+1 problem (was making 20+ API calls before)
  const totalContributions = nonForkRepos.reduce((sum, repo) => {
    return sum + Math.max(5, Math.floor(repo.size / 50) + Math.floor(repo.stargazers_count * 2));
  }, 0);

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
